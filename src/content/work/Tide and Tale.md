---

title: Tide and Tale
publishDate: 2025-05-30
img: /Forces.jpg
img_alt: Tide and Tale gameplay
description: >
A 3D platformer collectathon set inside a world of stories, where a writer uses the power of water to defeat enemies, traverse the world, and uncover its mysteries. I worked across gameplay programming, tools programming, level design, and systems integration.
tags:

* Unity
* C#
* Gameplay Programming
* Level Design
* Tools Programming
* Systems Integration
  role: Gameplay Programmer
  engine: Unity
  language: C#
  projectType: 3D Platformer
  heroVideo: /Forces.jpg

---

# Tide and Tale

**3D Platformer · Collectathon · Team Project**

Tide and Tale is a 3D platformer collectathon set inside a world of stories.

The player takes the role of a writer who enters a mysterious world and discovers the ability to manipulate water. This ability becomes the foundation for combat, traversal, environmental interactions, and progression.

The project was one of my larger team-based Unity projects, giving me experience working not only on individual gameplay features, but also on the tools, systems, and integration required to make those features work together.

> **Project Status:** Development discontinued before release.
>
> The available build is an older development build and does not represent the best state reached during development. This case study focuses on my contributions and development work rather than presenting the build as a finished product.

---

# My Role

**Gameplay Programmer · Tools Programmer · Level Designer · Systems Integrator**

My work covered several areas of the project, with a particular focus on gameplay systems and the infrastructure connecting them.

### Main Contributions

* Player controller and movement systems
* Input architecture
* Character state management
* Combat and damage systems
* Projectile and ability systems
* Object pooling
* Game state management
* Save/load and progression systems
* Persistent collectibles and triggers
* Designer-facing Unity tools
* Environmental hazards
* Spline and path-based movement
* Player recovery systems
* Level design
* Integration of gameplay systems developed by other team members

This combination of responsibilities gave me experience working on both **feature implementation** and the systems required to integrate those features into a larger project.

---

# Player Controller

The player controller was one of my primary gameplay programming responsibilities.

I worked on a state-based character controller designed around the different movement and gameplay behaviors required by the project.

The controller supported states such as:

* Idle
* Running
* Jumping
* Dashing
* Sliding
* Tricking
* Pounding
* Recovering
* Blocked

Organizing these behaviors into states allowed movement rules and transitions to be handled independently instead of putting every behavior into one large update loop.

---

# Movement System

The controller handled both grounded and aerial movement.

The movement system included:

* Ground movement
* Air movement
* Acceleration
* Drag
* Gravity
* Slope-aware movement
* Camera-relative movement
* Character orientation
* Jumping
* Dashing
* Sliding
* Tricks
* Ground pounding
* Recovery states

The character used a kinematic motor for movement and collision handling, while the gameplay controller determined how the character should behave based on its current state.

This separation made it easier to add movement behaviors without completely rewriting the underlying character motor.

---

# State-Based Gameplay

The character's behavior was organized around explicit gameplay states.

```text
                     Character
                         |
         ┌───────────────┼───────────────┐
         |               |               |
       Ground           Air           Special
         |               |               |
      Idle/Run        Jumping       Dash/Trick
         |                               |
         └───────────────┬───────────────┘
                         |
                  Recovery / Blocked
```

Each state could define its own movement and transition behavior.

For example, a special movement state could modify how the character responds to input while active, then restore the appropriate movement behavior when the state ends.

This structure helped keep character behavior organized as more mechanics were added.

---

# Input Architecture

I separated input collection from character behavior through a centralized input manager and a structured `PlayerCharacterInputs` data structure.

Instead of having the character controller directly depend on keyboard or controller input, the input system collected the current controls and converted them into gameplay-oriented commands.

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

This separation meant that the character controller could operate on gameplay commands instead of being tightly coupled to the specific input source.

It also made the controller easier to reason about because input collection and movement behavior had separate responsibilities.

---

# Combat Architecture

I worked on the combat architecture, including the communication between attacks, enemies, defenses, and health systems.

The system used shared interfaces for damage senders and receivers.

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

This allowed different gameplay objects to communicate through the same damage architecture.

Instead of each attack requiring a completely different interaction with every enemy, damage information could be passed through a shared structure and interpreted by the receiving system.

---

# Armor & Damage Types

One of the combat mechanics I worked on was an armor system that responded differently depending on the type of incoming attack.

For example, an enemy could require a ranged attack to break its armor before becoming vulnerable to another type of attack.

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
     Break Armor             |
          |                 |
          └────────┬────────┘
                   |
                   v
              Damage Health
```

The system used `DamagePayload` to communicate information about an attack.

This allowed the receiving object to determine whether the incoming damage was appropriate for its current state.

The result was a combat system where the player's available abilities could have different gameplay purposes rather than simply dealing different amounts of damage.

---

# Projectile & Ability System

I implemented a reusable projectile management system based around `ScriptableObject` projectile definitions.

Projectile data could be separated from the runtime manager responsible for selecting, spawning, and reusing projectile instances.

The system supported:

* Multiple projectile types
* Projectile selection
* Cycling between projectiles
* Runtime projectile unlocking
* Duplicate prevention
* Per-projectile object pools
* Runtime pool expansion
* Returning projectiles to their pools

The overall structure was:

```text
             ProjectileSO
              /    |    \
             /     |     \
         Type A  Type B  Type C
             \     |     /
              \    |    /
           ProjectileManager
                   |
          ┌────────┴────────┐
          |                 |
    Current Type       Object Pools
```

This separated the definition of a projectile from the runtime systems managing its instances.

---

# Object Pooling

Because projectiles could be spawned repeatedly during gameplay, I implemented object pooling to reduce repeated instantiation and destruction.

Each projectile type maintained its own pool.

```csharp
private Dictionary<ProjectileSO, Queue<GameObject>> pools = new();
```

When a projectile was needed, the system could retrieve an inactive instance:

```csharp
GameObject projectile = poolQueue.Dequeue();
projectile.SetActive(true);
```

After the projectile finished its behavior, it could be returned to the pool:

```csharp
obj.SetActive(false);
pools[proj].Enqueue(obj);
```

The system could also expand a pool when all existing instances were currently being used.

This made projectile spawning reusable while avoiding unnecessary repeated creation and destruction of GameObjects.

---

# Progression & Persistence

I implemented systems for tracking persistent player progression and level-specific state.

The save system stored information such as:

* Current level
* Player position
* Player rotation
* Coins
* Key collectibles
* Unlocked power-ups
* Persistent trigger states

The save structure separated global progression from level-specific information.

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

This allowed the game to preserve progression between sessions while keeping level-specific information associated with its corresponding level.

---

# Collectible System

I created a reusable collectible architecture based around unique IDs.

Rather than only storing a global number of collected objects, individual collectibles could be identified separately.

This allowed the save system to remember which specific collectibles had already been collected.

```csharp
protected string GenerateUniqueID()
{
    return $"{gameObject.scene.name}_{GetType().Name}_{transform.position.GetHashCode()}_{gameObject.name}";
}
```

When the game loaded, previously collected objects could be disabled according to their saved IDs.

This made the system applicable to different types of persistent collectibles.

---

# Persistent Trigger System

I also worked on a configurable trigger system for gameplay and level interactions.

Triggers could be configured to respond to:

* Enter
* Stay
* Exit

They could also filter objects using:

* Tags
* Layers

Additional configuration included:

* Startup delays
* Duration timers
* UnityEvents
* Different materials for trigger states
* Persistent trigger states

The general flow was:

```text
Player
   |
   v
Trigger
   |
   ├── Filter Target
   |
   ├── Startup Delay
   |
   ├── UnityEvent
   |
   ├── Duration
   |
   └── Save State
```

When configured as persistent, a trigger's state could be stored and restored when returning to the level.

---

# Event-Driven Architecture

I worked with a centralized event system to allow different gameplay systems to communicate without requiring every component to maintain direct references to every other system.

The event layer handled gameplay changes such as:

* Health changes
* Damage
* Player death
* Enemy death
* Water changes
* Score changes
* Main collectibles
* Objective completion
* Game state changes

For example:

```csharp
public static event Action OnHealthChanged;

public static event Action OnPlayerDeath;

public static event Action OnEnemyDeath;

public static event Action OnScoreChanged;

public static event Action OnMainCollected;

public static event Action<GameState> OnGameStateChanged;
```

Systems could broadcast events while other systems, such as UI or progression systems, could subscribe to them.

This reduced the amount of direct coupling between gameplay systems and presentation or progression systems.

---

# Game State Management

I also worked on centralized game-state management.

The game used states such as:

```csharp
public enum GameState
{
    MainMenu,
    InGame,
    GameOver
}
```

Changing the game state could notify other systems through the event architecture.

This gave systems such as UI and gameplay a common source of truth for the current state of the game.

---

# Designer-Facing Tools

Another important part of my role was creating tools that allowed gameplay objects to be configured and iterated on directly inside Unity.

The goal was to move common gameplay configuration away from hard-coded values and into the Unity editor.

This was especially useful for level-design tasks where movement paths, hazards, and environmental behaviors needed to be adjusted repeatedly.

---

# Moving Saw Tool

I created a reusable moving-saw hazard that could be configured through the Unity Inspector.

The system supported configuration for:

* Movement speed
* Rotation speed
* Rotation axis
* Waypoints
* Wait time
* Ping-pong movement
* Local/world waypoint positioning
* Damage behavior

The hazard integrated with the project's damage architecture through `IDamageSender`.

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

This allowed the hazard to use the same damage communication pattern as other gameplay systems.

---

# Scene View Waypoint Editing

To make moving hazards easier to author, I implemented Scene view visualization for their waypoints.

The tool displayed:

* Waypoint positions
* Waypoint connections
* Waypoint numbers
* Editable position handles

Designers could therefore modify movement paths directly in the Scene view rather than manually entering coordinates.

This made path editing more visual and reduced iteration time during level design.

---

# Bézier Path Tool

I also implemented a Bézier visualization and calculation tool for creating curved paths.

The tool exposed parameters including:

* Starting position
* Forward distance
* Control point offset
* Resolution
* Camera-relative positioning

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

The resulting curve could be visualized directly in the Unity Scene view using Gizmos.

This allowed path behavior to be tested visually while developing the associated gameplay systems.

---

# Spline Movement

I also integrated Unity's Spline system with the project's physics mover architecture.

The system connected designer-authored splines with runtime movement:

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

This allowed objects to follow paths authored visually by designers while still using the project's existing movement architecture.

---

# Player Recovery

I implemented a player recovery system that tracked the player's last valid grounded position.

The general flow was:

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

When the player entered a recovery situation, the system could return them to their last valid platform.

This prevented traversal failures from requiring the player to restart an entire level.

The system also temporarily blocked player control during the recovery process before returning control to the player.

---

# Level Design

Alongside programming, I worked on level design.

My level-design work focused on building spaces around the player's movement, abilities, combat systems, hazards, and collectible objectives.

I worked with:

* Platforming
* Traversal
* Collectibles
* Combat encounters
* Environmental hazards
* Player recovery
* Ability usage
* Movement challenges

Programming the gameplay systems also influenced how I designed the levels.

Because I understood how the movement, hazards, and abilities worked internally, I could design spaces around their actual capabilities and limitations.

---

# Systems Integration

One of my most valuable responsibilities on Tide and Tale was integrating systems developed by different members of the team.

Instead of only implementing isolated features, I worked on connecting gameplay systems through shared interfaces, managers, events, and persistent data.

The overall relationship between systems could be thought of as:

```text
                    Game Systems
                         |
          ┌──────────────┼──────────────┐
          |              |              |
          v              v              v
      Save Data      Event System    Objectives
          |              |              |
          |        ┌─────┼─────┐        |
          |        v     v     v        |
          |      Health Water Score     |
          |              |              |
          └──────────────┼──────────────┘
                         |
                         v
                  Player Systems
                         |
              ┌──────────┼──────────┐
              v          v          v
           Combat    Movement   Abilities
```

This meant dealing with dependencies between:

* Player movement
* Combat
* Abilities
* Projectile management
* Health
* Water
* Objectives
* Collectibles
* Save data
* Game states
* UI events
* Level-specific triggers

This was an important step in learning how to work on gameplay code as part of a larger architecture rather than treating each feature as an isolated system.

---

# Working Across Programming & Design

Tide and Tale also gave me experience working between programming and level design.

The systems I programmed directly affected how levels could be designed, while level-design requirements influenced how those systems needed to be exposed and configured.

This relationship became particularly important for tools programming.

```text
Gameplay Systems
       |
       v
Player Abilities
       |
       v
Level Design
       |
       v
Player Experience
```

For example, configurable hazards and movement paths allowed me to iterate on level layouts without repeatedly changing gameplay code.

This helped me understand tools programming as part of the gameplay-development workflow rather than as a separate discipline.

---

# Challenges

The biggest challenge was working with a large number of interconnected systems while the project was still changing.

Different team members were responsible for different areas of the game, which meant that implementation and integration often happened simultaneously.

I had to work with:

* Shared interfaces
* Gameplay dependencies
* Persistent state
* Runtime systems
* Editor tools
* Designer workflows
* Systems that were still evolving

This taught me that good gameplay programming is not only about making a feature work in isolation.

It also needs to provide a clear way for other systems and team members to use that feature.

---

# What I Learned

Tide and Tale was one of my most valuable projects for learning how to work on a larger Unity game.

The project strengthened my understanding of:

* State-based character controllers
* Gameplay architecture
* C# interfaces
* Event-driven communication
* Object pooling
* Persistent progression
* Save/load systems
* Runtime state management
* Unity Editor tooling
* Scene view visualization
* Spline-based movement
* Gameplay-system integration
* Level design
* Team-based development

The most important lesson was learning to think beyond individual mechanics.

A gameplay programmer working on a team needs to consider how a system will be:

**implemented → configured → communicated → reused → integrated**

That became one of the main takeaways I carried into later projects.

---

# Project Status

Tide and Tale was discontinued before the team could complete and release the game.

The currently available build is an older development build and does not represent the best state reached during development.

For that reason, I present Tide and Tale primarily as a **development case study**.

The focus is on the systems I programmed, the tools I developed, the levels I designed, and the experience I gained integrating multiple areas of a larger Unity project.

---

# Technical Summary

| Category     | Technologies / Responsibilities                                |
| ------------ | -------------------------------------------------------------- |
| Engine       | Unity                                                          |
| Programming  | C#                                                             |
| Gameplay     | Character Controller, Movement, Combat, Abilities              |
| Architecture | Interfaces, Events, State-Based Systems                        |
| Persistence  | Save/Load, Collectibles, Triggers, Progression                 |
| Performance  | Object Pooling                                                 |
| Tools        | Unity Editor Tools, Gizmos, Scene Handles                      |
| Movement     | Kinematic Motor, Splines, Bézier Paths                         |
| Level Design | Platforming, Traversal, Combat Encounters                      |
| Team Role    | Gameplay Programming, Tools, Level Design, Systems Integration |

---

# My Contributions

### Gameplay Programming

* Player controller
* Movement states
* Jumping
* Dash
* Slide
* Trick
* Ground pound
* Recovery
* Combat
* Damage interactions
* Projectile management
* Ability systems

### Systems Programming

* Game state management
* Event system
* Save/load
* Persistent progression
* Collectibles
* Persistent triggers
* Object pooling

### Tools Programming

* Configurable gameplay hazards
* Waypoint editing
* Scene view visualization
* Moving hazard tools
* Bézier path visualization
* Spline movement integration
* Designer-facing configuration

### Level Design

* Platforming spaces
* Traversal challenges
* Combat encounters
* Collectible placement
* Environmental hazards
* Player recovery

### Systems Integration

* Integrated gameplay systems developed by different team members
* Connected gameplay, progression, UI, and state systems
* Worked with shared interfaces and events
* Integrated runtime systems with designer-facing tools
* Maintained interactions between different gameplay systems

---

# Final Reflection

Tide and Tale was never completed, but it represents an important stage in my development as a gameplay programmer.

Unlike smaller projects where I could focus primarily on individual mechanics, this project required me to think about how multiple systems could communicate and how those systems could be exposed to the rest of the team.

My work ranged from the player controller and combat systems to save data, object pooling, editor tools, level design, and systems integration.

That breadth made the project particularly valuable because it taught me to approach gameplay programming as an interconnected discipline:

## **Build the mechanic → design the system → expose the system → integrate the system → use it to create gameplay.**
