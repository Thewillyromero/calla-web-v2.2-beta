import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialProof from "@/components/SocialProof";
import LogoMarquee from "@/components/LogoMarquee";
import PressQuotes from "@/components/PressQuotes";
import PressBar from "@/components/PressBar";
import SectionFade from "@/components/SectionFade";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Phone,
  PhoneOutgoing,
  CalendarCheck,
  BarChart3,
  ShieldCheck,
  Clock,
  PhoneForwarded,
  Lock,
  Bot,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroRobot from "@/assets/hero-robot.webp";
import agentInbound from "@/assets/characters/agent-inbound.webp";
import agentOutbound from "@/assets/characters/agent-outbound.webp";
import agentScheduler from "@/assets/characters/agent-scheduler.webp";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";
import ariaPresentingImg from "@/assets/characters/aria-presenting.webp";
import novaPresentingImg from "@/assets/characters/nova-presenting.webp";
import lumiPresentingImg from "@/assets/characters/lumi-presenting.webp";
import bytePresentingImg from "@/assets/characters/byte-presenting.webp";
import careWavingImg from "@/assets/characters/care-waving.webp";
import { BOOKING_URL } from "@/lib/constants";

/* ── Data ── */

const valueProps = [
  {
    icon: Phone,
    title: "Atendemos TODAS tus llamadas",
    description:
      "24 horas, 7 días, festivos y noches. Nunca pierdes una llamada de un cliente.",
    link: "/aria",
  },
  {
    icon: CalendarCheck,
    title: "Agendamos citas automáticamente",
    description:
      "Tu calendario se llena solo, sin errores ni dobles reservas.",
    link: "/lumi",
  },
  {
    icon: BarChart3,
    title: "Analizamos cada conversación",
    description:
      "Sabes exactamente qué pasa con tu atención telefónica y dónde mejorar.",
    link: "/byte",
  },
];

const differentiators = [
  {
    icon: Bot,
    title: "No somos un chatbot",
    description:
      "Voz natural que tus clientes no distinguen de una persona real.",
  },
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

/* ── Page ── */

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ─── 1. HERO — What we do ─── */}
      <SectionFade>
        <section className="pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left: text */}
              <motion.div
                className="flex-1 max-w-2xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.08] mb-5 tracking-tight text-foreground">
                  Automatizamos la atención telefónica de tu empresa
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed max-w-xl">
                  Tus clientes llaman, nuestro asistente contesta, agenda citas
                  y resuelve dudas con voz natural. Sin que notes la diferencia.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
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

              {/* Right: robot */}
              <motion.div
                className="flex-1 flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={heroRobot}
                  alt="CALLA Asistente Virtual"
                  className="w-64 sm:w-80 md:w-[22rem] lg:w-[28rem] drop-shadow-2xl"
                  width={1024}
                  height={1024}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {valueProps.map((vp, i) => {
                const Icon = vp.icon;
                return (
                  <motion.div
                    key={vp.title}
                    className="bg-card/40 border border-border/20 rounded-2xl p-7"
                    {...fade}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
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
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {differentiators.map((d, i) => {
                const Icon = d.icon;
                return (
                  <motion.div
                    key={d.title}
                    className="bg-card/40 border border-border/20 rounded-2xl p-7"
                    {...fade}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
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
            </div>
          </div>
        </section>
      </SectionFade>

      {/* ─── 4. THE TEAM — Squad completo ─── */}
      <SectionFade>
        <section id="equipo" className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div className="text-center mb-10" {...fade}>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                Conoce a tu nuevo equipo
              </h2>
              <p className="text-foreground/80 text-lg max-w-xl mx-auto">
                Cinco asistentes especializados que trabajan juntos para tu empresa
              </p>
            </motion.div>

            {/* Squad photo — all characters together */}
            <motion.div
              className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6 mb-14 py-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/nova" className="transition-transform hover:scale-105 hover:-translate-y-2 duration-300">
                <img src={novaPresentingImg} alt="NOVA" className="w-20 sm:w-28 md:w-36 lg:w-44 object-contain drop-shadow-xl" loading="lazy" />
                <p className="text-center text-xs sm:text-sm font-bold text-brand-lavender mt-2">NOVA</p>
              </Link>
              <Link to="/lumi" className="transition-transform hover:scale-105 hover:-translate-y-2 duration-300">
                <img src={lumiPresentingImg} alt="LUMI" className="w-20 sm:w-28 md:w-36 lg:w-44 object-contain drop-shadow-xl" loading="lazy" />
                <p className="text-center text-xs sm:text-sm font-bold text-brand-emerald mt-2">LUMI</p>
              </Link>
              <Link to="/aria" className="transition-transform hover:scale-110 hover:-translate-y-3 duration-300">
                <img src={ariaPresentingImg} alt="ARIA" className="w-28 sm:w-36 md:w-48 lg:w-56 object-contain drop-shadow-2xl" loading="lazy" />
                <p className="text-center text-sm sm:text-base font-bold text-brand-teal mt-2">ARIA</p>
              </Link>
              <Link to="/byte" className="transition-transform hover:scale-105 hover:-translate-y-2 duration-300">
                <img src={bytePresentingImg} alt="BYTE" className="w-20 sm:w-28 md:w-36 lg:w-44 object-contain drop-shadow-xl" loading="lazy" />
                <p className="text-center text-xs sm:text-sm font-bold text-brand-amber mt-2">BYTE</p>
              </Link>
              <Link to="/resultados" className="transition-transform hover:scale-105 hover:-translate-y-2 duration-300">
                <img src={careWavingImg} alt="CARE" className="w-20 sm:w-28 md:w-36 lg:w-44 object-contain drop-shadow-xl" loading="lazy" />
                <p className="text-center text-xs sm:text-sm font-bold text-brand-rose mt-2">CARE</p>
              </Link>
            </motion.div>

            {/* Individual agent cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {agents.map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <motion.div
                    key={agent.name}
                    {...fade}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link
                      to={agent.link}
                      className="block bg-card/40 border border-border/20 rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group h-full"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                            {agent.name}
                          </span>
                          <span className="text-sm font-bold text-foreground">
                            {agent.role}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                        {agent.description}
                      </p>
                      <span className="text-sm text-primary font-medium group-hover:underline inline-flex items-center gap-1">
                        Ver capacidades <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </SectionFade>

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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="bg-card/40 border border-border/20 rounded-2xl p-7 text-center"
                  {...fade}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
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
            </div>
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
        <section className="py-12 md:py-16">
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
    </div>
  );
};

export default Index;
