import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { Question } from '../types';
import { OptionCard } from './OptionCard';
import { ProgressIndicator } from './ProgressIndicator';
import { NavigationButtons } from './NavigationButtons';

interface QuestionScreenProps {
  question: Question;
  selectedOption: string | string[] | undefined;
  onSelectOption: (option: string) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  selectedOption,
  onSelectOption,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  const hasResponse = Array.isArray(selectedOption)
    ? selectedOption.length > 0
    : !!selectedOption;

  const isNextDisabled = question.required && !hasResponse;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-md mx-auto flex flex-col space-y-6 min-h-[70vh] justify-between p-4"
    >
      {/* Indicador de Progresso */}
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Card da Pergunta */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
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
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
            {question.title}
          </h2>
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
                        className={`w-12 h-12 md:w-14 md:h-14 transition-all duration-150 ${
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
              <AnimatePresence mode="popLayout">
                {question.options?.map((option) => (
                  <OptionCard
                    key={option}
                    text={option}
                    selected={
                      Array.isArray(selectedOption)
                        ? selectedOption.includes(option)
                        : selectedOption === option
                    }
                    onClick={() => onSelectOption(option)}
                  />
                ))}
              </AnimatePresence>
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
