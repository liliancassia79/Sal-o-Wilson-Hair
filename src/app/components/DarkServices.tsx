import { Scissors, Sparkles, Palette, Crown } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

const services = [
  {
    icon: Scissors,
    title: "Corte Masculino",
    description: "Cortes modernos e clássicos com técnica profissional",
    price: "R$ 60"
  },
  {
    icon: Crown,
    title: "Barba",
    description: "Tratamento completo de barba com produtos premium",
    price: "R$ 40"
  },
  {
    icon: Sparkles,
    title: "Corte + Barba",
    description: "Combo completo para você ficar impecável",
    price: "R$ 90"
  },
  {
    icon: Palette,
    title: "Coloração",
    description: "Mudança de visual com coloração profissional",
    price: "R$ 120"
  }
];

export function DarkServices() {
  return (
    <section id="servicos" className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wide">NOSSOS SERVIÇOS</h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-amber-500"></div>
            <Scissors className="w-6 h-6 text-amber-500" />
            <div className="h-px w-16 bg-amber-500"></div>
          </div>
          <p className="text-xl text-gray-400">
            Excelência e qualidade em cada atendimento
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-all hover:scale-105 group"
                >
                  <div className="p-6">
                    <div className="bg-amber-500/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                      <Icon className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="text-xl text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
