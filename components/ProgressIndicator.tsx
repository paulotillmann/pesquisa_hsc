import React from 'react';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  const percentage = totalSteps > 0 ? Math.min((currentStep / totalSteps) * 100, 100) : 0;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-xs md:text-sm text-muted-foreground font-semibold px-1">
        <span>Progresso da Pesquisa</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
