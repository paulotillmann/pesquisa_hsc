import React, { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { ExecutiveSummary } from './ExecutiveSummary';
import { MainChartsGrid } from './MainChartsGrid';
import { SecondaryChartsGrid } from './SecondaryChartsGrid';
import { QuestionPerformanceTable } from './QuestionPerformanceTable';
import { RankingsGrid } from './RankingsGrid';
import { RecentSurveysTable } from './RecentSurveysTable';
import { SurveyDetailsDrawer } from './SurveyDetailsDrawer';
import { DashboardSkeleton } from './DashboardSkeleton';
import { useNpsDashboardData } from '../../hooks/useNpsDashboardData';
import { PeriodOption, DateRange } from '../../types';

export const PesquisaNpsDashboard: React.FC = () => {
  const [period, setPeriod] = useState<PeriodOption>('30d');
  const [customRange, setCustomRange] = useState<DateRange | undefined>(undefined);
  const [npsFilter, setNpsFilter] = useState<'all' | 'promoter' | 'neutral' | 'detractor'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const {
    loading,
    error,
    kpis,
    evolutionData,
    volumeData,
    questionPerformance,
    bestRankings,
    attentionRankings,
    recentSurveys,
    selectedSurveyDetail,
    loadingDetail,
    fetchData,
    fetchSurveyDetail,
    closeSurveyDetail
  } = useNpsDashboardData({
    period,
    customRange,
    npsFilter,
    searchTerm
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-slate-900 selection:text-white pb-12 w-full">
      {/* Cabeçalho Fixo / Superior */}
      <DashboardHeader
        period={period}
        onPeriodChange={setPeriod}
        customRange={customRange}
        onCustomRangeChange={setCustomRange}
        npsFilter={npsFilter}
        onNpsFilterChange={setNpsFilter}
        onRefresh={fetchData}
        loading={loading}
      />

      {/* Conteúdo Principal (100% Desktop Width Otimizado) */}
      <main className="w-full max-w-[1920px] mx-auto px-4 md:px-8 py-6 space-y-6">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 px-5 py-4 rounded-2xl text-sm font-semibold flex items-center justify-between shadow-xs">
            <span>⚠️ Erro ao carregar dados do dashboard: {error}</span>
            <button
              onClick={fetchData}
              className="text-xs bg-rose-700 text-white px-3 py-1.5 rounded-xl hover:bg-rose-800 cursor-pointer font-bold"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {/* 1. RESUMO EXECUTIVO (5 KPIs) */}
            <ExecutiveSummary kpis={kpis} />

            {/* 2. GRÁFICOS PRINCIPAIS (Evolução + Distribuição Donut) */}
            <MainChartsGrid evolutionData={evolutionData} kpis={kpis} />

            {/* 3. GRÁFICOS SECUNDÁRIOS (Volume Diário + NPS x Volume) */}
            <SecondaryChartsGrid volumeData={volumeData} />

            {/* 4. AVALIAÇÃO DAS PERGUNTAS (Rating 1-5 Estrelas e Escolhas) */}
            <QuestionPerformanceTable performance={questionPerformance} />

            {/* 5. RANKINGS (Melhores Avaliações vs. Pontos de Atenção) */}
            <RankingsGrid bestRankings={bestRankings} attentionRankings={attentionRankings} />

            {/* 6. ÚLTIMAS PESQUISAS (Tabela Desktop Ampla) */}
            <RecentSurveysTable
              surveys={recentSurveys}
              onSelectSurvey={fetchSurveyDetail}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </>
        )}
      </main>

      {/* Drawer de Detalhes da Pesquisa */}
      <SurveyDetailsDrawer
        detail={selectedSurveyDetail}
        loading={loadingDetail}
        onClose={closeSurveyDetail}
      />
    </div>
  );
};
