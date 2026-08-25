import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface OptionCardProps {
  text: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
  customInput?: {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
  };
}

export const OptionCard: React.FC<OptionCardProps> = ({
  text,
  selected,
  onClick,
  compact = false,
  customInput
}) => {
  return (
    <div className="w-full">
      <motion.button
        type="button"
        whileTap={{ scale: 0.99 }}
        whileHover={{ scale: 1.01 }}
        onClick={onClick}
        className={`w-full text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between shadow-xs cursor-pointer ${
          compact ? 'p-3 text-sm' : 'p-3.5 md:p-4 text-base'
        } ${
          selected
            ? 'bg-primary/5 border-primary text-primary font-semibold ring-1 ring-primary/20'
            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
        }`}
      >
        <span className={`${compact ? 'text-xs md:text-sm' : 'text-sm md:text-base'} leading-snug font-medium`}>
          {text}
        </span>
        <div
          className={`${compact ? 'w-5 h-5' : 'w-6 h-6'} rounded-full border flex items-center justify-center shrink-0 ml-2 transition-all ${
            selected
              ? 'bg-primary border-primary text-white scale-105'
              : 'border-slate-300 bg-transparent'
          }`}
        >
          {selected && <Check className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} stroke-[3]`} />}
        </div>
      </motion.button>

      {selected && customInput && (
        <motion.div
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            value={customInput.value}
            onChange={(e) => customInput.onChange(e.target.value)}
            placeholder={customInput.placeholder || 'Especifique o setor ou serviço...'}
            autoFocus
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-primary/50 bg-white text-slate-800 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-xs transition-all placeholder:text-slate-400"
          />
        </motion.div>
      )}
    </div>
  );
};

