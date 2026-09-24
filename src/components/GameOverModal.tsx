import React from 'react';
import { Trophy, RotateCcw, Clock, Sparkles, Gem, Layers, Palette, Dna, Share2 } from 'lucide-react';
import { GameStats, ShipSkin } from '../game/ChronoRecoilEngine';
import { SnakeColorConfig } from '../data/snakeSpecies';

interface GameOverModalProps {
  stats: GameStats;
  selectedSkin: ShipSkin;
  snakeConfig?: SnakeColorConfig;
  onSelectSkin: (skin: ShipSkin) => void;
  onOpenCustomizer?: () => void;
  onOpenPublish?: () => void;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  stats,
  selectedSkin,
  snakeConfig,
  onSelectSkin,
  onOpenCustomizer,
  onOpenPublish,
  onRestart,
}) => {
  const isNewRecord = stats.score >= stats.highScore && stats.score > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 text-slate-100">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-1.5">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">Session Terminated</span>
          <h2 className="text-2xl font-bold tracking-tight text-white">Chrono Drift Ended</h2>
          {isNewRecord && (
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium mt-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>New Personal Record Established</span>
            </div>
          )}
        </div>

        {/* Primary Score Board */}
        <div className="flex flex-col items-center justify-center py-4 px-6 bg-slate-950/60 border border-slate-800/80 rounded-xl">
          <span className="text-xs text-slate-400 font-medium mb-1">Final Score</span>
          <span className="text-4xl font-extrabold font-mono tabular-nums text-white">
            {stats.score.toLocaleString()}
          </span>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
            <span>High Score:</span>
            <span className="font-mono tabular-nums text-slate-200 font-semibold">
              {stats.highScore.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Run Analytics Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-lg border border-slate-800/60">
            <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-slate-400">Tier Reached</span>
              <span className="font-mono font-bold text-slate-200 text-sm">Tier {stats.level}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-lg border border-slate-800/60">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-slate-400">Echo Grazes</span>
              <span className="font-mono font-bold text-slate-200 text-sm">{stats.grazes}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-lg border border-slate-800/60">
            <Gem className="w-4 h-4 text-sky-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-slate-400">Shards Harvested</span>
              <span className="font-mono font-bold text-slate-200 text-sm">{stats.shardsCollected}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-lg border border-slate-800/60">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-slate-400">Survival Duration</span>
              <span className="font-mono font-bold text-slate-200 text-sm">{stats.survivalTime}s</span>
            </div>
          </div>
        </div>

        {/* Snake Species & Appearance Bar */}
        <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2.5">
            {snakeConfig ? (
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: snakeConfig.primaryScale }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: snakeConfig.patternColor }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: snakeConfig.eyeColor }}
                />
              </div>
            ) : (
              <Dna className="w-4 h-4 text-emerald-400" />
            )}
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-400">Arrow-Headed Serpent</span>
              <span className="font-semibold text-slate-200 text-xs">
                {snakeConfig ? snakeConfig.name : 'Emerald Tree Boa'}
              </span>
            </div>
          </div>

          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 rounded-lg text-xs font-semibold transition-colors"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Change Colors</span>
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onRestart}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cyan-500 hover:bg-cyan-400 active:scale-[0.99] text-slate-950 font-bold rounded-xl shadow-lg transition-all"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>Engage Next Timeline</span>
          </button>

          {onOpenPublish && (
            <button
              onClick={onOpenPublish}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-colors text-xs font-semibold"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Share & Publish App (Free)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
