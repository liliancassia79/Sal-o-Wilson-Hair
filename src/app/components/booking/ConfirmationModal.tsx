import { motion } from "motion/react";
import { CheckCircle, Calendar, Clock, User, Scissors, CreditCard, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import type { BookingData } from "../BookingFlow";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ConfirmationModalProps {
  bookingData: BookingData;
  onClose: () => void;
}

export function ConfirmationModal({ bookingData, onClose }: ConfirmationModalProps) {
  const formattedDate = bookingData.date ? format(new Date(bookingData.date), "dd/MM/yyyy") : "";
  const message = `Olá Wilson Hair! Gostaria de confirmar meu agendamento:
    
*Detalhes do Agendamento:*
💇‍♂️ Serviço: ${bookingData.service?.name}
👤 Profissional: ${bookingData.professional?.name}
📅 Data: ${formattedDate}
⏰ Horário: ${bookingData.time}
💰 Valor: R$ ${bookingData.service?.price}

*Meus Dados:*
Nome: ${bookingData.clientName}
Telefone: ${bookingData.clientPhone}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/5591983590575?text=${encodedMessage}`;

  return (
    <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-zinc-900 rounded-lg w-full max-w-md border border-amber-500/30"
      >
        {/* Success Icon */}
        <div className="p-8 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/20 mb-4"
          >
            <CheckCircle className="w-12 h-12 text-amber-500" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-white mb-2"
          >
            Quase lá!
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400"
          >
            Envie os dados para o nosso WhatsApp para confirmar
          </motion.p>
        </div>

        {/* Booking Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="px-8 pb-8 space-y-4"
        >
          <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3 text-white">
              <Scissors className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-sm text-gray-400">Serviço</p>
                <p className="font-medium">{bookingData.service?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white">
              <User className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-sm text-gray-400">Profissional</p>
                <p className="font-medium">{bookingData.professional?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white">
              <Calendar className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-sm text-gray-400">Data</p>
                <p className="font-medium">
                  {bookingData.date && format(new Date(bookingData.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white">
              <Clock className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-sm text-gray-400">Horário</p>
                <p className="font-medium">{bookingData.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white pt-3 border-t border-zinc-700">
              <CreditCard className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-sm text-gray-400">Valor</p>
                <p className="font-medium text-amber-500">R$ {bookingData.service?.price}</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-400 text-center">
            Finalize o agendamento enviando os dados para a nossa recepção via WhatsApp.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={whatsappUrl}
              target="_top"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar para WhatsApp
            </a>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-zinc-700 text-white hover:bg-zinc-800"
            >
              Fechar
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}