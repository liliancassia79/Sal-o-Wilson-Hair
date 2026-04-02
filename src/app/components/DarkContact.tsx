import { MapPin, Phone, Clock, Instagram, Facebook, Mail, Scissors } from "lucide-react";

export function DarkContact() {
  return (
    <section id="contato" className="py-20 px-4 bg-black border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wide">CONTATO</h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-amber-500"></div>
            <Scissors className="w-6 h-6 text-amber-500" />
            <div className="h-px w-16 bg-amber-500"></div>
          </div>
          <p className="text-xl text-gray-400">
            Visite-nos ou entre em contato
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <div className="flex flex-col items-center text-center">
              <div className="bg-amber-500/10 p-4 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl text-white mb-2">Endereço</h3>
              <p className="text-gray-400">
                Rua da Moda, 456<br />
                Centro - São Paulo, SP
              </p>
            </div>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <div className="flex flex-col items-center text-center">
              <div className="bg-amber-500/10 p-4 rounded-full mb-4">
                <Phone className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl text-white mb-2">Telefone</h3>
              <p className="text-gray-400 mb-3">(11) 98765-4321</p>
              <div className="flex gap-3">
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <div className="flex flex-col items-center text-center">
              <div className="bg-amber-500/10 p-4 rounded-full mb-4">
                <Clock className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl text-white mb-2">Horário</h3>
              <p className="text-gray-400">
                Seg - Sex: 9h às 20h<br />
                Sábado: 9h às 18h<br />
                Domingo: Fechado
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
