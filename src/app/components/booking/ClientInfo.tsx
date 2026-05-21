import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { BookingData } from "../BookingFlow";

interface ClientInfoProps {
  data: BookingData;
  onChange: (data: Partial<BookingData>) => void;
}

function validateName(name?: string) {
  const value = name?.trim() || "";

  if (!value) return "Informe seu nome.";
  if (value.length < 3) return "O nome deve ter pelo menos 3 caracteres.";
  if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(value)) {
    return "O nome deve conter apenas letras e espaços.";
  }

  return "";
}

function validatePhone(phone?: string) {
  const value = phone?.trim() || "";
  const digits = value.replace(/\D/g, "");

  if (!value) return "Informe seu telefone.";
  if (digits.length < 10 || digits.length > 11) {
    return "Informe um telefone válido com DDD.";
  }
  if (!/^[0-9+\-\s()]+$/.test(value)) {
    return "O telefone contém caracteres inválidos.";
  }

  return "";
}

function validateEmail(email?: string) {
  const value = email?.trim() || "";

  if (!value) return "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Informe um e-mail válido.";
  }

  return "";
}

function validateNotes(notes?: string) {
  const value = notes?.trim() || "";

  if (value.length > 255) {
    return "As informações adicionais devem ter no máximo 255 caracteres.";
  }

  return "";
}

export function ClientInfo({ data, onChange }: ClientInfoProps) {
  const nameError = validateName(data.clientName);
  const phoneError = validatePhone(data.clientPhone);
  const emailError = validateEmail(data.clientEmail);
  const notesError = validateNotes(data.notes);

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
          {nameError && (
            <p className="text-sm text-red-400 mt-1">{nameError}</p>
          )}
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
            placeholder="(91) 98765-4321"
          />
          {phoneError && (
            <p className="text-sm text-red-400 mt-1">{phoneError}</p>
          )}
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
          {emailError && (
            <p className="text-sm text-red-400 mt-1">{emailError}</p>
          )}
        </div>

        <div>
          <Label htmlFor="notes" className="text-white mb-2 block">
            Dúvidas ou Informações Adicionais (opcional)
          </Label>
          <Textarea
            id="notes"
            value={data.notes || ""}
            onChange={(e) => onChange({ notes: e.target.value })}
            className="bg-zinc-800 border-zinc-700 text-white focus:border-amber-500 min-h-[100px]"
            placeholder="Escreva sua dúvida ou detalhe adicional aqui..."
          />
          {notesError && (
            <p className="text-sm text-red-400 mt-1">{notesError}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function isClientInfoValid(data: BookingData) {
  return (
    !validateName(data.clientName) &&
    !validatePhone(data.clientPhone) &&
    !validateEmail(data.clientEmail) &&
    !validateNotes(data.notes)
  );
}