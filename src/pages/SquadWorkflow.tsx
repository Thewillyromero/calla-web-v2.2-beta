import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
                {"Halo mantiene al equipo unido: coordina los 5 agentes base y sincroniza cualquier agente personalizado que desarrollemos específicamente para tu empresa.\n\nCon HALO, cada pieza encaja."}
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
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                Lo que HALO coordina
              </h2>
              <p className="text-foreground/60 font-light max-w-xl mx-auto">
                Un solo sistema que mantiene todo en marcha: los cinco agentes base y cualquier agente o automatización que construyamos para tu empresa.
              </p>
            </motion.div>

            <div className="flex flex-col gap-4 md:gap-5">

              {/* ── Fila 1: orquestación (ancha) + memoria ── */}
              <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 md:gap-5">

                {/* ORQUESTACIÓN */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: `hsl(${haloHsl} / 0.28)`, background: `hsl(${haloHsl} / 0.05)` }}
                >
                  <div className="p-6 md:p-8">
                    <h3 className="text-base font-display font-extrabold text-foreground mb-2 leading-tight uppercase tracking-widest">
                      Núcleo de orquestación
                    </h3>
                    <p className="text-base text-foreground/65 font-light leading-relaxed mb-5">
                      Coordina en tiempo real todos los agentes del sistema: los cinco base y los que creamos específicamente para tu empresa.
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
                  <div className="h-52 relative flex items-center justify-center overflow-hidden"
                    style={{ background: `hsl(${haloHsl} / 0.03)`, borderTop: `1px solid hsl(${haloHsl} / 0.10)` }}>
                    <svg viewBox="0 0 300 210" className="w-full h-full" fill="none">
                      {[
                        { x: 150, y: 32,  hsl: "190 60% 55%" },
                        { x: 233, y: 91,  hsl: "260 50% 65%" },
                        { x: 202, y: 183, hsl: "160 50% 48%" },
                        { x: 98,  y: 183, hsl: "35 70% 58%"  },
                        { x: 67,  y: 91,  hsl: "340 55% 60%" },
                      ].map((pos, i) => (
                        <g key={i}>
                          <line x1={150} y1={112} x2={pos.x} y2={pos.y}
                            stroke={`hsl(${pos.hsl} / 0.20)`} strokeWidth="1.5" strokeDasharray="4 6"/>
                          <motion.circle r="3.5" fill={`hsl(${pos.hsl})`}
                            animate={{ cx: [150, pos.x], cy: [112, pos.y], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.6, delay: i * 0.9, repeat: Infinity, repeatDelay: 2.8, ease: "easeIn" }}
                          />
                          <motion.circle cx={pos.x} cy={pos.y} r={16}
                            fill={`hsl(${pos.hsl} / 0.10)`} stroke={`hsl(${pos.hsl} / 0.38)`} strokeWidth="1.5"
                            animate={{ r: [15, 17, 15] }}
                            transition={{ duration: 2.4 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.55 }}
                          />
                          <text x={pos.x} y={pos.y + 4} textAnchor="middle"
                            fill={`hsl(${pos.hsl})`} fontSize="7" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.06em">
                            {squadAgents[i].name}
                          </text>
                        </g>
                      ))}
                      <motion.circle cx={150} cy={112} r={34} fill="none"
                        stroke={`hsl(${haloHsl} / 0.16)`} strokeWidth="1.5"
                        animate={{ r: [34, 48, 34], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
                      />
                      <circle cx={150} cy={112} r={28}
                        fill={`hsl(${haloHsl} / 0.16)`} stroke={`hsl(${haloHsl} / 0.50)`} strokeWidth="2"/>
                      <text x={150} y={109} textAnchor="middle"
                        fill={`hsl(${haloHsl})`} fontSize="9.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.08em">
                        HALO
                      </text>
                      <text x={150} y={122} textAnchor="middle"
                        fill={`hsl(${haloHsl} / 0.45)`} fontSize="6.5" fontFamily="sans-serif">
                        orquestador
                      </text>
                    </svg>
                  </div>
                </motion.div>

                {/* MEMORIA COMPARTIDA */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: `hsl(${haloHsl} / 0.22)`, background: `hsl(${haloHsl} / 0.04)` }}
                >
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-base font-display font-extrabold text-foreground mb-2 leading-tight uppercase tracking-widest">
                      Memoria compartida
                    </h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed mb-6">
                      El historial completo del cliente viaja entre agentes. Lo que sabe ARIA, lo sabe NOVA. Sin repeticiones.
                    </p>
                    <div className="mt-auto rounded-2xl p-4"
                      style={{ background: `hsl(${haloHsl} / 0.07)`, border: `1px solid hsl(${haloHsl} / 0.15)` }}>
                      <p className="text-[9px] font-bold tracking-widest uppercase mb-4" style={{ color: `hsl(${haloHsl} / 0.55)` }}>
                        VIAJE DEL CLIENTE
                      </p>
                      <div className="flex items-start gap-1">
                        {[
                          { name: "ARIA", hsl: "190 60% 55%", label: "Recibe" },
                          { name: "NOVA", hsl: "260 50% 65%", label: "Vende" },
                          { name: "LUMI", hsl: "160 50% 48%", label: "Agenda" },
                          { name: "CARE", hsl: "340 55% 60%", label: "Fideliza" },
                        ].map((a, i) => (
                          <div key={a.name} className="flex items-center flex-1 min-w-0">
                            <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[8px] font-extrabold shrink-0"
                                style={{ background: `hsl(${a.hsl} / 0.15)`, color: `hsl(${a.hsl})`, border: `1px solid hsl(${a.hsl} / 0.3)` }}>
                                {a.name}
                              </div>
                              <span className="text-[8px] text-foreground/40 text-center">{a.label}</span>
                            </div>
                            {i < 3 && (
                              <div className="w-5 flex items-start pt-3.5 justify-center shrink-0">
                                <motion.div className="w-1.5 h-1.5 rounded-full"
                                  style={{ background: `hsl(${haloHsl} / 0.5)` }}
                                  animate={{ x: [-3, 3, -3] }}
                                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t flex items-center gap-1.5" style={{ borderColor: `hsl(${haloHsl} / 0.12)` }}>
                        <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: `hsl(${haloHsl})` }}
                          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                        <span className="text-[9px] text-foreground/45">Carlos M. · 647 XXX XXX</span>
                        <span className="ml-auto text-[9px] font-bold" style={{ color: `hsl(${haloHsl})` }}>Sin repetir datos</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ── Fila 2: panel + decisión + escalado ── */}
              <div className="grid sm:grid-cols-3 gap-4 md:gap-5">

                {/* PANEL */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: `hsl(${haloHsl} / 0.22)`, background: `hsl(${haloHsl} / 0.04)` }}
                >
                  <div className="p-5">
                    <h3 className="text-sm font-display font-extrabold text-foreground mb-1.5 uppercase tracking-widest">Panel de supervisión</h3>
                    <p className="text-xs text-foreground/60 font-light leading-relaxed">Trazabilidad completa. Qué hizo cada agente, cuándo y con qué resultado.</p>
                  </div>
                  <div className="px-5 pb-5 flex-1 flex flex-col justify-end gap-1">
                    <div className="h-24 flex items-end gap-1.5">
                      {[38, 62, 48, 82, 56, 72, 92, 44, 68, 54].map((h, i) => (
                        <motion.div key={i} className="flex-1 rounded-t-sm"
                          style={{ background: `hsl(${haloHsl} / ${0.18 + (h / 100) * 0.52})`, height: `${h}%`, originY: 1 }}
                          initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: i * 0.07, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between pt-1" style={{ borderTop: `1px solid hsl(${haloHsl} / 0.10)` }}>
                      <span className="text-[8px] text-foreground/30">Lun</span>
                      <span className="text-[8px] text-foreground/30">Hoy</span>
                    </div>
                  </div>
                </motion.div>

                {/* DECISIÓN */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: `hsl(${haloHsl} / 0.22)`, background: `hsl(${haloHsl} / 0.04)` }}
                >
                  <div className="p-5">
                    <h3 className="text-sm font-display font-extrabold text-foreground mb-1.5 uppercase tracking-widest">Decisión inteligente</h3>
                    <p className="text-xs text-foreground/60 font-light leading-relaxed">HALO elige qué agente interviene en cada momento. Sin solapamientos.</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center px-5 pb-6">
                    <svg viewBox="0 0 160 100" className="w-full max-w-[200px]" fill="none">
                      <circle cx={26} cy={50} r={16} fill={`hsl(${haloHsl} / 0.10)`} stroke={`hsl(${haloHsl} / 0.28)`} strokeWidth="1.5"/>
                      <text x={26} y={55} textAnchor="middle" fill={`hsl(${haloHsl} / 0.55)`} fontSize="10" fontFamily="sans-serif">✦</text>
                      <circle cx={80} cy={50} r={21} fill={`hsl(${haloHsl} / 0.16)`} stroke={`hsl(${haloHsl} / 0.58)`} strokeWidth="2"/>
                      <text x={80} y={54} textAnchor="middle" fill={`hsl(${haloHsl})`} fontSize="8.5" fontWeight="800" fontFamily="sans-serif">HALO</text>
                      <circle cx={142} cy={20} r={13} fill="hsl(190 60% 55% / 0.10)" stroke="hsl(190 60% 55% / 0.38)" strokeWidth="1.5"/>
                      <text x={142} y={24} textAnchor="middle" fill="hsl(190 60% 55%)" fontSize="6.5" fontWeight="800" fontFamily="sans-serif">ARIA</text>
                      <circle cx={142} cy={80} r={13} fill="hsl(160 50% 48% / 0.10)" stroke="hsl(160 50% 48% / 0.38)" strokeWidth="1.5"/>
                      <text x={142} y={84} textAnchor="middle" fill="hsl(160 50% 48%)" fontSize="6.5" fontWeight="800" fontFamily="sans-serif">LUMI</text>
                      <line x1={42} y1={50} x2={59} y2={50} stroke={`hsl(${haloHsl} / 0.28)`} strokeWidth="1.5" strokeDasharray="4 5"/>
                      <line x1={101} y1={42} x2={129} y2={24} stroke="hsl(190 60% 55% / 0.3)" strokeWidth="1.5" strokeDasharray="4 5"/>
                      <line x1={101} y1={58} x2={129} y2={76} stroke="hsl(160 50% 48% / 0.3)" strokeWidth="1.5" strokeDasharray="4 5"/>
                      <motion.circle r={3} fill={`hsl(${haloHsl})`}
                        animate={{ cx: [26, 80, 80, 142], cy: [50, 50, 50, 20], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeIn" }}
                      />
                    </svg>
                  </div>
                </motion.div>

                {/* ESCALADO */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: `hsl(${haloHsl} / 0.22)`, background: `hsl(${haloHsl} / 0.04)` }}
                >
                  <div className="p-5">
                    <h3 className="text-sm font-display font-extrabold text-foreground mb-1.5 uppercase tracking-widest">Escalado a humanos</h3>
                    <p className="text-xs text-foreground/60 font-light leading-relaxed">Detecta urgencias y transfiere al instante con todo el contexto ya explicado.</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-end px-5 pb-5 gap-2.5">
                    {[
                      { label: "ARIA detecta urgencia",     hsl: "190 60% 55%", pulse: false },
                      { label: "HALO clasifica y prioriza", hsl: haloHsl,       pulse: false },
                      { label: "Transfiere con contexto",   hsl: haloHsl,       pulse: false },
                      { label: "Agente humano informado",   hsl: "160 50% 48%", pulse: true  },
                    ].map((step, i) => (
                      <motion.div key={i} className="flex items-center gap-2.5"
                        initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}>
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: `hsl(${step.hsl} / 0.15)`, border: `1px solid hsl(${step.hsl} / 0.4)` }}>
                          {step.pulse
                            ? <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: `hsl(${step.hsl})` }}
                                animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                            : <div className="w-1.5 h-1.5 rounded-full" style={{ background: `hsl(${step.hsl})` }} />
                          }
                        </div>
                        <span className="text-[10px] text-foreground/65 font-medium leading-snug">{step.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* ── Fila 3: a medida ── */}
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="rounded-3xl border p-6 md:p-8"
                  style={{ borderColor: `hsl(${haloHsl} / 0.20)`, background: `hsl(${haloHsl} / 0.04)` }}
                >
                  <span className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: `hsl(${haloHsl} / 0.12)`, color: `hsl(${haloHsl})` }}>
                    + Ilimitado · a medida
                  </span>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">Agentes personalizados</h3>
                  <p className="text-sm text-foreground/65 font-light leading-relaxed">
                    Diseñados para los procesos exactos de tu empresa. HALO los integra como uno más del equipo.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                  className="rounded-3xl border p-6 md:p-8"
                  style={{ borderColor: `hsl(${haloHsl} / 0.20)`, background: `hsl(${haloHsl} / 0.04)` }}
                >
                  <span className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: `hsl(${haloHsl} / 0.12)`, color: `hsl(${haloHsl})` }}>
                    ⇄ Sin límite
                  </span>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">Flujos y automatizaciones</h3>
                  <p className="text-sm text-foreground/65 font-light leading-relaxed">
                    Automatizamos los flujos propios de tu operativa. HALO los orquesta junto al resto sin fricciones.
                  </p>
                </motion.div>
              </div>

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
