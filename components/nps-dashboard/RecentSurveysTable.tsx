import React, { useState } from 'react';
import { Search, Eye, MessageSquare, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { SurveyRow } from '../../types';

interface RecentSurveysTableProps {
  surveys: SurveyRow[];
  onSelectSurvey: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const RecentSurveysTable: React.FC<RecentSurveysTableProps> = ({
  surveys,
  onSelectSurvey,
  searchTerm,
  onSearchChange
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(surveys.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedSurveys = surveys.slice(startIndex, startIndex + pageSize);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      return { date: `${day}/${month}/${year}`, time: `${hours}:${mins}` };
    } catch {
      return { date: isoString, time: '' };
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">Últimas Pesquisas Respondidas</h3>
          <p className="text-xs text-slate-500 font-medium">
            Listagem detalhada das sessões de resposta da pesquisa ({surveys.length} encontradas)
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Pesquisar por nome ou comentário..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50">
              <th className="py-3 px-4 rounded-l-xl">Nome / Avaliador</th>
              <th className="py-3 px-4">Data / Hora</th>
              <th className="py-3 px-4 text-center">Nota NPS</th>
              <th className="py-3 px-4 text-center">Classificação</th>
              <th className="py-3 px-4 text-center">Aval. Equipe</th>
              <th className="py-3 px-4 text-center">Aval. Geral</th>
              <th className="py-3 px-4 text-center">Comentários</th>
              <th className="py-3 px-4 text-right rounded-r-xl">Ação</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {paginatedSurveys.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400 font-semibold">
                  Nenhuma pesquisa encontrada para os filtros selecionados.
                </td>
              </tr>
            ) : (
              paginatedSurveys.map((row) => {
                const { date, time } = formatDate(row.createdAt);
                const hasValidName = row.nome && row.nome.trim() && row.nome.trim().toUpperCase() !== 'NÃO INFORMADO';

                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    {/* Nome */}
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {hasValidName ? (
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-slate-100 rounded-md text-slate-500">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <span>{row.nome}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-semibold italic text-[11px]">
                          NÃO INFORMADO
                        </span>
                      )}
                    </td>

                    {/* Data / Hora */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{date}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{time}</div>
                    </td>

                    {/* Nota NPS */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-sm font-black text-slate-900">
                        {row.npsScore}
                      </span>
                    </td>

                    {/* Classificação */}
                    <td className="py-3.5 px-4 text-center">
                      {row.npsClassification === 'promoter' && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold px-2.5 py-1 rounded-full">
                          Promotor
                        </span>
                      )}
                      {row.npsClassification === 'neutral' && (
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-extrabold px-2.5 py-1 rounded-full">
                          Neutro
                        </span>
                      )}
                      {row.npsClassification === 'detractor' && (
                        <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-extrabold px-2.5 py-1 rounded-full">
                          Detractor
                        </span>
                      )}
                    </td>

                    {/* Aval. Equipe */}
                    <td className="py-3.5 px-4 text-center">
                      {row.equipeRating ? (
                        <span className="inline-flex items-center gap-0.5 font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                          {row.equipeRating} <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* Aval. Geral */}
                    <td className="py-3.5 px-4 text-center">
                      {row.geralRating ? (
                        <span className="inline-flex items-center gap-0.5 font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                          {row.geralRating} <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* Comentários */}
                    <td className="py-3.5 px-4 text-center">
                      {row.hasTextFeedback ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                          <MessageSquare className="w-3 h-3 text-blue-600" /> Comentário
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* Ação */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onSelectSurvey(row.id)}
                        className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" /> Visualizar
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs font-semibold text-slate-500">
          <span>
            Exibindo {startIndex + 1} a {Math.min(startIndex + pageSize, surveys.length)} de {surveys.length} pesquisas
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              Página <strong className="text-slate-800">{currentPage}</strong> de {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 cursor-pointer transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
