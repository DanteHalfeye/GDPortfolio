---
title: Nightfall
publishDate: 2026-08-16

img: /assets/nightfall_TEXT.png
img_alt: Nightfall Zombie Survival title artwork

description: >
  A cooperative, round-based zombie survival game built in UEFN. I designed and programmed the gameplay architecture connecting wave management, creature spawning, resources, perks, progression, interactive devices, and multiplayer interactions into a reusable Verse-driven gameplay loop.

tags:
  - UEFN
  - Verse
  - Gameplay Programming
  - Multiplayer Systems
  - Game Architecture
  - Wave-Based Survival
  - Game Design

contributions:
  - Creature Spawning & Enemy Management
  - Multiplayer Game State & Interactions
  - Perks & Player Upgrade Systems
  - Resource & Collectible Systems
  - Gameplay Progression & Difficulty Scaling
  - Gameplay & Progression Design

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

I used the project to explore how multiple gameplay systems can communicate with each other to create a complete multiplayer gameplay loop rather than treating each mechanic as an isolated feature.

## Technical Highlights

The main technical challenge of Nightfall was connecting multiple systems into one shared gameplay loop.

I designed and programmed systems for:

- Round and wave management
- Creature spawning and enemy management
- Reusable Verse gameplay systems
- Resource and collectible management
- Perks and player upgrades
- Multiplayer interactions
- UEFN device integration
- Gameplay progression
- Difficulty scaling
- Interactive gameplay events

The resulting architecture can be summarized as:

**UEFN Devices → Verse Logic → Gameplay Systems → Shared Game State → Player Experience**

This allowed the project to use UEFN's existing devices as building blocks while using Verse to determine how those components behave as part of the larger game.

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

Because I worked across both programming and design, I could iterate directly between the intended player experience and the systems responsible for producing it.

## Core Gameplay Loop

The central gameplay loop is:

**Survive → Earn Resources → Upgrade → Unlock → Survive the Next Round**

Each completed round increases the pressure on the players.

Resources earned during combat can then be spent on upgrades that improve the team's ability to survive future encounters.

This creates a continuous progression loop where players must decide when to spend resources and which upgrades provide the greatest advantage.

## Round & Wave Management

The round system controls the overall escalation of the game.

Rather than treating every enemy encounter as an isolated event, the system organizes combat into increasingly difficult rounds.

The wave manager coordinates:

- Starting and ending rounds.
- Increasing enemy pressure.
- Activating creature spawners.
- Tracking encounter progression.
- Connecting encounters with the overall game state.
- Triggering progression events between rounds.

The goal was to make difficulty increase predictably while still giving players enough time to recover, purchase upgrades, and prepare for the next encounter.

This made the round system one of the central pieces of the game's gameplay architecture.

## Enemy Spawning

Nightfall uses UEFN's creature spawning devices as the foundation for enemy encounters.

Rather than treating those devices as completely independent objects, I connected them to the larger gameplay loop through Verse.

This allowed enemy encounters to participate in:

- Round progression.
- Player progression.
- Resource generation.
- Difficulty scaling.
- Multiplayer cooperation.

For example, a creature spawner provides the underlying spawning functionality while Verse determines when that spawner should become active as part of the current round.

This separation between **device functionality** and **gameplay logic** made the system easier to modify without redesigning the entire level.

## Reusable Gameplay Systems

One of my main goals with Nightfall was to avoid implementing every mechanic as a one-off interaction.

I built systems around reusable gameplay concepts so individual mechanics could be configured and connected to different UEFN devices.

This included systems for:

- Enemy spawning.
- Round management.
- Collectibles.
- Perks.
- Purchasable upgrades.
- Interactive devices.
- Player progression.
- Gameplay events.

This approach was particularly useful in UEFN because many gameplay features are created by combining Verse logic with existing Fortnite Creative devices.

Instead of rebuilding functionality that already existed inside UEFN, I focused on creating the logic responsible for connecting those components.

## Perks & Player Progression

Nightfall uses upgrades and perks to give players meaningful ways to spend resources earned during gameplay.

Perks modify the player's capabilities rather than simply acting as visual rewards.

Examples include:

- Increased survivability.
- Improved movement.
- Faster recovery.
- Additional gameplay advantages.

This creates a progression layer on top of the basic survival loop and gives players strategic reasons to continue earning resources.

The system also has to interact with the rest of the gameplay architecture, since purchases affect player capabilities while resources are generated through gameplay.

## Collectibles & Resources

Resources connect combat directly to progression.

Collectible objects participate in the gameplay loop so that successful encounters provide players with resources that can be spent to improve their situation.

The intended relationship is:

**Combat → Resources → Purchases → Increased Survivability**

This makes progression a direct consequence of successful gameplay rather than a separate menu-based system.

## Multiplayer Systems

Because Nightfall is designed as a cooperative experience, gameplay systems had to account for multiple players interacting with the same world.

This affected:

- Round progression.
- Purchases.
- Perks.
- Collectibles.
- Enemy encounters.
- Interactive devices.
- Player progression.

A major challenge was making sure gameplay events produced predictable results when multiple players interacted with the same systems.

Testing therefore involved repeatedly playing the game with multiple players and identifying situations where systems could behave differently depending on which player triggered an interaction.

This required thinking about gameplay around **shared game state** rather than assuming a single-player flow.

## Device + Verse Architecture

One of the most valuable technical aspects of Nightfall was learning how to combine UEFN's existing gameplay devices with custom Verse logic.

The architecture can be viewed as:

**UEFN Devices → Verse Logic → Gameplay Systems → Player Experience**

UEFN devices handle functionality they are already designed to provide, while Verse controls how those devices participate in the larger game.

For example:

**Creature Spawner → Verse Round Manager → Current Wave → Enemy Encounter**

The same principle applies to other systems such as purchases, collectibles, perks, and interactive objects.

This allowed the project to remain relatively modular while taking advantage of functionality already provided by the engine.

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

The systems therefore had to support both the technical requirements of the game and the intended pacing of the player experience.

# Technical Challenges

## Connecting Independent Systems

One of the main challenges was making systems that were individually functional work together as a single gameplay loop.

For example:

**Enemy Spawning → Round Progression → Combat → Resources → Purchases → Player Progression**

Enemy spawning needed to know when a round was active.

Round progression needed to react to the state of the encounter.

Combat needed to produce resources.

Resources needed to interact with purchases.

Purchases needed to affect player capabilities.

This required thinking about gameplay as a network of interacting systems rather than isolated mechanics.

## Multiplayer Interaction

Multiplayer introduced additional edge cases that were not present when testing mechanics individually.

Different players could:

- Trigger interactions.
- Purchase upgrades.
- Collect resources.
- Progress through encounters.
- Interact with devices.

Systems therefore had to be designed around shared gameplay state rather than assuming that a single player was responsible for progressing the game.

This became one of the most important lessons from the project.

## UEFN Device Integration

Another challenge was determining which responsibilities belonged to UEFN devices and which should be handled by Verse.

Rather than implementing every feature from scratch, I used UEFN devices as functional building blocks and Verse as the layer connecting those components.

This became an important part of my approach to UEFN development.

The technical question was not simply:

**"How do I make this mechanic?"**

It became:

**"Which part should the engine provide, and which part should my gameplay architecture control?"**

# Engineering Decisions

The main architectural decision was to treat Nightfall as a collection of interconnected gameplay systems rather than a collection of scripted encounters.

The architecture can be summarized as:

- Spawning systems control enemy encounters.
- Round systems control progression.
- Collectibles provide resources.
- Perks modify player capabilities.
- Interactive devices provide player-facing interactions.
- Verse connects these systems together.

This made the project easier to iterate on because individual systems could be modified without redesigning the entire gameplay loop.

It also gave me a clearer separation between **engine-provided functionality** and **custom gameplay logic**.

# Interview Topics

Nightfall contains several systems that would be useful to discuss in a technical interview.

### Shared Game State

How should round progression behave when several players can trigger gameplay events?

### Wave Scaling

How would you increase enemy pressure without simply increasing the number of enemies?

### Device Architecture

When should functionality live inside a UEFN device versus custom Verse logic?

### Reusability

How would the same gameplay system be reused for different spawners, perks, or interactive devices?

### Multiplayer Edge Cases

What happens if two players trigger the same interaction at approximately the same time?

### Performance

What happens if the number of active creatures increases significantly?

### Progression Balance

How do resource income and upgrade costs affect the difficulty curve?

These were the kinds of questions that influenced the architecture during development.

# What I Learned

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

Instead of asking only:

**"How do I implement this mechanic?"**

I began thinking about:

**"How should this mechanic communicate with the rest of the game?"**

# My Contribution

My main contribution to Nightfall was the implementation and design of the gameplay systems that connect individual UEFN components into a playable cooperative survival experience.

I worked across both programming and design, allowing me to iterate between the technical implementation and the intended player experience.

The project gave me practical experience with:

**Verse · Multiplayer Gameplay · System Architecture · Progression · Enemy Management · Device Integration · Gameplay Design**

# Project Details

- **Engine:** Unreal Editor for Fortnite (UEFN)
- **Language:** Verse
- **Genre:** Cooperative Zombie Survival
- **Structure:** Round-Based Survival
- **Role:** Gameplay Programmer & Designer
- **Focus:** Gameplay Systems, Multiplayer, Progression, Enemy Management

# Technologies

**UEFN · Verse · Gameplay Programming · Multiplayer Systems · Game Architecture · Game Design**
---