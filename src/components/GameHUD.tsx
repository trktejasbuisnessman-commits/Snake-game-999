import React from 'react';
import { Volume2, VolumeX, Pause, Play, Sparkles, Shield, RotateCcw, Palette, Share2 } from 'lucide-react';
import { GameStats } from '../game/ChronoRecoilEngine';
import { SnakeColorConfig } from '../data/snakeSpecies';

interface GameHUDProps {
  stats: GameStats;
  isMuted: boolean;
  snakeConfig?: SnakeColorConfig;
  onToggleMute: () => void;
  onTogglePause: () => void;
  onReset: () => void;
  onOpenCustomizer?: () => void;
  onOpenPublish?: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  stats,
  isMuted,
  snakeConfig,
  onToggleMute,
  onTogglePause,
  onReset,
  onOpenCustomizer,
  onOpenPublish,
}) => {
  const healthPercent = Math.max(0, Math.min(100, (stats.health / stats.maxHealth) * 100));

  return (
    <div className="w-full flex flex-col gap-2 pointer-events-none select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 text-slate-100">
        {/* Left: Score & Multiplier */}
        <div className="flex items-baseline gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">Score</span>
            <span className="text-2xl font-bold tracking-tight font-mono tabular-nums text-white">
              {stats.score.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="text-slate-500 font-mono">/</span>
            <span className="font-semibold text-emerald-400 font-mono tabular-nums">{stats.multiplier}x</span>
            <span className="text-slate-400">Multiplier</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-slate-600 font-mono">·</span>
            <span>Best</span>
            <span className="font-mono tabular-nums text-slate-300 font-medium">
              {stats.highScore.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Center: Health & Polarity State */}
        <div className="flex items-center gap-4">
          {/* Health Bar */}
          <div className="flex flex-col items-center w-28 sm:w-36">
            <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-cyan-400" />
                Hull
              </span>
              <span className="font-mono tabular-nums">{stats.health}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-150 ${
                  stats.health > 40 ? 'bg-cyan-400' : 'bg-rose-500'
                }`}
                style={{ width: `${healthPercent}%` }}
              />
            </div>
          </div>

          {/* Polarity Indicator */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs">
            <span className="text-slate-400">Polarity:</span>
            <span
              className={`font-semibold tracking-wide ${
                stats.polarity === 'CYAN' ? 'text-cyan-400' : 'text-amber-400'
              }`}
            >
              {stats.polarity === 'CYAN' ? 'Flux (Cyan)' : 'Pulse (Amber)'}
            </span>
          </div>
        </div>

        {/* Right: Stage, Grazes & Controls */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Grazes:</span>
            <span className="font-mono tabular-nums font-semibold text-slate-200">{stats.grazes}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300">
            <span className="text-slate-500 font-mono">·</span>
            <span>Tier</span>
            <span className="font-mono font-bold text-cyan-400">{stats.level}</span>
          </div>

          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors"
              title="Customize Snake Colors"
            >
              {snakeConfig ? (
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/30 shrink-0"
                  style={{ backgroundColor: snakeConfig.primaryScale }}
                />
              ) : (
                <Palette className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span className="hidden md:inline font-medium">
                {snakeConfig ? snakeConfig.name.split(' ')[0] : 'Snake'}
              </span>
            </button>
          )}

          {onOpenPublish && (
            <button
              onClick={onOpenPublish}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Publish & Share (Free)"
              aria-label="Publish & Share"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
            </button>
          )}

          <button
            onClick={onTogglePause}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title={stats.isPaused ? 'Resume (P / Esc)' : 'Pause (P / Esc)'}
            aria-label="Pause or Resume"
          >
            {stats.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label="Toggle Audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={onReset}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Restart Run"
            aria-label="Restart Run"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
