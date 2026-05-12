import { Scissors, Sparkles, Palette, Flower2, Eye, HelpCircle } from "lucide-react";
import { Card } from "../ui/card";
import type { ComponentType, SVGProps } from "react";

interface Service {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const services: Service[] = [
  {
    name: "Cabelos & Tratamentos",
    icon: Scissors
  },
  {
    name: "Colorimetria & Mechas",
    icon: Palette
  },
  {
    name: "Manicure & Pedicure",
    icon: Sparkles
  },
  {
    name: "Design de Sobrancelhas",
    icon: Eye
  },
  {
    name: "Serviços de Estética",
    icon: Flower2
  },
  {
    name: "Dúvidas/Informações",
    icon: HelpCircle
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedService?.name === service.name;

          return (
            <Card
              key={service.name}
              onClick={() => onSelect(service)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(service);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`Selecionar ${service.name}`}
              className={`p-6 cursor-pointer transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                isSelected
                  ? "bg-amber-500/20 border-amber-500 border-2"
                  : "bg-zinc-800 border-zinc-700 hover:border-amber-500/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    isSelected ? "bg-amber-500" : "bg-zinc-700"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${isSelected ? "text-black" : "text-amber-500"}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg text-white mb-1">{service.name}</h4>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
