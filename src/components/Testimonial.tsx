import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowRight, TrendingUp, Building2, CheckCircle2, ShieldCheck } from "lucide-react";
import { TrustpilotStar, TrustpilotStars } from "@/components/TrustpilotStars";
import agentSupport from "@/assets/characters/agent-support.webp";
import CharacterReveal from "@/components/CharacterReveal";

import { testimonials } from "@/data/testimonials";

const caseStudies = [
  { company: "Clínica Dental", logo: null, result: "$5,000", description: "en ventas primera semana", metric: "25 leads a $30/lead", detail: "ROI positivo desde la primera semana" },
  { company: "Startup Médica", logo: null, result: "$400K", description: "en capital captado", metric: "Inversores a <$15/lead", detail: "Estrategia de pre-framing y retargeting" },
  { company: "Empresa de Fontanería", logo: null, result: "$7,200", description: "en ventas en 14 días", metric: "Leads a $6 · Citas a $26", detail: "Posicionamiento en cuidado preventivo" },
  { company: "Empresa de Suelos", logo: null, result: "$18K", description: "en ventas el primer mes", metric: "Presupuestos a $10.53", detail: "Leads desde $0.93" },
  { company: "Agente Inmobiliario", logo: null, result: "$17-25", description: "por lead cualificado", metric: "Evaluaciones agendadas", detail: "Vendedores interesados cualificados" },
  { company: "Agencia de Marketing", logo: null, result: "+$25K/mes", description: "en ingresos recurrentes", metric: "En solo 45 días", detail: "Estrategia integral: voz + captación" },
  { company: "Programa Formativo", logo: null, result: "$48K", description: "en ventas primera semana", metric: "Leads a <$3", detail: "Llamadas automáticas + campaña digital" },
  { company: "Empresa Solar", logo: null, result: "<$10/lead", description: "cualificados con cita", metric: "Citas a <$50", detail: "Leads consistentes bajo coste" },
  { company: "Ecommerce Cosmética", logo: null, result: "Sold out", description: "primer mes de campaña", metric: "Leads a $7.12", detail: "Voz IA + marketing integrado" },
];

const avatarGradients = [
  "from-brand-teal/40 to-brand-emerald/30", "from-brand-lavender/40 to-primary/30",
  "from-brand-rose/40 to-brand-amber/30", "from-brand-amber/40 to-brand-teal/30",
  "from-brand-emerald/40 to-brand-lavender/30", "from-primary/40 to-brand-rose/30",
];

const cardVariants = (i: number, fromLeft: boolean) => ({
  hidden: { opacity: 0, y: 30, x: fromLeft ? -40 : 40 },
  visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const } },
});

const barAvatars = [avatarSergio, avatarElena, avatarTim, avatarPatricia, avatarLaurence];

const Testimonial = () => {
  const [expanded, setExpanded] = useState(false);
  const visibleTestimonials = expanded ? testimonials : testimonials.slice(0, 6);

  return (
    <section id="testimonials" className="py-16 md:py-28 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/10 to-transparent" />
      <div className="absolute -right-10 top-1/4 pointer-events-none select-none">
        <CharacterReveal src={agentSupport} alt="" className="w-[150px] sm:w-[200px] md:w-[350px] lg:w-[450px] opacity-[0.06] sm:opacity-[0.08] lg:opacity-[0.12]" glowColor="hsl(340 55% 60%)" revealOffset={[0.05, 0.3]} />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }} className="text-center mb-16">
          <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">Resultados reales</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold mb-4 md:mb-5 tracking-tight text-glow">
            Lo que dicen <span className="text-gradient text-glow-teal">nuestros clientes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg font-light mb-8 md:mb-10">Más de 20 industrias, cientos de campañas exitosas.</p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-4">
            {[{ label: "Google Reviews", rating: 4.9 }, { label: "Trustpilot", rating: 4.8 }, { label: "Clutch.co", rating: 5.0 }].map((b) => (
              <div key={b.label} className="bg-card/50 rounded-xl border border-border/30 px-3.5 md:px-5 py-2.5 md:py-3 flex items-center gap-2.5 md:gap-3 hover:border-border/50 transition-all duration-300">
                <div><div className="flex items-center gap-2 mb-0.5"><span className="text-sm font-bold text-foreground">{b.rating}</span><TrustpilotStars rating={b.rating} size={14} /></div><span className="text-[10px] text-muted-foreground">{b.label}</span></div>
              </div>
            ))}
            <div className="bg-card/50 rounded-xl border border-border/30 px-3.5 md:px-5 py-2.5 md:py-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" style={{ color: '#00b67a' }} />
              <div><span className="text-xs font-semibold text-foreground block leading-tight">Verificado</span><span className="text-[10px] text-muted-foreground">Opiniones reales</span></div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid — AnimatePresence for expand/collapse */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-6">
          <AnimatePresence>
            {visibleTestimonials.map((t, i) => (
              <motion.div
                key={`testimonial-${t.initials}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i > 5 ? (i - 6) * 0.06 : i * 0.05 }}
              >
                <div className="bg-card/40 rounded-2xl border border-border/30 p-6 hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col group">
                  <div className="flex items-center justify-between mb-4">
                    <TrustpilotStars rating={5} size={18} />
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#00b67a40' }} />
                  </div>
                  <blockquote className="text-sm text-foreground/85 leading-relaxed mb-5 flex-1 font-light">
                    <Quote className="inline h-3.5 w-3.5 text-primary/25 mr-1 -mt-1" />{t.quote}
                  </blockquote>
                  <div className="mb-4 flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-display font-bold tracking-wide px-2.5 py-1 rounded-full" style={{ backgroundColor: 'hsl(160 50% 48% / 0.12)', color: 'hsl(160 50% 60%)' }}>{t.result}</span>
                    {"caseStudyUrl" in t && t.caseStudyUrl && (
                      <Link to={t.caseStudyUrl} className="text-[11px] font-display font-semibold text-primary/70 hover:text-primary transition-colors flex items-center gap-1">
                        Ver caso completo <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                  <div className="h-px bg-border/20 mb-4" />
                  <div className="flex items-center gap-3">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-border/20" loading="lazy" />
                    ) : (
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center ring-1 ring-border/20`}>
                        <span className="font-display font-bold text-foreground text-xs">{t.initials}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{t.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{t.role}, {t.company}</div>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 bg-secondary/40 px-2 py-0.5 rounded-full shrink-0">{t.context}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Expand/Collapse — BETWEEN testimonials and case studies */}
        <div className="flex justify-center mb-12">
          <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-3 bg-card/80 backdrop-blur-md border border-border/30 rounded-full px-6 py-3 hover:border-border/50 transition-all duration-300 group">
            <div className="flex -space-x-2">
              {barAvatars.map((av, i) => <img key={i} src={av} alt="" className="w-7 h-7 rounded-full object-cover ring-2 ring-background" loading="lazy" />)}
            </div>
            <span className="text-sm text-foreground/70 font-medium">+200 empresas confían en CALLA</span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
              {expanded ? "Ver menos" : "Ver más"}
              <svg className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Case Studies — ALWAYS visible, ALL 9, never collapsed */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}>
          <div className="bg-card/40 rounded-2xl border border-border/30 p-5 md:p-10 relative overflow-hidden">
            <div className="absolute -bottom-4 right-8 hidden md:block"><img src={agentSupport} alt="" className="w-24 object-contain opacity-15" width={512} height={512} loading="lazy" /></div>
            <div className="flex items-center gap-2 mb-8"><TrendingUp className="h-5 w-5 text-primary" /><h3 className="font-display font-bold text-lg text-foreground">Resultados probados en +20 industrias</h3></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseStudies.map((cs, i) => (
                <motion.div key={cs.company + cs.result} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-secondary/30 rounded-xl border border-border/20 p-4 hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="h-4 w-4 text-muted-foreground/40" />
                    <span className="text-xs text-muted-foreground font-medium">{cs.company}</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground mb-1">{cs.result}</div>
                  <div className="text-sm text-foreground/70 font-medium mb-1">{cs.description}</div>
                  <div className="text-xs text-muted-foreground mb-1">{cs.metric}</div>
                  <div className="text-xs text-muted-foreground/60 italic">{cs.detail}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-border/20 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />Datos verificados</span>
              <span className="flex items-center gap-1.5"><ArrowRight className="h-3 w-3 text-primary" />Campañas gestionadas por Guillermo y equipo</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
