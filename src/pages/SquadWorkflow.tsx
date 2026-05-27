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
              style={{ borderColor: `hsl(${haloHsl} / 0.18)`, background: `hsl(${haloHsl} / 0.05)` }}
            >
              {/* Título */}
              <div className="text-center px-6 md:px-16 pt-12 pb-10">
                <h2 className="text-3xl md:text-4xl font-display font-extrabold text-foreground mb-4 leading-tight tracking-tight">
                  Todo coordinado.<br />En tiempo real.
                </h2>
                <p className="text-foreground/60 font-light leading-relaxed max-w-md mx-auto">
                  Cinco agentes trabajando como uno solo. HALO decide en cada momento qué agente actúa y con qué información. El cliente no percibe ninguna transición.
                </p>
              </div>

              {/* 3 pasos — mismo patrón que páginas de agentes */}
              <div className="grid sm:grid-cols-3 gap-6 px-6 md:px-10 pb-10">
                {[
                  { step: "01", title: "Escucha en tiempo real", description: "HALO monitoriza cada interacción simultáneamente. Tiene el contexto completo antes de que termine la primera llamada." },
                  { step: "02", title: "Decide y enruta", description: "Analiza la situación completa y determina qué agente actúa, cuándo y con qué información. Sin redundancias ni lagunas." },
                  { step: "03", title: "Coordinación invisible", description: "Las transiciones entre agentes son transparentes. El cliente vive una experiencia continua sin percibir ningún traspaso." },
                ].map((s, i) => (
                  <motion.div key={i} className="flex flex-col items-center text-center gap-3"
                    {...fade} transition={{ duration: 0.5, delay: i * 0.12 }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `hsl(${haloHsl} / 0.10)`, border: `1px solid hsl(${haloHsl} / 0.25)` }}>
                      <span className="font-display font-extrabold text-base" style={{ color: `hsl(${haloHsl})` }}>{s.step}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground">{s.title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed">{s.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Visual de relay: HALO → 5 agentes en línea (elemento distintivo) */}
              <div className="px-2 md:px-6 py-4"
                style={{ borderTop: `1px solid hsl(${haloHsl} / 0.12)`, borderBottom: `1px solid hsl(${haloHsl} / 0.12)`, background: `hsl(${haloHsl} / 0.02)` }}>
                {(() => {
                  const ly = 90;
                  const hx = 65;
                  const agentXs = [165, 261, 357, 453, 549];
                  const cycle = squadAgents.length * 1.1 + 2.2;
                  return (
                    <svg viewBox="0 0 600 180" className="w-full" style={{ maxHeight: 200 }} fill="none">
                      <defs>
                        <filter id="rglow" x="-60%" y="-60%" width="220%" height="220%">
                          <feGaussianBlur stdDeviation="4.5" result="blur" />
                          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                      </defs>

                      {/* Línea horizontal */}
                      <line x1={hx} y1={ly} x2={549} y2={ly}
                        stroke={`hsl(${haloHsl} / 0.18)`} strokeWidth="1.5" strokeDasharray="4 7" />

                      {/* Pulsos HALO → cada agente */}
                      {squadAgents.map((a, i) => (
                        <motion.circle key={`p${i}`} r={5} cy={ly}
                          fill={`hsl(${a.hsl})`} filter="url(#rglow)"
                          animate={{ cx: [hx, agentXs[i]], opacity: [0, 1, 1, 0] }}
                          transition={{ duration: 0.75, delay: i * 1.1, repeat: Infinity, repeatDelay: cycle - 0.75, ease: "easeOut" }}
                        />
                      ))}

                      {/* Nodos agentes */}
                      {squadAgents.map((a, i) => (
                        <g key={i}>
                          <motion.circle cx={agentXs[i]} cy={ly} fill="none"
                            stroke={`hsl(${a.hsl})`} strokeWidth="2"
                            animate={{ r: [30, 48, 30], opacity: [0, 0.65, 0] }}
                            transition={{ duration: 0.60, delay: i * 1.1 + 0.70, repeat: Infinity, repeatDelay: cycle - 0.60, ease: "easeOut" }}
                          />
                          <motion.circle cx={agentXs[i]} cy={ly} fill="none"
                            stroke={`hsl(${a.hsl} / 0.22)`} strokeWidth="1.5"
                            animate={{ r: [31, 37, 31], opacity: [0.28, 0.50, 0.28] }}
                            transition={{ duration: 3.0 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                          />
                          <circle cx={agentXs[i]} cy={ly} r={30}
                            fill={`hsl(${a.hsl} / 0.09)`} stroke={`hsl(${a.hsl} / 0.50)`} strokeWidth="2" />
                          <text x={agentXs[i]} y={ly + 5} textAnchor="middle"
                            fill={`hsl(${a.hsl})`} fontSize="11" fontWeight="800"
                            fontFamily="sans-serif" letterSpacing="0.07em">
                            {a.name}
                          </text>
                        </g>
                      ))}

                      {/* HALO: pulso radar */}
                      <motion.circle cx={hx} cy={ly} fill="none"
                        stroke={`hsl(${haloHsl} / 0.35)`} strokeWidth="2"
                        animate={{ r: [45, 72], opacity: [0.50, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", repeatDelay: 0.5 }}
                      />
                      {/* HALO: anillo rotante */}
                      <motion.g style={{ transformOrigin: `${hx}px ${ly}px` }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
                        <circle cx={hx} cy={ly} r={55}
                          stroke={`hsl(${haloHsl} / 0.14)`} strokeWidth="1" strokeDasharray="5 9" />
                      </motion.g>
                      {/* HALO: círculo principal */}
                      <circle cx={hx} cy={ly} r={45}
                        fill={`hsl(${haloHsl} / 0.10)`} stroke={`hsl(${haloHsl} / 0.55)`} strokeWidth="2" />
                      <text x={hx} y={ly - 5} textAnchor="middle"
                        fill={`hsl(${haloHsl})`} fontSize="14" fontWeight="800"
                        fontFamily="sans-serif" letterSpacing="0.09em">
                        HALO
                      </text>
                      <text x={hx} y={ly + 13} textAnchor="middle"
                        fill={`hsl(${haloHsl} / 0.45)`} fontSize="8" fontFamily="sans-serif">
                        orquestador
                      </text>
                    </svg>
                  );
                })()}
              </div>

              {/* Feature cards 2×2 — mismo patrón que páginas de agentes */}
              <div className="grid sm:grid-cols-2 gap-4 p-6 md:p-8">
                {capabilities.map((fc, i) => (
                  <motion.div key={i}
                    className="rounded-xl p-5 flex gap-3"
                    style={{ background: `hsl(${haloHsl} / 0.04)`, border: `1px solid hsl(${haloHsl} / 0.18)` }}
                    {...fade} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}>
                    <CircleDot className="h-4 w-4 shrink-0 mt-0.5" style={{ color: `hsl(${haloHsl})` }} />
                    <div>
                      <h3 className="font-display font-semibold text-sm text-foreground mb-1.5">{fc.title}</h3>
                      <p className="text-xs text-foreground/60 font-light leading-relaxed">{fc.description}</p>
                    </div>
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
