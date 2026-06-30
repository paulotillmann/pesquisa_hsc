export interface Question {
  id: string;
  title: string;
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
