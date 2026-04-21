import { Crown } from "lucide-react";
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
            <Crown className="w-8 h-8 text-amber-500" />
            <div className="flex flex-col">
                <span className="text-xl text-white tracking-wider">COMPANHIA DA BELEZA</span>
                <span className="text-xs text-amber-500 tracking-widest">PREMIUM SALON</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-gray-300 hover:text-amber-500 transition-colors">
              Serviços
            </a>
            <a href="#galeria" className="text-gray-300 hover:text-amber-500 transition-colors">
              Galeria
            </a>
            <a href="#contato" className="text-gray-300 hover:text-amber-500 transition-colors">
              Contato
            </a>
            <Button 
              onClick={onBookNow}
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              AGENDAR
            </Button>
          </nav>
          
          {/* Mobile Button */}
          <Button 
            onClick={onBookNow}
            className="md:hidden bg-amber-500 hover:bg-amber-600 text-black text-sm px-6"
          >
            AGENDAR
          </Button>
        </div>
      </div>
    </header>
  );
}
