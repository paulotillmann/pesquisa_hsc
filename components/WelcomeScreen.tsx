import React from 'react';
import { motion } from 'framer-motion';
import pesquisaImg from '../img/pesquisa_branco.png';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-between min-h-[85vh] p-4 text-center space-y-6 w-full max-w-xl mx-auto"
    >
      {/* Imagem Ilustrativa Central (Mockup Completo) */}
      <div className="flex-1 flex flex-col justify-center items-center py-2 w-full h-full">
        <motion.img
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          src={pesquisaImg}
          alt="Pesquisa de Satisfação - Santa Casa de Misericórdia de Araguari"
          className="w-full max-h-[calc(68vh+110px)] md:max-h-[calc(72vh+110px)] object-contain"
        />
      </div>

      {/* Botão de Ação "Quero avaliar" (Branco e Arredondado) */}
      <div className="w-full flex justify-center pt-2 pb-4">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="w-full max-w-[254px] py-3 bg-white text-[#5C090B] text-lg font-bold rounded-full shadow-xl hover:bg-white/95 transition-all cursor-pointer border-none font-sans"
        >
          Quero avaliar
        </motion.button>
      </div>
    </motion.div>
  );
};
