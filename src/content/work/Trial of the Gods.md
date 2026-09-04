---
title: Trial of the Gods
publishDate: 2026-06-16
img: /Trial.png
img_alt: Trial of the Gods — Global Game Jam 2026
description: >
  — Global Game Jam 2026 — A 3D action-platformer created during Global Game Jam 2026. Players use divine masks to unlock movement abilities and overcome environmental challenges across an ancient temple.
tags:
  - Unity
  - C#
  - Gameplay Programming
  - Game Design
  - Game Architecture
  - Global Game Jam
  - 3D Platformer
role: Game Designer & Gameplay Programmer
engine: Unity
language: C#
projectType: 3D Action-Platformer
playUrl: https://drive.google.com/file/d/19wohiq5YNEYKWmGf8zN72xFwRFQVRcZk/view?usp=sharing
heroVideo: /assets/2026-02-10 19-56-43.mp4
featuredImages:
  - src: /icon_kukul_on.png
    alt: Trial of the Gods title artwork
gallery:
  - /icon_kukul_on.png
  - /assets/2026-02-10 19-56-43.mp4
---

## Overview

**Trial of the Gods** is a 3D action-platformer developed during **Global Game Jam 2026**.

The project was created in **2 days**, with the goal of building a movement-focused platforming experience around the idea of divine masks. Each mask gives the player access to different abilities that change how they navigate the environment.

My primary responsibility was **gameplay programming and technical design**. I worked on the player controller, movement architecture, ability system, mask equipment, environmental interactions, hazards, gameplay events, animation and audio integration, and game flow.

Because of the extremely short development window, one of my main technical goals was to build systems that were **modular enough to iterate quickly without tightly coupling every gameplay mechanic together**.

## Gameplay Programming

The core of the project is a custom player movement framework built around a **CharacterController**, a movement state machine, and a modular ability system.

The architecture separates different responsibilities instead of placing all movement logic inside a single monolithic controller.

At a high level, the gameplay architecture is:

    Player
       |
       v
    CharacterMovement
       |
       +---- PlayerStateMachine
       |
       +---- Ability System
       |
       +---- Mask System
       |
       +---- Movement Settings
       |
       v
    StaticEventHandler
       |
       +---- Audio
       +---- Animation
       +---- VFX
       +---- Game Management

This structure allowed different gameplay systems to communicate without every component needing a direct reference to every other component.

## Character Movement Architecture

The `CharacterMovement` class acts as the central context for player movement.

It handles:

- Horizontal movement.
- Acceleration.
- Air control.
- Gravity.
- Jumping.
- Variable jump height.
- Jump buffering.
- Coyote time.
- Air jumps.
- Movement speed modifiers.
- Ability execution.
- Ability cooldowns.
- Mask states.

Movement parameters are loaded from a `MovementSettingsSO`, allowing values such as speed, acceleration, air control, and gravity to be configured without changing the movement code.

    public void ApplyMovementSettings(
        MovementSettingsSO settings)
    {
        MoveSpeed = settings.moveSpeed;
        Acceleration = settings.acceleration;
        AirControl = settings.airControl;
        Gravity = settings.gravity;
    }

This helped separate **configuration from implementation**, which made movement tuning faster during the game jam.

## Movement State Machine

The player controller uses a dedicated `PlayerStateMachine` to manage movement states.

Instead of having every special movement behavior handled through increasingly complex conditionals, states can enter, update, and exit independently.

    public void SwitchState(
        MovementStateSO next,
        CharacterMovement ctx)
    {
        if (next == CurrentState || next == null)
            return;

        ctx.ResetAbilityData();

        CurrentState.Exit(ctx);

        if (CurrentState == ctx.usingWindMaskStateSo)
            ctx.StartMaskCooldown();

        CurrentState = next;
        CurrentState.Enter(ctx);
    }

This became particularly useful for the Wind Mask, which has its own movement state.

The state machine also handles cleanup when transitioning between states, preventing previously active abilities from remaining active after a transition.

## Modular Ability System

One of the most important programming systems I implemented was the modular ability framework.

Abilities are represented through `AbilitySO` objects rather than being hard-coded individually into the character controller.

Each ability can define its own:

- Activation conditions.
- Input buffering.
- Cooldown.
- Priority.
- Activation type.
- Execution logic.
- End behavior.

The movement controller evaluates the currently allowed abilities and selects the highest-priority ability that can be activated.

    if (data.HasBufferedInput &&
        !data.IsOnCooldown &&
        ability.CanUse(this))
    {
        if (chosen == null ||
            ability.priority > chosen.priority)
        {
            chosen = ability;
        }
    }

    if (chosen != null)
        ExecuteAbility(chosen);

This made the ability system extensible without requiring every new mechanic to be added directly to `CharacterMovement`.

## Ability Priorities and Cooldowns

The ability framework also supports priorities.

When multiple abilities are available, the system can select the ability with the highest priority.

    void ExecuteAbility(AbilitySO ability)
    {
        if (activeAbility == ability)
            return;

        if (activeAbility != null &&
            ability.priority < activeAbility.priority)
            return;

        if (activeAbility != null)
            activeAbility.End(this);

        activeAbility = ability;

        var data = abilityData[ability];

        data.inputBufferTimer = 0f;
        data.cooldownTimer = ability.cooldown;

        ability.Execute(this);
    }

This allowed abilities to coexist without every ability needing direct knowledge of the others.

## Responsive Platforming

Because movement was central to the game, I spent a significant amount of time making the controller feel responsive.

The controller implements both **jump buffering** and **coyote time**.

Jump buffering stores jump input for a short period:

    void UpdateTimers()
    {
        if (JumpPressedThisFrame)
            jumpBufferTimer = jumpBufferTime;
        else
            jumpBufferTimer -= Time.deltaTime;

        if (Controller.isGrounded)
        {
            coyoteTimer = coyoteTime;
            airJumpsRemaining = maxAirJumps;
        }
        else
        {
            coyoteTimer -= Time.deltaTime;
        }
    }

The controller then checks whether the player can perform a ground jump:

    public bool CanGroundJump()
    {
        return HasBufferedJump()
            && (Controller.isGrounded ||
                CanUseCoyoteJump());
    }

These systems helped make the platforming feel more forgiving while maintaining precise movement.

## Variable Jump Height

The jump system also supports variable jump height.

If the player releases the jump button while moving upward, the vertical velocity is reduced.

    void HandleJumpCut()
    {
        if (JumpReleasedThisFrame &&
            Velocity.y > 0f)
        {
            Velocity = new Vector3(
                Velocity.x,
                Velocity.y * jumpCutMultiplier,
                Velocity.z
            );
        }
    }

This gave the player greater control over short and long jumps instead of forcing every jump to use the same trajectory.

## Wind Mask

The Wind Mask connects the progression system directly to the movement architecture.

The player can only activate the Wind Mask when the correct mask is equipped, the corresponding movement state exists, the mask has been activated, and its cooldown has expired.

    public bool CanActivateWindMask()
    {
        return equippedMask == Masks.Wind
            && usingWindMaskStateSo != null
            && equipMask
            && !IsMaskOnCooldown;
    }

When the Wind Mask state ends, a cooldown is started:

    public void StartMaskCooldown()
    {
        maskCooldownTimer = maskCooldown;

        StaticEventHandler
            .RaiseMaskCooldownTimer(maskCooldown);
    }

This allowed the ability to be powerful enough to affect traversal while still being controlled through a gameplay cooldown.

## Mask Inventory and Equipment

The player also has a dedicated `PlayerInventory` component for managing mask equipment.

The inventory instantiates the selected mask at a configurable equipment point.

    currentMask = Instantiate(
        maskPrefab,
        maskEquipPoint
    );

    currentMask.transform.localPosition =
        Vector3.zero;

    currentMask.transform.localRotation =
        Quaternion.identity;

    hasMask = true;

The system also includes a visual pickup animation using **DOTween**.

    currentMask.transform.localScale =
        Vector3.zero;

    Sequence seq = DOTween.Sequence();

    seq.Join(
        currentMask.transform
            .DOScale(Vector3.one, scaleDuration)
            .SetEase(scaleEase)
    );

Separating inventory management from movement allowed the mask to exist as an equipment system while the movement controller handled its gameplay consequences.

## Event-Driven Gameplay

I used a centralized `StaticEventHandler` to communicate important gameplay events.

The system exposes events for:

- Jumping.
- Landing.
- Death.
- Dashing.
- Wind Mask activation.
- Wind Mask unlocking.
- Mask equipping.
- Health changes.
- Score changes.
- Pause changes.
- Mask timers.
- Mask cooldowns.

For example:

    public static event Action OnJump;
    public static event Action OnLand;
    public static event Action OnDeath;
    public static event Action OnWindMaskActivated;
    public static event Action OnWindMaskUnlocked;
    public static event Action OnMaskEquipped;
    public static event Action<bool> OnDash;

Events are raised through dedicated methods:

    public static void RaiseDash(bool dash)
    {
        OnDash?.Invoke(dash);
    }

This allowed systems such as audio, animation, VFX, and game management to react to gameplay without creating direct dependencies between every component.

## Dash Feedback

The dash mechanic uses the event system to trigger visual and audio feedback.

A custom `MeshTrail` component listens for the dash event:

    private void StaticEventHandler_OnDash(
        bool isPlayerDashing)
    {
        if (isPlayerDashing &&
            !isTrailActive)
        {
            StartTrail();
        }
    }

While active, the trail periodically captures the player's current skinned mesh.

    skinnedMeshRenderers[i].BakeMesh(mesh);

    meshFilter.mesh = mesh;
    meshRenderer.material = mat;

    Destroy(gObj, meshDestroyDelay);

This creates temporary mesh afterimages behind the player during the dash.

The system was intentionally separated from the actual dash implementation so visual feedback could respond to the gameplay event without being embedded into the movement code.

## Reusable Damage Architecture

Environmental hazards use a reusable `Hazard` base class.

Instead of implementing player damage separately in every hazard, the base class handles damage and knockback.

    protected virtual void DamagePlayer(
        Collider player)
    {
        if (player.TryGetComponent(
            out IDamageable damageable))
        {
            damageable.TakeDamage(damage);
        }

        if (applyKnockback)
        {
            ApplyKnockback(player);
        }
    }

The player implements the `IDamageable` interface:

    public interface IDamageable
    {
        void TakeDamage(int damage);
    }

This means different hazards can interact with damageable objects through a common interface rather than depending directly on the `Player` implementation.

## Spike Hazards

The `Spikes` component inherits from `Hazard` and adds continuous damage.

When the player remains inside the spike collider, damage is applied repeatedly using a coroutine.

    private IEnumerator ContinuousDamage(
        Collider player)
    {
        while (true)
        {
            DamagePlayer(player);

            yield return new WaitForSeconds(
                damageInterval
            );
        }
    }

This allowed the base hazard behavior to be reused while extending it for a different gameplay requirement.

## Projectile Hazards

I also implemented reusable projectile hazards.

`ProjectileThrower` can automatically fire projectiles at a configurable interval.

Before firing, it can create a warning effect:

    public void Fire()
    {
        if (warningTime > 0f)
        {
            Invoke(
                nameof(SpawnProjectile),
                warningTime
            );

            ShowWarning();
        }
        else
        {
            SpawnProjectile();
        }
    }

The projectile then handles its own movement, lifetime, collision, damage, and impact effects.

This separation meant that the same projectile component could be used by different environmental hazards without duplicating the projectile logic.

## Environmental Puzzle Architecture

The game also contains reusable environmental puzzle systems built around events.

A `PressurePlate` detects objects entering its activation area and exposes activation events:

    public event EventHandler OnActivated;
    public event EventHandler OnDeactivated;

When activated, it notifies subscribed systems:

    OnActivated?.Invoke(
        this,
        EventArgs.Empty
    );

A `TimedDoor` can then subscribe to those events.

    pressurePlateReference.OnActivated +=
        PressurePlate_OnActivated;

    pressurePlateReference.OnDeactivated +=
        PressurePlate_OnDeactivated;

The door responds to the events:

    private void PressurePlate_OnActivated(
        object sender,
        System.EventArgs e)
    {
        OpenDoor();
    }

    private void PressurePlate_OnDeactivated(
        object sender,
        System.EventArgs e)
    {
        CloseDoor();
    }

This was one of the clearest examples of using **decoupled systems** in the project.

The pressure plate does not need to know that it is controlling a door. It simply reports that its state changed.

## Moving Platforms

I also implemented waypoint-based moving platforms for traversal challenges.

Platforms can be configured with:

- Multiple waypoints.
- Movement speed.
- Looping.
- Waiting time.
- Rotation while moving.
- Rotation axis.

Movement is handled with `Vector3.MoveTowards`:

    transform.position = Vector3.MoveTowards(
        transform.position,
        targetWaypoint.position,
        moveSpeed * Time.deltaTime
    );

The platform then advances through its waypoint list when it reaches the current target.

This allowed level designers to create different traversal patterns without modifying the code.

## Interaction Framework

Environmental interactions are based on an abstract `Interactable` class.

The system handles common interaction behavior such as:

- Player detection.
- Interaction range.
- Input binding.
- Interaction prompts.
- Highlight effects.
- One-time interactions.
- UI feedback.

The base class leaves the actual interaction behavior abstract:

    protected abstract void Interact();

This allows different interactable objects to inherit the same interaction framework while implementing their own gameplay behavior.

## Audio Architecture

Gameplay audio is also connected to the event system.

The `SoundManager` subscribes to movement and progression events:

    StaticEventHandler.OnJump +=
        StaticEventHandler_OnJump;

    StaticEventHandler.OnLand +=
        StaticEventHandler_OnLand;

    StaticEventHandler.OnDash +=
        StaticEventHandler_OnDash;

    StaticEventHandler.OnWindMaskUnlocked +=
        StaticEventHandler_OnWindMaskUnlocked;

For example, the dash event triggers the corresponding sound:

    private void StaticEventHandler_OnDash(
        bool isPlayerDashing)
    {
        if (isPlayerDashing)
        {
            Player player = Player.Instance;

            PlaySound(
                audioClipsRefSO.dash,
                player.transform.position
            );
        }
    }

This kept audio responses separate from the mechanics that generated the events.

## Animation Integration

Animation was also separated from the movement controller.

The `HandleAnimations` component reads the player's movement state and updates Animator parameters.

    bool isWalking =
        characterMovement
            .HorizontalVelocity
            .magnitude > walkThreshold;

    animator.SetBool(
        IsWalkingHash,
        isWalking
    );

The system also responds to jumping and landing events, allowing gameplay state and animation feedback to remain synchronized.

## Player Health and Death

The player implements `IDamageable` and manages its own health.

    public void TakeDamage(int damage)
    {
        health -= damage;

        OnApplyDamage?.Invoke(
            this,
            EventArgs.Empty
        );

        if (IsDead())
        {
            StaticEventHandler.RaiseDeath();
            animator.enabled = false;
        }
    }

When the player dies, the event system broadcasts the death event.

This allows the game manager and other systems to react without the Player class needing to directly control the entire game state.

## Game State and Scene Management

The `TrialsOfGodGameManager` handles global gameplay states such as pausing, player death, and level completion.

When the player dies:

    private void StaticEventHandler_OnDeath()
    {
        isPlayerDead = true;
        isGamePaused = true;
        CursorState(isGamePaused);
    }

The game manager also handles level completion and delegates scene transitions to the `Loader`.

    private void CompleteLevelCollider_OnLevelCompleted(
        object sender,
        EventArgs e)
    {
        if (isPlayerDead)
            return;

        Loader.Load(nextLevelScene);
    }

The `Loader` uses a dedicated loading scene before loading the target scene:

    public static void Load(Scene targetScene)
    {
        Loader.targetScene = targetScene;

        SceneManager.LoadScene(
            Scene.LoadingScene.ToString()
        );
    }

This kept scene transitions separate from individual gameplay systems.

## Technical Challenges

The biggest technical challenge was building enough gameplay architecture to support the game's mechanics while working under a **two-day game jam deadline**.

I had to balance two competing priorities:

1. Build systems quickly enough to get a playable game working.
2. Avoid creating tightly coupled code that would make iteration difficult.

The ability system, movement state machine, event architecture, and reusable interaction systems were particularly useful for this.

For example, the pressure plate and door system could have been implemented as a direct reference where the pressure plate explicitly called a door method. Instead, I used events so that the two systems remained independent.

Similarly, audio and visual feedback were connected through gameplay events rather than being embedded directly into the mechanics.

## Engineering Decisions

Several architectural decisions were made specifically to improve iteration speed.

### ScriptableObjects for Configuration

Movement settings and abilities use ScriptableObjects so their data can be configured independently from the runtime components.

This reduced the amount of hard-coded gameplay configuration inside the player controller.

### State-Based Movement

Movement states were separated using `PlayerStateMachine` so specialized movement behaviors could be introduced without turning the main controller into a large collection of conditionals.

### Interfaces for Shared Behavior

`IDamageable` provided a common contract for damage interactions.

This allowed hazards and projectiles to apply damage without requiring them to know exactly which object was receiving it.

### Events for Decoupling

`StaticEventHandler` allowed systems such as audio, animation, VFX, UI, and game management to react to gameplay events independently.

### Reusable Components

Systems such as `Hazard`, `Interactable`, `MovingPlatform`, `PressurePlate`, and `TimedDoor` were designed as configurable components that could be reused across the level.

## My Contribution

My primary role on **Trial of the Gods** was **Game Designer & Gameplay Programmer**.

I was responsible for:

- Designing and implementing player movement.
- Character controller programming.
- Movement state machine architecture.
- Ability system architecture.
- Jump buffering and coyote time.
- Variable jump height.
- Air jumps.
- Movement acceleration and air control.
- Wind Mask gameplay integration.
- Mask equipment and inventory.
- Dash functionality and feedback.
- Player health and damage.
- Reusable hazard systems.
- Spike hazards.
- Projectile hazards.
- Pressure plates.
- Timed doors.
- Moving platforms.
- Interaction framework.
- Gameplay event architecture.
- Animation integration.
- Audio integration.
- Game state management.
- Scene loading.
- Gameplay iteration and technical design.

## What I Learned

Because this was one of my projects as a **junior gameplay programmer**, the project was an important opportunity to practice thinking beyond individual mechanics.

I learned how to:

- Build a character controller around reusable systems.
- Separate gameplay states from the main movement context.
- Design abilities as modular systems.
- Use ScriptableObjects for gameplay configuration.
- Use interfaces to reduce system dependencies.
- Use events to communicate between gameplay systems.
- Build reusable environmental mechanics.
- Design gameplay systems around iteration.
- Connect gameplay code with animation, audio, and VFX.
- Prioritize architecture under a very short development deadline.

The project also taught me that good gameplay architecture is not about making every system as complex as possible. Under a game jam deadline, the goal was to find the simplest structure that would still allow the team to **iterate quickly and add mechanics without constantly rewriting existing systems**.

## Project Details

| | |
|---|---|
| **Development Time** | 2 Days |
| **Game Jam** | Global Game Jam 2026 |
| **Genre** | 3D Action-Platformer |
| **Engine** | Unity |
| **Language** | C# |
| **Role** | Game Designer & Gameplay Programmer |
| **Tools** | Unity, DOTween, Adobe Suite, Google Docs |

## Team

- **Alejandro Velásquez**
- **Juan Esteban Calle**
- **Juan Gaviria**
- **Me** — Gameplay Programming & Technical Design

## Technologies

- **Unity**
- **C#**
- **DOTween**
- **Adobe Suite**
- **Google Docs**

## Takeaway

**Trial of the Gods** was a two-day exercise in **gameplay architecture, movement programming, modular abilities, and rapid prototyping**.

What I value most about the project is that it pushed me beyond implementing isolated mechanics. I had to think about how the player controller, abilities, masks, hazards, environmental puzzles, animation, audio, and game state could communicate while remaining flexible enough to change during development.

The project gave me practical experience with **state machines, ScriptableObjects, interfaces, events, reusable components, and data-driven gameplay systems**.

As a junior gameplay programmer, it was an important step toward thinking about gameplay programming not only as implementing mechanics, but as designing the **technical structure that allows mechanics to work together**.