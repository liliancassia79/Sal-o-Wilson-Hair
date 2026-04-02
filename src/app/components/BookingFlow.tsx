import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, Check } from "lucide-react";
import { Button } from "./ui/button";
import { ServiceSelection } from "./booking/ServiceSelection";
import { ProfessionalSelection } from "./booking/ProfessionalSelection";
import { DateTimeSelection } from "./booking/DateTimeSelection";
import { ClientInfo } from "./booking/ClientInfo";
import { ConfirmationModal } from "./booking/ConfirmationModal";

interface BookingFlowProps {
  onClose: () => void;
}

export interface BookingData {
  service?: {
    name: string;
    price: number;
    duration: number;
  };
  professional?: {
    name: string;
    photo: string;
  };
  date?: string;
  time?: string;
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
}

const steps = [
  { id: 1, name: "Serviço" },
  { id: 2, name: "Profissional" },
  { id: 3, name: "Data & Hora" },
  { id: 4, name: "Seus Dados" }
];

export function BookingFlow({ onClose }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData({ ...bookingData, ...data });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!bookingData.service;
      case 2:
        return !!bookingData.professional;
      case 3:
        return !!bookingData.date && !!bookingData.time;
      case 4:
        return !!bookingData.clientName && !!bookingData.clientPhone;
      default:
        return false;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-zinc-900 rounded-lg w-full max-w-4xl my-8">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <h2 className="text-2xl text-white">Novo Agendamento</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stepper */}
          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep > step.id 
                        ? 'bg-amber-500 border-amber-500' 
                        : currentStep === step.id
                        ? 'border-amber-500 text-amber-500'
                        : 'border-zinc-700 text-zinc-600'
                    }`}>
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5 text-black" />
                      ) : (
                        <span className="text-sm">{step.id}</span>
                      )}
                    </div>
                    <span className={`text-sm mt-2 hidden sm:block ${
                      currentStep >= step.id ? 'text-white' : 'text-zinc-600'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 ${
                      currentStep > step.id ? 'bg-amber-500' : 'bg-zinc-800'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[400px]">
            {currentStep === 1 && (
              <ServiceSelection 
                selectedService={bookingData.service}
                onSelect={(service) => updateBookingData({ service })}
              />
            )}
            {currentStep === 2 && (
              <ProfessionalSelection 
                selectedProfessional={bookingData.professional}
                onSelect={(professional) => updateBookingData({ professional })}
              />
            )}
            {currentStep === 3 && (
              <DateTimeSelection 
                selectedDate={bookingData.date}
                selectedTime={bookingData.time}
                onSelectDate={(date) => updateBookingData({ date })}
                onSelectTime={(time) => updateBookingData({ time })}
              />
            )}
            {currentStep === 4 && (
              <ClientInfo 
                data={bookingData}
                onChange={updateBookingData}
              />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-zinc-800">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentStep === 1}
              className="border-zinc-700 text-white hover:bg-zinc-800 disabled:opacity-50"
            >
              Voltar
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-amber-500 hover:bg-amber-600 text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 4 ? 'Confirmar' : 'Próximo'}
            </Button>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationModal 
          bookingData={bookingData}
          onClose={() => {
            setShowConfirmation(false);
            onClose();
          }}
        />
      )}
    </>
  );
}