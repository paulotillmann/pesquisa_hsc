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
    id: 'setor_atendimento',
    title: 'Em qual setor/serviço você foi atendido?',
    description: 'Selecione o setor onde você ficou internado, foi atendido ou realizou seu procedimento.',
    type: 'multiple_choice',
    options: [
      'Centro Cirúrgico',
      'Endoscopia/Colonoscopia',
      'Maternidade',
      'Posto 1',
      'Posto 2',
      'Posto 3',
      'Posto 4',
      'Pediatria',
      'Posto 6',
      'Pronto Atendimento',
      'UTI Adulto 1',
      'UTI Adulto 2',
      'UTI Neonatal',
      'Recepção',
      'Tesouraria',
      'Outro:'
    ],
    required: true,
    order: 2
  },
  {
    id: 'avaliacao_equipe',
    title: 'Como você avaliaria a equipe multiprofissional que te atendeu durante sua passagem pelo hospital?',
    type: 'rating',
    options: ['Muito insatisfatório', 'Muito satisfatório'],
    required: true,
    order: 3
  },
  {
    id: 'avaliacao_geral',
    title: 'De modo geral, como você avalia o atendimento recebido desde a recepção até a alta hospitalar?',
    type: 'rating',
    options: ['Muito insatisfatório', 'Muito satisfatório'],
    required: true,
    order: 4
  },
  {
    id: 'nps_recomendacao',
    title: 'Em uma escala de 0 a 10, o quanto você recomendaria este hospital a um amigo ou familiar?',
    type: 'nps',
    options: ['Não recomendaria', 'Recomendaria com certeza'],
    required: true,
    order: 5
  },
  {
    id: 'feedback_negativo',
    title: 'O que podemos melhorar?',
    type: 'text',
    options: ['deixe seu comentário aqui...'],
    required: false,
    order: 6
  },
  {
    id: 'feedback_positivo',
    title: 'O que mais gostou no nosso atendimento?',
    type: 'text',
    options: ['deixe o seu comentário aqui...'],
    required: false,
    order: 7
  }
];
