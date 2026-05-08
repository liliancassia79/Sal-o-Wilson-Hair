import { Star } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const reviews = [
  {
    name: "Carolina Mendes",
    service: "Colorimetria & Mechas",
    text: "Experiência incrível! O Miguel acertou perfeitamente o tom de loiro que eu sempre quis. O salão é maravilhoso e o atendimento é impecável.",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc3Mzk0MzEwMHww&ixlib=rb-4.1.0&q=80&w=200"
  },
  {
    name: "Amanda Costa",
    service: "Esmalteria",
    text: "A Juice é uma excelente profissional! Minhas unhas em gel ficaram perfeitas e duraram muito. Ambiente super aconchegante e luxuoso.",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc3Mzk0MzEwMHww&ixlib=rb-4.1.0&q=80&w=200"
  },
  {
    name: "Beatriz Lima",
    service: "Design de Sobrancelhas",
    text: "O mapeamento facial da Jamili mudou completamente o meu olhar! Saí de lá com a autoestima lá em cima. Recomendo de olhos fechados.",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc3Mzk0MzEwMHww&ixlib=rb-4.1.0&q=80&w=200"
  }
];

export function DarkReviews() {
  return (
    <section className="py-24 px-4 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-[#d4af37] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wide">DEPOIMENTOS</h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-[#d4af37]"></div>
              <Star className="w-6 h-6 text-[#d4af37] fill-[#d4af37]" />
              <div className="h-px w-16 bg-[#d4af37]"></div>
            </div>
            <p className="text-xl text-gray-400">
              A satisfação de quem confia em nosso trabalho
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-8 h-full bg-zinc-900/80 border-zinc-800 hover:border-[#d4af37]/30 transition-colors backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#d4af37]/20">
                    <ImageWithFallback
                      src={review.photo}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{review.name}</h3>
                    <p className="text-[#d4af37] text-sm">{review.service}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                  ))}
                </div>
                
                <p className="text-gray-400 italic leading-relaxed">
                  "{review.text}"
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
