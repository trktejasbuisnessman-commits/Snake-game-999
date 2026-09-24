import React, { useRef, useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface VirtualControlsProps {
  onMove: (x: number, y: number, active: boolean) => void;
  onRecoil: () => void;
  recoilCooldown: number; // 0 to 1
  polarity: 'CYAN' | 'AMBER';
}

export const VirtualControls: React.FC<VirtualControlsProps> = ({
  onMove,
  onRecoil,
  recoilCooldown,
  polarity,
}) => {
  const padRef = useRef<HTMLDivElement>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleTouchMove(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!padRef.current) return;
    const rect = padRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = touch.clientX - centerX;
    const dy = touch.clientY - centerY;
    const maxRadius = rect.width / 2;
    const dist = Math.hypot(dx, dy);

    const clampedDist = Math.min(dist, maxRadius);
    const angle = Math.atan2(dy, dx);

    const clampedX = Math.cos(angle) * clampedDist;
    const clampedY = Math.sin(angle) * clampedDist;

    setKnobPos({ x: clampedX, y: clampedY });
    onMove(clampedX / maxRadius, clampedY / maxRadius, true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setKnobPos({ x: 0, y: 0 });
    onMove(0, 0, false);
  };

  return (
    <div className="md:hidden flex items-end justify-between px-6 pb-6 pt-2 pointer-events-none select-none z-30">
      {/* Left Virtual Joystick */}
      <div
        ref={padRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="w-28 h-28 rounded-full bg-slate-900/60 border border-slate-700/60 backdrop-blur-sm pointer-events-auto flex items-center justify-center relative touch-none shadow-lg"
      >
        <div
          className={`w-12 h-12 rounded-full border border-slate-500/70 transition-transform ${
            isDragging ? 'bg-cyan-500/40' : 'bg-slate-800/80'
          }`}
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          }}
        />
      </div>

      {/* Right Action Button (Polarity Shift & Kinetic Recoil) */}
      <div className="flex flex-col items-center gap-1 pointer-events-auto">
        <button
          onTouchStart={(e) => {
            e.preventDefault();
            onRecoil();
          }}
          onClick={onRecoil}
          disabled={recoilCooldown > 0}
          className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border shadow-xl transition-transform active:scale-95 touch-none ${
            polarity === 'CYAN'
              ? 'bg-cyan-600/30 border-cyan-400 text-cyan-300'
              : 'bg-amber-600/30 border-amber-400 text-amber-300'
          } ${recoilCooldown > 0 ? 'opacity-50' : 'opacity-100'}`}
        >
          <Zap className="w-6 h-6" />
          <span className="text-[10px] font-bold tracking-tight uppercase mt-0.5">Shift</span>
        </button>
      </div>
    </div>
  );
};
