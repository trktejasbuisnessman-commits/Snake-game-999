/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ChronoRecoilEngine, GameStats, ShipSkin } from './game/ChronoRecoilEngine';
import { sound } from './game/audio';
import { GameHUD } from './components/GameHUD';
import { GameOverModal } from './components/GameOverModal';
import { VirtualControls } from './components/VirtualControls';
import { ArcadeDesignLab } from './components/ArcadeDesignLab';
import { SnakeCustomizerModal } from './components/SnakeCustomizerModal';
import { PublishModal } from './components/PublishModal';
import { SnakeColorConfig, loadSavedSnakeConfig } from './data/snakeSpecies';
import {
  Gamepad2,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  HelpCircle,
  X,
  ChevronRight,
  Palette,
  Dna,
  Share2,
  Globe,
} from 'lucide-react';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<ChronoRecoilEngine | null>(null);

  // App View Mode
  const [viewMode, setViewMode] = useState<'game' | 'codex'>('game');
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);

  // Snake color & species configuration
  const [snakeConfig, setSnakeConfig] = useState<SnakeColorConfig>(loadSavedSnakeConfig());

  // Game state mirrored from engine
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    highScore: 0,
    level: 1,
    multiplier: 1.0,
    health: 100,
    maxHealth: 100,
    combo: 0,
    grazes: 0,
    shardsCollected: 0,
    survivalTime: 0,
    polarity: 'CYAN',
    recoilCooldown: 0,
    isGameOver: false,
    isPaused: false,
  });

  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted());
  const [selectedSkin, setSelectedSkin] = useState<ShipSkin>('snake');
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Initialize Canvas & Engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new ChronoRecoilEngine(canvasRef.current);
    engineRef.current = engine;
    engine.setSnakeConfig(snakeConfig);

    engine.onStateUpdate = (newStats) => {
      setStats({ ...newStats });
    };

    engine.onGameOver = (finalStats) => {
      setStats({ ...finalStats });
    };

    return () => {
      engine.destroy();
    };
  }, []);

  // Update canvas size when switching view
  useEffect(() => {
    if (viewMode === 'game' && engineRef.current) {
      setTimeout(() => {
        engineRef.current?.resize();
      }, 50);
    }
  }, [viewMode]);

  const handleStartGame = () => {
    setHasStarted(true);
    engineRef.current?.start();
  };

  const handleRestart = () => {
    engineRef.current?.start();
  };

  const handleTogglePause = () => {
    engineRef.current?.togglePause();
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectSkin = (skin: ShipSkin) => {
    setSelectedSkin(skin);
    engineRef.current?.setSkin(skin);
  };

  const handleApplySnakeConfig = (newConfig: SnakeColorConfig) => {
    setSnakeConfig(newConfig);
    engineRef.current?.setSnakeConfig(newConfig);
  };

  const handleRecoil = () => {
    engineRef.current?.triggerRecoilPulse();
  };

  const handleTouchMove = (x: number, y: number, active: boolean) => {
    engineRef.current?.setTouchMove(x, y, active);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* Universal Top Bar Contract (Strict 3-zone architecture) */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md z-40 sticky top-0">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setViewMode('game');
          }}
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors"
        >
          Chrono Recoil
        </a>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => setViewMode('game')}
            className={`hover:text-white transition-colors ${
              viewMode === 'game' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Play Game
          </button>
          <button
            onClick={() => setViewMode('codex')}
            className={`hover:text-white transition-colors ${
              viewMode === 'codex' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Design Codex (30 Concepts)
          </button>
          <button
            onClick={() => {
              setViewMode('codex');
            }}
            className="hover:text-white transition-colors"
          >
            20 Mechanics
          </button>
          <button
            onClick={() => {
              setViewMode('codex');
            }}
            className="hover:text-white transition-colors"
          >
            Comparison Matrix
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowPublishModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg border border-cyan-400/40 transition-all shadow-sm active:scale-95 whitespace-nowrap"
            title="Publish & Share App (100% Free)"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-200" />
            <span className="hidden sm:inline">Publish / Share</span>
            <span className="sm:hidden">Share</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-400/25 text-emerald-300 font-bold uppercase tracking-wider">
              Free
            </span>
          </button>

          <button
            onClick={() => setShowCustomizer(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors shadow-sm"
            title="Customize Snake Colors & Species"
          >
            <span
              className="w-2.5 h-2.5 rounded-full border border-white/30 shrink-0 shadow-sm"
              style={{ backgroundColor: snakeConfig.primaryScale }}
            />
            <span className="hidden sm:inline font-medium">{snakeConfig.name.split(' ')[0]}</span>
            <Palette className="w-3.5 h-3.5 text-emerald-400" />
          </button>

          <button
            onClick={() => setShowInstructions(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="How to Play"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How to Play</span>
          </button>

          <button
            onClick={handleToggleMute}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {viewMode === 'game' ? (
            <button
              onClick={() => setViewMode('codex')}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Concepts Lab</span>
            </button>
          ) : (
            <button
              onClick={() => setViewMode('game')}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-md whitespace-nowrap"
            >
              <Gamepad2 className="w-3.5 h-3.5 fill-current" />
              <span>Return to Game</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {viewMode === 'game' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 max-w-6xl w-full mx-auto">
            {/* Game Canvas Container */}
            <div className="w-full flex-1 min-h-[460px] max-h-[720px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
              {/* In-Game HUD */}
              <GameHUD
                stats={stats}
                isMuted={isMuted}
                snakeConfig={snakeConfig}
                onToggleMute={handleToggleMute}
                onTogglePause={handleTogglePause}
                onReset={handleRestart}
                onOpenCustomizer={() => setShowCustomizer(true)}
                onOpenPublish={() => setShowPublishModal(true)}
              />

              {/* Canvas Viewport */}
              <div className="flex-1 relative w-full h-full bg-[#090d16] cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full block"
                  onMouseMove={(e) => engineRef.current?.setMousePos(e.clientX, e.clientY)}
                  onClick={handleRecoil}
                />

                {/* Pre-Start Title Screen Overlay */}
                {!hasStarted && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md p-6 text-center text-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span>Original Browser Arcade Game</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-cyan-400">Concept G1 Flagship</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
                      CHRONO RECOIL
                    </h1>

                    <p className="max-w-md text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      Classic arcade dodging elevated with time manipulation. Steer your arrow-headed serpent
                      through temporal hazards while your past path becomes an ethereal echo!
                    </p>

                    {/* Pre-Run Serpent Customization Bar */}
                    <div className="flex items-center gap-3 p-2.5 px-4 mb-5 bg-slate-900/90 border border-slate-800 rounded-xl shadow-inner max-w-md w-full justify-between">
                      <div className="flex items-center gap-2.5 text-left">
                        <div className="flex items-center gap-1">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: snakeConfig.primaryScale }}
                            title="Dorsal Scales"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: snakeConfig.patternColor }}
                            title="Marking Pattern"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: snakeConfig.eyeColor }}
                            title="Reptilian Iris"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-white leading-tight">
                            {snakeConfig.name}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono italic">
                            {snakeConfig.scientificName}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowCustomizer(true)}
                        className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Palette className="w-3.5 h-3.5" />
                        <span>Customize Colors</span>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
                      <button
                        onClick={handleStartGame}
                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl shadow-lg transition-transform active:scale-95 text-sm"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Launch Simulation</span>
                      </button>

                      <button
                        onClick={() => setShowInstructions(true)}
                        className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl border border-slate-700 transition-colors text-xs"
                      >
                        Quick Controls
                      </button>
                    </div>

                    <button
                      onClick={() => setShowPublishModal(true)}
                      className="mt-3 flex items-center justify-center gap-2 py-2 px-4 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 rounded-xl text-xs font-medium transition-colors w-full max-w-xs shadow-sm"
                    >
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Free App Publish & Sharing Options</span>
                    </button>

                    {/* Feature Bullets */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-8 pt-4 border-t border-slate-800/80">
                      <span>Web Audio Synth</span>
                      <span aria-hidden="true">·</span>
                      <span>Time-Echo Physics</span>
                      <span aria-hidden="true">·</span>
                      <span>5 Escalating Tiers</span>
                      <span aria-hidden="true">·</span>
                      <span>Mobile Touch Ready</span>
                    </div>
                  </div>
                )}

                {/* Pause Screen Overlay */}
                {stats.isPaused && !stats.isGameOver && hasStarted && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm p-6 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Simulation Suspended</h2>
                    <p className="text-xs text-slate-400 mb-6">Press P or Esc to resume</p>
                    <button
                      onClick={handleTogglePause}
                      className="flex items-center gap-2 py-2.5 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl transition-all text-xs"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Resume Stream</span>
                    </button>
                  </div>
                )}

                {/* Mobile Virtual Controls */}
                {hasStarted && !stats.isGameOver && (
                  <div className="absolute inset-x-0 bottom-0 z-10">
                    <VirtualControls
                      onMove={handleTouchMove}
                      onRecoil={handleRecoil}
                      recoilCooldown={stats.recoilCooldown}
                      polarity={stats.polarity}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Quick Controls Footer Bar */}
            <div className="w-full flex items-center justify-between text-xs text-slate-400 px-4 py-2 mt-2">
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">WASD / Arrow Keys or Mouse to steer</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span>Space / Tap / Click for Polarity Shift & Shockwave Recoil</span>
              </div>
              <div className="flex items-center gap-2">
                <span>P / Esc to Pause</span>
              </div>
            </div>

            {/* Game Over Modal */}
            {stats.isGameOver && (
              <GameOverModal
                stats={stats}
                selectedSkin={selectedSkin}
                snakeConfig={snakeConfig}
                onSelectSkin={handleSelectSkin}
                onOpenCustomizer={() => setShowCustomizer(true)}
                onOpenPublish={() => setShowPublishModal(true)}
                onRestart={handleRestart}
              />
            )}
          </div>
        ) : (
          /* CODEX VIEW (30 Concepts, 20 Mechanics, 10 Hybrids, Comparison Matrix) */
          <div className="flex-1 overflow-y-auto">
            <ArcadeDesignLab onLaunchGame={() => setViewMode('game')} />
          </div>
        )}
      </main>

      {/* Free App Publish & Sharing Hub Modal */}
      <PublishModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
      />

      {/* Snake Anatomy & Color Customizer Studio Modal */}
      <SnakeCustomizerModal
        currentConfig={snakeConfig}
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
        onApplyConfig={handleApplySnakeConfig}
      />

      {/* Instructions Modal Drawer */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 text-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white">How Chrono Recoil Works</h3>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <h4 className="font-semibold text-cyan-300 mb-1">01. The Time Echo</h4>
                <p>
                  Every 4 seconds, an autonomous ghost of your ship appears, tracing your exact path from 4 seconds
                  ago. Grazing close to matching polarity ghosts boosts your combo multiplier and shield health!
                </p>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <h4 className="font-semibold text-amber-300 mb-1">02. Polarity Shift & Kinetic Recoil</h4>
                <p>
                  Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-white">Space</kbd>,{' '}
                  <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-white">Left Click</kbd>, or tap the{' '}
                  <span className="text-white font-medium">Shift Button</span> to toggle between Flux (Cyan) and Pulse
                  (Amber). This releases a kinetic shockwave that blasts away hazards and shatters opposing polarity
                  debris!
                </p>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <h4 className="font-semibold text-emerald-300 mb-1">03. Tier Progression & Singularities</h4>
                <p>
                  Collect quantum shards to advance across 5 difficulty tiers. Tier 2 spawns a central black hole with
                  gravitational pull; Tier 3 introduces sweeping lasers; Tier 4 spawns dual concurrent echoes!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowInstructions(false)}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl transition-colors text-xs"
            >
              Understood, Return to Cockpit
            </button>
          </div>
        </div>
      )}

      {/* Quiet Minimal Footer */}
      <footer className="px-6 py-3 border-t border-slate-800 bg-slate-900/60 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>Chrono Recoil & Arcade Design Suite</span>
          <span aria-hidden="true">·</span>
          <span>Zero external audio assets (Web Audio API)</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowPublishModal(true)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-medium"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Publish & Share (Free)</span>
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => setViewMode(viewMode === 'game' ? 'codex' : 'game')}
            className="hover:text-slate-300 transition-colors"
          >
            {viewMode === 'game' ? 'Browse 30 Concepts' : 'Play Live Game'}
          </button>
        </div>
      </footer>
    </div>
  );
}
