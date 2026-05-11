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
import ariaCalling from "@/assets/characters/aria-calling.webp";
import lumiWriting from "@/assets/characters/lumi-writing.webp";
import byteMagnifying from "@/assets/characters/byte-magnifying.webp";
import novaPointing from "@/assets/characters/nova-pointing.webp";
import careWaving from "@/assets/characters/care-waving.webp";
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
    color: "hsl(217 91% 60%)", // primary blue
    gradient: "from-[hsl(217_91%_55%)]/10 via-card/40 to-card/40",
  },
  {
    icon: BarChart3,
    title: "Analizamos cada conversación",
    description:
      "Sabes exactamente qué pasa con tu atención telefónica y dónde mejorar.",
    link: "/byte",
    image: byteMagnifying,
    agentName: "BYTE",
    color: "hsl(260 60% 65%)", // brand-lavender
    gradient: "from-[hsl(260_60%_60%)]/10 via-card/40 to-card/40",
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

      {/* ─── 2. WHAT WE DO — 3 value props ─── */}
      <SectionFade>
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12"
              {...fade}
            >
              ¿Qué hacemos por tu empresa?
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
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
                    className="bg-card/40 border border-border/20 rounded-2xl p-7"
                    variants={itemVariants}
                  >
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {vp.title}
                    </h3>
                    <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                      {vp.description}
                    </p>
                    <Link
                      to={vp.link}
                      className="text-sm text-primary font-medium inline-flex items-center gap-1 hover:underline"
                    >
                      Saber más <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </SectionFade>

      {/* ─── 3. WHY US — Differentiators ─── */}
      <SectionFade>
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12"
              {...fade}
            >
              ¿Por qué CALLA y no otra solución?
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
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
                    className="bg-card/40 border border-border/20 rounded-2xl p-7"
                    variants={itemVariants}
                  >
                    <Icon className="h-7 w-7 text-primary mb-3" />
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {d.title}
                    </h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">
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
        </section>
      </SectionFade>

      {/* ─── 4. THE TEAM — V1 Features grid with all effects ─── */}
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
