import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Card } from "../ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00"
];

interface DateTimeSelectionProps {
  selectedDate?: string;
  selectedTime?: string;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}

export function DateTimeSelection({ 
  selectedDate, 
  selectedTime, 
  onSelectDate, 
  onSelectTime 
}: DateTimeSelectionProps) {
  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      onSelectDate(format(newDate, "yyyy-MM-dd"));
    }
  };

  return (
    <div>
      <h3 className="text-xl text-white mb-6">Escolha Data e Horário</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
          <style>{`
            .rdp {
              --rdp-accent-color: #f59e0b;
              --rdp-background-color: rgba(245, 158, 11, 0.1);
            }
            .rdp-day_button {
              color: white;
            }
            .rdp-day_button:hover {
              background-color: rgba(245, 158, 11, 0.2);
            }
            .rdp-caption_label {
              color: white;
            }
            .rdp-weekday {
              color: #9ca3af;
            }
            .rdp-day_outside {
              color: #4b5563;
            }
          `}</style>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date()}
            locale={ptBR}
            className="text-white"
          />
        </div>

        {/* Time Slots */}
        <div>
          <h4 className="text-white mb-4">
            {selectedDate ? format(new Date(selectedDate), "dd 'de' MMMM", { locale: ptBR }) : "Selecione uma data"}
          </h4>
          <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;
              
              return (
                <Card
                  key={time}
                  onClick={() => onSelectTime(time)}
                  className={`p-3 cursor-pointer text-center transition-all hover:scale-105 ${
                    isSelected 
                      ? 'bg-amber-500 border-amber-500 text-black' 
                      : 'bg-zinc-800 border-zinc-700 text-white hover:border-amber-500/50'
                  }`}
                >
                  {time}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}