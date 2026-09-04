---
title: Cognitive Overload
publishDate: 2022-11-01 00:00:00
img: /assets/Cognitive.jpeg
img_alt: Cognitive Overload puzzle platformer
description: >
  An experimental puzzle platformer designed to demonstrate divided attention through four deliberately misaligned camera views. Players must mentally reconstruct the level while navigating an intentionally difficult-to-read environment.
tags:
  - Unity
  - C#
  - Gameplay Programming
  - Level Design
  - Game Design
  - Experimental Game Design
  - Player Testing
contributions:
  - Rigidbody2D Movement Variable Jump
  - Coyote Time, Jump Buffering
  - Wall Sliding
  - Divided-Attention Level Design
  - Player Testing & Iteration
  - Rapid Gameplay Prototyping

role: Gameplay Programmer, Level Designer & Director
engine: Unity
language: C#
projectType: Experimental Puzzle Platformer
heroVideo: "/assets/Try_out_things - Game - Windows, Mac, Linux - Unity 2021.3.16f1 Personal _DX11_ 2023-11-13 17-54-39.mp4"
featuredImages:
  - src: /CognitivePeopleTrying1.jpeg
    alt: Players experiencing Cognitive Overload
  - src: /CognitivePeopleTrying2.jpeg
    alt: Players testing the Cognitive Overload gameplay
gallery:
  - /CognitivePeopleTrying1.jpeg
  - /CognitivePeopleTrying2.jpeg
  - "/assets/Try_out_things - Game - Windows, Mac, Linux - Unity 2021.3.16f1 Personal _DX11_ 2023-11-13 17-54-39.mp4"
---

# Cognitive Overload

**Cognitive Overload** is an experimental puzzle platformer created for a Cognitive Processes class.

The project explores the psychological concept of **divided attention** by making the player process multiple visual perspectives while navigating a platforming level.

Instead of explaining the concept through text, the game turns it into the central gameplay challenge.

The environment is presented through four deliberately misaligned camera views. Each view provides incomplete information about the level, forcing the player to compare perspectives, remember spatial relationships, and mentally reconstruct the actual environment.

The result is a platformer where the primary challenge is not simply movement, but **understanding what the player is actually seeing**.

## My Role

I worked as the **Gameplay Programmer, Level Designer, and Director**.

My responsibilities covered both the technical implementation and the design of the experience:

- Programming the player controller.
- Implementing responsive platforming movement.
- Building the jump system.
- Implementing coyote time.
- Implementing jump buffering.
- Implementing variable jump height.
- Implementing wall sliding.
- Designing the playable level.
- Designing the four-camera structure.
- Directing the overall project.
- Coordinating gameplay and visual direction.
- Testing the game with players.
- Iterating based on player feedback.

Working across programming and design allowed me to directly connect the movement systems with the psychological concept driving the project.

## Design Goal

The project started with a simple question:

> How can a game make the player experience divided attention instead of simply explaining it?

The solution was to create an environment where the player could not rely on a single visual perspective.

The four-camera system intentionally separates what the player **sees** from how the level actually exists in physical space.

This creates two layers of information:

- The apparent layout presented by the cameras.
- The actual layout of the playable environment.

The player must constantly reconcile these two layers while moving through the level.

## Core Gameplay Mechanic

The central mechanic is a four-camera system showing different portions of the same environment.

Each camera provides useful information, but none of the views completely explains the level on its own.

Platforms can appear to connect visually while being physically separated, creating misleading spatial relationships.

This turns perception and memory into gameplay mechanics.

The player must:

- Observe multiple perspectives.
- Compare information between cameras.
- Remember previously seen layouts.
- Determine the actual position of platforms.
- Predict where movement will lead.
- Navigate despite incomplete visual information.

The camera system therefore affects both **how the player perceives the level** and **how they solve it**.

## Gameplay Programming

The player controller was implemented in Unity using C# and Rigidbody2D physics.

Because the camera system already created significant cognitive difficulty, the movement controls needed to remain predictable and responsive.

I therefore focused on removing unnecessary input precision requirements while preserving the challenge of the level itself.

The controller included:

- Horizontal movement.
- Rigidbody2D-based physics.
- Ground detection.
- Jumping.
- Coyote time.
- Jump buffering.
- Variable jump height.
- Wall sliding.
- Character orientation.
- Jump cooldown.

These systems were designed to work together as a single responsive platforming controller.

## Player Movement

Horizontal movement is handled through the player's Rigidbody2D.

Input is collected separately from the physics update and converted into horizontal velocity while preserving the player's vertical velocity.

This separation helped keep player input and physics behavior predictable.

The movement speed was exposed as a design value, allowing the controller to be tuned during level iteration without rewriting the movement logic.

## Ground Detection

The controller uses a dedicated ground-check transform beneath the player.

A Physics2D overlap check determines whether the player is currently grounded.

The grounded state is then used by several other systems, including:

- Jump availability.
- Coyote time.
- Jump buffering.
- Movement behavior.

Keeping ground detection as a separate responsibility made the other movement systems easier to reason about and modify.

## Jump System

The jump system calculates the required jump force from the desired jump height and the game's gravity.

This allowed jump height to be treated as a design parameter instead of relying on an arbitrary physics value.

The system checks whether the player is allowed to jump before applying vertical velocity.

This made it easier to tune the controller around the level design.

## Coyote Time

I implemented **coyote time** to make jumps more forgiving.

Coyote time provides the player with a short window after leaving a platform during which they can still perform a jump.

This was particularly useful for Cognitive Overload because determining the exact position of the player can be difficult when switching between misleading camera perspectives.

The mechanic reduces frustration without reducing the intended cognitive challenge.

## Jump Buffering

The controller also implements **jump buffering**.

When the player presses jump shortly before landing, the input is temporarily stored.

If the player becomes grounded while the buffered input remains valid, the jump is automatically performed.

This prevents the player from needing to press jump on an extremely precise frame.

Together, coyote time and jump buffering make the controls more forgiving while leaving the spatial puzzle intact.

## Variable Jump Height

The controller supports variable jump height by modifying upward velocity when the player releases the jump button.

Holding the button produces a higher jump, while releasing it earlier produces a shorter jump.

This gives players more control over their movement without requiring additional inputs.

It also allowed the level to contain situations where players needed to choose between different jump trajectories.

## Wall Sliding

Wall detection was used to implement wall sliding.

When the player is airborne and touching a wall, their downward velocity can be limited rather than allowing them to immediately fall at normal gravity speed.

This provides the player with additional control over vertical movement and creates another recovery option when navigating difficult sections.

## Character Orientation

The player automatically changes orientation based on their horizontal movement direction.

When the player changes direction, the character's local scale is flipped.

This keeps the character visually aligned with their movement without requiring a separate animation system.

## Movement Architecture

The player controller was organized around several independent responsibilities:

- Input detection.
- Horizontal movement.
- Ground detection.
- Jumping.
- Jump buffering.
- Coyote time.
- Variable jump height.
- Wall detection.
- Wall sliding.
- Character orientation.
- Jump cooldown.

This structure allowed individual mechanics to be tuned independently during development.

That was particularly important because the project had a very short development period and required frequent iteration.

## Camera System

The camera system was the defining gameplay mechanic rather than simply a presentation feature.

The level was designed around four different perspectives, each showing a different portion of the same environment.

The views were deliberately arranged to create misleading spatial relationships.

A platform visible in one camera could appear to connect naturally to another platform while actually being disconnected in the physical level.

This forced players to build a mental model of the environment rather than relying exclusively on what was immediately visible.

## Designing Productive Confusion

A major design challenge was determining how confusing the game should be.

If the environment was too readable, the divided-attention concept became ineffective.

If it was too confusing, players could no longer distinguish between a deliberate puzzle and an unintentionally bad level.

The goal was therefore **productive confusion**.

Players needed enough information to eventually understand the environment, while still being required to actively compare perspectives and reconstruct spatial relationships.

This distinction became one of the most important principles in the level design.

## Level Design

The level was designed specifically around the limitations of the camera system.

Traditional platforming levels generally try to communicate:

- Where the player is.
- Where the player can go.
- Where platforms connect.
- Which areas are dangerous.
- Where the player should move next.

Cognitive Overload intentionally disrupts some of this communication.

The level instead uses visual ambiguity as part of the challenge.

Platform placement, camera positioning, and player movement were therefore designed together rather than independently.

## Player Experience

The intended experience follows a gradual realization:

1. The player initially interprets the environment as a conventional platforming level.
2. The player begins following the apparent platform layout.
3. The camera relationships become increasingly difficult to interpret.
4. The player realizes that the visual perspectives do not represent a simple continuous space.
5. The player begins comparing the different views.
6. The player develops a mental model of the actual environment.
7. Navigation becomes an exercise in divided attention and spatial memory.

This progression was important because the psychological concept needed to emerge through interaction rather than being explained beforehand.

## Player Testing

Player testing was an important part of development.

Because the project intentionally creates confusion, it was difficult to determine from the developer's perspective whether a confusing section was successfully communicating the intended concept or simply frustrating players.

Testing allowed us to observe:

- Which camera relationships players understood immediately.
- Which areas created productive confusion.
- Which areas became unnecessarily frustrating.
- How players interpreted apparent platform connections.
- How quickly players developed an understanding of the physical layout.
- Where players lost track of their position.

The results were used to iterate on the level and camera arrangement.

![Players Enjoying 1](/CognitivePeopleTrying1.jpeg)

![Players Enjoying 2](/CognitivePeopleTrying2.jpeg)

## Rapid Prototyping

The project was developed in **four days**, which heavily influenced the development process.

The team prioritized the central gameplay concept instead of attempting to build a large number of secondary mechanics.

Development focused on:

- The four-camera mechanic.
- Player movement.
- Level construction.
- Visual communication.
- Player testing.
- Iteration.

This allowed us to reach a playable prototype quickly and spend the remaining time determining whether the concept actually worked.

## Development Process

The project began with the psychological concept of divided attention.

That concept was translated into a gameplay problem:

> How can we force players to divide their attention while navigating a level?

The four-camera system became the answer.

From there, the player controller and level design were developed around the mechanic.

The process was highly iterative. Gameplay was repeatedly tested to determine whether player confusion came from the intended mechanic or from poor communication.

This distinction guided many of the later design decisions.

## Direction

As director, I helped keep the project centered around its original concept.

A major risk was turning the project into a conventional platformer with an unusual camera system.

Instead, the camera mechanic needed to influence the entire experience.

I coordinated the relationship between:

- Gameplay programming.
- Level design.
- Camera placement.
- Visual direction.
- Player testing.
- Presentation.
- The psychological concept.

The short development period also required prioritizing features that directly supported the project's central idea.

## Art Direction

The visual style was designed to reinforce the game's cognitive challenge.

Rather than maximizing visual clarity, the presentation intentionally increased the amount of information the player needed to process.

The objective was not simply to make the game visually chaotic.

The visual direction needed to support the gameplay by making **visual interpretation itself part of the challenge**.

## Team Structure

The project was developed by a small team with additional members responsible for presentation.

- **Me** — Gameplay Programming, Level Design & Direction
- **Valeria Quintero Cuervo** — Art
- **6 Presenters** — Project Presentation

The small development team required responsibilities to overlap, particularly between programming and design.

## Technical Challenges

### Responsive Movement Under Visual Uncertainty

The biggest programming challenge was creating a platforming controller that remained predictable while the visual information presented to the player was intentionally unreliable.

If the controls were also imprecise, it would become impossible to determine whether failure came from the player's understanding of the environment or from the movement system.

Coyote time, jump buffering, variable jump height, and controlled movement were therefore important parts of the controller.

### Connecting Movement & Level Design

The movement system needed to support the specific requirements of the level.

Jump height, movement speed, wall sliding, and platform placement all influenced one another.

Because I worked on both the controller and level design, I could iterate on these systems together.

### Balancing Confusion

The biggest design challenge was creating confusion that served a purpose.

The game needed to challenge the player's perception without becoming impossible to understand.

Player testing became essential for identifying this boundary.

## Working Across Programming & Design

One of the most valuable aspects of the project was working across both programming and level design.

The camera mechanic could not be designed independently from the physical environment.

A platform that appeared connected from one perspective might need to be physically separated to create the intended illusion.

Likewise, the player's movement capabilities determined which camera arrangements were actually playable.

Working across both disciplines allowed me to iterate on these relationships directly.

## What I Learned

Cognitive Overload taught me how gameplay can communicate an idea without relying on traditional explanation.

Instead of telling players what divided attention means, the game makes them experience the consequences of dividing their attention.

### Programming

The project strengthened my understanding of:

- Unity 2D physics.
- Rigidbody2D movement.
- Input handling.
- Collision detection.
- Ground detection.
- Jump systems.
- Coyote time.
- Jump buffering.
- Variable jump height.
- Wall sliding.
- Rapid gameplay prototyping.

### Design

The project also taught me that conventional design principles are tools rather than absolute rules.

Clarity is normally valuable, but intentionally reducing clarity can be effective when that reduction is itself part of the intended experience.

The important distinction is between **confusion that serves a purpose** and confusion caused by poor design.

## Project Outcome

Cognitive Overload successfully transformed a cognitive psychology concept into a playable gameplay system.

The four-camera mechanic became more than a visual gimmick. It affected how players interpreted the environment, navigated the level, remembered spatial information, and divided their attention.

The project also demonstrated my ability to contribute across programming, level design, direction, and player testing within a very limited development schedule.

## My Contributions

- Gameplay Programming
- Player Controller Programming
- Rigidbody2D Movement
- Ground Detection
- Jump System
- Coyote Time
- Jump Buffering
- Variable Jump Height
- Wall Sliding
- Character Orientation
- Level Design
- Camera System Design
- Project Direction
- Player Testing
- Gameplay Iteration

## Project Details

- **Engine:** Unity
- **Language:** C#
- **Physics:** Unity 2D Physics
- **Project Length:** 4 days
- **Project Type:** Experimental Puzzle Platformer
- **Role:** Gameplay Programmer, Level Designer & Director
- **Core Concept:** Divided Attention
- **Focus:** Gameplay Programming, Level Design, Experimental Game Design, Player Testing

## Technologies

**Unity · C# · Unity 2D Physics · Gameplay Programming · Level Design · Camera Systems · Rapid Prototyping · Player Testing · Game Direction**

## Final Reflection

Cognitive Overload was a small project, but it significantly influenced how I think about the relationship between gameplay mechanics and ideas.

The project demonstrated that gameplay can communicate concepts through direct player experience.

Rather than explaining divided attention, we created a system that required players to divide their attention themselves.

For me, the most important takeaway was that mechanics do not only determine **what players do**. They can also determine **what players perceive, feel, and understand**.
---