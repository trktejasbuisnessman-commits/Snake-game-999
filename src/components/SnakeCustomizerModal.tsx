import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Check, Palette, Dna, RotateCcw } from 'lucide-react';
import {
  SnakeColorConfig,
  SnakePatternType,
  SNAKE_SPECIES_PRESETS,
  saveSnakeConfig,
} from '../data/snakeSpecies';

interface SnakeCustomizerModalProps {
  currentConfig: SnakeColorConfig;
  isOpen: boolean;
  onClose: () => void;
  onApplyConfig: (config: SnakeColorConfig) => void;
}

export const SnakeCustomizerModal: React.FC<SnakeCustomizerModalProps> = ({
  currentConfig,
  isOpen,
  onClose,
  onApplyConfig,
}) => {
  const [config, setConfig] = useState<SnakeColorConfig>(currentConfig);
  const [activeTab, setActiveTab] = useState<'species' | 'custom'>('species');
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync internal state when opened or currentConfig changes
  useEffect(() => {
    setConfig(currentConfig);
  }, [currentConfig, isOpen]);

  // Live Animated Canvas Preview of the Arrow-Headed Snake
  useEffect(() => {
    if (!isOpen || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const segments = 12;
    const spine: Array<{ x: number; y: number; angle: number }> = [];

    // Initialize spine
    for (let i = 0; i < segments; i++) {
      spine.push({ x: 140 - i * 8, y: 100, angle: 0 });
    }

    const mousePos = { x: 170, y: 100, isHovered: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
      mousePos.isHovered = true;
    };

    const handleMouseLeave = () => {
      mousePos.isHovered = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let headX = 140;
    let headY = 100;
    let headAngle = 0;

    const render = () => {
      time += 0.025;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Smooth motion: follow mouse or smooth figure-8 loop
      let targetX = mousePos.isHovered
        ? mousePos.x
        : width / 2 + Math.cos(time * 1.5) * 55;
      let targetY = mousePos.isHovered
        ? mousePos.y
        : height / 2 + Math.sin(time * 3) * 25;

      const dx = targetX - headX;
      const dy = targetY - headY;
      const dist = Math.hypot(dx, dy);

      if (dist > 4) {
        headX += dx * 0.08;
        headY += dy * 0.08;
        const targetAng = Math.atan2(dy, dx);
        let angDiff = targetAng - headAngle;
        while (angDiff < -Math.PI) angDiff += Math.PI * 2;
        while (angDiff > Math.PI) angDiff -= Math.PI * 2;
        headAngle += angDiff * 0.12;
      }

      // Update spine kinematics with serpentine wave
      let prevX = headX - Math.cos(headAngle) * 11;
      let prevY = headY - Math.sin(headAngle) * 11;
      let prevAngle = headAngle;

      for (let i = 0; i < spine.length; i++) {
        const seg = spine[i];
        const wave = Math.sin(time * 9 - i * 0.45) * 2.2;
        const normX = -Math.sin(prevAngle) * wave;
        const normY = Math.cos(prevAngle) * wave;

        const sdx = prevX - seg.x;
        const sdy = prevY - seg.y;
        seg.angle = Math.atan2(sdy, sdx);
        seg.x = prevX - Math.cos(seg.angle) * 7.5 + normX;
        seg.y = prevY - Math.sin(seg.angle) * 7.5 + normY;

        prevX = seg.x;
        prevY = seg.y;
        prevAngle = seg.angle;
      }

      // 1. Render Body Segments (tail to neck)
      for (let i = spine.length - 1; i >= 0; i--) {
        const seg = spine[i];
        const t = i / spine.length;
        const radius = 10 * (1 - t * 0.65) + 2.5;

        ctx.save();
        ctx.translate(seg.x, seg.y);
        ctx.rotate(seg.angle);

        const grad = ctx.createLinearGradient(0, -radius, 0, radius);
        grad.addColorStop(0, config.secondaryScale);
        grad.addColorStop(0.3, config.primaryScale);
        grad.addColorStop(0.7, config.secondaryScale);
        grad.addColorStop(1, config.bellyColor);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 1.15, radius, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ventral underbelly plates
        ctx.fillStyle = config.bellyColor;
        ctx.beginPath();
        ctx.ellipse(0, radius * 0.5, radius * 0.65, radius * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        // Patterns
        if (config.patternType === 'diamonds') {
          if (i % 2 === 0) {
            ctx.fillStyle = config.patternHighlight;
            ctx.beginPath();
            ctx.moveTo(0, -radius * 0.85);
            ctx.lineTo(radius * 0.7, 0);
            ctx.lineTo(0, radius * 0.35);
            ctx.lineTo(-radius * 0.7, 0);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = config.patternColor;
            ctx.beginPath();
            ctx.moveTo(0, -radius * 0.7);
            ctx.lineTo(radius * 0.5, 0);
            ctx.lineTo(0, radius * 0.2);
            ctx.lineTo(-radius * 0.5, 0);
            ctx.closePath();
            ctx.fill();
          }
        } else if (config.patternType === 'bands') {
          const bandCycle = i % 4;
          let bandCol = config.patternColor;
          if (bandCycle === 1) bandCol = config.patternHighlight;
          else if (bandCycle === 3) bandCol = config.primaryScale;

          ctx.fillStyle = bandCol;
          ctx.beginPath();
          ctx.rect(-radius * 0.5, -radius * 0.85, radius, radius * 1.35);
          ctx.fill();
        } else if (config.patternType === 'lightning') {
          if (i % 3 === 0) {
            ctx.fillStyle = config.patternColor;
            ctx.beginPath();
            ctx.moveTo(-radius * 0.45, -radius * 0.8);
            ctx.lineTo(0, -radius * 0.1);
            ctx.lineTo(radius * 0.45, -radius * 0.8);
            ctx.closePath();
            ctx.fill();
          }
        } else if (config.patternType === 'blotches') {
          if (i % 2 === 0) {
            ctx.fillStyle = config.patternColor;
            ctx.beginPath();
            ctx.ellipse(0, -radius * 0.25, radius * 0.55, radius * 0.38, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          ctx.strokeStyle = config.patternHighlight;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-radius * 0.7, -radius * 0.15);
          ctx.lineTo(radius * 0.7, -radius * 0.15);
          ctx.stroke();
        }

        ctx.restore();
      }

      // 2. Render Arrow-Shaped Viper Head
      ctx.save();
      ctx.translate(headX, headY);
      ctx.rotate(headAngle);

      // Animated Forked Tongue
      const tongueCycle = time % 2.5;
      if (tongueCycle < 0.4) {
        const tProgress = tongueCycle / 0.4;
        const extend = Math.sin(tProgress * Math.PI) * 16 + 4;
        const spread = Math.sin(tProgress * Math.PI * 3) * 1.5 + 4.5;

        ctx.strokeStyle = config.tongueColor;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(19, 0);
        ctx.lineTo(19 + extend, 0);
        ctx.lineTo(19 + extend + 5, -spread);
        ctx.moveTo(19 + extend, 0);
        ctx.lineTo(19 + extend + 5, spread);
        ctx.stroke();
      }

      // Broad Triangular Spade / Arrow Head Profile
      ctx.beginPath();
      ctx.moveTo(20, 0); // Snout
      ctx.quadraticCurveTo(15, -6, 9, -9.5); // Cheek to brow
      ctx.quadraticCurveTo(0, -15, -5, -14.5); // Left venom gland flare
      ctx.quadraticCurveTo(-13, -13, -15, -7.5); // Left jaw corner
      ctx.quadraticCurveTo(-17, -4, -17, 0); // Neck junction
      ctx.quadraticCurveTo(-17, 4, -15, 7.5); // Right neck junction
      ctx.quadraticCurveTo(-13, 13, -5, 14.5); // Right venom gland flare
      ctx.quadraticCurveTo(0, 15, 9, 9.5); // Right brow
      ctx.quadraticCurveTo(15, 6, 20, 0); // Snout
      ctx.closePath();

      const headGrad = ctx.createRadialGradient(5, 0, 3, 0, 0, 19);
      headGrad.addColorStop(0, config.primaryScale);
      headGrad.addColorStop(0.68, config.secondaryScale);
      headGrad.addColorStop(1, '#090d16');

      ctx.fillStyle = headGrad;
      ctx.fill();

      ctx.strokeStyle = config.secondaryScale;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Crown scales
      ctx.fillStyle = config.patternColor;
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(3, -4.5);
      ctx.lineTo(-4, 0);
      ctx.lineTo(3, 4.5);
      ctx.closePath();
      ctx.fill();

      if (config.patternHighlight) {
        ctx.strokeStyle = config.patternHighlight;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Supraocular brow ridges
      ctx.strokeStyle = config.primaryScale;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(12, -7.5);
      ctx.lineTo(5, -10.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(12, 7.5);
      ctx.lineTo(5, 10.5);
      ctx.stroke();

      // Nostrils & Pits
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(16, -2.8, 0.9, 0, Math.PI * 2);
      ctx.arc(16, 2.8, 0.9, 0, Math.PI * 2);
      ctx.arc(12.5, -4.8, 1.2, 0, Math.PI * 2);
      ctx.arc(12.5, 4.8, 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Eyes with vertical slit pupils
      const drawEye = (eyX: number, eyY: number, angleOffset: number) => {
        ctx.save();
        ctx.translate(eyX, eyY);
        ctx.rotate(angleOffset);

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.ellipse(0, 0, 3.8, 2.4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = config.eyeColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, 3.2, 2.0, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = config.pupilColor || '#000000';
        ctx.beginPath();
        ctx.ellipse(0, 0, 0.8, 1.9, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(-1, -0.6, 0.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      };

      drawEye(7, -8, -0.15);
      drawEye(7, 8, 0.15);

      // Subtle bioluminescent dorsal spine
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(13, 0);
      ctx.lineTo(-14, 0);
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: SnakeColorConfig) => {
    setConfig(preset);
    onApplyConfig(preset);
    saveSnakeConfig(preset);
  };

  const handleCustomColorChange = (key: keyof SnakeColorConfig, value: string) => {
    const updated: SnakeColorConfig = {
      ...config,
      [key]: value,
      isCustom: true,
      name: 'Custom Serpent',
      scientificName: 'Vipera customis',
    };
    setConfig(updated);
    onApplyConfig(updated);
    saveSnakeConfig(updated);
  };

  const handlePatternChange = (patternType: SnakePatternType) => {
    const updated: SnakeColorConfig = {
      ...config,
      patternType,
      isCustom: true,
      name: 'Custom Serpent',
      scientificName: 'Vipera customis',
    };
    setConfig(updated);
    onApplyConfig(updated);
    saveSnakeConfig(updated);
  };

  // Color Swatch Helpers
  const PRIMARY_PALETTE = [
    { label: 'Jungle Emerald', color: '#10b981', secondary: '#047857' },
    { label: 'Obsidian Jet', color: '#334155', secondary: '#1e293b' },
    { label: 'Coral Crimson', color: '#dc2626', secondary: '#991b1b' },
    { label: 'Electric Cyan', color: '#06b6d4', secondary: '#0891b2' },
    { label: 'Saffron Python', color: '#fef08a', secondary: '#fde047' },
    { label: 'Desert Mojave', color: '#a8a29e', secondary: '#78716c' },
    { label: 'Copperhead Rust', color: '#c2410c', secondary: '#9a3412' },
    { label: 'Amethyst Viper', color: '#8b5cf6', secondary: '#6d28d9' },
  ];

  const EYE_PALETTE = [
    { label: 'Golden Amber', color: '#fbbf24' },
    { label: 'Ruby Crimson', color: '#f43f5e' },
    { label: 'Emerald Jade', color: '#10b981' },
    { label: 'Sapphire Cyan', color: '#38bdf8' },
    { label: 'Obsidian Noir', color: '#1e293b' },
    { label: 'Solar Yellow', color: '#fde047' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Dna className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                <span>Serpent Anatomy & Coloring Studio</span>
                <span className="text-[11px] font-mono text-emerald-400 font-normal">Real-Life Arrow Head</span>
              </h2>
              <span className="text-xs text-slate-400">
                Choose an authentic biological snake species or fine-tune your custom scale coloration.
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Interactive Preview & Bio Card */}
        <div className="px-5 py-3.5 bg-slate-950/60 border-b border-slate-800/80 flex flex-col sm:flex-row items-center gap-4">
          {/* Animated Canvas */}
          <div className="relative w-full sm:w-[220px] h-[130px] rounded-xl overflow-hidden bg-[#090d16] border border-slate-800 shadow-inner flex items-center justify-center shrink-0 group">
            <canvas
              ref={previewCanvasRef}
              width={220}
              height={130}
              className="w-full h-full block cursor-pointer"
              title="Hover to guide the serpent"
            />
            <div className="absolute bottom-1.5 right-2 text-[10px] text-slate-400/80 bg-slate-900/70 px-1.5 py-0.5 rounded pointer-events-none">
              Interactive Preview
            </div>
          </div>

          {/* Active Biological Details */}
          <div className="flex-1 flex flex-col gap-1 w-full text-xs">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white tracking-tight">{config.name}</span>
              <span className="font-mono text-[11px] text-emerald-400 italic">{config.scientificName}</span>
            </div>
            {config.habitat && (
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <span>Habitat:</span>
                <span className="text-slate-300 font-medium">{config.habitat}</span>
              </span>
            )}
            <p className="text-[11px] text-slate-300/90 leading-relaxed line-clamp-2">
              {config.description}
            </p>

            {/* Quick Color Chips */}
            <div className="flex items-center gap-2 mt-1.5 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Active Palette:</span>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: config.primaryScale }}
                  title="Dorsal Scales"
                />
                <span
                  className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: config.patternColor }}
                  title="Marking Pattern"
                />
                <span
                  className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: config.bellyColor }}
                  title="Underbelly Plates"
                />
                <span
                  className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: config.eyeColor }}
                  title="Reptilian Iris"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-5 border-b border-slate-800 bg-slate-900/60">
          <button
            onClick={() => setActiveTab('species')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'species'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Dna className="w-3.5 h-3.5" />
            <span>Real-Life Species (7 Presets)</span>
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'custom'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Custom Coloring Lab</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {activeTab === 'species' ? (
            /* Species Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SNAKE_SPECIES_PRESETS.map((preset) => {
                const isSelected = config.id === preset.id && !config.isCustom;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-left p-3.5 rounded-xl border transition-all flex flex-col gap-2 relative ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-400 ring-1 ring-emerald-400/50 shadow-md'
                        : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          {preset.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono italic">
                          {preset.scientificName}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="p-1 rounded-full bg-emerald-400 text-slate-950 shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                      {preset.description}
                    </p>

                    {/* Species Color Swatch Row */}
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-800/70 text-[10px] text-slate-400">
                      <span>{preset.habitat.split(' ')[0]}</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.primaryScale }}
                          title="Scales"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.patternColor }}
                          title="Pattern"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.bellyColor }}
                          title="Belly"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.eyeColor }}
                          title="Eyes"
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Custom Coloring Controls */
            <div className="flex flex-col gap-5 text-xs">
              {/* Pattern Style Selection */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-slate-200">Dorsal Pattern Style</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(
                    [
                      { id: 'lightning', name: 'Lightning', desc: 'Emerald Boa zigzags' },
                      { id: 'diamonds', name: 'Diamonds', desc: 'Rattlesnake saddles' },
                      { id: 'bands', name: 'Cross-Bands', desc: 'Coral & Copperhead' },
                      { id: 'blotches', name: 'Blotches', desc: 'Python blotches' },
                      { id: 'smooth', name: 'Keeled Smooth', desc: 'Black Mamba sleek' },
                    ] as const
                  ).map((pat) => (
                    <button
                      key={pat.id}
                      onClick={() => handlePatternChange(pat.id)}
                      className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                        config.patternType === pat.id
                          ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300 shadow-sm'
                          : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-semibold text-xs">{pat.name}</span>
                      <span className="text-[10px] text-slate-400 leading-tight">{pat.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Primary Scales Color */}
              <div className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-200">Primary Dorsal Scale Color</span>
                    <span className="text-[11px] text-slate-400">Main body and cranial scale coloring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.primaryScale}
                      onChange={(e) => {
                        const col = e.target.value;
                        handleCustomColorChange('primaryScale', col);
                      }}
                      className="w-8 h-8 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-xs text-slate-300">{config.primaryScale}</span>
                  </div>
                </div>

                {/* Quick Swatches */}
                <div className="flex flex-wrap items-center gap-2">
                  {PRIMARY_PALETTE.map((swatch) => (
                    <button
                      key={swatch.label}
                      onClick={() => {
                        handleCustomColorChange('primaryScale', swatch.color);
                        handleCustomColorChange('secondaryScale', swatch.secondary);
                      }}
                      className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-[11px] transition-colors"
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: swatch.color }} />
                      <span className="text-slate-300">{swatch.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Pattern & Markings Color */}
              <div className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-200">Dorsal Pattern Marking Color</span>
                    <span className="text-[11px] text-slate-400">Chevron crown mark, saddles, and cross-rings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.patternColor}
                      onChange={(e) => handleCustomColorChange('patternColor', e.target.value)}
                      className="w-8 h-8 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-xs text-slate-300">{config.patternColor}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-[11px] text-slate-400">Pattern Edge Highlight</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.patternHighlight}
                      onChange={(e) => handleCustomColorChange('patternHighlight', e.target.value)}
                      className="w-7 h-7 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-[11px] text-slate-300">{config.patternHighlight}</span>
                  </div>
                </div>
              </div>

              {/* 3. Ventral Underbelly Plates & Eyes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Belly Color */}
                <div className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-200">Ventral Underbelly</span>
                      <span className="text-[11px] text-slate-400">Belly plates (scutes)</span>
                    </div>
                    <input
                      type="color"
                      value={config.bellyColor}
                      onChange={(e) => handleCustomColorChange('bellyColor', e.target.value)}
                      className="w-7 h-7 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
                    />
                  </div>
                </div>

                {/* Eye / Iris Color */}
                <div className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-200">Reptilian Iris Color</span>
                      <span className="text-[11px] text-slate-400">Eyes around vertical slit pupils</span>
                    </div>
                    <input
                      type="color"
                      value={config.eyeColor}
                      onChange={(e) => handleCustomColorChange('eyeColor', e.target.value)}
                      className="w-7 h-7 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {EYE_PALETTE.map((eye) => (
                      <button
                        key={eye.label}
                        onClick={() => handleCustomColorChange('eyeColor', eye.color)}
                        className="w-5 h-5 rounded-full border border-white/20 hover:scale-110 transition-transform"
                        style={{ backgroundColor: eye.color }}
                        title={eye.label}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Forked Tongue Color */}
              <div className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-200">Forked Tongue Color</span>
                  <span className="text-[11px] text-slate-400">Flicking bifurcated sensory tongue</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.tongueColor}
                    onChange={(e) => handleCustomColorChange('tongueColor', e.target.value)}
                    className="w-7 h-7 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
                  />
                  <span className="font-mono text-xs text-slate-300">{config.tongueColor}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800/90 bg-slate-900/90">
          <button
            onClick={() => handleSelectPreset(SNAKE_SPECIES_PRESETS[0])}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Emerald Boa Default</span>
          </button>

          <button
            onClick={onClose}
            className="py-2 px-5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl transition-all shadow-md active:scale-95 text-xs flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Done & Apply to Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};
