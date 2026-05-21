import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { CalendarDays, LogOut, Plus, Trash2, Home } from "lucide-react";
import { Link } from "react-router";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { DashboardTab } from "./DashboardTab";
import { AgendaTab } from "./AgendaTab";
import { TeamTab } from "./TeamTab";
import { ExpensesTab } from "./ExpensesTab";
import { PaymentsTab } from "./PaymentsTab";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loadingSession) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Carregando...</div>;
  }

  if (!session) {
    return <AdminLogin />;
  }

  return <AdminDashboard session={session} />;
}

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error("Erro ao fazer login: " + error.message);
        alert("Erro ao fazer login: " + error.message);
      } else {
        toast.success("Bem-vindo(a)!");
      }
    } catch (err: any) {
      alert("Ocorreu um erro: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative">
      <Link to="/" className="absolute top-6 left-6 text-neutral-400 hover:text-white flex items-center gap-2">
        <Home className="w-4 h-4" /> Voltar ao site
      </Link>
      
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif text-white mb-2">Acesso Restrito</h1>
          <p className="text-neutral-400 text-sm">Painel do Proprietário - Cia da Beleza</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg px-4 py-3 transition-colors mt-4"
          >
            {loading ? "Entrando..." : "Entrar no Painel"}
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard({ session }: { session: any }) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "agenda" | "equipe" | "despesas" | "pagamentos">("dashboard");

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-neutral-400 hover:text-white" title="Voltar ao site">
              <Home className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-serif">Painel Cia da Beleza</h1>
          </div>
          <button onClick={handleLogout} className="text-neutral-400 hover:text-red-400 flex items-center gap-2 text-sm">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>
      
      {/* Tab Navigation */}
      <div className="bg-neutral-900/50 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === "dashboard" ? "border-amber-500 text-amber-500" : "border-transparent text-neutral-400 hover:text-white"}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("agenda")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === "agenda" ? "border-amber-500 text-amber-500" : "border-transparent text-neutral-400 hover:text-white"}`}
          >
            Agenda
          </button>
          <button
            onClick={() => setActiveTab("equipe")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === "equipe" ? "border-amber-500 text-amber-500" : "border-transparent text-neutral-400 hover:text-white"}`}
          >
            Equipe
          </button>
          <button
            onClick={() => setActiveTab("despesas")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === "despesas" ? "border-amber-500 text-amber-500" : "border-transparent text-neutral-400 hover:text-white"}`}
          >
            Despesas
          </button>
          <button
            onClick={() => setActiveTab("pagamentos")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === "pagamentos" ? "border-amber-500 text-amber-500" : "border-transparent text-neutral-400 hover:text-white"}`}
          >
            Pagamentos
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "agenda" && <AgendaTab />}
        {activeTab === "equipe" && <TeamTab />}
        {activeTab === "despesas" && <ExpensesTab />}
        {activeTab === "pagamentos" && <PaymentsTab />}
      </main>
    </div>
  );
}
