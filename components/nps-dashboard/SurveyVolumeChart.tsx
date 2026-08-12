import React from 'react';
import { SurveyVolumePoint } from '../../types';

interface SurveyVolumeChartProps {
  data: SurveyVolumePoint[];
}

export const SurveyVolumeChart: React.FC<SurveyVolumeChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-slate-400 text-xs font-semibold">
        Sem dados de volume no período.
      </div>
    );
  }

  const maxTotal = Math.max(...data.map((d) => d.total), 1);

  return (
    <div className="w-full space-y-3">
      <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
        {data.map((item) => {
          const heightPct = (item.total / maxTotal) * 100;
          return (
            <div key={item.date} className="flex-1 flex flex-col items-center gap-1 group relative">
              <div className="opacity-0 group-hover:opacity-100 transition-all absolute -top-8 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md z-10 whitespace-nowrap pointer-events-none">
                {item.label}: {item.total} pesquisas
              </div>

              <span className="text-[10px] font-extrabold text-slate-700">
                {item.total}
              </span>

              <div className="w-full max-w-[28px] bg-slate-200/60 rounded-t-lg overflow-hidden flex flex-col justify-end h-28">
                <div
                  className="w-full bg-emerald-500 hover:bg-emerald-400 rounded-t-lg transition-all duration-300"
                  style={{ height: `${Math.max(heightPct, 8)}%` }}
                ></div>
              </div>

              <span className="text-[10px] font-bold text-slate-400 truncate max-w-full">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
