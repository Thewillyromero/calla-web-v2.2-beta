import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, ArrowRight, Sparkles, ChevronDown,
  UserX, Check, Zap, Crown, Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { BOOKING_URL as CALENDAR_URL } from "@/lib/constants";

const sectors = [
  { id: "dental", label: "Clínica dental", hint: 400 },
  { id: "salud", label: "Centro médico", hint: 150 },
  { id: "legal", label: "Despacho legal", hint: 1500 },
  { id: "inmobiliaria", label: "Inmobiliaria", hint: 3000 },
  { id: "instalaciones", label: "Instalaciones / Energía", hint: 10000 },
  { id: "estetica", label: "Clínica estética", hint: 800 },
  { id: "educacion", label: "Academia", hint: 200 },
  { id: "hosteleria", label: "Restaurante / Hotel", hint: 50 },
  { id: "seguros", label: "Seguros", hint: 1200 },
  { id: "taller", label: "Taller", hint: 350 },
  { id: "otro", label: "Otro sector", hint: 300 },
];

const hourOptions = [0, 1, 2, 3, 4];

const fmt = (n: number) =>
  new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(Math.round(n));

const PLANS = {
  starter: {
    name: "Starter",
    Icon: Zap,
    price: 299,
    hsl: "190 60% 55%",
    color: "text-brand-teal",
    borderActive: "border-brand-teal/40",
    bgActive: "bg-brand-teal/10",
    breakeven: { clients: 1, value: 300 },
  },
  pro: {
    name: "Pro",
    Icon: Crown,
    price: 699,
    hsl: "260 50% 65%",
    color: "text-brand-lavender",
    borderActive: "border-brand-lavender/40",
    bgActive: "bg-brand-lavender/10",
    breakeven: { clients: 3, value: 340 },
  },
} as const;

type PlanKey = keyof typeof PLANS;

const ROICalculator = ({ onContact }: { onContact?: () => void }) => {
  const [sectorId, setSectorId] = useState("dental");
  const [dropOpen, setDropOpen] = useState(false);
  const [staffCost, setStaffCost] = useState(1500);
  const [ownHours, setOwnHours] = useState(2);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("starter");

  const currentSector = sectors.find((s) => s.id === sectorId);
  const plan = PLANS[selectedPlan];

  const result = useMemo(() => {
    const ownTimeCost = ownHours * 50 * 22;
    const totalToday = staffCost + ownTimeCost;
    const callaTotal = plan.price;
    const monthlySaving = totalToday - callaTotal;
    const annualSaving = monthlySaving * 12;

    return { ownTimeCost, totalToday, callaTotal, monthlySaving, annualSaving };
  }, [staffCost, ownHours, plan.price]);

  const { clients, value } = plan.breakeven;
  const breakevenText =
    clients === 1
      ? `si solo 1 llamada extra al mes se convierte en un cliente de ${fmt(value)} €… La mensualidad de CALLA se paga sola.`
      : `si solo ${clients} nuevos clientes al mes a ${fmt(value)} € cada uno… La mensualidad de CALLA se paga sola.`;

  return (
    <section id="calculadora" className="px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/10 to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-emerald/[0.03] blur-[180px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-brand-emerald/[0.08] border border-brand-emerald/20 rounded-full px-4 py-1.5 mb-6">
            <Calculator className="w-3.5 h-3.5 text-brand-emerald" />
            <span className="text-xs text-brand-emerald font-display font-semibold tracking-wide">
              Calculadora
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight leading-[1.1] text-glow">
            ¿Cuánto te cuesta{" "}
            <span className="text-gradient">gestionar el teléfono</span>?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg font-light">
            3 datos. 10 segundos. La respuesta te sorprenderá.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* LEFT — What you spend today */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-border/35 bg-card/60 p-5 sm:p-7 h-full flex flex-col">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2 mb-6">
                <UserX className="w-4 h-4 text-brand-rose" />
                Lo que gastas hoy
              </h3>

              <div className="space-y-5">
                {/* Sector dropdown */}
                <div>
                  <label className="text-sm text-foreground/80 font-semibold block mb-1.5">Tu sector</label>
                  <div className="relative">
                    <button
                      onClick={() => setDropOpen(!dropOpen)}
                      className="w-full h-11 bg-secondary/30 border border-border/25 rounded-xl px-4 text-left text-sm font-medium text-foreground flex items-center justify-between hover:border-border/40 transition-colors"
                    >
                      {currentSector?.label || "Seleccionar"}
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${dropOpen ? "rotate-180" : ""}`} />
                    </button>
                    {dropOpen && (
                      <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border/30 rounded-xl shadow-2xl z-20 max-h-56 overflow-y-auto">
                        {sectors.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => { setSectorId(s.id); setDropOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary/50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                              sectorId === s.id ? "text-brand-rose font-semibold bg-brand-rose/8" : "text-foreground/80"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Staff cost */}
                <div>
                  <label className="text-sm text-foreground/80 font-semibold block mb-1.5">
                    ¿Cuánto pagas al mes a quien contesta las llamadas?
                    <span className="block text-xs text-muted-foreground/50 font-normal mt-0.5">(Salario Bruto + Seguridad Social)</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={staffCost || ""}
                      onChange={(e) => setStaffCost(Math.max(0, Number(e.target.value)))}
                      className="bg-secondary/30 border-border/25 h-11 text-base font-display font-bold rounded-xl focus:border-primary/40 pl-4 pr-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/60">€/mes</span>
                  </div>
                </div>

                {/* Hours chips */}
                <div>
                  <label className="text-sm text-foreground/80 font-semibold block mb-2">
                    ¿Cuántas horas al día dedicas TÚ al teléfono?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {hourOptions.map((h) => (
                      <button
                        key={h}
                        onClick={() => setOwnHours(h)}
                        className={`px-4 py-2 rounded-full text-base font-semibold transition-all duration-200 ${
                          ownHours === h
                            ? "bg-brand-rose text-white shadow-md"
                            : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60"
                        }`}
                      >
                        {h === 4 ? "4h+" : `${h}h`}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground/70 mt-2 font-medium">
                    Tu tiempo como CEO vale mínimo 50 €/h
                  </p>
                </div>
              </div>

              {/* Total today */}
              <div className="mt-5">
                <div className="bg-brand-rose/10 border border-brand-rose/20 rounded-xl p-5 text-center">
                  <p className="text-[10px] text-brand-rose/70 uppercase tracking-wider font-semibold mb-2">
                    Tu gasto total hoy
                  </p>
                  <p className="text-4xl font-display font-extrabold text-brand-rose leading-none">
                    {fmt(result.totalToday)} €
                    <span className="text-base font-normal text-brand-rose/50">/mes</span>
                  </p>
                  <div className="flex justify-between mt-4 pt-4 border-t border-brand-rose/15 text-sm">
                    <div className="text-left">
                      <span className="block text-xs text-muted-foreground/55 mb-0.5">Personal</span>
                      <span className="font-display font-bold text-foreground/80">{fmt(staffCost)} €</span>
                    </div>
                    {ownHours > 0 && (
                      <div className="text-right">
                        <span className="block text-xs text-muted-foreground/55 mb-0.5">Tu tiempo ({ownHours}h/día)</span>
                        <span className="font-display font-bold text-foreground/80">{fmt(result.ownTimeCost)} €</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — With CALLA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-brand-emerald/20 bg-brand-emerald/[0.02] p-5 sm:p-7 h-full flex flex-col">

              {/* Header + plan toggle */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-emerald" />
                  Con CALLA
                </h3>
                <div className="flex gap-1.5">
                  {(Object.entries(PLANS) as [PlanKey, typeof PLANS[PlanKey]][]).map(([key, p]) => {
                    const isActive = selectedPlan === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedPlan(key)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 ${
                          isActive
                            ? `${p.borderActive} ${p.bgActive} ${p.color}`
                            : "border-border/20 bg-secondary/20 text-muted-foreground hover:border-border/35 hover:bg-secondary/30"
                        }`}
                      >
                        <p.Icon className="w-3 h-3" />
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ecuación: Setup + Cuota = Ahorro */}
              {/* Móvil: columna (A) · Desktop: fila (B) */}
              <div className="flex flex-col gap-2 mb-4">

                {/* Setup card */}
                <div
                  className="flex-1 rounded-xl p-3"
                  style={{ border: `1px solid hsl(${plan.hsl} / 0.25)`, background: `hsl(${plan.hsl} / 0.06)` }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest block mb-0.5" style={{ color: `hsl(${plan.hsl})` }}>
                    Setup
                  </span>
                  <span className="text-sm font-semibold text-foreground leading-tight block">Puesta en marcha</span>
                  <span className="text-xs text-foreground/55">Presupuesto a medida</span>
                </div>

                {/* + */}
                <div className="flex items-center justify-center text-base font-bold leading-none select-none" style={{ color: `hsl(${plan.hsl})` }}>+</div>

                {/* Cuota card */}
                <div
                  className="flex-1 rounded-xl p-3"
                  style={{ border: `1px solid hsl(${plan.hsl} / 0.25)`, background: `hsl(${plan.hsl} / 0.06)` }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest block mb-0.5" style={{ color: `hsl(${plan.hsl})` }}>
                    Cuota mensual
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-display font-extrabold text-foreground">{fmt(plan.price)} €</span>
                    <span className="text-muted-foreground text-xs">/mes</span>
                  </div>
                </div>

                {/* = */}
                <div className="flex items-center justify-center text-base font-bold leading-none select-none text-brand-emerald">=</div>

                {/* Resultado */}
                <div className="flex-1 bg-brand-emerald/10 border border-brand-emerald/20 rounded-xl p-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest block mb-1.5 text-brand-emerald/75">
                    Ahorras
                  </span>
                  {result.monthlySaving > 0 ? (
                    <div className="flex items-end justify-between gap-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-display font-extrabold text-brand-emerald leading-none">
                          {fmt(result.monthlySaving)} €
                        </span>
                        <span className="text-sm text-brand-emerald/60">/mes</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-muted-foreground/50 block leading-tight">al año</span>
                        <span className="text-base font-display font-bold text-brand-emerald/70 leading-tight">
                          {fmt(result.annualSaving)} €
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-foreground/50">Introduce tus datos</span>
                  )}
                </div>
              </div>

              {/* Breakeven */}
              {result.monthlySaving > 0 && (
                <div className="rounded-xl border border-border/15 bg-card/25 p-3 mb-4">
                  <p className="text-xs text-foreground/55 leading-relaxed">
                    Y piensa en esto: {breakevenText}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="mt-auto">
                <Button
                  size="lg"
                  className="w-full rounded-xl text-sm sm:text-base h-13 font-display font-semibold bg-brand-emerald hover:bg-brand-emerald/90 text-white shadow-lg shadow-brand-emerald/20 hover:shadow-brand-emerald/30 hover:scale-[1.01] transition-all duration-300"
                  onClick={() => onContact?.()}
                >
                  <Info className="mr-2 h-4 w-4" />
                  Solicitar información
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
