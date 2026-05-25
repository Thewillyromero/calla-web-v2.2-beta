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
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

      {/* ─── 2. WHAT WE DO — 4 visual options ─── */}
      <SectionFade className="bg-white/[0.03]">
        <section className="py-20 md:py-28 px-5 md:px-6">
          <div className="container mx-auto max-w-5xl">

            {/* Shared Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16"
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

            {/* ══════════════════════════════════════ */}
            {/* OPCIÓN 1 — Panel de control real        */}
            {/* ══════════════════════════════════════ */}
            <div className="mb-28">
              <div className="inline-block bg-red-500 text-white font-bold px-5 py-2 rounded-xl mb-8 text-sm tracking-wider shadow-lg">
                OPCIÓN 1 — Panel de control real
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

                {/* LLAMADAS */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="md:col-span-2 rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(190 60% 55% / 0.25)", background: "hsl(190 60% 55% / 0.04)" }}>
                  <div className="relative overflow-hidden" style={{ background: "hsl(190 60% 55% / 0.08)" }}>
                    <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "hsl(190 60% 55% / 0.15)" }}>
                      <div className="flex items-center gap-2.5">
                        <motion.div className="w-2.5 h-2.5 rounded-full bg-red-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                        <span className="text-xs font-bold tracking-wider" style={{ color: "hsl(190 60% 55%)" }}>EN LLAMADA · ARIA</span>
                      </div>
                      <motion.span className="text-xs font-mono font-bold text-foreground/60" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1, repeat: Infinity }}>00:02:34</motion.span>
                    </div>
                    <div className="px-6 py-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "hsl(190 60% 55% / 0.2)", color: "hsl(190 60% 55%)" }}>CM</div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Carlos Martínez</p>
                          <p className="text-xs text-foreground/50">647 XXX XXX · Entrante</p>
                        </div>
                        <div className="ml-auto flex gap-2">
                          {["Entrante", "Saliente", "Campaña"].map((t, i) => (
                            <div key={t} className="px-3 py-1 rounded-lg text-xs font-semibold border"
                              style={{ background: i === 0 ? "hsl(190 60% 55% / 0.2)" : "hsl(190 60% 55% / 0.06)", borderColor: `hsl(190 60% 55% / ${i === 0 ? "0.5" : "0.2"})`, color: i === 0 ? "hsl(190 60% 55%)" : "hsl(190 60% 55% / 0.4)" }}>
                              {t}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="h-14 flex items-center gap-[3px]">
                        {[20,45,30,70,55,40,80,35,60,45,75,50,30,65,40,85,55,30,70,45,38,62,48,72,52].map((h, i) => (
                          <motion.div key={i} className="flex-1 rounded-full"
                            style={{ height: `${h}%`, background: `hsl(190 60% 55% / ${i % 3 === 0 ? "0.9" : "0.4"})` }}
                            animate={{ scaleY: [1, 0.3 + (i % 5) * 0.15, 1] }}
                            transition={{ duration: 0.5 + (i % 4) * 0.15, repeat: Infinity, delay: i * 0.04 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-3 flex flex-wrap gap-2 border-t" style={{ borderColor: "hsl(190 60% 55% / 0.12)", background: "hsl(190 60% 55% / 0.04)" }}>
                    {capabilities[0].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(190 60% 55% / 0.12)", color: "hsl(190 60% 55%)", border: "1px solid hsl(190 60% 55% / 0.28)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-7 md:p-8 flex-1">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2 leading-tight">{capabilities[0].title}</h3>
                    <p className="text-base text-foreground/65 font-light leading-relaxed">{capabilities[0].description}</p>
                  </div>
                </motion.div>

                {/* AGENDA */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(160 50% 48% / 0.25)", background: "hsl(160 50% 48% / 0.04)" }}>
                  <div className="overflow-hidden" style={{ background: "hsl(160 50% 48% / 0.08)" }}>
                    <div className="px-5 py-3 border-b" style={{ borderColor: "hsl(160 50% 48% / 0.15)" }}>
                      <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "hsl(160 50% 48% / 0.7)" }}>HOY · LUNES 14 OCT</p>
                    </div>
                    <div className="p-4 space-y-2">
                      {[
                        { time: "09:00", name: "Ana García", type: "Consulta" },
                        { time: "10:30", name: "José Martín", type: "Revisión" },
                        { time: "12:00", name: "Clínica Norte", type: "Demo" },
                        { time: "16:30", name: "Pedro Ruiz", type: "Seguimiento" },
                      ].map((apt, i) => (
                        <motion.div key={i} className="flex items-center gap-3 p-2.5 rounded-xl"
                          style={{ background: "hsl(160 50% 48% / 0.1)", border: "1px solid hsl(160 50% 48% / 0.2)" }}
                          initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}>
                          <span className="text-[10px] font-mono font-bold shrink-0" style={{ color: "hsl(160 50% 48% / 0.6)", minWidth: 32 }}>{apt.time}</span>
                          <div className="w-1 h-6 rounded-full shrink-0" style={{ background: "hsl(160 50% 48%)" }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate">{apt.name}</p>
                            <p className="text-[10px] text-foreground/50">{apt.type}</p>
                          </div>
                          <Check className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(160 50% 48%)" }} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="px-5 py-3 flex flex-wrap gap-2 border-t" style={{ borderColor: "hsl(160 50% 48% / 0.12)", background: "hsl(160 50% 48% / 0.04)" }}>
                    {capabilities[1].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(160 50% 48% / 0.12)", color: "hsl(160 50% 48%)", border: "1px solid hsl(160 50% 48% / 0.28)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[1].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[1].description}</p>
                  </div>
                </motion.div>

                {/* FLUJOS */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(245 60% 62% / 0.25)", background: "hsl(245 60% 62% / 0.04)" }}>
                  <div className="overflow-hidden" style={{ background: "hsl(245 60% 62% / 0.08)" }}>
                    <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "hsl(245 60% 62% / 0.15)" }}>
                      <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "hsl(245 60% 62% / 0.7)" }}>FLUJOS ACTIVOS</span>
                      <div className="flex items-center gap-1.5">
                        <motion.div className="w-2 h-2 rounded-full" style={{ background: "hsl(160 60% 45%)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                        <span className="text-[10px] font-semibold" style={{ color: "hsl(160 60% 45%)" }}>3 activos</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      {[
                        { from: "Llamada", to: "CRM", to2: "Slack", time: "hace 2 min" },
                        { from: "Formulario", to: "Email", to2: "CRM", time: "hace 8 min" },
                        { from: "WhatsApp", to: "Agenda", to2: "Aviso", time: "hace 15 min" },
                      ].map((flow, i) => (
                        <motion.div key={i} className="p-2.5 rounded-xl flex items-center gap-1.5"
                          style={{ background: "hsl(245 60% 62% / 0.1)", border: "1px solid hsl(245 60% 62% / 0.2)" }}
                          initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}>
                          {[flow.from, flow.to, flow.to2].map((item, j) => (
                            <div key={j} className="flex items-center gap-1.5">
                              {j > 0 && <ChevronRight className="w-3 h-3 shrink-0" style={{ color: "hsl(245 60% 62% / 0.4)" }} />}
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded" style={{ background: "hsl(245 60% 62% / 0.2)", color: "hsl(245 60% 62%)" }}>{item}</span>
                            </div>
                          ))}
                          <span className="ml-auto text-[9px] text-foreground/40 shrink-0">{flow.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="px-5 py-3 flex flex-wrap gap-2 border-t" style={{ borderColor: "hsl(245 60% 62% / 0.12)", background: "hsl(245 60% 62% / 0.04)" }}>
                    {capabilities[2].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(245 60% 62% / 0.12)", color: "hsl(245 60% 62%)", border: "1px solid hsl(245 60% 62% / 0.28)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[2].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[2].description}</p>
                  </div>
                </motion.div>

                {/* ANALÍTICA */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.24 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(35 70% 58% / 0.25)", background: "hsl(35 70% 58% / 0.04)" }}>
                  <div className="overflow-hidden" style={{ background: "hsl(35 70% 58% / 0.08)" }}>
                    <div className="px-5 py-3 border-b" style={{ borderColor: "hsl(35 70% 58% / 0.15)" }}>
                      <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "hsl(35 70% 58% / 0.7)" }}>DASHBOARD · HOY</span>
                    </div>
                    <div className="p-4 grid grid-cols-3 gap-2 mb-3">
                      {[{ value: "47", label: "Llamadas" }, { value: "94%", label: "Satisfacción" }, { value: "8s", label: "Respuesta" }].map((m, i) => (
                        <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: "hsl(35 70% 58% / 0.12)", border: "1px solid hsl(35 70% 58% / 0.2)" }}>
                          <p className="text-base font-display font-extrabold" style={{ color: "hsl(35 70% 58%)" }}>{m.value}</p>
                          <p className="text-[9px] text-foreground/55 font-light">{m.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 pb-4 h-12 flex items-end gap-1">
                      {[40, 65, 50, 80, 60, 75, 55, 90, 70, 85].map((h, i) => (
                        <motion.div key={i} className="flex-1 rounded-t-sm"
                          style={{ height: `${h}%`, background: `hsl(35 70% 58% / ${i === 7 ? "1" : "0.4"})` }}
                          animate={{ scaleY: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }} />
                      ))}
                    </div>
                  </div>
                  <div className="px-5 py-3 flex flex-wrap gap-2 border-t" style={{ borderColor: "hsl(35 70% 58% / 0.12)", background: "hsl(35 70% 58% / 0.04)" }}>
                    {capabilities[3].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(35 70% 58% / 0.12)", color: "hsl(35 70% 58%)", border: "1px solid hsl(35 70% 58% / 0.28)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[3].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[3].description}</p>
                  </div>
                </motion.div>

                {/* FIDELIZACIÓN */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.32 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(340 55% 60% / 0.25)", background: "hsl(340 55% 60% / 0.04)" }}>
                  <div className="overflow-hidden" style={{ background: "hsl(340 55% 60% / 0.08)" }}>
                    <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "hsl(340 55% 60% / 0.15)" }}>
                      <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "hsl(340 55% 60% / 0.7)" }}>CLIENTES</span>
                      <div className="flex items-center gap-1">
                        <Bell className="w-3 h-3" style={{ color: "hsl(35 90% 60%)" }} />
                        <span className="text-[10px] font-bold" style={{ color: "hsl(35 90% 60%)" }}>2 en riesgo</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      {[
                        { name: "María García", status: "Recuperada", sc: "160 60% 45%", info: "Reactivada ✓" },
                        { name: "Luis Pérez", status: "En riesgo", sc: "35 90% 60%", info: "Sin actividad 6 sem." },
                        { name: "Ana Torres", status: "Activa", sc: "160 60% 45%", info: "Post-venta ✓" },
                      ].map((c, i) => (
                        <motion.div key={i} className="flex items-center gap-3 p-2.5 rounded-xl"
                          style={{ background: "hsl(340 55% 60% / 0.1)", border: "1px solid hsl(340 55% 60% / 0.2)" }}
                          initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={{ background: "hsl(340 55% 60% / 0.2)", color: "hsl(340 55% 60%)" }}>
                            {c.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground">{c.name}</p>
                            <p className="text-[10px] text-foreground/45">{c.info}</p>
                          </div>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0"
                            style={{ background: `hsl(${c.sc} / 0.15)`, color: `hsl(${c.sc})` }}>{c.status}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="px-5 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold" style={{ color: "hsl(340 55% 60% / 0.7)" }}>NPS Score</span>
                        <span className="text-sm font-extrabold" style={{ color: "hsl(340 55% 60%)" }}>72</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: "hsl(340 55% 60% / 0.15)" }}>
                        <motion.div className="h-full rounded-full" style={{ background: "hsl(340 55% 60%)" }}
                          initial={{ width: "0%" }} whileInView={{ width: "72%" }}
                          viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.8 }} />
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-3 flex flex-wrap gap-2 border-t" style={{ borderColor: "hsl(340 55% 60% / 0.12)", background: "hsl(340 55% 60% / 0.04)" }}>
                    {capabilities[4].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(340 55% 60% / 0.12)", color: "hsl(340 55% 60%)", border: "1px solid hsl(340 55% 60% / 0.28)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[4].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[4].description}</p>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* ══════════════════════════════════════ */}
            {/* OPCIÓN 2 — Datos en movimiento          */}
            {/* ══════════════════════════════════════ */}
            <div className="mb-28">
              <div className="inline-block bg-red-500 text-white font-bold px-5 py-2 rounded-xl mb-8 text-sm tracking-wider shadow-lg">
                OPCIÓN 2 — Datos en movimiento
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

                {/* LLAMADAS */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="md:col-span-2 rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(190 60% 55% / 0.25)", background: "hsl(190 60% 55% / 0.04)" }}>
                  <div className="relative h-52 flex flex-col items-center justify-center overflow-hidden px-8"
                    style={{ background: "hsl(190 60% 55% / 0.08)" }}>
                    {[1,2,3,4].map(n => (
                      <motion.div key={n} className="absolute rounded-full border"
                        style={{ width: n * 85, height: n * 85, borderColor: `hsl(190 60% 55% / ${0.05 + n * 0.04})` }}
                        animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 3 + n, repeat: Infinity, delay: n * 0.5 }} />
                    ))}
                    <div className="relative z-10 text-center">
                      <motion.div className="text-7xl font-display font-black leading-none" style={{ color: "hsl(190 60% 55%)" }}
                        animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 2, repeat: Infinity }}>
                        24/7
                      </motion.div>
                      <div className="text-sm font-semibold text-foreground/60 mt-2 mb-3">365 días al año, sin parar</div>
                      <div className="flex items-center gap-2 justify-center">
                        <motion.div className="w-2 h-2 rounded-full bg-green-400" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                        <span className="text-xs font-bold text-green-400">Activo ahora mismo</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-3 flex flex-wrap gap-2 border-t" style={{ borderColor: "hsl(190 60% 55% / 0.12)", background: "hsl(190 60% 55% / 0.04)" }}>
                    {capabilities[0].chips.map(chip => (
                      <span key={chip} className="px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(190 60% 55% / 0.15)", color: "hsl(190 60% 55%)", border: "1px solid hsl(190 60% 55% / 0.32)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-7 md:p-8 flex-1">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2 leading-tight">{capabilities[0].title}</h3>
                    <p className="text-base text-foreground/65 font-light leading-relaxed">{capabilities[0].description}</p>
                  </div>
                </motion.div>

                {/* AGENDA */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(160 50% 48% / 0.25)", background: "hsl(160 50% 48% / 0.04)" }}>
                  <div className="relative h-52 flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: "hsl(160 50% 48% / 0.08)" }}>
                    <div className="text-center">
                      <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "hsl(160 50% 48% / 0.6)" }}>PRÓXIMA CITA</div>
                      <motion.div className="text-5xl font-display font-black" style={{ color: "hsl(160 50% 48%)" }}
                        animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }}>
                        14 min
                      </motion.div>
                      <div className="mt-2 text-xs font-semibold text-foreground/50">Ana García · 10:30</div>
                      <motion.div className="mt-4 mx-auto px-4 py-1.5 rounded-xl text-xs font-semibold inline-block"
                        style={{ background: "hsl(160 50% 48% / 0.18)", color: "hsl(160 50% 48%)", border: "1px solid hsl(160 50% 48% / 0.3)" }}
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                        📅 Recordatorio enviado ✓
                      </motion.div>
                    </div>
                  </div>
                  <div className="px-5 py-3 flex flex-wrap gap-2 border-t" style={{ borderColor: "hsl(160 50% 48% / 0.12)", background: "hsl(160 50% 48% / 0.04)" }}>
                    {capabilities[1].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(160 50% 48% / 0.15)", color: "hsl(160 50% 48%)", border: "1px solid hsl(160 50% 48% / 0.32)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[1].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[1].description}</p>
                  </div>
                </motion.div>

                {/* FLUJOS */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(245 60% 62% / 0.25)", background: "hsl(245 60% 62% / 0.04)" }}>
                  <div className="relative h-52 flex items-center justify-center overflow-hidden"
                    style={{ background: "hsl(245 60% 62% / 0.08)" }}>
                    <div className="relative w-full h-full flex items-center justify-center">
                      {["CRM","ERP","Slack","Email","API"].map((label, i) => {
                        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                        const r = 62;
                        const x = Math.cos(angle) * r;
                        const y = Math.sin(angle) * r;
                        return (
                          <motion.div key={label}
                            className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-[10px] font-bold border"
                            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, background: "hsl(245 60% 62% / 0.2)", borderColor: "hsl(245 60% 62% / 0.4)", color: "hsl(245 60% 62%)" }}
                            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
                            {label}
                          </motion.div>
                        );
                      })}
                      <motion.div className="w-14 h-14 rounded-full flex items-center justify-center z-10" style={{ background: "hsl(245 60% 62%)" }}
                        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Network className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="px-5 py-3 flex flex-wrap gap-2 border-t" style={{ borderColor: "hsl(245 60% 62% / 0.12)", background: "hsl(245 60% 62% / 0.04)" }}>
                    {capabilities[2].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(245 60% 62% / 0.15)", color: "hsl(245 60% 62%)", border: "1px solid hsl(245 60% 62% / 0.32)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[2].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[2].description}</p>
                  </div>
                </motion.div>

                {/* ANALÍTICA */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.24 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(35 70% 58% / 0.25)", background: "hsl(35 70% 58% / 0.04)" }}>
                  <div className="relative h-52 flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: "hsl(35 70% 58% / 0.08)" }}>
                    <motion.div className="text-6xl font-display font-black" style={{ color: "hsl(35 70% 58%)" }}
                      animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2.5, repeat: Infinity }}>+94%</motion.div>
                    <div className="text-sm font-semibold text-foreground/50 mt-1">satisfacción media</div>
                    <div className="mt-4 flex items-end gap-1 h-10">
                      {[30, 50, 40, 70, 55, 80, 65, 90, 75, 94].map((h, i) => (
                        <motion.div key={i} className="w-3 rounded-t-sm"
                          style={{ height: `${h}%`, background: `hsl(35 70% 58% / ${i === 9 ? "1" : "0.4"})` }}
                          initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.07, ease: "backOut" }} />
                      ))}
                    </div>
                  </div>
                  <div className="px-5 py-3 flex flex-wrap gap-2 border-t" style={{ borderColor: "hsl(35 70% 58% / 0.12)", background: "hsl(35 70% 58% / 0.04)" }}>
                    {capabilities[3].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(35 70% 58% / 0.15)", color: "hsl(35 70% 58%)", border: "1px solid hsl(35 70% 58% / 0.32)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[3].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[3].description}</p>
                  </div>
                </motion.div>

                {/* FIDELIZACIÓN */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.32 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(340 55% 60% / 0.25)", background: "hsl(340 55% 60% / 0.04)" }}>
                  <div className="relative h-52 flex flex-col items-center justify-center gap-4 overflow-hidden"
                    style={{ background: "hsl(340 55% 60% / 0.08)" }}>
                    <div className="relative w-28 h-28">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(340 55% 60% / 0.15)" strokeWidth="10" />
                        <motion.circle cx="50" cy="50" r="40" fill="none" stroke="hsl(340 55% 60%)" strokeWidth="10"
                          strokeLinecap="round" strokeDasharray="251.2"
                          initial={{ strokeDashoffset: 251.2 }} whileInView={{ strokeDashoffset: 251.2 * 0.28 }}
                          viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }} />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-display font-black" style={{ color: "hsl(340 55% 60%)" }}>72</span>
                        <span className="text-[10px] font-bold text-foreground/50">NPS</span>
                      </div>
                    </div>
                    <motion.div className="px-4 py-2 rounded-xl text-xs font-semibold"
                      style={{ background: "hsl(340 55% 60% / 0.15)", color: "hsl(340 55% 60%)", border: "1px solid hsl(340 55% 60% / 0.3)" }}
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                      +23 clientes recuperados este mes
                    </motion.div>
                  </div>
                  <div className="px-5 py-3 flex flex-wrap gap-2 border-t" style={{ borderColor: "hsl(340 55% 60% / 0.12)", background: "hsl(340 55% 60% / 0.04)" }}>
                    {capabilities[4].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(340 55% 60% / 0.15)", color: "hsl(340 55% 60%)", border: "1px solid hsl(340 55% 60% / 0.32)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[4].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[4].description}</p>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* ══════════════════════════════════════ */}
            {/* OPCIÓN 3 — Híbrido                     */}
            {/* ══════════════════════════════════════ */}
            <div className="mb-28">
              <div className="inline-block bg-red-500 text-white font-bold px-5 py-2 rounded-xl mb-8 text-sm tracking-wider shadow-lg">
                OPCIÓN 3 — Híbrido
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

                {/* LLAMADAS */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="md:col-span-2 rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(190 60% 55% / 0.25)", background: "hsl(190 60% 55% / 0.04)" }}>
                  <div className="relative h-32 flex items-center justify-center overflow-hidden" style={{ background: "hsl(190 60% 55% / 0.08)" }}>
                    {[1,2,3].map(n => (
                      <motion.div key={n} className="absolute rounded-full border"
                        style={{ width: n * 65, height: n * 65, borderColor: "hsl(190 60% 55% / 0.2)" }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: n * 0.5 }} />
                    ))}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center z-10"
                      style={{ background: "hsl(190 60% 55% / 0.2)", border: "1px solid hsl(190 60% 55% / 0.4)" }}>
                      <Phone className="w-7 h-7" style={{ color: "hsl(190 60% 55%)" }} />
                    </div>
                  </div>
                  <div className="px-6 py-3 border-t border-b" style={{ borderColor: "hsl(190 60% 55% / 0.15)", background: "hsl(190 60% 55% / 0.06)" }}>
                    <motion.div className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: "hsl(190 60% 55% / 0.12)", border: "1px solid hsl(190 60% 55% / 0.25)" }}
                      animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                      <motion.div className="w-2 h-2 rounded-full bg-green-400 shrink-0" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                      <div>
                        <p className="text-xs font-bold text-foreground">Llamada entrante gestionada</p>
                        <p className="text-[10px] text-foreground/50">Carlos Martínez · Consulta resuelta · 2 min</p>
                      </div>
                      <Check className="w-4 h-4 ml-auto shrink-0" style={{ color: "hsl(160 60% 45%)" }} />
                    </motion.div>
                  </div>
                  <div className="px-6 py-3.5 flex flex-wrap gap-2" style={{ background: "hsl(190 60% 55% / 0.06)" }}>
                    {capabilities[0].chips.map(chip => (
                      <span key={chip} className="px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(190 60% 55% / 0.18)", color: "hsl(190 60% 55%)", border: "1px solid hsl(190 60% 55% / 0.38)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-7 md:p-8 flex-1">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2 leading-tight">{capabilities[0].title}</h3>
                    <p className="text-base text-foreground/65 font-light leading-relaxed">{capabilities[0].description}</p>
                  </div>
                </motion.div>

                {/* AGENDA */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(160 50% 48% / 0.25)", background: "hsl(160 50% 48% / 0.04)" }}>
                  <div className="relative h-32 flex items-center justify-center overflow-hidden" style={{ background: "hsl(160 50% 48% / 0.08)" }}>
                    <div className="rounded-2xl p-4" style={{ background: "hsl(160 50% 48% / 0.14)", border: "1px solid hsl(160 50% 48% / 0.22)" }}>
                      <CalendarCheck className="w-10 h-10" style={{ color: "hsl(160 50% 48%)" }} />
                    </div>
                  </div>
                  <div className="px-5 py-3 border-t border-b" style={{ borderColor: "hsl(160 50% 48% / 0.15)", background: "hsl(160 50% 48% / 0.06)" }}>
                    <motion.div className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: "hsl(160 50% 48% / 0.12)", border: "1px solid hsl(160 50% 48% / 0.25)" }}
                      animate={{ y: [0, -2, 0] }} transition={{ duration: 3.2, repeat: Infinity }}>
                      <span className="text-base shrink-0">📅</span>
                      <div>
                        <p className="text-xs font-bold text-foreground">Cita agendada automáticamente</p>
                        <p className="text-[10px] text-foreground/50">Mañana · 10:30 · Recordatorio enviado</p>
                      </div>
                    </motion.div>
                  </div>
                  <div className="px-5 py-3.5 flex flex-wrap gap-2" style={{ background: "hsl(160 50% 48% / 0.06)" }}>
                    {capabilities[1].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(160 50% 48% / 0.18)", color: "hsl(160 50% 48%)", border: "1px solid hsl(160 50% 48% / 0.38)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[1].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[1].description}</p>
                  </div>
                </motion.div>

                {/* FLUJOS */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(245 60% 62% / 0.25)", background: "hsl(245 60% 62% / 0.04)" }}>
                  <div className="relative h-32 flex items-center justify-center overflow-hidden" style={{ background: "hsl(245 60% 62% / 0.08)" }}>
                    <div className="flex items-center gap-2">
                      {["CRM", null, "Slack", null, "✓"].map((item, i) => item === null ? (
                        <ChevronRight key={i} className="w-4 h-4" style={{ color: "hsl(245 60% 62% / 0.4)" }} />
                      ) : (
                        <motion.div key={i} className="px-3 py-1.5 rounded-lg text-xs font-bold border"
                          style={{ background: "hsl(245 60% 62% / 0.2)", borderColor: "hsl(245 60% 62% / 0.4)", color: item === "✓" ? "hsl(160 60% 45%)" : "hsl(245 60% 62%)" }}
                          animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}>
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="px-5 py-3 border-t border-b" style={{ borderColor: "hsl(245 60% 62% / 0.15)", background: "hsl(245 60% 62% / 0.06)" }}>
                    <motion.div className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: "hsl(245 60% 62% / 0.12)", border: "1px solid hsl(245 60% 62% / 0.25)" }}
                      animate={{ y: [0, -2, 0] }} transition={{ duration: 2.8, repeat: Infinity }}>
                      <span className="text-base shrink-0">⚡</span>
                      <div>
                        <p className="text-xs font-bold text-foreground">Flujo ejecutado</p>
                        <p className="text-[10px] text-foreground/50">Llamada → CRM → Email · hace 2 min</p>
                      </div>
                    </motion.div>
                  </div>
                  <div className="px-5 py-3.5 flex flex-wrap gap-2" style={{ background: "hsl(245 60% 62% / 0.06)" }}>
                    {capabilities[2].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(245 60% 62% / 0.18)", color: "hsl(245 60% 62%)", border: "1px solid hsl(245 60% 62% / 0.38)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[2].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[2].description}</p>
                  </div>
                </motion.div>

                {/* ANALÍTICA */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.24 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(35 70% 58% / 0.25)", background: "hsl(35 70% 58% / 0.04)" }}>
                  <div className="relative h-32 flex items-center justify-center overflow-hidden" style={{ background: "hsl(35 70% 58% / 0.08)" }}>
                    <div className="flex items-end gap-2 h-14">
                      {[40, 60, 45, 80, 65, 75, 90].map((h, i) => (
                        <motion.div key={i} className="w-5 rounded-t-sm"
                          style={{ height: `${h}%`, background: `hsl(35 70% 58% / ${i === 6 ? "1" : "0.4"})` }}
                          animate={{ scaleY: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.12 }} />
                      ))}
                    </div>
                  </div>
                  <div className="px-5 py-3 border-t border-b" style={{ borderColor: "hsl(35 70% 58% / 0.15)", background: "hsl(35 70% 58% / 0.06)" }}>
                    <motion.div className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: "hsl(35 70% 58% / 0.12)", border: "1px solid hsl(35 70% 58% / 0.25)" }}
                      animate={{ y: [0, -2, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
                      <span className="text-base shrink-0">📊</span>
                      <div>
                        <p className="text-xs font-bold text-foreground">Dashboard actualizado</p>
                        <p className="text-[10px] text-foreground/50">47 llamadas · 94% satisfacción · 8s respuesta</p>
                      </div>
                    </motion.div>
                  </div>
                  <div className="px-5 py-3.5 flex flex-wrap gap-2" style={{ background: "hsl(35 70% 58% / 0.06)" }}>
                    {capabilities[3].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(35 70% 58% / 0.18)", color: "hsl(35 70% 58%)", border: "1px solid hsl(35 70% 58% / 0.38)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[3].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[3].description}</p>
                  </div>
                </motion.div>

                {/* FIDELIZACIÓN */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.32 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "hsl(340 55% 60% / 0.25)", background: "hsl(340 55% 60% / 0.04)" }}>
                  <div className="relative h-32 flex items-center justify-center overflow-hidden" style={{ background: "hsl(340 55% 60% / 0.08)" }}>
                    <div className="flex items-center">
                      {["JG","MR","LP","AC"].map((init, n) => (
                        <div key={n} className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2"
                          style={{ background: "hsl(340 55% 60% / 0.15)", borderColor: "hsl(340 55% 60% / 0.3)", color: "hsl(340 55% 60%)", marginLeft: n > 0 ? "-8px" : 0 }}>
                          {init}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-5 py-3 border-t border-b" style={{ borderColor: "hsl(340 55% 60% / 0.15)", background: "hsl(340 55% 60% / 0.06)" }}>
                    <motion.div className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: "hsl(340 55% 60% / 0.12)", border: "1px solid hsl(340 55% 60% / 0.25)" }}
                      animate={{ y: [0, -2, 0] }} transition={{ duration: 3.2, repeat: Infinity }}>
                      <span className="text-base shrink-0">🔔</span>
                      <div>
                        <p className="text-xs font-bold text-foreground">Cliente recuperado</p>
                        <p className="text-[10px] text-foreground/50">María García · 8 meses inactiva · Reactivada ✓</p>
                      </div>
                    </motion.div>
                  </div>
                  <div className="px-5 py-3.5 flex flex-wrap gap-2" style={{ background: "hsl(340 55% 60% / 0.06)" }}>
                    {capabilities[4].chips.map(chip => (
                      <span key={chip} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "hsl(340 55% 60% / 0.18)", color: "hsl(340 55% 60%)", border: "1px solid hsl(340 55% 60% / 0.38)" }}>{chip}</span>
                    ))}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[4].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[4].description}</p>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* ══════════════════════════════════════ */}
            {/* OPCIÓN 4 — Diseño actual                */}
            {/* ══════════════════════════════════════ */}
            <div>
              <div className="inline-block bg-red-500 text-white font-bold px-5 py-2 rounded-xl mb-8 text-sm tracking-wider shadow-lg">
                OPCIÓN 4 — Diseño actual
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredCap(0)} onMouseLeave={() => setHoveredCap(null)}
                  className="md:col-span-2 rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 cursor-default"
                  style={{ borderColor: `hsl(190 60% 55% / ${hoveredCap === 0 ? "0.40" : "0.18"})`, background: `hsl(190 60% 55% / ${hoveredCap === 0 ? "0.06" : "0.03"})` }}
                >
                  <div className="relative h-44 flex items-center justify-center overflow-hidden" style={{ background: "hsl(190 60% 55% / 0.07)" }}>
                    {[1, 2, 3].map(n => (
                      <motion.div key={n} className="absolute rounded-full border"
                        style={{ width: n * 62, height: n * 62, borderColor: "hsl(190 60% 55% / 0.25)" }}
                        animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }}
                        transition={{ duration: 2.8, repeat: Infinity, delay: n * 0.55, ease: "easeOut" }} />
                    ))}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10"
                      style={{ background: "hsl(190 60% 55% / 0.18)", border: "1px solid hsl(190 60% 55% / 0.35)" }}>
                      <Phone className="w-7 h-7" style={{ color: "hsl(190 60% 55%)" }} />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-44 h-6 overflow-hidden">
                      <svg viewBox="0 0 200 24" className="w-full h-full" preserveAspectRatio="none">
                        <path d="M0,12 C14,2 28,22 42,12 C56,2 70,22 84,12 C98,2 112,22 126,12 C140,2 154,22 168,12 C182,2 196,22 210,12" fill="none" stroke="hsl(190 60% 55% / 0.18)" strokeWidth="1.5" strokeLinecap="round" />
                        <motion.path d="M0,12 C14,2 28,22 42,12 C56,2 70,22 84,12 C98,2 112,22 126,12 C140,2 154,22 168,12 C182,2 196,22 210,12"
                          fill="none" stroke="hsl(190 60% 55% / 0.65)" strokeWidth="2" strokeLinecap="round"
                          strokeDasharray="28 10" animate={{ strokeDashoffset: [0, -38] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
                      </svg>
                    </div>
                    <motion.div className="absolute top-4 right-5 rounded-xl px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm"
                      style={{ background: "hsl(190 60% 55% / 0.12)", borderColor: "hsl(190 60% 55% / 0.3)", color: "hsl(190 60% 55%)" }}
                      animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
                      ↙ Entrante
                    </motion.div>
                    <motion.div className="absolute top-4 left-5 rounded-xl px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm"
                      style={{ background: "hsl(190 60% 55% / 0.12)", borderColor: "hsl(190 60% 55% / 0.3)", color: "hsl(190 60% 55%)" }}
                      animate={{ y: [0, -5, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}>
                      ↗ Saliente
                    </motion.div>
                    <motion.div className="absolute bottom-4 right-5 rounded-xl px-2.5 py-1 text-xs font-black border"
                      style={{ background: "hsl(190 60% 55% / 0.18)", borderColor: "hsl(190 60% 55% / 0.45)", color: "hsl(190 60% 55%)" }}
                      animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 2.2, repeat: Infinity }}>
                      24 / 7
                    </motion.div>
                  </div>
                  <div className="p-7 md:p-8 flex-1">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2 leading-tight">{capabilities[0].title}</h3>
                    <p className="text-base text-foreground/65 font-light leading-relaxed">{capabilities[0].description}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredCap(1)} onMouseLeave={() => setHoveredCap(null)}
                  className="rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 cursor-default"
                  style={{ borderColor: `hsl(160 50% 48% / ${hoveredCap === 1 ? "0.40" : "0.18"})`, background: `hsl(160 50% 48% / ${hoveredCap === 1 ? "0.06" : "0.03"})` }}
                >
                  <div className="relative h-56 flex items-center justify-center overflow-hidden" style={{ background: "hsl(160 50% 48% / 0.07)" }}>
                    <motion.div className="absolute top-3.5 right-4 rounded-xl px-2.5 py-1 text-[10px] font-semibold border backdrop-blur-sm z-10"
                      style={{ background: "hsl(160 50% 48% / 0.14)", borderColor: "hsl(160 50% 48% / 0.3)", color: "hsl(160 50% 48%)" }}
                      animate={{ y: [0, -3, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
                      📅 Mañana · 10:30
                    </motion.div>
                    <div className="rounded-2xl p-3" style={{ background: "hsl(160 50% 48% / 0.10)", border: "1px solid hsl(160 50% 48% / 0.18)" }}>
                      <p className="text-[9px] font-bold text-center mb-1.5 tracking-widest" style={{ color: "hsl(160 50% 48%)" }}>OCTUBRE</p>
                      <div className="grid grid-cols-7 gap-1 mb-1">
                        {["L","M","X","J","V","S","D"].map(d => (
                          <div key={d} className="w-5 h-4 flex items-center justify-center text-[8px] font-bold" style={{ color: "hsl(160 50% 48% / 0.5)" }}>{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 28 }, (_, n) => {
                          const day = n + 1;
                          const booked = [3, 8, 12, 17, 22].includes(day);
                          const weekend = [6,7,13,14,20,21,27,28].includes(day);
                          return (
                            <motion.div key={day} className="w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold"
                              style={{ background: booked ? "hsl(160 50% 48%)" : weekend ? "transparent" : "hsl(160 50% 48% / 0.08)", color: booked ? "#fff" : weekend ? "hsl(160 50% 48% / 0.25)" : "hsl(160 50% 48% / 0.6)" }}
                              animate={booked ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 2.2, repeat: Infinity, delay: [3,8,12,17,22].indexOf(day) * 0.5 }}>
                              {day}
                            </motion.div>
                          );
                        })}
                      </div>
                      <div className="flex justify-center gap-1.5 mt-2">
                        {["Google Cal", "Calendly", "CRM"].map(label => (
                          <span key={label} className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full"
                            style={{ background: "hsl(160 50% 48% / 0.15)", color: "hsl(160 50% 48% / 0.8)" }}>{label}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-base md:text-lg font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[1].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[1].description}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredCap(2)} onMouseLeave={() => setHoveredCap(null)}
                  className="rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 cursor-default"
                  style={{ borderColor: `hsl(245 60% 62% / ${hoveredCap === 2 ? "0.40" : "0.18"})`, background: `hsl(245 60% 62% / ${hoveredCap === 2 ? "0.06" : "0.03"})` }}
                >
                  <div className="relative h-52 flex items-center justify-center overflow-hidden" style={{ background: "hsl(245 60% 62% / 0.07)" }}>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {[["50%","50%","13%","16%"],["50%","50%","87%","16%"],["50%","50%","13%","84%"],["50%","50%","87%","84%"]].map(([x1,y1,x2,y2], i) => (
                        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke="hsl(245 60% 62% / 0.4)" strokeWidth="1.5" strokeDasharray="4 3"
                          animate={{ opacity: [0.2, 0.9, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
                      ))}
                    </svg>
                    {[{ pos: { top: "9%", left: "4%" }, label: "CRM" }, { pos: { top: "9%", right: "4%" }, label: "API" }, { pos: { bottom: "9%", left: "4%" }, label: "Slack" }, { pos: { bottom: "9%", right: "4%" }, label: "Email" }].map(({ pos, label }, i) => (
                      <motion.div key={i} className="absolute z-10 rounded-lg px-2.5 py-1 text-[10px] font-bold border"
                        style={{ ...pos, background: "hsl(245 60% 62% / 0.18)", borderColor: "hsl(245 60% 62% / 0.4)", color: "hsl(245 60% 62%)" }}
                        animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35 }}>
                        {label}
                      </motion.div>
                    ))}
                    <motion.div className="relative z-20 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "hsl(245 60% 62%)" }}
                      animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
                      <Network className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                  <div className="p-5 md:p-6 flex-1">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[2].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[2].description}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredCap(3)} onMouseLeave={() => setHoveredCap(null)}
                  className="rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 cursor-default"
                  style={{ borderColor: `hsl(35 70% 58% / ${hoveredCap === 3 ? "0.40" : "0.18"})`, background: `hsl(35 70% 58% / ${hoveredCap === 3 ? "0.06" : "0.03"})` }}
                >
                  <div className="relative h-52 overflow-hidden" style={{ background: "hsl(35 70% 58% / 0.07)" }}>
                    <motion.div className="absolute top-3.5 left-4 rounded-xl px-3 py-1.5 text-[10px] font-semibold border backdrop-blur-sm z-10"
                      style={{ background: "hsl(35 70% 58% / 0.14)", borderColor: "hsl(35 70% 58% / 0.35)", color: "hsl(35 70% 58%)" }}
                      animate={{ y: [0, -3, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
                      ↑ +32% satisfacción
                    </motion.div>
                    <div className="absolute inset-x-5 bottom-5 top-14 flex items-end gap-1.5">
                      {[55, 80, 45, 90, 65, 75, 50].map((h, n) => (
                        <motion.div key={n} className="flex-1 rounded-t-md"
                          style={{ height: `${h}%`, background: `hsl(35 70% 58% / ${n === 3 ? "1" : "0.45"})`, transformOrigin: "bottom" }}
                          animate={{ scaleY: [0.75, 1, 0.75] }} transition={{ duration: 2.5, repeat: Infinity, delay: n * 0.15, ease: "easeInOut" }} />
                      ))}
                    </div>
                    <svg className="absolute pointer-events-none" style={{ left: "1.25rem", right: "1.25rem", top: "3.5rem", bottom: "1.25rem", width: "calc(100% - 2.5rem)", height: "calc(100% - 4.75rem)" }} viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.polyline points="7,45 21,20 35,55 50,10 64,35 78,25 93,50"
                        fill="none" stroke="hsl(35 70% 58%)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        strokeDasharray="200" animate={{ strokeDashoffset: [200, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }} />
                    </svg>
                  </div>
                  <div className="p-5 md:p-6 flex-1">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[3].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[3].description}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredCap(4)} onMouseLeave={() => setHoveredCap(null)}
                  className="rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 cursor-default"
                  style={{ borderColor: `hsl(340 55% 60% / ${hoveredCap === 4 ? "0.40" : "0.18"})`, background: `hsl(340 55% 60% / ${hoveredCap === 4 ? "0.06" : "0.03"})` }}
                >
                  <div className="relative h-52 flex flex-col items-center justify-center gap-5 overflow-hidden" style={{ background: "hsl(340 55% 60% / 0.07)" }}>
                    <div className="flex items-center">
                      {["JG", "MR", "LP", "AC"].map((initials, n) => (
                        <motion.div key={n} className="relative w-11 h-11 rounded-full flex items-center justify-center font-display font-extrabold text-sm border-2"
                          style={{ background: `hsl(340 55% 60% / ${0.1 + n * 0.04})`, borderColor: "hsl(340 55% 60% / 0.3)", color: "hsl(340 55% 60%)", marginLeft: n > 0 ? "-10px" : "0", zIndex: 4 - n }}
                          initial={{ x: 16, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }} transition={{ delay: 0.3 + n * 0.1, duration: 0.4, ease: "backOut" }}>
                          {initials}
                          <motion.div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "hsl(160 60% 45%)" }}
                            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.65 + n * 0.1 }}>
                            <Check className="w-2.5 h-2.5 text-white" />
                          </motion.div>
                        </motion.div>
                      ))}
                      <motion.div className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-sm border-2"
                        style={{ background: "hsl(340 55% 60% / 0.08)", borderColor: "hsl(340 55% 60% / 0.25)", color: "hsl(340 55% 60%)", marginLeft: "-10px" }}
                        initial={{ x: 16, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.75 }}>
                        +12
                      </motion.div>
                    </div>
                    <div className="w-44">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "hsl(340 55% 60% / 0.7)" }}>NPS Score</span>
                        <motion.span className="text-sm font-display font-extrabold" style={{ color: "hsl(340 55% 60%)" }}
                          animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 2.5, repeat: Infinity }}>72</motion.span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "hsl(340 55% 60% / 0.15)" }}>
                        <motion.div className="h-full rounded-full" style={{ background: "hsl(340 55% 60%)" }}
                          initial={{ width: "0%" }} whileInView={{ width: "72%" }}
                          viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }} />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 md:p-6 flex-1">
                    <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[4].title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{capabilities[4].description}</p>
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
