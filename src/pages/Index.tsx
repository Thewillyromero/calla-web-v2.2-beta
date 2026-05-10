import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, PhoneOutgoing, CalendarCheck, BarChart3, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroRobot from "@/assets/hero-robot.webp";
import agentInbound from "@/assets/characters/agent-inbound.webp";
import agentOutbound from "@/assets/characters/agent-outbound.webp";
import agentScheduler from "@/assets/characters/agent-scheduler.webp";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";
import { BOOKING_URL } from "@/lib/constants";

const agents = [
  {
    name: "ARIA",
    role: "Recepcionista Virtual",
    description: "Atiende llamadas entrantes, resuelve dudas y transfiere cuando es necesario.",
    image: agentInbound,
    icon: Phone,
    link: "/aria",
  },
  {
    name: "NOVA",
    role: "Agente de Ventas",
    description: "Realiza llamadas salientes para captar leads y cerrar oportunidades.",
    image: agentOutbound,
    icon: PhoneOutgoing,
    link: "/nova",
  },
  {
    name: "LUMI",
    role: "Coordinador de Citas",
    description: "Agenda, confirma y reagenda citas automáticamente sin intervención humana.",
    image: agentScheduler,
    icon: CalendarCheck,
    link: "/lumi",
  },
  {
    name: "BYTE",
    role: "Analista de Datos",
    description: "Analiza cada llamada y genera reportes accionables para tu negocio.",
    image: agentAnalytics,
    icon: BarChart3,
    link: "/byte",
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto"
            {...fade}
          >
            <img
              src={heroRobot}
              alt="CALLA robot"
              className="w-32 md:w-48"
              width={192}
              height={192}
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
              Automatizamos la atención telefónica de tu empresa
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl">
              Nuestros asistentes de voz con IA atienden llamadas, agendan citas y gestionan tu comunicación. 24 horas, 7 días.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/20"
                onClick={() => window.open(BOOKING_URL, "_blank")}
              >
                Solicitar demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8"
                onClick={() =>
                  document.querySelector("#equipo")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Conocer al equipo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/70 mt-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Más de 200 empresas confían en nosotros</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Team Grid ── */}
      <section id="equipo" className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12"
            {...fade}
          >
            Nuestro equipo de asistentes IA
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                    className="block bg-card/40 border border-border/20 rounded-2xl p-6 hover:border-primary/30 transition-all group"
                  >
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-20 h-20 object-contain mb-4"
                      width={80}
                      height={80}
                    />
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {agent.name}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{agent.role}</h3>
                    <p className="text-sm text-foreground/80 mb-3">{agent.description}</p>
                    <span className="text-sm text-primary font-medium group-hover:underline inline-flex items-center gap-1">
                      Conocer más <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                className="bg-card/30 border border-border/20 rounded-2xl p-6 text-center backdrop-blur-sm"
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl font-bold text-foreground">{m.value}</div>
                <div className="text-sm text-foreground/70 mt-1">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="bg-card/40 border border-border/20 rounded-2xl p-10 md:p-14 text-center max-w-2xl mx-auto"
            {...fade}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              ¿Quieres ver cómo funciona para tu empresa?
            </h2>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/20 mt-4"
              onClick={() => window.open(BOOKING_URL, "_blank")}
            >
              Solicitar una demostración
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
