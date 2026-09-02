---
title: Nightfall Zombie Survival
publishDate: 2026-08-16
img: /assets/nightfall_TEXT.png
img_alt: Nightfall Zombie Survival title artwork
description: >
  A cooperative, round-based zombie survival game built in UEFN, focused on gameplay systems, multiplayer interactions, progression, and reusable Verse-driven mechanics.
tags:
  - UEFN
  - Verse
  - Gameplay Programming
  - Multiplayer Systems
  - Game Architecture
  - Wave-Based Survival
  - Game Design
role: Gameplay Programmer & Designer
engine: UEFN
language: Verse
projectType: Co-op Round-Based Survival
playUrl: https://www.fortnite.com/play/island/6097-7326-5868
heroVideo: /assets/NIGHTFALL_GAMEPLAY_small.mp4
featuredImages:
  - src: /assets/nightfall_blank.png
    alt: Nightfall zombie survival gameplay
  - src: /assets/image.png
    alt: Nightfall gameplay and environment
gallery:
  - /assets/nightfall_blank.png
  - /assets/image.png
  - /assets/NIGHTFALL_GAMEPLAY_small.mp4
---

# Nightfall Zombie Survival

**Nightfall** is a cooperative, round-based zombie survival game created in Unreal Editor for Fortnite (UEFN).

Players work together to survive increasingly difficult waves of creatures while earning resources, unlocking new areas, purchasing upgrades, and managing their available equipment.

Rather than focusing only on level design, I used the project to explore how multiple gameplay systems could communicate with each other to create a complete multiplayer gameplay loop.

## My Role

I worked as the **Gameplay Programmer & Designer**, focusing on the systems that control the game's moment-to-moment gameplay and progression.

My responsibilities included:

- Designing and implementing the round-based survival loop.
- Programming enemy spawning and wave progression.
- Building reusable gameplay systems in Verse.
- Implementing creature spawners and enemy management.
- Creating resource and collectible systems.
- Implementing perks and player upgrades.
- Connecting interactive UEFN devices through Verse.
- Designing multiplayer gameplay interactions.
- Balancing progression and difficulty between rounds.
- Debugging gameplay systems during multiplayer testing.

## Core Gameplay Loop

The central gameplay loop is based around a simple progression cycle:

**Survive → Earn Resources → Upgrade → Unlock → Survive the Next Round**

Each completed round increases the pressure on the players. Resources gained during combat can then be used to improve the team's ability to survive future encounters.

This creates a continuous progression loop where players have to decide when to spend resources and which upgrades will provide the greatest advantage.

## Round & Wave Management

The round system is responsible for controlling the overall escalation of the game.

Instead of treating every enemy encounter as an isolated event, the system organizes combat into increasingly difficult rounds.

The wave manager coordinates elements such as:

- Starting and ending rounds.
- Increasing enemy pressure.
- Activating creature spawners.
- Tracking the progression of encounters.
- Connecting enemy encounters with the overall game state.
- Triggering progression events between rounds.

The main design goal was to make difficulty increase predictably while still giving players enough time to recover, purchase upgrades, and prepare for the next encounter.

## Enemy Spawning

Nightfall uses UEFN's creature spawning devices as the foundation for its enemy encounters.

Verse is used to connect those devices to the larger gameplay loop rather than treating them as independent level objects.

This allowed enemy encounters to become part of a larger system involving:

- Round progression.
- Player progression.
- Resource generation.
- Difficulty scaling.
- Multiplayer cooperation.

This approach also made it easier to change encounter behavior without having to redesign the entire level.

## Reusable Gameplay Systems

One of my main goals with Nightfall was to avoid building every mechanic as a one-off interaction.

I created systems around reusable gameplay concepts so that individual mechanics could be configured and connected to different UEFN devices.

This included systems for:

- Enemy spawning.
- Round management.
- Collectibles.
- Perks.
- Purchasable upgrades.
- Interactive devices.
- Player progression.
- Gameplay events.

This was particularly important in UEFN because many gameplay features are built by combining Verse logic with existing Fortnite Creative devices.

## Perks & Player Progression

Nightfall uses upgrades and perks to give players meaningful ways to spend resources earned during gameplay.

Perks are implemented as gameplay systems that modify the player's capabilities rather than simply acting as visual rewards.

Examples include:

- Increased survivability.
- Improved movement.
- Faster recovery.
- Additional gameplay advantages.

This creates a progression layer on top of the basic survival loop and gives players strategic reasons to continue earning resources.

## Collectibles & Resources

Resources are an important part of the game's progression system.

Collectible objects are connected to the gameplay loop so that defeating enemies and surviving encounters provides players with resources they can use to improve their situation.

This creates a relationship between combat and progression:

**Combat → Resources → Purchases → Increased Survivability**

The goal was to make progression feel like a direct consequence of successful gameplay rather than a separate menu-based system.

## Multiplayer Systems

Because Nightfall is designed as a cooperative experience, gameplay systems had to account for multiple players interacting with the same world.

This affected the design of:

- Round progression.
- Purchases.
- Perks.
- Collectibles.
- Enemy encounters.
- Interactive devices.
- Player progression.

A major challenge was making sure that gameplay events produced predictable results when multiple players were interacting with the same systems.

Testing therefore involved repeatedly playing the game with multiple players and identifying situations where systems could become desynchronized or behave differently depending on who triggered an interaction.

## Device + Verse Architecture

One of the most useful aspects of developing in UEFN was learning how to combine Fortnite's existing gameplay devices with custom Verse logic.

Rather than rebuilding functionality that UEFN already provides, I used devices as building blocks and used Verse to control how those components interacted.

This created a hybrid architecture:

**UEFN Devices → Verse Logic → Gameplay Systems → Player Experience**

For example, a creature spawner can provide the underlying spawning functionality while Verse determines when that spawner should be activated as part of the current round.

This approach made the project more modular and allowed the same types of devices to participate in different gameplay systems.

## Gameplay Design

Programming and design were closely connected throughout the project.

Because I was responsible for both gameplay programming and design, I could iterate directly between the intended player experience and the underlying systems.

I used this to tune:

- Enemy pressure.
- Round pacing.
- Resource availability.
- Upgrade effectiveness.
- Player progression.
- Cooperative decision making.
- Difficulty escalation.

The goal was to make each round feel more demanding without simply increasing enemy numbers indefinitely.

## Technical Challenges

### Connecting Independent Systems

One of the main challenges was making systems that were individually functional work together as a single gameplay loop.

For example, enemy spawning needed to interact with round progression, while enemy encounters also needed to feed into resource and progression systems.

This required thinking about gameplay as a network of interacting systems rather than isolated mechanics.

### Multiplayer Interaction

Multiplayer introduced additional edge cases that were not present when testing mechanics individually.

Interactions had to be tested with different players triggering events, purchasing upgrades, collecting resources, and progressing through rounds.

This helped me understand the importance of designing gameplay systems around shared game state rather than assuming a single-player flow.

### UEFN Device Integration

Another challenge was learning how to use Verse to extend and coordinate UEFN's existing devices.

Instead of implementing every feature from scratch, I had to determine which responsibilities belonged to the device and which should be handled by Verse.

This became an important part of my approach to UEFN development.

## Engineering Decisions

The main architectural decision was to treat Nightfall as a collection of interconnected gameplay systems rather than a collection of scripted encounters.

This resulted in a structure where:

- Spawning systems control enemy encounters.
- Round systems control progression.
- Collectibles provide resources.
- Perks modify player capabilities.
- Interactive devices provide player-facing interactions.
- Verse connects these systems together.

This made the project easier to iterate on because individual systems could be modified without redesigning the entire gameplay loop.

## What I Learned

Nightfall significantly improved my understanding of gameplay programming in a multiplayer environment.

The project taught me how to:

- Design systems around shared gameplay state.
- Connect multiple gameplay systems together.
- Use Verse to extend UEFN devices.
- Build reusable gameplay functionality.
- Design progression around a repeatable gameplay loop.
- Debug multiplayer interactions.
- Balance systems while considering their effect on the entire game.
- Think about gameplay architecture rather than isolated mechanics.

Most importantly, the project changed how I approached gameplay programming.

Instead of asking only **"How do I implement this mechanic?"**, I began thinking about **"How should this mechanic communicate with the rest of the game?"**

## My Contribution

My main contribution to Nightfall was the implementation and design of the gameplay systems that connect the individual UEFN components into a playable cooperative survival experience.

I worked across both programming and design, allowing me to iterate between the technical implementation and the intended player experience.

The project gave me practical experience with **Verse, multiplayer gameplay, system architecture, progression, enemy management, and device-driven gameplay**.

## Project Details

- **Engine:** Unreal Editor for Fortnite (UEFN)
- **Language:** Verse
- **Genre:** Cooperative Zombie Survival
- **Structure:** Round-Based Survival
- **Role:** Gameplay Programmer & Designer
- **Focus:** Gameplay Systems, Multiplayer, Progression, Enemy Management

## Technologies

**UEFN · Verse · Gameplay Programming · Multiplayer Systems · Game Architecture · Game Design**
---