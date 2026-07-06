import { memo } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Phone, PhoneOutgoing, CalendarCheck,
  BarChart3, HeartHandshake, User, ArrowDown,
} from "lucide-react";

const AGENTS = {
  HALO:  { hsl: "220 12% 62%",  label: "HALO",   role: "Orquestador central",      Icon: Sparkles      },
  ARIA:  { hsl: "190 60% 55%",  label: "ARIA",    role: "Recepcionista Virtual",    Icon: Phone         },
  NOVA:  { hsl: "260 50% 65%",  label: "NOVA",    role: "Agente de Ventas",         Icon: PhoneOutgoing },
  LUMI:  { hsl: "160 50% 48%",  label: "LUMI",    role: "Gestión de Agenda",        Icon: CalendarCheck },
  BYTE:  { hsl: "35 70% 58%",   label: "BYTE",    role: "Analítica & Registro",     Icon: BarChart3     },
  CARE:  { hsl: "340 55% 60%",  label: "CARE",    role: "Seguimiento",              Icon: HeartHandshake},
  HUMAN: { hsl: "217 91% 60%",  label: "Humano",  role: "Escalado / Urgencia",      Icon: User          },
} as const;

type AgentKey = keyof typeof AGENTS;

// ─── Primitives ───────────────────────────────────────────────────────────────

const AgentNode = memo(({ agentKey, description, compact = false }: {
  agentKey: AgentKey; description?: string; compact?: boolean;
}) => {
  const a = AGENTS[agentKey];
  return (
    <div
      className={`rounded-xl border flex flex-col items-center text-center w-full ${compact ? "px-3 py-3 gap-1.5" : "px-5 py-4 gap-2"}`}
      style={{ background: `hsl(${a.hsl} / 0.09)`, borderColor: `hsl(${a.hsl} / 0.30)` }}
    >
      <a.Icon className={compact ? "w-4 h-4" : "w-5 h-5"} style={{ color: `hsl(${a.hsl})` }} />
      <span className={`font-display font-bold leading-none ${compact ? "text-sm" : "text-base"}`} style={{ color: `hsl(${a.hsl})` }}>
        {a.label}
      </span>
      {description && (
        <span className="text-xs leading-snug text-foreground/70 max-w-[110px]">{description}</span>
      )}
    </div>
  );
});
AgentNode.displayName = "AgentNode";

const Pill = memo(({ label }: { label: string }) => (
  <div className="bg-card/70 border border-border/35 rounded-full px-3 py-1.5 text-xs text-foreground/65 whitespace-nowrap font-medium">
    {label}
  </div>
));
Pill.displayName = "Pill";

const VLine = memo(({ from, to, h = 28 }: { from: string; to: string; h?: number }) => (
  <div className="flex flex-col items-center">
    <div className="w-[2px] rounded-full" style={{ height: h, background: `linear-gradient(to bottom, hsl(${from} / 0.5), hsl(${to} / 0.5))` }} />
    <ArrowDown className="w-3 h-3 -mt-1" style={{ color: `hsl(${to} / 0.55)` }} />
  </div>
));
VLine.displayName = "VLine";

// ─── Footer (BYTE + CARE always present) ─────────────────────────────────────

const FooterNodes = memo(({ byteDesc, careDesc }: { byteDesc: string; careDesc: string }) => (
  <div className="mt-5 pt-5 border-t border-border/25 grid grid-cols-2 gap-3">
    <AgentNode agentKey="BYTE" description={byteDesc} compact />
    <AgentNode agentKey="CARE" description={careDesc} compact />
  </div>
));
FooterNodes.displayName = "FooterNodes";

// ─── Inbound tree ─────────────────────────────────────────────────────────────

const InboundTree = memo(() => (
  <div className="flex flex-col items-center w-full gap-0">
    {/* Trigger */}
    <div className="bg-card/70 border border-border/30 rounded-xl px-5 py-3 flex items-center gap-2.5 self-center">
      <Phone className="w-4 h-4 text-foreground/60" />
      <span className="text-sm font-semibold text-foreground/85">Entra una llamada</span>
    </div>

    <VLine from={AGENTS.ARIA.hsl} to={AGENTS.ARIA.hsl} h={24} />

    {/* ARIA */}
    <div className="w-full max-w-[220px]">
      <AgentNode agentKey="ARIA" description="Identifica la intención del cliente" />
    </div>

    <VLine from={AGENTS.ARIA.hsl} to="220 10% 35%" h={24} />

    {/* Branch row — 4 columns */}
    <div className="w-full grid grid-cols-4 gap-2">
      {[
        { key: "LUMI" as AgentKey, desc: "Agenda cita",       outcome: "Conf. + Recordatorio" },
        { key: "NOVA" as AgentKey, desc: "Oportunidad ventas", outcome: "Agenda reunión"        },
        { key: "CARE" as AgentKey, desc: "Soporte directo",   outcome: "Resuelve · Escala"    },
        { key: "HUMAN" as AgentKey,desc: "Urgencia",          outcome: "Traspaso con contexto"},
      ].map(({ key, desc, outcome }) => (
        <div key={key} className="flex flex-col items-center gap-1.5">
          <VLine from={AGENTS.ARIA.hsl} to={AGENTS[key].hsl} h={18} />
          <AgentNode agentKey={key} description={desc} compact />
          <VLine from={AGENTS[key].hsl} to={AGENTS[key].hsl} h={14} />
          <Pill label={outcome} />
        </div>
      ))}
    </div>

    <FooterNodes
      byteDesc="Transcribe · Motivos · Métricas"
      careDesc="Seguimiento post-interacción"
    />
  </div>
));
InboundTree.displayName = "InboundTree";

// ─── Outbound tree ────────────────────────────────────────────────────────────

const OutboundTree = memo(() => (
  <div className="flex flex-col items-center w-full gap-0">
    {/* Trigger */}
    <div className="bg-card/70 border border-border/30 rounded-xl px-5 py-3 flex items-center gap-2.5 self-center">
      <PhoneOutgoing className="w-4 h-4 text-foreground/60" />
      <span className="text-sm font-semibold text-foreground/85">Campaña saliente</span>
    </div>

    <VLine from={AGENTS.NOVA.hsl} to={AGENTS.NOVA.hsl} h={24} />

    {/* NOVA */}
    <div className="w-full max-w-[220px]">
      <AgentNode agentKey="NOVA" description="Llama al prospecto · Cualifica" />
    </div>

    <VLine from={AGENTS.NOVA.hsl} to="220 10% 35%" h={24} />

    {/* Branch row — 3 columns */}
    <div className="w-full grid grid-cols-3 gap-2">
      {[
        { key: "LUMI"  as AgentKey, label: "Lead cualificado", desc: "Agenda reunión",            outcome: "Cita confirmada"          },
        { key: "NOVA"  as AgentKey, label: "Lead frío",        desc: "Reintento automático",      outcome: "Cadencia inteligente"     },
        { key: "HUMAN" as AgentKey, label: "Cierre directo",   desc: "Notificación al equipo",    outcome: "Con contexto completo"   },
      ].map(({ key, label, desc, outcome }) => (
        <div key={key + label} className="flex flex-col items-center gap-1.5">
          <VLine from={AGENTS.NOVA.hsl} to={AGENTS[key].hsl} h={18} />
          <Pill label={label} />
          <VLine from={AGENTS[key].hsl} to={AGENTS[key].hsl} h={14} />
          <AgentNode agentKey={key} description={desc} compact />
          <VLine from={AGENTS[key].hsl} to={AGENTS[key].hsl} h={12} />
          <Pill label={outcome} />
        </div>
      ))}
    </div>

    <FooterNodes
      byteDesc="Conversión · Coste/lead · ROI"
      careDesc="Activa seguimiento post-venta"
    />
  </div>
));
OutboundTree.displayName = "OutboundTree";

// ─── Main ─────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const SystemFlow = memo(() => (
  <section className="py-16 md:py-24 px-5 md:px-6 bg-white/[0.015]">
    <div className="container mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-card/60 border border-border/30 rounded-full px-4 py-1.5 mb-5">
            <Sparkles className="w-3.5 h-3.5" style={{ color: `hsl(${AGENTS.HALO.hsl})` }} />
            <span className="text-xs font-display font-semibold tracking-wider text-foreground/70 uppercase">
              HALO · Orquestación inteligente
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-foreground mb-4">
            El sistema que lo gestiona todo
          </h2>
          <p className="text-foreground/75 max-w-2xl mx-auto text-base md:text-lg font-light">
            HALO coordina en tiempo real todos los agentes según el tipo de interacción. Cada llamada entrante o saliente recorre el flujo correcto y termina en la acción precisa.
          </p>
        </motion.div>

        {/* HALO root */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-6">
          <div
            className="rounded-2xl border px-8 py-5 flex items-center gap-4 shadow-lg"
            style={{
              background: `hsl(${AGENTS.HALO.hsl} / 0.10)`,
              borderColor: `hsl(${AGENTS.HALO.hsl} / 0.35)`,
              boxShadow: `0 0 40px hsl(${AGENTS.HALO.hsl} / 0.12)`,
            }}
          >
            <Sparkles className="w-6 h-6" style={{ color: `hsl(${AGENTS.HALO.hsl})` }} />
            <div>
              <span className="font-display font-extrabold text-lg leading-none block" style={{ color: `hsl(${AGENTS.HALO.hsl})` }}>
                HALO
              </span>
              <span className="text-sm text-foreground/65 mt-0.5 block">Orquestador central · Coordina todos los agentes</span>
            </div>
          </div>

          {/* Fork line */}
          <div className="flex items-start mt-4 w-full max-w-5xl">
            <div className="flex-1 h-[2px] mt-3" style={{ background: `hsl(${AGENTS.HALO.hsl} / 0.25)` }} />
            <div className="w-[2px]" style={{ height: 28, background: `hsl(${AGENTS.HALO.hsl} / 0.25)` }} />
            <div className="flex-1 h-[2px] mt-3" style={{ background: `hsl(${AGENTS.HALO.hsl} / 0.25)` }} />
          </div>
          <div className="flex w-full max-w-5xl justify-between px-[25%]">
            <ArrowDown className="w-3.5 h-3.5" style={{ color: `hsl(${AGENTS.HALO.hsl} / 0.4)` }} />
            <ArrowDown className="w-3.5 h-3.5" style={{ color: `hsl(${AGENTS.HALO.hsl} / 0.4)` }} />
          </div>
        </motion.div>

        {/* Two trees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <motion.div variants={itemVariants}>
            <div className="bg-card/30 border border-border/20 rounded-2xl p-6 md:p-8 h-full">
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-border/15">
                <Phone className="w-5 h-5" style={{ color: `hsl(${AGENTS.ARIA.hsl})` }} />
                <span className="text-sm font-display font-bold uppercase tracking-wider" style={{ color: `hsl(${AGENTS.ARIA.hsl})` }}>
                  Llamada Entrante
                </span>
              </div>
              <InboundTree />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-card/30 border border-border/20 rounded-2xl p-6 md:p-8 h-full">
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-border/15">
                <PhoneOutgoing className="w-5 h-5" style={{ color: `hsl(${AGENTS.NOVA.hsl})` }} />
                <span className="text-sm font-display font-bold uppercase tracking-wider" style={{ color: `hsl(${AGENTS.NOVA.hsl})` }}>
                  Llamada Saliente
                </span>
              </div>
              <OutboundTree />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
));

SystemFlow.displayName = "SystemFlow";
export default SystemFlow;
