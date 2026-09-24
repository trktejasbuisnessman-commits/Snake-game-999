import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Download,
  Smartphone,
  Globe,
  Sparkles,
  Layers,
  ArrowRight,
  Send,
  QrCode,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'live' | 'pwa' | 'freehosts' | 'export'>('live');
  const [copied, setCopied] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);

  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  // Determine current public URL
  const publicUrl =
    typeof window !== 'undefined'
      ? window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')
        ? 'https://ais-pre-ammtuvmaxom6vbv5kz2wru-919257734234.asia-east1.run.app'
        : window.location.href
      : 'https://ais-pre-ammtuvmaxom6vbv5kz2wru-919257734234.asia-east1.run.app';

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Chrono Recoil - Play Free Browser Arcade Game',
          text: 'Play Chrono Recoil: Dodge temporal hazards and steer your arrow-headed serpent with time-echo mechanics!',
          url: publicUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const encodedUrl = encodeURIComponent(publicUrl);
  const shareText = encodeURIComponent(
    'Play Chrono Recoil: Arcade dodging with time-echo physics and biological serpent anatomy! Free in browser:'
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                <span>Free App Publish & Sharing Options</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 uppercase tracking-wide">
                  100% Free
                </span>
              </h2>
              <span className="text-xs text-slate-400">
                Your game is already live! Share the link, install as a standalone app, or deploy to free hosts.
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

        {/* Tab Switcher */}
        <div className="flex items-center px-4 border-b border-slate-800 bg-slate-900/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('live')}
            className={`py-2.5 px-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'live'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Instant Live Link</span>
          </button>

          <button
            onClick={() => setActiveTab('pwa')}
            className={`py-2.5 px-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'pwa'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Install as App (PWA)</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1 rounded">No Store Fees</span>
          </button>

          <button
            onClick={() => setActiveTab('freehosts')}
            className={`py-2.5 px-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'freehosts'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Free Hosting Providers</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`py-2.5 px-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'export'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Build & Export</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {/* TAB 1: INSTANT LIVE LINK */}
          {activeTab === 'live' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-800/40 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-white text-sm">Your App is Published & Live Right Now</span>
                  </div>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/50 px-2 py-0.5 rounded">
                    HTTPS Active
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed">
                  Your game is currently hosted for free on Google Cloud infrastructure. Anyone on phones, tablets, or
                  computers can open this link and play instantly without creating an account or installing anything:
                </p>

                {/* URL Bar */}
                <div className="flex items-center gap-2 p-2 bg-slate-950/80 rounded-xl border border-slate-800">
                  <input
                    type="text"
                    readOnly
                    value={publicUrl}
                    className="flex-1 bg-transparent text-cyan-300 font-mono text-[11px] sm:text-xs outline-none px-2 select-all overflow-ellipsis"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors text-xs shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href={publicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in New Tab</span>
                  </a>

                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{showQR ? 'Hide QR Code' : 'Scan on Mobile Phone'}</span>
                  </button>

                  <button
                    onClick={handleNativeShare}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Share via Device</span>
                  </button>
                </div>
              </div>

              {/* QR Code Section */}
              {showQR && (
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center gap-4 animate-in fade-in duration-150">
                  <div className="p-3 bg-white rounded-xl shadow-md shrink-0">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodedUrl}&margin=4`}
                      alt="Game QR Code"
                      width={140}
                      height={140}
                      className="block"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-center sm:text-left">
                    <span className="font-bold text-white text-sm">Instant Mobile Play</span>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Point your iPhone or Android camera at the QR code on your screen. The browser will open Chrono
                      Recoil immediately with virtual touch controls ready to play!
                    </p>
                  </div>
                </div>
              )}

              {/* Social Share Buttons */}
              <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-800 flex flex-col gap-2">
                <span className="text-xs font-semibold text-slate-300">Quick 1-Click Share:</span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-medium transition-colors"
                  >
                    X (Twitter)
                  </a>
                  <a
                    href={`https://www.reddit.com/submit?url=${encodedUrl}&title=Chrono%20Recoil%20Arcade%20Game`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/30 rounded-lg text-xs font-medium transition-colors"
                  >
                    Reddit
                  </a>
                  <a
                    href={`mailto:?subject=Play Chrono Recoil&body=${shareText}%20${encodedUrl}`}
                    className="px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 text-slate-300 border border-slate-600/40 rounded-lg text-xs font-medium transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PWA - INSTALL AS APP (NO STORE FEES) */}
          {activeTab === 'pwa' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-800/40 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-white text-sm">
                      Progressive Web App (PWA) — Zero Store Fees
                    </span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                    $0 Google Play / $0 Apple
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed">
                  Instead of paying $25 for Google Play or $99/year for Apple App Store, players can install Chrono
                  Recoil directly from the browser onto their home screen. It runs full-screen with offline caching,
                  high-refresh rendering, and desktop/mobile window integration.
                </p>

                {isInstalled ? (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-emerald-300">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span className="font-semibold">App is already installed and running in Standalone Mode!</span>
                  </div>
                ) : isInstallable ? (
                  <button
                    onClick={install}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install App on this Device Now</span>
                  </button>
                ) : (
                  <div className="text-[11px] text-slate-400 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                    💡 Browser install prompt is ready. Follow the guide below to add it to your home screen or desktop.
                  </div>
                )}
              </div>

              {/* Instructions per OS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Android / Chrome */}
                <div className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    <span>Android / Chrome / Edge</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                    <li>Open the live URL in Chrome or Edge.</li>
                    <li>Tap the <strong>three dots menu (⋮)</strong> at top right.</li>
                    <li>
                      Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                    </li>
                    <li>Launch anytime directly from your app drawer!</li>
                  </ol>
                </div>

                {/* iOS Safari */}
                <div className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>iPhone / iPad (Safari)</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                    <li>Open the live link in Apple <strong>Safari</strong>.</li>
                    <li>
                      Tap the <strong>Share button</strong> (square with arrow pointing up).
                    </li>
                    <li>
                      Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>.
                    </li>
                    <li>The serpent app icon will appear right on your iPhone home screen!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FREE HOSTING PROVIDERS */}
          {activeTab === 'freehosts' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl">
                <span className="font-semibold text-white">Want your own Custom Domain or GitHub Repository?</span>
                <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                  You can deploy this application for free with 0 server costs to any of these industry standard
                  platforms:
                </p>
              </div>

              {/* Provider 1: Vercel */}
              <div className="p-3.5 bg-slate-800/30 border border-slate-800 rounded-xl flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs border border-slate-700">
                      ▲
                    </span>
                    <span className="font-bold text-white text-xs">Option A: Vercel (Recommended)</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Free Forever
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  1-click deployment with free SSL certificate and unlimited custom domains.
                </p>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 flex items-center justify-between">
                  <span>npx vercel</span>
                  <button
                    onClick={() => handleCopyText('npx vercel', 'vercel')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    {copiedCommand === 'vercel' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <span className="text-[10px] text-slate-400">
                  Or import your GitHub repo directly on vercel.com. It auto-detects Vite and deploys in 30 seconds.
                </span>
              </div>

              {/* Provider 2: Netlify */}
              <div className="p-3.5 bg-slate-800/30 border border-slate-800 rounded-xl flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-teal-900 text-teal-300 flex items-center justify-center font-bold text-xs border border-teal-700">
                      N
                    </span>
                    <span className="font-bold text-white text-xs">Option B: Netlify (Drag & Drop)</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Free Starter Plan
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Run <code className="text-cyan-300">npm run build</code>, then drag the generated{' '}
                  <code className="text-cyan-300">dist</code> folder right into{' '}
                  <a
                    href="https://app.netlify.com/drop"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 underline"
                  >
                    app.netlify.com/drop
                  </a>
                  . You get an instant live link immediately!
                </p>
              </div>

              {/* Provider 3: GitHub Pages */}
              <div className="p-3.5 bg-slate-800/30 border border-slate-800 rounded-xl flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs border border-slate-700">
                      GH
                    </span>
                    <span className="font-bold text-white text-xs">Option C: GitHub Pages</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    100% Free
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Push your repository to GitHub, go to <strong>Settings → Pages</strong>, and select GitHub Actions
                  with the Vite/Static template.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: EXPORT & COMMANDS */}
          {activeTab === 'export' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl flex flex-col gap-2">
                <span className="font-semibold text-white">How to Build the Production Static Package</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  This game is built with Vite, TypeScript, and Tailwind CSS. Running the build command generates a
                  minified, production-ready static web folder in <code className="text-cyan-300">dist/</code> that can
                  be hosted anywhere.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-slate-400 font-semibold text-[11px]">1. Build Command:</span>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 flex items-center justify-between">
                  <span>npm run build</span>
                  <button
                    onClick={() => handleCopyText('npm run build', 'build')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    {copiedCommand === 'build' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-slate-400 font-semibold text-[11px]">2. Preview Locally:</span>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 flex items-center justify-between">
                  <span>npm run preview</span>
                  <button
                    onClick={() => handleCopyText('npm run preview', 'preview')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    {copiedCommand === 'preview' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800/90 bg-slate-900/90">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Active & Ready to Play</span>
          </div>

          <button
            onClick={onClose}
            className="py-2 px-5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl transition-all shadow-md active:scale-95 text-xs flex items-center gap-1.5"
          >
            <span>Close & Return to Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};
