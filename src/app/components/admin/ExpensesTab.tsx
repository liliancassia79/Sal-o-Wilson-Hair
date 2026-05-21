import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { Plus, Trash2, Receipt } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

export function ExpensesTab() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const today = format(new Date(), "yyyy-MM-dd");
  const [form, setForm] = useState({ description: "", amount: "", date: today });
  const [saving, setSaving] = useState(false);

  const fetchExpenses = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("expenses").select("*").order("date", { ascending: false });
    if (error) toast.error("Erro ao buscar despesas: " + error.message);
    else setExpenses(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const amountNum = parseFloat(form.amount.replace(",", "."));
    
    const { error } = await supabase.from("expenses").insert([{
      description: form.description,
      amount: amountNum,
      date: form.date
    }]);

    if (error) toast.error("Erro ao salvar: " + error.message);
    else {
      toast.success("Despesa registrada!");
      setShowForm(false);
      setForm({ description: "", amount: "", date: today });
      fetchExpenses();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover esta despesa?")) return;
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) toast.error("Erro ao remover: " + error.message);
    else {
      toast.success("Despesa removida");
      fetchExpenses();
    }
  };

  const total = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-serif mb-1">Despesas</h2>
          <p className="text-neutral-400 text-sm">Controle de contas e gastos do salão</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nova Despesa
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
          <h3 className="text-lg font-medium mb-4 text-white">Registrar Despesa</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-neutral-400 mb-1">Descrição *</label>
              <input required type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Ex: Conta de Luz, Produtos..." className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Valor (R$) *</label>
              <input required type="number" step="0.01" min="0" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} placeholder="0.00" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm text-neutral-400 mb-1">Data *</label>
              <input required type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full md:w-1/3 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none" />
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
        <div className="text-center py-12 text-neutral-400">Carregando despesas...</div>
      ) : expenses.length === 0 ? (
        <div className="text-center py-12 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400">
          <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Nenhuma despesa registrada.</p>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="p-4 bg-neutral-800/50 border-b border-neutral-800 flex justify-between items-center">
            <span className="font-medium text-white">Total Listado:</span>
            <span className="font-bold text-red-400">
              R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="divide-y divide-neutral-800">
            {expenses.map((exp) => (
              <div key={exp.id} className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-neutral-800/30 transition-colors">
                <div>
                  <h4 className="font-medium text-white">{exp.description}</h4>
                  <p className="text-sm text-neutral-400">
                    {format(parseISO(exp.date), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-red-400">
                    R$ {Number(exp.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <button onClick={() => handleDelete(exp.id)} className="p-2 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors">
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
