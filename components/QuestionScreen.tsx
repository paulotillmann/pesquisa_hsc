import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, AlertCircle } from 'lucide-react';
import { Question } from '../types';
import { OptionCard } from './OptionCard';
import { ProgressIndicator } from './ProgressIndicator';
import { NavigationButtons } from './NavigationButtons';

interface QuestionScreenProps {
  question: Question;
  selectedOption: string | string[] | undefined;
  onSelectOption: (option: string) => void;
  onCustomTextChange?: (baseOption: string, customText: string) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  selectedOption,
  onSelectOption,
  onCustomTextChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  // Verifica se há alguma resposta selecionada
  const hasResponse = Array.isArray(selectedOption)
    ? selectedOption.length > 0
    : !!selectedOption && typeof selectedOption === 'string' && selectedOption.trim().length > 0;

  // Verifica se a opção "Outro" está marcada
  let isOutroSelected = false;
  let outroCustomText = '';

  if (Array.isArray(selectedOption)) {
    const outroItem = selectedOption.find((opt) => opt.toLowerCase().startsWith('outro'));
    if (outroItem !== undefined) {
      isOutroSelected = true;
      outroCustomText = outroItem.replace(/^Outro:?\s*/i, '');
    }
  } else if (typeof selectedOption === 'string' && selectedOption.toLowerCase().startsWith('outro')) {
    isOutroSelected = true;
    outroCustomText = selectedOption.replace(/^Outro:?\s*/i, '');
  }

  // Se "Outro" estiver selecionado mas vazio, bloqueia o avanço
  const isOutroEmpty = isOutroSelected && outroCustomText.trim().length === 0;

  let isNextDisabled = false;
  if (question.required && !hasResponse) {
    isNextDisabled = true;
  }
  if (isOutroEmpty) {
    isNextDisabled = true;
  }

  const isManyOptions = Boolean(question.options && question.options.length > 6);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-lg md:max-w-xl mx-auto flex flex-col space-y-5 min-h-[72vh] justify-between p-2 sm:p-4"
    >
      {/* Indicador de Progresso */}
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Card da Pergunta */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-full uppercase">
              Pergunta {currentStep} de {totalSteps}
            </span>
            {question.required ? (
              <span className="text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">
                Obrigatória
              </span>
            ) : (
              <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                Opcional
              </span>
            )}
            {question.type === 'multiple_choice' && (
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                Múltipla Escolha
              </span>
            )}
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-snug">
            {question.title}
          </h2>

          {/* Subtítulo / Descrição explicativa da pergunta */}
          {question.description && (
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              {question.description}
            </p>
          )}
        </div>

        {/* Opções de Resposta (Condicional baseado no tipo da pergunta) */}
        <div className="py-2 w-full flex-1 flex flex-col justify-center">
          {question.type === 'rating' ? (
            <div className="w-full py-4 flex flex-col items-center">
              {/* Estrelas */}
              <div className="flex items-center gap-1.5 md:gap-2">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const isSelected = selectedOption 
                    ? parseInt(selectedOption as string, 10) >= starValue 
                    : false;
                  return (
                    <motion.button
                      key={starValue}
                      type="button"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onSelectOption(starValue.toString())}
                      className="text-amber-400 hover:text-amber-500 focus:outline-none cursor-pointer p-1"
                    >
                      <Star
                        className={`w-11 h-11 md:w-13 md:h-13 transition-all duration-150 ${
                          isSelected 
                            ? 'fill-amber-400 stroke-amber-500 scale-105' 
                            : 'fill-transparent stroke-muted-foreground/30'
                        }`}
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* Legendas das pontas */}
              {question.options && question.options.length >= 2 && (
                <div className="flex justify-between w-full text-xs mt-4 font-bold px-2">
                  <span className="max-w-[120px] text-left text-slate-400">1 - {question.options[0]}</span>
                  <span className="max-w-[120px] text-right text-slate-900">5 - {question.options[1]}</span>
                </div>
              )}
            </div>
          ) : question.type === 'nps' ? (
            <div className="w-full py-4 flex flex-col items-center space-y-5">
              {/* Grade NPS (0 a 10) */}
              <div className="grid grid-cols-6 gap-2 md:flex md:justify-between md:gap-1.5 w-full">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
                  const isSelected = selectedOption === val.toString();
                  return (
                    <motion.button
                      key={val}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onSelectOption(val.toString())}
                      className={`w-11 h-11 md:w-10 md:h-10 flex items-center justify-center rounded-full text-sm md:text-base font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-primary-foreground scale-105 shadow-md'
                          : 'bg-slate-50 border border-border text-foreground hover:border-slate-400'
                      }`}
                    >
                      {val}
                    </motion.button>
                  );
                })}
              </div>

              {/* Legendas das pontas */}
              {question.options && question.options.length >= 2 && (
                <div className="flex flex-col space-y-1.5 w-full text-xs font-bold px-1">
                  <span className="text-left text-slate-400">0 - {question.options[0]}</span>
                  <span className="text-left text-slate-900">10 - {question.options[1]}</span>
                </div>
              )}
            </div>
          ) : question.type === 'text' ? (
            <div className="w-full py-2">
              <textarea
                value={(selectedOption as string) || ''}
                onChange={(e) => onSelectOption(e.target.value)}
                placeholder={question.options?.[0] || 'deixe o seu comentário aqui...'}
                className="w-full h-32 md:h-40 p-4 rounded-xl border border-input bg-background text-foreground text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-sm resize-none transition-all"
              />
            </div>
          ) : (
            <div className="space-y-3 w-full">
              <div className={`w-full max-h-[50vh] overflow-y-auto pr-1 ${
                isManyOptions
                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5'
                  : 'space-y-2.5'
              }`}>
                <AnimatePresence mode="popLayout">
                  {question.options?.map((option) => {
                    const isOptionOutro = option.toLowerCase().startsWith('outro');
                    
                    let isSelected = false;
                    if (isOptionOutro) {
                      isSelected = isOutroSelected;
                    } else if (Array.isArray(selectedOption)) {
                      isSelected = selectedOption.includes(option);
                    } else {
                      isSelected = selectedOption === option;
                    }

                    return (
                      <div
                        key={option}
                        className={isOptionOutro && isManyOptions ? 'sm:col-span-2' : ''}
                      >
                        <OptionCard
                          text={option}
                          selected={isSelected}
                          compact={isManyOptions}
                          onClick={() => onSelectOption(option)}
                          customInput={
                            isOptionOutro
                              ? {
                                  value: outroCustomText,
                                  placeholder: 'Descreva o setor ou serviço atendido...',
                                  onChange: (val) => {
                                    if (onCustomTextChange) {
                                      onCustomTextChange(option, val);
                                    }
                                  }
                                }
                              : undefined
                          }
                        />
                      </div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Mensagem de alerta se Outro estiver marcado sem preenchimento */}
              {isOutroEmpty && (
                <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Por favor, descreva o setor no campo &quot;Outro:&quot; para continuar.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navegação */}
        <NavigationButtons
          onNext={onNext}
          onBack={onBack}
          nextDisabled={isNextDisabled}
          nextText="Avançar"
        />
      </div>
    </motion.div>
  );
};

