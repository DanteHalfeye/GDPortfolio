---
title: Cosmic Collision
publishDate: 2024-11-12 00:00:00
img: /assets/POSTER_COSMICCOLLITION.png
img_alt: Cosmic Collision
description: >
  A fast-paced space roguelike where players survive waves of enemies using a powerful dash to destroy them, while unlocking items and upgrades to progress through increasingly difficult encounters.
tags:
  - Unity
  - Game Design
  - Gameplay Programming
  - Roguelike
  - Space Combat
---

# Cosmic Collision

## Overview

**Cosmic Collision** is a fast-paced space roguelike focused on movement-based combat, risk and reward, and incremental progression.

Players control an Asteroid through increasingly difficult rooms filled with enemies that attempt to shoot them down. Instead of relying primarily on traditional weapons, the player's **dash is their main offensive tool**, allowing them to collide with enemies and destroy them.

The game was developed over **one month**, giving the team time to iterate on the core gameplay loop, Asteroid controls, room progression, and difficulty curve.

### [Play Cosmic Collision](https://play.unity.com/en/games/38bb20eb-6e65-4b39-9ab6-7c4c4c0ca0fe/cosmic-build)

## Gameplay Showcase

### Gameplay Footage

![Cosmic Collision]( /assets/imagen_2026-08-29_233159002.png)

## Core Gameplay

The main gameplay loop revolves around **movement, combat, room progression, and upgrades**.

Players enter rooms filled with enemies and must survive incoming attacks while using their Asteroid's dash to aggressively engage and destroy enemies.

After clearing encounters, players progress through increasingly challenging rooms and unlock items that improve their Asteroid and provide new ways to approach combat.

The goal was to create a gameplay loop where **every encounter becomes progressively more demanding**, requiring players to make better use of their movement and upgrades as they advance.

## Space Combat

The Asteroid's movement is the foundation of the game's combat system.

### Dash-Based Combat

The player's dash serves both as a defensive and offensive ability.

Players can use it to:

- Quickly reposition around the arena.
- Avoid incoming enemy projectiles.
- Close the distance between themselves and enemies.
- Destroy enemies through direct collisions.
- Chain aggressive movement between multiple targets.

This creates a high-risk, high-reward combat style where getting close to enemies is often the most effective way to defeat them.

## Roguelike Progression

The game is structured around a series of **rooms with incremental difficulty**.

As players progress:

- Enemy encounters become increasingly difficult.
- More dangerous enemies are introduced.
- Players gain access to new items and upgrades.
- Previous mechanics become more demanding.
- Players must make better use of their available abilities.

The progression system was designed to make each room feel like a step forward while gradually testing the player's mastery of the Asteroid controls.

## Key Features

### Asteroid Controller

I developed the Asteroid's movement and controls, focusing on making the ship responsive enough for precise dodging while still maintaining enough momentum to make collisions satisfying.

The controller was built around the game's dash mechanic, making movement an important part of both survival and attacking.

### Room-Based Roguelike System

I also developed the room progression system used to structure the game's encounters.

Rooms progressively increase in difficulty, allowing the game to introduce new challenges while maintaining a consistent gameplay loop.

The system provides a foundation for creating different encounters and scaling the difficulty as the player advances.

### Incremental Difficulty

Enemy encounters become progressively more challenging throughout a run.

This creates a gradual difficulty curve where the player first learns the movement and combat systems before being pushed to use them more effectively against increasingly dangerous situations.

### Item & Upgrade Progression

Players can unlock items and upgrades throughout their run.

These upgrades provide additional progression and allow players to become stronger as the encounters become more difficult.

## My Contribution

My main focus on **Cosmic Collision** was **gameplay programming and game design**.

I was responsible for:

- Programming the Asteroid controls.
- Implementing the Asteroid movement system.
- Developing the dash-based movement and combat.
- Creating the room-based progression system.
- Implementing incremental difficulty between rooms.
- Designing and tuning the progression flow.
- Iterating on the movement to make combat feel responsive.
- Supporting the game's roguelike gameplay loop.

Working on the project over a **one-month development period** allowed me to spend more time refining the controls and progression compared to a traditional game jam project.

## Design Challenges

One of the biggest challenges was balancing the Asteroid's movement with the game's difficulty.

Because the dash is both an offensive and defensive mechanic, making it too powerful could remove the challenge from encounters, while making it too weak could make the game feel frustrating.

The room progression therefore needed to account for the player's increasing mastery of the movement system.

The difficulty was designed to increase gradually, giving players time to understand the controls before requiring increasingly precise movement and decision-making.

## What I Learned

Developing *Cosmic Collision* gave me the opportunity to work on a longer gameplay development cycle and focus on refining a core mechanic over time.

I particularly learned how to:

- Design responsive Asteroid controls.
- Build gameplay systems around a central movement mechanic.
- Create incremental difficulty curves.
- Structure roguelike progression through rooms.
- Balance player power against increasing enemy difficulty.
- Iterate on movement and combat based on playtesting.
- Build reusable systems that support different encounters.

The project helped me better understand how **movement, combat, and progression need to work together** to create a satisfying gameplay loop.

## Project Details

| | |
|---|---|
| **Development Time** | 1 Month |
| **Genre** | Space Roguelike |
| **Engine** | Unity |
| **Role** | Game Designer & Gameplay Programmer |
| **Primary Contribution** | Asteroid Controls & Roguelike Progression |
| **Tools** | Unity, C# |


### Team

- **David Posada** Items & Audio Implementation
- **Isabella Montoya** Enemy Behaviour
- **Juan Esteban Calle** UI & Phone Controls
- **Sebastian Escobar** Enemy Behaviour
- **Me** — Gameplay & Technical Design

## Technologies

- **Unity**
- **C#**

## Takeaway

*Cosmic Collision* was an exploration of **movement-based combat and incremental roguelike progression**.

The project gave me the opportunity to design and program a Asteroid controller where movement is directly tied to combat, while also building a room-based progression system that gradually increases the challenge and rewards the player with new upgrades.