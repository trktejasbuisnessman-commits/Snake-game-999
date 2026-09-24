# 🎮 MASTER PROMPT — ORIGINAL CLASSIC + ADVANCED BROWSER GAME CREATOR

You are an expert **Game Designer, Game Developer, UI/UX Designer, JavaScript Engineer, Gameplay Programmer, and Creative Problem Solver**.

I want to build a **small browser-based game** that runs directly in a modern web browser without requiring installation.

The game should feel simple enough to understand within a few seconds, but it should have enough depth, challenge, progression, and replayability to make the player want to play again.

My inspiration includes classic games such as:

* 🐍 Snake
* 🧱 Tetris
* 🍄 Mini platform/jump games
* ⚽ Bounce Ball
* 🏓 Pong
* 🧩 Brick Breaker
* 🚗 Simple racing games
* 👾 Classic arcade games

However, **DO NOT simply clone these games**.

Instead, create something that combines the simplicity of classic arcade games with a **new gameplay mechanic**.

---

# 🧠 PHASE 1 — GENERATE ORIGINAL GAME IDEAS

First, generate **30 original mini-game concepts**.

Each concept must include:

1. Game Name
2. One-line concept
3. Core gameplay
4. Player controls
5. Main objective
6. Unique mechanic
7. Difficulty progression
8. Scoring system
9. Replayability factor
10. Estimated development difficulty
11. Why the concept is different from ordinary mini-games

Organize the ideas into:

### 🟢 Category A — Classic Inspired

Simple concepts inspired by Snake, Tetris, Pong, Breakout, etc.

### 🔵 Category B — Physics Based

Games involving gravity, bouncing, momentum, collision, or physics.

### 🟣 Category C — Puzzle Based

Short but intelligent puzzle games.

### 🟠 Category D — Reaction Based

Games that test reaction time, timing, accuracy, and speed.

### 🔴 Category E — Strategy Mini Games

Small games where the player must make decisions.

### 🟡 Category F — Experimental / Weird

Games based on unusual mechanics that players may not have seen before.

### ⚫ Category G — "Never Thought of It" Concepts

Create highly unusual but technically realistic game concepts by combining two or more unrelated mechanics.

Do NOT prioritize graphical complexity.

Prioritize:

**Simple Controls + Interesting Mechanics + Replayability**

---

# 🚀 PHASE 2 — CREATE UNUSUAL GAME MECHANICS

Invent at least **20 original gameplay mechanics**.

Examples of the type of creativity I want:

* The player's previous movement becomes an enemy.
* The game world changes according to the player's score.
* Every mistake changes one rule of the game.
* The player controls time instead of the character.
* The environment remembers previous attempts.
* The player's shadow has independent behavior.
* The screen slowly rotates as the player progresses.
* Objects behave differently depending on their color.
* The player must intentionally lose something to progress.
* The game generates challenges from the player's previous actions.

These are examples only.

Create your own mechanics.

For every mechanic explain:

* How it works
* Why it is interesting
* How it can be implemented using JavaScript
* Difficulty of implementation
* How it can create replayability

---

# 🧪 PHASE 3 — COMBINE MECHANICS

Take the most interesting mechanics and combine them to generate **10 experimental game concepts**.

Each game should still be:

* Browser playable
* Lightweight
* Easy to understand
* Possible to build with HTML/CSS/JavaScript
* Playable using keyboard and/or mouse
* Possible to play on mobile with touch controls

Avoid requiring:

* Large game engines
* Huge assets
* Expensive APIs
* Multiplayer servers
* Complex backend infrastructure

---

# 🏆 PHASE 4 — SELECT A GAME

After generating the concepts, identify the concepts that have the strongest combination of:

* Originality
* Simplicity
* Fun factor
* Replayability
* Technical feasibility
* Visual appeal
* Learning value
* Browser performance

Do NOT simply rank them as "best" or "worst".

Instead, provide a **comparison table** showing these characteristics so I can choose.

Then ask me:

> "Which concept would you like me to build?"

Do not start coding until I select one.

---

# 💻 PHASE 5 — BUILD THE GAME

After I select a concept, build the complete game.

Use:

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

Prefer:

* HTML5 Canvas
* requestAnimationFrame()
* JavaScript modules where useful
* CSS animations where appropriate

Avoid unnecessary frameworks unless they provide a clear benefit.

---

# 🎮 GAME REQUIREMENTS

The finished game must include:

### Main Menu

* Game title
* Play button
* Instructions
* Controls
* High score
* Sound toggle

### Gameplay

* Smooth controls
* Collision detection
* Score system
* Increasing difficulty
* Game-over condition
* Restart functionality
* Pause functionality

### Progression

Difficulty should gradually increase.

For example:

Level 1:
Easy

Level 2:
More obstacles

Level 3:
Faster movement

Level 4:
New mechanic

Level 5:
Combination of previous mechanics

Continue introducing meaningful changes instead of simply increasing speed.

---

# ✨ ADVANCED GAME FEATURES

Where technically appropriate, implement:

* High-score persistence using localStorage
* Multiple difficulty modes
* Combo system
* Achievement system
* Unlockable skins
* Particle effects
* Screen shake
* Smooth transitions
* Sound effects
* Background music toggle
* Responsive canvas
* Keyboard controls
* Mouse controls
* Touch controls
* Pause/resume
* Restart
* Game-over animation
* Start countdown
* Level progression
* Randomized levels
* Procedurally generated challenges

Do not add features just for decoration.

Every feature should improve gameplay.

---

# 🧠 SMART GAME SYSTEM

If appropriate, implement a lightweight adaptive difficulty system.

The game should observe things such as:

* Player score
* Survival time
* Mistakes
* Reaction speed
* Success rate

Then dynamically adjust difficulty.

For example:

If the player is performing extremely well:

→ gradually introduce harder challenges.

If the player is repeatedly failing:

→ temporarily reduce difficulty.

Do this without making the game feel unfair.

---

# 🎨 VISUAL DESIGN

Create a polished modern arcade aesthetic.

The interface should be:

* Clean
* Minimal
* Responsive
* Visually attractive
* Easy to understand

Use:

* Strong typography
* Clear buttons
* Good spacing
* Subtle animations
* Particle effects where appropriate
* Consistent visual hierarchy

Do not overcrowd the screen.

The game should look like a **small professional indie browser game**, not a basic college HTML project.

---

# 📱 RESPONSIVE DESIGN

The game must work on:

* Desktop
* Laptop
* Tablet
* Mobile

Desktop:

Keyboard + mouse

Mobile:

Touch controls

Do not make the mobile version an afterthought.

---

# ⚡ PERFORMANCE

The game must be lightweight.

Target:

* Fast startup
* Smooth animation
* Low memory usage
* No unnecessary network requests
* No huge assets
* Efficient game loop

Avoid memory leaks.

Use requestAnimationFrame() correctly.

---

# 🔊 AUDIO

If sound is implemented:

Create simple procedural or lightweight audio effects using the Web Audio API when practical.

Examples:

* Button click
* Player action
* Collision
* Score
* Level-up
* Game over
* Achievement

Provide:

🔊 Sound ON/OFF

The game must remain fully playable with sound disabled.

---

# 💾 DATA

Use localStorage for:

* High score
* Settings
* Unlocks
* Achievements
* Selected difficulty

Do not require a database for a single-player mini-game.

---

# 🛡️ CODE QUALITY

Write clean, maintainable code.

Use logical separation such as:

```text
Game Engine
Player
Enemies/Obstacles
Collision System
Score System
Level System
Audio System
Input System
UI System
Storage System
```

Add useful comments explaining important logic.

Do not generate unnecessarily complicated code.

Prefer understandable architecture.

---

# 🧪 TESTING

Before considering the game complete, check:

* Start button
* Restart
* Pause
* Game over
* Collision detection
* Score
* High score
* Keyboard controls
* Mouse controls
* Touch controls
* Sound toggle
* Responsive layout
* LocalStorage
* Level progression
* Browser console errors

Fix all obvious bugs.

---

# 🧠 EXTRA CREATIVE MODE

Now activate:

## "10X CREATIVE MODE"

Think like:

* An arcade game designer
* A puzzle designer
* A physics programmer
* A UI/UX designer
* An indie game developer
* A systems designer
* A player

Ask internally:

> "What is the smallest possible game mechanic that could create a surprisingly deep game?"

Then introduce at least one mechanic that makes the game memorable.

The mechanic should be:

**Easy to learn → Difficult to master.**

---

# 🌌 EXPERIMENTAL MODE

If the selected game allows it, experiment with concepts such as:

### 1. Time Echo

Every few seconds, the game records the player's movement.

Later, the previous movement appears as a ghost.

The player must cooperate with or avoid their past self.

### 2. Gravity Flip

The player can switch gravity between:

⬆️ UP
⬇️ DOWN
⬅️ LEFT
➡️ RIGHT

The environment reacts accordingly.

### 3. Living Level

The level changes based on how the player plays.

Aggressive player:

→ more aggressive obstacles.

Careful player:

→ more precision challenges.

### 4. Reverse Score

Sometimes collecting points makes the game harder.

The player must decide:

> "Should I collect the points or survive longer?"

### 5. One Button Universe

The entire game uses only one button.

But the meaning of that button changes according to timing.

### 6. Shadow Player

A shadow follows the player's previous actions.

The shadow can interact with the environment.

### 7. Rule Breaker

Every level introduces one new rule.

Example:

Level 1:
Normal movement.

Level 2:
Red objects are dangerous.

Level 3:
Red objects become collectible.

Level 4:
Collecting red objects reverses controls.

### 8. Memory World

The game remembers what happened during the previous attempt and changes the next attempt accordingly.

---

# 🧩 FINAL CREATIVE CHALLENGE

Before finalizing the game, ask yourself:

> "Could another developer create this exact game from a typical Snake/Tetris tutorial?"

If YES:

Change the core mechanic.

The final game should feel like:

**Classic arcade simplicity + modern interaction + one unexpected idea.**

---

# 📦 FINAL OUTPUT

After development, provide:

1. Complete source code
2. File structure
3. Setup instructions
4. How to run locally
5. Controls
6. Game rules
7. Explanation of the unique mechanic
8. Explanation of the game architecture
9. Future improvement ideas
10. Testing checklist

The final result must run directly in a modern browser.

Do not use copyrighted characters, logos, music, or assets.

Create an original game identity, original mechanics, and original visual presentation.
I want you to build **Echo Snake**.

The core idea is: the player's previous movements are recorded and later appear as "echoes" or ghost versions of the player. These echoes interact with the game world and can become obstacles, helpers, or strategic elements.

Please make it a polished browser game using **HTML5 Canvas, CSS3, and Vanilla JavaScript**.

Keep the controls simple like a classic arcade game, but make the **Echo mechanic the main unique feature**.

Include:

* Start screen
* Smooth gameplay
* Score and high score
* Increasing difficulty
* Multiple levels
* Echo/ghost system
* Collision detection
* Particles and animations
* Sound effects with ON/OFF
* Pause and restart
* LocalStorage high score
* Responsive desktop and mobile controls
* Game-over screen
* Clean modern arcade UI

Most importantly, make the game feel **original rather than a normal Snake clone**.

Before coding, first explain the complete gameplay loop and architecture, then build the game.

