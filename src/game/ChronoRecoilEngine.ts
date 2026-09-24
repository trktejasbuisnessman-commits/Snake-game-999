/**
 * Chrono Recoil: Echo Surge — Core Game Engine
 * HTML5 Canvas 60FPS real-time arcade simulation with Time-Echoes and Polarity Physics.
 */

import { sound } from './audio';
import { SnakeColorConfig, loadSavedSnakeConfig, saveSnakeConfig } from '../data/snakeSpecies';

export type Polarity = 'CYAN' | 'AMBER';

export interface GameStats {
  score: number;
  highScore: number;
  level: number;
  multiplier: number;
  health: number;
  maxHealth: number;
  combo: number;
  grazes: number;
  shardsCollected: number;
  survivalTime: number;
  polarity: Polarity;
  recoilCooldown: number; // 0 to 1
  isGameOver: boolean;
  isPaused: boolean;
}

export type ShipSkin = 'snake' | 'apex' | 'neon' | 'blade' | 'prism';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

interface Shard {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  polarity: Polarity;
  value: number;
  pulseOffset: number;
}

interface Hazard {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  polarity: Polarity;
  rotation: number;
  vRot: number;
  sides: number;
  health: number;
  isHunter?: boolean;
}

interface LaserGrid {
  active: boolean;
  axis: 'H' | 'V';
  pos: number;
  speed: number;
  warningTime: number; // in seconds
  polarity: Polarity;
}

interface HistoryFrame {
  x: number;
  y: number;
  vx: number;
  vy: number;
  polarity: Polarity;
  timestamp: number;
}

export class ChronoRecoilEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number = 800;
  private height: number = 600;

  // Player state
  public player = {
    x: 400,
    y: 300,
    vx: 0,
    vy: 0,
    radius: 14,
    speed: 380, // pixels per sec
    friction: 0.88,
    polarity: 'CYAN' as Polarity,
    health: 100,
    maxHealth: 100,
    invincibleTimer: 0,
    recoilCooldown: 0,
    skin: 'snake' as ShipSkin,
  };

  // Snake biological color & anatomical state
  public snakeConfig: SnakeColorConfig = loadSavedSnakeConfig();
  private spine: Array<{ x: number; y: number; angle: number }> = [];
  private readonly spineSegmentCount: number = 13;
  private readonly segmentSpacing: number = 6.8;
  private playerHeading: number = 0;
  private tongueTimer: number = 0;

  // Time-Echo Recording Buffer
  private history: HistoryFrame[] = [];
  private echoDelaySeconds: number = 4.0;
  private echoTwoDelaySeconds: number = 7.5;

  // Game entities
  private particles: Particle[] = [];
  private shockwaves: Shockwave[] = [];
  private shards: Shard[] = [];
  private hazards: Hazard[] = [];
  private lasers: LaserGrid[] = [];

  // Progression & Score
  public score: number = 0;
  public highScore: number = 0;
  public level: number = 1;
  public multiplier: number = 1.0;
  public combo: number = 0;
  public grazes: number = 0;
  public shardsCollected: number = 0;
  public survivalTime: number = 0;
  public isGameOver: boolean = false;
  public isPaused: boolean = false;

  // Adaptive Difficulty metrics
  private consecutiveDodges: number = 0;
  private recentDamageTime: number = -10;
  private flowIndex: number = 1.0;

  // Timing & Animation
  private lastTime: number = 0;
  private animFrameId: number = 0;
  private screenShake: number = 0;
  private entityIdCounter: number = 0;
  private shardSpawnTimer: number = 0;
  private hazardSpawnTimer: number = 0;
  private laserSpawnTimer: number = 0;

  // Input states
  private keys: Record<string, boolean> = {
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
    ArrowUp: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowRight: false,
    Space: false,
  };
  private mousePos = { x: 400, y: 300, isDown: false, active: false };
  private touchMoveVector = { x: 0, y: 0, active: false };

  // Callbacks
  public onStateUpdate?: (stats: GameStats) => void;
  public onGameOver?: (stats: GameStats) => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2d context');
    this.ctx = context;

    this.loadHighScore();
    this.setupListeners();
    this.resize();
  }

  private loadHighScore() {
    try {
      const stored = localStorage.getItem('chrono_recoil_highscore');
      if (stored) {
        this.highScore = parseInt(stored, 10) || 0;
      }
    } catch {
      this.highScore = 0;
    }
  }

  private saveHighScore() {
    if (this.score > this.highScore) {
      this.highScore = Math.floor(this.score);
      try {
        localStorage.setItem('chrono_recoil_highscore', String(this.highScore));
      } catch {
        // Ignore storage errors
      }
    }
  }

  public setSkin(skin: ShipSkin) {
    this.player.skin = skin;
  }

  public setSnakeConfig(config: SnakeColorConfig) {
    this.snakeConfig = { ...config };
    saveSnakeConfig(config);
  }

  public getSnakeConfig(): SnakeColorConfig {
    return this.snakeConfig;
  }

  public resize() {
    const rect = this.canvas.parentElement?.getBoundingClientRect() || { width: 800, height: 600 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.width = rect.width;
    this.height = Math.max(rect.height, 460);

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
  }

  private setupListeners() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('resize', () => this.resize());
  }

  public destroy() {
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    sound.stopAmbience();
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
      e.preventDefault();
    }

    if (e.code === 'KeyP' || e.code === 'Escape') {
      this.togglePause();
      return;
    }

    if (e.code === 'Space') {
      if (!this.keys.Space) {
        this.triggerRecoilPulse();
      }
    }

    this.keys[e.code] = true;
    this.mousePos.active = false;
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    this.keys[e.code] = false;
  };

  // Mouse / Touch Controls
  public setMousePos(x: number, y: number) {
    const rect = this.canvas.getBoundingClientRect();
    this.mousePos.x = x - rect.left;
    this.mousePos.y = y - rect.top;
    this.mousePos.active = true;
  }

  public setTouchMove(xVal: number, yVal: number, active: boolean) {
    this.touchMoveVector.x = xVal;
    this.touchMoveVector.y = yVal;
    this.touchMoveVector.active = active;
    this.mousePos.active = false;
  }

  public triggerRecoilPulse() {
    if (this.isGameOver || this.isPaused) return;
    if (this.player.recoilCooldown > 0) return;

    // Shift Polarity
    this.player.polarity = this.player.polarity === 'CYAN' ? 'AMBER' : 'CYAN';
    this.player.recoilCooldown = 0.55; // 550ms cooldown
    sound.playPolaritySwitch();
    sound.playRecoil();

    // Trigger visual shockwave
    this.shockwaves.push({
      x: this.player.x,
      y: this.player.y,
      radius: 12,
      maxRadius: 150,
      alpha: 1.0,
      color: this.player.polarity === 'CYAN' ? '#06b6d4' : '#f59e0b',
    });

    // Screen Shake
    this.screenShake = Math.max(this.screenShake, 7);

    // Blast away or shatter hazards in proximity
    const blastRadius = 150;
    for (let i = this.hazards.length - 1; i >= 0; i--) {
      const h = this.hazards[i];
      const dx = h.x - this.player.x;
      const dy = h.y - this.player.y;
      const dist = Math.hypot(dx, dy);

      if (dist < blastRadius) {
        const force = (1 - dist / blastRadius) * 450;
        const angle = Math.atan2(dy, dx);
        h.vx += Math.cos(angle) * force;
        h.vy += Math.sin(angle) * force;

        // If opposite polarity, shatter immediately
        if (h.polarity !== this.player.polarity) {
          this.shatterHazard(i, true);
        }
      }
    }
  }

  public start() {
    this.reset();
    this.lastTime = performance.now();
    sound.startAmbience();
    this.loop(this.lastTime);
  }

  public reset() {
    this.player.x = this.width / 2;
    this.player.y = this.height / 2;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.health = 100;
    this.player.polarity = 'CYAN';
    this.player.invincibleTimer = 1.0;
    this.player.recoilCooldown = 0;
    this.playerHeading = 0;
    this.tongueTimer = 0;

    this.spine = [];
    for (let i = 0; i < this.spineSegmentCount; i++) {
      this.spine.push({
        x: this.player.x - (i + 1) * this.segmentSpacing,
        y: this.player.y,
        angle: 0,
      });
    }

    this.history = [];
    this.particles = [];
    this.shockwaves = [];
    this.shards = [];
    this.hazards = [];
    this.lasers = [];

    this.score = 0;
    this.level = 1;
    this.multiplier = 1.0;
    this.combo = 0;
    this.grazes = 0;
    this.shardsCollected = 0;
    this.survivalTime = 0;
    this.isGameOver = false;
    this.isPaused = false;
    this.flowIndex = 1.0;
    this.consecutiveDodges = 0;

    // Seed initial shards
    for (let i = 0; i < 5; i++) {
      this.spawnShard();
    }
  }

  public togglePause() {
    if (this.isGameOver) return;
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      sound.stopAmbience();
    } else {
      sound.startAmbience();
      this.lastTime = performance.now();
    }
    this.emitState();
  }

  private loop = (currentTime: number) => {
    this.animFrameId = requestAnimationFrame(this.loop);

    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    if (!this.isPaused && !this.isGameOver) {
      this.update(dt);
    }

    this.render();
  };

  private update(dt: number) {
    this.survivalTime += dt;

    // Update timers
    if (this.player.invincibleTimer > 0) this.player.invincibleTimer -= dt;
    if (this.player.recoilCooldown > 0) this.player.recoilCooldown -= dt;

    // Player Movement
    let ax = 0;
    let ay = 0;

    if (this.touchMoveVector.active) {
      ax = this.touchMoveVector.x;
      ay = this.touchMoveVector.y;
    } else if (this.mousePos.active) {
      const dx = this.mousePos.x - this.player.x;
      const dy = this.mousePos.y - this.player.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 10) {
        ax = dx / dist;
        ay = dy / dist;
      }
    } else {
      if (this.keys.KeyW || this.keys.ArrowUp) ay -= 1;
      if (this.keys.KeyS || this.keys.ArrowDown) ay += 1;
      if (this.keys.KeyA || this.keys.ArrowLeft) ax -= 1;
      if (this.keys.KeyD || this.keys.ArrowRight) ax += 1;

      const len = Math.hypot(ax, ay);
      if (len > 0) {
        ax /= len;
        ay /= len;
      }
    }

    // Apply acceleration
    this.player.vx += ax * this.player.speed * dt * 4.5;
    this.player.vy += ay * this.player.speed * dt * 4.5;

    // Level 2+ Central Singularity Gravitational Pull
    if (this.level >= 2) {
      const cx = this.width / 2;
      const cy = this.height / 2;
      const dx = cx - this.player.x;
      const dy = cy - this.player.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 30 && dist < 320) {
        const pull = (180 / dist) * dt * (this.level * 8);
        this.player.vx += (dx / dist) * pull;
        this.player.vy += (dy / dist) * pull;
      }
    }

    // Apply friction and move
    this.player.vx *= Math.pow(this.player.friction, dt * 60);
    this.player.vy *= Math.pow(this.player.friction, dt * 60);

    this.player.x += this.player.vx * dt;
    this.player.y += this.player.vy * dt;

    // Screen bounds bounce/clamp
    const r = this.player.radius;
    if (this.player.x < r) {
      this.player.x = r;
      this.player.vx *= -0.5;
    }
    if (this.player.x > this.width - r) {
      this.player.x = this.width - r;
      this.player.vx *= -0.5;
    }
    if (this.player.y < r) {
      this.player.y = r;
      this.player.vy *= -0.5;
    }
    if (this.player.y > this.height - r) {
      this.player.y = this.height - r;
      this.player.vy *= -0.5;
    }

    // Snake Heading, Tongue Flick, and Spine Undulation
    const speed = Math.hypot(this.player.vx, this.player.vy);
    if (speed > 10) {
      const targetHeading = Math.atan2(this.player.vy, this.player.vx);
      let diff = targetHeading - this.playerHeading;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.playerHeading += diff * Math.min(1, dt * 15);
    }

    this.tongueTimer += dt;
    if (this.tongueTimer > 2.8) {
      this.tongueTimer = 0;
    }

    this.updateSpine(dt, speed);

    // Record position into time-echo circular buffer
    this.history.push({
      x: this.player.x,
      y: this.player.y,
      vx: this.player.vx,
      vy: this.player.vy,
      polarity: this.player.polarity,
      timestamp: this.survivalTime,
    });

    // Prune history older than 10 seconds
    while (this.history.length > 0 && this.survivalTime - this.history[0].timestamp > 10.0) {
      this.history.shift();
    }

    // Spawn player engine trail particles
    if (Math.hypot(this.player.vx, this.player.vy) > 30) {
      this.particles.push({
        x: this.player.x + (Math.random() - 0.5) * 6,
        y: this.player.y + (Math.random() - 0.5) * 6,
        vx: -this.player.vx * 0.15 + (Math.random() - 0.5) * 20,
        vy: -this.player.vy * 0.15 + (Math.random() - 0.5) * 20,
        radius: Math.random() * 2.5 + 1.2,
        color: this.player.polarity === 'CYAN' ? '#06b6d4' : '#f59e0b',
        alpha: 0.65,
        decay: 3.2,
      });
    }

    // Handle Time-Echo Interactions (Graze and Resonance)
    this.updateEchoes(dt);

    // Spawners with adaptive rate
    this.updateSpawners(dt);

    // Update Shards
    this.updateShards(dt);

    // Update Hazards
    this.updateHazards(dt);

    // Update Laser Grids (Level 3+)
    this.updateLasers(dt);

    // Update Shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += dt * 380;
      sw.alpha -= dt * 2.2;
      if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
        this.shockwaves.splice(i, 1);
      }
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha -= p.decay * dt;
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Screen Shake decay
    if (this.screenShake > 0) {
      this.screenShake = Math.max(0, this.screenShake - dt * 20);
    }

    // Multiplier passive decay
    if (this.multiplier > 1.0) {
      this.multiplier = Math.max(1.0, this.multiplier - dt * 0.05);
    }

    // Check Level Progression
    this.checkProgression();

    // Emit stats to React HUD
    this.emitState();
  }

  private updateEchoes(dt: number) {
    const echoes = this.getActiveEchoes();
    for (const echo of echoes) {
      const dx = echo.x - this.player.x;
      const dy = echo.y - this.player.y;
      const dist = Math.hypot(dx, dy);

      // Graze check (< 45px distance)
      if (dist < 45 && dist > this.player.radius + 6) {
        // Grazing same polarity generates temporal resonance!
        if (echo.polarity === this.player.polarity) {
          this.grazes += 1;
          this.multiplier = Math.min(10.0, this.multiplier + dt * 0.4);
          this.score += 40 * this.multiplier * dt;
          sound.playGraze();

          // Particle beam between player and echo
          if (Math.random() < 0.35) {
            this.particles.push({
              x: this.player.x + (echo.x - this.player.x) * Math.random(),
              y: this.player.y + (echo.y - this.player.y) * Math.random(),
              vx: (Math.random() - 0.5) * 40,
              vy: (Math.random() - 0.5) * 40,
              radius: 1.5,
              color: '#38bdf8',
              alpha: 0.9,
              decay: 4.0,
            });
          }
        }
      }
    }
  }

  private updateSpine(dt: number, speed: number) {
    if (this.spine.length === 0) {
      for (let i = 0; i < this.spineSegmentCount; i++) {
        this.spine.push({
          x: this.player.x - Math.cos(this.playerHeading) * (i + 1) * this.segmentSpacing,
          y: this.player.y - Math.sin(this.playerHeading) * (i + 1) * this.segmentSpacing,
          angle: this.playerHeading,
        });
      }
    }

    // Lead anchor positioned at rear of head (neck junction)
    const neckDist = 11;
    const leadX = this.player.x - Math.cos(this.playerHeading) * neckDist;
    const leadY = this.player.y - Math.sin(this.playerHeading) * neckDist;

    let prevX = leadX;
    let prevY = leadY;
    let prevAngle = this.playerHeading;

    const slitherFreq = 11;
    const slitherAmplitude = Math.min(1.0, speed / 60) * 2.6;

    for (let i = 0; i < this.spine.length; i++) {
      const seg = this.spine[i];
      // Lateral wave oscillation mimicking natural serpent slithering
      const wave = Math.sin(this.survivalTime * slitherFreq - i * 0.48) * slitherAmplitude;
      const normalX = -Math.sin(prevAngle) * wave * dt * 25;
      const normalY = Math.cos(prevAngle) * wave * dt * 25;

      const dx = prevX - seg.x;
      const dy = prevY - seg.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0.001) {
        seg.angle = Math.atan2(dy, dx);
        seg.x = prevX - Math.cos(seg.angle) * this.segmentSpacing + normalX;
        seg.y = prevY - Math.sin(seg.angle) * this.segmentSpacing + normalY;
      }

      prevX = seg.x;
      prevY = seg.y;
      prevAngle = seg.angle;
    }
  }

  public getActiveEchoes(): Array<{ x: number; y: number; vx: number; vy: number; polarity: Polarity }> {
    const echoes: Array<{ x: number; y: number; vx: number; vy: number; polarity: Polarity }> = [];
    if (this.history.length === 0) return echoes;

    const findFrame = (delaySec: number) => {
      const targetTime = this.survivalTime - delaySec;
      if (targetTime < 0) return null;
      let closest = this.history[0];
      let minDiff = Math.abs(closest.timestamp - targetTime);
      for (let i = 1; i < this.history.length; i++) {
        const diff = Math.abs(this.history[i].timestamp - targetTime);
        if (diff < minDiff) {
          minDiff = diff;
          closest = this.history[i];
        }
      }
      return minDiff < 0.25 ? closest : null;
    };

    // Primary Echo (4s)
    const e1 = findFrame(this.echoDelaySeconds);
    if (e1) echoes.push(e1);

    // Secondary Echo (Level 4+ only, 7.5s)
    if (this.level >= 4) {
      const e2 = findFrame(this.echoTwoDelaySeconds);
      if (e2) echoes.push(e2);
    }

    return echoes;
  }

  private updateSpawners(dt: number) {
    // Adaptive Director: adjusts spawn frequency
    const isDoingGreat = this.combo > 8 && this.survivalTime - this.recentDamageTime > 15;
    this.flowIndex = isDoingGreat ? 1.25 : 1.0;

    // Shard Spawner
    this.shardSpawnTimer += dt;
    if (this.shardSpawnTimer >= 2.2 / this.flowIndex && this.shards.length < 8) {
      this.shardSpawnTimer = 0;
      this.spawnShard();
    }

    // Hazard Spawner
    this.hazardSpawnTimer += dt;
    const hazardThreshold = Math.max(1.1, (3.2 - this.level * 0.35) / this.flowIndex);
    const maxHazards = 4 + this.level * 2;
    if (this.hazardSpawnTimer >= hazardThreshold && this.hazards.length < maxHazards) {
      this.hazardSpawnTimer = 0;
      this.spawnHazard();
    }

    // Laser Grid Spawner (Level 3+)
    if (this.level >= 3) {
      this.laserSpawnTimer += dt;
      if (this.laserSpawnTimer >= 7.5 && this.lasers.length === 0) {
        this.laserSpawnTimer = 0;
        this.spawnLaser();
      }
    }
  }

  private spawnShard() {
    const margin = 50;
    this.shards.push({
      id: ++this.entityIdCounter,
      x: margin + Math.random() * (this.width - margin * 2),
      y: margin + Math.random() * (this.height - margin * 2),
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 0.5) * 20,
      radius: 9,
      polarity: Math.random() > 0.5 ? 'CYAN' : 'AMBER',
      value: 100,
      pulseOffset: Math.random() * Math.PI * 2,
    });
  }

  private spawnHazard() {
    const isHunter = this.level >= 4 && Math.random() < 0.35;
    const side = Math.floor(Math.random() * 4); // 0=Top, 1=Right, 2=Bottom, 3=Left
    let x = 0;
    let y = 0;
    const margin = 30;

    if (side === 0) {
      x = Math.random() * this.width;
      y = -margin;
    } else if (side === 1) {
      x = this.width + margin;
      y = Math.random() * this.height;
    } else if (side === 2) {
      x = Math.random() * this.width;
      y = this.height + margin;
    } else {
      x = -margin;
      y = Math.random() * this.height;
    }

    const angle = Math.atan2(this.player.y - y, this.player.x - x) + (Math.random() - 0.5) * 0.8;
    const speed = 70 + Math.random() * 60 + this.level * 15;

    this.hazards.push({
      id: ++this.entityIdCounter,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 10 + 14,
      polarity: Math.random() > 0.5 ? 'CYAN' : 'AMBER',
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 3,
      sides: Math.floor(Math.random() * 3) + 4, // 4 to 6 sided polygon
      health: 1,
      isHunter,
    });
  }

  private spawnLaser() {
    const axis: 'H' | 'V' = Math.random() > 0.5 ? 'H' : 'V';
    this.lasers.push({
      active: true,
      axis,
      pos: axis === 'H' ? 0 : 0,
      speed: 120 + this.level * 20,
      warningTime: 1.5,
      polarity: Math.random() > 0.5 ? 'CYAN' : 'AMBER',
    });
  }

  private updateShards(dt: number) {
    for (let i = this.shards.length - 1; i >= 0; i--) {
      const s = this.shards[i];
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      // Magnetic attraction to player when close (< 110px)
      const dx = this.player.x - s.x;
      const dy = this.player.y - s.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 110) {
        const pull = (160 / Math.max(dist, 20)) * dt * 250;
        s.vx += (dx / dist) * pull;
        s.vy += (dy / dist) * pull;
      }

      // Check pickup
      if (dist < this.player.radius + s.radius) {
        this.collectShard(i);
      }
    }
  }

  private collectShard(index: number) {
    const s = this.shards[index];
    this.shards.splice(index, 1);
    this.shardsCollected += 1;
    this.combo += 1;

    // Polarity match bonus: 2x points if matching player's current polarity
    const match = s.polarity === this.player.polarity;
    const bonus = match ? 2.0 : 1.0;
    this.multiplier = Math.min(10.0, this.multiplier + (match ? 0.25 : 0.1));

    const earned = Math.round(s.value * bonus * this.multiplier);
    this.score += earned;

    sound.playCollect(this.combo);

    // Particle burst
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 120 + 40;
      this.particles.push({
        x: s.x,
        y: s.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2.5 + 1.2,
        color: s.polarity === 'CYAN' ? '#38bdf8' : '#fbbf24',
        alpha: 0.9,
        decay: 2.8,
      });
    }
  }

  private updateHazards(dt: number) {
    for (let i = this.hazards.length - 1; i >= 0; i--) {
      const h = this.hazards[i];

      // Hunter logic: tracks player or echo
      if (h.isHunter) {
        const targetX = this.player.x;
        const targetY = this.player.y;
        const hdx = targetX - h.x;
        const hdy = targetY - h.y;
        const hdist = Math.hypot(hdx, hdy);
        if (hdist > 20) {
          h.vx += (hdx / hdist) * 90 * dt;
          h.vy += (hdy / hdist) * 90 * dt;
        }
      }

      h.x += h.vx * dt;
      h.y += h.vy * dt;
      h.rotation += h.vRot * dt;

      // Bounce off boundaries with damping
      const hr = h.radius;
      if (h.x < hr || h.x > this.width - hr) {
        h.vx *= -0.9;
        h.x = Math.max(hr, Math.min(this.width - hr, h.x));
      }
      if (h.y < hr || h.y > this.height - hr) {
        h.vy *= -0.9;
        h.y = Math.max(hr, Math.min(this.height - hr, h.y));
      }

      // Check collision with Player
      const dx = this.player.x - h.x;
      const dy = this.player.y - h.y;
      const dist = Math.hypot(dx, dy);

      if (dist < this.player.radius + h.radius) {
        this.takeDamage(25);
        this.shatterHazard(i, false);
      }
    }
  }

  private shatterHazard(index: number, awardedScore: boolean = true) {
    const h = this.hazards[index];
    this.hazards.splice(index, 1);

    sound.playExplosion();
    this.screenShake = Math.max(this.screenShake, 8);

    if (awardedScore) {
      this.score += Math.round(250 * this.multiplier);
      this.multiplier = Math.min(10.0, this.multiplier + 0.3);
    }

    // Spawn shatter shrapnel particles
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 180 + 60;
      this.particles.push({
        x: h.x,
        y: h.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3.5 + 1.5,
        color: h.polarity === 'CYAN' ? '#06b6d4' : '#f59e0b',
        alpha: 1.0,
        decay: 2.2,
      });
    }
  }

  private updateLasers(dt: number) {
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const l = this.lasers[i];
      if (l.warningTime > 0) {
        l.warningTime -= dt;
        continue;
      }

      l.pos += l.speed * dt;
      const maxDim = l.axis === 'H' ? this.height : this.width;

      // Check player laser collision
      const playerPos = l.axis === 'H' ? this.player.y : this.player.x;
      if (Math.abs(playerPos - l.pos) < 18) {
        // Can phase through if player matches laser polarity
        if (this.player.polarity !== l.polarity && this.player.invincibleTimer <= 0) {
          this.takeDamage(35);
        }
      }

      if (l.pos > maxDim) {
        this.lasers.splice(i, 1);
      }
    }
  }

  private takeDamage(amount: number) {
    if (this.player.invincibleTimer > 0 || this.isGameOver) return;

    this.player.health -= amount;
    this.player.invincibleTimer = 1.2;
    this.combo = 0;
    this.multiplier = 1.0;
    this.recentDamageTime = this.survivalTime;
    this.screenShake = 16;
    sound.playHit();

    if (this.player.health <= 0) {
      this.player.health = 0;
      this.gameOver();
    }
  }

  private gameOver() {
    this.isGameOver = true;
    this.saveHighScore();
    sound.stopAmbience();
    sound.playGameOver();

    if (this.onGameOver) {
      this.onGameOver(this.getStats());
    }
  }

  private checkProgression() {
    const thresholds = [0, 1000, 3000, 6000, 10000];
    const prevLevel = this.level;

    if (this.score >= thresholds[4] && this.level < 5) this.level = 5;
    else if (this.score >= thresholds[3] && this.level < 4) this.level = 4;
    else if (this.score >= thresholds[2] && this.level < 3) this.level = 3;
    else if (this.score >= thresholds[1] && this.level < 2) this.level = 2;

    if (this.level > prevLevel) {
      sound.playLevelUp();
      this.shockwaves.push({
        x: this.player.x,
        y: this.player.y,
        radius: 10,
        maxRadius: 300,
        alpha: 1.0,
        color: '#ffffff',
      });
    }
  }

  public getStats(): GameStats {
    return {
      score: Math.floor(this.score),
      highScore: this.highScore,
      level: this.level,
      multiplier: Number(this.multiplier.toFixed(1)),
      health: Math.max(0, Math.floor(this.player.health)),
      maxHealth: this.player.maxHealth,
      combo: this.combo,
      grazes: this.grazes,
      shardsCollected: this.shardsCollected,
      survivalTime: Math.floor(this.survivalTime),
      polarity: this.player.polarity,
      recoilCooldown: Math.max(0, this.player.recoilCooldown / 0.55),
      isGameOver: this.isGameOver,
      isPaused: this.isPaused,
    };
  }

  private emitState() {
    if (this.onStateUpdate) {
      this.onStateUpdate(this.getStats());
    }
  }

  // RENDERING
  private render() {
    this.ctx.save();

    // Screen Shake transform
    if (this.screenShake > 0) {
      const shakeX = (Math.random() - 0.5) * this.screenShake;
      const shakeY = (Math.random() - 0.5) * this.screenShake;
      this.ctx.translate(shakeX, shakeY);
    }

    // Background Canvas
    this.ctx.fillStyle = '#090d16';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Subtle arena grid
    this.renderGrid();

    // Central Singularity (Level 2+)
    if (this.level >= 2) {
      this.renderSingularity();
    }

    // Time-Echo Historical Trajectory Ribbon
    this.renderEchoRibbon();

    // Render Laser Grids
    this.renderLasers();

    // Shockwaves
    for (const sw of this.shockwaves) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = sw.color;
      this.ctx.globalAlpha = sw.alpha;
      this.ctx.lineWidth = 3.5;
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Render Shards
    this.renderShards();

    // Render Hazards
    this.renderHazards();

    // Render Time-Echo Ghost Vessels
    this.renderEchoVessels();

    // Render Player Vessel
    this.renderPlayer();

    // Render Particles
    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fill();
      this.ctx.restore();
    }

    this.ctx.restore();
  }

  private renderGrid() {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    this.ctx.lineWidth = 1;
    const gridSize = 40;

    for (let x = 0; x < this.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    for (let y = 0; y < this.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  private renderSingularity() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const pulse = Math.sin(this.survivalTime * 3) * 4;

    this.ctx.save();
    const grad = this.ctx.createRadialGradient(cx, cy, 5, cx, cy, 70 + pulse);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
    grad.addColorStop(0.5, 'rgba(124, 58, 237, 0.15)');
    grad.addColorStop(1, 'rgba(124, 58, 237, 0)');

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 70 + pulse, 0, Math.PI * 2);
    this.ctx.fill();

    // Event Horizon ring
    this.ctx.strokeStyle = 'rgba(167, 139, 250, 0.4)';
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([4, 6]);
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 32 + pulse * 0.5, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();
  }

  private renderEchoRibbon() {
    if (this.history.length < 2) return;

    this.ctx.save();
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([2, 4]);

    for (let i = 1; i < this.history.length; i += 2) {
      const p1 = this.history[i - 1];
      const p2 = this.history[i];
      const age = this.survivalTime - p2.timestamp;
      const alpha = Math.max(0, 0.25 - (age / 10) * 0.25);

      this.ctx.strokeStyle = p2.polarity === 'CYAN' ? `rgba(6, 182, 212, ${alpha})` : `rgba(245, 158, 11, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  private renderEchoVessels() {
    const echoes = this.getActiveEchoes();
    for (const echo of echoes) {
      this.ctx.save();
      this.ctx.translate(echo.x, echo.y);

      const angle = Math.atan2(echo.vy, echo.vx) || 0;
      this.ctx.rotate(angle);

      // Resonance aura
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 32, 0, Math.PI * 2);
      this.ctx.strokeStyle = echo.polarity === 'CYAN' ? 'rgba(6, 182, 212, 0.25)' : 'rgba(245, 158, 11, 0.25)';
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([3, 5]);
      this.ctx.stroke();

      const color = echo.polarity === 'CYAN' ? '#38bdf8' : '#fbbf24';
      const glow = echo.polarity === 'CYAN' ? 'rgba(6, 182, 212, 0.35)' : 'rgba(245, 158, 11, 0.35)';

      // Trailing ghost spine segments
      for (let s = 1; s <= 5; s++) {
        const segRad = 7.5 * (1 - s * 0.16);
        this.ctx.fillStyle = glow;
        this.ctx.beginPath();
        this.ctx.ellipse(-s * 6.5, 0, segRad * 1.1, segRad * 0.8, 0, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Ethereal Arrow-Shaped Viper Head (Ghost)
      this.ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 1.8;

      this.ctx.beginPath();
      this.ctx.moveTo(17, 0);
      this.ctx.quadraticCurveTo(12, -5, 7, -8);
      this.ctx.quadraticCurveTo(-1, -12, -4, -12);
      this.ctx.quadraticCurveTo(-11, -11, -13, -6);
      this.ctx.quadraticCurveTo(-15, -3, -15, 0);
      this.ctx.quadraticCurveTo(-15, 3, -13, 6);
      this.ctx.quadraticCurveTo(-11, 11, -4, 12);
      this.ctx.quadraticCurveTo(-1, 12, 7, 8);
      this.ctx.quadraticCurveTo(12, 5, 17, 0);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      // Ghost Slit Eyes
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.ellipse(5, -6, 2.2, 1.1, -0.15, 0, Math.PI * 2);
      this.ctx.ellipse(5, 6, 2.2, 1.1, 0.15, 0, Math.PI * 2);
      this.ctx.fill();

      // Ghost Core
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fill();

      this.ctx.restore();
    }
  }

  private renderPlayer() {
    // If user explicitly switched to a geometric vessel, render that chassis
    if (this.player.skin !== 'snake') {
      this.renderGeometricChassis();
      return;
    }

    const isFlashing = this.player.invincibleTimer > 0 && Math.floor(performance.now() / 80) % 2 === 0;

    // 1. Render Serpentine Trailing Body Segments (from tail tip to neck)
    for (let i = this.spine.length - 1; i >= 0; i--) {
      const seg = this.spine[i];
      const t = i / this.spine.length; // 0 at neck, 1 at tail tip
      const segRadius = 10.5 * (1 - t * 0.65) + 2.5; // Smooth taper: 10.5px down to 3.5px

      this.ctx.save();
      this.ctx.translate(seg.x, seg.y);
      this.ctx.rotate(seg.angle);

      if (isFlashing) {
        this.ctx.globalAlpha = 0.45;
      }

      // Dorsal scale volume gradient
      const grad = this.ctx.createLinearGradient(0, -segRadius, 0, segRadius);
      grad.addColorStop(0, this.snakeConfig.secondaryScale);
      grad.addColorStop(0.3, this.snakeConfig.primaryScale);
      grad.addColorStop(0.7, this.snakeConfig.secondaryScale);
      grad.addColorStop(1, this.snakeConfig.bellyColor);

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, segRadius * 1.15, segRadius, 0, 0, Math.PI * 2);
      this.ctx.fill();

      // Ventral underbelly plates (scutes)
      this.ctx.fillStyle = this.snakeConfig.bellyColor;
      this.ctx.beginPath();
      this.ctx.ellipse(0, segRadius * 0.5, segRadius * 0.65, segRadius * 0.35, 0, 0, Math.PI * 2);
      this.ctx.fill();

      // Authentic biological markings per pattern type
      if (this.snakeConfig.patternType === 'diamonds') {
        // Mojave / Diamondback rattlesnake diamond dorsal saddles
        if (i % 2 === 0) {
          this.ctx.fillStyle = this.snakeConfig.patternHighlight;
          this.ctx.beginPath();
          this.ctx.moveTo(0, -segRadius * 0.85);
          this.ctx.lineTo(segRadius * 0.7, 0);
          this.ctx.lineTo(0, segRadius * 0.35);
          this.ctx.lineTo(-segRadius * 0.7, 0);
          this.ctx.closePath();
          this.ctx.fill();

          this.ctx.fillStyle = this.snakeConfig.patternColor;
          this.ctx.beginPath();
          this.ctx.moveTo(0, -segRadius * 0.7);
          this.ctx.lineTo(segRadius * 0.5, 0);
          this.ctx.lineTo(0, segRadius * 0.2);
          this.ctx.lineTo(-segRadius * 0.5, 0);
          this.ctx.closePath();
          this.ctx.fill();
        }
      } else if (this.snakeConfig.patternType === 'bands') {
        // Coral snake / Copperhead alternating cross-bands
        const bandCycle = i % 4;
        let bandCol = this.snakeConfig.patternColor;
        if (bandCycle === 1) bandCol = this.snakeConfig.patternHighlight;
        else if (bandCycle === 3) bandCol = this.snakeConfig.primaryScale;

        this.ctx.fillStyle = bandCol;
        this.ctx.beginPath();
        this.ctx.rect(-segRadius * 0.5, -segRadius * 0.85, segRadius, segRadius * 1.35);
        this.ctx.fill();
      } else if (this.snakeConfig.patternType === 'lightning') {
        // Emerald Tree Boa white enamel zigzag triangles
        if (i % 3 === 0) {
          this.ctx.fillStyle = this.snakeConfig.patternColor;
          this.ctx.beginPath();
          this.ctx.moveTo(-segRadius * 0.45, -segRadius * 0.8);
          this.ctx.lineTo(0, -segRadius * 0.1);
          this.ctx.lineTo(segRadius * 0.45, -segRadius * 0.8);
          this.ctx.closePath();
          this.ctx.fill();
        }
      } else if (this.snakeConfig.patternType === 'blotches') {
        // Albino Python organic blotches
        if (i % 2 === 0) {
          this.ctx.fillStyle = this.snakeConfig.patternColor;
          this.ctx.beginPath();
          this.ctx.ellipse(0, -segRadius * 0.25, segRadius * 0.55, segRadius * 0.38, 0, 0, Math.PI * 2);
          this.ctx.fill();
        }
      } else {
        // Smooth keeled scale dorsal ridge
        this.ctx.strokeStyle = this.snakeConfig.patternHighlight;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(-segRadius * 0.7, -segRadius * 0.15);
        this.ctx.lineTo(segRadius * 0.7, -segRadius * 0.15);
        this.ctx.stroke();
      }

      // Scale rim delineation
      this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.28)';
      this.ctx.lineWidth = 0.8;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, segRadius, -Math.PI * 0.4, Math.PI * 0.4);
      this.ctx.stroke();

      this.ctx.restore();
    }

    // 2. Render Arrow-Shaped Real-Life Snake Head
    this.ctx.save();
    this.ctx.translate(this.player.x, this.player.y);
    this.ctx.rotate(this.playerHeading);

    if (isFlashing) {
      this.ctx.globalAlpha = 0.45;
    }

    // A. Animated Flicking Forked Tongue
    const isFlicking = this.tongueTimer < 0.38;
    if (isFlicking) {
      const tProgress = this.tongueTimer / 0.38;
      const extendLen = Math.sin(tProgress * Math.PI) * 16 + 4;
      const forkSpread = Math.sin(tProgress * Math.PI * 3) * 1.5 + 4.5;

      this.ctx.save();
      this.ctx.strokeStyle = this.snakeConfig.tongueColor;
      this.ctx.lineWidth = 1.5;
      this.ctx.lineCap = 'round';

      this.ctx.beginPath();
      // Stem
      this.ctx.moveTo(19, 0);
      this.ctx.lineTo(19 + extendLen, 0);
      // Left fork tip
      this.ctx.lineTo(19 + extendLen + 5, -forkSpread);
      // Right fork tip
      this.ctx.moveTo(19 + extendLen, 0);
      this.ctx.lineTo(19 + extendLen + 5, forkSpread);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // B. Anatomical Arrow-Shaped Viper Head Contour (broad triangular spade)
    this.ctx.beginPath();
    this.ctx.moveTo(20, 0); // Snout apex
    this.ctx.quadraticCurveTo(15, -6, 9, -9.5); // Anterior cheek to supraocular ridge
    this.ctx.quadraticCurveTo(0, -15, -5, -14.5); // Left broad venom gland flare
    this.ctx.quadraticCurveTo(-13, -13, -15, -7.5); // Posterior jaw corner
    this.ctx.quadraticCurveTo(-17, -4, -17, 0); // Neck constriction
    this.ctx.quadraticCurveTo(-17, 4, -15, 7.5); // Right neck constriction
    this.ctx.quadraticCurveTo(-13, 13, -5, 14.5); // Right venom gland flare
    this.ctx.quadraticCurveTo(0, 15, 9, 9.5); // Right supraocular ridge
    this.ctx.quadraticCurveTo(15, 6, 20, 0); // Return to snout apex
    this.ctx.closePath();

    // 3D scale shading
    const headGrad = this.ctx.createRadialGradient(5, 0, 3, 0, 0, 19);
    headGrad.addColorStop(0, this.snakeConfig.primaryScale);
    headGrad.addColorStop(0.68, this.snakeConfig.secondaryScale);
    headGrad.addColorStop(1, '#090d16');

    this.ctx.fillStyle = headGrad;
    this.ctx.fill();

    this.ctx.strokeStyle = this.snakeConfig.secondaryScale;
    this.ctx.lineWidth = 1.6;
    this.ctx.stroke();

    // C. Crown Scales & Dorsal Chevron on Head
    this.ctx.fillStyle = this.snakeConfig.patternColor;
    this.ctx.beginPath();
    this.ctx.moveTo(10, 0);
    this.ctx.lineTo(3, -4.5);
    this.ctx.lineTo(-4, 0);
    this.ctx.lineTo(3, 4.5);
    this.ctx.closePath();
    this.ctx.fill();

    if (this.snakeConfig.patternHighlight) {
      this.ctx.strokeStyle = this.snakeConfig.patternHighlight;
      this.ctx.lineWidth = 0.8;
      this.ctx.stroke();
    }

    // Posterior cranial markings
    this.ctx.fillStyle = this.snakeConfig.patternColor;
    this.ctx.beginPath();
    this.ctx.moveTo(-5, -6.5);
    this.ctx.lineTo(-12, -8.5);
    this.ctx.lineTo(-9, -3.5);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(-5, 6.5);
    this.ctx.lineTo(-12, 8.5);
    this.ctx.lineTo(-9, 3.5);
    this.ctx.closePath();
    this.ctx.fill();

    // D. Supraocular Scale Ridges (viper brow above eyes)
    this.ctx.strokeStyle = this.snakeConfig.primaryScale;
    this.ctx.lineWidth = 1.8;
    this.ctx.beginPath();
    this.ctx.moveTo(12, -7.5);
    this.ctx.lineTo(5, -10.5);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(12, 7.5);
    this.ctx.lineTo(5, 10.5);
    this.ctx.stroke();

    // E. Nostrils & Heat Pits
    this.ctx.fillStyle = '#0f172a';
    this.ctx.beginPath();
    this.ctx.arc(16, -2.8, 0.9, 0, Math.PI * 2);
    this.ctx.arc(16, 2.8, 0.9, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(12.5, -4.8, 1.2, 0, Math.PI * 2);
    this.ctx.arc(12.5, 4.8, 1.2, 0, Math.PI * 2);
    this.ctx.fill();

    // F. Realistic Eyes with Vertical Slit Pupils
    const drawEye = (eyX: number, eyY: number, angleOffset: number) => {
      this.ctx.save();
      this.ctx.translate(eyX, eyY);
      this.ctx.rotate(angleOffset);

      // Sclera socket
      this.ctx.fillStyle = '#0f172a';
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, 3.8, 2.4, 0, 0, Math.PI * 2);
      this.ctx.fill();

      // Colored Iris
      this.ctx.fillStyle = this.snakeConfig.eyeColor;
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, 3.2, 2.0, 0, 0, Math.PI * 2);
      this.ctx.fill();

      // Vertical Slit Pupil
      this.ctx.fillStyle = this.snakeConfig.pupilColor || '#000000';
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, 0.8, 1.9, 0, 0, Math.PI * 2);
      this.ctx.fill();

      // Specular gleam
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      this.ctx.beginPath();
      this.ctx.arc(-1, -0.6, 0.6, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    };

    drawEye(7, -8, -0.15); // Left eye
    drawEye(7, 8, 0.15);   // Right eye

    // G. Active Polarity Bio-Resonance (Cyan vs Amber)
    const polarityGlow = this.player.polarity === 'CYAN' ? '#06b6d4' : '#f59e0b';
    this.ctx.save();
    this.ctx.strokeStyle = polarityGlow;
    this.ctx.shadowColor = polarityGlow;
    this.ctx.shadowBlur = this.player.recoilCooldown > 0 ? 14 : 6;
    this.ctx.lineWidth = 1.4;

    // Bio-energy spinal line
    this.ctx.beginPath();
    this.ctx.moveTo(13, 0);
    this.ctx.lineTo(-14, 0);
    this.ctx.stroke();

    // Bio-luminescent venom gland nodes
    this.ctx.fillStyle = polarityGlow;
    this.ctx.beginPath();
    this.ctx.arc(-4, -10, 2.2, 0, Math.PI * 2);
    this.ctx.arc(-4, 10, 2.2, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();

    this.ctx.restore();
  }

  private renderGeometricChassis() {
    this.ctx.save();
    this.ctx.translate(this.player.x, this.player.y);

    const angle = Math.atan2(this.player.vy, this.player.vx) || 0;
    this.ctx.rotate(angle);

    if (this.player.invincibleTimer > 0 && Math.floor(performance.now() / 80) % 2 === 0) {
      this.ctx.globalAlpha = 0.4;
    }

    const color = this.player.polarity === 'CYAN' ? '#06b6d4' : '#f59e0b';
    const glow = this.player.polarity === 'CYAN' ? '#38bdf8' : '#fbbf24';

    if (this.player.skin === 'neon') {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 13, 0, Math.PI * 2);
      this.ctx.stroke();

      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 6, 0, Math.PI * 2);
      this.ctx.stroke();
    } else if (this.player.skin === 'blade') {
      this.ctx.fillStyle = '#0f172a';
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(18, 0);
      this.ctx.lineTo(-14, -7);
      this.ctx.lineTo(-8, 0);
      this.ctx.lineTo(-14, 7);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    } else if (this.player.skin === 'prism') {
      this.ctx.fillStyle = '#0f172a';
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const px = Math.cos(a) * 12;
        const py = Math.sin(a) * 12;
        if (i === 0) this.ctx.moveTo(px, py);
        else this.ctx.lineTo(px, py);
      }
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    } else {
      this.ctx.fillStyle = '#0f172a';
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2.5;

      this.ctx.beginPath();
      this.ctx.moveTo(15, 0);
      this.ctx.lineTo(-11, -10);
      this.ctx.lineTo(-6, 0);
      this.ctx.lineTo(-11, 10);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    }

    this.ctx.beginPath();
    this.ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
    this.ctx.fillStyle = glow;
    this.ctx.fill();

    this.ctx.restore();
  }

  private renderShards() {
    for (const s of this.shards) {
      this.ctx.save();
      this.ctx.translate(s.x, s.y);

      const color = s.polarity === 'CYAN' ? '#38bdf8' : '#fbbf24';
      const pulse = Math.sin(this.survivalTime * 4 + s.pulseOffset) * 2;

      // Outer glow
      this.ctx.beginPath();
      this.ctx.arc(0, 0, s.radius + pulse, 0, Math.PI * 2);
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Diamond core
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.moveTo(0, -(s.radius - 2));
      this.ctx.lineTo(s.radius - 2, 0);
      this.ctx.lineTo(0, s.radius - 2);
      this.ctx.lineTo(-(s.radius - 2), 0);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.restore();
    }
  }

  private renderHazards() {
    for (const h of this.hazards) {
      this.ctx.save();
      this.ctx.translate(h.x, h.y);
      this.ctx.rotate(h.rotation);

      const color = h.polarity === 'CYAN' ? '#06b6d4' : '#f59e0b';

      this.ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = h.isHunter ? 2.8 : 2.0;

      // Draw regular or spiky polygon
      this.ctx.beginPath();
      const step = (Math.PI * 2) / h.sides;
      for (let s = 0; s < h.sides; s++) {
        const a = s * step;
        const rad = h.isHunter && s % 2 === 1 ? h.radius * 0.6 : h.radius;
        const px = Math.cos(a) * rad;
        const py = Math.sin(a) * rad;
        if (s === 0) this.ctx.moveTo(px, py);
        else this.ctx.lineTo(px, py);
      }
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      // Central eye / mark
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = color;
      this.ctx.fill();

      this.ctx.restore();
    }
  }

  private renderLasers() {
    for (const l of this.lasers) {
      this.ctx.save();
      const color = l.polarity === 'CYAN' ? '#06b6d4' : '#f59e0b';

      if (l.warningTime > 0) {
        // Warning flashing line
        this.ctx.strokeStyle = color;
        this.ctx.setLineDash([8, 8]);
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = Math.sin(performance.now() * 0.02) > 0 ? 0.8 : 0.2;

        this.ctx.beginPath();
        if (l.axis === 'H') {
          this.ctx.moveTo(0, l.pos);
          this.ctx.lineTo(this.width, l.pos);
        } else {
          this.ctx.moveTo(l.pos, 0);
          this.ctx.lineTo(l.pos, this.height);
        }
        this.ctx.stroke();
      } else {
        // Active beam
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 6;
        this.ctx.globalAlpha = 0.85;

        this.ctx.beginPath();
        if (l.axis === 'H') {
          this.ctx.moveTo(0, l.pos);
          this.ctx.lineTo(this.width, l.pos);
        } else {
          this.ctx.moveTo(l.pos, 0);
          this.ctx.lineTo(l.pos, this.height);
        }
        this.ctx.stroke();

        // White core line
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        if (l.axis === 'H') {
          this.ctx.moveTo(0, l.pos);
          this.ctx.lineTo(this.width, l.pos);
        } else {
          this.ctx.moveTo(l.pos, 0);
          this.ctx.lineTo(l.pos, this.height);
        }
        this.ctx.stroke();
      }

      this.ctx.restore();
    }
  }
}
