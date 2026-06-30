import { Question } from './types';

export const questions: Question[] = [
  {
    id: 'motivo_escolha',
    title: 'Qual é o seu motivo para nos escolher?',
    type: 'multiple_choice',
    options: [
      'Localização',
      'Reputação do hospital',
      'Decisão médica',
      'Experiência anterior satisfatória',
      'Boa infraestrutura',
      'Indicação de amigos ou familiares',
      'Bom atendimento',
      'Aceita meu plano de saúde'
    ],
    required: true,
    order: 1
  },
  {
    id: 'avaliacao_equipe',
    title: 'Como você avaliaria a equipe multiprofissional que te atendeu durante sua passagem pelo hospital?',
    type: 'rating',
    options: ['Muito insatisfatório', 'Muito satisfatório'],
    required: true,
    order: 2
  },
  {
    id: 'avaliacao_geral',
    title: 'De modo geral, como você avalia o atendimento recebido desde a recepção até a alta hospitalar?',
    type: 'rating',
    options: ['Muito insatisfatório', 'Muito satisfatório'],
    required: true,
    order: 3
  },
  {
    id: 'nps_recomendacao',
    title: 'Em uma escala de 0 a 10, o quanto você recomendaria este hospital a um amigo ou familiar?',
    type: 'nps',
    options: ['Não recomendaria', 'Recomendaria com certeza'],
    required: true,
    order: 4
  },
  {
    id: 'feedback_positivo',
    title: 'O que você mais gostou no nosso atendimento?',
    type: 'text',
    options: ['deixe o seu comentário aqui...'],
    required: false,
    order: 5
  },
  {
    id: 'feedback_negativo',
    title: 'O que podemos melhorar?',
    type: 'text',
    options: ['deixe seu comentário aqui...'],
    required: false,
    order: 6
  }
];
