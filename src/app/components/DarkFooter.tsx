import { Crown } from "lucide-react";

export function DarkFooter() {
  return (
    <footer className="bg-zinc-950 text-white py-12 px-4 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-amber-500" />
            <div className="flex flex-col">
              <span className="text-2xl tracking-wider">WILSON HAIR</span>
              <span className="text-xs text-amber-500 tracking-widest">PREMIUM SALON</span>
            </div>
          </div>
          <p className="text-gray-400 mb-6 max-w-md">
            Excelência em cortes masculinos e tratamentos de beleza. 
            Transformando estilo em arte desde 2015.
          </p>
          <div className="border-t border-zinc-800 pt-6 w-full">
            <p className="text-gray-500 text-sm">
              &copy; 2026 Wilson Hair. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
