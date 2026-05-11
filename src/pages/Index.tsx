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
import agentScheduler from "@/assets/characters/agent-scheduler.webp";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";
import ariaCalling from "@/assets/characters/aria-calling-cut.png";
import lumiWriting from "@/assets/characters/lumi-writing-cut.png";
import byteMagnifying from "@/assets/characters/byte-magnifying-cut.png";
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
                <h1 className="text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold mb-4 md:mb-5 tracking-tight text-foreground">
                  Automatizamos la atención telefónica de tu empresa
                </h1>
                <p className="text-base md:text-xl text-foreground/80 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
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

              {/* Right: robot with parallax + glow */}
              <motion.div
                className="flex-1 flex justify-center lg:justify-end relative order-first lg:order-last"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="absolute inset-0 scale-[1.8] md:scale-[2.5] rounded-full blur-3xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, hsl(190 60% 55% / 0.18), transparent 70%)" }}
                />
                <motion.img
                  src={heroRobot}
                  alt="CALLA Asistente Virtual"
                  className="w-44 sm:w-72 md:w-[22rem] lg:w-[28rem] drop-shadow-2xl relative z-10"
                  width={1024}
                  height={1024}
                  style={{ rotateX, y: heroY, transformOrigin: "center bottom" }}
                />
              </motion.div>
            </div>
          </div>
        </section>
      </SectionFade>

      {/* ─── 2. WHAT WE DO — 3 value props with characters ─── */}
      <SectionFade>
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12"
              {...fade}
            >
              ¿Qué hacemos por tu empresa?
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto pt-16 sm:pt-20"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {valueProps.map((vp) => {
                const Icon = vp.icon;
                return (
                  <motion.div
                    key={vp.title}
                    className={`group relative bg-gradient-to-br ${vp.gradient} border border-border/30 rounded-2xl p-7 pt-24 sm:pt-28 transition-all duration-500 hover:-translate-y-1`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 60px ${vp.color}40, 0 25px 60px rgba(0,0,0,0.25)`;
                      e.currentTarget.style.borderColor = `${vp.color}99`;
                      const img = e.currentTarget.querySelector('img');
                      if (img) (img as HTMLElement).style.filter = `drop-shadow(0 0 28px ${vp.color}ee) drop-shadow(0 0 12px ${vp.color}aa) drop-shadow(0 8px 16px ${vp.color}66)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '';
                      e.currentTarget.style.borderColor = '';
                      const img = e.currentTarget.querySelector('img');
                      if (img) (img as HTMLElement).style.filter = '';
                    }}
                    variants={itemVariants}
                  >
                    {/* Color glow behind character — wraps it like Features */}
                    <div
                      className="absolute -top-8 right-0 sm:right-2 w-52 h-52 rounded-full blur-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${vp.color}, transparent 70%)`, transform: 'scale(1.4)' }}
                    />
                    {/* Character peeking out — bigger, closer to text */}
                    <motion.img
                      src={vp.image}
                      alt={vp.agentName}
                      loading="lazy"
                      className="absolute -top-10 sm:-top-12 right-2 sm:right-4 w-40 h-40 sm:w-48 sm:h-48 object-contain pointer-events-none select-none z-10"
                      style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))', transition: 'filter 400ms ease' }}
                      whileHover={{ scale: 1.06, y: -4 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="relative">
                      <Icon className="h-7 w-7 mb-3" style={{ color: vp.color }} />
                      <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                        {vp.title}
                      </h3>
                      <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                        {vp.description}
                      </p>
                      <Link
                        to={vp.link}
                        className="text-sm font-medium inline-flex items-center gap-1 hover:underline"
                        style={{ color: vp.color }}
                      >
                        Conoce a {vp.agentName} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
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
        <PressBar />
      </SectionFade>

      <SectionFade>
        <section className="py-12 md:py-16 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {metrics.map((m, i) => (
                <motion.div
                  key={i}
                  className="bg-card/30 border border-border/20 rounded-2xl p-6 text-center"
                  {...fade}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-foreground">
                    {m.value}
                  </div>
                  <div className="text-sm text-foreground/80 mt-1">
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
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
