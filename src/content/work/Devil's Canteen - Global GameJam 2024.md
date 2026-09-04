---
title: Devil's Canteen

publishDate: 2024-01-01 00:00:00

img: /assets/POSTER.png

img_alt: Devil's Canteen

description: >
  — Global Game Jam 2024 — A walking simulator murder mystery inspired by Colombian folklore and the song "La Pelea con el Diablo" by Octavio Mesa. The project focused on data-driven NPC systems, dynamic character states, procedural population, and gameplay programming.

tags:
  - Unity
  - C#
  - Gameplay Programming
  - Systems Programming
  - Data-Driven Design
  - Global Game Jam

contributions:
  - Data-Driven NPC Architecture
  - Scriptable Object Character System
  - Procedural NPC Population
  - Dynamic Character State Management
  - Randomized Devil & Victim System
  - Shared Character Data Architecture
  - NPC Interaction & Dialogue Systems
  - Dynamic Investigation Mechanics
  - Character Death & Win/Lose States
  - Modular Population Management
  - Randomized NPC Movement
  - Rapid Gameplay Prototyping

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

**Devil's Canteen** was developed during **Global Game Jam 2024** as a two-day walking simulator and murder mystery inspired by Colombian folklore and culture.

The player takes the role of a Colombian mountaineer investigating a group of characters while the devil secretly kills people and takes over their identities.

The central gameplay challenge was creating a mystery around a large population of characters whose states could change dynamically during gameplay.

For me, the project was an opportunity to experiment with **data-driven gameplay**, **Scriptable Objects**, randomized character assignment, and interconnected character-state systems under an extremely limited development time.

## My Role

I worked primarily as a **Gameplay Programmer and Game Designer**.

My programming responsibilities included:

- NPC population
- Character data management
- Scriptable Object architecture
- Randomized character assignment
- NPC state management
- Devil mechanics
- Character death states
- Dialogue data
- Character list generation
- NPC interaction
- Dynamic gameplay events
- Gameplay debugging

I also contributed to the design of the investigation loop and the overall structure of the mystery.

## Gameplay Loop

The devil continuously moves through the population by killing characters and taking their identities.

The player must:

- Observe the NPCs
- Consult the list of characters
- Remember who has disappeared
- Determine who the devil has replaced
- Interact with the suspected character
- Decide whether to use the machete
- Repeat the investigation as the situation changes

The important design goal was that the player could not simply identify one permanent target.

The state of the population changes throughout the game, forcing the player to continuously update their understanding of what is happening.

## Data-Driven Character System

One of the main systems I programmed was the **character data architecture**.

Each character is represented by a `CharacterSO` Scriptable Object containing information such as:

- Name
- Dialogue
- Avatar
- Death state
- Devil state

```csharp id="3h8s2p"
[CreateAssetMenu(menuName = "Character", fileName = "New Character")]
public class CharacterSO : ScriptableObject
{
    [SerializeField] string name = "Enter a name";
    [SerializeField] string Dialogue = "Enter a dialogue";

    [SerializeField] Sprite avatar;
    [SerializeField] bool isDead = false;
    [SerializeField] bool isDiablo = false;
}
```

This separated **character data** from the GameObject representing the NPC.

The same data could then be accessed by different systems, including the NPC, dialogue interface, character list, and devil mechanics.

This was one of my first experiences using a data-driven approach to gameplay programming.

## Randomized NPC Population

The game contains more than **40 possible character definitions**.

At the beginning of the game, the `SpawnNPC` system selects characters from the available Scriptable Objects and assigns them to the NPCs in the scene.

The system keeps a separate list of characters that have already been selected:

```csharp id="r7k1m4"
if (!usedCharacters.Contains(characters[populateIndex]))
{
    usedCharacters.Add(characters[populateIndex]);
}
else
{
    GiveRandomCharacters();
}
```

This prevents the same character definition from being assigned multiple times during population.

The selected character data is then assigned to the corresponding NPC:

```csharp id="m2x8qa"
nPCs[populatedIndex].SetAvatar(
    usedCharacters[populatedIndex].GetAvatar()
);

nPCs[populatedIndex].SetCharacter(
    usedCharacters[populatedIndex]
);
```

This allowed the same NPC prefab structure to represent many different characters without manually creating a unique GameObject for every possible character.

## Character State Management

The `CharacterSO` also stores the dynamic state of each character.

Two important states are:

- `isDead`
- `isDiablo`

This meant the character's identity and gameplay state could be accessed by multiple systems.

For example, the NPC list checks whether a character has died and updates the UI accordingly:

```csharp id="f3n9kd"
if (usedCharacters[i].GetDeath())
{
    textMeshProUGUI[i].fontStyle =
        TMPro.FontStyles.Strikethrough;
}
```

The same state is then used by the devil system to determine which characters can become the next target.

This created a shared source of truth for the population rather than having separate copies of character state across different scripts.

## Dynamic Devil System

The devil mechanic was the main gameplay system connecting the character population together.

After an initial delay, the game begins selecting victims.

A character is randomly selected from the active population, with checks preventing already-dead or already-selected devil characters from being chosen again:

```csharp id="v5c6az"
int randomSelector =
    UnityEngine.Random.Range(0, usedCharacters.Count);

if (usedCharacters[randomSelector].GetIsDiavlo() ||
    usedCharacters[randomSelector].GetDeath())
{
    yield return StartCoroutine(SeleccionVictima());
}
```

When a valid character is selected:

```csharp id="a6p2wm"
usedCharacters[randomSelector].SetIsDiavlo(true);
usedCharacters[randomSelector].SetDeath(true);
```

The character becomes both **dead** and the current **devil identity**.

After the configured delay, the character is removed from the population and replaced by a corpse.

The devil system then continues selecting new victims.

## Escalating Gameplay

The devil's killing cycle also becomes progressively faster or slower depending on the configured gameplay values.

After each kill, the time between kills is modified:

```csharp id="k8r4ye"
looseCondition--;
timeForKill = timeForKill + 1f;
```

This means the game's pressure changes as the investigation continues.

The player therefore has to make decisions while the state of the world continues changing in the background.

## Dialogue System

The character data also drives the game's dialogue system.

When the player interacts with an NPC, the NPC provides its associated `CharacterSO` to the UI manager.

The UI then retrieves:

- Character name
- Dialogue
- Avatar

```csharp id="n4q7sx"
nameText.text = character.GetCharacterName();
dialog.text = character.GetDialogue();
avatar.sprite = character.GetAvatar();
```

This meant dialogue did not have to be individually configured for every NPC instance.

Instead, the NPC's assigned character data determined what information the player would see.

## NPC Interaction

I implemented the interaction flow that connects NPCs to the investigation system.

When the player clicks an NPC, the system checks whether another interface is currently open before displaying the character's information.

The interaction then:

1. Opens the dialogue interface.
2. Stores which NPC was selected.
3. Passes the NPC's `CharacterSO` to the UI.
4. Displays the character's information.
5. Allows the player to make a decision.

This connected the NPC representation, character data, dialogue, and investigation mechanics into a single gameplay loop.

## The Machete Mechanic

The machete interaction is where the investigation system becomes an actual gameplay decision.

When the player chooses to attack a character, the game checks the character's current state.

If the character is the devil:

- The devil is killed.
- The player wins.

If the character is not the devil:

- The character is killed.
- The player's available lives are reduced.
- The player can eventually lose the game.

```csharp id="j2c9vb"
character.SetDeath(true);
playerStats.interactedNPC.SetUnctive();

if (!character.GetIsDiavlo())
{
    playerStats.life--;

    if (playerStats.life <= 0)
    {
        LoseScreen();
    }
}
else
{
    WinScreen();
}
```

This made the character state system directly responsible for determining the outcome of the player's investigation.

## NPC Movement

The NPCs use a lightweight random movement system to make the population feel active.

Each NPC periodically chooses a random direction and moves for a randomized duration before stopping and selecting another direction.

```csharp id="u8p3le"
direction = RandomDirection();

yield return new WaitForSeconds(
    Random.Range(minMovementTime, maxMovementTime)
);

direction = Vector2.zero;

yield return new WaitForSeconds(
    Random.Range(minWaitTime, maxWaitTime)
);
```

The movement system also performs a 2D raycast to detect walls and stop movement when an obstacle is encountered.

This gave the environment background activity without requiring complex navigation for every NPC.

## Designing for a Large Character Population

A major challenge was managing a game with dozens of possible characters during a **two-day Game Jam**.

Creating completely separate logic for every character would have made the project difficult to maintain.

Instead, I separated the problem into three layers:

**Character Data**

`CharacterSO` stores the identity and state of a character.

**NPC Representation**

`NPC` handles the GameObject representation of the character.

**Population Management**

`SpawnNPC` decides which characters are active and controls the changing population.

This separation allowed one NPC implementation to represent many different characters.

It also made the game's character list, dialogue, and devil mechanics able to work from the same underlying data.

## Rapid Prototyping

Because the project was created during a two-day Game Jam, the architecture had to support fast iteration.

Scriptable Objects were particularly useful because character content could be created and modified independently of the NPC GameObjects.

This allowed us to rapidly add characters and content without rewriting the underlying gameplay code.

The project taught me that even during a Game Jam, a small amount of structure can make iteration significantly faster.

## Cultural Inspiration

**Devil's Canteen** draws heavily from **Colombian folklore and culture**.

One of the main inspirations was the song **"La Pelea con el Diablo" by Octavio Mesa**, which influenced the game's setting and tone.

The character roster also incorporates references to internet culture, creating a deliberately humorous contrast with the folklore-inspired premise.

The result was a short mystery experience that combined a distinctly Colombian thematic identity with systemic gameplay.

## Challenges

The biggest technical challenge was creating a dynamic mystery while working with a large number of characters and only two days of development time.

The system needed to keep track of:

- Which characters were active
- Which characters were dead
- Which character was currently the devil
- Which character was assigned to each NPC
- What dialogue belonged to each character
- What information appeared in the player's list

Scriptable Objects provided a practical way to centralize this information.

The second major challenge was ensuring that the random selection system did not repeatedly select invalid characters. Checks against the character's current state allowed the system to continue searching for a valid target.

## What I Learned

**Devil's Canteen** was an important step in my development as a gameplay programmer because it introduced me to **data-driven gameplay systems**.

I learned how to:

- Use Scriptable Objects to represent gameplay data
- Separate data from GameObject behavior
- Manage a large NPC population
- Randomize gameplay states
- Connect shared character data to multiple systems
- Build dialogue systems around gameplay data
- Manage dynamic character states
- Create interconnected gameplay systems under extreme time constraints
- Prototype systems quickly without completely sacrificing structure

Compared with my earlier Game Jam projects, I felt significantly more confident designing systems rather than only implementing individual mechanics.

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

- **Me** — Gameplay Programming
- **Isabella Montoya**
- **Gabriel Eduardo Renowitzky**
- **Juan Esteban Trillos**

### Art

- **Valeria Quintero Cuervo** — Art
- **Miguel Ángel Grisales** — Art
- **N1K0** — Art

## Project

The project was developed for **Global Game Jam 2024** as a short experimental prototype.

The goal was to combine investigation mechanics with Colombian cultural references and a dynamically changing mystery.

The two-day development period required us to prioritize the core gameplay loop and build systems that could be implemented and connected quickly.

## Technologies

**Unity · C# · Scriptable Objects · Data-Driven Design · NPC Systems · Character State Management · Dialogue Systems · Coroutines · Rigidbody2D · Physics2D · Gameplay Programming**

## Takeaway

**Devil's Canteen** represents an important transition in my programming development.

Rather than focusing on one isolated mechanic, I worked on a collection of systems that shared and modified the same underlying character data.

The project gave me practical experience with **data-driven design, randomized gameplay, NPC population systems, dynamic state management, and rapid gameplay prototyping**.

Most importantly, it showed me how separating **data, representation, and gameplay logic** can make a system much easier to expand—even when it has to be built in only two days.