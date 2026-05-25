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
    description: "Entrante, saliente, 24 horas al día, 7 días a la semana. Nunca una llamada perdida.",
    chips: ["Llamadas entrantes", "Llamadas salientes", "24/7", "Voz natural"],
    hsl: "190 60% 55%",
    Icon: Phone,
  },
  {
    title: "Agendamos citas sin intervención humana",
    description: "Tu calendario se llena solo. Sin errores ni dobles reservas.",
    chips: ["Google Calendar", "Calendly", "CRM", "Recordatorios"],
    hsl: "160 50% 48%",
    Icon: CalendarCheck,
  },
  {
    title: "Automatizamos flujos y procesos internos",
    description: "Transferencias inteligentes, integraciones y asistentes IA a medida para tu operativa.",
    chips: ["Integraciones", "Workflows", "Asistentes IA", "API"],
    hsl: "245 60% 62%",
    Icon: Network,
  },
  {
    title: "Analizamos cada conversación en tiempo real",
    description: "Dashboard con todo lo que pasa en tu atención. Sabes qué funciona y dónde mejorar.",
    chips: ["Analytics", "Sentimiento", "Patrones", "Informes semanales"],
    hsl: "35 70% 58%",
    Icon: BarChart3,
  },
  {
    title: "Fidelizamos a tus clientes post-venta",
    description: "Seguimiento automático, NPS y detección de churn antes de que se vayan.",
    chips: ["Post-venta", "NPS", "Retención", "Cross-sell"],
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

            {/* ── Bento grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

              {/* LLAMADAS — featured (col-span-2) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredCap(0)} onMouseLeave={() => setHoveredCap(null)}
                className="md:col-span-2 rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 cursor-default"
                style={{ borderColor: `hsl(190 60% 55% / ${hoveredCap === 0 ? "0.40" : "0.18"})`, background: `hsl(190 60% 55% / ${hoveredCap === 0 ? "0.06" : "0.03"})` }}
              >
                <div className="relative h-52 flex items-center justify-center overflow-hidden" style={{ background: "hsl(190 60% 55% / 0.07)" }}>
                  {[1, 2, 3].map(n => (
                    <motion.div key={n} className="absolute rounded-full border"
                      style={{ width: n * 72, height: n * 72, borderColor: "hsl(190 60% 55% / 0.28)" }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.8, repeat: Infinity, delay: n * 0.55, ease: "easeOut" }} />
                  ))}
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
                    style={{ background: "hsl(190 60% 55% / 0.18)", border: "1px solid hsl(190 60% 55% / 0.35)" }}>
                    <Phone className="w-8 h-8" style={{ color: "hsl(190 60% 55%)" }} />
                  </div>
                  <motion.div
                    className="absolute top-5 right-6 rounded-2xl px-4 py-2 text-xs font-semibold border backdrop-blur-sm"
                    style={{ background: "hsl(190 60% 55% / 0.12)", borderColor: "hsl(190 60% 55% / 0.3)", color: "hsl(190 60% 55%)" }}
                    animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ● Llamada entrante
                  </motion.div>
                </div>
                <div className="p-7 md:p-8 flex-1">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2 leading-tight">{capabilities[0].title}</h3>
                  <p className="text-base text-foreground/65 font-light mb-5 leading-relaxed">{capabilities[0].description}</p>
                  <div className="flex flex-wrap gap-2">
                    {capabilities[0].chips.map(chip => (
                      <span key={chip} className="text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{ background: "hsl(190 60% 55% / 0.10)", color: "hsl(190 60% 55%)" }}>{chip}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* AGENDA (col-span-1) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredCap(1)} onMouseLeave={() => setHoveredCap(null)}
                className="rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 cursor-default"
                style={{ borderColor: `hsl(160 50% 48% / ${hoveredCap === 1 ? "0.40" : "0.18"})`, background: `hsl(160 50% 48% / ${hoveredCap === 1 ? "0.06" : "0.03"})` }}
              >
                <div className="relative h-52 flex items-center justify-center overflow-hidden" style={{ background: "hsl(160 50% 48% / 0.07)" }}>
                  <div className="rounded-2xl p-3.5" style={{ background: "hsl(160 50% 48% / 0.10)", border: "1px solid hsl(160 50% 48% / 0.18)" }}>
                    <p className="text-[10px] font-bold text-center mb-2.5 tracking-widest" style={{ color: "hsl(160 50% 48%)" }}>OCTUBRE</p>
                    <div className="grid grid-cols-5 gap-1.5">
                      {Array.from({ length: 15 }, (_, n) => {
                        const day = n + 1;
                        const booked = [3, 8, 12].includes(day);
                        return (
                          <motion.div key={day}
                            className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold"
                            style={{ background: booked ? "hsl(160 50% 48%)" : "hsl(160 50% 48% / 0.08)", color: booked ? "#fff" : "hsl(160 50% 48% / 0.6)" }}
                            animate={booked ? { scale: [1, 1.12, 1] } : {}}
                            transition={{ duration: 2.2, repeat: Infinity, delay: [3, 8, 12].indexOf(day) * 0.8 }}
                          >{day}</motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-base md:text-lg font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[1].title}</h3>
                  <p className="text-sm text-foreground/65 font-light mb-4 leading-relaxed">{capabilities[1].description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {capabilities[1].chips.map(chip => (
                      <span key={chip} className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "hsl(160 50% 48% / 0.10)", color: "hsl(160 50% 48%)" }}>{chip}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* FLUJOS — network nodes */}
              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredCap(2)} onMouseLeave={() => setHoveredCap(null)}
                className="rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 cursor-default"
                style={{ borderColor: `hsl(245 60% 62% / ${hoveredCap === 2 ? "0.40" : "0.18"})`, background: `hsl(245 60% 62% / ${hoveredCap === 2 ? "0.06" : "0.03"})` }}
              >
                <div className="relative h-40 flex items-center justify-center overflow-hidden" style={{ background: "hsl(245 60% 62% / 0.07)" }}>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {[["50%","50%","18%","18%"],["50%","50%","82%","18%"],["50%","50%","18%","82%"],["50%","50%","82%","82%"]].map(([x1,y1,x2,y2], i) => (
                      <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="hsl(245 60% 62% / 0.45)" strokeWidth="1.5" strokeDasharray="4 3"
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
                    ))}
                  </svg>
                  {[{ top: "14%", left: "14%" },{ top: "14%", right: "14%" },{ bottom: "14%", left: "14%" },{ bottom: "14%", right: "14%" }].map((pos, i) => (
                    <div key={i} className="absolute w-7 h-7 rounded-full z-10" style={{ ...pos, background: "hsl(245 60% 62% / 0.55)" }} />
                  ))}
                  <motion.div className="relative z-20 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(245 60% 62%)" }}
                    animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
                    <Network className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
                <div className="p-5 md:p-6 flex-1">
                  <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[2].title}</h3>
                  <p className="text-sm text-foreground/65 font-light mb-3 leading-relaxed">{capabilities[2].description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {capabilities[2].chips.map(chip => (
                      <span key={chip} className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "hsl(245 60% 62% / 0.10)", color: "hsl(245 60% 62%)" }}>{chip}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ANALÍTICA — animated bars */}
              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredCap(3)} onMouseLeave={() => setHoveredCap(null)}
                className="rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 cursor-default"
                style={{ borderColor: `hsl(35 70% 58% / ${hoveredCap === 3 ? "0.40" : "0.18"})`, background: `hsl(35 70% 58% / ${hoveredCap === 3 ? "0.06" : "0.03"})` }}
              >
                <div className="relative h-40 flex items-end justify-center gap-1.5 overflow-hidden pb-5 px-6" style={{ background: "hsl(35 70% 58% / 0.07)" }}>
                  {[55, 80, 45, 90, 65, 75, 50].map((h, n) => (
                    <motion.div key={n}
                      className="flex-1 rounded-t-md"
                      style={{ height: `${h}%`, background: `hsl(35 70% 58% / ${n === 3 ? "1" : "0.55"})`, transformOrigin: "bottom" }}
                      animate={{ scaleY: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: n * 0.15, ease: "easeInOut" }} />
                  ))}
                </div>
                <div className="p-5 md:p-6 flex-1">
                  <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[3].title}</h3>
                  <p className="text-sm text-foreground/65 font-light mb-3 leading-relaxed">{capabilities[3].description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {capabilities[3].chips.map(chip => (
                      <span key={chip} className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "hsl(35 70% 58% / 0.10)", color: "hsl(35 70% 58%)" }}>{chip}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* FIDELIZACIÓN — avatars */}
              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredCap(4)} onMouseLeave={() => setHoveredCap(null)}
                className="rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 cursor-default"
                style={{ borderColor: `hsl(340 55% 60% / ${hoveredCap === 4 ? "0.40" : "0.18"})`, background: `hsl(340 55% 60% / ${hoveredCap === 4 ? "0.06" : "0.03"})` }}
              >
                <div className="relative h-40 flex items-center justify-center overflow-hidden" style={{ background: "hsl(340 55% 60% / 0.07)" }}>
                  <div className="flex items-center">
                    {["JG", "MR", "LP", "AC"].map((initials, n) => (
                      <motion.div key={n}
                        className="relative w-11 h-11 rounded-full flex items-center justify-center font-display font-extrabold text-sm border-2"
                        style={{ background: `hsl(340 55% 60% / ${0.1 + n * 0.04})`, borderColor: "hsl(340 55% 60% / 0.3)", color: "hsl(340 55% 60%)", marginLeft: n > 0 ? "-10px" : "0", zIndex: 4 - n }}
                        initial={{ x: 16, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }} transition={{ delay: 0.3 + n * 0.1, duration: 0.4, ease: "backOut" }}
                      >
                        {initials}
                        <motion.div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: "hsl(160 60% 45%)" }}
                          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                          viewport={{ once: true }} transition={{ delay: 0.65 + n * 0.1 }}>
                          <Check className="w-2.5 h-2.5 text-white" />
                        </motion.div>
                      </motion.div>
                    ))}
                    <motion.div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-sm border-2"
                      style={{ background: "hsl(340 55% 60% / 0.08)", borderColor: "hsl(340 55% 60% / 0.25)", color: "hsl(340 55% 60%)", marginLeft: "-10px" }}
                      initial={{ x: 16, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }} transition={{ delay: 0.75 }}
                    >+12</motion.div>
                  </div>
                </div>
                <div className="p-5 md:p-6 flex-1">
                  <h3 className="text-base font-display font-bold text-foreground mb-1.5 leading-tight">{capabilities[4].title}</h3>
                  <p className="text-sm text-foreground/65 font-light mb-3 leading-relaxed">{capabilities[4].description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {capabilities[4].chips.map(chip => (
                      <span key={chip} className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "hsl(340 55% 60% / 0.10)", color: "hsl(340 55% 60%)" }}>{chip}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

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
