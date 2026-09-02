---
title: Go On!
publishDate: 2022-11-01 00:00:00
img: /assets/poster1.png
img_alt: Go On! bullet-hell platformer
description: >
  My first major game project, Go On! is a bullet-hell platformer about Max, a university student navigating the stresses of academic life. Developed in Unity as my introduction to C# gameplay programming, the project focuses on responsive movement, projectile systems, boss encounters, and fast-paced evasion.
tags:
  - Unity
  - C#
  - Gameplay Programming
  - Bullet-Hell
  - Player Movement
  - Game Design
role: Gameplay Programmer
engine: Unity
language: C#
projectType: Bullet-Hell Platformer
heroVideo: /assets/GOON_Gameplay_small.mp4
featuredImages:
  - src: /assets/boss1-Recovered5.png
    alt: Go On! academic boss fight
  - src: /assets/fondopp.png
    alt: Go On! social pressure boss fight
gallery:
  - /assets/boss1-Recovered5.png
  - /assets/fondopp.png
  - /assets/GOON_Gameplay_small.mp4
  - /assets/boss2.mp4
---

# Go On!

**Bullet-Hell Platformer · First Major Game Project · Unity**

Go On! is my first major game project: a bullet-hell platformer about **Max**, a university student struggling with the stresses and challenges of academic life.

The player navigates fast-paced encounters while avoiding increasingly complex projectile patterns.

The project was particularly important because it was my first serious transition from learning programming concepts to applying them inside a complete game.

When I started development, my programming experience was primarily limited to Scratch. Over the course of the project, I learned C#, Unity, gameplay programming, scene management, input handling, audio systems, visual effects, and the workflow required to build a playable game.

---

# My Role

**Gameplay Programmer**

I was responsible for the programming and technical implementation of the project.

My work included:

- Player movement and controls
- Bullet and projectile systems
- Enemy and boss interactions
- Gameplay systems
- Input handling
- Scene management
- Asynchronous scene loading
- Audio systems
- Visual effects
- Timeline implementation
- Gameplay iteration
- Debugging

Because this was my first major programming project, I worked across many different areas of the game rather than specializing in a single system.

That broad exposure became the foundation for the more specialized gameplay and systems programming work I developed in later projects.

---

# From Scratch to Unity

When I started Go On!, my programming experience was limited to **Scratch**.

The first stage of development was therefore largely about learning how programming concepts translated into an actual game engine.

I had to learn:

- C#
- Unity's component system
- GameObjects and components
- Unity's update loop
- Input handling
- Physics
- Coroutines
- Scene management
- Object instantiation
- Audio
- Visual effects
- Animation and Timeline

Rather than learning these systems independently, I learned them while actively using them to build the game.

This made Go On! both a game project and a practical introduction to professional-style game development workflows.

---

# Gameplay Concept

Go On! is built around a simple gameplay principle:

**Movement is the player's primary weapon.**

Instead of making direct combat the main focus, the player must survive enemy attacks by reading projectile patterns and navigating through safe spaces.

This created a gameplay loop based around:

```text
Observe
   ↓
Read Pattern
   ↓
Find Safe Space
   ↓
Move
   ↓
Avoid
   ↓
Repeat
```

The challenge comes from maintaining precise movement while the environment becomes increasingly dangerous.

---

# Movement System

The player controller was one of my primary programming responsibilities.

The movement was designed around the needs of a bullet-hell platformer, where responsiveness and predictable control are more important than complicated character abilities.

The system focused on:

- Horizontal movement
- Jumping
- Air control
- Gravity
- Player orientation
- Platforming
- Precise repositioning
- Evasion

The movement design was influenced by games such as **Hollow Knight** and **Mega Man X**.

I wanted the character to feel responsive enough that the player could make deliberate corrections while navigating dense projectile patterns.

---

# Evasion-Focused Combat

Because this was one of my first combat-focused projects, I chose to make **evasion** the central player skill.

Instead of building the game around repeatedly attacking enemies, the player primarily interacts with combat by surviving it.

This created a different relationship between the player and enemy attacks.

```text
Enemy
  |
  v
Projectile Pattern
  |
  v
Player Reads Pattern
  |
  v
Movement Decision
  |
  v
Safe Position
```

The player's movement therefore became directly connected to the game's combat difficulty.

This approach also made projectile behavior and pattern design particularly important to the overall gameplay experience.

---

# Bullet-Hell Systems

The game's encounters use projectile patterns to create increasing levels of difficulty.

The player must:

- Read incoming projectiles
- Identify gaps
- Maintain movement
- Predict projectile trajectories
- Reposition quickly
- Avoid collisions

The goal was not simply to increase the number of projectiles.

Instead, projectile patterns were used to create different movement problems that required the player to understand the space around them.

This became my first practical experience designing gameplay around the interaction between **player movement and enemy behavior**.

---

# Projectile Programming

I implemented the game's bullet and projectile behavior as part of the core gameplay systems.

The projectile systems were responsible for the runtime behavior of attacks within encounters.

This gave me experience with:

- Projectile creation
- Projectile movement
- Collision behavior
- Destruction
- Enemy attack behavior
- Repeated projectile spawning
- Pattern-based encounters

Working on projectiles also introduced me to the idea that seemingly simple gameplay objects can become complex when large numbers of them need to interact with the player simultaneously.

---

# Boss Encounters

The game uses boss encounters to combine the movement and projectile systems into larger gameplay challenges.

The bosses were designed around different thematic representations of academic pressure.

The encounters use projectile patterns and environmental challenges to force the player to continuously adapt their movement.

This helped me understand how individual gameplay systems can be combined to create a larger encounter rather than treating mechanics independently.

---

# Gameplay Architecture

Go On! was also my first experience connecting multiple Unity systems into one playable gameplay loop.

The general relationship between the main systems was:

```text
Input
  |
  v
Player Controller
  |
  ├───────────────┐
  |               |
  v               v
Movement       Gameplay
                  |
          ┌───────┼───────┐
          v       v       v
      Projectiles Bosses  Audio
          |
          v
       Collision
          |
          v
      Player State
```

This taught me that gameplay programming is not only about writing individual scripts.

The different systems have to work together consistently at runtime.

---

# Input Handling

I implemented the input handling required to control the player and trigger gameplay actions.

Input became the connection between player intent and the movement system.

```text
Player Input
     |
     v
Input Handler
     |
     v
Gameplay Command
     |
     v
Player Controller
     |
     v
Movement
```

Learning to separate input from the resulting gameplay behavior helped me understand the importance of keeping player controls predictable and responsive.

---

# Scene Management

I also implemented scene management for moving between different sections of the game.

The project introduced me to Unity's scene-loading workflow and asynchronous scene loading.

Instead of treating every scene as an isolated level, the game needed a system capable of transitioning the player between different gameplay contexts.

This gave me my first experience managing gameplay flow beyond a single Unity scene.

---

# Asynchronous Scene Loading

I worked with asynchronous scene loading to handle scene transitions.

This introduced me to the concept of performing loading work without completely blocking the game's main execution.

It also helped me understand the difference between:

- Loading a scene
- Transitioning the player
- Managing gameplay state
- Presenting loading feedback

This was one of my first experiences dealing with systems that extend beyond moment-to-moment gameplay.

---

# Timeline & Sequenced Gameplay

I also worked with Unity's Timeline system to create sequenced gameplay and presentation.

Timeline provided a way to coordinate events over time rather than hard-coding every sequence directly into gameplay scripts.

This was useful for connecting:

- Gameplay events
- Animation
- Audio
- Visual effects
- Boss sequences
- Presentation

Working with Timeline introduced me to the idea of separating **gameplay logic** from **time-based presentation**.

---

# Audio Systems

Audio was another technical area I worked with during development.

I integrated audio behavior into gameplay events so that actions and encounters could provide corresponding feedback.

This included working with:

- Gameplay audio
- Event-driven audio responses
- Encounter presentation
- Audio synchronization

This helped me understand audio as part of gameplay feedback rather than simply as background content.

---

# Visual Effects

I also worked with Unity's rendering and visual-effect systems to support the game's presentation.

The project used:

- Universal Render Pipeline
- Post-processing
- Gameplay visual effects
- Screen-space effects

These systems helped reinforce gameplay events and the overall atmosphere of the game.

Working with rendering and visual systems also gave me an early understanding of how technical implementation and presentation interact in a game.

---

# Technical Development

During development I worked with a range of Unity systems:

- C#
- Unity
- Universal Render Pipeline
- Post-processing
- Object instantiation
- Coroutines
- Input handling
- Scene management
- Asynchronous scene loading
- Audio systems
- Timeline
- Visual effects

For a first major project, this gave me broad exposure to the different technical layers involved in creating a complete game.

---

# Development Process

The project was developed over approximately **four months**.

Because I was learning programming while developing the game, the development process was highly iterative.

The workflow often looked like:

```text
Learn
  ↓
Prototype
  ↓
Test
  ↓
Find Problem
  ↓
Debug
  ↓
Improve
  ↓
Repeat
```

Many of the programming concepts I learned were immediately applied to the game.

This made the project an important transition from learning programming theoretically to solving actual gameplay problems.

---

# Debugging & Iteration

Go On! was also my first substantial experience debugging gameplay systems.

When something did not behave correctly, I had to identify whether the problem came from:

- Input
- Player movement
- Collision
- Projectile behavior
- Scene state
- Timing
- Object references
- Gameplay logic

This taught me the importance of breaking gameplay problems into smaller systems instead of trying to debug the entire game at once.

---

# Team Collaboration

The project was developed by a team of three.

While I was responsible for programming and technical implementation, my teammates focused on level design and art.

### Team

- **Me** — Gameplay Programming
- **Miguel Ángel Grisales** — Level Design
- **Valeria Quintero Cuervo** — Art

This was my first major experience collaborating with other disciplines during game development.

It taught me that programming decisions often affect level design and art, and that gameplay systems need to be communicated clearly to other team members.

---

# Design Inspiration

The primary gameplay inspiration was **Just Shapes & Beats**.

Its emphasis on:

- Dynamic projectile patterns
- Fast-paced encounters
- Movement
- Evasion
- Reading attacks

influenced the direction of Go On!

The project was not intended to directly reproduce its gameplay.

Instead, I used the idea of a bullet-hell centered around movement as a starting point and adapted it into a platforming structure with its own themes and encounters.

---

# Character Design Philosophy

The movement design was also influenced by platformers such as **Hollow Knight** and **Mega Man X**.

These games helped shape my approach to character control.

I wanted Max to have movement that felt:

- Responsive
- Predictable
- Precise
- Easy to correct
- Suitable for high-pressure situations

This was particularly important because the player often needs to make small movement adjustments to survive projectile patterns.

---

# Challenges

The biggest challenge was learning programming while simultaneously building the game.

I had to learn Unity and C# while also making decisions about:

- Movement
- Combat
- Projectiles
- Bosses
- Scenes
- Audio
- Visual effects
- Game flow

This meant that many problems had two layers:

**How do I design this mechanic?**

and

**How do I technically implement it?**

Learning to answer both questions simultaneously was one of the most important parts of the project.

---

# What I Learned

Go On! established the foundation for my later work in gameplay programming.

The project taught me:

- C# programming
- Unity development
- Component-based gameplay
- Player controller development
- Projectile systems
- Input handling
- Collision-based gameplay
- Scene management
- Asynchronous loading
- Coroutines
- Timeline
- Audio integration
- Visual effects
- Debugging
- Team collaboration
- Gameplay iteration

More importantly, it taught me how to approach game development as a complete process.

A game is not just a collection of mechanics.

The systems need to connect, the player needs to understand them, and the entire experience needs to be iterated through testing.

---

# Project Outcome

Go On! became my first complete major game project and the starting point for my development as a gameplay programmer.

It demonstrated that I could take a concept from an initial idea through programming, design, iteration, and collaboration into a playable experience.

Although the project was created early in my development, many of the problems I encountered became the foundation for how I approached later projects.

---

# Project Details

| | |
| --- | --- |
| **Team Size** | 3 |
| **Project Length** | 4 months |
| **Engine** | Unity |
| **Language** | C# |
| **Role** | Gameplay Programmer |
| **Genre** | Bullet-Hell Platformer |
| **Focus** | Gameplay Programming, Movement, Projectiles |
| **Tools** | Adobe Creative Suite, Google Docs |

---

# Technologies

**Unity · C# · URP · Gameplay Programming · Player Movement · Bullet-Hell Systems · Projectile Systems · Input Handling · Coroutines · Timeline · Audio Systems · Scene Management · Asynchronous Loading**

---

# Final Reflection

Go On! was where I started learning how to make games through programming.

I began the project with primarily Scratch experience and had to learn C# and Unity while building the game itself.

That process taught me how to move from an idea to a playable system, how to debug problems I did not initially understand, and how different disciplines have to work together to create a game.

The project is technically much simpler than my later work, but that is exactly what makes it important in my portfolio.

It shows where my programming journey began and provides a clear foundation for the increasingly complex gameplay, systems, tools, and technical work I developed afterward.
---