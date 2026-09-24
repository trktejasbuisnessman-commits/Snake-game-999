export interface GameConcept {
  id: string;
  category: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  categoryName: string;
  name: string;
  oneLiner: string;
  coreGameplay: string;
  controls: string;
  objective: string;
  uniqueMechanic: string;
  difficultyProgression: string;
  scoringSystem: string;
  replayabilityFactor: string;
  devDifficulty: 'Low' | 'Medium' | 'High';
  differentiatingFactor: string;
  metrics: {
    originality: number;
    simplicity: number;
    funFactor: number;
    replayability: number;
    feasibility: number;
    visualAppeal: number;
    learningValue: number;
    performance: number;
  };
}

export interface NovelMechanic {
  id: string;
  name: string;
  howItWorks: string;
  whyInteresting: string;
  implementationInJS: string;
  difficulty: 'Low' | 'Medium' | 'High';
  replayabilityBenefit: string;
}

export interface HybridConcept {
  id: string;
  name: string;
  combinedMechanics: string[];
  elevatorPitch: string;
  controls: string;
  gameplayLoop: string;
  whyItWorks: string;
}

export const GAME_CONCEPTS: GameConcept[] = [
  // CATEGORY A: Classic Inspired
  {
    id: 'a1',
    category: 'A',
    categoryName: 'Classic Inspired',
    name: 'Ouroboros Split',
    oneLiner: 'Snake where every 5th fruit slices you in half, turning your severed tail into a mirrored autonomous snake.',
    coreGameplay: 'Grid-based snake navigation. Eating glowing catalysts splits your tail into an independent parallel snake moving with inverted symmetry.',
    controls: 'Arrow keys / WASD / Swipe gestures.',
    objective: 'Survive as long as possible while managing up to 4 synchronized snakes sharing a collective score pool.',
    uniqueMechanic: 'Autonomous Tail Splitting: severed segments retain physics and consume food, but collision between any heads is fatal.',
    difficultyProgression: 'Lvl 1: Single snake -> Lvl 2: 2 mirrored snakes -> Lvl 3: Inverted speeds -> Lvl 4: Converging arena boundaries.',
    scoringSystem: 'Food collected x number of active concurrent snakes. Grazing near another snake head yields a 3x multiplier.',
    replayabilityFactor: 'Emergent spatial multi-tasking and high-risk synchronization routing.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Transforms a solitary survival game into a multi-entity choreography puzzle.',
    metrics: { originality: 8, simplicity: 9, funFactor: 9, replayability: 9, feasibility: 9, visualAppeal: 8, learningValue: 8, performance: 10 }
  },
  {
    id: 'a2',
    category: 'A',
    categoryName: 'Classic Inspired',
    name: 'Tetra-Weight',
    oneLiner: 'Tetris blocks have realistic mass and balance on a seesaw fulcrum base.',
    coreGameplay: 'Falling tetrominoes must be stacked on a balanced platform. Clearing lines removes weight from that specific wing.',
    controls: 'Left/Right to slide, Up to rotate, Down to soft drop.',
    objective: 'Clear lines without letting the platform tilt past 35 degrees and tip over.',
    uniqueMechanic: 'Line Clears alter physical torque; clearing a heavy block on the left abruptly drops the right side.',
    difficultyProgression: 'Fulcrum narrows every 300 points, wind gusts add lateral rotational torque.',
    scoringSystem: 'Balanced line clears grant 4x bonus; combo cascades multiply by remaining platform equilibrium percentage.',
    replayabilityFactor: 'Dynamic tension between clearing lines and maintaining center of gravity.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Infuses rigid geometric grid logic with continuous torque physics.',
    metrics: { originality: 9, simplicity: 8, funFactor: 8, replayability: 9, feasibility: 8, visualAppeal: 8, learningValue: 9, performance: 9 }
  },
  {
    id: 'a3',
    category: 'A',
    categoryName: 'Classic Inspired',
    name: 'Refract Pong',
    oneLiner: 'Pong where paddles are angled glass prisms that refract the ball into spectral sub-balls.',
    coreGameplay: 'Guard your goal while tilting prism paddles. Hitting the ball at sharp angles splits it into Red, Green, and Blue frequency orbs.',
    controls: 'W/S or Up/Down for vertical movement; A/D or Left/Right to angle the prism bevel.',
    objective: 'Pass spectral balls through the opponent goal while blocking matched colors on your spectrum receptors.',
    uniqueMechanic: 'Prismatic Dispersion: Single white ball splits into three colored balls with distinct velocities and physics attributes.',
    difficultyProgression: 'Opponent AI reaction speed increases, moving refraction barriers appear in center court.',
    scoringSystem: 'Points based on ball velocity and number of dispersed spectrum balls active on goal.',
    replayabilityFactor: 'High-speed kinetic chaos with tactical angle manipulation.',
    devDifficulty: 'Low',
    differentiatingFactor: 'Turns 1-on-1 pong into sudden multi-ball laser hockey.',
    metrics: { originality: 8, simplicity: 9, funFactor: 8, replayability: 8, feasibility: 10, visualAppeal: 9, learningValue: 7, performance: 10 }
  },
  {
    id: 'a4',
    category: 'A',
    categoryName: 'Classic Inspired',
    name: 'Breakout Decay',
    oneLiner: 'Breakout where destroyed bricks release acidic spores that dissolve your paddle over time.',
    coreGameplay: 'Launch and rebound balls against brick matrices. Destroyed bricks shed residue; your paddle shrinks when touched by acid.',
    controls: 'Mouse horizontal move or Left/Right arrows; Space to release ball.',
    objective: 'Clear all core bricks before paddle width shrinks to zero, repairing paddle by catching neutral silicon shards.',
    uniqueMechanic: 'Destructive debris: Every successful attack creates incoming secondary hazard particles.',
    difficultyProgression: 'Bricks require multiple hits and spawn denser downward acid clouds at higher tiers.',
    scoringSystem: 'Chain rebounds score exponential points; bonus awarded for clearing stages with wider paddle margin.',
    replayabilityFactor: 'Constant trade-off between hitting bricks and dodging the shrapnel.',
    devDifficulty: 'Low',
    differentiatingFactor: 'Player offensive success directly amplifies immediate defensive difficulty.',
    metrics: { originality: 7, simplicity: 9, funFactor: 8, replayability: 8, feasibility: 10, visualAppeal: 7, learningValue: 7, performance: 10 }
  },
  {
    id: 'a5',
    category: 'A',
    categoryName: 'Classic Inspired',
    name: 'Pac-Tether',
    oneLiner: 'Maze navigation where you are elastic-tethered to an ethereal phantom brother you cannot let ghosts touch.',
    coreGameplay: 'Navigate winding mazes to collect pellets. You pull an anchor partner who swings on an elastic string like a flail.',
    controls: 'WASD / Arrow Keys for player character movement.',
    objective: 'Clear all dots while using the swinging anchor to whip ghosts without letting ghosts touch the connecting line.',
    uniqueMechanic: 'Centrifugal Tether Whip: The trailing entity can defeat ghosts if swung with sufficient angular velocity.',
    difficultyProgression: 'Ghosts learn predictive pathing; elastic tether gets longer and looser over time.',
    scoringSystem: 'Pellet chains + consecutive ghost knockouts using tether whip centrifugal velocity.',
    replayabilityFactor: 'Mastering momentum arcs in tight corridors creates deep mechanical mastery.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Replaces Pac-Man invincibility pellets with continuous skill-based momentum physics.',
    metrics: { originality: 9, simplicity: 8, funFactor: 9, replayability: 9, feasibility: 8, visualAppeal: 8, learningValue: 8, performance: 9 }
  },

  // CATEGORY B: Physics Based
  {
    id: 'b1',
    category: 'B',
    categoryName: 'Physics Based',
    name: 'Orbital Slingshot 2000',
    oneLiner: 'Navigate through a dense field of planetary bodies using only gravitational slingshot burns.',
    coreGameplay: 'A probe moves through space affected by N-body gravitational fields. You only have a single thruster impulse button.',
    controls: 'Spacebar / Tap: Fire a burst thruster in the direction of current tangential velocity.',
    objective: 'Hop from orbit to orbit, gathering scientific anomalies while avoiding crashing into planet surfaces.',
    uniqueMechanic: 'Gravitational Transfer: Score multiplier scales with how close you skim to the event horizon of black holes.',
    difficultyProgression: 'Planets start moving on elliptical orbits; binary star systems introduce chaotic three-body problems.',
    scoringSystem: 'Slingshot exit velocity x proximity factor x anomaly data payloads.',
    replayabilityFactor: 'One-button control scheme masking intricate orbital mechanics and speedrun possibilities.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Zero joystick steering; motion is entirely emergent from gravitational forces.',
    metrics: { originality: 8, simplicity: 9, funFactor: 9, replayability: 9, feasibility: 9, visualAppeal: 9, learningValue: 10, performance: 9 }
  },
  {
    id: 'b2',
    category: 'B',
    categoryName: 'Physics Based',
    name: 'Momentum Climber',
    oneLiner: 'A ragdoll climber propelled exclusively by an internal spinning flywheel.',
    coreGameplay: 'Control the angular acceleration of an internal gyro wheel to swing limbs and hook onto pegs on a rising wall.',
    controls: 'Left/Right arrows (or touch sides) to spin internal flywheel clockwise or counter-clockwise; Space to grab/release.',
    objective: 'Climb as high as possible before the rising floodwater catches up.',
    uniqueMechanic: 'Conservation of Angular Momentum: Spinning the internal wheel rotates the entire body in reverse.',
    difficultyProgression: 'Pegs become fragile, moving rails appear, wind turbulence destabilizes swings.',
    scoringSystem: 'Altitude climbed + speed bonuses + style flips between hooks.',
    replayabilityFactor: 'Hilarious physical comedy backed by satisfying tactile skill progression.',
    devDifficulty: 'High',
    differentiatingFactor: 'Locomotion through torque inertia rather than direct limb movement.',
    metrics: { originality: 9, simplicity: 8, funFactor: 9, replayability: 9, feasibility: 7, visualAppeal: 8, learningValue: 9, performance: 8 }
  },
  {
    id: 'b3',
    category: 'B',
    categoryName: 'Physics Based',
    name: 'Gelatin Bounce',
    oneLiner: 'Guide an ultra-squishy soft-body blob through hazardous pinball-style labyrinths by altering its elasticity on the fly.',
    coreGameplay: 'A soft-body blob drops through obstacle tunnels. Pressing keys instantly shifts its physical state from rubber to liquid to hardened rock.',
    controls: '1 (Rubber/Bounce), 2 (Liquid/Squeeze), 3 (Granite/Heavy smash). Arrow keys for air nudges.',
    objective: 'Reach the bottom extraction pad without popping from critical impact stress.',
    uniqueMechanic: 'Instant Material Phase Transition: Change density and spring constant mid-flight to solve physics traps.',
    difficultyProgression: 'Tunnels become narrower, crushing pistons require precise liquid timing, spiked floors require high bounce.',
    scoringSystem: 'Descent speed + trick bounces + remaining mass integrity.',
    replayabilityFactor: 'Multiple valid pathways through levels depending on preferred material state.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Focuses on material elasticity physics rather than standard platforming.',
    metrics: { originality: 8, simplicity: 8, funFactor: 9, replayability: 8, feasibility: 8, visualAppeal: 9, learningValue: 8, performance: 8 }
  },
  {
    id: 'b4',
    category: 'B',
    categoryName: 'Physics Based',
    name: 'Hydro-Vector',
    oneLiner: 'Direct a high-pressure water stream against surfaces to propel an inverted hover-craft through laser gates.',
    coreGameplay: 'Fire water jets against walls to generate equal and opposite propulsion reactions.',
    controls: 'Mouse cursor aims nozzle; Left click fires water jet.',
    objective: 'Fly through obstacle courses while managing a finite water tank replenished by water basins.',
    uniqueMechanic: 'Fluid Propulsion Reaction: The water stream itself acts as a dynamic bridge and physical obstacle-clearing tool.',
    difficultyProgression: 'Water consumption rate increases; wind turbines deflect water jets.',
    scoringSystem: 'Time attack + water conservation efficiency + mid-air gate accuracy.',
    replayabilityFactor: 'Speedrunning lines and rocket-jump style aerial trick maneuvers.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Weapon recoil is the sole means of flight and puzzle interaction.',
    metrics: { originality: 8, simplicity: 8, funFactor: 9, replayability: 9, feasibility: 8, visualAppeal: 8, learningValue: 8, performance: 8 }
  },
  {
    id: 'b5',
    category: 'B',
    categoryName: 'Physics Based',
    name: 'Pendulum Slinger',
    oneLiner: 'A double pendulum where you control only the pivot point to catapult an orb across sky islands.',
    coreGameplay: 'Move the ceiling anchor point left and right to build chaotic double-pendulum energy, then release the tip.',
    controls: 'A/D or Mouse X to slide pivot; Space to release tip projectile.',
    objective: 'Land the orb in floating target hoops across an infinite procedural skyway.',
    uniqueMechanic: 'Double Pendulum Chaos Theory: Tiny inputs generate dramatic, unpredictable whip velocities.',
    difficultyProgression: 'Distances widen, hoops move in sine waves, wind shear introduces drift.',
    scoringSystem: 'Target accuracy (bullseye) multiplied by launch velocity and consecutive streak.',
    replayabilityFactor: 'Fascinating real-time visualization of chaos theory combined with addictive target shooting.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Transforms a classic physics simulation benchmark into a casual sports arcade game.',
    metrics: { originality: 9, simplicity: 9, funFactor: 8, replayability: 9, feasibility: 9, visualAppeal: 9, learningValue: 10, performance: 9 }
  },

  // CATEGORY C: Puzzle Based
  {
    id: 'c1',
    category: 'C',
    categoryName: 'Puzzle Based',
    name: 'Chrono-Fuse',
    oneLiner: 'Every move burns 1 second of fuse, but rewinding time creates physical smoke barriers from your past self.',
    coreGameplay: 'Grid puzzle where you navigate to the exit key before your fuse expires. You can rewind time up to 5 times.',
    controls: 'WASD to step, R to rewind time by 3 seconds.',
    objective: 'Reach the portal within strict step counts while avoiding running into your own timeline ash trails.',
    uniqueMechanic: 'Temporal Residue: Rewound paths leave impenetrable ash statues that block doors and lasers.',
    difficultyProgression: 'Lasers require specific past ash blocks to shield you while you activate twin pressure pads.',
    scoringSystem: 'Least steps taken + least rewinds used + remaining fuse percentage.',
    replayabilityFactor: 'Solving puzzles requires intentional failure loops to construct structural cover.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Your previous mistakes are literally the building blocks needed to solve subsequent chambers.',
    metrics: { originality: 9, simplicity: 8, funFactor: 8, replayability: 9, feasibility: 9, visualAppeal: 7, learningValue: 9, performance: 10 }
  },
  {
    id: 'c2',
    category: 'C',
    categoryName: 'Puzzle Based',
    name: 'Mirror-Shift Hex',
    oneLiner: 'Rotate a hexagonal kaleidoscope where three mirrored avatars move simultaneously to trigger synchronized glyphs.',
    coreGameplay: 'Hexagonal tile puzzle where one directional input moves three colored pawns reflected across 120-degree axes.',
    controls: 'Q, W, E, A, S, D for hexagonal step directions; Space to rotate world 60 degrees.',
    objective: 'Position all three pawns on their matching color glyphs simultaneously.',
    uniqueMechanic: 'Tri-fold Symmetry Coordination: Obstacles on one sector block only that pawn, desynchronizing the trio.',
    difficultyProgression: 'Moving laser gates, single-use fragile tiles, polarity-reversed portals.',
    scoringSystem: 'Par moves scoring (Gold/Silver/Bronze) + speed solving multipliers.',
    replayabilityFactor: 'Deep geometric satisfaction; 50 handcrafted procedural puzzle states.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Hexagonal tri-symmetry creates novel spatial cognitive challenges rarely seen in square grid games.',
    metrics: { originality: 8, simplicity: 8, funFactor: 8, replayability: 8, feasibility: 9, visualAppeal: 9, learningValue: 9, performance: 10 }
  },
  {
    id: 'c3',
    category: 'C',
    categoryName: 'Puzzle Based',
    name: 'Lumen Circuit',
    oneLiner: 'Bend and split light beams through sliding mirrors on a fast ticking timer.',
    coreGameplay: 'Light emitters fire photons into a grid. Drag and rotate optical prism blocks to route laser beams into photocells.',
    controls: 'Mouse drag and drop prism tiles; Click to rotate 45 degrees.',
    objective: 'Power all photocells simultaneously to unlock the next capacitor before power surges overload.',
    uniqueMechanic: 'Wavelength Mixing: Blending blue and red beams creates magenta light capable of passing through magenta filters.',
    difficultyProgression: 'Shorter overload timers, color filters, refractive splitters, and moving mirror tracks.',
    scoringSystem: 'Speed of circuit completion + minimum mirrors placed + simultaneous multi-cell energization.',
    replayabilityFactor: 'Endless procedurally generated optical networks with randomized components.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Instant optical feedback with beautiful glowing laser aesthetics.',
    metrics: { originality: 7, simplicity: 9, funFactor: 8, replayability: 8, feasibility: 10, visualAppeal: 9, learningValue: 9, performance: 9 }
  },
  {
    id: 'c4',
    category: 'C',
    categoryName: 'Puzzle Based',
    name: 'Entropy Cleanse',
    oneLiner: 'Clear a cellular grid where every tile you clean infects its orthogonal neighbors with opposite entropy.',
    coreGameplay: 'A matrix of tiles marked 1 to 5. Clicking a tile decrements its value, but increments all 4 adjacent neighbors.',
    controls: 'Left click to reduce, Right click to inspect neighbor cascade preview.',
    objective: 'Reduce all tiles in the matrix to exactly 0 in the minimum number of clicks.',
    uniqueMechanic: 'Zero-Sum Cellular Cascade: Solving one quadrant creates pressure waves across adjacent zones.',
    difficultyProgression: 'Grid expands from 3x3 to 6x6, locked anchor tiles that cannot be directly clicked.',
    scoringSystem: 'Difference between your click count and the mathematical minimum solution (Par score).',
    replayabilityFactor: 'Pure analytical mental exercise like Minesweeper meets Lights Out with deep mathematical depth.',
    devDifficulty: 'Low',
    differentiatingFactor: 'Elegant mathematical rule set creating emergent puzzle complexity.',
    metrics: { originality: 8, simplicity: 9, funFactor: 7, replayability: 8, feasibility: 10, visualAppeal: 7, learningValue: 9, performance: 10 }
  },
  {
    id: 'c5',
    category: 'C',
    categoryName: 'Puzzle Based',
    name: 'Gravity Dial',
    oneLiner: 'Rotate the entire screen in 90-degree increments to guide rolling colored marbles into matching cups.',
    coreGameplay: 'A stationary maze containing loose marbles and barriers. The player rotates the arena orientation.',
    controls: 'Left/Right arrows or A/D to rotate stage left or right by 90 degrees.',
    objective: 'Roll all marbles into their color-coded goals without letting them fall into incinerator pits.',
    uniqueMechanic: 'Differential Marble Densities: Heavy iron marbles roll fast and smash glass; cork marbles float on water.',
    difficultyProgression: 'Multi-layer stages, sticky walls, gravity flip switches, teleporters.',
    scoringSystem: 'Total rotation count (fewer is better) + elapsed time.',
    replayabilityFactor: 'Satisfying tactile rolling physics with spatial reorientation challenges.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'The player moves the world rather than any character.',
    metrics: { originality: 7, simplicity: 9, funFactor: 8, replayability: 8, feasibility: 9, visualAppeal: 8, learningValue: 8, performance: 9 }
  },

  // CATEGORY D: Reaction Based
  {
    id: 'd1',
    category: 'D',
    categoryName: 'Reaction Based',
    name: 'Pulse Weaver',
    oneLiner: 'Rhythmically expand and contract a force shield to catch incoming bullets at the exact moment of harmonic resonance.',
    coreGameplay: 'Concentric rings pulse outward to an electronic beat. Expand your shield radius to intercept projectiles exactly on the beat.',
    controls: 'Spacebar / Tap: Pulse shield expansion; Hold to sustain barrier.',
    objective: 'Parry geometric bullet swarms to redirect them into boss targets.',
    uniqueMechanic: 'Perfect Harmonic Deflection: Parrying bullets on beat transforms them into homing counter-missiles.',
    difficultyProgression: 'Tempo increases from 110 BPM to 160 BPM; polyrhythmic bullet patterns (3 against 4).',
    scoringSystem: 'Timing accuracy (Perfect / Great / Early / Late) multiplied by consecutive parry streaks.',
    replayabilityFactor: 'Infectious rhythmic audio-visual synchronization and musical feedback.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Rhythm game mechanics seamlessly blended into bullet-hell defensive parrying.',
    metrics: { originality: 9, simplicity: 9, funFactor: 9, replayability: 9, feasibility: 9, visualAppeal: 9, learningValue: 8, performance: 10 }
  },
  {
    id: 'd2',
    category: 'D',
    categoryName: 'Reaction Based',
    name: 'Apex Drift 1-Bit',
    oneLiner: 'High-speed minimalist single-button drifting through endless procedural neon wireframe switchbacks.',
    coreGameplay: 'A micro race car automatically accelerates down tight winding tracks. Holding down drifts right; releasing drifts left.',
    controls: 'Hold Mouse / Space / Touch: Drift Right; Release: Drift Left.',
    objective: 'Travel as far as possible without grazing the track outer barriers.',
    uniqueMechanic: 'Single-Button Slalom Inertia: Speed increases exponentially the closer your rear tires graze the track edges.',
    difficultyProgression: 'Track width narrows, chicane frequency increases, dynamic blind corners appear.',
    scoringSystem: 'Meters traveled x Edge-Graze Multiplier.',
    replayabilityFactor: 'Hyper-addictive "one more run" arcade speed dopamine loop with instant restarts.',
    devDifficulty: 'Low',
    differentiatingFactor: 'Condenses racing game thrill into a pure single-button kinetic timing flow state.',
    metrics: { originality: 8, simplicity: 10, funFactor: 9, replayability: 10, feasibility: 10, visualAppeal: 8, learningValue: 7, performance: 10 }
  },
  {
    id: 'd3',
    category: 'D',
    categoryName: 'Reaction Based',
    name: 'Laser Scalpel',
    oneLiner: 'Slice moving geometric shapes along their exact axis of symmetry in fractions of a second.',
    coreGameplay: 'Polygons fly onto the screen and rotate at high velocity. Swipe a laser blade across their exact line of symmetry.',
    controls: 'Mouse drag / Touch swipe across screen.',
    objective: 'Slice shapes into two pieces with less than 3% surface area discrepancy.',
    uniqueMechanic: 'Precision Symmetry Ratio: The closer the two severed halves match in pixel area, the bigger the shockwave.',
    difficultyProgression: 'Shapes rotate faster, irregular non-convex polygons appear, decoy false shapes explode on slice.',
    scoringSystem: 'Symmetry percentage score (99.5% = Perfect) x reaction speed.',
    replayabilityFactor: 'Visceral slicing satisfaction with razor-sharp reaction testing.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Tests subconscious geometric pattern recognition under extreme time limits.',
    metrics: { originality: 9, simplicity: 9, funFactor: 9, replayability: 8, feasibility: 9, visualAppeal: 9, learningValue: 8, performance: 9 }
  },
  {
    id: 'd4',
    category: 'D',
    categoryName: 'Reaction Based',
    name: 'Color Strobe Runner',
    oneLiner: 'An infinite corridor runner where the floor and walls strobe color, and you must step only on matching hues.',
    coreGameplay: 'Run forward down a 3-lane chromatic track. Lanes cycle between Cyan, Magenta, and Yellow.',
    controls: 'Left/Right to switch lanes; Space to cycle your player core color.',
    objective: 'Sprint through color gates and hazards matching your core hue to phase through harmlessly.',
    uniqueMechanic: 'Opposite Phase Elimination: Matching color grants invulnerability and boost; opposite color instantly resets combo.',
    difficultyProgression: 'Strobe frequency accelerates, dual-color spliced gates require mid-lane color flips.',
    scoringSystem: 'Gate chains + maximum speed achieved + flawless color streak.',
    replayabilityFactor: 'Hypnotic audio-visual flow state with intense optical reaction demands.',
    devDifficulty: 'Low',
    differentiatingFactor: 'Double-input cognitive reaction: simultaneous lane navigation and color matching.',
    metrics: { originality: 7, simplicity: 9, funFactor: 8, replayability: 8, feasibility: 10, visualAppeal: 9, learningValue: 7, performance: 10 }
  },
  {
    id: 'd5',
    category: 'D',
    categoryName: 'Reaction Based',
    name: 'Quick-Draw Micro-Samurai',
    oneLiner: 'High-stakes micro-second reflex duels where the draw trigger is visual, audible, or tactile bait.',
    coreGameplay: 'Two duelists stand still in wind and rain. A sudden unpredictable signal occurs; click within 150ms to strike.',
    controls: 'Single click / Spacebar tap.',
    objective: 'Defeat 20 sequential rival duelists without striking early (false start = death).',
    uniqueMechanic: 'Sensory Feints: Opponents twitch, lightning flashes, wind howls; you must react only to the genuine visual blossom.',
    difficultyProgression: 'Opponent reaction windows drop from 300ms down to 140ms; feint frequency increases.',
    scoringSystem: 'Milliseconds recorded per duel (e.g., 142ms) summed across full gauntlet.',
    replayabilityFactor: 'Pure raw human neurological reaction benchmark with bragging rights.',
    devDifficulty: 'Low',
    differentiatingFactor: 'Extreme suspense atmosphere built around a single instantaneous reaction micro-event.',
    metrics: { originality: 7, simplicity: 10, funFactor: 8, replayability: 9, feasibility: 10, visualAppeal: 8, learningValue: 7, performance: 10 }
  },

  // CATEGORY E: Strategy Mini Games
  {
    id: 'e1',
    category: 'E',
    categoryName: 'Strategy Mini Games',
    name: 'Micro-Swarm Hegemony',
    oneLiner: 'Send percentage pulses of micro-drones between floating nodes to dominate an orbital network.',
    coreGameplay: 'Nodes generate drones continuously. Click a friendly node and drag to an enemy node to transfer 50% of your garrison.',
    controls: 'Mouse click/drag between nodes, or touch swipe.',
    objective: 'Capture all nodes on the tactical map before enemy factions out-produce you.',
    uniqueMechanic: 'Gravitational Transit: Drones traveling through central gravity lanes gain double speed but suffer 20% attrition.',
    difficultyProgression: 'Enemy AI switches from opportunistic to coordinated pincer strikes; neutral defense towers.',
    scoringSystem: 'Territory conquest speed + minimal drone casualties.',
    replayabilityFactor: 'Fast 90-second tactical skirmishes with limitless randomized node layouts.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Compresses real-time strategy down to pure positional macro-economic flow.',
    metrics: { originality: 7, simplicity: 9, funFactor: 9, replayability: 9, feasibility: 9, visualAppeal: 8, learningValue: 8, performance: 9 }
  },
  {
    id: 'e2',
    category: 'E',
    categoryName: 'Strategy Mini Games',
    name: 'Conveyor Crisis',
    oneLiner: 'Route radioactive packages across converging automated conveyor belts using one-way flippers.',
    coreGameplay: 'Boxes with hazard icons roll along fixed factory tracks. Click junctions to redirect packages to proper sorting bays.',
    controls: 'Click track junction toggles to switch rail switches.',
    objective: 'Sort 100 packages without letting contrasting chemical isotopes collide and trigger a factory meltdown.',
    uniqueMechanic: 'Speed Differential Cascades: Heavy crates move slowly, building dangerous traffic queues behind them.',
    difficultyProgression: 'Conveyor belts accelerate, mystery crates reveal contents only 2 seconds before sorting.',
    scoringSystem: 'Flawless sort chains + speed efficiency multiplier.',
    replayabilityFactor: 'Satisfying industrial logistics management with high tension.',
    devDifficulty: 'Low',
    differentiatingFactor: 'You control the rails, never the cargo.',
    metrics: { originality: 8, simplicity: 9, funFactor: 8, replayability: 8, feasibility: 10, visualAppeal: 8, learningValue: 8, performance: 10 }
  },
  {
    id: 'e3',
    category: 'E',
    categoryName: 'Strategy Mini Games',
    name: 'Babel Defense',
    oneLiner: 'Stack defensive turret bricks onto a precarious spire while shooting downward at ground invaders.',
    coreGameplay: 'Invaders march in from the edges. Build higher tower segments to extend firing range, but each layer threatens structural balance.',
    controls: 'Mouse click to place blocks; 1-4 for turret types (Gatling, Cryo, Mortar, Tesla).',
    objective: 'Survive 15 enemy waves without your tower toppling over from unbalanced weight or explosive recoil.',
    uniqueMechanic: 'Recoil Weight Instability: High-caliber cannons generate lateral recoil that can topple an asymmetric tower.',
    difficultyProgression: 'Flying enemies, siege rams, earthquake shockwaves.',
    scoringSystem: 'Enemies defeated x height of surviving tower x resource efficiency.',
    replayabilityFactor: 'Intersection of structural physics construction and tower defense economics.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Every weapon upgrade comes with structural and physical engineering trade-offs.',
    metrics: { originality: 9, simplicity: 8, funFactor: 9, replayability: 9, feasibility: 8, visualAppeal: 8, learningValue: 9, performance: 9 }
  },
  {
    id: 'e4',
    category: 'E',
    categoryName: 'Strategy Mini Games',
    name: 'Sub-Grid Hacker',
    oneLiner: 'Spend limited processing power to reroute security intrusion nodes in a turn-based cyber-matrix.',
    coreGameplay: 'Turn-based node exploration. You have 3 CPU cycles per turn to scan, corrupt, or bypass firewall ice.',
    controls: 'Mouse click to select node actions; Space to end turn.',
    objective: 'Infiltrate the central database node before counter-trace software isolates your gateway.',
    uniqueMechanic: 'Trace Memory: Every action leaves a cryptographic signature that speeds up the security trace by 5%.',
    difficultyProgression: 'Firewalls gain active counter-attack countermeasures, encrypted decoy data vaults.',
    scoringSystem: 'Data stolen (credits) minus trace alert level percentage.',
    replayabilityFactor: 'Roguelike procedural node graphs with distinct hacker utility loadouts.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Pure tactical decision density in bite-sized 2-minute strategic runs.',
    metrics: { originality: 8, simplicity: 8, funFactor: 8, replayability: 9, feasibility: 9, visualAppeal: 8, learningValue: 8, performance: 10 }
  },
  {
    id: 'e5',
    category: 'E',
    categoryName: 'Strategy Mini Games',
    name: 'Ecosystem Balance',
    oneLiner: 'Manage populations of Wolves, Rabbits, and Carrots in a living terrarium where your score is biodiversity harmony.',
    coreGameplay: 'Drop rain, seeds, or predators onto a grid. Maintaining an exact 10:3:1 ratio of flora to herbivores to carnivores.',
    controls: 'Click 1 (Plant Flora), 2 (Spawn Herbivore), 3 (Spawn Carnivore), 4 (Rain).',
    objective: 'Keep the simulated ecosystem thriving without causing extinction or catastrophic overpopulation for 300 cycles.',
    uniqueMechanic: 'Volterra-Lotka Harmony Score: You only earn points while all three species are within healthy demographic equilibrium.',
    difficultyProgression: 'Seasonal droughts, invasive species blights, harsh winter freezes.',
    scoringSystem: 'Consecutive harmonious cycles sustained.',
    replayabilityFactor: 'Deep emergent biological simulation with zen-like balancing tension.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Victory is defined by delicate balance, not total conquest or destruction.',
    metrics: { originality: 8, simplicity: 8, funFactor: 8, replayability: 9, feasibility: 9, visualAppeal: 8, learningValue: 10, performance: 9 }
  },

  // CATEGORY F: Experimental / Weird
  {
    id: 'f1',
    category: 'F',
    categoryName: 'Experimental / Weird',
    name: 'Rule-Shifter 404',
    oneLiner: 'Every 15 seconds, a random core rule of the arcade world flips without warning.',
    coreGameplay: 'Arcade top-down evasion. A slot-machine banner rolls at the top: e.g., "Left is Right", "Walls are Deadly", "Enemies give Points".',
    controls: 'WASD / Arrow keys; Space to trigger emergency polarity pulse.',
    objective: 'Survive in an arena where physics, scoring, and win conditions constantly mutate.',
    uniqueMechanic: 'Dynamic Law Mutation: Game engine swaps collision handlers and vector math at runtime.',
    difficultyProgression: 'Rules mutate every 10s, then every 7s, with 2 simultaneous rule mutations active in later rounds.',
    scoringSystem: 'Survival duration x active mutation risk multiplier.',
    replayabilityFactor: 'Wildly unpredictable outcomes; tests pure mental adaptability.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Subverts the fundamental contract of consistent game rules.',
    metrics: { originality: 10, simplicity: 8, funFactor: 9, replayability: 9, feasibility: 9, visualAppeal: 8, learningValue: 8, performance: 10 }
  },
  {
    id: 'f2',
    category: 'F',
    categoryName: 'Experimental / Weird',
    name: 'Negative Space Miner',
    oneLiner: 'You do not move your ship; you carve passages through solid black matter by projecting empty white light.',
    coreGameplay: 'The screen is solid matter. Move an eraser flashlight beam to dig passages so falling energy spheres can drain into your engine.',
    controls: 'Mouse cursor carves void paths; Scroll wheel expands or tightens the beam.',
    objective: 'Channel falling fluids and orbs safely into collection basins without puncturing magma reservoirs.',
    uniqueMechanic: 'Negative Space Construction: Digging too wide causes structural collapses of surrounding terrain.',
    difficultyProgression: 'Magma flows down carved channels; shifting tectonic plates crush open tunnels.',
    scoringSystem: 'Orbs delivered / Void area excavated (Efficiency ratio).',
    replayabilityFactor: 'Fluid physical sculpting sandbox meets arcade puzzle action.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Gameplay happens entirely through subtractive environment editing.',
    metrics: { originality: 9, simplicity: 8, funFactor: 8, replayability: 8, feasibility: 8, visualAppeal: 9, learningValue: 8, performance: 8 }
  },
  {
    id: 'f3',
    category: 'F',
    categoryName: 'Experimental / Weird',
    name: 'The Echo Chamber',
    oneLiner: 'A pitch-black maze where the only way to see walls is to emit sound chirps that also attract blind hunters.',
    coreGameplay: 'Navigate through a dark labyrinth. Pressing space emits a sonar ripple that briefly renders walls and obstacles in glowing wireframe.',
    controls: 'WASD to creep silently; Spacebar to pulse sonar echo.',
    objective: 'Locate 3 extraction cores and reach the bunker before echolocating stalkers track down your sound origin.',
    uniqueMechanic: 'Echolocation Dualism: The exact mechanic required to see is the exact mechanic that reveals you to predators.',
    difficultyProgression: 'Sound ripples travel farther and bounce off more surfaces; stalkers become faster and spawn in pairs.',
    scoringSystem: 'Extraction time + minimal sonar pulses emitted.',
    replayabilityFactor: 'Intense atmospheric stealth horror built with simple canvas vector lines.',
    devDifficulty: 'Low',
    differentiatingFactor: 'Vision is a consumable tactical risk rather than a continuous passive state.',
    metrics: { originality: 9, simplicity: 9, funFactor: 9, replayability: 9, feasibility: 10, visualAppeal: 9, learningValue: 8, performance: 10 }
  },
  {
    id: 'f4',
    category: 'F',
    categoryName: 'Experimental / Weird',
    name: 'Chronos Inverse',
    oneLiner: 'The game begins at the final Game Over screen, and you must play in reverse to reach the title menu unharmed.',
    coreGameplay: 'You start at high speed amidst a dense bullet storm. You must suck bullets back into enemy cannons and un-eat fruits.',
    controls: 'WASD / Arrow Keys for reverse trajectory matching.',
    objective: 'Reconstruct a flawless historical trajectory back to zero seconds.',
    uniqueMechanic: 'Reverse Causality: You must position yourself where bullets WILL have been fired so they retract into weapons.',
    difficultyProgression: 'The past was chaotic; earlier segments require unravelling intricate multi-boss attack patterns.',
    scoringSystem: 'Timeline fidelity score (how accurately you rewind the chaos).',
    replayabilityFactor: 'Mind-bending perceptual flip on arcade muscle memory.',
    devDifficulty: 'High',
    differentiatingFactor: 'Inverts the entire temporal flow of traditional arcade gameplay.',
    metrics: { originality: 10, simplicity: 7, funFactor: 8, replayability: 8, feasibility: 7, visualAppeal: 8, learningValue: 9, performance: 9 }
  },
  {
    id: 'f5',
    category: 'F',
    categoryName: 'Experimental / Weird',
    name: 'Cursor Prey',
    oneLiner: 'Your actual OS mouse cursor is trapped inside the canvas, hunted by swarming geometric parasites.',
    coreGameplay: 'The mouse cursor is transformed into a luminous target within the game window. Parasites track and attempt to latch onto the cursor.',
    controls: 'Mouse movement to dodge; Click to drop bait decoys.',
    objective: 'Protect your cursor for 120 seconds while leading parasites into electrical extermination grids.',
    uniqueMechanic: 'Meta-Cursor Interaction: Parasites apply drag physics to your cursor, making mouse movement feel heavy and sluggish.',
    difficultyProgression: 'Parasites split when electrocuted; cursor gravity wells pull cursor toward screen center.',
    scoringSystem: 'Survival seconds x close-dodge grazing score.',
    replayabilityFactor: 'Breaking the fourth wall of OS cursor ownership creates instant visceral panic.',
    devDifficulty: 'Low',
    differentiatingFactor: 'Targets the player physical hand-eye cursor interface directly.',
    metrics: { originality: 9, simplicity: 10, funFactor: 9, replayability: 9, feasibility: 10, visualAppeal: 8, learningValue: 8, performance: 10 }
  },

  // CATEGORY G: "Never Thought of It" Concepts
  {
    id: 'g1',
    category: 'G',
    categoryName: '"Never Thought of It"',
    name: 'Chrono Recoil: Echo Surge (Selected Flagship)',
    oneLiner: 'Classic arcade dodging where every 4 seconds your past path becomes an ethereal ghost that you must graze or sacrifice to destroy hazards.',
    coreGameplay: 'Maneuver an agile kinetic core collecting energy shards. An autonomous ghost vessel constantly mirrors your exact movement from 4 seconds ago. Shifting polarity alternates between grazing ghosts for score multipliers or detonating recoil blasts to shatter incoming asteroids.',
    controls: 'WASD / Arrow keys or Mouse follow to steer; Spacebar / Tap to shift Polarity and trigger Kinetic Recoil pulse.',
    objective: 'Climb 5 levels of escalating cosmic hazards while coordinating with your own past echoes.',
    uniqueMechanic: 'Time-Echo Resonance & Polarity Recoil: Your past trajectory is simultaneously your greatest score multiplier asset and a physical hazard shield.',
    difficultyProgression: 'L1: Single Echo -> L2: Central Gravitational Singularity -> L3: Laser Grid Sweepers -> L4: Dual Concurrent Echoes -> L5: Quantum Paradox Anomaly Waves.',
    scoringSystem: 'Shard pickups x Resonance Graze Multipliers x Kinetic Recoil Shatter combos.',
    replayabilityFactor: 'Deep flow state where you actively choreograph your current movements to serve as functional shields 4 seconds in the future.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Fuses classic Snake/Asteroids/Geometry Wars arcade purity with time-loop choreography.',
    metrics: { originality: 10, simplicity: 9, funFactor: 10, replayability: 10, feasibility: 9, visualAppeal: 9, learningValue: 9, performance: 10 }
  },
  {
    id: 'g2',
    category: 'G',
    categoryName: '"Never Thought of It"',
    name: 'Billiard Rogue: Ball is You',
    oneLiner: 'Turn-based pool table combat where you are the 8-ball and must bank-shot enemies into pockets before you get scratched.',
    coreGameplay: 'Drag an aiming cue to strike your own ball. Bounce off bumpers to gain attack damage, then ram into rogue enemy balls.',
    controls: 'Click and drag backward to aim and set cue power, release to strike.',
    objective: 'Clear the table of hostile rogue balls while remaining on the felt.',
    uniqueMechanic: 'Bumper Velocity Buff: Every cushion bank shot adds +1 Pierce and +20% damage to your collision impact.',
    difficultyProgression: 'Enemy balls acquire spiked armor, teleporting pockets, oil slicks that eliminate friction.',
    scoringSystem: 'Multi-ball combo sinks + complex trick shots (3+ rail bounces).',
    replayabilityFactor: 'Tactical physics geometry with roguelike item relics and ball upgrades.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Combines the cozy tactility of billiards with tense turn-based tactical combat.',
    metrics: { originality: 9, simplicity: 9, funFactor: 9, replayability: 9, feasibility: 9, visualAppeal: 8, learningValue: 8, performance: 10 }
  },
  {
    id: 'g3',
    category: 'G',
    categoryName: '"Never Thought of It"',
    name: 'Typing Breakout: Lexi-Cannon',
    oneLiner: 'Breakout where every brick is labelled with a word, and typing that word turns your ball into an instant lightning strike.',
    coreGameplay: 'Keep the paddle alive with arrow keys while typing words displayed on high-value bricks to instantly vaporize them.',
    controls: 'Left/Right arrows for paddle; Keyboard typing to target words; Enter to detonate typed target.',
    objective: 'Clear descending word matrices before bricks reach bottom baseline.',
    uniqueMechanic: 'Bimanual Cognitive Split: Left hand maneuvers paddle physically while eyes and right fingers type lexical targets.',
    difficultyProgression: 'Words grow longer; typing errors invert paddle movement for 1.5 seconds.',
    scoringSystem: 'Typing Words-Per-Minute (WPM) multiplied by ball rebound streak.',
    replayabilityFactor: 'Incredible brain workout bridging motor coordination and rapid lexical processing.',
    devDifficulty: 'Low',
    differentiatingFactor: 'Unites traditional twitch arcade paddle reaction with high-speed touch typing.',
    metrics: { originality: 9, simplicity: 8, funFactor: 9, replayability: 9, feasibility: 10, visualAppeal: 8, learningValue: 10, performance: 10 }
  },
  {
    id: 'g4',
    category: 'G',
    categoryName: '"Never Thought of It"',
    name: 'Gravity-Inverted Pong: Event Horizon',
    oneLiner: 'Pong played across the event horizon of a supermassive black hole where the ball curves into relativistic spirals.',
    coreGameplay: 'Two curved orbital paddles circle around a central black hole. Paddles orbit the perimeter to deflect the photon ball.',
    controls: 'A/D or Mouse movement to orbit paddle around circle; Space to activate magnetic repulsor.',
    objective: 'Deflect the ball past opponent arc without letting orbital decay suck the ball into the singularity.',
    uniqueMechanic: 'General Relativity Ball Optics: The ball experiences gravitational time dilation, slowing down near center and slingshotting at hyper-speed.',
    difficultyProgression: 'Singularity mass expands, hawking radiation flares eject unpredictable repulsive waves.',
    scoringSystem: 'Slingshot rebound velocity x survival volleys.',
    replayabilityFactor: 'Captivating circular orbital geometry with hypnotic gravitational trajectories.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Replaces linear rectangular Pong with circular polar coordinate relativistic mechanics.',
    metrics: { originality: 9, simplicity: 9, funFactor: 9, replayability: 8, feasibility: 9, visualAppeal: 10, learningValue: 9, performance: 9 }
  },
  {
    id: 'g5',
    category: 'G',
    categoryName: '"Never Thought of It"',
    name: 'Self-Harmonizing Pinball',
    oneLiner: 'A pinball table where every bumper you hit composes a musical chord progression that dictates table tilt gravity.',
    coreGameplay: 'Launch balls onto a musical pinball playfield. Bumpers are tuned to piano and synthesizer scale intervals.',
    controls: 'A / Left Arrow for Left Flipper; D / Right Arrow for Right Flipper; Space to Nudge.',
    objective: 'Complete harmonious musical scales (Major, Minor, Pentatonic) to unlock multi-ball jackpots.',
    uniqueMechanic: 'Acoustic Gravity: Playing consonant musical intervals stabilizes table tilt; dissonant strikes cause chaotic table tremors.',
    difficultyProgression: 'Faster drain channels, tempo accelerates, shifting musical keys with new chord targets.',
    scoringSystem: 'Musical consonance score + combo bumpers + multi-ball sustained runtime.',
    replayabilityFactor: 'Every pinball session generates an original generative ambient techno composition.',
    devDifficulty: 'Medium',
    differentiatingFactor: 'Music is not just background audio—it is the active physics driver of the playfield.',
    metrics: { originality: 10, simplicity: 8, funFactor: 9, replayability: 9, feasibility: 8, visualAppeal: 9, learningValue: 9, performance: 9 }
  }
];

export const NOVEL_MECHANICS: NovelMechanic[] = [
  {
    id: 'm1',
    name: 'Time Echo (Past Ghost Recording)',
    howItWorks: 'A circular buffer records player (x, y, vx, vy, state) coordinates at 60fps. After a fixed delay (e.g., 4000ms), an ethereal clone replays that exact path. Interacting with it yields high score bonuses or absorbs incoming projectiles.',
    whyInteresting: 'Forces the player to think not only about surviving current hazards, but proactively carving a safe or beneficial path for their future self.',
    implementationInJS: 'Store `{x, y, t, action}` in an array bounded to length = FPS * delay. Shift oldest items to render ghost canvas sprites.',
    difficulty: 'Low',
    replayabilityBenefit: 'Endless emergent choreography and self-cooperative mastery.'
  },
  {
    id: 'm2',
    name: 'Dynamic Polarity Recoil Wave',
    howItWorks: 'Toggling polarity (e.g. Cyan vs Amber) emits an omnidirectional kinetic shockwave that repels physical hazards while altering which environmental objects are beneficial or lethal.',
    whyInteresting: 'Combines offensive clearing with defensive vulnerability; switching polarity at the wrong moment could expose you to opposite hazards.',
    implementationInJS: 'On key press: toggle state variable and spawn a shockwave circle entity whose expanding radius checks circle-box collisions with velocity impulses.',
    difficulty: 'Low',
    replayabilityBenefit: 'High skill-ceiling timing window for clutch saves.'
  },
  {
    id: 'm3',
    name: 'Living Level Adaptive Director',
    howItWorks: 'The game tracks player metrics: graze frequency, combo length, near-misses, and damage events. If player is in flow state, spawn rate increases by 25%; if player takes damage, it briefly provides breathing room without cheap deaths.',
    whyInteresting: 'Maintains ideal flow state across both novice and expert arcade players without feeling patronizing or rubber-banded.',
    implementationInJS: 'Compute a running `flowIndex` (0.0 to 2.0) based on rolling 10-second performance data; scale hazard spawn intervals by `1 / flowIndex`.',
    difficulty: 'Medium',
    replayabilityBenefit: 'Ensures matches always feel tailor-made to current alertness and skill.'
  },
  {
    id: 'm4',
    name: 'Reverse Score Weight',
    howItWorks: 'Collecting score gems increases player ship mass and reduces thruster acceleration by 2% per gem. High scores make your ship heavy and clumsy.',
    whyInteresting: 'Creates an intense risk/reward dilemma: do you bank points for score records while sacrificing agility, or stay featherlight to survive longer?',
    implementationInJS: 'Player `mass = baseMass + (scoreGems * 0.05)`, and damping/acceleration `a = F / mass`.',
    difficulty: 'Low',
    replayabilityBenefit: 'Every run allows distinct strategies: speedrun survival vs maximum score encumbrance.'
  },
  {
    id: 'm5',
    name: 'Mistake Rule Mutation',
    howItWorks: 'Whenever the player takes damage or makes a designated blunder, the game permanently mutates one fundamental physics parameter (e.g., gravity switches direction, friction decreases by 30%, or enemy colors invert).',
    whyInteresting: 'Turns mistakes into new gameplay rules rather than simple health attrition.',
    implementationInJS: 'Maintain a ruleset object `{gravityX, gravityY, bounce, invertControls}`. On damage: randomly mutate one key within bounds.',
    difficulty: 'Medium',
    replayabilityBenefit: 'No two runs ever share the same physical conditions after a hit.'
  },
  {
    id: 'm6',
    name: 'Centrifugal Orbit Graze',
    howItWorks: 'Passing within a tight radius of an obstacle without touching it creates a gravitational tether, swinging the player in a high-speed arc while building a multiplier.',
    whyInteresting: 'Encourages risky near-miss playstyles over passive avoidance.',
    implementationInJS: 'Calculate Euclidean distance: if `dist < grazeRadius && dist > hitRadius`, apply centripetal acceleration vector and trigger audio chime.',
    difficulty: 'Medium',
    replayabilityBenefit: 'Transforms defensive dodging into aggressive offensive velocity building.'
  },
  {
    id: 'm7',
    name: 'Environment Memory Scarring',
    howItWorks: 'Where the player or enemies perish leaves a persistent spatial scar (crater, radiation zone, or frozen block) that remains in the arena across subsequent runs.',
    whyInteresting: 'Creates historical continuity and evolving level topography shaped by past player actions.',
    implementationInJS: 'Save an array of `{x, y, radius, type}` to `localStorage` and render them as static arena terrain on game reboot.',
    difficulty: 'Low',
    replayabilityBenefit: 'The arena feels lived-in and personalized over dozens of play sessions.'
  },
  {
    id: 'm8',
    name: 'One-Button Contextual Inversion',
    howItWorks: 'A single button performs tap-to-thrust when moving, hold-to-drift when turning, and double-tap to phase-shift through walls.',
    whyInteresting: 'Unlocks surprising mechanical depth from the simplest imaginable physical input.',
    implementationInJS: 'Measure time delta between `mousedown`/`keydown` events to differentiate tap, hold duration, and double-click timestamps.',
    difficulty: 'Low',
    replayabilityBenefit: 'Perfect for instantaneous mobile accessibility without sacrificing high skill ceiling.'
  },
  {
    id: 'm9',
    name: 'Negative Area Excavation',
    howItWorks: 'The player does not move through an empty world; they actively bore hollow pathways through solid matrix matter.',
    whyInteresting: 'Subverts typical arcade movement: space is not given, it is earned and sculpted.',
    implementationInJS: '2D grid bitmap or canvas destination-out composite mode erasing circles around player position.',
    difficulty: 'Medium',
    replayabilityBenefit: 'Players create their own custom arena geometry dynamically.'
  },
  {
    id: 'm10',
    name: 'Independent Shadow Mimic',
    howItWorks: 'A shadow duplicate copies player actions with a 180-degree rotational symmetry. If the shadow touches hazards, you take damage.',
    whyInteresting: 'Forces dual-spatial awareness; you must look at two opposite quadrants of the screen simultaneously.',
    implementationInJS: 'Render secondary entity at `(arenaWidth - player.x, arenaHeight - player.y)` applying inverted velocity vectors.',
    difficulty: 'Low',
    replayabilityBenefit: 'Radically rewires classic navigational intuition.'
  },
  {
    id: 'm11',
    name: 'Wavelength Prismatic Dispersion',
    howItWorks: 'A white kinetic entity passes through optical crystal fields, splitting into separate Red, Green, and Blue frequency entities that move at different speeds.',
    whyInteresting: 'One projectile turns into three tactical tools with varying physical momentum.',
    implementationInJS: 'On crystal collision: spawn 3 child particles with color flags and staggered velocity vectors `(vx * 1.2, vx * 1.0, vx * 0.8)`.',
    difficulty: 'Low',
    replayabilityBenefit: 'Spectacular visual fireworks paired with tactical split-shot management.'
  },
  {
    id: 'm12',
    name: 'Procedural Audio Reactivity',
    howItWorks: 'All sound effects are synthesized mathematically in real-time via Web Audio API oscillators; game object velocities and proximity directly modulate oscillator frequency and filter cutoffs.',
    whyInteresting: 'Provides tactile synesthetic feedback where gameplay directly sounds like what is physically happening on screen.',
    implementationInJS: '`audioCtx.createOscillator()` connected to `BiquadFilterNode` whose cutoff frequency is tied to `player.speed`.',
    difficulty: 'Medium',
    replayabilityBenefit: 'Audio is uniquely dynamic on every frame, eliminating stale repetitive sound loops.'
  },
  {
    id: 'm13',
    name: 'Spatial Reorientation Gravity Dial',
    howItWorks: 'The entire viewport rotates smoothly by 90 or 180 degrees based on milestone achievements or player commands, shifting the gravity vector.',
    whyInteresting: 'Disrupts muscle memory and turns familiar obstacles into completely new vertical drops.',
    implementationInJS: '`ctx.save()`, `ctx.translate(cx, cy)`, `ctx.rotate(angle)`, render game world, `ctx.restore()`. Gravity vector `[gx, gy] = [g * sin(a), g * cos(a)]`.',
    difficulty: 'Low',
    replayabilityBenefit: 'Adds instant disorientation thrills with clean mathematical rotation.'
  },
  {
    id: 'm14',
    name: 'Harmonic Deflection Resonance',
    howItWorks: 'Projectiles can only be parried within a strict 80ms window that matches the musical tempo of the background synthesized pulse.',
    whyInteresting: 'Merges rhythm game timing precision with bullet-hell spatial navigation.',
    implementationInJS: 'Calculate `timeSinceBeat = (currentTime % beatDuration)`; if `timeSinceBeat < window` trigger critical parry.',
    difficulty: 'Medium',
    replayabilityBenefit: 'Induces trance-like flow state where players anticipate hazards through rhythm.'
  },
  {
    id: 'm15',
    name: 'Volumetric Mass Assimilation',
    howItWorks: 'Destroying or absorbing smaller enemies adds to your physical size and collision hit-box while granting higher impact damage against larger foes.',
    whyInteresting: 'Bigger size gives more offensive power but makes dodging narrow laser grids much harder.',
    implementationInJS: '`player.radius = Math.min(maxRadius, baseRadius + Math.sqrt(absorbedCount))`. Update collision bounding circles.',
    difficulty: 'Low',
    replayabilityBenefit: 'Dynamic balance between offensive brawn and nimble evasive fragility.'
  },
  {
    id: 'm16',
    name: 'Bimanual Split Input',
    howItWorks: 'Left hand controls continuous physics movement (WASD/Joystick) while right hand performs discrete keyboard typing or targeted mouse clicks.',
    whyInteresting: 'Activates both hemispheres of the brain for intense coordination thrills.',
    implementationInJS: 'Combine simultaneous `keydown` listeners for navigation alongside text buffer comparison for target elimination.',
    difficulty: 'Low',
    replayabilityBenefit: 'Unique cognitive rush distinct from standard arcade games.'
  },
  {
    id: 'm17',
    name: 'Quantum Observer Effect',
    howItWorks: 'Hazards and platforms only commit to a fixed state (solid, empty, or lethal) when the player is directly looking at them (cursor proximity or headlight cone).',
    whyInteresting: 'Forces strategic observation: looking at an obstacle locks its threat, while glancing away lets it fluctuate.',
    implementationInJS: 'Calculate dot product of player facing vector and vector to object; state changes only when `dot > threshold`.',
    difficulty: 'Medium',
    replayabilityBenefit: 'A delightfully philosophical mechanic with tangible gameplay consequences.'
  },
  {
    id: 'm18',
    name: 'Sacrificial Part Shedding',
    howItWorks: 'The player vessel consists of 4 modular wings. Taking fatal damage does not kill you; it detaches a wing, permanently altering your flight aerodynamics.',
    whyInteresting: 'Provides visceral second chances while radically changing control feel as damage mounts.',
    implementationInJS: 'Track `activeWings` array. When wing is lost, apply asymmetric thrust torque to steering equations.',
    difficulty: 'Medium',
    replayabilityBenefit: 'LimDefault heroic comebacks piloting a damaged, spinning craft.'
  },
  {
    id: 'm19',
    name: 'Echolocating Flash Visibility',
    howItWorks: 'The arena is completely dark until the player triggers a sound or movement ping that sends illuminated wireframe shockwaves across walls.',
    whyInteresting: 'Information is scarce and must be actively pinged for, but pinging alerts listening hunters.',
    implementationInJS: 'Expanding ring geometry in canvas that calculates alpha decay: `alpha = 1 - (radius / maxRadius)`.',
    difficulty: 'Low',
    replayabilityBenefit: 'Suspenseful atmosphere and calculated information management.'
  },
  {
    id: 'm20',
    name: 'Temporal Rewind Ash Monuments',
    howItWorks: 'Rewinding time backs up your position, but leaves physical solid ash statues of where you were, which block lasers and act as platforms.',
    whyInteresting: 'Failure becomes an architectural tool: you deliberately walk into hazard lines to build shield statues.',
    implementationInJS: 'On rewind: spawn static physics entity at pre-rewind coordinate with a crumbling duration timer.',
    difficulty: 'Medium',
    replayabilityBenefit: 'Transforms timeline manipulation from a simple undo button into an active puzzle construction mechanic.'
  }
];

export const HYBRID_CONCEPTS: HybridConcept[] = [
  {
    id: 'h1',
    name: 'Chrono Recoil: Echo Surge',
    combinedMechanics: ['Time Echo (M1)', 'Dynamic Polarity Recoil Wave (M2)', 'Living Level Adaptive Director (M3)', 'Centrifugal Orbit Graze (M6)'],
    elevatorPitch: 'The pinnacle arcade flow: an agile kinetic core where your path from 4 seconds ago manifests as an autonomous echo vessel. Shift polarity to graze your ghost for huge score multipliers or unleash kinetic recoil shockwaves to shatter incoming cosmic hazards.',
    controls: 'WASD / Arrow Keys or Mouse Cursor; Space / Tap for Polarity Recoil Pulse.',
    gameplayLoop: 'Collect shards -> Position echo -> Graze near echo to build combo -> Pulse recoil to clear screen -> Progress through 5 escalating cosmic tiers.',
    whyItWorks: 'Simple single-screen arcade controls instantly understood in 5 seconds, but master-level players can plan choreography 4 seconds ahead for mind-boggling combo multipliers.'
  },
  {
    id: 'h2',
    name: 'Ouroboros Prism',
    combinedMechanics: ['Autonomous Tail Splitting (M10)', 'Wavelength Prismatic Dispersion (M11)', 'Centrifugal Orbit Graze (M6)'],
    elevatorPitch: 'Snake meets optical physics: eating chromatic prisms disperses your snake into Red, Green, and Blue sub-snakes that move at harmonic speeds. Recombining them at center prism creates thermonuclear screen clears.',
    controls: 'Arrow keys / WASD; Space to trigger magnetic recombination.',
    gameplayLoop: 'Navigate grid -> Absorb prism -> Control multi-spectrum split snakes -> Re-fuse colors for super-novas.',
    whyItWorks: 'Takes the most universal arcade game in history (Snake) and introduces breathtaking multi-entity optical choreography.'
  },
  {
    id: 'h3',
    name: 'Sonar Samurai',
    combinedMechanics: ['Echolocating Flash Visibility (M19)', 'One-Button Contextual Inversion (M8)', 'Harmonic Deflection Resonance (M14)'],
    elevatorPitch: 'Pitch-black duel arena where you only see your rival by timing audio pulses to heartbeats, then executing single-frame parry strikes.',
    controls: 'Single Mouse Click / Spacebar tap.',
    gameplayLoop: 'Listen to heartbeat -> Pulse sonar ripple -> Wait for visual glint -> Instant reflex slice.',
    whyItWorks: 'Distills extreme tension, minimalist aesthetics, and razor-sharp reaction time into a pure 1-button duel.'
  },
  {
    id: 'h4',
    name: 'Babel Recoil Spire',
    combinedMechanics: ['Sacrificial Part Shedding (M18)', 'Tetra-Weight Fulcrum Balance (M4)', 'Volumetric Mass Assimilation (M15)'],
    elevatorPitch: 'Build a precarious sky tower to blast alien swarms, where weapon recoil shakes the building and shedding damaged floors is the only way to avoid toppling.',
    controls: 'Mouse to place turret blocks; Space to jettison unstable floors.',
    gameplayLoop: 'Stack turrets -> Shoot descending waves -> Counter-balance recoil torque -> Shed burning floors in emergencies.',
    whyItWorks: 'Hilarious physical tension between wanting more firepower and maintaining physical structural equilibrium.'
  },
  {
    id: 'h5',
    name: 'Lexical Breakout Blitz',
    combinedMechanics: ['Bimanual Split Input (M16)', 'Dynamic Polarity Recoil Wave (M2)', 'Procedural Audio Reactivity (M12)'],
    elevatorPitch: 'Left hand steers an arcade paddle deflecting hypersonic balls; right hand types words shown on bricks to trigger targeted orbital laser bombardments.',
    controls: 'Left/Right arrows for paddle; Keyboard letters to type brick words; Enter to detonate.',
    gameplayLoop: 'Keep ball in play -> Scan descending brick vocabulary -> Rapid-fire type target words -> Clear high-density waves.',
    whyItWorks: 'Electrifying cognitive synchronization that exercises both motor reflexes and rapid linguistic recall.'
  },
  {
    id: 'h6',
    name: 'Event Horizon Gravity Slingshot',
    combinedMechanics: ['Centrifugal Orbit Graze (M6)', 'Reverse Score Weight (M4)', 'Harmonic Deflection Resonance (M14)'],
    elevatorPitch: 'A relativistic physics runner circling a black hole where collecting dark matter makes you heavier and pulls you closer to the event horizon, demanding tighter slingshot burns.',
    controls: 'Hold Space / Mouse button to engage gravitational tether; Release to slingshot.',
    gameplayLoop: 'Orbit black hole -> Skim event horizon for maximum multiplier -> Slingshot past radiation spikes -> Survive the pull.',
    whyItWorks: 'One simple control with profound emergent orbital physics and hair-raising proximity thrills.'
  },
  {
    id: 'h7',
    name: 'Chrono-Ash Labyrinth',
    combinedMechanics: ['Temporal Rewind Ash Monuments (M20)', 'Echolocating Flash Visibility (M19)', 'One-Button Contextual Inversion (M8)'],
    elevatorPitch: 'Puzzle dungeon where every deadly trap you step into leaves a permanent stone statue of your past corpse that redirects laser barriers and holds down floor pressure plates.',
    controls: 'Arrow keys / WASD to move; R to rewind.',
    gameplayLoop: 'Explore dungeon -> Deliberately sacrifice yourself on hazard lines -> Rewind -> Use past ash corpse as a bridge.',
    whyItWorks: 'Completely inverts failure: every death is a productive architectural step toward the solution.'
  },
  {
    id: 'h8',
    name: 'Negative Void Miner',
    combinedMechanics: ['Negative Area Excavation (M9)', 'Quantum Observer Effect (M17)', 'Living Level Adaptive Director (M3)'],
    elevatorPitch: 'Dig fluid flow channels through a solid dark canvas by erasing matter with a flashlight beam, guiding falling energy beads into power cores while containing magma leaks.',
    controls: 'Mouse drag to carve void; Right click to freeze time.',
    gameplayLoop: 'Carve channels -> Guide falling glowing fluids -> Reinforce leaking seams -> Deliver power.',
    whyItWorks: 'Deeply satisfying tactile sandbox fluid mechanics with arcade time pressure.'
  },
  {
    id: 'h9',
    name: 'Hex Symmetry Kaleidoscope',
    combinedMechanics: ['Independent Shadow Mimic (M10)', 'Spatial Reorientation Gravity Dial (M13)', 'Wavelength Prismatic Dispersion (M11)'],
    elevatorPitch: 'Navigate a three-way mirrored hexagonal crystal arena where one movement directs three mirrored sparks to activate tri-color glyphs simultaneously.',
    controls: 'Q, W, E, A, S, D for 6-axis movement; Space to rotate the kaleidoscope 60 degrees.',
    gameplayLoop: 'Analyze tri-symmetry -> Dislodge sparks against wall bumpers -> Align colors on glyphs.',
    whyItWorks: 'A mesmerizing visual spectacle of sacred geometry and crisp spatial puzzle satisfaction.'
  },
  {
    id: 'h10',
    name: 'Entropy Pac-Flail',
    combinedMechanics: ['Centrifugal Orbit Graze (M6)', 'Volumetric Mass Assimilation (M15)', 'Dynamic Polarity Recoil Wave (M2)'],
    elevatorPitch: 'Navigate a maze tethered by an elastic cable to a massive spiked anchor. Spin like a hurricane to pulverize chasing monsters with centrifugal momentum.',
    controls: 'WASD / Arrow Keys for player orb; Space for kinetic cable retract/release.',
    gameplayLoop: 'Weave through corridors -> Whip anchor around corners -> Smash pursuing demons -> Vacuum up debris to grow anchor mass.',
    whyItWorks: 'Combines the tense corridor claustrophobia of Pac-Man with the euphoric kinetic destruction of a physics wrecking ball.'
  }
];
