// V2 sync
import { useRef, useState, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import LogoMarquee from "@/components/LogoMarquee";
import { TrustpilotStars } from "@/components/TrustpilotStars";
import SectionFade from "@/components/SectionFade";

const DemoCall = lazy(() => import("@/components/DemoCall"));
import FOMONotifications from "@/components/FOMONotifications";
import LiveViewers from "@/components/LiveViewers";
import { LiveMetricsProvider } from "@/contexts/LiveMetricsContext";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Phone,
  CalendarCheck,
  BarChart3,
  ShieldCheck,
  Users,
  Building2,
  Wrench,
  Check,
  X,
  Minus,
  Network,
  Search,
  Code2,
  Rocket,
  RefreshCw,
  ChevronRight,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import heroRobot from "@/assets/hero-robot.webp";
import { BOOKING_URL } from "@/lib/constants";
import avatarElena from "@/assets/avatars/elena-garcia.webp";
import avatarRoberto from "@/assets/avatars/roberto-mendez.webp";
import avatarCarmen from "@/assets/avatars/carmen-ortega.webp";
import avatarJorge from "@/assets/avatars/jorge-navarro.webp";
import avatarLaura from "@/assets/avatars/laura-m.webp";

/* ── Data ── */

const comparisonRows: { label: string; values: (boolean | "partial")[] }[] = [
  { label: "Llamadas atendidas 24/7",              values: [false,     false,     false,     true] },
  { label: "Campañas de llamadas salientes",        values: [false,     false,     false,     true] },
  { label: "Agendado automático de citas",          values: [false,     "partial", "partial", true] },
  { label: "Digitalización de flujos internos",    values: [false,     true,      "partial", true] },
  { label: "Agentes IA a medida para tu operativa",values: [false,     true,      "partial", true] },
  { label: "Integración con tus herramientas",     values: ["partial", true,      "partial", true] },
  { label: "Analítica de cada conversación",       values: [false,     false,     false,     true] },
  { label: "Operativo en menos de 48h",            values: [true,      false,     "partial", true] },
  { label: "Escalable sin contratar más personal", values: [false,     false,     true,      true] },
];

const capabilities = [
  {
    title: "Atendemos toda tu comunicación telefónica",
    description: "Automatizamos llamadas entrantes y salientes, lanzamos campañas y atendemos 24/7 los 365 días del año. Nunca más una llamada perdida.",
    chips: ["Entrante", "Saliente", "Campaña", "24/7"],
    hsl: "190 60% 55%",
    Icon: Phone,
  },
  {
    title: "Tu calendario, siempre lleno y sin errores",
    description: "Gestionamos tu agenda de forma automática: reservas, confirmaciones, cambios y recordatorios.",
    chips: ["Google Cal", "Calendly", "CRM", "Recordatorio"],
    hsl: "160 50% 48%",
    Icon: CalendarCheck,
  },
  {
    title: "Agentes IA a medida y automatización de tus procesos",
    description: "Automatizamos los procesos internos de tu empresa y creamos agentes IA a medida para necesidades específicas.",
    chips: ["CRM", "ERP", "WhatsApp", "Slack", "API"],
    hsl: "245 60% 62%",
    Icon: Network,
  },
  {
    title: "Un dashboard con todo lo que pasa en tu empresa",
    description: "Centralizamos en un panel de control toda tu empresa: llamadas, campañas, automatizaciones, agentes IA y un asistente interno con el conocimiento de tu negocio.",
    chips: ["Tiempo real", "Llamadas", "Agentes IA", "Chat interno"],
    hsl: "35 70% 58%",
    Icon: BarChart3,
  },
  {
    title: "Fidelizamos y recuperamos a tus clientes automáticamente",
    description: "Seguimiento post-venta, detección de clientes en riesgo y reactivación de inactivos. Tu negocio fideliza solo.",
    chips: ["Post-venta", "Reactivación", "NPS", "Alertas"],
    hsl: "340 55% 60%",
    Icon: Users,
  },
];

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    shortDesc: "Auditoría de tu operativa y propuesta técnica a medida.",
    hsl: "210 75% 52%",
    icon: Search,
  },
  {
    number: "02",
    title: "Desarrollo",
    shortDesc: "Agentes base y asistentes específicos para tu empresa, probados antes de producción.",
    hsl: "245 60% 62%",
    icon: Code2,
  },
  {
    number: "03",
    title: "Implementación",
    shortDesc: "Conexión con tus herramientas actuales y formación del equipo para la puesta en marcha.",
    hsl: "195 65% 42%",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Mantenimiento",
    shortDesc: "Rendimiento monitorizado de forma continua y sistema que evoluciona con tu negocio.",
    hsl: "220 50% 55%",
    icon: RefreshCw,
  },
];

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5 },
};

/* ── Page ── */

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);
  const [hoveredCap, setHoveredCap] = useState<number | null>(null);
  const [llamadasTab, setLlamadasTab] = useState<"entrante" | "saliente" | "campana">("entrante");

  /* Task 2: Hero robot scroll-based parallax */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const rawRotateX = useTransform(scrollYProgress, [0, 0.3], [0, 15]);
  const rawY = useTransform(scrollYProgress, [0, 0.4], [0, 40]);
  const rotateX = useSpring(rawRotateX, { stiffness: 60, damping: 20 });
  const heroY = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <LiveMetricsProvider>
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ─── 1. HERO — What we do ─── */}
      <SectionFade>
        <section ref={heroRef} className="relative pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden">
          {/* Aurora background */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: 'linear-gradient(135deg, hsl(217 91% 20% / 0.8), hsl(260 50% 15% / 0.6), hsl(190 60% 15% / 0.5), hsl(340 55% 15% / 0.3))',
                backgroundSize: '300% 300%',
                animation: 'aurora 60s ease-in-out infinite',
              }}
            />
            {/* Aurora blobs — hidden on mobile to save GPU */}
            <div
              className="hidden md:block absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full blur-[150px]"
              style={{ background: 'radial-gradient(circle, hsl(190 60% 50% / 0.15), transparent 70%)', animation: 'aurora-pulse 15s ease-in-out infinite' }}
            />
            <div
              className="hidden md:block absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full blur-[130px]"
              style={{ background: 'radial-gradient(circle, hsl(260 50% 50% / 0.12), transparent 70%)', animation: 'aurora-pulse 20s ease-in-out infinite 5s' }}
            />
            <div
              className="hidden md:block absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full blur-[120px]"
              style={{ background: 'radial-gradient(circle, hsl(217 91% 45% / 0.1), transparent 70%)', animation: 'aurora-pulse 25s ease-in-out infinite 10s' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
          </div>

          <div className="container mx-auto px-5 md:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
              {/* Left: text */}
              <motion.div
                className="flex-1 max-w-2xl text-center lg:text-left"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h1 className="mb-4 md:mb-6 tracking-tight font-display font-extrabold">
                  <span className="block text-[2.1rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
                    Automatizamos y digitalizamos
                  </span>
                  <span className="block text-[1.45rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-[2.6rem] text-gradient mt-1.5">
                    la comunicación y procesos de tu empresa
                  </span>
                </h1>
                <p className="text-base md:text-xl text-foreground/70 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                  Despreocúpate de las llamadas y tareas manuales. Creamos Agentes IA a medida para tu negocio.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 text-base shadow-lg shadow-primary/20"
                    onClick={() => window.open(BOOKING_URL, "_blank")}
                  >
                    Solicitar demo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 text-base hover:bg-transparent hover:border-brand-lavender hover:text-brand-lavender transition-colors duration-200"
                    onClick={() =>
                      document
                        .querySelector("#como-funciona")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Ver cómo funciona
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              {/* Right: robot with parallax + glow + floating cards */}
              <motion.div
                className="flex-1 flex justify-center lg:justify-end relative order-first lg:order-last"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Multi-layer glow */}
                <div
                  className="absolute inset-0 scale-[2.2] md:scale-[3] rounded-full blur-3xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, hsl(190 60% 55% / 0.22), hsl(260 50% 60% / 0.08) 55%, transparent 70%)" }}
                />
                <div
                  className="absolute inset-0 scale-[1.5] md:scale-[1.9] rounded-full blur-2xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, hsl(190 60% 55% / 0.14), transparent 65%)" }}
                />

                {/* Robot */}
                <motion.img
                  src={heroRobot}
                  alt="CALLA Asistente Virtual"
                  className="w-52 sm:w-80 md:w-[26rem] lg:w-[32rem] drop-shadow-2xl relative z-10"
                  width={1024}
                  height={1024}
                  style={{ rotateX, y: heroY, transformOrigin: "center bottom" }}
                />

              </motion.div>
            </div>
          </div>
        </section>
      </SectionFade>

      <LogoMarquee />

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ─── 2. WHAT WE DO — bento capabilities ─── */}
      <SectionFade className="bg-white/[0.03]">
        <section className="py-20 md:py-28 px-5 md:px-6">
          <div className="container mx-auto max-w-5xl">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-primary/[0.06] border border-primary/15 rounded-full px-4 py-1.5 mb-5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary font-display font-semibold tracking-wide">Cobertura total</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.1] text-foreground mb-4">
                Todo lo que hacemos{" "}
                <span className="text-gradient">por tu empresa</span>
              </h2>
              <p className="text-foreground/70 max-w-lg text-base font-light">
                Un ecosistema completo. Cinco líneas de acción, un solo sistema.
              </p>
            </motion.div>

            {/* ─── Bento Grid ─── */}
            <div className="flex flex-col gap-4 md:gap-5">

              {/* Row 1: LLAMADAS (25% wider) + AGENDA */}
              <div className="grid grid-cols-1 md:grid-cols-[5fr_4fr] gap-4 md:gap-5">

                {/* LLAMADAS */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(190 60% 55% / 0.25)", background: "hsl(190 60% 55% / 0.04)" }}>
                  <div className="p-5 md:p-6">
                    <h3 className="text-xs font-display font-bold text-foreground mb-1.5 leading-tight uppercase tracking-widest">{capabilities[0].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[0].description}</p>
                  </div>
                  <div className="flex gap-2 px-5 pb-3">
                    {(["entrante", "saliente", "campana"] as const).map((tab) => {
                      const labels = { entrante: "Entrante", saliente: "Saliente", campana: "Campaña" };
                      return (
                        <button key={tab} onClick={() => setLlamadasTab(tab)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer"
                          style={{
                            background: llamadasTab === tab ? "hsl(190 60% 55% / 0.2)" : "hsl(190 60% 55% / 0.06)",
                            borderColor: `hsl(190 60% 55% / ${llamadasTab === tab ? "0.5" : "0.2"})`,
                            color: llamadasTab === tab ? "hsl(190 60% 55%)" : "hsl(190 60% 55% / 0.5)",
                          }}>
                          {labels[tab]}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mx-4 mb-4 rounded-2xl overflow-hidden min-h-[160px]"
                    style={{ background: "hsl(190 60% 55% / 0.08)", border: "1px solid hsl(190 60% 55% / 0.15)" }}>
                    <AnimatePresence mode="wait">
                      {llamadasTab === "entrante" && (
                        <motion.div key="entrante" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                          className="h-full flex flex-col p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <motion.div className="w-2.5 h-2.5 rounded-full bg-red-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                            <span className="text-xs font-bold tracking-wider" style={{ color: "hsl(190 60% 55%)" }}>EN LLAMADA · ARIA</span>
                            <motion.span className="ml-auto text-xs font-mono font-bold text-foreground/50" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>00:02:34</motion.span>
                          </div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0" style={{ background: "hsl(190 60% 55% / 0.2)", color: "hsl(190 60% 55%)" }}>CM</div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">Carlos Martínez</p>
                              <p className="text-xs text-foreground/50">647 XXX XXX · Entrante</p>
                            </div>
                          </div>
                          <div className="flex items-end gap-[3px] h-14">
                            {[20,45,30,70,55,40,80,35,60,45,75,50,30,65,40,85,55,30,70,45,38,62,48,72,52].map((h, i) => (
                              <motion.div key={i} className="flex-1 rounded-full"
                                style={{ height: `${h}%`, background: `hsl(190 60% 55% / ${i % 3 === 0 ? "0.9" : "0.4"})` }}
                                animate={{ scaleY: [1, 0.3 + (i % 5) * 0.15, 1] }}
                                transition={{ duration: 0.5 + (i % 4) * 0.15, repeat: Infinity, delay: i * 0.04 }} />
                            ))}
                          </div>
                        </motion.div>
                      )}
                      {llamadasTab === "saliente" && (
                        <motion.div key="saliente" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                          className="h-full flex flex-col p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <motion.div className="w-2.5 h-2.5 rounded-full bg-emerald-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
                            <span className="text-xs font-bold tracking-wider" style={{ color: "hsl(190 60% 55%)" }}>MARCANDO...</span>
                          </div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0" style={{ background: "hsl(190 60% 55% / 0.2)", color: "hsl(190 60% 55%)" }}>MP</div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">María Pérez</p>
                              <p className="text-xs text-foreground/50">612 XXX XXX · Saliente</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-4 flex-1">
                            {[0, 0.2, 0.4, 0.6].map((d, i) => (
                              <motion.div key={i} className="w-3 h-3 rounded-full" style={{ background: "hsl(190 60% 55%)" }}
                                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: d }} />
                            ))}
                          </div>
                        </motion.div>
                      )}
                      {llamadasTab === "campana" && (
                        <motion.div key="campana" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                          className="h-full flex flex-col p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold" style={{ color: "hsl(190 60% 55%)" }}>Renovación Q4</span>
                            <span className="text-xs text-foreground/50">31% completado</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: "hsl(190 60% 55% / 0.15)" }}>
                            <motion.div className="h-full rounded-full" style={{ background: "hsl(190 60% 55%)" }}
                              initial={{ width: "0%" }} animate={{ width: "31%" }} transition={{ duration: 1.2, ease: "easeOut" }} />
                          </div>
                          <div className="grid grid-cols-3 gap-2 flex-1">
                            {[{ label: "En llamada", val: "1" }, { label: "Completados", val: "46" }, { label: "Pendientes", val: "103" }].map(({ label, val }) => (
                              <div key={label} className="rounded-xl p-2 text-center" style={{ background: "hsl(190 60% 55% / 0.1)", border: "1px solid hsl(190 60% 55% / 0.2)" }}>
                                <p className="text-base font-bold text-foreground">{val}</p>
                                <p className="text-[10px] text-foreground/50 leading-tight">{label}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* AGENDA */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(160 50% 48% / 0.25)", background: "hsl(160 50% 48% / 0.04)" }}>
                  <div className="p-5 md:p-6">
                    <h3 className="text-xs font-display font-bold text-foreground mb-1.5 leading-tight uppercase tracking-widest">{capabilities[1].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[1].description}</p>
                  </div>
                  <div className="flex-1 mx-4 mb-4 rounded-2xl flex flex-col items-center justify-center gap-4 p-5 min-h-[180px]"
                    style={{ background: "hsl(160 50% 48% / 0.08)", border: "1px solid hsl(160 50% 48% / 0.15)" }}>
                    <div className="text-center">
                      <motion.p className="text-5xl font-bold font-display" style={{ color: "hsl(160 50% 48%)" }}
                        animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2.5, repeat: Infinity }}>
                        30 min
                      </motion.p>
                      <p className="text-xs text-foreground/50 mt-1">Próxima cita</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {["Google Calendar", "Calendly", "Apple Calendar"].map(chip => (
                        <span key={chip} className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ background: "hsl(160 50% 48% / 0.12)", color: "hsl(160 50% 48%)", border: "1px solid hsl(160 50% 48% / 0.3)" }}>
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Row 2: FLUJOS + ANALÍTICA + FIDELIZACIÓN */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

                {/* FLUJOS */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(245 60% 62% / 0.25)", background: "hsl(245 60% 62% / 0.04)" }}>
                  <div className="p-5 md:p-6">
                    <h3 className="text-xs font-display font-bold text-foreground mb-1.5 leading-tight uppercase tracking-widest">{capabilities[2].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[2].description}</p>
                  </div>
                  <div className="flex-1 px-3 pb-4 min-h-[220px] flex items-center justify-center">
                    <svg viewBox="0 0 280 220" className="w-full h-full">
                      {/* Pulsing rings around center */}
                      {[36, 52, 68].map((r, i) => (
                        <motion.circle key={i} cx="140" cy="110" r={r} fill="none"
                          stroke="hsl(245 60% 62%)" strokeWidth="1"
                          initial={{ opacity: 0.15 - i * 0.04, scale: 1 }}
                          animate={{ opacity: [0.15 - i * 0.04, 0.05, 0.15 - i * 0.04] }}
                          transition={{ duration: 2.5 + i * 0.6, repeat: Infinity, delay: i * 0.4 }} />
                      ))}
                      {/* Connection lines */}
                      {[
                        { x: 140, y: 22 },
                        { x: 236, y: 66 },
                        { x: 220, y: 175 },
                        { x: 60, y: 175 },
                        { x: 44, y: 66 },
                      ].map((n, i) => (
                        <line key={i} x1="140" y1="110" x2={n.x} y2={n.y}
                          stroke="hsl(245 60% 62% / 0.25)" strokeWidth="1.5" strokeDasharray="4 3" />
                      ))}
                      {/* Center node */}
                      <circle cx="140" cy="110" r="26" fill="hsl(245 60% 62% / 0.18)" stroke="hsl(245 60% 62% / 0.6)" strokeWidth="2" />
                      <motion.circle cx="140" cy="110" r="26" fill="none" stroke="hsl(245 60% 72%)" strokeWidth="1.5"
                        strokeDasharray="163" animate={{ strokeDashoffset: [0, -163] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
                      <text x="140" y="106" textAnchor="middle" fontSize="9" fontWeight="800" fill="hsl(245 60% 85%)">CALLA</text>
                      <text x="140" y="118" textAnchor="middle" fontSize="6.5" fill="hsl(245 60% 65%)">IA</text>
                      {/* Outer nodes */}
                      {[
                        { x: 140, y: 22, label: "CRM", w: 42 },
                        { x: 236, y: 66, label: "WhatsApp", w: 62 },
                        { x: 220, y: 175, label: "Slack", w: 44 },
                        { x: 60, y: 175, label: "Email", w: 44 },
                        { x: 44, y: 66, label: "API", w: 36 },
                      ].map((n, i) => (
                        <g key={i}>
                          <rect x={n.x - n.w / 2} y={n.y - 11} width={n.w} height={22} rx="11"
                            fill="hsl(245 60% 62% / 0.15)" stroke="hsl(245 60% 62% / 0.45)" strokeWidth="1.5" />
                          <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="8" fontWeight="700" fill="hsl(245 60% 80%)">{n.label}</text>
                        </g>
                      ))}
                      {/* Animated particles */}
                      {[
                        { path: "M140,110 L140,22", dur: "1.8s" },
                        { path: "M140,110 L236,66", dur: "2.2s" },
                        { path: "M140,110 L220,175", dur: "1.6s" },
                        { path: "M140,110 L60,175", dur: "2s" },
                        { path: "M140,110 L44,66", dur: "2.4s" },
                      ].map((p, i) => (
                        <circle key={i} r="4" fill="hsl(245 60% 75%)" opacity="0.9">
                          <animateMotion path={p.path} dur={p.dur} repeatCount="indefinite" />
                        </circle>
                      ))}
                    </svg>
                  </div>
                </motion.div>

                {/* ANALÍTICA */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(35 70% 58% / 0.25)", background: "hsl(35 70% 58% / 0.04)" }}>
                  <div className="p-5 md:p-6">
                    <h3 className="text-xs font-display font-bold text-foreground mb-1.5 leading-tight uppercase tracking-widest">{capabilities[3].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[3].description}</p>
                  </div>
                  <div className="flex-1 mx-4 mb-4 rounded-2xl overflow-hidden min-h-[220px] flex flex-col"
                    style={{ background: "hsl(35 70% 58% / 0.06)", border: "1px solid hsl(35 70% 58% / 0.18)" }}>
                    {/* Dashboard header bar */}
                    <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: "hsl(35 70% 58% / 0.15)" }}>
                      <div className="flex items-center gap-1.5">
                        <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(35 70% 58%)" }}
                          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                        <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "hsl(35 70% 58%)" }}>Panel en vivo</span>
                      </div>
                      <span className="text-[9px] text-foreground/35 font-mono">HOY · 09:41</span>
                    </div>
                    {/* KPIs row */}
                    <div className="grid grid-cols-3 gap-px border-b" style={{ borderColor: "hsl(35 70% 58% / 0.12)" }}>
                      {[
                        { label: "Llamadas", val: "247", up: true },
                        { label: "Resolución", val: "94%", up: true },
                        { label: "NPS", val: "72", up: false },
                      ].map(({ label, val, up }) => (
                        <div key={label} className="flex flex-col items-center justify-center py-2.5 px-1">
                          <p className="text-base font-bold text-foreground leading-none">{val}</p>
                          <p className="text-[9px] text-foreground/45 mt-0.5">{label}</p>
                          <span className="text-[8px] font-bold mt-0.5" style={{ color: up ? "hsl(145 60% 50%)" : "hsl(35 70% 58%)" }}>{up ? "↑" : "→"}</span>
                        </div>
                      ))}
                    </div>
                    {/* Bar chart */}
                    <div className="flex-1 px-3 pt-2 pb-3 flex flex-col justify-end">
                      <p className="text-[8px] text-foreground/35 mb-2 uppercase tracking-wider">Llamadas · últimas 6h</p>
                      <div className="flex items-end gap-1.5 h-16">
                        {[38, 62, 45, 80, 55, 72].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <motion.div className="w-full rounded-t-sm"
                              style={{ background: i === 3 ? "hsl(35 70% 58%)" : "hsl(35 70% 58% / 0.3)", height: `${h}%` }}
                              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                              style={{ originY: 1, background: i === 3 ? "hsl(35 70% 58%)" : "hsl(35 70% 58% / 0.3)", height: `${h}%` }} />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-1">
                        {["04h", "05h", "06h", "07h", "08h", "09h"].map(t => (
                          <span key={t} className="text-[7px] text-foreground/30 flex-1 text-center">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* FIDELIZACIÓN */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(340 55% 60% / 0.25)", background: "hsl(340 55% 60% / 0.04)" }}>
                  <div className="p-5 md:p-6">
                    <h3 className="text-xs font-display font-bold text-foreground mb-1.5 leading-tight uppercase tracking-widest">{capabilities[4].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[4].description}</p>
                  </div>
                  <div className="flex-1 px-4 pb-4 flex flex-col gap-2 min-h-[200px]">
                    {[
                      { name: "María García", status: "Recuperada", sc: "214 80% 55%", info: "8 meses inactiva" },
                      { name: "Luis Pérez", status: "En riesgo", sc: "35 90% 58%", info: "Sin actividad 6 sem." },
                      { name: "Ana Torres", status: "Activa", sc: "160 60% 45%", info: "Post-venta ✓" },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                        style={{ background: "hsl(340 55% 60% / 0.06)", border: "1px solid hsl(340 55% 60% / 0.12)" }}>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                          style={{ background: `hsl(${c.sc} / 0.15)`, color: `hsl(${c.sc})` }}>
                          {c.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">{c.name}</p>
                          <p className="text-[10px] text-foreground/50 truncate">{c.info}</p>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                          style={{ background: `hsl(${c.sc} / 0.12)`, color: `hsl(${c.sc})`, border: `1px solid hsl(${c.sc} / 0.3)` }}>
                          {c.status}
                        </span>
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="rounded-xl p-2.5" style={{ background: "hsl(340 55% 60% / 0.08)", border: "1px solid hsl(340 55% 60% / 0.2)" }}>
                        <p className="text-xs font-bold text-foreground">Retención <span style={{ color: "hsl(340 55% 60%)" }}>87%</span></p>
                        <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: "hsl(340 55% 60% / 0.15)" }}>
                          <motion.div className="h-full rounded-full" style={{ background: "hsl(340 55% 60%)" }}
                            initial={{ width: "0%" }} whileInView={{ width: "87%" }} viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }} />
                        </div>
                      </div>
                      <div className="rounded-xl p-2.5" style={{ background: "hsl(340 55% 60% / 0.08)", border: "1px solid hsl(340 55% 60% / 0.2)" }}>
                        <p className="text-[10px] text-foreground/50">Activos</p>
                        <p className="text-base font-bold text-foreground">124</p>
                      </div>
                      <div className="rounded-xl p-2.5" style={{ background: "hsl(340 55% 60% / 0.08)", border: "1px solid hsl(340 55% 60% / 0.2)" }}>
                        <p className="text-[10px] text-foreground/50">Satisfacción</p>
                        <div className="flex gap-0.5 mt-0.5">
                          {[1,2,3,4].map(s => <span key={s} className="text-xs" style={{ color: "hsl(340 55% 60%)" }}>★</span>)}
                          <span className="text-xs text-foreground/25">☆</span>
                        </div>
                      </div>
                      <div className="rounded-xl p-2.5" style={{ background: "hsl(340 55% 60% / 0.08)", border: "1px solid hsl(340 55% 60% / 0.2)" }}>
                        <p className="text-[10px] text-foreground/50">Recuperados</p>
                        <p className="text-sm font-bold" style={{ color: "hsl(340 55% 60%)" }}>+23</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>

            </div>
          </div>
        </section>
      </SectionFade>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ─── 3. WHY US — Comparison table ─── */}
      <SectionFade>
        <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-teal/[0.04] blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-lavender/[0.03] blur-[120px] pointer-events-none" />

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-primary/[0.06] border border-primary/15 rounded-full px-4 py-1.5 mb-6">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary font-display font-semibold tracking-wide">Comparativa</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground mb-4">
                ¿Qué diferencia a <span className="text-gradient">Calla</span>?
              </h2>
              <p className="text-foreground/85 font-light max-w-lg mx-auto">
                Compara lo que incluye cada opción. La diferencia habla por sí sola.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl mx-auto"
            >
              <div className="relative overflow-x-auto rounded-2xl border border-border/40 bg-card/20">
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/80 to-transparent pointer-events-none z-10 md:hidden rounded-r-2xl" />

                <div className="min-w-[660px]">

                  {/* ── Column headers ── */}
                  <div className="grid grid-cols-[2fr_1.15fr_1fr_1fr_1fr]">
                    <div className="px-6 py-5 bg-card/60 border-b border-border/30" />

                    {/* CALLA — primera */}
                    <div className="px-4 py-5 text-center border-b border-l border-border/30 bg-primary/[0.08] relative flex flex-col items-center justify-center gap-1.5">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
                      <div className="inline-flex items-center gap-1 bg-primary/15 border border-primary/30 rounded-full px-2.5 py-0.5">
                        <span className="text-xs font-display font-bold tracking-widest uppercase text-primary">Recomendado</span>
                      </div>
                      <img src={heroRobot} alt="CALLA" className="h-8 w-8 object-contain" loading="lazy" />
                      <p className="text-base font-display font-bold text-foreground">CALLA</p>
                    </div>

                    {/* Competidores */}
                    {[
                      { name: "Contratar personal",  sub: "Secretaria, admin, IT",    Icon: Users },
                      { name: "Agencia digital",      sub: "Consultoría + desarrollo", Icon: Building2 },
                      { name: "Herramienta genérica", sub: "ChatGPT, n8n, etc.",       Icon: Wrench },
                    ].map((col) => (
                      <div key={col.name} className="px-4 py-5 text-center bg-card/60 border-b border-l border-border/30 flex flex-col items-center justify-center gap-2">
                        <col.Icon className="h-5 w-5 text-foreground/70" />
                        <p className="text-base font-display font-semibold text-foreground leading-tight">{col.name}</p>
                        <p className="text-xs text-foreground/80 font-light">{col.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* ── Data rows ── */}
                  {comparisonRows.map((row, i) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[2fr_1.15fr_1fr_1fr_1fr] border-t border-border/20"
                      style={{ background: i % 2 === 0 ? "hsl(var(--card) / 0.40)" : "transparent" }}
                    >
                      <div className="px-6 py-5 text-base text-foreground font-medium flex items-center leading-snug">
                        {row.label}
                      </div>
                      {/* CALLA siempre ✓ */}
                      <div className="border-l border-primary/20 bg-primary/[0.06] py-5 flex items-center justify-center">
                        <Check className="h-5 w-5 text-brand-emerald" />
                      </div>
                      {/* Competidores */}
                      {row.values.slice(0, 3).map((val, j) => (
                        <div key={j} className="border-l border-border/20 py-5 flex items-center justify-center">
                          {val === true      && <Check className="h-5 w-5 text-brand-emerald" />}
                          {val === false     && <X     className="h-5 w-5 text-red-400" />}
                          {val === "partial" && <Minus className="h-5 w-5 text-amber-400" />}
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* ── Cost row ── */}
                  <div className="grid grid-cols-[2fr_1.15fr_1fr_1fr_1fr] border-t border-border/35 bg-card/50">
                    <div className="px-6 py-5 flex items-center">
                      <span className="text-base font-display font-semibold text-foreground">Coste mensual estimado</span>
                    </div>
                    {/* CALLA — sin precio */}
                    <div className="border-l border-primary/25 bg-primary/[0.08] py-5 flex items-center justify-center">
                      <Link to="/precios" className="text-sm font-display font-semibold flex items-center gap-1 text-primary hover:opacity-80 transition-opacity">
                        Ver precios <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                    {/* Competidores */}
                    {["~2.500€/mes", "~5.000€+/mes", "~200€/mes"].map((cost) => (
                      <div key={cost} className="border-l border-border/25 py-5 flex items-center justify-center">
                        <span className="text-base font-bold text-foreground tabular-nums">{cost}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-5 mt-5 flex-wrap">
                <span className="flex items-center gap-1.5 text-sm text-foreground">
                  <Check className="h-4 w-4 text-brand-emerald" /> Incluido
                </span>
                <span className="flex items-center gap-1.5 text-sm text-foreground">
                  <Minus className="h-4 w-4 text-amber-400" /> Parcial o con coste extra
                </span>
                <span className="flex items-center gap-1.5 text-sm text-foreground">
                  <X className="h-4 w-4 text-red-400" /> No disponible
                </span>
                <span className="text-sm text-foreground/70">· Estimaciones orientativas</span>
              </div>
            </motion.div>
          </div>
        </section>
      </SectionFade>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <SectionFade className="bg-white/[0.03]"><Features /></SectionFade>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ─── 5. HOW IT WORKS — 3 phases ─── */}
      <SectionFade>
        <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden">
          <div className="container mx-auto relative z-10">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-primary/[0.06] border border-primary/15 rounded-full px-4 py-1.5 mb-5">
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary font-display font-semibold tracking-wide">Manos a la obra</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.1] text-foreground mb-4">
                Así de fácil es{" "}
                <span className="text-gradient">empezar</span>
              </h2>
              <p className="text-foreground/75 max-w-lg mx-auto text-base font-light">
                Cuatro fases claras. Sin tecnicismos, sin sorpresas.
              </p>
            </motion.div>

            {/* Step circles — animated, floating, with pulsing rings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-6 max-w-5xl mx-auto">
              {steps.map((step, i) => {
                const StepIcon = step.icon;
                const grad = `linear-gradient(140deg, hsl(${step.hsl}) 0%, hsl(${step.hsl} / 0.55) 50%, hsl(${step.hsl} / 0.15) 100%)`;
                const floatDelay = i * 0.85;
                const pulseDelay = i * 0.5;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center gap-5"
                  >
                    {/* "Fase X" label */}
                    <span
                      className="text-[11px] font-display font-bold tracking-[0.18em] uppercase"
                      style={{ color: `hsl(${step.hsl} / 0.75)` }}
                    >
                      Fase {i + 1}
                    </span>

                    {/* Floating circle */}
                    <motion.div
                      animate={{ y: [0, -11, 0] }}
                      transition={{
                        duration: 4.2 + i * 0.55,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: floatDelay,
                      }}
                      className="relative"
                    >
                      {/* Gradient border ring */}
                      <div className="rounded-full p-[2.5px]" style={{ backgroundImage: grad }}>
                        <div
                          className="w-44 h-44 rounded-full flex items-center justify-center overflow-hidden relative"
                          style={{ background: `hsl(${step.hsl} / 0.07)` }}
                        >
                          {/* Pulsing concentric ring 1 */}
                          <motion.div
                            className="absolute rounded-full"
                            style={{
                              width: "50%",
                              height: "50%",
                              border: `1.5px solid hsl(${step.hsl} / 0.45)`,
                            }}
                            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{
                              duration: 2.8,
                              repeat: Infinity,
                              ease: "easeOut",
                              delay: pulseDelay,
                            }}
                          />
                          {/* Pulsing concentric ring 2 */}
                          <motion.div
                            className="absolute rounded-full"
                            style={{
                              width: "72%",
                              height: "72%",
                              border: `1px solid hsl(${step.hsl} / 0.25)`,
                            }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{
                              duration: 2.8,
                              repeat: Infinity,
                              ease: "easeOut",
                              delay: pulseDelay + 0.45,
                            }}
                          />
                          {/* Icon */}
                          <StepIcon
                            className="w-12 h-12 relative z-10"
                            style={{ color: `hsl(${step.hsl})` }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Text */}
                    <div>
                      <h3 className="font-display font-bold text-lg text-foreground mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground/60 font-light leading-relaxed max-w-[165px] mx-auto">
                        {step.shortDesc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>
      </SectionFade>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ─── 6. DEMO — Habla con ARIA ─── */}
      <div id="como-funciona" className="bg-white/[0.03]">
        <Suspense fallback={<div className="py-20" />}>
          <DemoCall />
        </Suspense>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <SectionFade>
        <div className="text-center py-6">
          <Link
            to="/resultados"
            className="text-primary font-medium inline-flex items-center gap-1 hover:underline"
          >
            Ver todos los resultados <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionFade>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ─── 7. CTA FINAL ─── */}
      <SectionFade>
        <section className="py-20 md:py-28 px-5 md:px-6 relative overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full bg-primary/[0.04] blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-brand-lavender/[0.03] blur-[120px] pointer-events-none" />

          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="bg-card/30 border border-border/20 rounded-3xl p-10 md:p-14 grid md:grid-cols-2 gap-10 md:gap-16 items-center">

              {/* Left — copy + CTA */}
              <motion.div {...fade}>
                <p className="text-xs font-display font-semibold tracking-[0.2em] uppercase text-primary mb-4">Empieza hoy</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-[1.1] text-foreground mb-5">
                  Tu competencia ya{" "}
                  <span className="text-gradient">no descansa.</span>
                </h2>
                <p className="text-foreground/75 text-base font-light leading-relaxed mb-8">
                  Un equipo de IA trabajando por tu empresa los 365 días del año. Sin descansos, sin bajas, sin errores.
                </p>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/20 text-base w-full sm:w-auto"
                  onClick={() => window.open(BOOKING_URL, "_blank")}
                >
                  Solicitar demo gratuita <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="flex items-center gap-4 mt-7">
                  {/* Avatares apilados */}
                  <div className="flex -space-x-3">
                    {[avatarElena, avatarRoberto, avatarCarmen, avatarJorge, avatarLaura].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-background"
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <TrustpilotStars rating={4.9} size={16} />
                      <span className="text-base font-semibold text-foreground">4.9</span>
                    </div>
                    <span className="text-sm text-foreground/70">+200 empresas confían en CALLA</span>
                  </div>
                </div>
              </motion.div>

              {/* Right — metrics */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "+200", label: "empresas activas" },
                  { value: "2M+",  label: "llamadas gestionadas" },
                  { value: "48h",  label: "hasta estar operativo" },
                  { value: "4.9",  label: "valoración media" },
                ].map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-card/50 border border-border/20 rounded-2xl p-5 md:p-6 text-center"
                  >
                    <div className="text-3xl md:text-4xl font-display font-extrabold text-gradient mb-1">
                      {m.value}
                    </div>
                    <div className="text-xs text-foreground/70 font-light leading-snug">{m.label}</div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </section>
      </SectionFade>

      <Footer />
      <FOMONotifications />
      <LiveViewers />
    </div>
    </LiveMetricsProvider>
  );
};

export default Index;
