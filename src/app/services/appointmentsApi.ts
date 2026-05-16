export interface CreateAppointmentRequest {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: number;
  professionalId: number;
  date: string;
  time: string;
}

export interface CreateAppointmentResponse {
  message: string;
  appointment: unknown;

  summary: {
    serviceName: string;
    professionalName: string;
    date: string;
    time: string;
    price: number;
  };

  whatsappMessage: string;
}

export async function createAppointment(
  data: CreateAppointmentRequest
): Promise<CreateAppointmentResponse> {
  const response = await fetch("http://localhost:3000/appointments", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Não foi possível criar o agendamento.");
  }

  return response.json();
}