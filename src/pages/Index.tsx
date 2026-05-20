// V2 sync
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import LogoMarquee from "@/components/LogoMarquee";
import PressQuotes from "@/components/PressQuotes";
import PressBar from "@/components/PressBar";
import SectionFade from "@/components/SectionFade";
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
  Clock,
  PhoneForwarded,
  Lock,
  Bot,
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
import novaPointing from "@/assets/characters/nova-pointing-cut.png";
import careWaving from "@/assets/characters/care-waving-cut.png";
import { BOOKING_URL } from "@/lib/constants";

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

const differentiators = [
  {
    icon: PhoneForwarded,
    title: "Se instala en tu número actual",
    description:
      "Sin cambiar nada en tu empresa. Tu número, tu marca.",
  },
  {
    icon: Clock,
    title: "Funcionando en 30 minutos",
    description:
      "No son meses de implementación. En media hora, operativo.",
  },
  {
    icon: Lock,
    title: "Tus datos, protegidos",
    description:
      "Cumplimiento RGPD, grabaciones encriptadas, servidores en Europa.",
    link: "/seguridad",
    linkLabel: "Ver seguridad",
  },
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
    hsl: "190 60% 55%",
  },
  {
    number: "02",
    title: "Agendamos citas sin intervención humana",
    description: "Tu calendario se llena solo. Sin errores ni dobles reservas.",
    chips: ["Google Calendar", "Calendly", "CRM", "Recordatorios"],
    hsl: "160 50% 48%",
  },
  {
    number: "03",
    title: "Automatizamos flujos y procesos internos",
    description: "Transferencias inteligentes, integraciones y asistentes IA a medida para tu operativa.",
    chips: ["Integraciones", "Workflows", "Asistentes IA", "API"],
    hsl: "260 50% 65%",
  },
  {
    number: "04",
    title: "Analizamos cada conversación en tiempo real",
    description: "Dashboard con todo lo que pasa en tu atención. Sabes qué funciona y dónde mejorar.",
    chips: ["Analytics", "Sentimiento", "Patrones", "Informes semanales"],
    hsl: "35 70% 58%",
  },
  {
    number: "05",
    title: "Fidelizamos a tus clientes post-venta",
    description: "Seguimiento automático, NPS y detección de churn antes de que se vayan.",
    chips: ["Post-venta", "NPS", "Retención", "Cross-sell"],
    hsl: "340 55% 60%",
  },
];

const steps = [
  {
    number: "1",
    title: "Conectamos tu número",
    description: "Vinculamos tu línea actual. Sin cambiar nada.",
  },
  {
    number: "2",
    title: "Configuramos tu asistente",
    description: "Lo adaptamos a tu negocio en una sesión.",
  },
  {
    number: "3",
    title: "Empieza a funcionar",
    description: "En 30 minutos, tu asistente atiende llamadas.",
  },
];

const metrics = [
  { value: "+200", label: "empresas" },
  { value: "2M+", label: "llamadas" },
  { value: "4.9/5", label: "valoración" },
];

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5 },
};

/* ── Staggered container variants (Task 5) ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
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
                <h1 className="text-[2rem] leading-[1.15] sm:text-5xl md:text-5xl lg:text-6xl font-display font-extrabold mb-4 md:mb-5 tracking-tight text-foreground">
                  Automatizamos y digitalizamos<br className="hidden sm:block" />
                  {" "}<span className="text-gradient">la comunicación y procesos</span><br className="hidden sm:block" />
                  {" "}de tu empresa
                </h1>
                <p className="text-base md:text-xl text-foreground/70 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                  Tus clientes llaman, nuestro asistente contesta, agenda citas
                  y resuelve dudas con voz natural. Sin que notes la diferencia.
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
                    className="rounded-full px-8 text-base"
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

                {/* Card 1 — Llamada atendida (teal) */}
                <motion.div
                  className="absolute top-6 left-2 sm:left-4 lg:-left-6 z-20"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0, y: [0, -7, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 1.3 },
                    x: { duration: 0.5, delay: 1.3 },
                    y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
                  }}
                >
                  <div className="bg-background/85 backdrop-blur-xl border border-border/35 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl shadow-black/25">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse" style={{ background: "hsl(190 60% 55%)" }} />
                    <div>
                      <p className="text-xs font-semibold text-foreground leading-none mb-1">Llamada atendida</p>
                      <p className="text-[10px] text-foreground/45 leading-none">ARIA · ahora mismo</p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 — Cita agendada (emerald) */}
                <motion.div
                  className="absolute bottom-16 left-0 sm:left-2 lg:-left-10 z-20"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 1.8 },
                    x: { duration: 0.5, delay: 1.8 },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.1 },
                  }}
                >
                  <div className="bg-background/85 backdrop-blur-xl border border-border/35 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl shadow-black/25">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse" style={{ background: "hsl(160 50% 48%)" }} />
                    <div>
                      <p className="text-xs font-semibold text-foreground leading-none mb-1">Cita agendada</p>
                      <p className="text-[10px] text-foreground/45 leading-none">LUMI · hace 2 min</p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 3 — Lead captado (lavender) — sm+ only */}
                <motion.div
                  className="absolute top-[42%] -translate-y-1/2 right-2 sm:right-0 lg:right-2 z-20 hidden sm:block"
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 2.3 },
                    x: { duration: 0.5, delay: 2.3 },
                    y: { duration: 4.7, repeat: Infinity, ease: "easeInOut", delay: 2.6 },
                  }}
                >
                  <div className="bg-background/85 backdrop-blur-xl border border-border/35 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl shadow-black/25">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse" style={{ background: "hsl(260 50% 65%)" }} />
                    <div>
                      <p className="text-xs font-semibold text-foreground leading-none mb-1">Lead captado</p>
                      <p className="text-[10px] text-foreground/45 leading-none">NOVA · hace 5 min</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionFade>

      {/* ─── 2. WHAT WE DO — capability map ─── */}
      <SectionFade>
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
                Todo lo que cubrimos{" "}
                <span className="text-gradient">en tu empresa</span>
              </h2>
              <p className="text-foreground/60 max-w-lg mx-auto text-base font-light">
                Desde la primera llamada hasta la fidelización. Un solo sistema que lo gestiona todo.
              </p>
            </motion.div>

            {/* Capability list */}
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="bg-card/30 rounded-2xl border border-border/20 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={cap.number}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setHoveredCap(i)}
                    onMouseLeave={() => setHoveredCap(null)}
                    className={`relative flex items-start gap-5 md:gap-10 px-6 md:px-10 py-6 transition-colors duration-300 cursor-default${
                      i < capabilities.length - 1 ? " border-b border-border/15" : ""
                    }`}
                    style={{
                      background: hoveredCap === i ? `hsl(${cap.hsl} / 0.04)` : "transparent",
                    }}
                  >
                    {/* Left accent bar */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                      style={{ background: `hsl(${cap.hsl})`, originY: 0.5 }}
                      animate={{
                        opacity: hoveredCap === i ? 1 : 0,
                        scaleY: hoveredCap === i ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.25 }}
                    />

                    {/* Number */}
                    <motion.span
                      className="text-5xl md:text-6xl font-display font-black shrink-0 leading-none tabular-nums select-none w-14 md:w-16 text-right"
                      animate={{
                        color: hoveredCap === i ? `hsl(${cap.hsl})` : `hsl(${cap.hsl} / 0.28)`,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {cap.number}
                    </motion.span>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1.5">
                      <h3 className="text-base md:text-lg font-display font-bold text-foreground mb-1.5 leading-snug">
                        {cap.title}
                      </h3>
                      <p className="text-sm text-foreground/55 font-light mb-3 leading-relaxed">
                        {cap.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {cap.chips.map((chip) => (
                          <span
                            key={chip}
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border"
                            style={{
                              background: `hsl(${cap.hsl} / 0.08)`,
                              color: `hsl(${cap.hsl})`,
                              borderColor: `hsl(${cap.hsl} / 0.22)`,
                            }}
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

      {/* ─── 3. WHY US — Differentiators with NOVA hero card + bg character ─── */}
      <SectionFade>
        <section className="py-16 md:py-20 relative overflow-hidden">
          {/* Aurora bg */}
          <div
            className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, hsl(260 60% 55% / 0.5), hsl(190 60% 50% / 0.3) 50%, transparent 70%)',
              animation: 'aurora-pulse 25s ease-in-out infinite',
            }}
          />
          {/* Background character (desktop only) */}
          <img
            src={careWaving}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="hidden md:block absolute bottom-0 right-[-4rem] w-[28rem] lg:w-[32rem] opacity-[0.13] pointer-events-none select-none mix-blend-luminosity"
            style={{ filter: 'blur(0.5px)' }}
          />

          <div className="container mx-auto px-6 relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12"
              {...fade}
            >
              ¿Por qué CALLA y no otra solución?
            </motion.h2>

            <div className="max-w-5xl mx-auto space-y-6">
              {/* Hero diff card with NOVA */}
              <motion.div
                className="relative bg-gradient-to-br from-[hsl(260_60%_55%)]/15 via-card/50 to-[hsl(190_60%_50%)]/10 border border-[hsl(260_60%_60%)]/30 rounded-2xl p-7 md:p-10 overflow-visible"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div
                  className="absolute -top-32 -left-20 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-50 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, hsl(260 60% 55% / 0.4), transparent 70%)' }}
                />
                {/* NOVA glow behind */}
                <div
                  className="hidden md:block absolute -top-10 right-0 w-64 h-64 rounded-full blur-3xl opacity-60 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, hsl(260 60% 55% / 0.45), transparent 70%)' }}
                />
                {/* NOVA peeking out from the right edge of the card */}
                <img
                  src={novaPointing}
                  alt="NOVA"
                  loading="lazy"
                  className="hidden md:block absolute -top-16 -right-6 w-56 lg:w-64 object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.55)] pointer-events-none select-none z-10"
                />
                <div className="relative max-w-xl">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(260_60%_55%)] to-[hsl(190_60%_50%)] mb-4 shadow-lg shadow-[hsl(260_60%_55%)]/30">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                    No somos un chatbot
                  </h3>
                  <p className="text-base text-foreground/85 leading-relaxed">
                    Voz natural, conversación fluida y matices humanos. Tus clientes
                    no distinguen a CALLA de una persona real.
                  </p>
                  {/* Mobile NOVA, smaller, below the text */}
                  <img
                    src={novaPointing}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="md:hidden mt-4 w-32 mx-auto drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </motion.div>

              {/* 3 compact diff cards */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {differentiators.map((d) => {
                  const Icon = d.icon;
                  return (
                    <motion.div
                      key={d.title}
                      className="bg-card/40 border border-border/30 rounded-2xl p-5 md:p-6 hover:border-primary/40 transition-colors"
                      variants={itemVariants}
                    >
                      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-[hsl(190_60%_50%)]/20 border border-primary/20 mb-3">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-1">
                        {d.title}
                      </h3>
                      <p className="text-sm text-foreground/75 leading-relaxed">
                        {d.description}
                      </p>
                      {d.link && (
                        <Link
                          to={d.link}
                          className="text-sm text-primary font-medium inline-flex items-center gap-1 mt-3 hover:underline"
                        >
                          {d.linkLabel} <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>
      </SectionFade>

      <SectionFade><Features /></SectionFade>

      {/* ─── 5. HOW IT WORKS — 3 steps ─── */}
      <SectionFade>
        <section id="como-funciona" className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12"
              {...fade}
            >
              Así de fácil es empezar
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  className="bg-card/40 border border-border/20 rounded-2xl p-7 text-center"
                  variants={itemVariants}
                >
                  <div className="text-4xl font-extrabold text-primary mb-3">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </SectionFade>

      {/* ─── 6. PROOF — Social proof ─── */}
      <SectionFade>
        <PressQuotes />
      </SectionFade>


      <SectionFade>
        <LogoMarquee />
      </SectionFade>

      <SectionFade>
        <SocialProof />
      </SectionFade>

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

      {/* ─── 7. CTA FINAL ─── */}
      <SectionFade>
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div
              className="bg-card/40 border border-border/20 rounded-2xl p-10 md:p-14 text-center max-w-2xl mx-auto"
              {...fade}
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                ¿Listo para automatizar tu atención telefónica?
              </h2>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/20 mt-4 text-base"
                onClick={() => window.open(BOOKING_URL, "_blank")}
              >
                Solicitar una demostración
              </Button>
            </motion.div>
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
