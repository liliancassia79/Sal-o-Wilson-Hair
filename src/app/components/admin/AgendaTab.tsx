import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { CalendarDays, Plus, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

export function AgendaTab() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("starts_at", { ascending: true });
    
    if (error) toast.error("Erro ao buscar agendamentos");
    else setAppointments(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja cancelar/remover este agendamento?")) return;
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) toast.error("Erro ao remover: " + error.message);
    else {
      toast.success("Agendamento removido");
      fetchAppointments();
    }
  };

  const grouped = appointments.reduce((acc, appt) => {
    const day = appt.starts_at ? format(parseISO(appt.starts_at), "yyyy-MM-dd") : "Sem Data";
    if (!acc[day]) acc[day] = [];
    acc[day].push(appt);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-serif mb-1">Agenda</h2>
          <p className="text-neutral-400 text-sm">Gerencie os agendamentos do salão</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Agendamento
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
          <NewAppointmentForm onSuccess={() => { setShowForm(false); fetchAppointments(); }} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-neutral-400">Carregando agenda...</div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="text-center py-12 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400">
          <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Nenhum agendamento encontrado.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([day, items]) => (
            <div key={day}>
              <h3 className="text-lg font-medium text-amber-500 mb-3 border-b border-neutral-800 pb-2">
                {day === "Sem Data" ? day : format(parseISO(day), "EEEE, dd 'de' MMMM", { locale: ptBR })}
              </h3>
              <div className="grid gap-3">
                {items.map((appt) => (
                  <div key={appt.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">{appt.client_name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${
                          appt.status === 'confirmado' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                          appt.status === 'agendado' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                          'bg-neutral-800 text-neutral-400 border-neutral-700'
                        }`}>
                          {appt.status || 'agendado'}
                        </span>
                        {appt.origin === 'site' && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Site</span>
                        )}
                      </div>
                      <div className="text-sm text-neutral-400">
                        {appt.starts_at && format(parseISO(appt.starts_at), "HH:mm")}
                        {appt.client_phone ? ` • ${appt.client_phone}` : ""}
                      </div>
                      {appt.notes && <div className="text-xs text-neutral-500 mt-2">{appt.notes}</div>}
                    </div>
                    <button onClick={() => handleDelete(appt.id)} className="p-2 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NewAppointmentForm({ onSuccess, onCancel }: { onSuccess: () => void, onCancel: () => void }) {
  const [form, setForm] = useState({
    client_name: "",
    client_phone: "",
    starts_at: "",
    status: "agendado",
    origin: "manual",
    notes: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const start = new Date(form.starts_at);
    const ends_at = new Date(start.getTime() + 60 * 60 * 1000).toISOString();
    const { error } = await supabase.from("appointments").insert([{
      ...form,
      starts_at: start.toISOString(),
      ends_at
    }]);

    if (error) toast.error("Erro ao salvar: " + error.message);
    else {
      toast.success("Agendamento criado!");
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-medium mb-4 text-white">Novo Agendamento Manual</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Nome do Cliente *</label>
          <input required type="text" value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Telefone</label>
          <input type="text" value={form.client_phone} onChange={e => setForm({...form, client_phone: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Data e Hora *</label>
          <input required type="datetime-local" value={form.starts_at} onChange={e => setForm({...form, starts_at: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Status</label>
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none">
            <option value="agendado">Agendado</option>
            <option value="confirmado">Confirmado</option>
            <option value="concluido">Concluído</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-neutral-400 mb-1">Observações</label>
          <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none" rows={2}></textarea>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">Cancelar</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}
