import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, HelpCircle, ShieldCheck } from 'lucide-react';
import { EvaluatorData } from '../types';
import { ProgressIndicator } from './ProgressIndicator';
import { NavigationButtons } from './NavigationButtons';

interface EvaluatorDataScreenProps {
  data: EvaluatorData;
  onChange: (data: EvaluatorData) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  isSubmitting?: boolean;
}

export const EvaluatorDataScreen: React.FC<EvaluatorDataScreenProps> = ({
  data,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  isSubmitting = false
}) => {
  const handleInputChange = (field: keyof EvaluatorData, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTelefone(e.target.value);
    handleInputChange('telefone', formatted);
  };

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

      {/* Card do Formulário */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-full uppercase">
              Etapa {currentStep} de {totalSteps}
            </span>
            <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Opcional e Sigiloso
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg md:text-xl font-bold text-foreground leading-snug">
              Compartilhe seus dados e nossa equipe entrará em contato para esclarecer qualquer dúvida sobre sua experiência.
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Se preferir, não é necessário se identificar. Garantimos que sua opinião será usada exclusivamente para aprimorar nossos serviços.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 py-2 w-full">
          {/* Nome completo */}
          <div className="space-y-1.5">
            <label htmlFor="nome" className="text-sm font-semibold text-muted-foreground">
              Nome Completo
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground/60">
                <User className="w-5 h-5" />
              </span>
              <input
                id="nome"
                type="text"
                value={data.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                disabled={isSubmitting}
                placeholder="Ex: Maria de Souza"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm outline-none disabled:opacity-60"
              />
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-1.5">
            <label htmlFor="endereco" className="text-sm font-semibold text-muted-foreground">
              Endereço
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground/60">
                <MapPin className="w-5 h-5" />
              </span>
              <input
                id="endereco"
                type="text"
                value={data.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                disabled={isSubmitting}
                placeholder="Rua, Número, Bairro - Cidade"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm outline-none disabled:opacity-60"
              />
            </div>
          </div>

          {/* Telefone/WhatsApp */}
          <div className="space-y-1.5">
            <label htmlFor="telefone" className="text-sm font-semibold text-muted-foreground">
              Telefone / WhatsApp
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground/60">
                <Phone className="w-5 h-5" />
              </span>
              <input
                id="telefone"
                type="tel"
                maxLength={15}
                value={data.telefone}
                onChange={handlePhoneChange}
                disabled={isSubmitting}
                placeholder="Ex: (34) 99999-9999"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm outline-none disabled:opacity-60"
              />
            </div>
          </div>

          {/* Deixe sua dúvida aqui... */}
          <div className="space-y-1.5">
            <label htmlFor="duvida" className="text-sm font-semibold text-muted-foreground">
              Deixe sua dúvida aqui...
            </label>
            <div className="relative">
              <span className="absolute top-3.5 left-3.5 pointer-events-none text-muted-foreground/60">
                <HelpCircle className="w-5 h-5" />
              </span>
              <textarea
                id="duvida"
                value={data.duvida}
                onChange={(e) => handleInputChange('duvida', e.target.value)}
                disabled={isSubmitting}
                placeholder="Escreva aqui se tiver alguma dúvida ou comentário..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-sm resize-none h-24 transition-all disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Botões de Navegação */}
        <NavigationButtons
          onNext={onNext}
          onBack={onBack}
          nextText="Enviar Pesquisa"
          isSubmitting={isSubmitting}
        />
      </div>
    </motion.div>
  );
};
