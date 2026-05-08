import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export function WhatsAppFloat() {
  const phoneNumber = "5591984757953"; 
  const message = encodeURIComponent("Olá! Gostaria de tirar algumas dúvidas.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="absolute w-full h-full rounded-full bg-green-500 opacity-50 animate-ping" style={{ animationDuration: '3s' }}></span>
      
      <MessageCircle className="w-7 h-7 text-white relative z-10" />
      
      <span className="absolute right-full mr-4 bg-zinc-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-zinc-800 shadow-xl">
        Dúvidas? Fale conosco!
        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-zinc-900 border-r border-t border-zinc-800 transform rotate-45 -translate-y-1/2"></div>
      </span>
    </motion.a>
  );
}
