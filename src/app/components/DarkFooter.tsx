import { Crown } from "lucide-react";
import { Link } from "react-router";

export function DarkFooter() {
  return (
    <footer className="bg-zinc-950 text-white py-12 px-4 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-[#d4af37]" />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl tracking-[0.05em] text-white">CIA DA BELEZA</span>
              <span className="text-xs text-[#d4af37] tracking-widest mt-1">CABELO E ESMALTERIA</span>
            </div>
          </div>
          <p className="text-gray-400 mb-6 max-w-md">
            Excelência em cabelos, mechas e esmalteria. 
            Transformando estilo em arte desde 2015.
          </p>
          <div className="border-t border-zinc-800 pt-6 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; 2026 Cia da Beleza - Cabelo e Esmalteria. Todos os direitos reservados.
            </p>
            <Link to="/admin" className="text-gray-700 hover:text-gray-400 text-xs transition-colors">
              Área Restrita
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
