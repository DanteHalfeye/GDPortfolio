---
title: Dream Valley
publishDate: 2023-01-01 00:00:00
img: /assets/DV1.jpeg
img_alt: Dream Valley first-person puzzle horror game
description: >
  My first 3D game, Dream Valley is a first-person puzzle horror experience where players explore a mysterious house, uncover its story through scattered notes, and evade a hostile white ghoul. The project focused on AI, state-machine architecture, modular gameplay systems, and technical problem solving.
tags:
  - Unity
  - C#
  - Gameplay Programming
  - AI
  - Systems Programming
  - Technical Design
role: Gameplay Programmer & Technical Designer
engine: Unity
language: C#
projectType: First-Person Puzzle Horror
heroVideo: /assets/DreamValleyss.mp4
featuredImages:
  - src: /assets/DV2.jpeg
    alt: Dream Valley gameplay
  - src: /assets/DV3.jpeg
    alt: Dream Valley environment
  - src: /assets/DV4.jpeg
    alt: Dream Valley gameplay
gallery:
  - /assets/DV2.jpeg
  - /assets/DV3.jpeg
  - /assets/DV4.jpeg
  - /assets/DV5.jpeg
  - /assets/DreamValleyss.mp4
---

## Overview

**Dream Valley** was my first experience developing a **3D game**, combining first-person exploration, environmental puzzles, narrative discovery, and horror.

The player explores a mysterious house, discovering its story through notes scattered throughout the environment. At the same time, a hostile white ghoul searches for the player, creating tension between exploration and survival.

For me, the project was primarily an opportunity to move beyond simple gameplay scripting and learn how to structure larger gameplay systems. I worked on the player's state-driven behavior, enemy AI, interaction systems, persistent objects, and technical tools that helped the rest of the team build content.

## My Role

I worked as a **Gameplay Programmer and Technical Designer**, focusing on the systems that connected player behavior, enemy behavior, interaction, and level content.

My responsibilities included:

- Gameplay programming
- Enemy AI
- State machine architecture
- Player movement
- Stamina systems
- Player interaction
- Raycast-based detection
- Trigger systems
- Persistent objects
- Input handling
- Navigation
- Animation integration
- Technical tools
- Debugging tools
- Technical support for the team

## Hierarchical State Machine

One of the most important technical challenges of Dream Valley was implementing a **state-based architecture** for both the player and enemy.

This was my first time working with a **Hierarchical State Machine**, so I spent approximately a month studying the pattern and learning how to apply it to gameplay.

Instead of putting every behavior inside a single `Update()` method, I separated behaviors into individual state classes.

The player had states such as:

- Moving
- Running
- Tired
- Interacting
- Hiding

The enemy used a similar architecture with states including:

- Roaming
- Chasing
- Searching
- Repositioning
- Jump Scare

The state machine controlled which behavior was active and provided a central way to transition between behaviors.

For example, the enemy could transition from roaming into chasing when it detected the player:

```csharp
if (hit.transform.gameObject.layer == playerLayer &&
    hit.distance < stateMachine.DetectionDistance)
{
    SwitchState(stateMachine.enemyChase);
}
```

This separation made individual behaviors easier to develop and modify without turning the main controller into one large collection of conditional statements.

## Enemy AI

The white ghoul was one of the main gameplay systems I programmed.

The enemy uses Unity's **NavMeshAgent** to navigate through the environment while a custom state machine controls its behavior.

### Roaming

While roaming, the enemy selects random positions around the player's area and uses the NavMesh to find valid locations.

```csharp
Vector3 randomPoint = center + Random.insideUnitSphere * range;

if (NavMesh.SamplePosition(
    randomPoint,
    out hit,
    1.0f,
    NavMesh.AllAreas))
{
    result = hit.position;
}
```

This created unpredictable movement instead of having the enemy follow a fixed patrol path.

### Player Detection

The enemy also uses raycasts to determine whether the player is visible.

The detection system checks:

- Distance to the player
- Raycast obstruction
- Player layer
- Detection range

If the player is visible, the enemy switches into its chase state.

If the player disappears from view, the AI starts a short countdown before abandoning the chase.

### Chase Behavior

During the chase state, the NavMeshAgent continuously updates its destination toward the player.

The AI also checks whether the player is still visible:

```csharp
enemyController.destination = playerTransform.position;

Vector3 direction =
    playerTransform.position - enemyTransform.position;

if (Physics.Raycast(
    enemyTransform.position,
    direction,
    out RaycastHit hit))
{
    if (hit.transform.gameObject.layer == playerLayer &&
        hit.distance < stateMachine.DetectionDistance)
    {
        stateMachine.PlayerLost = false;
    }
    else
    {
        stateMachine.PlayerLost = true;
    }
}
```

This combination of navigation, perception, and state transitions gave the enemy behavior rather than simply making it move directly toward the player.

## Player State Architecture

The same state-machine approach was used for the player.

The `PlayerStateMachine` creates and manages individual player states and forwards the current update to the active state.

```csharp
currentState = movingState;
CurrentState.EnterState();
```

During gameplay:

```csharp
currentState.UpdateState();
```

The architecture allowed different player behaviors to be isolated from one another.

This became especially useful for systems such as:

- Walking
- Running
- Stamina exhaustion
- Hiding
- Interacting

Instead of making the player controller responsible for every gameplay decision, the state system determined which behavior should currently control the player.

## Player Movement & Stamina

I implemented the core first-person movement using Unity's **CharacterController**.

Movement uses smoothed input and camera-relative directions rather than immediately applying the raw input vector.

```csharp
currentDir = Vector2.SmoothDamp(
    currentDir,
    targetDir,
    ref currentDirVelocity,
    moveSmoothTime
);
```

The controller also handles:

- Gravity
- Ground detection
- Slopes
- Movement smoothing
- Walking speed
- Sprinting
- Stamina consumption
- Stamina regeneration

The stamina system was connected to the player's state system so that exhausting the stamina resource could affect the player's available movement behavior.

## Interaction Systems

I also built the foundation for first-person environmental interaction.

One approach used raycasting from the camera to determine what the player was looking at:

```csharp
Ray ray = cam.ScreenPointToRay(Input.mousePosition);

if (Physics.Raycast(ray, out RaycastHit hit))
{
    if (hit.collider.CompareTag("Interactable") &&
        hit.distance <= 3)
    {
        interactedWith = hit.collider.gameObject;
    }
}
```

This allowed objects in the environment to become interactable based on:

- What the player was looking at
- Distance from the player
- Object tags
- Player input

I also created a separate interaction component that checked whether an object was within a specific distance and viewing angle.

This was used to provide visual feedback for objects that were currently within interaction range.

## Modular Gameplay Architecture

A major goal of the project was making the gameplay code easier for the rest of the team to use.

Rather than requiring designers to modify the player controller or enemy logic directly, I separated systems into components responsible for specific behaviors.

This included:

- Player controller
- Player state machine
- Enemy state machine
- Interaction detection
- Persistent object spawning
- Player damage
- Spawn points
- Environmental interaction

This separation helped reduce dependencies between gameplay code and level content.

It also gave me an early understanding of an important gameplay programming principle:

> A gameplay system should not only work; other people should be able to work with it.

## Persistent Objects

I implemented a persistent object spawner for objects that needed to survive scene changes.

The system keeps track of whether the persistent objects have already been spawned:

```csharp
if (hasSpawned)
    return;

SpawnPersistentObjects();
hasSpawned = true;
```

Each configured prefab is instantiated and marked with:

```csharp
DontDestroyOnLoad(persistantObject);
```

This allowed selected gameplay objects to remain available when transitioning between scenes.

## Gameplay Events & Design Patterns

Dream Valley was also where I began introducing more formal programming patterns to the project.

### Singleton Pattern

I taught the team how persistent objects could be structured similarly to a Singleton, allowing systems to remain available across scenes without being recreated.

This helped us understand how persistent gameplay managers and shared systems can be structured.

### Observer Pattern

I also introduced the **Observer Pattern** for gameplay events and triggers.

The goal was to allow one system to notify other systems without creating direct dependencies between them.

This was particularly useful for environmental and puzzle interactions, where one event could trigger behavior in another system.

Learning these patterns helped me move away from writing isolated scripts and toward thinking about how different gameplay systems communicate.

## Technical Debugging Tools

One of the more practical tools I created was a Unity Editor utility for finding missing scripts.

The tool searches through prefabs and scene objects and detects components that are `null`, which can indicate a missing MonoBehaviour reference.

For example:

```csharp
foreach (Component component in
         gameObject.GetComponentsInChildren<Component>())
{
    if (component == null)
    {
        Debug.Log(
            "GameObject found with missing script: " +
            gameObject.name,
            gameObject
        );

        break;
    }
}
```

I also created an editor command for removing missing scripts from scene objects.

This was an important lesson in **tools programming**: solving recurring development problems with small internal tools can save significantly more time than repeatedly fixing the same issue manually.

## Technical Problem Solving

The project required me to work across several different areas of Unity at the same time.

I worked with:

- CharacterController
- NavMeshAgent
- Unity AI Navigation
- Unity's New Input System
- Raycasting
- Coroutines
- UnityEvents
- Persistent objects
- Animator integration
- Rendering effects
- Editor scripting
- C# state machines

This was also my first project where I had to think about how multiple systems interact instead of treating every feature as an isolated script.

## Production

**Dream Valley** was developed using a structured **SCRUM** workflow.

We organized development into sprints and used sprint reviews to evaluate progress and coordinate upcoming work.

Working in a four-person team also meant that programming decisions affected everyone else's ability to create content.

This made modularity and communication important parts of my role.

## Challenges

The largest challenge was balancing ambitious technical goals with a **three-month development timeline**.

We experimented with **FMOD** for the game's audio system and spent time learning how to integrate it into our workflow. However, we ultimately had to prioritize the systems necessary for the playable experience and shipped without the planned FMOD implementation.

This taught me an important production lesson: technical experimentation has value, but it needs to be balanced against the time and risk it introduces to the project.

## What I Learned

Dream Valley was a major milestone in my development as a gameplay programmer.

It was my first 3D game and my first serious experience with more advanced gameplay architecture.

The most important things I learned were:

- How to structure gameplay around state machines
- How to build basic AI using navigation and perception
- How to separate gameplay responsibilities into components
- How to use events to reduce system dependencies
- How persistent objects work across scenes
- How player input can be separated from gameplay behavior
- How to build small debugging tools for the development team
- How programming decisions affect the workflow of designers and artists

Most importantly, I learned that gameplay programming is not only about implementing mechanics. It is also about creating systems that are **predictable, reusable, debuggable, and usable by the rest of the team**.

## Project Details

| | |
|---|---|
| **Team Size** | 4 |
| **Project Length** | 3 months |
| **Engine** | Unity |
| **Language** | C# |
| **Role** | Gameplay Programmer & Technical Designer |
| **Project Type** | First-Person Puzzle Horror |
| **Tools** | Adobe Creative Suite, Google Docs, Notion, Clip Studio Paint, Blender |

### Team

- **Alejandro Velásquez**
- **Juan Esteban Calle**
- **Juan Gaviria**
- **Me** — Gameplay Programming & Technical Design

## Technologies

**Unity · C# · NavMesh · CharacterController · Hierarchical State Machines · Observer Pattern · New Input System · Raycasting · UnityEvents · Coroutines · Editor Scripting · Mixamo · Blender**