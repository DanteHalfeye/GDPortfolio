---
title: Dreamy Bubbles
publishDate: 2025-02-02 00:00:00
img: /assets/LOGO.png
img_alt: Dreamy Bubbles gameplay
description: >
  — Global Game Jam 2025 — A first-person puzzle game where players use bubbles to manipulate objects and solve environmental puzzles through synchronized interactions.
tags:
  - Unity
  - C#
  - Gameplay Programming
  - Systems Programming
  - First-Person
  - Puzzle
  - Global Game Jam
role: Gameplay Programmer
engine: Unity
language: C#
projectType: First-Person Puzzle Game
heroVideo: /assets/JACKYVER2.png
featuredImages:
  - src: /assets/JACKYVER2.png
    alt: Dreamy Bubbles logo
  - src: /assets/LOGOVER2.png
    alt: Dreamy Bubbles logo variation
gallery:
  - /assets/JACKYVER2.png
  - /assets/LOGOVER2.png
  - /assets/JACKYVER1.png
  - /assets/JACKYVER3.png
  - /assets/CARA1.png
  - /assets/CARA2.png
---

# Dreamy Bubbles

**Dreamy Bubbles** is a first-person puzzle game created for **Global Game Jam 2025**.

The game is built around a simple systemic rule:

> Interacting with one object can cause every matching object in the environment to react simultaneously.

This transforms a basic interaction into a puzzle mechanic. Instead of treating each object as an isolated gameplay element, the game creates relationships between objects and lets the player discover how those relationships affect the environment.

My main contribution was the programming of the interaction systems, including the bubble interaction, reusable interaction interface, synchronized object behavior, environmental puzzles, and event-driven gameplay.

## My Role

I worked as the **Gameplay Programmer**, focusing on the systems that powered the game's central interaction and environmental puzzles.

My responsibilities included:

- Programming the bubble interaction.
- Implementing temporary bubble activation.
- Creating the reusable interaction interface.
- Implementing synchronized object interactions.
- Building tag-based object grouping.
- Implementing object destruction and transformation.
- Creating event-driven interactions.
- Programming button-based doors.
- Programming key-and-door interactions.
- Integrating gameplay systems with Unity physics and triggers.
- Testing and debugging gameplay interactions.
- Supporting the rapid iteration required by the Game Jam.

The main programming goal was to create reusable systems that could support multiple puzzle interactions without requiring a completely separate implementation for every object.

## Core Gameplay Loop

The gameplay loop is based around experimentation and understanding consequences:

**Interact → Observe → Understand → Predict → Solve**

Players explore the environment and use bubbles to interact with objects.

The important part is what happens after the interaction.

If several objects belong to the same interaction group, interacting with one can affect all of them simultaneously.

The player therefore has to understand not only the object directly in front of them, but also the other objects connected to it.

## The Core Mechanic

The defining mechanic of Dreamy Bubbles is **synchronized object interaction**.

When an object is interacted with, the system identifies other matching objects and applies the same behavior to them.

For example:

> If the player interacts with one red box, every red box in the environment can react.

This creates a simple relationship:

**One interaction → Multiple consequences**

The mechanic allows the level itself to provide complexity without requiring a complicated control scheme.

Players only need to understand how to interact with objects. The puzzle comes from understanding what those interactions will cause elsewhere.

## Bubble Interaction

I implemented the system responsible for activating the player's bubble cannon.

The cannon begins disabled and is temporarily activated when the player performs the interaction.

The system uses a coroutine to control the duration of the interaction state.

    using UnityEngine;
    using System.Collections;

    public class CharacterThrowBubbles : MonoBehaviour
    {
        [SerializeField] private GameObject BubbleCannon;

        void Start()
        {
            BubbleCannon.SetActive(false);
        }

        void Update()
        {
            if (Input.GetMouseButtonDown(0))
            {
                BubbleCannon.SetActive(true);
                StartCoroutine(ResetBubble());
            }
        }

        IEnumerator ResetBubble()
        {
            yield return new WaitForSeconds(0.5f);
            BubbleCannon.SetActive(false);
        }
    }

The coroutine makes the bubble interaction a short burst rather than a permanent state.

This was a practical solution for the Game Jam because it kept the implementation simple while providing a clear interaction window.

## Reusable Interaction Interface

I created an `IInteractable` interface to establish a common contract for gameplay objects that could respond to interactions.

    using UnityEngine;

    public interface IInteractable
    {
        void InteractedWith();
        void Vanish();
        void Resize(float amount);
        void GenerateHUDRender();
    }

The interface allowed different gameplay objects to expose a consistent set of interaction behaviors.

This was useful during rapid development because new interactive objects could follow the same basic structure rather than requiring an entirely separate interaction architecture.

The interface also separated the idea of **what an object can do** from the implementation of the object itself.

## Synchronized Object Interaction

The most important programming system in Dreamy Bubbles is the ability to affect multiple instances of the same object.

The `Interactable` component stores the object's tag and uses it to find other objects belonging to the same interaction group.

    private GameObject[] FindAllObjectsWithTag()
    {
        return GameObject.FindGameObjectsWithTag(thisTag);
    }

The system can then apply an interaction to every matching object.

For example, `Vanish()` removes all objects belonging to the same group:

    public void Vanish()
    {
        foreach (GameObject obj in FindAllObjectsWithTag())
        {
            Destroy(obj);
        }
    }

This creates the foundation for the game's main puzzle mechanic.

A single player action can therefore modify multiple parts of the level.

## Object Transformation

The same interaction system can modify objects instead of simply destroying them.

For example, I implemented a resize interaction:

    public void Resize(float amount)
    {
        foreach (GameObject obj in FindAllObjectsWithTag())
        {
            obj.transform.localScale = new Vector3(
                obj.transform.localScale.x + amount,
                obj.transform.localScale.y + amount,
                obj.transform.localScale.z + amount
            );
        }
    }

This demonstrates how the synchronized interaction system could support multiple types of object behavior.

The underlying relationship stays the same while the result of the interaction can change.

This gave the puzzle design additional possibilities without requiring a completely different system for every interaction.

## Event-Driven Interaction

The interaction system communicates through a shared event.

The `Interactable` component subscribes to `StaticEventHandler.OnSelected` when enabled.

    private void OnEnable()
    {
        StaticEventHandler.OnSelected += InteractedWith;
        thisTag = this.gameObject.tag.ToString();
    }

    private void OnDisable()
    {
        StaticEventHandler.OnSelected -= InteractedWith;
    }

When the event is triggered, the object responds through `InteractedWith()`.

    public void InteractedWith()
    {
        StaticEventHandler.savedInteractable = this.gameObject;
        print(this.gameObject);
        Vanish();
    }

This separates input selection from the behavior of the object.

The interactive object does not need to directly control the player's input. It listens for the relevant event and handles its own response.

This was a useful architectural pattern for a project with multiple types of interactive objects.

## Environmental Puzzle Systems

The synchronized object mechanic was supported by additional environmental systems.

I implemented puzzle elements including:

- Multi-button doors.
- Key-and-door interactions.
- Objects that could disappear.
- Objects that could change size.
- Temporary bubble interactions.

These systems allowed the core interaction mechanic to produce different types of puzzle situations.

Rather than adding complexity to the player's controls, the complexity was moved into the relationships between objects in the environment.

## Button-Based Doors

I implemented a door system that requires multiple buttons to be activated.

Each button detects when an object enters or leaves its trigger and communicates with the associated door.

    void OnTriggerEnter(Collider other)
    {
        Debug.Log("This entered me -> " + other.name);
        door.activeButtons++;
        door.OpenDoor();
    }

    void OnTriggerExit(Collider other)
    {
        Debug.Log("This Exited me -> " + other.name);
        door.activeButtons--;
        door.CloseDoor();
    }

The door tracks how many buttons are currently active.

This allows the same system to support different puzzle configurations by changing the number of required buttons.

## Door State Management

The `DoorWithButton` component determines whether the door should be open based on its current button state.

    [SerializeField] int requiredButtons;
    public int activeButtons;

    public void OpenDoor()
    {
        if (activeButtons == requiredButtons)
        {
            this.gameObject.SetActive(false);
        }
    }

    public void CloseDoor()
    {
        if (activeButtons != requiredButtons)
        {
            this.gameObject.SetActive(true);
        }
    }

The door remains active until the required number of buttons are activated.

If a button is released, the door can become active again.

This creates a reusable environmental puzzle that can be configured for different numbers of required inputs.

## Key & Door System

I also implemented a key-based progression system.

When the player collects the key, it changes the state of its associated door.

    void GetKey()
    {
        door.isLocked = false;
        this.gameObject.SetActive(false);
    }

The key disappears after collection while the door stores its unlocked state.

This separates the two responsibilities:

- The key changes the state.
- The door reacts to its current state.

## Door Unlocking

The door checks its locked state when the player reaches it.

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            if (isLocked == false)
            {
                meshDestroy.DestroyMesh();
            }
        }
    }

This keeps the key and door systems loosely connected.

The key does not need to directly control the visual behavior of the door. It only changes the door's state.

The door then determines what should happen when the player interacts with it.

## Puzzle Design

The puzzle design is based around **systemic interactions and consequences**.

Players must understand that their actions can affect multiple objects simultaneously.

This encourages experimentation:

- Try an interaction.
- Observe the result.
- Identify the relationship.
- Predict future consequences.
- Use the relationship to solve the puzzle.

The mechanic is intentionally simple from a control perspective.

The complexity comes from the environment and the relationships between its objects.

## Simple Controls, Complex Consequences

One of the main design principles behind Dreamy Bubbles was:

**Simple interaction → Complex consequences**

The player does not need a large collection of abilities or complicated controls.

Instead, the environment determines how complicated an interaction becomes.

For example, interacting with one object might:

- Remove another object.
- Change the size of several objects.
- Affect a path through the level.
- Change the state of a puzzle.
- Alter what the player can reach next.

This allowed the project to create more interesting puzzles without significantly increasing the complexity of the player controller.

## Object Relationships

The interaction system treats objects as members of larger groups rather than completely independent entities.

An object can affect:

- Other instances of itself.
- Doors.
- Puzzle states.
- Environmental layouts.
- Player progression.

This creates indirect interactions where the player needs to think beyond the object immediately in front of them.

The system therefore supports a more systemic style of puzzle design.

## Technical Architecture

The gameplay systems were divided into focused components.

### CharacterThrowBubbles

Responsible for:

- Detecting the bubble input.
- Activating the bubble cannon.
- Controlling the temporary interaction state.

### IInteractable

Responsible for:

- Defining the common interaction contract.
- Providing shared interaction behaviors.

### Interactable

Responsible for:

- Responding to interaction events.
- Identifying interaction groups.
- Finding matching objects.
- Applying interactions to those objects.
- Destroying or transforming matching objects.

### DoorButton

Responsible for:

- Detecting button activation.
- Tracking trigger entry and exit.
- Communicating with the associated door.

### DoorWithButton

Responsible for:

- Tracking active buttons.
- Comparing active buttons with the required amount.
- Opening and closing the door.

### KeyPickup

Responsible for:

- Detecting the player.
- Unlocking the associated door.
- Removing the collected key.

### DoorWithKey

Responsible for:

- Tracking the locked state.
- Checking whether the door is unlocked.
- Removing the obstacle when the player reaches it.

This component-based structure allowed individual gameplay systems to remain relatively focused.

## Why This Architecture Worked for the Game Jam

The project was developed under a very limited deadline, so the architecture needed to prioritize iteration speed.

The tag-based object grouping system was a practical Game Jam solution.

Instead of building a more complex object registry or relationship database, matching objects could be identified using Unity tags.

This made it fast to create new puzzle groups and experiment with different object relationships.

The tradeoff was that the approach was designed for the relatively small scope of the Game Jam rather than as a production-scale object management system.

That constraint was acceptable because the primary goal was to prototype and validate the gameplay idea quickly.

## Rapid Prototyping

Dreamy Bubbles was developed during **Global Game Jam 2025**, which meant that implementation speed was critical.

The development process focused on building the core interaction first.

Once the bubble interaction and synchronized object system were working, additional puzzle mechanics could be built around the same foundation.

This created a simple development loop:

**Prototype mechanic → Test → Build puzzle → Test → Iterate**

The reusable interaction structure made it possible to experiment with different puzzle behaviors without rebuilding the interaction system each time.

## Programming Challenges

### Synchronizing Objects

The biggest technical challenge was allowing one interaction to affect multiple objects.

The objects needed to share an interaction relationship without each object manually referencing every other object.

Using tags provided a simple way to group matching objects and retrieve them when an interaction occurred.

### Connecting Systems

Another challenge was connecting individual gameplay systems without making them dependent on each other.

The event-driven interaction system helped separate player interaction from the behavior of individual objects.

This allowed the player-facing interaction and environmental responses to remain separate responsibilities.

### Rapid Iteration

Because the project was developed during a Game Jam, systems had to be quick to modify.

The reusable interaction interface and component-based structure made it easier to add or change puzzle behaviors during development.

## My Contribution

My primary contribution was the gameplay programming behind the interaction and puzzle systems.

I implemented:

- Bubble interaction.
- Temporary bubble activation.
- `IInteractable`.
- Synchronized object interactions.
- Tag-based object grouping.
- Object destruction.
- Object transformation.
- Event-driven interaction.
- Multi-button doors.
- Key-and-door interactions.
- Environmental puzzle logic.
- Unity trigger interactions.
- Gameplay debugging and iteration.

The central programming challenge was turning the game's simple bubble interaction into a reusable system capable of producing different environmental consequences.

## What I Learned

Dreamy Bubbles strengthened my understanding of how a small number of reusable systems can create a larger range of gameplay possibilities.

The project gave me practical experience with:

- Unity gameplay programming.
- C# interfaces.
- Event-driven architecture.
- Component-based gameplay systems.
- Unity triggers.
- Object relationships.
- Environmental state.
- Puzzle programming.
- Coroutines.
- Rapid prototyping.
- Systemic gameplay design.

One of the most important lessons was that a mechanic does not need to be complicated to create complex gameplay.

The synchronized interaction system was relatively straightforward technically, but the relationships created by the level design gave it many possible consequences.

## Project Outcome

Dreamy Bubbles successfully turned a simple bubble interaction into the foundation for an environmental puzzle system.

The core mechanic demonstrated how:

**One player action → Multiple object responses → Environmental consequences**

This allowed the project to create puzzle complexity without requiring a complicated control scheme.

From a programming perspective, the project gave me experience building reusable interaction components, interfaces, event-driven behavior, object grouping, and environmental state systems under a strict Game Jam deadline.

## Project Details

- **Engine:** Unity
- **Language:** C#
- **Genre:** First-Person Puzzle
- **Project Type:** Environmental Puzzle Game
- **Development:** Global Game Jam 2025
- **Role:** Gameplay Programmer
- **Core Mechanic:** Synchronized Object Interaction
- **Focus:** Gameplay Systems, Interaction Architecture, Puzzle Programming

## Technologies

- **Unity**
- **C#**
- **Unity Physics**
- **Unity Triggers**
- **Gameplay Programming**
- **C# Interfaces**
- **Event-Driven Systems**
- **Component-Based Architecture**
- **Environmental Puzzle Systems**
- **Coroutines**
- **Rapid Prototyping**

## Takeaway

Dreamy Bubbles was an important project in developing my approach to systemic gameplay programming.

The starting mechanic was intentionally simple: **blow bubbles at objects**.

The programming challenge was turning that interaction into something that could influence the wider environment.

By grouping objects, responding to events, and separating gameplay responsibilities into reusable components, I created a foundation that allowed one interaction to produce multiple consequences.

The project reinforced an approach I continue to use in gameplay programming:

**Keep the player's interaction simple, and let the systems underneath create depth.**
---