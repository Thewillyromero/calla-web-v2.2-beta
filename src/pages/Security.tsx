import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield, Lock, Server, CheckCircle2, ArrowRight,
  Globe, ShieldCheck, Database, Eye, Activity, FileText,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import { BOOKING_URL } from "@/lib/constants";

const pillars = [
  {
    icon: ShieldCheck,
    title: "RGPD & Normativa",
    hsl: "190 60% 55%",
    items: [
      "Cumplimiento total del Reglamento General de Protección de Datos",
      "Acuerdo de procesamiento de datos (DPA) disponible para clientes Enterprise",
      "Responsable del tratamiento identificado y documentado",
      "Registro de actividades de tratamiento siempre actualizado",
    ],
  },
  {
    icon: Lock,
    title: "Cifrado & Privacidad",
    hsl: "260 50% 65%",
    items: [
      "Cifrado extremo a extremo en todas las comunicaciones de voz",
      "Grabaciones almacenadas con cifrado AES-256 en reposo",
      "Acceso restringido por roles — solo tu equipo autorizado",
      "Retención de datos configurable según tus necesidades legales",
    ],
  },
  {
    icon: Server,
    title: "Infraestructura",
    hsl: "35 70% 58%",
    items: [
      "Servidores en Oracle Cloud, región Frankfurt (Alemania)",
      "SSL/TLS en todas las conexiones sin excepción",
      "Backups diarios automatizados con verificación de integridad",
      "Monitorización 24/7 con alertas automáticas en tiempo real",
    ],
  },
];

const callFlow = [
  { icon: Activity,  label: "Llamada entrante", hsl: "190 60% 55%" },
  { icon: Lock,      label: "Cifrado TLS",       hsl: "260 50% 65%" },
  { icon: Globe,     label: "Servidores UE",      hsl: "160 50% 48%" },
  { icon: Eye,       label: "Acceso por roles",   hsl: "35 70% 58%"  },
  { icon: Database,  label: "Almacenamiento",     hsl: "340 55% 60%" },
];


const metrics = [
  { value: "2M+",  label: "Llamadas procesadas de forma segura" },
  { value: "99.9%", label: "Uptime garantizado" },
  { value: "0",    label: "Brechas de seguridad" },
  { value: "100%", label: "Datos en servidores europeos" },
];

const Security = () => {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => setContactOpen(true)} />

      {/* ── Hero ── */}
      <section className="pt-28 sm:pt-36 pb-20 md:pb-28 px-5 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[700px] h-[500px] rounded-full bg-brand-teal/[0.05] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full bg-brand-lavender/[0.04] blur-[120px] pointer-events-none" />

        <div className="container mx-auto relative z-10 text-center max-w-4xl">

          {/* Animated shield with radar rings */}
          <div className="flex justify-center mb-10">
            <div className="relative flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 96 + i * 56,
                    height: 96 + i * 56,
                    border: "1px solid hsl(190 60% 55% / 0.25)",
                  }}
                  animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.07, 1] }}
                  transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
                />
              ))}
              <motion.div
                className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: "hsl(190 60% 55% / 0.1)",
                  border: "1.5px solid hsl(190 60% 55% / 0.35)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(190 60% 55% / 0.15)",
                    "0 0 50px hsl(190 60% 55% / 0.35)",
                    "0 0 20px hsl(190 60% 55% / 0.15)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Shield className="h-11 w-11" style={{ color: "hsl(190 60% 55%)" }} />
              </motion.div>
            </div>
          </div>

          {/* Live status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border"
            style={{ background: "hsl(160 50% 48% / 0.08)", borderColor: "hsl(160 50% 48% / 0.25)" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(160 50% 48%)" }} />
            <span className="text-xs font-display font-bold uppercase tracking-widest" style={{ color: "hsl(160 50% 55%)" }}>
              Sistema activo · Todo seguro
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold mb-5 tracking-tight leading-[1.08]"
          >
            Tu empresa,{" "}
            <span className="text-gradient">protegida del inicio</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-foreground/70 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed mb-10"
          >
            Protegemos los datos de tu empresa y de tus clientes con los más altos estándares europeos. Sin excepciones.
          </motion.p>

          {/* Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {["RGPD Compliant", "Servidores en Europa", "Cifrado AES-256", "Monitorización 24/7"].map((chip) => (
              <div key={chip} className="flex items-center gap-1.5 bg-card/50 border border-border/30 rounded-full px-4 py-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-teal shrink-0" />
                <span className="text-xs font-medium text-foreground/80">{chip}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Three pillars ── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-foreground tracking-tight mb-3">
              Tres capas de protección
            </h2>
            <p className="text-foreground/60 font-light">Cada dato cubierto desde múltiples frentes.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative bg-card/40 rounded-2xl p-6 md:p-8 overflow-hidden hover:-translate-y-1 transition-all duration-500"
                  style={{ border: `1.5px solid hsl(${pillar.hsl} / 0.2)` }}
                >
                  {/* Corner glow */}
                  <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none"
                    style={{ background: `hsl(${pillar.hsl} / 0.25)`, transform: "translate(40%, -40%)" }}
                  />
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10"
                    style={{ background: `hsl(${pillar.hsl} / 0.12)` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: `hsl(${pillar.hsl})` }} />
                  </div>
                  <h3
                    className="text-xl font-display font-extrabold mb-5 relative z-10"
                    style={{ color: `hsl(${pillar.hsl})` }}
                  >
                    {pillar.title}
                  </h3>
                  <ul className="space-y-3 relative z-10">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: `hsl(${pillar.hsl})` }} />
                        <span className="text-sm text-foreground/75 font-light leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Bottom line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, hsl(${pillar.hsl} / 0.5), transparent)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Call security flow ── */}
      <section className="py-16 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-foreground tracking-tight mb-3">
              Cómo protegemos cada llamada
            </h2>
            <p className="text-foreground/60 font-light">El ciclo completo de seguridad, de principio a fin.</p>
          </motion.div>

          <div className="flex flex-wrap md:flex-nowrap items-start justify-center gap-3 md:gap-0">
            {callFlow.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex flex-col md:flex-row items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex flex-col items-center text-center px-3 md:px-5"
                  >
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-3"
                      style={{
                        background: `hsl(${step.hsl} / 0.1)`,
                        border: `1.5px solid hsl(${step.hsl} / 0.28)`,
                      }}
                    >
                      <Icon className="h-7 w-7 md:h-8 md:w-8" style={{ color: `hsl(${step.hsl})` }} />
                    </div>
                    <span className="text-xs font-display font-semibold text-foreground/70 leading-tight max-w-[80px]">
                      {step.label}
                    </span>
                  </motion.div>
                  {i < callFlow.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-foreground/20 shrink-0 hidden md:block mt-[-20px]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border/20 p-8 md:p-12 relative overflow-hidden"
            style={{ background: "hsl(var(--card) / 0.3)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-brand-teal/[0.03] blur-[100px] pointer-events-none" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-2">{m.value}</div>
                  <p className="text-xs text-foreground/70 font-light leading-tight">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Never list ── */}
      <section className="py-16 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border/20 overflow-hidden"
            style={{ background: "hsl(var(--card) / 0.35)" }}
          >
            {/* Header bar */}
            <div className="px-8 md:px-12 py-7 border-b border-border/15 flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "hsl(340 55% 60% / 0.1)", border: "1.5px solid hsl(340 55% 60% / 0.25)" }}
              >
                <Shield className="h-5 w-5" style={{ color: "hsl(340 55% 60%)" }} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-display font-extrabold text-foreground tracking-tight">
                  Lo que CALLA nunca hará
                </h2>
                <p className="text-sm text-foreground/70 font-light mt-0.5">Compromisos contractuales, no solo palabras.</p>
              </div>
            </div>

            {/* Commitments list */}
            <div className="divide-y divide-border/10">
              {[
                { text: "Vender los datos de tus clientes a terceros, bajo ningún concepto.", note: "Tu base de datos es solo tuya." },
                { text: "Acceder a tus grabaciones sin autorización explícita y documentada.", note: "Acceso auditado y trazable." },
                { text: "Procesar ni almacenar datos fuera de la Unión Europea.", note: "Frankfurt, Alemania. Sin excepciones." },
                { text: "Conservar conversaciones más allá del período que tú configures.", note: "Retención bajo tu control." },
                { text: "Compartir información con otras empresas sin un DPA firmado.", note: "Cumplimiento legal garantizado." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex items-start gap-5 px-8 md:px-12 py-5 hover:bg-white/[0.015] transition-colors"
                >
                  <span
                    className="text-xl font-display font-black shrink-0 mt-0.5 select-none"
                    style={{ color: "hsl(340 55% 60%)" }}
                  >
                    ✕
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base text-foreground/85 font-medium leading-relaxed">{item.text}</p>
                    <p className="text-xs text-foreground/65 font-light mt-0.5">{item.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer note */}
            <div className="px-8 md:px-12 py-5 border-t border-border/10 flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-foreground/50 shrink-0" />
              <p className="text-xs text-foreground/60 font-light">
                Estos compromisos forman parte del Acuerdo de Procesamiento de Datos (DPA) disponible para todos los clientes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border/20 p-10 md:p-14 text-center relative overflow-hidden"
            style={{ background: "hsl(var(--card) / 0.4)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-brand-teal/[0.04] blur-[80px] pointer-events-none" />

            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10"
              style={{ background: "hsl(190 60% 55% / 0.12)", border: "1.5px solid hsl(190 60% 55% / 0.3)" }}
              animate={{ boxShadow: ["0 0 15px hsl(190 60% 55% / 0.1)", "0 0 35px hsl(190 60% 55% / 0.25)", "0 0 15px hsl(190 60% 55% / 0.1)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Shield className="h-8 w-8" style={{ color: "hsl(190 60% 55%)" }} />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-4 tracking-tight text-foreground relative z-10">
              ¿Tienes preguntas sobre seguridad?
            </h2>
            <p className="text-foreground/65 max-w-xl mx-auto text-base font-light mb-8 relative z-10">
              Nuestro equipo resuelve cualquier duda sobre protección de datos y cumplimiento normativo.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 relative z-10"
            >
              Hablar con un experto
              <ArrowRight className="w-4 h-4" />
            </a>

            <p className="text-xs font-mono text-foreground/25 mt-8 relative z-10">
              $ status: all_systems_secure · RGPD · AES-256 · Frankfurt EU
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="seguridad" />
    </div>
  );
};

export default Security;
