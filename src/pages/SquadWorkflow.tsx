import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionFade from "@/components/SectionFade";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Phone, PhoneOutgoing, CalendarCheck, BarChart3, HeartHandshake, Sparkles } from "lucide-react";
import agentInbound from "@/assets/characters/agent-inbound.webp";
import agentOutbound from "@/assets/characters/agent-outbound.webp";
import agentScheduler from "@/assets/characters/agent-scheduler.webp";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";
import agentSupport from "@/assets/characters/agent-support.webp";
import heroRobot from "@/assets/hero-robot.webp";
import { BOOKING_URL } from "@/lib/constants";

/* ── Station data ── */

const stations = [
  {
    name: "ARIA",
    image: agentInbound,
    icon: Phone,
    color: "brand-teal",
    hsl: "190 60% 55%",
    role: "Recibe la llamada",
    brief: "Identifica qué necesita el cliente y lo gestiona",
    expanded:
      "Si necesita cita \u2192 pasa a LUMI. Si es comercial \u2192 pasa a NOVA. Si necesita soporte \u2192 gestiona directamente. Si es urgente \u2192 transfiere a un humano.",
    link: "/aria",
    animation: "animate-nod",
  },
  {
    name: "LUMI",
    image: agentScheduler,
    icon: CalendarCheck,
    color: "brand-emerald",
    hsl: "160 50% 48%",
    role: "Agenda la cita automáticamente",
    brief: "Comprueba disponibilidad y confirma por WhatsApp",
    expanded:
      "Comprueba disponibilidad, agenda, envía confirmación por WhatsApp, programa recordatorios.",
    link: "/lumi",
    animation: "animate-float-gentle",
  },
  {
    name: "NOVA",
    image: agentOutbound,
    icon: PhoneOutgoing,
    color: "brand-lavender",
    hsl: "260 50% 65%",
    role: "Llama a nuevos clientes potenciales",
    brief: "Campañas outbound que cualifican y agendan",
    expanded:
      "Lanza campañas outbound, cualifica leads, agenda reuniones con tu equipo comercial.",
    link: "/nova",
    animation: "animate-character-bounce",
  },
  {
    name: "BYTE",
    image: agentAnalytics,
    icon: BarChart3,
    color: "brand-amber",
    hsl: "35 70% 58%",
    role: "Analiza toda la información",
    brief: "Métricas, transcripciones e informes automáticos",
    expanded:
      "Transcribe llamadas, mide sentimiento, identifica patrones, genera informes semanales.",
    link: "/byte",
    animation: "animate-wiggle",
  },
  {
    name: "CARE",
    image: agentSupport,
    icon: HeartHandshake,
    color: "brand-rose",
    hsl: "340 55% 60%",
    role: "Cuida la relación post-venta",
    brief: "Seguimiento, satisfacción y fidelización",
    expanded:
      "Seguimiento de satisfacción, recordatorios, fidelización, detección de riesgo de pérdida.",
    link: "/care",
    animation: "animate-float-gentle",
  },
];

/* ── Connector ── */

const Connector = ({ prevHsl, nextHsl }: { prevHsl: string; nextHsl: string }) => (
  <div className="flex flex-col items-center py-3">
    <motion.div
      className="w-0.5 h-16"
      style={{
        background: `linear-gradient(to bottom, hsl(${prevHsl}), hsl(${nextHsl}))`,
        transformOrigin: "top",
      }}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    />
    <motion.div
      className="w-3 h-3 rounded-full bg-primary"
      initial={{ scale: 0 }}
      whileInView={{ scale: [0, 1.3, 1] }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
    />
  </div>
);

/* ── Split connector (ARIA splits to LUMI + NOVA) ── */

const SplitConnector = () => (
  <div className="flex flex-col items-center py-3">
    <motion.div
      className="w-0.5 h-8"
      style={{
        background: `linear-gradient(to bottom, hsl(190 60% 55%), hsl(210 50% 55%))`,
        transformOrigin: "top",
      }}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    />
    <motion.div
      className="w-3 h-3 rounded-full bg-primary"
      initial={{ scale: 0 }}
      whileInView={{ scale: [0, 1.3, 1] }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
    />
  </div>
);

/* ── Merge connector ── */

const MergeConnector = () => (
  <div className="flex flex-col items-center py-3">
    <motion.div
      className="w-3 h-3 rounded-full bg-primary"
      initial={{ scale: 0 }}
      whileInView={{ scale: [0, 1.3, 1] }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
    />
    <motion.div
      className="w-0.5 h-8"
      style={{
        background: `linear-gradient(to bottom, hsl(210 50% 55%), hsl(35 70% 58%))`,
        transformOrigin: "top",
      }}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    />
  </div>
);

/* ── Station card ── */

const StationCard = ({
  station,
  index,
  activeStation,
  setActiveStation,
}: {
  station: (typeof stations)[number];
  index: number;
  activeStation: number | null;
  setActiveStation: (i: number | null) => void;
}) => {
  const Icon = station.icon;
  return (
    <motion.div
      onClick={() => setActiveStation(activeStation === index ? null : index)}
      whileHover={{ scale: 1.02 }}
      className={`bg-card/40 border rounded-2xl p-6 cursor-pointer transition-all ${
        activeStation === index
          ? "border-primary/40 shadow-lg"
          : "border-border/20"
      }`}
    >
      <div className="flex items-center gap-4">
        <motion.img
          src={station.image}
          alt={station.name}
          className={`w-20 h-20 object-contain ${station.animation}`}
          whileHover={{ rotate: [-3, 3, 0], scale: 1.1 }}
        />
        <div>
          <span
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: `hsl(${station.hsl})` }}
          >
            {station.name}
          </span>
          <h3 className="text-xl font-bold text-foreground">{station.role}</h3>
          <p className="text-sm text-foreground/80">{station.brief}</p>
        </div>
      </div>
      <AnimatePresence>
        {activeStation === index && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-foreground/80 mt-4 pt-4 border-t border-border/20">
              {station.expanded}
            </p>
            <Link
              to={station.link}
              className="text-primary text-sm font-medium inline-flex items-center gap-1 mt-3 hover:underline"
            >
              Ver detalles de {station.name}{" "}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Page ── */

const SquadWorkflow = () => {
  const [activeStation, setActiveStation] = useState<number | null>(null);

  // Indices for the split layout
  const ariaStation = stations[0]; // ARIA
  const lumiStation = stations[1]; // LUMI
  const novaStation = stations[2]; // NOVA
  const byteStation = stations[3]; // BYTE
  const careStation = stations[4]; // CARE

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ─── Hero ─── */}
      <SectionFade>
        <section className="pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-[1.08] mb-5 tracking-tight text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Así trabaja tu equipo de IA
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-foreground/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Cada asistente tiene un rol. Juntos, gestionan todo el ciclo de
              atención al cliente.
            </motion.p>
          </div>
        </section>
      </SectionFade>

      {/* ─── HALO showcase ─── */}
      <SectionFade>
        <section className="pb-12 md:pb-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="relative rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm overflow-hidden px-6 py-12 md:px-12 md:py-16">
              {/* Aurora background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute -top-1/4 -left-1/4 w-[60%] h-[120%] rounded-full blur-3xl opacity-40"
                  style={{ background: "radial-gradient(circle, hsl(190 100% 70% / 0.55), transparent 65%)" }}
                  animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
                  transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-1/4 -right-1/4 w-[55%] h-[110%] rounded-full blur-3xl opacity-40"
                  style={{ background: "radial-gradient(circle, hsl(280 100% 75% / 0.5), transparent 65%)" }}
                  animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
                  transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-0 left-1/3 w-[50%] h-[80%] rounded-full blur-3xl opacity-30"
                  style={{ background: "radial-gradient(circle, hsl(220 100% 70% / 0.5), transparent 65%)" }}
                  animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* HALO image */}
                <motion.div
                  className="relative flex justify-center"
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="relative">
                    {/* Circular halo glow — HALO color (220 90% 65%) */}
                    <div
                      className="absolute inset-0 rounded-full blur-3xl"
                      style={{
                        background: "radial-gradient(circle, hsl(220 90% 65% / 0.55) 0%, hsl(220 90% 65% / 0.2) 40%, transparent 72%)",
                        transform: "scale(1.6)",
                      }}
                    />
                    {/* Inner ring */}
                    <div
                      className="absolute inset-0 rounded-full border border-[hsl(220_90%_65%/0.35)]"
                      style={{ transform: "scale(1.15)", boxShadow: "inset 0 0 60px hsl(220 90% 65% / 0.25)" }}
                    />
                    <motion.img
                      src={heroRobot}
                      alt="HALO — orquestador del equipo"
                      className="relative z-10 w-56 md:w-72 lg:w-80 object-contain drop-shadow-2xl"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>

                {/* HALO copy */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                >
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-4">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Conoce a HALO</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-extrabold text-foreground mb-4 leading-tight">
                    El hilo invisible que mantiene<br />al equipo en sincronía
                  </h2>
                  <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-5">
                    HALO es el sexto miembro del equipo. No habla con tus clientes, pero hace que ARIA, NOVA, LUMI, BYTE y CARE trabajen como un solo cerebro: pasa contexto, decide quién entra y escala a humano cuando hace falta.
                  </p>
                  <ul className="space-y-2 text-foreground/80 text-sm md:text-base">
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">›</span>Pasa el contexto del cliente entre agentes en tiempo real</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">›</span>Decide qué agente entra en cada momento</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">›</span>Detecta cuándo escalar a un humano y lo hace al instante</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </SectionFade>

      {/* ─── Flow ─── */}
      <SectionFade>
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-6 max-w-2xl">
            {/* Trigger event */}
            <motion.div
              className="text-center mb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold px-5 py-3 rounded-full text-sm">
                <Phone className="h-4 w-4" />
                Entra una llamada
              </div>
            </motion.div>

            {/* Connector to ARIA */}
            <Connector prevHsl="190 60% 55%" nextHsl="190 60% 55%" />

            {/* ARIA */}
            <StationCard
              station={ariaStation}
              index={0}
              activeStation={activeStation}
              setActiveStation={setActiveStation}
            />

            {/* Split connector */}
            <SplitConnector />

            {/* LUMI + NOVA side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <StationCard
                  station={lumiStation}
                  index={1}
                  activeStation={activeStation}
                  setActiveStation={setActiveStation}
                />
              </div>
              <div>
                <StationCard
                  station={novaStation}
                  index={2}
                  activeStation={activeStation}
                  setActiveStation={setActiveStation}
                />
              </div>
            </div>

            {/* Merge connector */}
            <MergeConnector />

            {/* BYTE */}
            <StationCard
              station={byteStation}
              index={3}
              activeStation={activeStation}
              setActiveStation={setActiveStation}
            />

            {/* Connector to CARE */}
            <Connector prevHsl="35 70% 58%" nextHsl="340 55% 60%" />

            {/* CARE */}
            <StationCard
              station={careStation}
              index={4}
              activeStation={activeStation}
              setActiveStation={setActiveStation}
            />
          </div>
        </section>
      </SectionFade>

      {/* ─── Summary row ─── */}
      <SectionFade>
        <section className="pb-16 md:pb-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6">
              {stations.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.name} className="flex items-center gap-3">
                    <Link
                      to={s.link}
                      className="flex items-center gap-2 bg-card/40 border border-border/20 rounded-xl px-4 py-2.5 hover:border-primary/30 transition-colors"
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{ color: `hsl(${s.hsl})` }}
                      />
                      <span className="text-sm font-bold text-foreground">
                        {s.name}
                      </span>
                    </Link>
                    {i < stations.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-foreground/40 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-foreground/80 text-sm md:text-base max-w-2xl mx-auto">
              Cada llamada es atendida, agendada, analizada y seguida
              automáticamente.
            </p>
          </div>
        </section>
      </SectionFade>

      {/* ─── CTA ─── */}
      <SectionFade>
        <section className="pb-20 md:pb-28">
          <div className="container mx-auto px-6">
            <motion.div
              className="bg-card/40 border border-border/20 rounded-2xl p-10 md:p-14 text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                ¿Quieres este equipo trabajando para ti?
              </h2>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/20 mt-4 text-base"
                onClick={() => window.open(BOOKING_URL, "_blank")}
              >
                Solicitar demo
              </Button>
            </motion.div>
          </div>
        </section>
      </SectionFade>

      <Footer />
    </div>
  );
};

export default SquadWorkflow;
