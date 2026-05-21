import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { Plus, Trash2, CircleDollarSign } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

export function PaymentsTab() {
  const [payments, setPayments] = useState<any[]>([]);
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const today = format(new Date(), "yyyy-MM-dd");
  const [form, setForm] = useState({ professional_id: "", amount: "", description: "", date: today });
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    // Fetch professionals for the select dropdown
    const { data: profData } = await supabase.from("professionals").select("id, name").order("name");
    if (profData) setProfessionals(profData);

    // Fetch payments with professional name
    const { data: payData, error } = await supabase
      .from("payments")
      .select("*, professionals(name)")
      .order("date", { ascending: false });
      
    if (error) toast.error("Erro ao buscar pagamentos: " + error.message);
    else setPayments(payData || []);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const amountNum = parseFloat(form.amount.replace(",", "."));
    
    const { error } = await supabase.from("payments").insert([{
      professional_id: form.professional_id,
      amount: amountNum,
      description: form.description,
      date: form.date
    }]);

    if (error) toast.error("Erro ao salvar: " + error.message);
    else {
      toast.success("Pagamento registrado!");
      setShowForm(false);
      setForm({ professional_id: "", amount: "", description: "", date: today });
      fetchData();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este pagamento?")) return;
    const { error } = await supabase.from("payments").delete().eq("id", id);
    if (error) toast.error("Erro ao remover: " + error.message);
    else {
      toast.success("Pagamento removido");
      fetchData();
    }
  };

  const total = payments.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-serif mb-1">Pagamentos</h2>
          <p className="text-neutral-400 text-sm">Comissões e pagamentos da equipe</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Pagamento
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
          <h3 className="text-lg font-medium mb-4 text-white">Registrar Pagamento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Profissional *</label>
              <select required value={form.professional_id} onChange={e => setForm({...form, professional_id: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none">
                <option value="" disabled>Selecione...</option>
                {professionals.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Valor (R$) *</label>
              <input required type="number" step="0.01" min="0" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} placeholder="0.00" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Data *</label>
              <input required type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Descrição / Referência</label>
              <input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Ex: Comissão ref. a semana passada" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">Cancelar</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12 text-neutral-400">Carregando pagamentos...</div>
      ) : payments.length === 0 ? (
        <div className="text-center py-12 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400">
          <CircleDollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Nenhum pagamento registrado.</p>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="p-4 bg-neutral-800/50 border-b border-neutral-800 flex justify-between items-center">
            <span className="font-medium text-white">Total Listado:</span>
            <span className="font-bold text-amber-500">
              R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="divide-y divide-neutral-800">
            {payments.map((pay) => (
              <div key={pay.id} className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-neutral-800/30 transition-colors">
                <div>
                  <h4 className="font-medium text-white">{pay.professionals?.name || "Desconhecido"}</h4>
                  <p className="text-sm text-neutral-400">
                    {format(parseISO(pay.date), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                    {pay.description ? ` • ${pay.description}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-amber-500">
                    R$ {Number(pay.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <button onClick={() => handleDelete(pay.id)} className="p-2 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
