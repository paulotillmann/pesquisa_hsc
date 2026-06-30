import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { EvaluatorDataScreen } from './components/EvaluatorDataScreen';
import { ThankYouScreen } from './components/ThankYouScreen';
import { questions } from './questions';
import { SurveyResponses, EvaluatorData } from './types';
import { supabase } from './lib/supabase';

const RESPONSES_KEY = 'hsc_survey_responses';
const EVALUATOR_KEY = 'hsc_survey_evaluator';
const STEP_KEY = 'hsc_survey_step';

const initialEvaluatorState: EvaluatorData = {
  nome: '',
  endereco: '',
  telefone: '',
  duvida: ''
};

const App: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Inicialização de estado a partir do sessionStorage para persistência
  const [step, setStep] = useState<number>(() => {
    const savedStep = sessionStorage.getItem(STEP_KEY);
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  const [responses, setResponses] = useState<SurveyResponses>(() => {
    const savedResponses = sessionStorage.getItem(RESPONSES_KEY);
    return savedResponses ? JSON.parse(savedResponses) : {};
  });

  const [evaluatorData, setEvaluatorData] = useState<EvaluatorData>(() => {
    const savedEvaluator = sessionStorage.getItem(EVALUATOR_KEY);
    return savedEvaluator ? JSON.parse(savedEvaluator) : initialEvaluatorState;
  });

  // Efeitos para persistir dados no sessionStorage a cada alteração
  useEffect(() => {
    sessionStorage.setItem(STEP_KEY, step.toString());
  }, [step]);

  useEffect(() => {
    sessionStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));
  }, [responses]);

  useEffect(() => {
    sessionStorage.setItem(EVALUATOR_KEY, JSON.stringify(evaluatorData));
  }, [evaluatorData]);

  // Navegação
  const handleStart = () => {
    setStep(1);
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    // Limpar armazenamento temporário
    sessionStorage.removeItem(STEP_KEY);
    sessionStorage.removeItem(RESPONSES_KEY);
    sessionStorage.removeItem(EVALUATOR_KEY);
    
    // Resetar estados
    setStep(0);
    setResponses({});
    setEvaluatorData(initialEvaluatorState);
  };

  const handleSelectOption = (questionId: string, option: string) => {
    const question = questions.find((q) => q.id === questionId);
    const isMultiple = question?.type === 'multiple_choice';

    setResponses((prev) => {
      const currentResponse = prev[questionId];
      
      if (isMultiple) {
        const currentArray = Array.isArray(currentResponse)
          ? currentResponse
          : currentResponse
            ? [currentResponse]
            : [];
            
        const newArray = currentArray.includes(option)
          ? currentArray.filter((o) => o !== option)
          : [...currentArray, option];
          
        return {
          ...prev,
          [questionId]: newArray
        };
      } else {
        return {
          ...prev,
          [questionId]: option
        };
      }
    });
  };

  const handleSendSurvey = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Gerar UUID para o respondente no lado do cliente para evitar a necessidade
      // de fazer um .select() sob RLS público (o que violaria as restrições de leitura).
      const respondenteId = crypto.randomUUID();

      // 1. Salvar os dados do respondente
      const { error: respondentError } = await supabase
        .from('pesquisa_respondentes')
        .insert([
          {
            id: respondenteId,
            nome: evaluatorData.nome.trim() ? evaluatorData.nome.trim() : 'NÃO INFORMADO',
            endereco: evaluatorData.endereco.trim() ? evaluatorData.endereco.trim() : null,
            telefone: evaluatorData.telefone.trim() ? evaluatorData.telefone.trim() : null,
            duvida: evaluatorData.duvida.trim() ? evaluatorData.duvida.trim() : null
          }
        ]);

      if (respondentError) {
        throw respondentError;
      }

      // 2. Mapear respostas acumuladas para a tabela pesquisa_respostas
      const respostasToInsert = Object.entries(responses).map(([questionId, value]) => ({
        respondente_id: respondenteId,
        pergunta_id: questionId,
        resposta: value
      }));

      // Salvar respostas em lote se houver alguma
      if (respostasToInsert.length > 0) {
        const { error: respostasError } = await supabase
          .from('pesquisa_respostas')
          .insert(respostasToInsert);

        if (respostasError) {
          throw respostasError;
        }
      }

      // Sucesso: limpar armazenamento temporário
      sessionStorage.removeItem(STEP_KEY);
      sessionStorage.removeItem(RESPONSES_KEY);
      sessionStorage.removeItem(EVALUATOR_KEY);
      
      // Resetar estados
      setResponses({});
      setEvaluatorData(initialEvaluatorState);
      
      handleNext();
    } catch (error: any) {
      console.error('Erro ao salvar pesquisa no Supabase:', error);
      setSubmitError(
        error.message || 'Houve um erro ao enviar suas respostas. Por favor, tente novamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = questions.length + 1; // Perguntas + Identificação

  return (
    <div className={`flex flex-col min-h-screen w-full items-center justify-center p-4 md:p-6 transition-colors duration-500 text-slate-800 antialiased selection:bg-primary/20 ${
      step === 0 ? 'bg-[#5C090B]' : 'bg-slate-50'
    }`}>
      <div className="w-full max-w-xl bg-transparent rounded-2xl overflow-hidden py-2">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <WelcomeScreen key="welcome" onStart={handleStart} />
          )}

          {step > 0 && step <= questions.length && (() => {
            const currentQuestion = questions[step - 1];
            return (
              <QuestionScreen
                key={`q-${currentQuestion.id}`}
                question={currentQuestion}
                selectedOption={responses[currentQuestion.id]}
                onSelectOption={(opt) => handleSelectOption(currentQuestion.id, opt)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={step}
                totalSteps={totalSteps}
              />
            );
          })()}

          {step === questions.length + 1 && (
            <div className="w-full">
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs md:text-sm text-center font-semibold mb-3 mx-4">
                  {submitError}
                </div>
              )}
              <EvaluatorDataScreen
                key="evaluator"
                data={evaluatorData}
                onChange={setEvaluatorData}
                onNext={handleSendSurvey}
                onBack={handleBack}
                currentStep={step}
                totalSteps={totalSteps}
                isSubmitting={isSubmitting}
              />
            </div>
          )}

          {step === questions.length + 2 && (
            <ThankYouScreen key="thankyou" onReset={handleReset} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;