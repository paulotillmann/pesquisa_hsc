import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface OptionCardProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({ text, selected, onClick }) => {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between shadow-sm cursor-pointer ${
        selected
          ? 'bg-primary/5 border-primary text-primary font-medium'
          : 'bg-white border-border hover:border-muted-foreground/30 text-foreground'
      }`}
    >
      <span className="text-base md:text-lg leading-relaxed">{text}</span>
      <div
        className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
          selected
            ? 'bg-primary border-primary text-white'
            : 'border-muted-foreground/30 bg-transparent'
        }`}
      >
        {selected && <Check className="w-4 h-4 stroke-[3]" />}
      </div>
    </motion.button>
  );
};
