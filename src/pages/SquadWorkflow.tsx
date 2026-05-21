import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionFade from "@/components/SectionFade";
import { Button } from "@/components/ui/button";
import { TrustpilotStars } from "@/components/TrustpilotStars";
import ContactFormDialog from "@/components/ContactFormDialog";
import {
  ArrowRight, Phone, PhoneOutgoing, CalendarCheck, BarChart3,
  HeartHandshake, Sparkles, CheckCircle2, Quote,
  Network, GitMerge, Brain, ShieldCheck, Puzzle, LayoutDashboard,
} from "lucide-react";
import haloConductor from "@/assets/halo-conductor.png";
import { BOOKING_URL } from "@/lib/constants";

const haloHsl = "220 12% 62%";
const haloGradient = "linear-gradient(110deg, hsl(215 15% 55%) 0%, hsl(210 22% 80%) 30%, hsl(215 8% 97%) 55%, hsl(220 18% 83%) 78%, hsl(215 15% 62%) 100%)";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5 },
};

const capabilities = [
  {
    icon: Network,
    title: "Orquestación en tiempo real",
    description: "Coordina los cinco agentes en cada interacción sin que ningún cliente note el cambio de un asistente a otro.",
  },
  {
    icon: Brain,
    title: "Memoria compartida del cliente",
    description: "El historial completo del cliente viaja entre agentes. Lo que sabe ARIA, lo sabe NOVA. Sin repeticiones.",
  },
  {
    icon: GitMerge,
    title: "Decisión inteligente de flujo",
    description: "Elige qué agente interviene en cada momento del proceso. Sin solapamientos, sin lagunas.",
  },
  {
    icon: ShieldCheck,
    title: "Escalado a humanos",
    description: "Detecta urgencias, situaciones delicadas o límites del sistema y transfiere al instante con todo el contexto.",
  },
  {
    icon: Puzzle,
    title: "Agentes a medida para tu empresa",
    description: "Desarrollamos agentes específicos para tus procesos. HALO los sincroniza con el equipo base desde el primer día, sin fricciones.",
  },
  {
    icon: LayoutDashboard,
    title: "Panel de supervisión total",
    description: "Monitoriza toda la actividad del equipo en tiempo real. Qué hizo cada agente, cuándo y con qué resultado.",
  },
];

const useCases = [
  {
    title: "Flujos complejos sin fisuras",
    description: "Un cliente que primero agenda, luego compra y después necesita soporte. HALO pasa el contexto completo en cada paso sin que el cliente repita nada.",
  },
  {
    title: "Empresas multisede",
    description: "Enruta automáticamente según sede, horario, idioma y disponibilidad del equipo. Sin configuraciones manuales.",
  },
  {
    title: "Sectores regulados",
    description: "Detecta escalaciones por urgencia o compliance y actúa de inmediato. Ninguna incidencia cae en el vacío.",
  },
  {
    title: "Tu negocio, tu equipo",
    description: "Desarrollamos agentes a medida para tus procesos específicos. HALO los integra de forma nativa, sin reconfigurar el sistema.",
  },
];

const testimonials = [
  {
    quote: "Gestionamos 200 llamadas al día entre 3 sedes. CALLA unificó todo: atiende, deriva a la sede correcta y agenda. No tuvimos que cambiar nada de nuestro flujo.",
    name: "Miguel Santos",
    role: "Director de Operaciones, Edommo Energía",
    result: "3 sedes, 0 configuración manual",
  },
  {
    quote: "Lo que más me sorprendió es que los agentes se pasan la información entre ellos. El cliente habla con ARIA, luego LUMI le agenda la cita y nunca tiene que repetir quién es.",
    name: "Carmen Ortega",
    role: "Directora, Centro Estética Carmen",
    result: "Cero repeticiones para el cliente",
  },
  {
    quote: "Tenemos un proceso muy específico para gestionar averías. Desarrollaron un agente a medida y funcionó desde el primer día. HALO lo coordinó con el resto sin problemas.",
    name: "Antonio Ruiz",
    role: "Jefe de Operaciones, Climatizaciones Ruiz",
    result: "Agente a medida integrado en días",
  },
];

const squadAgents = [
  { name: "ARIA", role: "Recepcionista Virtual", hsl: "190 60% 55%", icon: Phone, path: "/aria" },
  { name: "NOVA", role: "Agente de Ventas", hsl: "260 50% 65%", icon: PhoneOutgoing, path: "/nova" },
  { name: "LUMI", role: "Coordinador de Citas", hsl: "160 50% 48%", icon: CalendarCheck, path: "/lumi" },
  { name: "BYTE", role: "Analista de Datos", hsl: "35 70% 58%", icon: BarChart3, path: "/byte" },
  { name: "CARE", role: "Atención Post-venta", hsl: "340 55% 60%", icon: HeartHandshake, path: "/care" },
];

const SquadWorkflow = () => {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onContact={() => setContactOpen(true)} />

      {/* ── Hero ── */}
      <section className="pt-28 sm:pt-32 pb-16 md:pb-20 px-5 md:px-6">
        <div className="container mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Image — LEFT */}
            <div className="shrink-0 relative flex items-center justify-center order-2 md:order-1 p-6 md:p-8">
              <div className="relative">
                <div
                  className="absolute inset-0 scale-[2] md:scale-[3] rounded-full blur-3xl pointer-events-none animate-pulse-slow"
                  style={{ background: `radial-gradient(circle, hsl(${haloHsl} / 0.32), hsl(${haloHsl} / 0.08) 45%, transparent 70%)` }}
                />
                <div
                  className="absolute inset-0 scale-[1.4] md:scale-[1.6] rounded-full blur-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle, hsl(${haloHsl} / 0.45), transparent 65%)` }}
                />
                <div
                  className="absolute inset-0 scale-[1.1] md:scale-[1.15] rounded-full pointer-events-none"
                  style={{ boxShadow: `0 0 60px hsl(${haloHsl} / 0.5), inset 0 0 40px hsl(${haloHsl} / 0.2)` }}
                />
                <motion.img
                  src={haloConductor}
                  alt="HALO"
                  className="w-48 sm:w-64 md:w-[22rem] lg:w-[26rem] object-contain relative z-10 animate-float-gentle drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                  width={512}
                  height={512}
                  initial={{ opacity: 0, scale: 0, rotate: -12 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.3 }}
                />
              </div>
            </div>

            {/* Copy — RIGHT */}
            <div className="flex-1 text-center md:text-left order-1 md:order-2">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <Sparkles className="h-5 w-5" style={{ color: `hsl(${haloHsl})` }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: `hsl(${haloHsl})` }}>HALO</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-4 tracking-tight text-foreground leading-[1.1]">
                El director que mantiene<br />al equipo en{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: haloGradient,
                    textShadow: "none",
                    WebkitTextStroke: "0",
                    filter: `drop-shadow(0 -1px 0 hsl(0 0% 100% / 0.15)) drop-shadow(0 1px 0 hsl(0 0% 0% / 0.55)) drop-shadow(0 3px 5px hsl(0 0% 0% / 0.45)) drop-shadow(0 0 12px hsl(${haloHsl} / 0.3))`,
                  }}
                >
                  sincronía
                </span>
              </h1>
              <p className="text-foreground/80 max-w-xl text-base md:text-lg font-light mb-6 whitespace-pre-line">
                {"HALO no atiende llamadas ni cierra ventas. Es el más importante del equipo: coordina los cinco agentes base y sincroniza cualquier agente personalizado que desarrollemos específicamente para tu empresa.\n\nSin HALO, no hay sistema. Con HALO, cada pieza encaja."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <div
                  className="rounded-full p-[2px] hover:opacity-90 transition-opacity shadow-lg"
                  style={{ backgroundImage: haloGradient }}
                >
                  <Button
                    size="lg"
                    className="rounded-full px-8 w-full"
                    style={{ background: "#000", color: "transparent" }}
                    onClick={() => window.open(BOOKING_URL, "_blank")}
                  >
                    <span
                      className="bg-clip-text text-transparent flex items-center gap-2"
                      style={{ backgroundImage: haloGradient }}
                    >
                      Solicitar demo
                      <ArrowRight className="h-4 w-4 shrink-0" style={{ color: `hsl(${haloHsl})` }} />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Capacidades ── */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-10">
              Capacidades de HALO
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 bg-card/40 border border-border/20 rounded-xl p-4"
                  {...fade}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <cap.icon className="h-5 w-5 shrink-0 mt-0.5" style={{ color: `hsl(${haloHsl})` }} />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">{cap.title}</p>
                    <p className="text-sm text-foreground/80">{cap.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ── El equipo que dirige ── */}
      <section className="py-12 md:py-20 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto max-w-4xl">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-4">
              El equipo que coordina
            </h2>
            <p className="text-center text-foreground/70 mb-10 max-w-xl mx-auto">
              HALO dirige a los cinco agentes base más cualquier agente personalizado que desarrollemos para los procesos específicos de tu empresa.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {squadAgents.map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <motion.div
                    key={agent.name}
                    {...fade}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <Link
                      to={agent.path}
                      className="flex flex-col items-center gap-2 bg-card/40 border border-border/20 rounded-xl p-4 hover:border-primary/25 transition-all group"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: `hsl(${agent.hsl} / 0.1)` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: `hsl(${agent.hsl})` }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: `hsl(${agent.hsl})` }}>{agent.name}</span>
                      <span className="text-[10px] text-foreground/60 text-center leading-tight">{agent.role}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ── Casos de uso ── */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-10">
              Casos de uso
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {useCases.map((uc, i) => (
                <motion.div
                  key={i}
                  className="bg-card/40 border border-border/20 rounded-2xl p-6 hover:border-primary/20 transition-all"
                  {...fade}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-2">{uc.title}</h3>
                  <p className="text-sm text-foreground/70 font-light">{uc.description}</p>
                </motion.div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-12 md:py-20 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto max-w-5xl">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-10">
              Lo que dicen nuestros clientes
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  className="bg-card/40 border border-border/20 rounded-2xl p-6 hover:border-primary/20 transition-all flex flex-col"
                  {...fade}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <TrustpilotStars rating={5} size={16} />
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#00b67a40' }} />
                  </div>
                  <blockquote className="text-sm text-foreground/85 leading-relaxed mb-4 flex-1 font-light">
                    <Quote className="inline h-3.5 w-3.5 text-primary/25 mr-1 -mt-1" />
                    {t.quote}
                  </blockquote>
                  <div className="mb-3">
                    <span
                      className="text-[11px] font-display font-bold tracking-wide px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `hsl(${haloHsl} / 0.1)`, color: `hsl(${haloHsl})` }}
                    >
                      {t.result}
                    </span>
                  </div>
                  <div className="h-px bg-border/20 mb-3" />
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-foreground/65">{t.role}</div>
                </motion.div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto text-center">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-5">
              Activa HALO en tu empresa
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto text-base md:text-lg font-light mb-8">
              Agenda una demo personalizada y descubre cómo HALO convierte a cinco agentes en un sistema coordinado que trabaja para tu empresa los 365 días del año.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/20"
              onClick={() => window.open(BOOKING_URL, "_blank")}
            >
              Solicitar demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </SectionFade>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="halo" />
    </div>
  );
};

export default SquadWorkflow;
