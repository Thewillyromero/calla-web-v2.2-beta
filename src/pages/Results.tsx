import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Quote, ArrowRight, TrendingUp, Building2, CheckCircle2, ShieldCheck } from "lucide-react";
import { TrustpilotStars } from "@/components/TrustpilotStars";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import SectionFade from "@/components/SectionFade";
import SocialProof from "@/components/SocialProof";
import LogoMarquee from "@/components/LogoMarquee";
import { BOOKING_URL } from "@/lib/constants";

const CampaignResults = lazy(() => import("@/components/CampaignResults"));
const CallPlayer = lazy(() => import("@/components/CallPlayer"));
const Stats = lazy(() => import("@/components/Stats"));

import { testimonials } from "@/data/testimonials";


const caseStudies = [
  { company: "Cl\u00ednica Dental", result: "5.000\u20AC", description: "en ventas primera semana", metric: "25 leads a 30\u20AC/lead", detail: "ROI positivo desde la primera semana" },
  { company: "Startup M\u00e9dica", result: "400K\u20AC", description: "en capital captado", metric: "Inversores a <15\u20AC/lead", detail: "Estrategia de pre-framing y retargeting" },
  { company: "Empresa de Fontaner\u00eda", result: "7.200\u20AC", description: "en ventas en 14 d\u00edas", metric: "Leads a 6\u20AC \u00b7 Citas a 26\u20AC", detail: "Posicionamiento en cuidado preventivo" },
  { company: "Empresa de Suelos", result: "18K\u20AC", description: "en ventas el primer mes", metric: "Presupuestos a 10,53\u20AC", detail: "Leads desde 0,93\u20AC" },
  { company: "Agente Inmobiliario", result: "17-25\u20AC", description: "por lead cualificado", metric: "Evaluaciones agendadas", detail: "Vendedores interesados cualificados" },
  { company: "Agencia de Marketing", result: "+25K\u20AC/mes", description: "en ingresos recurrentes", metric: "En solo 45 d\u00edas", detail: "Estrategia integral: voz + captaci\u00f3n" },
  { company: "Programa Formativo", result: "48K\u20AC", description: "en ventas primera semana", metric: "Leads a <3\u20AC", detail: "Llamadas autom\u00e1ticas + campa\u00f1a digital" },
  { company: "Empresa Solar", result: "<10\u20AC/lead", description: "cualificados con cita", metric: "Citas a <50\u20AC", detail: "Leads consistentes bajo coste" },
  { company: "Ecommerce Cosm\u00e9tica", result: "Sold out", description: "primer mes de campa\u00f1a", metric: "Leads a 7,12\u20AC", detail: "Voz IA + marketing integrado" },
];

const stats = [
  { value: "2M+", label: "Llamadas gestionadas" },
  { value: "5M+", label: "Usuarios finales" },
  { value: "4.9/5", label: "Valoración media" },
  { value: "3 años", label: "En el mercado" },
];

const avatarGradients = [
  "from-brand-teal/40 to-brand-emerald/30",
  "from-brand-lavender/40 to-primary/30",
  "from-brand-rose/40 to-brand-amber/30",
  "from-brand-amber/40 to-brand-teal/30",
  "from-brand-emerald/40 to-brand-lavender/30",
  "from-primary/40 to-brand-rose/30",
];

const Results = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const visibleTestimonials = expanded ? testimonials : testimonials.slice(0, 6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onContact={() => setContactOpen(true)} />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 md:pb-20 px-5 md:px-6">
        <div className="container mx-auto text-center">
          <SectionFade>
            <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
              Casos reales
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-5 tracking-tight text-foreground">
              Resultados probados
            </h1>
            <p className="text-foreground/80 max-w-2xl mx-auto text-base md:text-lg font-light">
              Más de 200 empresas en +20 industrias confían en CALLA para gestionar sus comunicaciones.
            </p>
          </SectionFade>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Logo Marquee */}
      <LogoMarquee />

      {/* Animated Stats */}
      <Suspense fallback={<div className="py-20 text-center text-foreground/50">Cargando estadísticas...</div>}>
        <Stats />
      </Suspense>

      {/* Campaign Results Dashboard */}
      <Suspense fallback={<div className="py-20 text-center text-foreground/50">Cargando resultados...</div>}>
        <CampaignResults />
      </Suspense>

      {/* Call Recordings */}
      <Suspense fallback={<div className="py-20 text-center text-foreground/50">Cargando llamadas...</div>}>
        <CallPlayer />
      </Suspense>

      {/* Stats — simplified 4 numbers */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto">
          <SectionFade>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-foreground">
                    {s.value}
                  </div>
                  <p className="text-sm text-foreground/60 mt-2 font-light">{s.label}</p>
                </div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto">
          <SectionFade>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 tracking-tight text-foreground">
                Lo que dicen nuestros clientes
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-4 mt-6">
                {[{ label: "Google Reviews", rating: 4.9 }, { label: "Trustpilot", rating: 4.8 }, { label: "Clutch.co", rating: 5.0 }].map((b) => (
                  <div key={b.label} className="bg-card/50 rounded-xl border border-border/30 px-3.5 md:px-5 py-2.5 md:py-3 flex items-center gap-2.5 md:gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-foreground">{b.rating}</span>
                        <TrustpilotStars rating={b.rating} size={14} />
                      </div>
                      <span className="text-[10px] text-foreground/50">{b.label}</span>
                    </div>
                  </div>
                ))}
                <div className="bg-card/50 rounded-xl border border-border/30 px-3.5 md:px-5 py-2.5 md:py-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" style={{ color: '#00b67a' }} />
                  <div>
                    <span className="text-xs font-semibold text-foreground block leading-tight">Verificado</span>
                    <span className="text-[10px] text-foreground/50">Opiniones reales</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionFade>

          {/* Testimonials Grid */}
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
                  <div className="bg-card/40 rounded-2xl border border-border/30 p-6 hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
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
                        <div className="text-xs text-foreground/50 truncate">{t.role}, {t.company}</div>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-foreground/30 bg-secondary/40 px-2 py-0.5 rounded-full shrink-0">{t.context}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Expand/Collapse */}
          <div className="flex justify-center mb-16">
            <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-3 bg-card/80 backdrop-blur-md border border-border/30 rounded-full px-6 py-3 hover:border-border/50 transition-all duration-300">
              <span className="text-sm text-foreground/70 font-medium">+200 empresas confían en CALLA</span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors">
                {expanded ? "Ver menos" : "Ver más"}
                <svg className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto">
          <SectionFade>
            <div className="bg-card/40 rounded-2xl border border-border/30 p-5 md:p-10">
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-display font-bold text-lg text-foreground">Resultados probados en +20 industrias</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {caseStudies.map((cs, i) => (
                  <motion.div key={cs.company + cs.result} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-secondary/30 rounded-xl border border-border/20 p-4 hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="h-4 w-4 text-foreground/30" />
                      <span className="text-xs text-foreground/60 font-medium">{cs.company}</span>
                    </div>
                    <div className="text-2xl font-display font-bold text-foreground mb-1">{cs.result}</div>
                    <div className="text-sm text-foreground/70 font-medium mb-1">{cs.description}</div>
                    <div className="text-xs text-foreground/50 mb-1">{cs.metric}</div>
                    <div className="text-[10px] text-foreground/30 italic">{cs.detail}</div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-border/20 flex flex-wrap items-center gap-6 text-sm text-foreground/60">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />Datos verificados</span>
                <span className="flex items-center gap-1.5"><ArrowRight className="h-3 w-3 text-primary" />Campañas gestionadas por Guillermo y equipo</span>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto text-center">
          <SectionFade>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-5 tracking-tight text-foreground">
              ¿Listo para obtener estos resultados?
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto text-base md:text-lg font-light mb-8">
              Agenda una demo y descubre cómo CALLA puede transformar las comunicaciones de tu empresa.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity"
            >
              Solicitar demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </SectionFade>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="resultados" />
    </div>
  );
};

export default Results;
