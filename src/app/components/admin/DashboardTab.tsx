import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { Users, Receipt, CircleDollarSign, CalendarCheck } from "lucide-react";
import { toast } from "sonner";

export function DashboardTab() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    appointments: 0,
    professionals: 0,
    expensesTotal: 0,
    paymentsTotal: 0
  });

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);
      
      try {
        // Fetch appointments count
        const { count: apptCount } = await supabase
          .from("appointments")
          .select("*", { count: 'exact', head: true });
          
        // Fetch professionals count
        const { count: profCount } = await supabase
          .from("professionals")
          .select("*", { count: 'exact', head: true });
          
        // Fetch expenses sum
        const { data: expensesData } = await supabase
          .from("expenses")
          .select("amount");
        const expTotal = expensesData?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
        
        // Fetch payments sum
        const { data: paymentsData } = await supabase
          .from("payments")
          .select("amount");
        const payTotal = paymentsData?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

        setMetrics({
          appointments: apptCount || 0,
          professionals: profCount || 0,
          expensesTotal: expTotal,
          paymentsTotal: payTotal
        });
      } catch (err: any) {
        toast.error("Erro ao carregar dashboard: " + err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDashboard();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-serif mb-1">Visão Geral</h2>
        <p className="text-neutral-400 text-sm">Resumo do desempenho do salão</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-neutral-400">Carregando métricas...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-neutral-400 text-sm font-medium mb-1">Agendamentos</p>
                <h3 className="text-3xl font-bold text-white">{metrics.appointments}</h3>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-lg">
                <CalendarCheck className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <p className="text-xs text-neutral-500">Total de clientes na agenda</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-neutral-400 text-sm font-medium mb-1">Membros na Equipe</p>
                <h3 className="text-3xl font-bold text-white">{metrics.professionals}</h3>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-neutral-500">Profissionais cadastrados</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-neutral-400 text-sm font-medium mb-1">Despesas</p>
                <h3 className="text-3xl font-bold text-red-400">
                  R$ {metrics.expensesTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
              <div className="bg-red-500/10 p-3 rounded-lg">
                <Receipt className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <p className="text-xs text-neutral-500">Soma de todas as despesas lançadas</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-neutral-400 text-sm font-medium mb-1">Pagamentos</p>
                <h3 className="text-3xl font-bold text-green-400">
                  R$ {metrics.paymentsTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg">
                <CircleDollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-xs text-neutral-500">Soma de todas as comissões pagas</p>
          </div>

        </div>
      )}
    </div>
  );
}
