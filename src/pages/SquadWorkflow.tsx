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
  HeartHandshake, Sparkles, CheckCircle2, Quote, CircleDot,
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

const howItWorks = [
  {
    step: "01",
    title: "Escucha cada señal",
    description: "HALO monitoriza en tiempo real cada interacción del sistema. Sabe qué agente está activo, qué necesita el cliente en cada momento y qué paso sigue en el proceso de tu empresa.",
  },
  {
    step: "02",
    title: "Decide y coordina",
    description: "En milisegundos, HALO decide qué agente debe intervenir, le transfiere el contexto completo del cliente y asegura que la transición sea invisible. El cliente nunca repite nada.",
  },
  {
    step: "03",
    title: "Integra y escala",
    description: "Activa agentes base o agentes a medida desarrollados específicamente para tu empresa. Los sincroniza con el equipo desde el primer día sin reconfigurar el sistema.",
  },
];

const featureCards = [
  {
    title: "Orquestación en tiempo real",
    description: "Coordina los cinco agentes base en cada interacción. Ningún cliente nota el cambio de un asistente a otro porque HALO gestiona la transición con el contexto completo.",
  },
  {
    title: "Memoria compartida del cliente",
    description: "El historial completo del cliente viaja entre agentes. Lo que sabe ARIA, lo sabe NOVA. Sin que el cliente tenga que repetir quién es ni qué necesita.",
  },
  {
    title: "Decisión inteligente de flujo",
    description: "HALO elige qué agente interviene en cada momento del proceso. Sin solapamientos, sin lagunas, sin llamadas que caen en el vacío entre departamentos.",
  },
  {
    title: "Escalado a humanos",
    description: "Detecta urgencias, situaciones delicadas o límites del sistema y transfiere al instante a la persona adecuada con todo el contexto ya explicado.",
  },
  {
    title: "Agentes a medida para tu empresa",
    description: "Desarrollamos agentes específicos para tus procesos: un gestor de averías, un cualificador de obra, un agente de reservas con tu protocolo exacto. HALO los sincroniza con el equipo base desde el primer día.",
  },
  {
    title: "Panel de supervisión total",
    description: "Monitoriza toda la actividad del equipo en tiempo real. Qué hizo cada agente, cuándo, con qué cliente y con qué resultado. Trazabilidad completa de cada interacción.",
  },
];

const scenarios = [
  {
    time: "16:30h — 17:45h",
    title: "Un cliente que compra, agenda y necesita soporte en la misma tarde",
    scenario: "Un cliente llama interesado en un servicio. Necesita información, cerrar la contratación, fijar la instalación y resolver una duda técnica. Cuatro procesos distintos, un solo cliente, una sola tarde.",
    result: "HALO orquesta cuatro agentes en 75 minutos: ARIA recibe la llamada, NOVA cierra la venta, LUMI agenda la instalación y CARE programa el seguimiento post-servicio. El cliente no repite su nombre ni una sola vez.",
  },
  {
    time: "Todos los días",
    title: "200 llamadas diarias entre 3 sedes con equipos distintos",
    scenario: "Tres oficinas, horarios diferentes, equipos distintos y clientes que llaman sin saber a qué sede pertenecen. Cada llamada tiene que llegar al sitio correcto con el contexto adecuado.",
    result: "HALO enruta automáticamente según sede, horario y disponibilidad. Las 200 llamadas llegan donde tienen que llegar, sin intervención manual y sin que ningún cliente quede sin atender.",
  },
  {
    time: "Semana 1",
    title: "Activación de un agente personalizado para un proceso específico",
    scenario: "Una empresa de climatización necesita un agente que gestione avisos de avería siguiendo su protocolo exacto: prioridad por tipo de instalación, asignación al técnico más cercano y confirmación al cliente en menos de 10 minutos.",
    result: "Desarrollamos el agente a medida. HALO lo integra con el equipo base desde el primer día: recibe el aviso, lo clasifica por urgencia, asigna técnico y notifica al cliente. Sin reconfigurar nada del sistema existente.",
  },
];

const squadAgents = [
  { name: "ARIA", role: "Recepcionista Virtual", hsl: "190 60% 55%", icon: Phone, path: "/aria" },
  { name: "NOVA", role: "Agente de Ventas", hsl: "260 50% 65%", icon: PhoneOutgoing, path: "/nova" },
  { name: "LUMI", role: "Coordinador de Citas", hsl: "160 50% 48%", icon: CalendarCheck, path: "/lumi" },
  { name: "BYTE", role: "Analista de Datos", hsl: "35 70% 58%", icon: BarChart3, path: "/byte" },
  { name: "CARE", role: "Atención Post-venta", hsl: "340 55% 60%", icon: HeartHandshake, path: "/care" },
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
    quote: "Tenemos un proceso muy específico para gestionar averías. Desarrollaron un agente a medida y funcionó desde el primer día. HALO lo coordinó con el resto sin ningún problema.",
    name: "Antonio Ruiz",
    role: "Jefe de Operaciones, Climatizaciones Ruiz",
    result: "Agente a medida integrado en días",
  },
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
            {/* Copy — LEFT */}
            <div className="flex-1 text-center md:text-left order-1 md:order-1">
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
                {"Halo mantiene al equipo unido: coordina los 5 agentes base y sincroniza cualquier agente personalizado que desarrollemos específicamente para tu empresa.\n\nSin HALO, no hay sistema. Con HALO, cada pieza encaja."}
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

            {/* Image — RIGHT */}
            <div className="shrink-0 relative flex items-center justify-center order-2 md:order-2 p-6 md:p-8">
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
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Cómo trabaja ── */}
      <section className="py-12 md:py-20 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto max-w-4xl">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
              Cómo trabaja HALO
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 mb-14">
              {howItWorks.map((s, i) => (
                <motion.div key={i} className="flex flex-col items-center text-center gap-3" {...fade} transition={{ duration: 0.5, delay: i * 0.12 }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `hsl(${haloHsl} / 0.10)`, border: `1px solid hsl(${haloHsl} / 0.25)` }}>
                    <span className="font-display font-extrabold text-lg" style={{ color: `hsl(${haloHsl})` }}>{s.step}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground">{s.title}</h3>
                  <p className="text-base text-foreground/70 font-light leading-relaxed">{s.description}</p>
                </motion.div>
              ))}
            </div>
          </SectionFade>

          {/* Feature cards */}
          <SectionFade>
            <div className="grid sm:grid-cols-2 gap-4">
              {featureCards.map((fc, i) => (
                <motion.div key={i} className="bg-card/40 rounded-xl p-5 flex gap-3" style={{ border: `1px solid hsl(${haloHsl} / 0.28)` }} {...fade} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <CircleDot className="h-4 w-4 shrink-0 mt-0.5" style={{ color: `hsl(${haloHsl})` }} />
                  <div>
                    <h3 className="font-display font-semibold text-base text-foreground mb-1.5">{fc.title}</h3>
                    <p className="text-sm text-foreground/70 font-light leading-relaxed">{fc.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Lo que HALO coordina — bento ── */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-3">
              Lo que HALO coordina
            </h2>
            <p className="text-center text-foreground/60 font-light max-w-xl mx-auto mb-10">
              Un solo sistema que mantiene todo en marcha: los cinco agentes base y cualquier agente o automatización que construyamos para tu empresa.
            </p>

            <div className="flex flex-col gap-4 md:gap-5">

              {/* ── Fila 1: red de orquestación ── */}
              <motion.div
                {...fade}
                className="rounded-3xl overflow-hidden border flex flex-col md:flex-row"
                style={{ borderColor: `hsl(${haloHsl} / 0.28)`, background: `hsl(${haloHsl} / 0.05)` }}
              >
                {/* Texto izquierda */}
                <div className="p-6 md:p-8 flex flex-col justify-center md:w-1/2">
                  <h3 className="text-base font-display font-extrabold text-foreground uppercase tracking-widest mb-2">
                    Núcleo de orquestación
                  </h3>
                  <p className="text-base text-foreground/65 font-light leading-relaxed mb-5">
                    Coordina en tiempo real todos los agentes del sistema: los cinco base y los que creamos específicamente para tu empresa. Sin HALO, no hay sistema.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Tiempo real", "Contexto compartido", "Sin fricciones", "Escalado a humanos"].map((chip) => (
                      <span key={chip} className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: `hsl(${haloHsl} / 0.12)`, color: `hsl(${haloHsl})`, border: `1px solid hsl(${haloHsl} / 0.25)` }}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animación red derecha */}
                <div className="md:w-1/2 relative flex items-center justify-center h-64 md:h-72 overflow-hidden"
                  style={{ borderTop: "1px solid hsl(220 12% 62% / 0.12)", background: "hsl(220 12% 62% / 0.03)" }}>
                  <svg viewBox="0 0 300 240" className="w-full h-full" fill="none">
                    {/* Líneas de conexión */}
                    {[
                      { x: 150, y: 35,  hsl: "190 60% 55%" },
                      { x: 231, y: 94,  hsl: "260 50% 65%" },
                      { x: 200, y: 189, hsl: "160 50% 48%" },
                      { x: 100, y: 189, hsl: "35 70% 58%"  },
                      { x: 69,  y: 94,  hsl: "340 55% 60%" },
                    ].map((pos, i) => (
                      <g key={i}>
                        <line x1={150} y1={120} x2={pos.x} y2={pos.y}
                          stroke={`hsl(${pos.hsl} / 0.22)`} strokeWidth="1.5" strokeDasharray="4 5"/>

                        {/* Señal viajando de HALO al agente */}
                        <motion.circle r="3.5" fill={`hsl(${pos.hsl})`}
                          animate={{
                            cx: [150, pos.x],
                            cy: [120, pos.y],
                            opacity: [0, 1, 0],
                          }}
                          transition={{ duration: 1.6, delay: i * 0.9, repeat: Infinity, repeatDelay: 2.8, ease: "easeIn" }}
                        />

                        {/* Nodo agente */}
                        <motion.circle cx={pos.x} cy={pos.y} r={15}
                          fill={`hsl(${pos.hsl} / 0.12)`} stroke={`hsl(${pos.hsl} / 0.4)`} strokeWidth="1.5"
                          animate={{ r: [14, 16.5, 14] }}
                          transition={{ duration: 2.4 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.55 }}
                        />
                        <text x={pos.x} y={pos.y + 4} textAnchor="middle"
                          fill={`hsl(${pos.hsl})`} fontSize="7" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.06em">
                          {squadAgents[i].name}
                        </text>
                      </g>
                    ))}

                    {/* Pulso exterior de HALO */}
                    <motion.circle cx={150} cy={120} r={32} fill="none"
                      stroke={`hsl(${haloHsl} / 0.18)`} strokeWidth="1.5"
                      animate={{ r: [32, 46, 32], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
                    />
                    {/* Nodo HALO central */}
                    <circle cx={150} cy={120} r={27}
                      fill={`hsl(${haloHsl} / 0.18)`} stroke={`hsl(${haloHsl} / 0.55)`} strokeWidth="2"/>
                    <text x={150} y={117} textAnchor="middle"
                      fill={`hsl(${haloHsl})`} fontSize="9.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.08em">
                      HALO
                    </text>
                    <text x={150} y={130} textAnchor="middle"
                      fill={`hsl(${haloHsl} / 0.5)`} fontSize="6.5" fontFamily="sans-serif">
                      orquestador
                    </text>
                  </svg>
                </div>
              </motion.div>

              {/* ── Fila 2: 5 agentes ── */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                {squadAgents.map((agent, i) => {
                  const Icon = agent.icon;
                  return (
                    <motion.div key={agent.name} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }}>
                      <Link to={agent.path}
                        className="rounded-2xl p-4 md:p-5 flex flex-col items-center gap-3 text-center transition-all duration-300 hover:-translate-y-1 h-full block"
                        style={{ background: `hsl(${agent.hsl} / 0.06)`, border: `1px solid hsl(${agent.hsl} / 0.22)` }}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `hsl(${agent.hsl} / 0.15)` }}>
                          <Icon className="h-5 w-5" style={{ color: `hsl(${agent.hsl})` }} />
                        </div>
                        <div>
                          <p className="font-display font-extrabold text-sm uppercase tracking-wide mb-0.5"
                            style={{ color: `hsl(${agent.hsl})` }}>{agent.name}</p>
                          <p className="text-xs text-foreground/50 leading-snug">{agent.role}</p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 mt-auto" style={{ color: `hsl(${agent.hsl} / 0.4)` }} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* ── Fila 3: a medida ── */}
              <motion.div
                {...fade} transition={{ ...fade.transition, delay: 0.15 }}
                className="rounded-3xl border p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-10"
                style={{ borderColor: `hsl(${haloHsl} / 0.2)`, background: `hsl(${haloHsl} / 0.04)` }}
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: `hsl(${haloHsl} / 0.12)`, color: `hsl(${haloHsl})` }}>
                    + Ilimitado · a medida
                  </span>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">Agentes personalizados</h3>
                  <p className="text-sm text-foreground/65 font-light leading-relaxed">
                    Diseñados para los procesos exactos de tu empresa. HALO los integra como uno más del equipo.
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: `hsl(${haloHsl} / 0.12)`, color: `hsl(${haloHsl})` }}>
                    ⇄ Sin límite
                  </span>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">Flujos y automatizaciones</h3>
                  <p className="text-sm text-foreground/65 font-light leading-relaxed">
                    Automatizamos los flujos propios de tu operativa. HALO los orquesta junto al resto sin fricciones.
                  </p>
                  <p className="text-xs text-foreground/40 font-light mt-3">Crece con tu empresa sin límite</p>
                </div>
              </motion.div>

            </div>
          </SectionFade>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Un día con HALO ── */}
      <section className="py-12 md:py-20 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto max-w-5xl">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-3">
              Un día con HALO
            </h2>
            <p className="text-center text-foreground/60 font-light max-w-xl mx-auto mb-10">
              HALO no es un agente que ves: es el sistema que hace que todos los demás funcionen sin fisuras.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {scenarios.map((sc, i) => (
                <motion.div key={i} className="bg-card/40 border border-border/20 rounded-2xl p-6 flex flex-col gap-4" {...fade} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <div className="inline-flex items-center rounded-full px-3 py-1 self-start" style={{ background: `hsl(${haloHsl} / 0.10)`, border: `1px solid hsl(${haloHsl} / 0.25)` }}>
                    <span className="text-xs font-mono font-bold" style={{ color: `hsl(${haloHsl})` }}>{sc.time}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground leading-snug">{sc.title}</h3>
                  <p className="text-base text-foreground/65 font-light leading-relaxed flex-1">{sc.scenario}</p>
                  <div className="rounded-xl p-4 flex items-start gap-3 mt-1" style={{ background: `hsl(${haloHsl} / 0.10)`, border: `1px solid hsl(${haloHsl} / 0.20)` }}>
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: `hsl(${haloHsl})` }} />
                    <span className="text-sm font-medium leading-snug text-foreground">{sc.result}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

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
                  className="bg-card/40 rounded-2xl p-6 flex flex-col"
                  style={{
                    border: `1px solid hsl(${haloHsl} / 0.28)`,
                    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `hsl(${haloHsl} / 0.7)`;
                    e.currentTarget.style.boxShadow = `0 0 22px hsl(${haloHsl} / 0.22)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `hsl(${haloHsl} / 0.28)`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  {...fade}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <TrustpilotStars rating={5} size={16} />
                    <CheckCircle2 className="w-4 h-4" style={{ color: `hsl(${haloHsl} / 0.5)` }} />
                  </div>
                  <blockquote className="text-sm text-foreground/85 leading-relaxed mb-4 flex-1 font-light">
                    <Quote className="inline h-3.5 w-3.5 mr-1 -mt-1" style={{ color: `hsl(${haloHsl} / 0.4)` }} />
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

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="halo" />
    </div>
  );
};

export default SquadWorkflow;
