---
title: Dream Valley
publishDate: 2023-01-01 00:00:00
img: /assets/dream-valley.png
img_alt: Dream Valley first-person puzzle horror game
description: |
  My first 3D game, Dream Valley is a first-person puzzle horror experience where players explore a mysterious house, uncover its story through scattered notes, and evade a hostile white ghoul.
tags:
  - Unity
  - Gameplay Programming
  - AI
  - Systems Programming
---

## Overview

**Dream Valley** was my first experience developing a **3D game**, combining first-person exploration, environmental puzzles, narrative discovery, and horror.

The player explores a mysterious house, gradually uncovering its purpose by finding notes scattered throughout the environment. At the same time, a mysterious **white ghoul** hunts the player, turning exploration into a constant risk.

The project was also an important step in learning how to build complex and maintainable gameplay systems while working as part of a larger development team.

## My Role

I worked primarily as a **Gameplay Programmer and Technical Designer**, while also helping establish programming practices that allowed the rest of the team to work independently.

My responsibilities included:

- Gameplay programming
- Enemy AI and navigation
- Player interaction systems
- State machine architecture
- Input systems
- Raycast-based interactions
- Trigger systems
- Modular gameplay architecture
- Animation integration
- Technical mentoring and support

## Hierarchical State Machine

One of the biggest technical challenges of the project was implementing a **Hierarchical State Machine (HSM)**.

I designed and implemented a custom state machine architecture using abstract classes, allowing complex behaviors to be broken down into reusable states and sub-states.

This was my first time implementing this architecture, so I spent approximately a month studying the pattern and learning how to apply it correctly.

The system allowed us to organize complex gameplay behavior while keeping individual states isolated and easier to modify.

## Enemy AI

The white ghoul uses **NavMesh navigation** to move through the environment and pursue the player.

I integrated navigation and animation systems to create the enemy's movement and behavior, combining Unity's navigation tools with **Mixamo animations**.

The goal was to make the enemy feel like an active threat rather than simply functioning as an obstacle.

## Modular Gameplay Systems

A major goal during development was making the codebase modular enough for multiple team members to work simultaneously.

I developed gameplay scripts so team members could implement content and interactions without needing to modify the underlying player or enemy systems.

This reduced dependencies between different parts of the project and made it easier to iterate during development.

## Interaction Systems

I implemented several systems for interacting with the environment, including:

- Raycast-based object detection
- Object grabbing
- Player interaction
- Trigger detection
- Environmental interactions
- Unity's New Input System

These systems formed the foundation for the game's first-person exploration and puzzle mechanics.

## Design Patterns

I also introduced several programming patterns to the rest of the team.

### Singleton Pattern

I taught the team how to implement **Singletons** using persistent objects, allowing important systems to remain accessible across scenes without needing to be recreated.

### Observer Pattern

I introduced the **Observer Pattern** for in-game triggers and events.

This allowed different systems to react to gameplay events without becoming tightly coupled to the systems generating them.

This was particularly useful for environmental interactions and puzzle-related events.

## Visual & Technical Development

The project also gave me experience working with several Unity rendering and content pipelines.

I worked with:

- Texture cookies
- Lighting and visual effects
- NavMesh
- Mixamo animations
- Unity's New Input System
- Raycasting
- Modular C# systems
- Persistent objects
- Gameplay events

## Production

**Dream Valley** was developed using a structured production process based on **SCRUM**.

We organized development into sprints and used sprint reviews to evaluate our progress and coordinate the next stages of development.

Working within this structure taught me how communication, task planning, and prioritization become increasingly important as both the scope and team size of a project grow.

## Challenges

The main production challenge was balancing ambitious technical goals with our three-month development timeline.

We experimented with **FMOD** for the game's audio system and spent time learning how to integrate it into our workflow. However, we ultimately had to prioritize the systems that were essential to the playable experience and shipped without the planned FMOD implementation.

This experience taught me to evaluate technical risks early and prioritize features based on their impact on the final experience.

## What I Learned

**Dream Valley** was a major milestone in my development as a programmer.

It was my first 3D game and my first time working with more advanced programming architecture such as **Hierarchical State Machines** and the **Observer Pattern**.

More importantly, I learned how to build systems that other people can work with rather than simply writing code that works in isolation.

The project strengthened my understanding of **gameplay architecture, AI, modular programming, team communication, and technical leadership**.

## Project Details

**Team Size:** 4  
**Project Length:** 3 months  
**Engine:** Unity  
**Tools:** Adobe Creative Suite, Google Docs, Notion, Clip Studio Paint, Blender

### Team

- **Alejandro Velásquez**
- **Juan Esteban Calle**
- **Juan Gaviria**
- **Me** — Gameplay Programming & Technical Design

## Technologies

**Unity · C# · NavMesh · Hierarchical State Machines · Observer Pattern · New Input System · Raycasting · Mixamo · Blender**