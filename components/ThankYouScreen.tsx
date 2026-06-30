import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RefreshCw } from 'lucide-react';
import logoSantaCasa from '../img/logo_santa_casa.png';

interface ThankYouScreenProps {
  onReset: () => void;
}

export const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ onReset }) => {
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onReset();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onReset]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-between min-h-[70vh] p-6 text-center space-y-6 max-w-md mx-auto"
    >
      {/* Cabeçalho com Logo */}
      <div className="space-y-4">
        <img
          src={logoSantaCasa}
          alt="Hospital Santa Casa de Misericórdia de Araguari"
          className="h-16 mx-auto object-contain animate-pulse"
        />
        <div className="h-0.5 w-16 bg-primary mx-auto rounded-full" />
      </div>

      {/* Conteúdo Central */}
      <div className="space-y-6 py-4 flex-1 flex flex-col justify-center items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-24 h-24 flex items-center justify-center bg-red-50 text-[#5c090b] rounded-full shadow-inner border border-red-100"
        >
          <Heart className="w-12 h-12 fill-current animate-beat" />
        </motion.div>

        <div className="space-y-3">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Agradecemos por dedicar seu tempo para responder à nossa pesquisa.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed px-4">
            Sua opinião é essencial para aprimorarmos continuamente o cuidado e o acolhimento que oferecemos a cada paciente.
          </p>
        </div>
      </div>

      {/* Rodapé com Contador e Botão de Reset */}
      <div className="w-full space-y-4 pt-4">
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground font-semibold">
          <RefreshCw className="w-4 h-4 animate-spin [animation-duration:8s]" />
          <span>Reiniciando pesquisa em {countdown} segundos...</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="w-full py-4 bg-secondary text-secondary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-secondary/90 transition-all cursor-pointer border border-border"
        >
          Responder novamente
        </motion.button>
      </div>
    </motion.div>
  );
};
