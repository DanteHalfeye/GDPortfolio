---
title: Other Coding Studies
publishDate: 2020-08-29 00:00:00
img: /Forces.jpg
img_alt: GPU particle force simulation
description: >
  A collection of programming and simulation studies exploring emergent behavior, procedural systems, physics, forces, and GPU-based particle simulations using p5.js and Three.js.
tags:
  - Three.js
  - WebGPU
  - JavaScript
  - p5.js
  - Simulation
  - Procedural Generation
  - Gameplay Programming
---

# Other Coding Studies

A collection of experimental programming projects focused on **simulations, procedural systems, emergent behavior, interactive physics, and GPU programming**.

These studies explore how mathematical and physical systems can be translated into interactive experiences, with projects ranging from agent-based ecosystems to large-scale GPU particle simulations.

## Particle Life

**Particle Life** is a generative simulation in which large groups of particles move according to simple interaction rules based on their types.

Each particle belongs to a species, and a matrix of attraction and repulsion values determines how strongly each species is drawn toward or pushed away from every other species. Although each particle follows only these local rules, their collective behavior produces complex, emergent patterns such as clusters, swarms, rotating structures, and constantly changing ecosystems.

The project explores how **simple local interactions can create complex global behavior without centralized control**.

### [Full Documentation](https://dantehalfeye.github.io/SimulationStudies/chapters/particlelife/)

### [Try the Project](https://editor.p5js.org/deadcoolest/sketches/o3uGwprEI)

![Particle Life](/Particle.jpg)

## Emergent Ocean Simulation

This project explores how a digital ecosystem can create meaningful behavior without relying entirely on predetermined events.

The initial idea was to create an environment where uncertainty is not treated as pure randomness, but as the result of different systems interacting with each other.

The ocean became the environment for this experiment because it naturally represents uncertainty. Currents constantly change, creatures search for resources without knowing the complete environment, and small changes can affect the larger ecosystem.

The simulation combines **procedural generation, autonomous agents, probability distributions, noise functions, and user interaction** to create a living system that continues evolving without requiring constant external input.

### [Full Documentation](https://dantehalfeye.github.io/SimulationStudies/chapters/emergentoceansimulation/)

### [Try the Project](https://editor.p5js.org/deadcoolest/sketches/YjhET8UF_)

![Emergent Ocean Simulation](/Random.jpg)

## Instrument Log — GPU Particle Force Instrument

**Instrument Log** is an interactive collection of experiments exploring **forces, particle behavior, procedural movement, and GPU computation**.

Built with **Three.js and WebGPU**, the project experiments with moving large numbers of particles while allowing the user to interact with the underlying force systems.

Rather than treating the simulation as a fixed demonstration, the project works as an interactive instrument. Users can manipulate the simulation and observe how changes to forces and parameters affect the behavior of the particle system.

The project explores how **GPU computation can be used to create large-scale interactive simulations** that would be difficult to run efficiently using traditional CPU-based approaches.

### [Full Documentation](https://dantehalfeye.github.io/SimulationStudies/chapters/forces/)

### [Try the Project](https://dantehalfeye.github.io/Forces-Simulation-Instrument/)

![GPU Particle Force Instrument](/Forces.jpg)

## What I Learned

These studies allowed me to experiment with programming concepts that extend beyond traditional gameplay systems.

Through these projects, I explored:

- **Three.js and WebGPU** for GPU-accelerated simulations.
- Particle and agent-based simulations.
- Emergent behavior and complex systems.
- Procedural generation.
- Autonomous agents.
- Physics and force-based movement.
- Probability and randomness.
- Noise functions.
- GPU-based computation.
- Interactive simulation design.

Rather than focusing exclusively on building complete games, these projects gave me a space to **experiment with systems, test ideas, and understand how individual rules can produce complex behavior**.