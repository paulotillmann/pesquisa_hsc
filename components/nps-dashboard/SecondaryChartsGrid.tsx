import React from 'react';
import { SurveyVolumeChart } from './SurveyVolumeChart';
import { NpsVolumeChart } from './NpsVolumeChart';
import { SurveyVolumePoint } from '../../types';

interface SecondaryChartsGridProps {
  volumeData: SurveyVolumePoint[];
}

export const SecondaryChartsGrid: React.FC<SecondaryChartsGridProps> = ({ volumeData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico 03: Volume de Pesquisas */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between">
        <div className="mb-2">
          <h3 className="text-base font-bold text-slate-900">Volume Diário de Pesquisas</h3>
          <p className="text-xs text-slate-500 font-medium">Quantidade total de participações enviadas por dia</p>
        </div>

        <SurveyVolumeChart data={volumeData} />
      </div>

      {/* Gráfico 04: NPS x Volume */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between">
        <div className="mb-2">
          <h3 className="text-base font-bold text-slate-900">NPS x Volume de Respostas</h3>
          <p className="text-xs text-slate-500 font-medium">Contexto estatístico entre a nota NPS e o tamanho da amostra</p>
        </div>

        <NpsVolumeChart data={volumeData} />
      </div>
    </div>
  );
};
