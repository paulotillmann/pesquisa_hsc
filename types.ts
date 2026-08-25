export interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'single_choice' | 'multiple_choice' | 'text' | 'rating' | 'nps';
  options?: string[];
  required: boolean;
  order: number;
}

export interface SurveyResponses {
  [questionId: string]: string | string[];
}

export interface EvaluatorData {
  nome: string;
  endereco: string;
  telefone: string;
  duvida: string;
}

// ==========================================
// Dashboard NPS Interfaces
// ==========================================

export type PeriodOption = 
  | 'today' 
  | 'yesterday' 
  | '7d' 
  | '30d' 
  | 'this_month' 
  | 'last_month' 
  | 'this_year' 
  | 'custom';

export interface DateRange {
  startDate: string; // ISO String (YYYY-MM-DD)
  endDate: string;   // ISO String (YYYY-MM-DD)
}

export type NpsClassification = 'promoter' | 'neutral' | 'detractor';

export interface DashboardKpis {
  npsScore: number;
  npsPrevious: number;
  npsDiff: number;
  totalSurveys: number;
  totalPrevious: number;
  totalDiffPct: number;
  promotersCount: number;
  promotersPct: number;
  neutralsCount: number;
  neutralsPct: number;
  detractorsCount: number;
  detractorsPct: number;
  surveysToday: number;
}

export interface NpsEvolutionPoint {
  date: string;       // Data no formato YYYY-MM-DD
  label: string;      // Rótulo formatado (ex: "12/08")
  npsScore: number;   // Score NPS (-100 a +100)
  total: number;      // Total de pesquisas no ponto
  promoters: number;
  neutrals: number;
  detractors: number;
}

export interface SurveyVolumePoint {
  date: string;
  label: string;
  total: number;
  npsScore: number;
}

export interface QuestionPerformance {
  questionId: string;
  title: string;
  type: 'rating' | 'multiple_choice' | 'nps' | 'text';
  averageRating?: number;  // 1.0 a 5.0 (para rating)
  positivePct?: number;    // % de 4 e 5 estrelas
  totalResponses: number;
  ratingCounts?: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  choiceCounts?: Record<string, number>;
}

export interface RankingItem {
  id: string;
  title: string;
  scorePct: number;       // Percentual de satisfação/preferência (0 a 100%)
  subtitle: string;
  totalResponses: number;
}

export interface SurveyRow {
  id: string;
  createdAt: string;
  nome?: string;
  npsScore: number;
  npsClassification: NpsClassification;
  equipeRating?: number;
  geralRating?: number;
  hasTextFeedback: boolean;
  respostasCount: number;
}

export interface SurveyAnswerDetail {
  perguntaId: string;
  perguntaTitle: string;
  type: string;
  resposta: any;
}

export interface SurveyDetail {
  id: string;
  createdAt: string;
  nome?: string;
  endereco?: string;
  telefone?: string;
  duvida?: string;
  npsScore?: number;
  npsClassification?: NpsClassification;
  respostas: SurveyAnswerDetail[];
}
