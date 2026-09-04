---
title: Tide and Tale

publishDate: 2025-05-30

img: /Forces.jpg

img_alt: Tide and Tale gameplay

description: >
  A 3D platformer collectathon set inside a world of stories, where a writer uses the power of water to defeat enemies, traverse the world, and uncover its mysteries. I worked across gameplay programming, tools programming, level design, and systems integration.

tags:
  - Unity
  - C#
  - Gameplay Programming
  - Level Design
  - Tools Programming
  - Systems Integration

role: Gameplay Programmer

engine: Unity

language: C#

projectType: 3D Platformer

heroVideo: /Forces.jpg
---

# Tide and Tale

**3D Platformer · Collectathon · Team Project**

Tide and Tale is a 3D platformer collectathon set inside a world of stories.

The player takes the role of a writer who enters a mysterious world and discovers the ability to manipulate water. This power is used to defeat enemies, traverse the environment, interact with the world, and collect important objects.

<!-- VIDEO: Main gameplay / project overview -->

<!-- IMAGE: Main game screenshot / key art -->

> **Project Status:** Development discontinued before release.
>
> The available build is an older development build and does not represent the best state reached during development. This case study focuses on my contributions rather than presenting the project as a finished game.

---

# My Role

**Gameplay Programmer · Tools Programmer · Level Designer · Systems Integrator**

Tide and Tale was one of the most ambitious team projects I worked on. My responsibilities extended beyond individual gameplay features, covering gameplay programming, tools development, level design, and the integration of systems created by different members of the team.

## Core Contributions

- Player controller and movement systems
- Input architecture
- Combat and damage systems
- Projectile and ability systems
- Object pooling
- Game state management
- Save/load and progression
- Persistent collectibles and triggers
- Designer-facing Unity tools
- Environmental hazards
- Spline and path-based movement
- Player recovery systems
- Level design
- Integration of gameplay systems developed by other team members

---

# Gameplay Programming

## Player Controller

The player controller was one of my main gameplay programming responsibilities.

I implemented a state-based character controller designed around the different movement and gameplay mechanics of Tide and Tale.

The controller supported states including:

- Idle
- Running
- Jumping
- Dashing
- Sliding
- Tricking
- Pounding
- Recovering
- Blocked

This allowed movement behaviors to remain isolated while still sharing the same character architecture.

<!-- IMAGE: Player controller gameplay -->

<!-- VIDEO: Player movement showcase -->

## Movement

The controller handled both grounded and aerial movement.

The system included:

- Ground movement
- Air movement
- Acceleration
- Drag
- Gravity
- Slope-aware movement
- Camera-relative movement
- Character orientation
- Jumping
- Dashing
- Sliding
- Tricks
- Ground pounding
- Recovery states

The character used a kinematic motor for movement and collision behavior while the controller handled the gameplay-specific movement rules.

## State-Based Gameplay

Character behavior was organized around explicit gameplay states.

```text
                    Character
                        |
        ┌───────────────┼───────────────┐
        |               |               |
      Ground           Air           Special
        |               |               |
    Idle / Run       Jumping       Dash / Trick
        |                               |
        └───────────────┬───────────────┘
                        |
                Recovery / Blocked
```

Each state could define its own movement, input, animation, and transition behavior.

For example, entering the dash state could trigger the dash animation and modify movement behavior, while leaving the state restored the relevant movement properties.

---

# Input Architecture

I separated input collection from character behavior through a centralized input manager and a structured `PlayerCharacterInputs` data structure.

Instead of having the character controller directly read keyboard or controller input, the player gathered the current inputs and converted them into gameplay-oriented commands.

```csharp
public struct PlayerCharacterInputs
{
    public float MoveAxisForward;
    public float MoveAxisRight;
    public Quaternion CameraRotation;

    public bool RunDown;
    public bool RunUp;

    public bool JumpDown;
    public bool JumpHeld;
    public bool JumpUp;

    public bool ContextualDashDown;

    public bool AttackPrimaryDown;
    public bool AttackSecondaryDown;

    public bool ChangeIndexDown;
    public bool QuickShotDown;
}
```

This separation kept the character controller independent from the specific input-reading implementation.

---

# Combat & Abilities

## Combat System

I worked on the combat architecture, including interactions between attack types, enemy defenses, and health systems.

The combat system used shared interfaces for damage senders and receivers.

```text
Damage Sender
      |
      v
Damage Payload
      |
      v
Damage Receiver
      |
      v
Defense / Health
```

This allowed environmental hazards, player attacks, enemies, and defensive systems to participate in the same damage architecture.

<!-- IMAGE: Combat gameplay -->

<!-- VIDEO: Combat showcase -->

## Armor & Damage Types

One of the combat mechanics I implemented was an armor system that reacted differently depending on the type of incoming attack.

For example, an enemy could require a ranged attack to break its armor before becoming vulnerable to melee attacks.

```text
              Enemy
                |
              Armor
                |
       ┌────────┴────────┐
       |                 |
    Ranged             Melee
       |                 |
       v                 |
 Break Armor              |
       |                 |
       └────────┬────────┘
                |
                v
           Damage Health
```

The system used `DamagePayload` to communicate information about an attack, allowing the receiver to determine whether the incoming damage was valid for its current state.

This created combat interactions where the player had to use the appropriate ability rather than relying on a single attack type.

## Projectile & Ability System

I implemented a reusable projectile management system based around `ScriptableObject` projectile definitions.

The system supported:

- Multiple projectile types
- Projectile selection
- Cycling between projectiles
- Runtime projectile unlocking
- Duplicate prevention
- Per-projectile object pools
- Runtime pool expansion
- Returning projectiles to their pools

```text
                ProjectileSO
              /      |      \
             /       |       \
         Type A    Type B    Type C
             \       |       /
              \      |      /
               ProjectileManager
                       |
              ┌────────┴────────┐
              |                 |
        Current Type       Object Pools
```

This separated projectile data from the manager responsible for creating and reusing projectile instances.

<!-- IMAGE: Projectile types / abilities -->

<!-- VIDEO: Projectile and ability gameplay -->

## Object Pooling

Because projectiles could be created repeatedly during gameplay, I implemented object pooling to reduce repeated instantiation and destruction.

Each projectile type maintained its own pool.

```csharp
private Dictionary<ProyectileSO, Queue<GameObject>> pools = new();
```

When a projectile was needed, the system retrieved an inactive object from the pool:

```csharp
GameObject projectile = poolQueue.Dequeue();

projectile.SetActive(true);
```

After the projectile finished its behavior, it could be returned:

```csharp
obj.SetActive(false);

pools[proj].Enqueue(obj);
```

The pools could also expand at runtime when all existing instances were in use.

---

# Systems & Architecture

## Progression & Persistence

I implemented systems for tracking player progression and persistent gameplay state.

The save system stored information including:

- Current level
- Player position
- Player rotation
- Coins
- Key collectibles
- Unlocked power-ups
- Persistent trigger states

The save structure was divided into global progression and level-specific information.

```text
GameSaveData
    |
    ├── Current Level
    ├── Coins
    ├── Power Ups
    ├── Collectibles
    |
    └── Levels
          |
          ├── Level ID
          ├── Player Position
          ├── Player Rotation
          └── Trigger States
```

This allowed progression to persist between play sessions while keeping state independent for different levels.

## Collectible System

I created a reusable collectible architecture based around unique IDs.

Instead of only storing a global number of collected objects, each collectible could be identified individually.

```csharp
protected string GenerateUniqueID()
{
    return $"{gameObject.scene.name}_{GetType().Name}_{transform.position.GetHashCode()}_{gameObject.name}";
}
```

When the game loaded, previously collected objects could be disabled based on their saved IDs.

This made the system reusable for different types of collectibles.

<!-- IMAGE: Progression / collectibles -->

## Persistent Trigger System

I created a configurable trigger system for gameplay and level interactions.

Triggers could activate on:

- Enter
- Stay
- Exit

They could filter objects using:

- Tags
- Layers

Additional options included:

- Startup delays
- Duration timers
- UnityEvents
- Different materials for trigger states
- Persistent trigger states

```text
Player
   |
   v
Trigger
   |
   ├── Filter Target
   ├── Startup Delay
   ├── UnityEvent
   ├── Duration
   └── Save State
```

Once activated, a trigger's state could be saved and restored when returning to the level.

<!-- IMAGE: Trigger in Unity -->

<!-- VIDEO: Trigger demonstration -->

## Event-Driven Architecture

To allow systems to communicate without requiring direct references between every component, I implemented a centralized event system.

The event layer handled gameplay changes such as:

- Health changes
- Damage
- Player death
- Enemy death
- Water changes
- Score changes
- Main collectibles
- Objective completion
- Game state changes

```csharp
public static event Action OnHealthChanged;
public static event Action OnPlayerDeath;
public static event Action OnEnemyDeath;
public static event Action OnScoreChanged;
public static event Action OnMainCollected;
public static event Action<GameState> OnGameStateChanged;
```

Systems could broadcast events while UI, progression, and other gameplay systems could subscribe to them.

This reduced direct dependencies between gameplay logic and presentation systems.

## Game State Management

I also worked on the game's centralized game-state management.

```csharp
public enum GameState
{
    MainMenu,
    InGame,
    GameOver
}
```

Changing the game state notified other systems through the event architecture, allowing UI and gameplay systems to react without directly controlling one another.

---

# Tools Programming

One of my responsibilities was creating tools that made it easier for the team to build and iterate on gameplay.

Rather than requiring designers to modify code for every gameplay object, I exposed important parameters through the Unity Inspector and Scene view.

<!-- IMAGE: Custom Unity tool -->

<!-- VIDEO: Designer tool demonstration -->

## Moving Saw Tool

I created a reusable moving-saw hazard that could be configured directly in the Unity Inspector.

Designers could configure:

- Movement speed
- Rotation speed
- Rotation axis
- Waypoints
- Wait time
- Ping-pong movement
- Local/world waypoint positioning
- Damage behavior

The system also integrated with the project's damage architecture through `IDamageSender`.

```text
Moving Saw
    |
    ├── Movement
    ├── Rotation
    ├── Waypoints
    └── Damage
          |
          v
    IDamageSender
          |
          v
    IDamageReceiver
```

This allowed the saw to behave as a gameplay hazard without requiring a custom damage implementation for every new hazard.

## Scene View Waypoint Editing

To make the saw easier to use during level design, I implemented Scene view visualization for its waypoints.

The tool displayed:

- Waypoint positions
- Waypoint connections
- Waypoint numbers
- Editable position handles

Designers could move waypoints directly in the Scene view instead of manually editing coordinates.

<!-- IMAGE: Waypoint handles -->

<!-- IMAGE: Waypoint visualization -->

This reduced iteration time when creating moving hazards and made movement paths easier to understand spatially.

## Bézier Path Tool

I also implemented a Bézier visualization and calculation tool for creating curved paths.

The tool exposed configurable parameters for:

- Starting position
- Forward distance
- Control point offset
- Resolution
- Camera-relative positioning

The curve was calculated using a quadratic Bézier function:

```csharp
private Vector3 CalculateQuadraticBezierPoint(
    float t,
    Vector3 p0,
    Vector3 p1,
    Vector3 p2)
{
    float u = 1 - t;

    return (u * u) * p0
         + (2 * u * t) * p1
         + (t * t) * p2;
}
```

The resulting path could be visualized directly in the Scene view using Gizmos.

<!-- IMAGE: Bézier curve in Scene view -->

## Spline Movement

I integrated Unity's Spline system with the project's physics mover architecture.

```text
Designer Spline
      |
      v
Spline Evaluation
      |
      v
Position + Rotation
      |
      v
Physics Mover
      |
      v
Gameplay Object
```

This allowed objects to follow designer-authored spline paths while still using the project's existing physics movement architecture.

<!-- IMAGE: Spline setup -->

<!-- VIDEO: Spline movement -->

---

# Level Design & Player Experience

## Player Recovery

I implemented a player recovery system that tracked the player's last valid grounded position.

When the player entered a recovery area, the system could return them to their last valid platform.

```text
Player Movement
      |
      v
Valid Ground
      |
      v
Save Position
      |
      v
Player Falls / Fails
      |
      v
Recovery Trigger
      |
      v
Last Valid Position
```

This prevented traversal failures from requiring the player to restart an entire level.

The system also temporarily blocked the character during the teleportation process before returning control to the player.

<!-- VIDEO: Player recovery demonstration -->

## Level Design

In addition to programming, I worked on level design.

My level-design work focused on building spaces around the player's movement, abilities, combat mechanics, and collectible objectives.

I worked with:

- Platforming
- Traversal
- Collectibles
- Combat encounters
- Environmental hazards
- Player recovery
- Ability usage
- Movement challenges

The goal was to create spaces where the player's abilities were not only available, but encouraged through the layout of the environment.

<!-- IMAGE: Level overview -->

<!-- IMAGE: Level screenshot -->

<!-- IMAGE: Additional level screenshot -->

<!-- VIDEO: Level walkthrough -->

---

# Systems Integration

One of my most important responsibilities was integrating systems developed by different members of the team.

Rather than working exclusively on isolated features, I connected gameplay systems through shared interfaces, managers, events, and persistent data.

```text
                       Game Manager
                            |
             ┌──────────────┼──────────────┐
             |              |              |
             v              v              v
         Save Data     Event System    Objectives
             |              |              |
             |         ┌────┼────┐         |
             |         v    v    v         |
             |      Health Water Score     |
             |              |              |
             └──────────────┼──────────────┘
                            |
                            v
                     Player Systems
                            |
                 ┌──────────┼──────────┐
                 v          v          v
              Combat    Movement    Abilities
```

My work included connecting:

- Player movement
- Combat
- Abilities
- Projectile management
- Health
- Water
- Objectives
- Collectibles
- Save data
- Game states
- UI events
- Level-specific triggers

This gave me experience working on gameplay as part of a larger team rather than only developing isolated features.

---

# Working Across Design & Programming

One of the things that made Tide and Tale particularly valuable to me was working across both programming and design.

Programming allowed me to build the systems behind the game, while level design allowed me to directly use those systems to create player experiences.

For example, the movement system influenced how I approached platforming spaces, while the hazard and trigger tools allowed me to iterate on gameplay encounters directly inside Unity.

```text
Gameplay Systems
       ↓
Player Abilities
       ↓
Level Design
       ↓
Player Experience
```

This combination helped me understand the relationship between technical systems and player-facing design.

---

# Challenges

Working on a larger team introduced challenges that I would not have encountered in smaller projects.

Different systems were developed independently, which meant integration was often as important as implementation.

I had to work with:

- Different gameplay systems
- Shared interfaces
- Dependencies between components
- Persistent game state
- Designer workflows
- Runtime and editor code
- Systems that were still changing during development

This taught me to think about gameplay code not only as individual features, but as part of a larger architecture.

---

# What I Learned

Tide and Tale was one of my most ambitious projects at the time.

Although the project was ultimately discontinued before release, it gave me experience working on a larger team and dealing with the complexity that comes with integrating multiple gameplay systems.

The project taught me how to:

- Build reusable gameplay systems
- Work with state-driven character controllers
- Separate input from gameplay logic
- Design systems around shared interfaces
- Use event-driven communication
- Implement persistent progression
- Build designer-facing Unity tools
- Use object pooling for frequently spawned objects
- Integrate systems created by other programmers
- Design levels around player abilities
- Think about gameplay architecture at team scale
- Balance programming and level-design responsibilities

Most importantly, it taught me that building a game with a team is not only about creating individual features. It is also about making sure those features can communicate, integrate, and remain usable by everyone else working on the project.

---

# Project Status

Tide and Tale was discontinued before the team could complete and release the game.

The build currently available is an older development build and does not represent the best state reached during development.

Because the project never received a final public release, I am presenting it primarily as a **development case study**.

The focus is on the systems I implemented, the tools I created, the levels I designed, and my experience integrating the work of a larger team.

<!-- OPTIONAL VIDEO: Older development build -->

---

# Technical Summary

| Category | Technologies / Responsibilities |
| --- | --- |
| Engine | Unity |
| Programming | C# |
| Gameplay | Character Controller, Combat, Abilities, Movement |
| Architecture | Interfaces, Events, State-Based Systems |
| Persistence | Save/Load, Collectibles, Triggers, Progression |
| Performance | Object Pooling |
| Tools | Unity Editor Tools, Gizmos, Scene Handles |
| Level Design | Platforming, Traversal, Combat Encounters |
| Team Role | Gameplay Programming, Tools, Level Design, Systems Integration |

---

# Final Reflection

Tide and Tale was never completed, but it remains an important project in my development as a game developer.

It was one of the first projects where I had to think beyond individual mechanics and consider how a larger collection of systems could work together.

The project gave me experience not only as a gameplay programmer, but also as a tools developer, level designer, and systems integrator.

While the final game was never released, the work I contributed became valuable experience that I have carried into later projects.