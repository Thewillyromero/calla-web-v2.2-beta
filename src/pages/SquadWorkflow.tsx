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
  HeartHandshake, Sparkles, CheckCircle2, Quote,
} from "lucide-react";
import haloConductor from "@/assets/halo-conductor.png";
import { BOOKING_URL } from "@/lib/constants";

const haloHsl = "215 22% 62%";
const haloGradient = "linear-gradient(135deg, hsl(210 35% 48%), hsl(210 18% 80%), hsl(228 30% 60%))";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

const squadAgents = [
  { name: "ARIA", hsl: "190 60% 55%", icon: Phone },
  { name: "NOVA", hsl: "260 50% 65%", icon: PhoneOutgoing },
  { name: "LUMI", hsl: "160 50% 48%", icon: CalendarCheck },
  { name: "BYTE", hsl: "35 70% 58%",  icon: BarChart3 },
  { name: "CARE", hsl: "340 55% 60%", icon: HeartHandshake },
];

const capabilities = [
  {
    title: "Memoria compartida del cliente",
    description: "Cada agente conoce el historial completo del cliente. Lo que registra ARIA, lo usa NOVA. Lo que agenda LUMI, lo sigue CARE: sin lagunas y sin fallos.",
  },
  {
    title: "Decisión inteligente en cada paso",
    description: "HALO elige qué agente interviene en cada momento. Sin solapamientos, sin lagunas, sin llamadas perdidas.",
  },
  {
    title: "Agentes a medida para tu empresa",
    description: "Desarrollamos agentes para tus procesos exactos. HALO los integra desde el primer día como uno más del equipo.",
  },
  {
    title: "Panel de supervisión total",
    description: "Trazabilidad completa. Qué hizo cada agente, cuándo y con qué resultado. Control en tiempo real.",
  },
];

const scenarios = [
  {
    time: "09:15h — 09:28h",
    title: "Un lead entra mientras el equipo está en reunión",
    description: "Un potencial cliente llama a primera hora. El equipo está ocupado y nadie puede atenderle. En otro escenario, la llamada se perdería para siempre.",
    result: "ARIA atiende, recoge la necesidad y los datos de contacto. NOVA registra el perfil del lead y programa el seguimiento automático. Cero oportunidades perdidas.",
  },
  {
    time: "13:00h — 13:18h",
    title: "Un cliente habitual cambia su cita y reporta una incidencia",
    description: "Es cliente desde hace dos años. Llama para adelantar su cita del día siguiente y, de paso, comenta que el último servicio no fue lo esperado.",
    result: "LUMI reorganiza la agenda sin conflictos en segundos. CARE registra la incidencia y programa el seguimiento. El cliente cuelga satisfecho en menos de 4 minutos.",
  },
  {
    time: "16:30h — 17:45h",
    title: "Un cliente que compra, agenda y necesita soporte en la misma tarde",
    description: "Un cliente llama interesado en un servicio. Necesita información, cerrar la contratación, fijar la instalación y resolver una duda técnica. Cuatro procesos distintos, un solo cliente.",
    result: "HALO orquesta cuatro agentes en 75 minutos: ARIA recibe la llamada, NOVA cierra la venta, LUMI agenda la instalación y CARE programa el seguimiento. El cliente no repite su nombre ni una sola vez.",
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
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <Sparkles className="h-5 w-5" style={{ color: `hsl(${haloHsl})` }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: `hsl(${haloHsl})` }}>HALO</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-4 tracking-tight text-foreground leading-[1.1]">
                El director que mantiene<br />al equipo en{" "}
                <span
                  className="bg-clip-text text-transparent whitespace-nowrap"
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
              <p className="text-foreground/80 max-w-xl text-base md:text-lg font-light mb-8 whitespace-pre-line">
                {"Halo mantiene al equipo unido: coordina los 5 agentes base y sincroniza cualquier agente personalizado que desarrollemos específicamente para tu empresa.\n\nCon HALO, cada pieza encaja."}
              </p>
              <div
                className="inline-block rounded-full p-[2px] hover:opacity-90 transition-opacity shadow-lg"
                style={{ backgroundImage: haloGradient }}
              >
                <Button
                  size="lg"
                  className="rounded-full px-8"
                  style={{ background: "#000", color: "transparent" }}
                  onClick={() => window.open(BOOKING_URL, "_blank")}
                >
                  <span className="bg-clip-text text-transparent flex items-center gap-2" style={{ backgroundImage: haloGradient }}>
                    Solicitar demo
                    <ArrowRight className="h-4 w-4 shrink-0" style={{ color: `hsl(${haloHsl})` }} />
                  </span>
                </Button>
              </div>
            </div>

            <div className="shrink-0 relative flex items-center justify-center p-6 md:p-8">
              <div className="absolute inset-0 scale-[2] md:scale-[3] rounded-full blur-3xl pointer-events-none animate-pulse-slow"
                style={{ background: `radial-gradient(circle, hsl(${haloHsl} / 0.32), hsl(${haloHsl} / 0.08) 45%, transparent 70%)` }} />
              <div className="absolute inset-0 scale-[1.4] md:scale-[1.6] rounded-full blur-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle, hsl(${haloHsl} / 0.45), transparent 65%)` }} />
              <div className="absolute inset-0 scale-[1.1] md:scale-[1.15] rounded-full pointer-events-none"
                style={{ boxShadow: `0 0 60px hsl(${haloHsl} / 0.5), inset 0 0 40px hsl(${haloHsl} / 0.2)` }} />
              <motion.img
                src={haloConductor}
                alt="HALO"
                className="w-48 sm:w-64 md:w-[22rem] lg:w-[26rem] object-contain relative z-10 animate-float-gentle drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                width={512} height={512}
                initial={{ opacity: 0, scale: 0, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Lo que HALO hace ── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <SectionFade>

            {/* Todo coordinado — módulo unificado */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden border"
              style={{ borderColor: `hsl(${haloHsl} / 0.25)`, background: `hsl(${haloHsl} / 0.04)` }}
            >
              {/* Cabecera: título + descripción + chips — centrado */}
              <div className="px-8 md:px-20 pt-12 pb-6 text-center">
                <h2 className="text-2xl md:text-3xl font-display font-extrabold text-foreground mb-4 leading-tight tracking-tight">
                  Todo coordinado.<br />En tiempo real.
                </h2>
                <p className="text-foreground/65 font-light leading-relaxed mb-6 max-w-xl mx-auto">
                  Cinco agentes trabajando como uno solo. HALO decide en tiempo real qué agente actúa y cuándo, con toda la información disponible. El cliente no percibe ninguna transición.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["24/7", "Sin fricción", "Contexto compartido", "A medida"].map((chip) => (
                    <span key={chip} className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `hsl(${haloHsl} / 0.12)`, color: `hsl(${haloHsl})`, border: `1px solid hsl(${haloHsl} / 0.22)` }}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Animación SVG — ancho completo */}
              {(() => {
                const ox = 240, oy = 130;
                const nodes = [
                  { x: 240, y: 25,  ...squadAgents[0] },
                  { x: 340, y: 97,  ...squadAgents[1] },
                  { x: 302, y: 215, ...squadAgents[2] },
                  { x: 178, y: 215, ...squadAgents[3] },
                  { x: 140, y: 97,  ...squadAgents[4] },
                ];
                const cycle = nodes.length * 0.9 + 3.0;
                return (
                  <svg viewBox="0 0 480 250" className="w-full" style={{ maxHeight: 260 }} fill="none">
                    <defs>
                      {nodes.map((n, i) => (
                        <linearGradient key={i} id={`hlg${i}`}
                          x1={ox} y1={oy} x2={n.x} y2={n.y} gradientUnits="userSpaceOnUse">
                          <stop offset="0%"   stopColor={`hsl(${haloHsl})`} stopOpacity={0.7} />
                          <stop offset="100%" stopColor={`hsl(${n.hsl})`}   stopOpacity={0.2} />
                        </linearGradient>
                      ))}
                      <filter id="hglow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>

                    {nodes.map((n, i) => (
                      <line key={i} x1={ox} y1={oy} x2={n.x} y2={n.y}
                        stroke={`url(#hlg${i})`} strokeWidth="1.5" strokeDasharray="4 8" />
                    ))}

                    {nodes.map((n, i) => (
                      <motion.circle key={`out${i}`} r={3.5} fill={`hsl(${n.hsl})`} filter="url(#hglow)"
                        animate={{ cx: [ox, n.x], cy: [oy, n.y], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 0.9, delay: i * 0.9, repeat: Infinity, repeatDelay: cycle - 0.9, ease: "easeOut" }}
                      />
                    ))}

                    {nodes.map((n, i) => (
                      <motion.circle key={`ret${i}`} r={2} fill={`hsl(${haloHsl})`}
                        animate={{ cx: [n.x, ox], cy: [n.y, oy], opacity: [0, 0.65, 0] }}
                        transition={{ duration: 0.65, delay: i * 0.9 + 1.05, repeat: Infinity, repeatDelay: cycle - 0.65, ease: "easeIn" }}
                      />
                    ))}

                    {nodes.map((n, i) => (
                      <g key={i}>
                        <motion.circle cx={n.x} cy={n.y} fill="none"
                          stroke={`hsl(${n.hsl})`} strokeWidth="1.5"
                          animate={{ r: [16, 30, 16], opacity: [0, 0.85, 0] }}
                          transition={{ duration: 0.65, delay: i * 0.9 + 0.9, repeat: Infinity, repeatDelay: cycle - 0.65, ease: "easeOut" }}
                        />
                        <motion.circle cx={n.x} cy={n.y} fill="none"
                          stroke={`hsl(${n.hsl} / 0.28)`} strokeWidth="1"
                          animate={{ r: [17, 21, 17], opacity: [0.35, 0.65, 0.35] }}
                          transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.45 }}
                        />
                        <circle cx={n.x} cy={n.y} r={17}
                          fill={`hsl(${n.hsl} / 0.10)`} stroke={`hsl(${n.hsl} / 0.45)`} strokeWidth="1.5" />
                        <text x={n.x} y={n.y + 4.5} textAnchor="middle"
                          fill={`hsl(${n.hsl})`} fontSize="8.5" fontWeight="800"
                          fontFamily="sans-serif" letterSpacing="0.07em">
                          {n.name}
                        </text>
                      </g>
                    ))}

                    <motion.g style={{ transformOrigin: `${ox}px ${oy}px` }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}>
                      <circle cx={ox} cy={oy} r={52}
                        stroke={`hsl(${haloHsl} / 0.20)`} strokeWidth="1" strokeDasharray="5 9" />
                    </motion.g>

                    <motion.circle cx={ox} cy={oy} fill="none"
                      stroke={`hsl(${haloHsl} / 0.45)`} strokeWidth="1.5"
                      animate={{ r: [32, 62], opacity: [0.55, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", repeatDelay: 0.4 }}
                    />

                    <circle cx={ox} cy={oy} r={32}
                      fill={`hsl(${haloHsl} / 0.13)`} stroke={`hsl(${haloHsl} / 0.55)`} strokeWidth="2" />
                    <text x={ox} y={oy - 3.5} textAnchor="middle"
                      fill={`hsl(${haloHsl})`} fontSize="11" fontWeight="800"
                      fontFamily="sans-serif" letterSpacing="0.08em">
                      HALO
                    </text>
                    <text x={ox} y={oy + 12} textAnchor="middle"
                      fill={`hsl(${haloHsl} / 0.45)`} fontSize="7" fontFamily="sans-serif">
                      orquestador
                    </text>
                  </svg>
                );
              })()}

              {/* 4 capacidades — franja inferior */}
              <div className="grid grid-cols-2 sm:grid-cols-4"
                style={{ borderTop: `1px solid hsl(${haloHsl} / 0.15)` }}>
                {capabilities.map((item, i) => (
                  <motion.div key={i}
                    className={`p-5 md:p-6 ${i === 1 || i === 3 ? 'border-l' : ''} ${i >= 2 ? 'border-t sm:border-t-0' : ''} ${i === 2 ? 'sm:border-l' : ''} border-foreground/[0.08]`}
                    {...fade} transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <div className="w-6 h-0.5 rounded-full mb-3"
                      style={{ background: `hsl(${haloHsl} / 0.55)` }} />
                    <h3 className="font-display font-semibold text-foreground text-sm mb-2">{item.title}</h3>
                    <p className="text-xs text-foreground/55 font-light leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </SectionFade>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Un día con HALO ── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto max-w-5xl">
          <SectionFade>
            <motion.div className="text-center mb-10" {...fade}>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                Un día con HALO
              </h2>
              <p className="text-foreground/55 font-light max-w-md mx-auto">
                HALO no es un agente que ves: es el sistema que hace que todos los demás funcionen sin fisuras.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {scenarios.map((s, i) => (
                <motion.div
                  key={i}
                  className="rounded-3xl border p-7 flex flex-col"
                  style={{ borderColor: `hsl(${haloHsl} / 0.25)`, background: `hsl(${haloHsl} / 0.04)` }}
                  {...fade} transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="inline-flex items-center rounded-full px-3 py-1 mb-5 self-start"
                    style={{ background: `hsl(${haloHsl} / 0.10)`, border: `1px solid hsl(${haloHsl} / 0.25)` }}>
                    <span className="text-xs font-mono font-bold" style={{ color: `hsl(${haloHsl})` }}>{s.time}</span>
                  </div>
                  <h3 className="font-display font-bold text-base md:text-lg text-foreground mb-3 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-foreground/60 font-light leading-relaxed mb-5 text-sm flex-1">
                    {s.description}
                  </p>
                  <div className="rounded-2xl p-4 flex items-start gap-3"
                    style={{ background: `hsl(${haloHsl} / 0.10)`, border: `1px solid hsl(${haloHsl} / 0.20)` }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: `hsl(${haloHsl})` }} />
                    <p className="text-sm font-medium leading-relaxed text-foreground">
                      {s.result}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Testimonios ── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <SectionFade>
            <motion.h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-10" {...fade}>
              Lo que dicen nuestros clientes
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  className="bg-card/40 rounded-2xl p-6 flex flex-col"
                  style={{
                    border: `1px solid hsl(${haloHsl} / 0.25)`,
                    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `hsl(${haloHsl} / 0.65)`;
                    e.currentTarget.style.boxShadow = `0 0 22px hsl(${haloHsl} / 0.18)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `hsl(${haloHsl} / 0.25)`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  {...fade} transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <TrustpilotStars rating={5} size={16} />
                    <CheckCircle2 className="w-4 h-4" style={{ color: `hsl(${haloHsl} / 0.45)` }} />
                  </div>
                  <blockquote className="text-sm text-foreground/80 leading-relaxed mb-4 flex-1 font-light">
                    <Quote className="inline h-3.5 w-3.5 mr-1 -mt-1" style={{ color: `hsl(${haloHsl} / 0.35)` }} />
                    {t.quote}
                  </blockquote>
                  <span className="text-[11px] font-display font-bold tracking-wide px-2.5 py-1 rounded-full self-start mb-3"
                    style={{ backgroundColor: `hsl(${haloHsl} / 0.10)`, color: `hsl(${haloHsl})` }}>
                    {t.result}
                  </span>
                  <div className="h-px bg-border/20 mb-3" />
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-foreground/55">{t.role}</p>
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
