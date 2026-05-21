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
  PhoneOutgoing,
  CalendarCheck,
  BarChart3,
  HeartHandshake,
  ShieldCheck,
  Users,
  Building2,
  Wrench,
  Check,
  X,
  Minus,
  Network,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import heroRobot from "@/assets/hero-robot.webp";
import agentSupport from "@/assets/characters/agent-support.webp";
import agentInbound from "@/assets/characters/agent-inbound.webp";
import agentOutbound from "@/assets/characters/agent-outbound.webp";
import agentScheduler from "@/assets/characters/agent-scheduler-cut.png";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";
import ariaCalling from "@/assets/characters/aria-calling-cut.png";
import lumiWriting from "@/assets/characters/lumi-writing-cut.png";
import byteMagnifying from "@/assets/characters/byte-analyzing-cut.png";
import { BOOKING_URL } from "@/lib/constants";
import avatarElena from "@/assets/avatars/elena-garcia.webp";
import avatarRoberto from "@/assets/avatars/roberto-mendez.webp";
import avatarCarmen from "@/assets/avatars/carmen-ortega.webp";
import avatarJorge from "@/assets/avatars/jorge-navarro.webp";
import avatarLaura from "@/assets/avatars/laura-m.webp";

/* ── Data ── */

const valueProps = [
  {
    icon: Phone,
    title: "Atendemos TODAS tus llamadas",
    description:
      "24 horas, 7 días, festivos y noches. Nunca pierdes una llamada de un cliente.",
    link: "/aria",
    image: ariaCalling,
    agentName: "ARIA",
    color: "hsl(190 60% 55%)", // brand-teal
    gradient: "from-[hsl(190_60%_50%)]/10 via-card/40 to-card/40",
  },
  {
    icon: CalendarCheck,
    title: "Agendamos citas automáticamente",
    description:
      "Tu calendario se llena solo, sin errores ni dobles reservas.",
    link: "/lumi",
    image: lumiWriting,
    agentName: "LUMI",
    color: "hsl(160 55% 50%)", // brand-emerald (LUMI is green)
    gradient: "from-[hsl(160_55%_45%)]/10 via-card/40 to-card/40",
  },
  {
    icon: BarChart3,
    title: "Analizamos cada conversación",
    description:
      "Sabes exactamente qué pasa con tu atención telefónica y dónde mejorar.",
    link: "/byte",
    image: byteMagnifying,
    agentName: "BYTE",
    color: "hsl(28 80% 55%)", // amber/orange (BYTE is orange)
    gradient: "from-[hsl(28_80%_50%)]/10 via-card/40 to-card/40",
  },
];

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

const agents = [
  {
    name: "ARIA",
    role: "Recepcionista Virtual",
    description:
      "Atiende llamadas entrantes, resuelve dudas y transfiere cuando es necesario.",
    image: agentInbound,
    icon: Phone,
    link: "/aria",
  },
  {
    name: "NOVA",
    role: "Agente de Ventas",
    description:
      "Realiza llamadas salientes para captar leads y cerrar oportunidades.",
    image: agentOutbound,
    icon: PhoneOutgoing,
    link: "/nova",
  },
  {
    name: "LUMI",
    role: "Coordinador de Citas",
    description:
      "Agenda, confirma y reagenda citas automáticamente sin intervención humana.",
    image: agentScheduler,
    icon: CalendarCheck,
    link: "/lumi",
  },
  {
    name: "BYTE",
    role: "Analista de Datos",
    description:
      "Analiza cada llamada y genera reportes accionables para tu negocio.",
    image: agentAnalytics,
    icon: BarChart3,
    link: "/byte",
  },
  {
    name: "CARE",
    role: "Servicio Post-Venta",
    description:
      "Seguimiento, satisfacción y fidelización de tus clientes automáticamente.",
    image: agentSupport,
    icon: HeartHandshake,
    link: "/care",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Atendemos toda tu comunicación telefónica",
    description: "Entrante, saliente, 24 horas al día, 7 días a la semana. Nunca una llamada perdida.",
    chips: ["Llamadas entrantes", "Llamadas salientes", "24/7", "Voz natural"],
    Icon: Phone,
  },
  {
    number: "02",
    title: "Agendamos citas sin intervención humana",
    description: "Tu calendario se llena solo. Sin errores ni dobles reservas.",
    chips: ["Google Calendar", "Calendly", "CRM", "Recordatorios"],
    Icon: CalendarCheck,
  },
  {
    number: "03",
    title: "Automatizamos flujos y procesos internos",
    description: "Transferencias inteligentes, integraciones y asistentes IA a medida para tu operativa.",
    chips: ["Integraciones", "Workflows", "Asistentes IA", "API"],
    Icon: Network,
  },
  {
    number: "04",
    title: "Analizamos cada conversación en tiempo real",
    description: "Dashboard con todo lo que pasa en tu atención. Sabes qué funciona y dónde mejorar.",
    chips: ["Analytics", "Sentimiento", "Patrones", "Informes semanales"],
    Icon: BarChart3,
  },
  {
    number: "05",
    title: "Fidelizamos a tus clientes post-venta",
    description: "Seguimiento automático, NPS y detección de churn antes de que se vayan.",
    chips: ["Post-venta", "NPS", "Retención", "Cross-sell"],
    Icon: Users,
  },
];

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Nos reunimos contigo o visitamos tu empresa. Analizamos flujos, cuellos de botella y oportunidades de automatización para diseñar la solución exacta que necesitas.",
    chips: ["Reunión inicial", "Auditoría de procesos", "Propuesta a medida"],
  },
  {
    number: "02",
    title: "Desarrollo",
    description: "Configuramos los cinco agentes base adaptados a tu negocio y desarrollamos los asistentes IA específicos que requiera tu operativa.",
    chips: ["Agentes base", "IA a medida", "Integraciones", "Pruebas internas"],
  },
  {
    number: "03",
    title: "Entrega e implementación",
    description: "Conectamos todo el ecosistema con tus herramientas, formamos a tu equipo para sacarle el máximo rendimiento y verificamos que cada pieza funciona perfectamente.",
    chips: ["Puesta en marcha", "Formación", "Pruebas finales", "Soporte"],
  },
  {
    number: "04",
    title: "Inversión",
    description: "El proyecto tiene un coste inicial de desarrollo e implementación y una cuota mensual posterior. El pago se puede estructurar al inicio, por fases o al finalizar, según las necesidades del proyecto.",
    chips: ["Coste de desarrollo", "Cuota mensual", "Pago flexible"],
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

      {/* ─── 2. WHAT WE DO — capability map ─── */}
      <SectionFade className="bg-white/[0.03]">
        <section className="py-16 md:py-24 px-5 md:px-6 relative overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-teal/[0.03] blur-[160px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-brand-lavender/[0.025] blur-[140px] pointer-events-none" />
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
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary font-display font-semibold tracking-wide">Cobertura total</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.1] text-foreground mb-4">
                Todo lo que desarrollamos{" "}
                <span className="text-gradient">en tu empresa</span>
              </h2>
              <p className="text-foreground/75 max-w-lg mx-auto text-base font-light">
                Un ecosistema que lo gestiona todo.
              </p>
            </motion.div>

            {/* Capability grid — B1 */}
            <div className="max-w-5xl mx-auto">
              {/* Row 1: 3 cards */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {capabilities.slice(0, 3).map((cap, i) => (
                  <motion.div
                    key={cap.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setHoveredCap(i)}
                    onMouseLeave={() => setHoveredCap(null)}
                    className="relative overflow-hidden rounded-2xl border border-border/20 bg-card/30 p-6 md:p-7 flex flex-col transition-all duration-300 cursor-default"
                    style={{
                      background: hoveredCap === i ? "hsl(var(--primary) / 0.04)" : "hsl(var(--card) / 0.30)",
                      borderColor: hoveredCap === i ? "hsl(var(--primary) / 0.20)" : undefined,
                    }}
                  >
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl bg-primary/[0.08] border border-primary/15 flex items-center justify-center mb-5">
                      <cap.Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base md:text-lg font-display font-bold text-foreground mb-2 leading-snug">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-foreground/80 font-light mb-4 leading-relaxed flex-1">
                      {cap.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.chips.map((chip) => (
                        <span key={chip} className="text-xs font-medium px-3 py-1 rounded-full border border-primary/30 bg-primary/[0.12] text-foreground/90">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Row 2: 2 cards centered */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-2xl lg:max-w-[calc(66.666%+0.625rem)] mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {capabilities.slice(3).map((cap, i) => (
                  <motion.div
                    key={cap.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setHoveredCap(i + 3)}
                    onMouseLeave={() => setHoveredCap(null)}
                    className="relative overflow-hidden rounded-2xl border border-border/20 bg-card/30 p-6 md:p-7 flex flex-col transition-all duration-300 cursor-default"
                    style={{
                      background: hoveredCap === i + 3 ? "hsl(var(--primary) / 0.04)" : "hsl(var(--card) / 0.30)",
                      borderColor: hoveredCap === i + 3 ? "hsl(var(--primary) / 0.20)" : undefined,
                    }}
                  >
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl bg-primary/[0.08] border border-primary/15 flex items-center justify-center mb-5">
                      <cap.Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base md:text-lg font-display font-bold text-foreground mb-2 leading-snug">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-foreground/80 font-light mb-4 leading-relaxed flex-1">
                      {cap.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.chips.map((chip) => (
                        <span key={chip} className="text-xs font-medium px-3 py-1 rounded-full border border-primary/30 bg-primary/[0.12] text-foreground/90">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
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
                ¿Por qué <span className="text-gradient">CALLA</span> y no otra solución?
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

            {/* Timeline */}
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="bg-card/30 rounded-2xl border border-border/20 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {steps.map((step, i) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setHoveredCap(i + 10)}
                    onMouseLeave={() => setHoveredCap(null)}
                    className={`relative flex items-start gap-5 md:gap-10 px-6 md:px-10 py-7 transition-colors duration-300 cursor-default${
                      i < steps.length - 1 ? " border-b border-border/15" : ""
                    }`}
                    style={{
                      background: hoveredCap === i + 10 ? "hsl(var(--primary) / 0.025)" : "transparent",
                    }}
                  >
                    {/* Timeline line */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-primary"
                      animate={{
                        opacity: hoveredCap === i + 10 ? 1 : 0.12,
                        scaleY: hoveredCap === i + 10 ? 1 : 0.85,
                      }}
                      transition={{ duration: 0.25 }}
                    />

                    {/* Number */}
                    <motion.span
                      className="text-5xl md:text-6xl font-display font-black shrink-0 leading-none tabular-nums select-none w-14 md:w-16 text-right"
                      animate={{
                        color: hoveredCap === i + 10
                          ? "hsl(var(--foreground) / 0.55)"
                          : "hsl(var(--foreground) / 0.10)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.number}
                    </motion.span>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1.5">
                      <h3 className="text-base md:text-lg font-display font-bold text-foreground mb-1.5 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground/85 font-light mb-3 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.chips.map((chip) => (
                          <span
                            key={chip}
                            className="text-xs font-medium px-3 py-1 rounded-full border border-primary/25 bg-primary/[0.07] text-primary"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

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
