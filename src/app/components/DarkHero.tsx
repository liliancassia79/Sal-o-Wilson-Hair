import { Button } from "./ui/button";
import { Scissors, Crown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface DarkHeroProps {
  onBookNow: () => void;
}

export function DarkHero({ onBookNow }: DarkHeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1578951395970-4deb0f6833ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXJiZXJzaG9wJTIwZGFya3xlbnwxfHx8fDE3NzM4MzYzMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Wilson Hair Salon"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex items-center justify-center mb-6"
        >
          <Crown className="w-16 h-16 text-amber-400" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-8xl mb-4 tracking-wider"
        >
          WILSON HAIR
        </motion.h1>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-16 bg-amber-400"></div>
          <Scissors className="w-6 h-6 text-amber-400" />
          <div className="h-px w-16 bg-amber-400"></div>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl mb-12 text-gray-300 tracking-wide"
        >
          Excelência em Cortes & Beleza Masculina
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button 
            onClick={onBookNow}
            size="lg" 
            className="bg-amber-500 hover:bg-amber-600 text-black text-lg px-12 py-7 tracking-wide"
          >
            AGENDAR HORÁRIO
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}