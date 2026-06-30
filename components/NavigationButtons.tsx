import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface NavigationButtonsProps {
  onNext: () => void;
  onBack?: () => void;
  nextText?: string;
  backText?: string;
  nextDisabled?: boolean;
  isSubmitting?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onBack,
  nextText = 'Avançar',
  backText = 'Voltar',
  nextDisabled = false,
  isSubmitting = false
}) => {
  return (
    <div className="flex items-center justify-between w-full mt-6 pt-4 border-t border-border">
      {onBack ? (
        <div className="flex flex-col items-center gap-1">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            disabled={isSubmitting}
            className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow transition-all duration-200 cursor-pointer shrink-0"
            aria-label={backText}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {backText}
          </span>
        </div>
      ) : (
        <div className="w-[45px] h-[45px] shrink-0" />
      )}

      <div className="flex flex-col items-center gap-1">
        <motion.button
          type="button"
          whileTap={{ scale: nextDisabled || isSubmitting ? 1 : 0.95 }}
          onClick={onNext}
          disabled={nextDisabled || isSubmitting}
          className={`w-[45px] h-[45px] flex items-center justify-center rounded-full shadow transition-all duration-200 cursor-pointer shrink-0 ${
            nextDisabled || isSubmitting
              ? 'bg-muted text-muted-foreground border border-border cursor-not-allowed shadow-none'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
          aria-label={nextText}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          )}
        </motion.button>
        <span
          className={`text-[11px] font-bold uppercase tracking-wider ${
            nextDisabled || isSubmitting
              ? 'text-muted-foreground/40'
              : 'text-muted-foreground'
          }`}
        >
          {isSubmitting ? 'Enviando' : nextText}
        </span>
      </div>
    </div>
  );
};
