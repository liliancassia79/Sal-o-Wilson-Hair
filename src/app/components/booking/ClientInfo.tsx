import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { BookingData } from "../BookingFlow";

interface ClientInfoProps {
  data: BookingData;
  onChange: (data: Partial<BookingData>) => void;
}

export function ClientInfo({ data, onChange }: ClientInfoProps) {
  return (
    <div>
      <h3 className="text-xl text-white mb-6">Seus Dados</h3>
      <div className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="name" className="text-white mb-2 block">
            Nome Completo *
          </Label>
          <Input
            id="name"
            value={data.clientName || ""}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="bg-zinc-800 border-zinc-700 text-white focus:border-amber-500"
            placeholder="Digite seu nome"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-white mb-2 block">
            Telefone *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={data.clientPhone || ""}
            onChange={(e) => onChange({ clientPhone: e.target.value })}
            className="bg-zinc-800 border-zinc-700 text-white focus:border-amber-500"
            placeholder="(11) 98765-4321"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-white mb-2 block">
            Email (opcional)
          </Label>
          <Input
            id="email"
            type="email"
            value={data.clientEmail || ""}
            onChange={(e) => onChange({ clientEmail: e.target.value })}
            className="bg-zinc-800 border-zinc-700 text-white focus:border-amber-500"
            placeholder="seu@email.com"
          />
        </div>
      </div>
    </div>
  );
}
