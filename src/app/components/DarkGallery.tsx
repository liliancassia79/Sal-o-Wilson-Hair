import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Scissors } from "lucide-react";

const galleryImages = [
  "https://images.unsplash.com/photo-1761931403671-d020a14928d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBiYXJiZXIlMjBjdXR0aW5nfGVufDF8fHx8MTc3MzgzNjMyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1578951395970-4deb0f6833ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXJiZXJzaG9wJTIwZGFya3xlbnwxfHx8fDE3NzM4MzYzMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1617690825153-8bb0a8e3c911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGFpcnN0eWxpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM4MzYzMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1763048208932-cbe149724374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGluZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzM3MzcwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1659391542239-9648f307c0b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZSUyMG5haWxzJTIwcG9saXNofGVufDF8fHx8MTc3MzgzMzI3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1712213396688-c6f2d536671f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwY29sb3JpbmclMjBzYWxvbnxlbnwxfHx8fDE3NzM3MzY0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
];

export function DarkGallery() {
  return (
    <section id="galeria" className="py-20 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wide">GALERIA</h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-amber-500"></div>
            <Scissors className="w-6 h-6 text-amber-500" />
            <div className="h-px w-16 bg-amber-500"></div>
          </div>
          <p className="text-xl text-gray-400">
            Nossos melhores trabalhos
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg group cursor-pointer aspect-square"
            >
              <ImageWithFallback
                src={image}
                alt={`Trabalho ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
