import { apiFetch } from "./api";

export interface Professional {
  id: number;
  name: string;
  photo: string;
  specialty: string;
  rating: number;
  whatsappPhone: string;
}

interface AvailableTimesResponse {
  date: string;
  professionalId: number;
  availableTimes: string[];
  blocked: boolean;
  reason?: string;
}

export async function getProfessionalsByService(
  serviceId: number
): Promise<Professional[]> {
  return apiFetch<Professional[]>(`/services/${serviceId}/professionals`);
}

export async function getAvailableTimesByProfessional(
  professionalId: number,
  date: string
): Promise<AvailableTimesResponse> {
  return apiFetch<AvailableTimesResponse>(
    `/professionals/${professionalId}/available-times?date=${date}`
  );
}