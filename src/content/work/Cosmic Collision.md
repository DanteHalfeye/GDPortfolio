---
title: Cosmic Collision

publishDate: 2026-01-16

img: /assets/POSTER_COSMICCOLLITION.png

img_alt: Cosmic Collision

description: >
  A fast-paced space roguelike where players survive increasingly difficult enemy encounters using movement-based combat, a powerful dash attack, and item-based stat progression.

tags:
  - Unity
  - Game Design
  - Gameplay Programming
  - Roguelike
  - Space Combat
  - C#

contributions:
  - Physics-Based Player Movement
  - Dash-Based Combat System
  - Auto-Aim Targeting System
  - Modular Enemy Pattern Spawning
  - Randomized Encounter Generation
  - Sequential Enemy Spawning
  - Dynamic Difficulty Scaling
  - Event-Driven Room Clearing
  - Player Stat & Upgrade Architecture
  - Item System Integration
  - Gameplay Progression Design
  - Combat Balancing

role: Game Designer & Gameplay Programmer

engine: Unity

language: C#

projectType: Space Roguelike

playUrl: https://play.unity.com/en/games/38bb20eb-6e65-4b39-9ab6-7c4c4c0ca0fe/cosmic-build

heroVideo: /assets/imagen_2026-08-29_233159002.png

featuredImages:
  - src: /assets/imagen_2026-08-29_233159002.png
    alt: Cosmic Collision gameplay

gallery:
  - /assets/imagen_2026-08-29_233159002.png
---
## Overview

**Cosmic Collision** is a fast-paced space roguelike focused on movement-based combat, risk and reward, and incremental progression.

Players control an **asteroid** through increasingly difficult encounters filled with enemies that attempt to shoot them down. Instead of relying primarily on traditional weapons, the player's **dash is their main offensive tool**, allowing them to rapidly move toward enemies and destroy them through direct collision.

The game was developed over **one month**, giving the team time to iterate on the core gameplay loop, player movement, enemy encounters, room progression, and item-based progression.

My primary responsibilities were **gameplay programming and game design**, with a focus on the player controller, dash combat, enemy pattern spawning, encounter progression, and player statistics.

## Core Gameplay Loop

The gameplay loop is built around:

- Movement
- Enemy encounters
- Dash-based combat
- Room progression
- Items and upgrades

Players enter an encounter and must survive enemy attacks while using movement and the dash to destroy enemies.

After an encounter is cleared, the player progresses toward increasingly difficult encounters while gaining access to upgrades that improve their capabilities.

The resulting loop is:

**Move → Engage → Dash → Destroy → Upgrade → Face a harder encounter**

## Movement-Based Combat

Movement is the foundation of the combat system.

The asteroid does not simply move around the arena while a separate weapon handles combat. Instead, movement is directly connected to the player's ability to attack.

The player can accelerate toward enemies, reposition around incoming attacks, and use the dash as a high-speed offensive ability.

This makes positioning and timing important parts of combat.

## Player Movement System

I developed the asteroid's movement controller using Unity's `Rigidbody2D`.

The controller separates input processing from physics movement.

Input is collected during `Update()` and movement is applied during `FixedUpdate()`, allowing the Rigidbody2D to handle the actual physics movement.

The asteroid uses acceleration and deceleration rather than instantly reaching maximum speed.

### Input Processing

The project supports both Unity's Input System and keyboard input.

The movement input is normalized so diagonal movement does not provide an unintended speed advantage.

```csharp
private void ProcessInput()
{
    _input = moveActionToUse.action.ReadValue<Vector2>();

    if (_input.magnitude > 1)
        _input.Normalize();
}
```

This keeps movement speed consistent regardless of the direction the player chooses.

### Acceleration & Deceleration

Rather than directly assigning the maximum speed, the controller gradually changes the player's current speed.

```csharp
if (_input != Vector2.zero)
{
    _currentSpeed += actor.Acceleration * Time.fixedDeltaTime;
}
else
{
    _currentSpeed -= actor.Deceleration * Time.fixedDeltaTime;
}

_currentSpeed = Mathf.Clamp(_currentSpeed, 0, actor.MaxSpeed);
_rb.linearVelocity = _input * _currentSpeed;
```

This gives the asteroid momentum while still allowing the player to control its direction precisely.

The movement system also reads its values from `PlayerActor`, allowing upgrades to modify movement-related statistics.

## Player Statistics

I separated the player's gameplay statistics from the movement controller using a dedicated `PlayerActor` component.

The actor stores values such as:

- Maximum health.
- Current health.
- Currency.
- Acceleration.
- Deceleration.
- Maximum speed.
- Dash speed.
- Dash duration.
- Dash cooldown.

For example, the movement controller does not need to know the actual maximum speed value.

Instead, it asks the actor for the current value:

```csharp
public float MaxSpeed
{
    get { return _maxSpeed; }
}
```

This architecture makes the movement system compatible with upgrades and items.

## Dash Combat

The dash is the central combat mechanic of **Cosmic Collision**.

When the player activates the dash:

- Normal movement is temporarily disabled.
- The attack hitbox is activated.
- A dash direction is calculated.
- The asteroid receives a burst of velocity.
- Enemies hit by the dash are destroyed.
- Camera shake provides impact feedback.
- The player returns to normal movement.
- A cooldown prevents immediate reuse.

The dash therefore functions as both a **movement ability and a weapon**.

## Dash Implementation

The dash is implemented as a coroutine so that its active duration and cooldown can be controlled independently.

```csharp
private IEnumerator Dash()
{
    _canDash = false;
    _isDashing = true;

    _playerMovement.enabled = false;
    ActivateAttackHitbox();

    Vector2 direction = autoAimDirection
        .AutoShootDirection()
        .normalized;

    if (direction == Vector2.zero)
        direction = _playerMovement.CurrentInput;

    _rb.linearVelocity = direction * actor.DashSpeed;

    yield return new WaitForSeconds(actor.DashDuration);

    DeactivateAttackHitbox();
    ReactivatePlayerMovement();

    yield return new WaitForSeconds(actor.DashCooldown);

    _canDash = true;
}
```

Using a coroutine allowed the dash to behave as a temporary gameplay state rather than simply being another movement input.

## Dash Direction

The dash uses an `AutoAim` component to determine whether there is a nearby enemy.

If an enemy is found within the configured range, the dash automatically targets it.

```csharp
public Vector2 AutoShootDirection()
{
    Collider2D enemyToShoot =
        Physics2D.OverlapCircle(
            transform.position,
            autoShootRange,
            enemyLayer
        );

    if (enemyToShoot != null)
    {
        Vector2 shootDirection =
            (enemyToShoot.transform.position -
             gameObject.transform.position).normalized;

        return shootDirection;
    }

    return Vector2.zero;
}
```

If no enemy is found, the dash falls back to the player's current movement direction.

This gives the player a reliable way to attack nearby enemies without completely removing movement control.

## Dash Hitbox

The dash uses a dedicated `CircleCollider2D` as an attack hitbox.

The collider is normally disabled.

It is enabled only during the dash:

```csharp
private void ActivateAttackHitbox()
{
    _attackCollider.enabled = true;
}
```

And disabled again when the dash ends:

```csharp
private void DeactivateAttackHitbox()
{
    _attackCollider.enabled = false;
}
```

This separates the player's normal collision behavior from the offensive collision used by the dash.

## Enemy Destruction

The `DashDamage` component handles enemy collisions during the dash.

When the attack collider enters an enemy collider, the system checks the object's layer and triggers the enemy's death behavior.

```csharp
private void OnTriggerEnter2D(Collider2D collision)
{
    if (collision != null)
    {
        if (collision.gameObject.layer == layer)
        {
            collision.gameObject
                .GetComponent<EnemyDeath>()
                .Death();

            cameraShake.StartShake(
                duration,
                magnitude
            );
        }
    }
}
```

This keeps the dash damage system focused on detecting a successful hit while the enemy's own `EnemyDeath` component controls what happens when it dies.

## Camera Feedback

Successful dash collisions trigger camera shake.

This gives the player immediate feedback when an enemy is destroyed.

The effect reinforces the physical impact of the dash and helps communicate that the attack connected successfully.

## Enemy Encounter System

I developed a modular enemy spawning system based around reusable **enemy patterns**.

Instead of manually spawning every enemy individually, groups of enemies are organized into pattern prefabs.

The spawner can instantiate these patterns as part of an encounter.

This allows designers to create different enemy formations and reuse them across different encounters.

## Enemy Pattern Spawning

The `EnemeySpawner` stores a list of available enemy pattern prefabs.

A selected pattern is instantiated and placed at the center of the encounter area.

```csharp
GameObject currentPatterns =
    Instantiate(enemyPatterns[patternId]);

currentPatterns.transform.position =
    Vector3.zero;
```

This makes each enemy formation a reusable object that can be selected by the encounter system.

## Random Pattern Selection

The `PatternsToSpawn` component randomly selects pattern IDs from the available patterns.

```csharp
public int[] GetPatterns()
{
    int[] selectedPatternIDs = new int[x];

    for (int i = 0; i < x; i++)
    {
        selectedPatternIDs[i] =
            Random.Range(0, enemyPatterns.Count);
    }

    return selectedPatternIDs;
}
```

This creates variation between encounters while keeping the available enemy formations controlled by the designer.

## Encounter Scaling

The number of enemy patterns is determined using the current level.

```csharp
public int SelectAmountOfPatterns()
{
    int a = GameManager.Instance.CurrentLevelNumber;

    x = Mathf.RoundToInt(
        1 + (a / 2) +
        (Mathf.Pow(a, 3 / 2) * 0.2f)
    );

    return x;
}
```

The current level therefore influences encounter intensity.

As the player progresses, encounters can contain more enemy formations.

## Sequential Spawning

Enemy patterns can be spawned sequentially instead of all at once.

```csharp
for (int i = 0; i < amountOfPatterns; i++)
{
    int patternId = patternIDs[i];

    GameObject currentPatterns =
        Instantiate(enemyPatterns[patternId]);

    currentPatterns.transform.position =
        Vector3.zero;

    yield return new WaitForSeconds(
        delayBetweenSpawns
    );
}
```

This allows encounters to build over time.

Rather than immediately filling the arena with enemies, the player can be placed under gradually increasing pressure.

## Spawn Rate Scaling

The delay between patterns also changes based on the current level.

```csharp
public float DelayBetweenSpawns()
{
    y = 5 - 4f / 49 *
        (GameManager.Instance.CurrentLevelNumber - 1);

    if (y <= 1)
        y = 1;

    return y;
}
```

The delay becomes shorter as the player progresses, creating increasingly intense encounters.

The minimum delay prevents the system from becoming excessively fast.

## Encounter Trigger

Encounters begin when the player enters a designated trigger area.

```csharp
private void OnTriggerEnter2D(Collider2D collision)
{
    if (collision.gameObject.CompareTag("Player"))
    {
        PatternsToSpawn patternsToSpawn =
            spawner.gameObject
                .GetComponent<PatternsToSpawn>();

        PlayLevelEncounter(
            patternsToSpawn.SelectAmountOfPatterns(),
            patternsToSpawn.GetPatterns(),
            patternsToSpawn.DelayBetweenSpawns()
        );
    }
}
```

The trigger retrieves the encounter configuration and passes the required information to the spawner.

After activation, the trigger is disabled so the same encounter cannot be started repeatedly.

## Room Clearing

The game needs to know when an encounter is actually finished.

I implemented this through the `GameManager`, which listens for entity spawn and death events.

When an enemy spawns:

```csharp
private void HandleEntitySpawned()
{
    _amountOfEnemies++;
}
```

When an enemy dies:

```csharp
private void HandleEntityDied()
{
    _amountOfDeadEnemies++;

    if (_currentAmountOfPatterns < _ammountOfPatterns)
        return;

    if (_amountOfDeadEnemies >= _amountOfEnemies)
    {
        RoomCleared();
    }
}
```

Once all patterns have finished spawning and every spawned enemy has been defeated, the room-cleared event is triggered.

## Event-Driven Progression

The encounter system uses events to communicate between gameplay systems.

The `GameManager` subscribes to entity spawn and death events:

```csharp
private void OnEnable()
{
    StaticEventHandler.OnEntitySpawned +=
        HandleEntitySpawned;

    StaticEventHandler.OnEntityDied +=
        HandleEntityDied;
}
```

This allows the game manager to track the encounter without requiring each enemy to directly communicate with it.

When the encounter is completed, the manager triggers a room-cleared event.

This creates a more modular relationship between spawning, enemies, and progression.

## Game Manager

The `GameManager` acts as a central controller for important game-level information.

It tracks:

- Current level.
- Player reference.
- Number of spawned enemies.
- Number of defeated enemies.
- Number of encounter patterns.
- Current encounter pattern.
- Current game state.

The manager persists between scenes using `DontDestroyOnLoad`, allowing progression information to survive scene transitions.

## Level Progression

The current level is incremented whenever a new scene is loaded.

```csharp
public void IncrementLevelNumber(
    Scene scene,
    LoadSceneMode mode)
{
    _currentLevelNumber++;
}
```

The level number is then used by the encounter system to determine how many patterns to spawn and how quickly they should appear.

This creates a connection between scene progression and gameplay difficulty.

## Player Health

The `PlayerActor` manages both maximum and current health.

Current health is clamped to prevent it from exceeding the player's maximum or dropping below zero.

```csharp
public int CurrentHealth
{
    get { return currentHealth; }

    set
    {
        currentHealth =
            math.clamp(
                value,
                0,
                maxHealth
            );

        ItemEvents.TriggerOnStatChange();
    }
}
```

The actor also exposes the player's health as a percentage:

```csharp
public float HpPercent
{
    get
    {
        return (float)currentHealth / maxHealth;
    }
}
```

This makes the value easy for other systems, such as UI, to consume.

## Upgradeable Player Stats

The player actor was designed to support item-based stat modification.

For example, movement speed can be modified without changing the movement controller itself.

```csharp
public void ModifyMovementSpeed(float value)
{
    _maxSpeed += value;

    ItemEvents.TriggerOnStatChange();
}
```

Attack speed can similarly modify the dash cooldown:

```csharp
public void ModifyAttackSpeed(float value)
{
    _dashCooldown *=
        ((100f - value) * 0.01f);

    ItemEvents.TriggerOnStatChange();
}
```

This creates a separation between **the systems that use the statistics** and **the systems that modify them**.

## Item System Integration

When an item is picked up, the player registers it with the `ItemManager`.

```csharp
public void PickUpItem(ItemSO item)
{
    ItemManager.RegisterItem(item, this);

    Debug.Log("item " + item.name);
}
```

The item system can then modify the player's statistics through the available actor properties and methods.

This architecture allowed new item effects to be added without rewriting the player movement or dash systems.

## Stat Change Events

Whenever important player statistics change, the actor triggers a stat-change event.

This is used for properties such as:

- Health.
- Maximum health.
- Movement speed.
- Dash speed.
- Dash cooldown.
- Currency.

This allows other systems to react to stat changes without creating direct dependencies between every item and UI component.

## Currency

The player also has a currency value used as part of the progression system.

When the currency changes, the player's UI is updated.

```csharp
public int Currency
{
    get { return currency; }

    set
    {
        currency = value;

        ItemEvents.TriggerOnStatChange();

        _textMeshPro.text =
            "MONEY: " + currency;
    }
}
```

This provides a persistent progression value alongside the player's combat statistics.

## Modular Gameplay Architecture

The gameplay systems were divided into focused components.

### PlayerMovement

Responsible for:

- Input.
- Acceleration.
- Deceleration.
- Maximum movement speed.
- Rigidbody2D movement.

### PlayerActor

Responsible for:

- Health.
- Currency.
- Movement statistics.
- Dash statistics.
- Upgradeable values.
- Item integration.

### DashAttack

Responsible for:

- Dash activation.
- Dash state.
- Dash duration.
- Dash cooldown.
- Dash velocity.
- Attack hitbox.

### DashDamage

Responsible for:

- Detecting enemy collisions.
- Triggering enemy death.
- Camera shake feedback.

### AutoAim

Responsible for:

- Detecting nearby enemies.
- Calculating dash direction.

### EnemeySpawner

Responsible for:

- Instantiating enemy patterns.
- Sequential pattern spawning.
- Communicating encounter progression.

### PatternsToSpawn

Responsible for:

- Selecting enemy patterns.
- Randomization.
- Pattern count.
- Spawn delay.
- Difficulty scaling.

### StartEncounter

Responsible for:

- Detecting player entry.
- Starting encounters.
- Preventing repeated activation.

### GameManager

Responsible for:

- Level progression.
- Enemy tracking.
- Room completion.
- Game state.
- Player reference.

This separation allowed individual systems to be iterated on without rewriting the entire gameplay loop.

## Design Challenges

The biggest design challenge was balancing the dash.

The dash simultaneously acts as:

- A movement ability.
- An offensive attack.
- A defensive escape.
- An enemy targeting system.

Because of this, changing one dash variable could significantly affect the rest of the game.

For example, increasing dash speed makes enemies easier to reach but can also make the player much harder to hit.

Increasing dash duration makes the attack more powerful but also gives the player more time to avoid danger.

Reducing the cooldown makes the dash more accessible but can remove the intended risk of committing to an attack.

The dash therefore became the primary variable around which combat balancing was built.

## Risk & Reward

The dash creates a natural risk-and-reward relationship.

The player can stay away from enemies and focus on avoiding projectiles, but destroying enemies requires moving directly toward them.

A successful dash can eliminate an enemy and reposition the player.

A poorly timed dash can instead move the player into another attack.

This makes movement and decision-making equally important.

## Difficulty Curve

Difficulty increases through multiple systems rather than one universal difficulty value.

The encounter system can:

- Increase the number of enemy patterns.
- Reduce the delay between patterns.
- Introduce greater enemy pressure.

At the same time, the player can:

- Increase movement speed.
- Improve health.
- Improve dash-related statistics.
- Acquire new items.

This creates a balance between **increasing player power and increasing encounter difficulty**.

## Development Process

The project was developed over approximately **one month**.

The development process focused on establishing the core movement and combat loop first.

Once the asteroid controls and dash were playable, the enemy encounter system could be built around those mechanics.

The project was then expanded with:

- Enemy pattern prefabs.
- Random encounter selection.
- Sequential spawning.
- Encounter scaling.
- Room clearing.
- Player statistics.
- Item integration.
- Progression systems.

This allowed the team to build outward from a strong central gameplay mechanic.

## Iteration

Because the dash was connected to so many systems, playtesting required looking at more than just the dash itself.

Movement speed affected enemy difficulty.

Enemy density affected the usefulness of the dash.

Dash cooldown affected how often players could escape.

Dash duration affected how much control players had during an attack.

Upgrade strength affected how quickly the player could overcome increasingly difficult encounters.

This made balancing an iterative process rather than something that could be solved by tuning individual values in isolation.

## My Contribution

My main focus on **Cosmic Collision** was **gameplay programming and game design**.

I was responsible for:

- Programming the asteroid movement system.
- Implementing acceleration and deceleration.
- Implementing Rigidbody2D movement.
- Developing the dash system.
- Implementing dash timing and cooldowns.
- Implementing the dash attack hitbox.
- Implementing dash-based enemy destruction.
- Developing the auto-aim system.
- Developing the enemy pattern spawning system.
- Implementing randomized encounter selection.
- Implementing sequential enemy pattern spawning.
- Developing encounter scaling.
- Implementing room-clear detection.
- Connecting enemy events to the game manager.
- Implementing player stat management.
- Integrating player statistics with the item system.
- Designing encounter progression.
- Balancing movement and combat.
- Iterating on the game's difficulty curve.

## Team

- **David Posada** — Items & Audio Implementation
- **Isabella Montoya** — Enemy Behaviour
- **Juan Esteban Calle** — UI & Phone Controls
- **Sebastian Escobar** — Enemy Behaviour
- **Me** — Gameplay & Technical Design

## Project Details

| | |
|---|---|
| **Development Time** | 1 Month |
| **Genre** | Space Roguelike |
| **Engine** | Unity |
| **Language** | C# |
| **Role** | Game Designer & Gameplay Programmer |
| **Primary Contribution** | Player Movement, Dash Combat & Encounter Systems |
| **Combat Style** | Movement-Based Collision Combat |
| **Progression** | Items, Stats & Increasing Encounters |

## What I Learned

Developing **Cosmic Collision** gave me experience building several gameplay systems that depend on one another.

I learned how to:

- Build responsive physics-based movement.
- Use acceleration and deceleration to create momentum.
- Design combat around movement rather than traditional weapons.
- Implement a timed dash state.
- Create an attack using a temporary collision hitbox.
- Implement auto-targeting for a movement-based attack.
- Build reusable enemy encounter patterns.
- Randomize encounters while maintaining designer control.
- Scale encounter intensity through progression.
- Use events to track enemy spawning and deaths.
- Detect when an entire room has been cleared.
- Separate player statistics from movement and combat logic.
- Connect item systems to player statistics.
- Balance player progression against increasing enemy pressure.

The project reinforced the importance of designing gameplay systems as interconnected parts of a larger loop rather than as isolated mechanics.

## Project Outcome

**Cosmic Collision** combined movement-based combat with roguelike progression.

The asteroid's movement is not simply a way to navigate the arena. It is the player's primary method of engaging enemies, escaping attacks, repositioning, and controlling the flow of combat.

The encounter system then increases pressure through randomized enemy patterns, sequential spawning, and level-based scaling.

The item system gives the player opportunities to become stronger and adapt to increasingly difficult encounters.

## Final Reflection

Cosmic Collision was an important project for developing my understanding of gameplay architecture and systems design.

The project gave me the opportunity to work on a complete gameplay loop where **movement, combat, enemy spawning, progression, and player statistics all interact with one another**.

The dash became the central design pillar of the game, while the surrounding systems were built to support and challenge that mechanic.

It taught me that a strong core mechanic becomes much more effective when every surrounding system is designed to reinforce it.

## Technologies

- **Unity**
- **C#**
- **Unity 2D Physics**
- **Unity Input System**
- **Rigidbody2D**
- **Gameplay Programming**
- **Game Design**
- **Roguelike Systems**
- **Enemy Encounter Systems**
- **Event-Driven Systems**
- **Movement-Based Combat**
- **Player Progression**
- **Item Systems**