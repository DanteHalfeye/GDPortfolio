---
title: Cognitive Overload
publishDate: 2022-11-01 00:00:00
img: /assets/Cognitive.jpeg
img_alt: Cognitive Overload puzzle platformer
description: |
  A puzzle platformer designed to demonstrate divided attention through four deliberately misaligned camera views. Players must mentally reconstruct the level while navigating an intentionally difficult-to-read environment.
tags:
  - Unity
  - Gameplay Programming
  - Level Design
  - Game Design
---

## Overview

**Cognitive Overload** is a puzzle platformer developed for a Cognitive Processes class, designed around the psychological concept of **divided attention**.

Rather than simply explaining the concept, our goal was to make the player experience it firsthand. The game's level is presented through four different cameras, each showing a different section of the world. The cameras are deliberately positioned so that, at first glance, the level appears to form a straightforward path forward.

However, the views do not represent the actual layout in the correct spatial order. Players must constantly switch between the different perspectives and mentally reconstruct how the pieces of the level connect.

The result is a puzzle where the main challenge isn't simply determining **where to go**, but understanding **what the player is actually looking at**.

### [Download Cognitive Overload](../../../public/Cognitive.zip)
## Visuals & Gameplay Showcase

### Gameplay Footage
<video controls src="/assets/Try_out_things - Game - Windows, Mac, Linux - Unity 2021.3.16f1 Personal _DX11_ 2023-11-13 17-54-39.mp4" title="Title"></video>
![Players Enjoying 1](/CognitivePeopleTrying1.jpeg)
![Players Enjoying 2](/CognitivePeopleTrying2.jpeg)
## The Core Mechanic

The entire game was built around the relationship between the four cameras.

Each camera renders a different portion of the same platforming environment. Their positions were carefully arranged to create a misleading visual continuity between the different sections.

From the player's perspective, the platforms appear to form a path that can simply be followed forward.

Once the player starts moving, however, the illusion breaks down. Platforms that appear connected may belong to completely different sections of the map, forcing the player to divide their attention between the four views and reconstruct the actual level layout.

This mechanic allowed us to turn a psychological concept into a gameplay system rather than simply presenting it through dialogue or text.

## Art Direction

We intentionally designed the visual style to make the environment **difficult to read**.

Normally, clear visual communication is an important principle of level design. For this project, we deliberately worked against that principle.

The chaotic visual language made it harder for players to immediately understand the relationship between the four camera views, reinforcing the feeling of cognitive overload.

This was also particularly challenging because the entire project was developed in only **four days**.

## My Role

### Programming

I programmed the gameplay systems and implemented the interactions required for the platforming experience.

A major part of my work was making the different camera views work together as a coherent gameplay mechanic while maintaining smooth transitions and player interactions.

### Level Design

I designed the levels around the four-camera system.

The placement of platforms, obstacles, and pathways was carefully planned so that the camera arrangement could create misleading visual connections while still providing enough information for the player to eventually understand the puzzle.

### Direction

I directed the overall project and coordinated the team around the game's conceptual and technical goals.

One of the biggest challenges was making sure that every design decision supported the idea of **divided attention**, including the intentionally difficult-to-read visual style.

## Challenges

The biggest challenge wasn't implementing the mechanic—it was convincing the team to intentionally make parts of the game **harder to understand**.

Traditional game development usually pushes toward clarity, readability, and intuitive navigation. For this project, those principles had to be intentionally subverted.

We had to find a balance where the game was confusing enough to communicate the concept without becoming completely impossible to understand.

The four-day development period also required us to prioritize the core mechanic and focus our development time on the elements that directly supported the concept.

## What I Learned

**Cognitive Overload** taught me how game mechanics can be used as a medium for communicating ideas beyond traditional entertainment.

Instead of simply telling players what divided attention is, we designed a system that makes them experience the effects of divided attention themselves.

The project also strengthened my understanding of **level design, visual communication, rapid prototyping, and directing a team under a strict deadline**.

## Project Details

**Team Size:** 2 Programmers, 1 Artist, 6 Presenters  
**Project Length:** 4 days  
**Engine:** Unity  
**Tools:** Adobe Creative Suite, Google Docs

### Team

- **Me** — Gameplay Programming, Level Design & Direction
- **Valeria Quintero Cuervo** — Art — [@KrowKrapp](https://www.instagram.com/Krowkrapp/)
- **6 Presenters** — Project Presentation

## Technologies

**Unity · C# · Gameplay Programming · Level Design · Camera Systems · Rapid Prototyping**