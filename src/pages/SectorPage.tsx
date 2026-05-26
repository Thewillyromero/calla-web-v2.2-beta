import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Quote, CheckCircle2, AlertTriangle,
  Phone, PhoneOutgoing, CalendarCheck, BarChart3, HeartHandshake,
  PhoneCall, FileCheck2, RotateCcw,
} from "lucide-react";

const CAPABILITY_ICONS: Record<string, typeof PhoneCall> = {
  "phone-call": PhoneCall,
  "calendar-check": CalendarCheck,
  "file-check-2": FileCheck2,
  "rotate-ccw": RotateCcw,
  "phone": Phone,
  "phone-outgoing": PhoneOutgoing,
  "bar-chart": BarChart3,
};
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import { sectors } from "@/data/sectors";
import { BOOKING_URL } from "@/lib/constants";

const AGENT_META = {
  ARIA:  { label: "ARIA",  role: "Recepcionista Virtual", hsl: "190 60% 55%",  Icon: Phone          },
  NOVA:  { label: "NOVA",  role: "Agente de Ventas",      hsl: "260 50% 65%",  Icon: PhoneOutgoing  },
  LUMI:  { label: "LUMI",  role: "Gestión de Agenda",     hsl: "160 50% 48%",  Icon: CalendarCheck  },
  BYTE:  { label: "BYTE",  role: "Analítica & Registro",  hsl: "35 70% 58%",   Icon: BarChart3      },
  CARE:  { label: "CARE",  role: "Seguimiento",           hsl: "340 55% 60%",  Icon: HeartHandshake },
} as const;

type AgentKey = keyof typeof AGENT_META;

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" } as const,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const SectorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const sector = sectors.find((s) => s.slug === slug);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!sector) return <Navigate to="/" replace />;

  const Icon = sector.icon;

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => setContactOpen(true)} />

      {/* ── Hero ── */}
      <section className="pt-28 sm:pt-36 pb-20 px-5 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-primary/[0.04] blur-[130px] pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">

          <motion.div {...fade}
            className="inline-flex items-center gap-2 bg-card/60 border border-border/30 rounded-full px-4 py-1.5 mb-6">
            <Icon className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-display font-semibold tracking-wider text-foreground/70 uppercase">
              {sector.name}
            </span>
          </motion.div>

          <motion.h1
            {...fade} transition={{ ...fade.transition, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold mb-5 tracking-tight leading-[1.08] text-foreground">
            {sector.heroTitle}{" "}
            <span className="text-gradient">{sector.heroHighlight}</span>
          </motion.h1>

          <motion.p
            {...fade} transition={{ ...fade.transition, delay: 0.2 }}
            className="text-foreground/70 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed mb-8">
            {sector.description}
          </motion.p>

          <motion.div
            {...fade} transition={{ ...fade.transition, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-10">
            {sector.chips.map((chip) => (
              <div key={chip} className="flex items-center gap-1.5 bg-card/50 border border-border/30 rounded-full px-4 py-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-xs font-medium text-foreground/80">{chip}</span>
              </div>
            ))}
          </motion.div>

          <motion.div {...fade} transition={{ ...fade.transition, delay: 0.4 }}>
            <a
              href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              Solicitar demo <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Stats ── */}
      <section className="py-14 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-5">
            {sector.stats.map((stat, i) => (
              <motion.div
                key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }}
                className="bg-card/40 border border-border/20 rounded-2xl p-6 md:p-8 text-center">
                <div className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/70 font-medium leading-snug">{stat.label}</div>
                {stat.context && (
                  <div className="text-xs text-foreground/45 font-light mt-1">{stat.context}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Pain Points ── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div {...fade} className="mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-display font-extrabold text-foreground tracking-tight mb-3">
              Lo que frena tu negocio
            </h2>
            <p className="text-foreground/60 font-light max-w-xl">
              Problemas reales del sector que CALLA resuelve desde el primer día.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {sector.painPoints.map((point, i) => (
              <motion.div
                key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }}
                className="bg-card/35 border border-border/20 rounded-2xl p-5 md:p-6 flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-red-400/80" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-foreground mb-1.5">{point.title}</h3>
                  <p className="text-sm text-foreground/65 font-light leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Capabilities (sector-specific) ── */}
      {sector.capabilities && (
        <section className="py-16 md:py-24 px-5 md:px-6 bg-white/[0.03] relative overflow-hidden">
          {/* Watermark sector icon */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none">
            <Icon className="w-[28rem] h-[28rem] text-foreground/[0.025]" />
          </div>

          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div {...fade} className="mb-10 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-display font-extrabold text-foreground tracking-tight mb-3">
                {sector.capabilitiesTitle ?? `Qué hace CALLA en tu ${sector.name.toLowerCase()}`}
              </h2>
              <p className="text-foreground/60 font-light max-w-xl">
                {sector.capabilitiesSubtitle ?? "Cubierto desde el primer día."}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
              {sector.capabilities.map((cap, i) => {
                const CapIcon = CAPABILITY_ICONS[cap.iconName] ?? Icon;
                return (
                  <motion.div
                    key={i}
                    {...fade}
                    transition={{ ...fade.transition, delay: i * 0.1 }}
                    className="bg-card/35 border border-border/20 rounded-2xl p-7 md:p-8 flex flex-col gap-5 hover:border-border/40 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: "hsl(var(--primary) / 0.08)", border: "1px solid hsl(var(--primary) / 0.15)" }}
                      >
                        <CapIcon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-6xl font-display font-extrabold text-foreground/[0.05] leading-none select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-foreground mb-2 leading-tight">
                        {cap.title}
                      </h3>
                      <p className="text-base text-foreground/65 font-light leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Casos de uso ── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div {...fade} className="mb-10 md:mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight mb-3">
              Un día con CALLA en {sector.name.toLowerCase()}
            </h2>
            <p className="text-foreground/60 font-light">
              Situaciones reales del sector, resueltas automáticamente.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {sector.useCases.map((uc, i) => (
              <motion.div
                key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }}
                className="bg-card/40 border border-border/20 rounded-2xl p-5 md:p-6 flex flex-col gap-4">
                <div
                  className="inline-flex items-center rounded-full px-3 py-1 self-start"
                  style={{ background: "hsl(var(--primary) / 0.10)", border: "1px solid hsl(var(--primary) / 0.25)" }}
                >
                  <span className="text-xs font-mono font-bold" style={{ color: "hsl(var(--primary))" }}>{uc.time}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground leading-snug">
                  {uc.title}
                </h3>
                <p className="text-base text-foreground/65 font-light leading-relaxed flex-1">
                  {uc.scenario}
                </p>
                <div
                  className="rounded-xl p-4 flex items-start gap-3 mt-1"
                  style={{ background: "hsl(var(--primary) / 0.10)", border: "1px solid hsl(var(--primary) / 0.20)" }}
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />
                  <span className="text-sm font-medium leading-snug text-foreground">{uc.result}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Testimonial ── */}
      <section className="py-16 md:py-20 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            {...fade}
            className="bg-card/40 border border-border/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <Quote className="w-12 h-12 text-primary/15 absolute top-6 right-6 pointer-events-none" />
            <p className="text-lg md:text-xl text-foreground/85 font-light leading-relaxed mb-8 relative z-10">
              &ldquo;{sector.testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                <span className="text-sm font-display font-bold text-primary">
                  {sector.testimonial.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div>
                <div className="font-display font-semibold text-sm text-foreground">
                  {sector.testimonial.author}
                </div>
                <div className="text-xs text-foreground/55">
                  {sector.testimonial.role} · {sector.testimonial.company}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            {...fade}
            className="bg-card/40 border border-border/20 rounded-2xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-primary/[0.04] blur-[80px] pointer-events-none" />
            <Icon className="h-8 w-8 text-primary mx-auto mb-6 relative z-10" />
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-4 tracking-tight text-foreground relative z-10">
              ¿Listo para transformar tu {sector.name.toLowerCase()}?
            </h2>
            <p className="text-foreground/65 max-w-xl mx-auto text-base font-light mb-8 relative z-10">
              Habla con nosotros y te mostramos exactamente cómo CALLA funciona en tu sector. Sin compromiso.
            </p>
            <a
              href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 relative z-10">
              Solicitar demo <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source={`sector-${sector.slug}`} />
    </div>
  );
};

export default SectorPage;
