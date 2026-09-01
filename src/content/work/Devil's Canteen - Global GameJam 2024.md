---
title: Devil's Canteen 
publishDate: 2024-01-01 00:00:00
img: /assets/POSTER.png
img_alt: Devil's Canteen
description: >
  — Global Game Jam 2024 — A walking simulator murder mystery developed during Global Game Jam 2024,
  inspired by Colombian folklore and the song "La Pelea con el Diablo" by Octavio Mesa.

tags:
  - Unity
  - Game Design
  - Gameplay Programming
  - Global Game Jam

role: Gameplay Programmer & Game Designer
engine: Unity
language: C#
projectType: Walking Simulator / Murder Mystery
playUrl: https://globalgamejam.org/games/2024/la-cantina-del-diablo-6
heroVideo: /assets/SC_CantinaDelDiablo.mp4

featuredImages:
  - src: /assets/POSTER.png
    alt: Devil's Canteen poster

gallery:
  - /assets/POSTER.png
  - /assets/SC_CantinaDelDiablo.mp4
---

## Overview

**Devil's Canteen** was developed during **Global Game Jam 2024** and is a walking simulator murder mystery inspired by Colombian folklore and culture.

This was my second Game Jam, and it marked an important step in my development as a game developer. Compared to my previous project, I felt much more confident designing and implementing gameplay systems and was significantly more satisfied with the final prototype.

In the game, you play as a Colombian mountaineer tasked with finding and killing the devil with a machete.

## Gameplay Concept

The devil is killing and replacing his victims.

The player receives a list of everyone present, with victims marked in red. The objective is to identify who the devil has most recently replaced and **machetazo** — hit them with a machete — before the devil can continue killing.

The game combines investigation, observation, character management, and a simple action mechanic into a short murder mystery experience.

## Core Gameplay

The main gameplay loop revolves around:

* Observing the characters in the environment.
* Checking the list of people present.
* Tracking changes in character status.
* Identifying who has been replaced by the devil.
* Finding the current devil.
* Attacking the correct character with the machete.
* Repeating the investigation as the devil changes hosts.

The changing identity of the devil forces the player to continuously pay attention to the state of the characters rather than simply memorizing a single target.

## NPC Population System

One of the main systems I programmed was the NPC population system.

The system uses linked lists containing **Scriptable Objects**, with each Scriptable Object representing an individual character.

Each character's Scriptable Object contains information such as:

* Character name.
* Character sprite.
* Dialogue.
* Current status.
* Whether the character is alive, dead, or the devil.

This system allowed the game to populate the environment with more than **40 different characters**, each with references to different elements of internet culture.

Using Scriptable Objects also allowed character data to remain separated from the NPC behaviour itself, making it easier to manage a large number of characters within the project.

## Dialogue System

I also worked on the system responsible for populating the game's dialogue boxes.

Character information could be retrieved from their associated Scriptable Object and used to display the appropriate dialogue during interactions.

This allowed the same underlying character data to drive both the NPC and their dialogue, reducing the need to manually configure every character interaction.

## Devil Mechanics

The devil's actions are controlled by a timer that progressively slows down exponentially.

When the timer reaches its trigger point, the system randomly selects an in-game character and changes their status to **dead** and **devil**.

When the devil changes characters, the previous devil's status is removed and the newly selected character becomes the current devil.

This creates a constantly changing mystery where the player has to pay attention to the state of the characters and determine who the devil has most recently replaced.

## My Contribution

I worked primarily as a **Gameplay Programmer**, while also contributing to the overall game design.

My work included:

* Programming the NPC population system.
* Programming the dialogue box population system.
* Implementing the devil mechanics.
* Managing character states and references.
* Creating the systems used to determine which character was the devil.
* Supporting the implementation of the investigation gameplay loop.
* Testing and debugging interactions between the different systems.

The project gave me experience building interconnected gameplay systems where changes in one system could affect several other parts of the game.

## Cultural Inspiration

**Devil's Canteen** draws heavily from **Colombian folklore and culture**.

One of the main inspirations was the song **"La Pelea con el Diablo" by Octavio Mesa**, which helped establish the game's tone and thematic direction.

The characters also incorporate references to internet culture, creating a combination of Colombian cultural elements and recognizable characters.

This mixture was intended to give the game a distinct identity while keeping the tone humorous and approachable.

## Design Challenges

One of the biggest challenges was creating a mystery that could remain understandable despite the number of characters present in the game.

With more than **40 characters**, manually managing every character's state would quickly become difficult and error-prone.

The use of Scriptable Objects and centralized character state management helped solve this problem by giving each character a consistent data structure that could be accessed by the different gameplay systems.

Another challenge was making the devil's changing identity feel unpredictable without making the investigation impossible.

The timer and character-selection system provided a way to continuously change the state of the game while still giving the player enough information to investigate what had happened.

## What I Learned

**Devil's Canteen** was an important learning experience in gameplay programming and system design.

Working on the NPC population, dialogue systems, and devil mechanics gave me experience creating systems that interact with each other rather than functioning as isolated mechanics.

I particularly learned how to:

* Structure gameplay data using Scriptable Objects.
* Manage large groups of NPCs.
* Create interconnected character-state systems.
* Build gameplay logic around changing states.
* Connect character data with dialogue.
* Design systems that support a large number of characters.
* Prototype gameplay mechanics quickly during a Game Jam.

It was also an important milestone for me because, compared to my previous Game Jam, I felt much more confident with both the technical implementation and the overall design process.

## Project Details

| | |
|---|---|
| **Development Time** | 2 Days |
| **Game Jam** | Global Game Jam 2024 |
| **Genre** | Walking Simulator / Murder Mystery |
| **Engine** | Unity |
| **Language** | C# |
| **Role** | Gameplay Programmer & Game Designer |
| **Tools** | Unity, Adobe Suite, Google Docs, Visual Studio |

## Team

### Programmers

* **Me** — Gameplay Programming
* **Isabella Montoya**
* **Gabriel Eduardo Renowitzky**
* **Juan Esteban Trillos**

### Art

* **Valeria Quintero Cuervo** — Art
* **Miguel Ángel Grisales** — Art
* **N1K0** — Art

## Project

The project was developed for **Global Game Jam 2024**.

The game was created as a short experimental prototype focused on combining investigation mechanics with Colombian cultural references and a constantly changing mystery.

## Technologies

* **Unity**
* **C#**
* **Scriptable Objects**
* **Gameplay Programming**
* **NPC Systems**
* **Dialogue Systems**
* **State Management**

## Takeaway

**Devil's Canteen** was an important step in my development as a gameplay programmer.

The project allowed me to move beyond isolated mechanics and work on interconnected systems involving **NPCs, character data, dialogue, state management, and dynamic gameplay events**.

More importantly, it showed me how a relatively simple gameplay idea can become much more interesting when supported by well-structured systems and a strong thematic identity.