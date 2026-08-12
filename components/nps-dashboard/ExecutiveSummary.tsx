import React from 'react';
import { TrendingUp, TrendingDown, Minus, Award, Users, ThumbsUp, Smile, AlertTriangle } from 'lucide-react';
import { DashboardKpis } from '../../types';

interface ExecutiveSummaryProps {
  kpis: DashboardKpis;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ kpis }) => {
  // Determina zona visual do NPS
  const getNpsZone = (score: number) => {
    if (score >= 75) return { label: 'Zona de Excelência', color: 'bg-emerald-500 text-white', border: 'border-emerald-200' };
    if (score >= 50) return { label: 'Zona de Qualidade', color: 'bg-blue-500 text-white', border: 'border-blue-200' };
    if (score >= 0) return { label: 'Zona de Aperfeiçoamento', color: 'bg-amber-500 text-white', border: 'border-amber-200' };
    return { label: 'Zona Crítica', color: 'bg-rose-600 text-white', border: 'border-rose-200' };
  };

  const zone = getNpsZone(kpis.npsScore);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* 1. CARD HIGHLIGHT: NPS GERAL */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-700 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Award className="w-20 h-20 text-white" />
        </div>

        <div className="flex items-center justify-between z-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
            NPS Geral
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${zone.color}`}>
            {zone.label}
          </span>
        </div>

        <div className="my-2 z-10 flex items-baseline gap-2">
          <span className="text-4xl lg:text-5xl font-black tracking-tight text-white">
            {kpis.npsScore > 0 ? `+${kpis.npsScore}` : kpis.npsScore}
          </span>
          <span className="text-xs font-semibold text-slate-400">/ 100</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold z-10">
          {kpis.npsDiff > 0 ? (
            <span className="text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +{kpis.npsDiff} pts
            </span>
          ) : kpis.npsDiff < 0 ? (
            <span className="text-rose-400 flex items-center gap-0.5">
              <TrendingDown className="w-3.5 h-3.5" /> {kpis.npsDiff} pts
            </span>
          ) : (
            <span className="text-slate-400 flex items-center gap-0.5">
              <Minus className="w-3.5 h-3.5" /> Estável
            </span>
          )}
          <span className="text-slate-400 font-normal">vs período anterior</span>
        </div>
      </div>

      {/* 2. TOTAL PESQUISAS */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between min-h-[140px] hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Pesquisas
          </span>
          <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="my-1">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {kpis.totalSurveys.toLocaleString('pt-BR')}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs font-semibold">
          <span className={`flex items-center gap-0.5 ${kpis.totalDiffPct >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {kpis.totalDiffPct >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {kpis.totalDiffPct >= 0 ? `+${kpis.totalDiffPct}%` : `${kpis.totalDiffPct}%`}
          </span>
          <span className="text-slate-500 font-normal">
            Hoje: <strong className="text-slate-800">{kpis.surveysToday}</strong>
          </span>
        </div>
      </div>

      {/* 3. PROMOTORES (9-10) */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-emerald-100 flex flex-col justify-between min-h-[140px] hover:border-emerald-300 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Promotores
          </span>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
            <ThumbsUp className="w-4 h-4" />
          </div>
        </div>

        <div className="my-1 flex items-baseline justify-between">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {kpis.promotersCount.toLocaleString('pt-BR')}
          </span>
          <span className="text-sm font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
            {kpis.promotersPct}%
          </span>
        </div>

        {/* Barra de Proporção Visual */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(kpis.promotersPct, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* 4. NEUTROS (7-8) */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-amber-100 flex flex-col justify-between min-h-[140px] hover:border-amber-300 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Neutros
          </span>
          <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
            <Smile className="w-4 h-4" />
          </div>
        </div>

        <div className="my-1 flex items-baseline justify-between">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {kpis.neutralsCount.toLocaleString('pt-BR')}
          </span>
          <span className="text-sm font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
            {kpis.neutralsPct}%
          </span>
        </div>

        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(kpis.neutralsPct, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* 5. DETRATORES (0-6) */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-rose-100 flex flex-col justify-between min-h-[140px] hover:border-rose-300 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
            Detratores
          </span>
          <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        <div className="my-1 flex items-baseline justify-between">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {kpis.detractorsCount.toLocaleString('pt-BR')}
          </span>
          <span className="text-sm font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">
            {kpis.detractorsPct}%
          </span>
        </div>

        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-rose-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(kpis.detractorsPct, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
