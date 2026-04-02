import { Card } from "../ui/card";
import { Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface Professional {
  name: string;
  photo: string;
  specialty: string;
  rating: number;
}

const professionals: Professional[] = [
  {
    name: "Wilson Silva",
    photo: "https://images.unsplash.com/photo-1761931403671-d020a14928d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBiYXJiZXIlMjBjdXR0aW5nfGVufDF8fHx8MTc3MzgzNjMyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    specialty: "Especialista em Cortes",
    rating: 5.0
  },
  {
    name: "Carlos Mendes",
    photo: "https://images.unsplash.com/photo-1617690825153-8bb0a8e3c911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGFpcnN0eWxpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM4MzYzMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    specialty: "Barbeiro Profissional",
    rating: 4.9
  },
  {
    name: "Ricardo Costa",
    photo: "https://images.unsplash.com/photo-1600637070413-0798fafbb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWtldXAlMjBhcnRpc3R8ZW58MXx8fHwxNzczNzM2NjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    specialty: "Coloração & Styling",
    rating: 4.8
  }
];

interface ProfessionalSelectionProps {
  selectedProfessional?: Professional;
  onSelect: (professional: Professional) => void;
}

export function ProfessionalSelection({ selectedProfessional, onSelect }: ProfessionalSelectionProps) {
  return (
    <div>
      <h3 className="text-xl text-white mb-6">Escolha o Profissional</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {professionals.map((professional) => {
          const isSelected = selectedProfessional?.name === professional.name;
          
          return (
            <Card
              key={professional.name}
              onClick={() => onSelect(professional)}
              className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                isSelected 
                  ? 'bg-amber-500/20 border-amber-500 border-2' 
                  : 'bg-zinc-800 border-zinc-700 hover:border-amber-500/50'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full overflow-hidden mb-3 ${
                  isSelected ? 'ring-4 ring-amber-500' : ''
                }`}>
                  <ImageWithFallback
                    src={professional.photo}
                    alt={professional.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg text-white mb-1">{professional.name}</h4>
                <p className="text-sm text-gray-400 mb-2">{professional.specialty}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="text-sm text-amber-500">{professional.rating}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
