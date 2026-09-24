import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Gamepad2,
  Cpu,
  Layers,
  BarChart3,
  Play,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  GAME_CONCEPTS,
  NOVEL_MECHANICS,
  HYBRID_CONCEPTS,
  GameConcept,
} from '../data/gameConcepts';

interface ArcadeDesignLabProps {
  onLaunchGame: () => void;
}

export const ArcadeDesignLab: React.FC<ArcadeDesignLabProps> = ({ onLaunchGame }) => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'mechanics' | 'hybrids' | 'matrix'>('concepts');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedConceptId, setExpandedConceptId] = useState<string | null>('g1');
  const [sortKey, setSortKey] = useState<keyof GameConcept['metrics']>('funFactor');

  // Filter concepts
  const filteredConcepts = GAME_CONCEPTS.filter((c) => {
    const matchesCat = categoryFilter === 'ALL' || c.category === categoryFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.oneLiner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.uniqueMechanic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sorted concepts for matrix
  const sortedConcepts = [...GAME_CONCEPTS].sort((a, b) => b.metrics[sortKey] - a.metrics[sortKey]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 text-slate-100">
      {/* Top Banner & Call to Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Arcade Laboratory</span>
            <span aria-hidden="true">·</span>
            <span>Original Concept Architecture & Mechanics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            Original Classic + Advanced Browser Game Suite
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            30 original mini-game concepts, 20 novel gameplay mechanics, and 10 hybrid architectures engineered for
            instant browser playability, depth, and replayability.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onLaunchGame}
            className="flex items-center gap-2.5 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl shadow-lg transition-all active:scale-[0.98] whitespace-nowrap text-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Flagship Game (Chrono Recoil)</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Interactive filter buttons) */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('concepts')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'concepts'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>30 Original Game Concepts</span>
        </button>

        <button
          onClick={() => setActiveTab('mechanics')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'mechanics'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>20 Novel Mechanics</span>
        </button>

        <button
          onClick={() => setActiveTab('hybrids')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'hybrids'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>10 Experimental Hybrids</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'matrix'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Evaluation Matrix</span>
        </button>
      </div>

      {/* TAB 1: 30 ORIGINAL CONCEPTS */}
      {activeTab === 'concepts' && (
        <div className="flex flex-col gap-6">
          {/* Filter Bar & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Segmented Control */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {[
                { id: 'ALL', label: 'All (30)' },
                { id: 'A', label: 'Classic Inspired' },
                { id: 'B', label: 'Physics Based' },
                { id: 'C', label: 'Puzzle Based' },
                { id: 'D', label: 'Reaction Based' },
                { id: 'E', label: 'Strategy Mini' },
                { id: 'F', label: 'Experimental' },
                { id: 'G', label: 'Never Thought of It' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    categoryFilter === cat.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search concepts or mechanics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
            </div>
          </div>

          {/* Concepts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConcepts.map((c) => {
              const isExpanded = expandedConceptId === c.id;
              const isSelectedFlagship = c.id === 'g1';

              return (
                <div
                  key={c.id}
                  className={`flex flex-col bg-slate-900 border rounded-xl p-5 transition-all ${
                    isSelectedFlagship
                      ? 'border-cyan-500/50 bg-gradient-to-b from-slate-900 to-slate-900/90 shadow-lg shadow-cyan-500/5'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <span>Cat {c.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{c.categoryName}</span>
                        {isSelectedFlagship && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-cyan-400 font-semibold">Built & Playable</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight">{c.name}</h3>
                    </div>

                    <button
                      onClick={() => setExpandedConceptId(isExpanded ? null : c.id)}
                      className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors"
                      title={isExpanded ? 'Collapse' : 'Expand full specs'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* One Liner */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{c.oneLiner}</p>

                  {/* Key Highlights */}
                  <div className="flex flex-col gap-2 text-xs text-slate-400 pb-3 border-b border-slate-800/80">
                    <div>
                      <span className="text-slate-500 font-medium">Unique Mechanic: </span>
                      <span className="text-slate-300">{c.uniqueMechanic}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Controls: </span>
                      <span className="text-slate-300">{c.controls}</span>
                    </div>
                  </div>

                  {/* Expanded 11-Point Specs */}
                  {isExpanded && (
                    <div className="flex flex-col gap-3 pt-3 text-xs text-slate-300 animate-in fade-in duration-150">
                      <div>
                        <span className="text-slate-500 font-medium block mb-0.5">Core Gameplay</span>
                        <p className="leading-relaxed">{c.coreGameplay}</p>
                      </div>

                      <div>
                        <span className="text-slate-500 font-medium block mb-0.5">Main Objective</span>
                        <p className="leading-relaxed">{c.objective}</p>
                      </div>

                      <div>
                        <span className="text-slate-500 font-medium block mb-0.5">Difficulty Progression</span>
                        <p className="leading-relaxed">{c.difficultyProgression}</p>
                      </div>

                      <div>
                        <span className="text-slate-500 font-medium block mb-0.5">Scoring System</span>
                        <p className="leading-relaxed">{c.scoringSystem}</p>
                      </div>

                      <div>
                        <span className="text-slate-500 font-medium block mb-0.5">Replayability Factor</span>
                        <p className="leading-relaxed">{c.replayabilityFactor}</p>
                      </div>

                      <div>
                        <span className="text-slate-500 font-medium block mb-0.5">Why It Stands Apart</span>
                        <p className="leading-relaxed text-cyan-300">{c.differentiatingFactor}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        <span>Dev Complexity: {c.devDifficulty}</span>
                        <span>Fun Rating: {c.metrics.funFactor}/10</span>
                      </div>
                    </div>
                  )}

                  {/* Bottom Action for Flagship */}
                  {isSelectedFlagship && (
                    <button
                      onClick={onLaunchGame}
                      className="mt-4 flex items-center justify-center gap-2 py-2 px-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold rounded-lg transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Now</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: 20 NOVEL MECHANICS */}
      {activeTab === 'mechanics' && (
        <div className="flex flex-col gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-white tracking-tight">20 Original Gameplay Mechanics</h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Unusual systemic hooks invented to transcend standard arcade tropes. Each mechanic pairs deep player
              agency with lightweight JavaScript feasibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NOVEL_MECHANICS.map((m, idx) => (
              <div
                key={m.id}
                className="flex flex-col gap-3 p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>Mechanic {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300">JS Complexity: {m.difficulty}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">{m.name}</h3>

                <div className="flex flex-col gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">How It Operates</span>
                    <p className="text-slate-300 leading-relaxed">{m.howItWorks}</p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">Psychological Hook & Depth</span>
                    <p className="text-slate-300 leading-relaxed">{m.whyInteresting}</p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">JavaScript Implementation Logic</span>
                    <p className="text-slate-300 leading-relaxed font-mono text-[11px] bg-slate-950 p-2 rounded border border-slate-800/80">
                      {m.implementationInJS}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">Replayability Yield</span>
                    <p className="text-cyan-300 leading-relaxed">{m.replayabilityBenefit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 10 EXPERIMENTAL HYBRIDS */}
      {activeTab === 'hybrids' && (
        <div className="flex flex-col gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-white tracking-tight">10 Experimental Hybrid Concepts</h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Combinations of high-synergy mechanics forged into full browser-playable game formulas that require zero
              bloated game engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HYBRID_CONCEPTS.map((h, idx) => (
              <div
                key={h.id}
                className="flex flex-col gap-3 p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Hybrid Formula {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  {h.id === 'h1' && <span className="text-cyan-400 font-semibold">Flagship Implemented</span>}
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">{h.name}</h3>

                <div className="flex flex-wrap gap-1.5 text-xs text-slate-400">
                  <span className="text-slate-500">Synthesizes:</span>
                  {h.combinedMechanics.map((mech, mi) => (
                    <span key={mi} className="text-slate-300 font-medium">
                      {mech}
                      {mi < h.combinedMechanics.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{h.elevatorPitch}</p>

                <div className="flex flex-col gap-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                  <div>
                    <span className="text-slate-500 font-medium">Controls: </span>
                    <span className="text-slate-300">{h.controls}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Gameplay Loop: </span>
                    <span className="text-slate-300">{h.gameplayLoop}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Why It Works: </span>
                    <span className="text-cyan-300">{h.whyItWorks}</span>
                  </div>
                </div>

                {h.id === 'h1' && (
                  <button
                    onClick={onLaunchGame}
                    className="mt-2 flex items-center justify-center gap-2 py-2 px-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Game Experience</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: EVALUATION MATRIX */}
      {activeTab === 'matrix' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="max-w-xl">
              <h2 className="text-xl font-bold text-white tracking-tight">Phase 4 Concept Comparison Matrix</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Objective scoring across 8 critical game design vectors. Sort by any column to identify optimal
                trade-offs.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Sort by:</span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as keyof GameConcept['metrics'])}
                className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500/60"
              >
                <option value="funFactor">Fun Factor</option>
                <option value="originality">Originality</option>
                <option value="replayability">Replayability</option>
                <option value="simplicity">Simplicity</option>
                <option value="feasibility">Feasibility</option>
                <option value="visualAppeal">Visual Appeal</option>
                <option value="learningValue">Learning Value</option>
                <option value="performance">Browser Performance</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
                <tr>
                  <th className="py-3 px-4">Concept Name</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3 text-right">Originality</th>
                  <th className="py-3 px-3 text-right">Simplicity</th>
                  <th className="py-3 px-3 text-right font-bold text-cyan-400">Fun Factor</th>
                  <th className="py-3 px-3 text-right">Replay</th>
                  <th className="py-3 px-3 text-right">Feasibility</th>
                  <th className="py-3 px-3 text-right">Visuals</th>
                  <th className="py-3 px-3 text-right">Perf</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono tabular-nums">
                {sortedConcepts.map((sc) => (
                  <tr key={sc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-sans font-medium text-white flex items-center gap-2">
                      <span>{sc.name}</span>
                      {sc.id === 'g1' && <span className="text-[10px] text-cyan-400 font-sans font-semibold">★ Flagship</span>}
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-400">{sc.categoryName}</td>
                    <td className="py-3 px-3 text-right text-slate-300">{sc.metrics.originality}/10</td>
                    <td className="py-3 px-3 text-right text-slate-300">{sc.metrics.simplicity}/10</td>
                    <td className="py-3 px-3 text-right font-bold text-cyan-400">{sc.metrics.funFactor}/10</td>
                    <td className="py-3 px-3 text-right text-slate-300">{sc.metrics.replayability}/10</td>
                    <td className="py-3 px-3 text-right text-slate-300">{sc.metrics.feasibility}/10</td>
                    <td className="py-3 px-3 text-right text-slate-300">{sc.metrics.visualAppeal}/10</td>
                    <td className="py-3 px-3 text-right text-emerald-400">{sc.metrics.performance}/10</td>
                    <td className="py-3 px-4 text-center font-sans">
                      {sc.id === 'g1' ? (
                        <button
                          onClick={onLaunchGame}
                          className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold rounded transition-colors whitespace-nowrap"
                        >
                          Play Live
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500">Spec Ready</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
