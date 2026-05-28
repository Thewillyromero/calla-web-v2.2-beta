import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Headphones, Clock, Lock, ArrowRight } from "lucide-react";
import agentInbound from "@/assets/characters/agent-inbound.webp";
import agentOutbound from "@/assets/characters/agent-outbound.webp";

interface CallSample {
  id: string;
  title: string;
  sector: string;
  duration: string;
  agent: string;
  agentImage: string;
  agentColor: string;
  description: string;
}

const callSamples: CallSample[] = [
  {
    id: "1",
    title: "Cita en clínica dental",
    sector: "Salud",
    duration: "1:30",
    agent: "ARIA",
    agentImage: agentInbound,
    agentColor: "brand-teal",
    description: "ARIA recibe una llamada, identifica disponibilidad y agenda una cita de limpieza dental para el jueves.",
  },
  {
    id: "2",
    title: "Campaña outbound — inmobiliaria",
    sector: "Inmobiliaria",
    duration: "2:15",
    agent: "NOVA",
    agentImage: agentOutbound,
    agentColor: "brand-lavender",
    description: "NOVA llama a un lead interesado en una vivienda, califica su presupuesto y agenda visita con el agente comercial.",
  },
  {
    id: "3",
    title: "Seguimiento de lead cualificado",
    sector: "Servicios",
    duration: "1:58",
    agent: "NOVA",
    agentImage: agentOutbound,
    agentColor: "brand-lavender",
    description: "NOVA contacta a un lead que solicitó información, confirma interés y agenda reunión con el equipo comercial.",
  },
];

interface CallCardProps {
  call: CallSample;
  onContact: () => void;
  index: number;
}

const CallCard = ({ call, onContact, index }: CallCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-border/25 bg-card/35 overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/30 hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onContact}
    >
      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={call.agentImage} alt={call.agent} className="w-10 h-10 object-contain" width={512} height={512} loading="lazy" />
            <div>
              <span className={`text-xs font-display font-bold text-${call.agentColor} tracking-wider uppercase`}>
                {call.agent}
              </span>
              <span className="text-xs text-muted-foreground/60 ml-2">{call.sector}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground/60 bg-secondary/30 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            {call.duration}
          </div>
        </div>

        {/* Title & description */}
        <h4 className="font-display font-bold text-base text-foreground mb-1.5">{call.title}</h4>
        <p className="text-xs text-muted-foreground/70 leading-relaxed mb-5">{call.description}</p>

        {/* Waveform — blurred and locked */}
        <div className="relative">
          <div className="flex items-end gap-[2px] h-8">
            {[...Array(44)].map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-full bg-primary/25"
                style={{ height: 4 + Math.sin(i * 0.35 + index) * 8 + Math.cos(i * 0.7) * 4, minHeight: 2 }}
              />
            ))}
          </div>

          {/* Lock overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0.85 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center backdrop-blur-[3px] bg-background/40 rounded-lg"
          >
            {hovered ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 bg-primary text-primary-foreground text-xs font-display font-semibold px-3.5 py-1.5 rounded-full shadow-lg shadow-primary/30"
              >
                Escuchar <ArrowRight className="w-3 h-3" />
              </motion.div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                <Lock className="w-3.5 h-3.5" />
                <span>Acceso bajo solicitud</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

interface CallPlayerProps {
  onContact?: () => void;
}

const CallPlayer = ({ onContact }: CallPlayerProps) => (
  <section className="py-20 md:py-32 px-5 md:px-6 relative overflow-hidden">
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/10 to-transparent" />
    <div className="absolute bottom-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-brand-teal/[0.03] blur-[160px] pointer-events-none" />

    <div className="container mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16 md:mb-20"
      >
        <div className="inline-flex items-center gap-2 bg-primary/[0.06] border border-primary/15 rounded-full px-4 py-1.5 mb-6">
          <Headphones className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs text-primary font-display font-semibold tracking-wide">
            Escucha llamadas reales
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-5 tracking-tight leading-[1.1]">
          No te lo contamos,{" "}
          <span className="text-gradient">escúchalo</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
          Llamadas reales de clientes en España. Sin filtros, sin edición.
          <br />
          <span className="text-foreground/50 text-sm">Acceso disponible bajo solicitud.</span>
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto mb-10">
        {callSamples.map((call, i) => (
          <CallCard key={call.id} call={call} onContact={() => onContact?.()} index={i} />
        ))}
      </div>

      {/* Main CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        <button
          onClick={() => onContact?.()}
          className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-display font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
        >
          Solicitar acceso a las grabaciones
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-xs text-muted-foreground/50 flex items-center gap-1.5">
          <Lock className="w-3 h-3" />
          Solo para empresas en fase de evaluación
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center text-xs text-muted-foreground/40 mt-8"
      >
        <Volume2 className="w-3 h-3 inline mr-1" />
        Nombres de clientes anonimizados por privacidad · Grabaciones de campañas reales en España
      </motion.p>
    </div>
  </section>
);

export default CallPlayer;
