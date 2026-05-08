import { motion } from "motion/react";
import heroImage from "../../assets/recortelogo2.png";

interface DarkHeroProps {
  onBookNow: () => void;
}

export function DarkHero({ onBookNow }: DarkHeroProps) {
  return (
    <section className="relative h-screen flex flex-col items-center justify-end pb-12 overflow-hidden bg-black pt-20">
      <div className="absolute inset-0 pt-20 overflow-hidden">
        <img
          src={heroImage}
          alt="Companhia da Beleza Salon"
          className="w-full h-full object-contain p-4 md:p-8 brightness-125 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}