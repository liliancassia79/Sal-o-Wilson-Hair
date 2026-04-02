import { Scissors, Sparkles, Palette, Crown } from "lucide-react";
import { Card } from "../ui/card";

interface Service {
  name: string;
  price: number;
  duration: number;
  icon: typeof Scissors;
}

const services: Service[] = [
  {
    name: "Corte Masculino",
    price: 60,
    duration: 45,
    icon: Scissors
  },
  {
    name: "Barba",
    price: 40,
    duration: 30,
    icon: Crown
  },
  {
    name: "Corte + Barba",
    price: 90,
    duration: 60,
    icon: Sparkles
  },
  {
    name: "Coloração",
    price: 120,
    duration: 90,
    icon: Palette
  }
];

interface ServiceSelectionProps {
  selectedService?: Service;
  onSelect: (service: Service) => void;
}

export function ServiceSelection({ selectedService, onSelect }: ServiceSelectionProps) {
  return (
    <div>
      <h3 className="text-xl text-white mb-6">Escolha o Serviço</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedService?.name === service.name;
          
          return (
            <Card
              key={service.name}
              onClick={() => onSelect(service)}
              className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                isSelected 
                  ? 'bg-amber-500/20 border-amber-500 border-2' 
                  : 'bg-zinc-800 border-zinc-700 hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  isSelected ? 'bg-amber-500' : 'bg-zinc-700'
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-black' : 'text-amber-500'}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg text-white mb-1">{service.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>R$ {service.price}</span>
                    <span>•</span>
                    <span>{service.duration} min</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
