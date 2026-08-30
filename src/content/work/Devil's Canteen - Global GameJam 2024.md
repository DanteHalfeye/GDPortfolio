---
title: Devil's Canteen Global Game Jam 2024
publishDate: 2024-01-01 00:00:00
img: /assets/POSTER.png
img_alt: Devil's Canteen
description: >
  A walking simulator murder mystery developed during Global Game Jam 2024,
  inspired by Colombian folklore and the song "La Pelea con el Diablo" by Octavio Mesa.
tags:
  - Unity
  - Game Design
  - Gameplay Programming
  - Global Game Jam
---

# Devil's Canteen

## Overview

**Devil's Canteen** was developed during **Global Game Jam 2024** and is a walking simulator murder mystery. This was my second Game Jam, and it marked the first time I felt truly satisfied with the prototype.

In the game, you play as a Colombian mountaineer tasked with finding and killing the devil with a machete.

## Project

[Global Game Jam 2024 — Devil's Canteen](https://globalgamejam.org/games/2024/la-cantina-del-diablo-6)

## Visuals & Gameplay Showcase

### Gameplay Footage
<video controls src="/assets/SC_CantinaDelDiablo.mp4" title="Title"></video>


## Gameplay Concept

The devil is killing and replacing his victims.

You have a list of everyone present, with the victims marked in red. Your job is to identify who the devil last replaced and **machetazo** — hit them with a machete — to save the remaining characters.

## My Role

I worked primarily as a **Gameplay Programmer**, implementing several of the systems that drive the game's investigation and gameplay.

My work included:

- Programming the NPC population system.
- Programming the dialogue box population system.
- Implementing the devil mechanics.
- Managing character states and references.
- Creating the systems used to determine which character was the devil.

## NPC Population

The NPC population system uses a series of linked lists containing **Scriptable Objects (SO)**, with each Scriptable Object representing a character.

Each character's Scriptable Object contains information such as:

- Character name
- Character sprite
- Dialogue
- Current status
- Whether the character is alive, dead, or the devil

The system allowed us to populate the game with more than **40 different characters**, each with references to different elements of internet culture.

## Devil Mechanics

The devil's actions are controlled by a timer that progressively slows down exponentially.

When the timer reaches its trigger point, the system randomly selects an in-game character and changes their status to **dead** and **devil**.

When the devil changes characters, the previous devil's status is removed and the new character becomes the current devil.

This creates a constantly changing mystery where the player has to pay attention to the state of the characters and determine who the devil has replaced most recently.

## Cultural Inspiration

The game draws heavily from **Colombian folklore and culture**.

One of the main inspirations was the song **"La Pelea con el Diablo" by Octavio Mesa**, which helped establish the game's tone and thematic direction.

The characters also incorporate references to internet culture, creating a mixture of Colombian cultural elements and recognizable characters.

## Learning Experience

This project was an excellent learning opportunity and helped me improve my understanding of gameplay programming and system design.

Working on the NPC population, dialogue systems, and devil mechanics gave me experience creating systems that interact with each other rather than functioning as isolated mechanics.

It was also an important milestone for me because, compared to my previous Game Jam, I felt much more satisfied with the final prototype.

## Team

### Programmers

- **Me**
- **Isabella Montoya**
- **Gabriel Eduardo Renowitzky**
- **Juan Esteban Trillos**

### Art

- **Valeria Quintero Cuervo** [@KrowKrapp](https://www.instagram.com/Krowkrapp/)
- **Miguel Ángel Grisales**
- **N1K0**

## Project Details

**Project Length:** 2 days

**Engine:** Unity

**Tools:** Unity, Adobe Suite, Google Docs

