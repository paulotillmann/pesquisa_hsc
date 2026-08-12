import React, { useState } from 'react';
import { NpsEvolutionPoint } from '../../types';

interface NpsEvolutionChartProps {
  data: NpsEvolutionPoint[];
}

export const NpsEvolutionChart: React.FC<NpsEvolutionChartProps> = ({ data }) => {
  const [hoveredPoint, setHoveredPoint] = useState<NpsEvolutionPoint | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
        <p className="text-sm font-semibold">Sem dados suficientes para a evolução temporal do NPS.</p>
        <p className="text-xs text-slate-400 mt-1">Selecione outro período no cabeçalho.</p>
      </div>
    );
  }

  // Dimensões do SVG
  const width = 600;
  const height = 240;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Escala de Y: -100 a +100
  const minY = -100;
  const maxY = 100;

  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    // Normaliza de [-100, 100] para [0, 1]
    const normalized = (val - minY) / (maxY - minY);
    return paddingTop + chartHeight * (1 - normalized);
  };

  // Linha 0 (Eixo Neutro)
  const zeroY = getY(0);

  // Geração de Path SVG com curva suave
  const points = data.map((d, i) => `${getX(i)},${getY(d.npsScore)}`);
  const pathD = `M ${points.join(' L ')}`;

  // Área abaixo da linha (Gradiente)
  const areaD = `M ${getX(0)},${zeroY} L ${points.join(' L ')} L ${getX(data.length - 1)},${zeroY} Z`;

  return (
    <div className="w-full relative">
      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="npsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Linhas de Grade Y (-50, 0, 50, 100) */}
          {[-50, 0, 50, 100].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke={val === 0 ? '#94A3B8' : '#E2E8F0'}
                  strokeDasharray={val === 0 ? 'none' : '4 4'}
                  strokeWidth={val === 0 ? 1.5 : 1}
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[10px] font-bold fill-slate-400"
                >
                  {val > 0 ? `+${val}` : val}
                </text>
              </g>
            );
          })}

          {/* Área de Gradiente */}
          <path d={areaD} fill="url(#npsGradient)" />

          {/* Linha de Evolução */}
          <path
            d={pathD}
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pontos de Dados Interativos */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.npsScore);
            const isHovered = hoveredPoint?.date === d.date;

            return (
              <g key={d.date}>
                {/* Rótulo Eixo X */}
                <text
                  x={cx}
                  y={height - 12}
                  textAnchor="middle"
                  className="text-[10px] font-semibold fill-slate-500"
                >
                  {d.label}
                </text>

                {/* Círculo do Ponto */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 4}
                  className={`transition-all duration-150 cursor-pointer ${
                    isHovered ? 'fill-slate-900 stroke-white stroke-2' : 'fill-emerald-500 stroke-white stroke-2'
                  }`}
                  onMouseEnter={() => setHoveredPoint(d)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip Flutuante no Hover */}
      {hoveredPoint && (
        <div className="absolute top-2 right-4 bg-slate-900 text-white rounded-xl p-3 shadow-xl border border-slate-700 text-xs space-y-1.5 z-20 pointer-events-none animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between gap-4 font-bold border-b border-slate-700 pb-1">
            <span className="text-slate-300">{hoveredPoint.label}</span>
            <span className="text-emerald-400">NPS: {hoveredPoint.npsScore > 0 ? `+${hoveredPoint.npsScore}` : hoveredPoint.npsScore}</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[11px]">
            <span className="text-slate-400">Pesquisas:</span>
            <span className="text-right font-bold text-white">{hoveredPoint.total}</span>

            <span className="text-emerald-400">Promotores:</span>
            <span className="text-right font-bold text-emerald-400">{hoveredPoint.promoters}</span>

            <span className="text-amber-400">Neutros:</span>
            <span className="text-right font-bold text-amber-400">{hoveredPoint.neutrals}</span>

            <span className="text-rose-400">Detratores:</span>
            <span className="text-right font-bold text-rose-400">{hoveredPoint.detractors}</span>
          </div>
        </div>
      )}
    </div>
  );
};
