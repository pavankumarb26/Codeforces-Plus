import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Trophy,
  Layers,
  Award,
  Code2,
  History,
  PlayCircle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { learnSections } from '../data/learnContent';

const iconMap = {
  BookOpen,
  Trophy,
  Layers,
  Award,
  Code2,
  History,
  PlayCircle,
  HelpCircle
};

export const Learn = () => {
  const [activeSectionId, setActiveSectionId] = useState('overview');

  const scrollToSection = (id) => {
    setActiveSectionId(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Subtitle */}
      <div className="pb-4 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-sky-400" />
          <h1 className="text-2xl font-bold font-heading text-white tracking-tight">
            Codeforces Guide
          </h1>
        </div>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Understand Codeforces contests, ratings, problems, submissions, and competitive programming terminology.
        </p>
      </div>

      {/* Main Grid Layout: Sidebar Navigation + Main Guide Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Mobile Dropdown Navigator */}
        <div className="lg:hidden p-3 bg-dark-card border border-dark-border rounded-xl">
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Select Topic</label>
          <select
            value={activeSectionId}
            onChange={(e) => scrollToSection(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-500/50"
          >
            {learnSections.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {sec.title}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Sticky Topic Navigation */}
        <div className="hidden lg:block lg:col-span-1 sticky top-20 bg-dark-card border border-dark-border rounded-xl p-3 space-y-1">
          <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold px-3 py-1.5 block">
            Topics Overview
          </span>
          {learnSections.map((sec) => {
            const IconComponent = iconMap[sec.iconName] || BookOpen;
            const isActive = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-dark-hover'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <IconComponent className="w-4 h-4 shrink-0" />
                  <span className="truncate">{sec.title}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? 'translate-x-0.5 text-sky-400' : 'opacity-40'}`} />
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {learnSections.map((sec) => {
            const IconComponent = iconMap[sec.iconName] || BookOpen;
            const { content } = sec;

            return (
              <section
                key={sec.id}
                id={`section-${sec.id}`}
                className="p-6 bg-dark-card border border-dark-border rounded-xl space-y-6 scroll-mt-24"
              >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dark-border/60">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold font-heading text-white">{content.heading}</h2>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{sec.shortDesc}</p>
                    </div>
                  </div>

                  {sec.linkTo && (
                    <Link
                      to={sec.linkTo}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border hover:border-sky-500/30 text-xs font-mono text-sky-400 hover:text-sky-300 transition-all shrink-0 self-start sm:self-auto"
                    >
                      {sec.linkLabel} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                {/* Paragraphs */}
                {content.paragraphs && (
                  <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                    {content.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Note Banner */}
                {content.note && (
                  <div className="p-4 bg-sky-950/20 border border-sky-800/40 rounded-lg text-xs text-sky-200 flex items-start gap-2.5 font-sans">
                    <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{content.note}</span>
                  </div>
                )}

                {/* Highlights */}
                {content.highlights && (
                  <div className="space-y-3">
                    {content.highlights.map((h, idx) => (
                      <div key={idx} className="p-4 bg-dark-bg/80 border border-dark-border rounded-lg space-y-1">
                        <span className="text-xs font-bold font-mono text-sky-400 uppercase tracking-wider block">{h.title}</span>
                        <p className="text-xs text-slate-300">{h.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Contest Lifecycle (Contests Section) */}
                {content.lifecycle && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">Contest Lifecycle</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {content.lifecycle.map((lc) => (
                        <div key={lc.phase} className="p-4 bg-dark-bg/60 border border-dark-border rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-sm text-white">{lc.phase}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${lc.color}`}>
                              {lc.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{lc.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contest Details */}
                {content.details && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {content.details.map((d, idx) => (
                      <div key={idx} className="p-3.5 bg-dark-bg/40 border border-dark-border/60 rounded-lg">
                        <span className="text-xs font-semibold text-slate-200 block mb-1 font-mono">{d.term}</span>
                        <p className="text-xs text-slate-400">{d.definition}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Divisions List */}
                {content.divisionsList && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {content.divisionsList.map((div) => (
                      <div key={div.name} className="p-4 bg-dark-bg/60 border border-dark-border rounded-lg space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-sm text-sky-400">{div.name}</span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{div.target}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{div.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Rank Color Scale (Ratings Section) */}
                {content.rankColorScale && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">Official Codeforces Rank Titles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {content.rankColorScale.map((r) => (
                        <div key={r.title} className={`p-3 rounded-lg border flex items-center justify-between font-mono text-xs ${r.bg}`}>
                          <span className={`font-bold ${r.color}`}>{r.title}</span>
                          <span className="text-slate-300 font-semibold">{r.range}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Concepts */}
                {content.keyConcepts && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    {content.keyConcepts.map((kc, idx) => (
                      <div key={idx} className="p-3 bg-dark-bg/60 border border-dark-border rounded-lg text-xs space-y-1 font-mono">
                        <span className="text-sky-400 font-semibold block">{kc.name}</span>
                        <p className="text-slate-400 font-sans">{kc.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Important Distinction Banner (Problems Section) */}
                {content.importantDistinction && (
                  <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-lg text-xs text-amber-200 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-amber-300 font-mono mb-0.5">{content.importantDistinction.title}</span>
                      <p className="text-amber-200/90">{content.importantDistinction.text}</p>
                    </div>
                  </div>
                )}

                {/* Problem Attributes */}
                {content.problemAttributes && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {content.problemAttributes.map((pa, idx) => (
                      <div key={idx} className="p-3.5 bg-dark-bg/60 border border-dark-border rounded-lg text-xs space-y-1">
                        <span className="font-mono font-bold text-slate-200 block text-xs">{pa.attr}</span>
                        <p className="text-slate-400">{pa.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Verdicts List */}
                {content.verdictsList && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {content.verdictsList.map((v) => (
                      <div key={v.code} className="p-3.5 bg-dark-bg/60 border border-dark-border rounded-lg space-y-1.5 text-xs font-mono">
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${v.color}`}>
                            {v.label}
                          </span>
                          <span className="text-slate-500 text-[10px]">{v.code}</span>
                        </div>
                        <p className="text-slate-300 font-sans text-xs pt-1">{v.meaning}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Benefits (Virtual Contests) */}
                {content.benefits && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {content.benefits.map((b, idx) => (
                      <div key={idx} className="p-3.5 bg-dark-bg/60 border border-dark-border rounded-lg space-y-1 text-xs">
                        <span className="font-mono font-bold text-sky-400 block">{b.title}</span>
                        <p className="text-slate-300 leading-relaxed">{b.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Terms Glossary */}
                {content.terms && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {content.terms.map((t, idx) => (
                      <div key={idx} className="p-3 bg-dark-bg/60 border border-dark-border rounded-lg flex items-start gap-3 text-xs">
                        <span className="font-mono font-bold text-sky-400 shrink-0 w-24">{t.term}</span>
                        <p className="text-slate-300">{t.def}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
