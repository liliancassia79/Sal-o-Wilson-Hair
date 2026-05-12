import { Crown, Calendar } from "lucide-react";
import { Button } from "./ui/button";

interface DarkHeaderProps {
  onBookNow: () => void;
}

export function DarkHeader({ onBookNow }: DarkHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-[#d4af37] shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base md:text-lg text-white tracking-[0.05em] font-medium leading-tight mb-0.5 truncate max-w-[150px] sm:max-w-full">CIA DA BELEZA</span>
              <span className="text-[9px] sm:text-[10px] text-[#d4af37] tracking-widest leading-none truncate max-w-[150px] sm:max-w-full">CABELO E ESMALTERIA</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-gray-300 hover:text-[#d4af37] transition-colors">
              Serviços
            </a>
            <a href="#galeria" className="text-gray-300 hover:text-[#d4af37] transition-colors">
              Galeria
            </a>
            <a href="#contato" className="text-gray-300 hover:text-[#d4af37] transition-colors">
              Contato
            </a>
            <Button 
              onClick={onBookNow}
              className="bg-[#d4af37] hover:bg-[#b5952f] text-black flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              AGENDAR HORÁRIO
            </Button>
          </nav>
          
          {/* Mobile Button */}
          <Button 
            onClick={onBookNow}
            className="md:hidden bg-[#d4af37] hover:bg-[#b5952f] text-black text-[10px] sm:text-xs px-3 sm:px-4 h-9 font-medium whitespace-nowrap ml-2 flex items-center gap-1.5"
          >
            <Calendar className="w-3 h-3" />
            AGENDAR HORÁRIO
          </Button>
        </div>
      </div>
    </header>
  );
}
