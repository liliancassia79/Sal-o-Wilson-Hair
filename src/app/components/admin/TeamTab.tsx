import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { Plus, Trash2, User } from "lucide-react";
import { toast } from "sonner";

export function TeamTab() {
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", specialty: "" });
  const [saving, setSaving] = useState(false);

  const fetchTeam = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("professionals").select("*").order("name");
    if (error) toast.error("Erro ao buscar equipe: " + error.message);
    else setProfessionals(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("professionals").insert([form]);
    if (error) toast.error("Erro ao salvar: " + error.message);
    else {
      toast.success("Profissional cadastrado!");
      setShowForm(false);
      setForm({ name: "", specialty: "" });
      fetchTeam();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este profissional? Todos os pagamentos e agendamentos vinculados a ele poderão ser afetados.")) return;
    const { error } = await supabase.from("professionals").delete().eq("id", id);
    if (error) toast.error("Erro ao remover: " + error.message);
    else {
      toast.success("Profissional removido");
      fetchTeam();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-serif mb-1">Equipe</h2>
          <p className="text-neutral-400 text-sm">Gerencie os profissionais do salão</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Profissional
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
          <h3 className="text-lg font-medium mb-4 text-white">Cadastrar Profissional</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Nome Completo *</label>
              <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Especialidade</label>
              <input type="text" value={form.specialty} onChange={e => setForm({...form, specialty: e.target.value})} placeholder="Ex: Cabelo, Manicure" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 outline-none" />
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
        <div className="text-center py-12 text-neutral-400">Carregando equipe...</div>
      ) : professionals.length === 0 ? (
        <div className="text-center py-12 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400">
          <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Nenhum profissional cadastrado.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {professionals.map((prof) => (
            <div key={prof.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-neutral-800 p-3 rounded-full text-amber-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{prof.name}</h4>
                  {prof.specialty && <p className="text-sm text-neutral-400">{prof.specialty}</p>}
                </div>
              </div>
              <button onClick={() => handleDelete(prof.id)} className="p-2 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
