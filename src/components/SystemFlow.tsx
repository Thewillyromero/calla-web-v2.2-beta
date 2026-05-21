import { memo } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Phone,
  PhoneOutgoing,
  CalendarCheck,
  BarChart3,
  HeartHandshake,
  User,
} from "lucide-react";

// ─── Agent colour palette ────────────────────────────────────────────────────
const AGENTS = {
  HALO: { hsl: "220 12% 62%", label: "HALO", role: "Orquestador central", Icon: Sparkles },
  ARIA: { hsl: "190 60% 55%", label: "ARIA", role: "Recepcionista Virtual", Icon: Phone },
  NOVA: { hsl: "260 50% 65%", label: "NOVA", role: "Agente de Ventas", Icon: PhoneOutgoing },
  LUMI: { hsl: "160 50% 48%", label: "LUMI", role: "Gestión de Agenda", Icon: CalendarCheck },
  BYTE: { hsl: "35 70% 58%", label: "BYTE", role: "Analítica & Registro", Icon: BarChart3 },
  CARE: { hsl: "340 55% 60%", label: "CARE", role: "Seguimiento", Icon: HeartHandshake },
  HUMAN: { hsl: "217 91% 60%", label: "Humano", role: "Escalado / Urgencia", Icon: User },
} as const;

type AgentKey = keyof typeof AGENTS;

// ─── Primitives ──────────────────────────────────────────────────────────────

interface AgentNodeProps {
  agentKey: AgentKey;
  description?: string;
  small?: boolean;
}

const AgentNode = memo(({ agentKey, description, small = false }: AgentNodeProps) => {
  const agent = AGENTS[agentKey];
  const { Icon } = agent;
  return (
    <div
      className={`rounded-xl border flex flex-col items-center text-center ${small ? "px-3 py-2.5 gap-1" : "px-4 py-3 gap-1.5"}`}
      style={{
        background: `hsl(${agent.hsl} / 0.08)`,
        borderColor: `hsl(${agent.hsl} / 0.25)`,
      }}
    >
      <Icon
        className={small ? "w-3.5 h-3.5" : "w-4 h-4"}
        style={{ color: `hsl(${agent.hsl})` }}
      />
      <span
        className={`font-display font-bold leading-none ${small ? "text-xs" : "text-sm"}`}
        style={{ color: `hsl(${agent.hsl})` }}
      >
        {agent.label}
      </span>
      {description && (
        <span className="text-[10px] leading-snug text-foreground/70 max-w-[90px]">
          {description}
        </span>
      )}
    </div>
  );
});
AgentNode.displayName = "AgentNode";

interface PillProps {
  label: string;
}

const Pill = memo(({ label }: PillProps) => (
  <div className="bg-card/60 border border-border/30 rounded-full px-2.5 py-1 text-[10px] text-foreground/60 whitespace-nowrap">
    {label}
  </div>
));
Pill.displayName = "Pill";

interface ConnectorProps {
  fromHsl: string;
  toHsl: string;
  height?: number;
}

const Connector = memo(({ fromHsl, toHsl, height = 24 }: ConnectorProps) => (
  <div
    className="w-px mx-auto"
    style={{
      height,
      background: `linear-gradient(to bottom, hsl(${fromHsl} / 0.5), hsl(${toHsl} / 0.5))`,
    }}
  />
));
Connector.displayName = "Connector";

// ─── Shared footer nodes (BYTE + CARE) ───────────────────────────────────────

interface FooterNodesProps {
  byteDesc: string;
  careDesc: string;
}

const FooterNodes = memo(({ byteDesc, careDesc }: FooterNodesProps) => (
  <div className="mt-4 pt-4 border-t border-border/20 flex flex-col gap-3">
    <div className="flex items-center gap-2">
      <div className="w-px flex-none self-stretch" style={{ background: `hsl(${AGENTS.BYTE.hsl} / 0.25)` }} />
      <div className="flex-1">
        <AgentNode agentKey="BYTE" description={byteDesc} />
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-px flex-none self-stretch" style={{ background: `hsl(${AGENTS.CARE.hsl} / 0.25)` }} />
      <div className="flex-1">
        <AgentNode agentKey="CARE" description={careDesc} />
      </div>
    </div>
  </div>
));
FooterNodes.displayName = "FooterNodes";

// ─── Inbound tree ─────────────────────────────────────────────────────────────

const InboundTree = memo(() => (
  <div className="flex flex-col items-center w-full">
    {/* Entry */}
    <div className="bg-card/60 border border-border/30 rounded-xl px-4 py-2.5 flex items-center gap-2">
      <Phone className="w-4 h-4 text-foreground/50" />
      <span className="text-sm font-medium text-foreground/80">Entra una llamada</span>
    </div>

    <Connector fromHsl={AGENTS.ARIA.hsl} toHsl={AGENTS.ARIA.hsl} height={20} />

    {/* ARIA */}
    <div className="w-full max-w-[200px]">
      <AgentNode agentKey="ARIA" description="Recepcionista Virtual · Identifica intención" />
    </div>

    <Connector fromHsl={AGENTS.ARIA.hsl} toHsl="220 12% 30%" height={20} />

    {/* Branch row */}
    <div className="w-full grid grid-cols-4 gap-1.5">
      {/* LUMI */}
      <div className="flex flex-col items-center gap-1.5">
        <Connector fromHsl={AGENTS.ARIA.hsl} toHsl={AGENTS.LUMI.hsl} height={16} />
        <AgentNode agentKey="LUMI" description="Agenda cita" small />
        <Connector fromHsl={AGENTS.LUMI.hsl} toHsl={AGENTS.LUMI.hsl} height={12} />
        <Pill label="Confirmación + Recordatorio" />
      </div>
      {/* NOVA */}
      <div className="flex flex-col items-center gap-1.5">
        <Connector fromHsl={AGENTS.ARIA.hsl} toHsl={AGENTS.NOVA.hsl} height={16} />
        <AgentNode agentKey="NOVA" description="Cualificación ventas" small />
        <Connector fromHsl={AGENTS.NOVA.hsl} toHsl={AGENTS.NOVA.hsl} height={12} />
        <Pill label="Agenda reunión" />
      </div>
      {/* CARE */}
      <div className="flex flex-col items-center gap-1.5">
        <Connector fromHsl={AGENTS.ARIA.hsl} toHsl={AGENTS.CARE.hsl} height={16} />
        <AgentNode agentKey="CARE" description="Soporte & gestión" small />
        <Connector fromHsl={AGENTS.CARE.hsl} toHsl={AGENTS.CARE.hsl} height={12} />
        <Pill label="Resuelve + Escala" />
      </div>
      {/* Human */}
      <div className="flex flex-col items-center gap-1.5">
        <Connector fromHsl={AGENTS.ARIA.hsl} toHsl={AGENTS.HUMAN.hsl} height={16} />
        <AgentNode agentKey="HUMAN" description="Urgencia / Escalado" small />
        <Connector fromHsl={AGENTS.HUMAN.hsl} toHsl={AGENTS.HUMAN.hsl} height={12} />
        <Pill label="Traspaso con contexto" />
      </div>
    </div>

    <FooterNodes
      byteDesc="Transcribe · Analiza sentimiento · Métricas"
      careDesc="Seguimiento post-interacción · Satisfacción"
    />
  </div>
));
InboundTree.displayName = "InboundTree";

// ─── Outbound tree ────────────────────────────────────────────────────────────

const OutboundTree = memo(() => (
  <div className="flex flex-col items-center w-full">
    {/* Entry */}
    <div className="bg-card/60 border border-border/30 rounded-xl px-4 py-2.5 flex items-center gap-2">
      <PhoneOutgoing className="w-4 h-4 text-foreground/50" />
      <span className="text-sm font-medium text-foreground/80">Campaña outbound</span>
    </div>

    <Connector fromHsl={AGENTS.NOVA.hsl} toHsl={AGENTS.NOVA.hsl} height={20} />

    {/* NOVA */}
    <div className="w-full max-w-[200px]">
      <AgentNode agentKey="NOVA" description="Agente de Ventas · Llama al prospecto" />
    </div>

    <Connector fromHsl={AGENTS.NOVA.hsl} toHsl="220 12% 30%" height={20} />

    {/* Branch row */}
    <div className="w-full grid grid-cols-3 gap-2">
      {/* Lead OK */}
      <div className="flex flex-col items-center gap-1.5">
        <Connector fromHsl={AGENTS.NOVA.hsl} toHsl={AGENTS.LUMI.hsl} height={16} />
        <Pill label="Lead OK" />
        <Connector fromHsl={AGENTS.LUMI.hsl} toHsl={AGENTS.LUMI.hsl} height={12} />
        <AgentNode agentKey="LUMI" description="Agenda reunión" small />
      </div>
      {/* Lead frío */}
      <div className="flex flex-col items-center gap-1.5">
        <Connector fromHsl={AGENTS.NOVA.hsl} toHsl="220 12% 40%" height={16} />
        <Pill label="Lead frío" />
        <Connector fromHsl="220 12% 40%" toHsl={AGENTS.NOVA.hsl} height={12} />
        <Pill label="Reintento cadencia automática" />
      </div>
      {/* Cierre */}
      <div className="flex flex-col items-center gap-1.5">
        <Connector fromHsl={AGENTS.NOVA.hsl} toHsl={AGENTS.HUMAN.hsl} height={16} />
        <Pill label="Cierre directo" />
        <Connector fromHsl={AGENTS.HUMAN.hsl} toHsl={AGENTS.HUMAN.hsl} height={12} />
        <AgentNode agentKey="HUMAN" description="Notificación con contexto" small />
      </div>
    </div>

    <FooterNodes
      byteDesc="Mide conversión · Coste por lead · ROI"
      careDesc="Activa seguimiento post-venta"
    />
  </div>
));
OutboundTree.displayName = "OutboundTree";

// ─── Container animation variants ────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Main component ───────────────────────────────────────────────────────────

const SystemFlow = memo(() => {
  return (
    <section className="py-16 md:py-24 px-5 md:px-6">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-card/60 border border-border/30 rounded-full px-4 py-1.5 mb-5">
              <Sparkles
                className="w-3.5 h-3.5"
                style={{ color: `hsl(${AGENTS.HALO.hsl})` }}
              />
              <span className="text-xs font-display font-semibold tracking-wider text-foreground/70 uppercase">
                HALO · Orquestación inteligente
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-foreground mb-4">
              El sistema que lo gestiona todo
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto text-base md:text-lg font-light">
              HALO coordina en tiempo real a todos los agentes según el tipo de interacción,
              garantizando que cada llamada termine en la acción correcta.
            </p>
          </motion.div>

          {/* HALO root node */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
            <div className="w-fit">
              <div
                className="rounded-2xl border px-6 py-4 flex items-center gap-3"
                style={{
                  background: `hsl(${AGENTS.HALO.hsl} / 0.08)`,
                  borderColor: `hsl(${AGENTS.HALO.hsl} / 0.30)`,
                }}
              >
                <Sparkles
                  className="w-5 h-5"
                  style={{ color: `hsl(${AGENTS.HALO.hsl})` }}
                />
                <div>
                  <span
                    className="font-display font-bold text-base leading-none block"
                    style={{ color: `hsl(${AGENTS.HALO.hsl})` }}
                  >
                    HALO
                  </span>
                  <span className="text-xs text-foreground/70 mt-0.5 block">
                    Orquestador central
                  </span>
                </div>
              </div>
            </div>
            {/* Fork connector */}
            <div className="flex items-start mt-3 w-full max-w-2xl">
              <div
                className="flex-1 h-px mt-3"
                style={{ background: `hsl(${AGENTS.HALO.hsl} / 0.3)` }}
              />
              <div
                className="w-px"
                style={{ height: 24, background: `hsl(${AGENTS.HALO.hsl} / 0.3)` }}
              />
              <div
                className="flex-1 h-px mt-3"
                style={{ background: `hsl(${AGENTS.HALO.hsl} / 0.3)` }}
              />
            </div>
          </motion.div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto">
            {/* Left: Inbound */}
            <motion.div variants={itemVariants}>
              <div className="bg-card/30 border border-border/20 rounded-2xl p-5 md:p-6 h-full">
                <div className="flex items-center gap-2 mb-5">
                  <Phone
                    className="w-4 h-4"
                    style={{ color: `hsl(${AGENTS.ARIA.hsl})` }}
                  />
                  <span
                    className="text-xs font-display font-bold uppercase tracking-wider"
                    style={{ color: `hsl(${AGENTS.ARIA.hsl})` }}
                  >
                    Llamada Entrante
                  </span>
                </div>
                <InboundTree />
              </div>
            </motion.div>

            {/* Right: Outbound */}
            <motion.div variants={itemVariants}>
              <div className="bg-card/30 border border-border/20 rounded-2xl p-5 md:p-6 h-full">
                <div className="flex items-center gap-2 mb-5">
                  <PhoneOutgoing
                    className="w-4 h-4"
                    style={{ color: `hsl(${AGENTS.NOVA.hsl})` }}
                  />
                  <span
                    className="text-xs font-display font-bold uppercase tracking-wider"
                    style={{ color: `hsl(${AGENTS.NOVA.hsl})` }}
                  >
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
  );
});

SystemFlow.displayName = "SystemFlow";

export default SystemFlow;
