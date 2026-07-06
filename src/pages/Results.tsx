import { useState, useEffect, lazy, Suspense } from "react";
import avatarMiguel from "@/assets/avatars/miguel-santos.webp";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Quote, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { TrustpilotStars } from "@/components/TrustpilotStars";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import SectionFade from "@/components/SectionFade";
const CampaignResults = lazy(() => import("@/components/CampaignResults"));
const CallPlayer = lazy(() => import("@/components/CallPlayer"));

import { testimonials } from "@/data/testimonials";




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
      <section className="pt-28 sm:pt-32 pb-8 md:pb-10 px-5 md:px-6">
        <div className="container mx-auto text-center">
          <SectionFade>
            <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
              Casos reales
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-5 tracking-tight text-foreground">
              Resultados <span className="text-gradient">probados</span>
            </h1>
            <p className="text-foreground/85 max-w-2xl mx-auto text-lg md:text-xl font-normal">
              Empresas de más de 20 sectores confían en CALLA para gestionar sus comunicaciones.
            </p>
          </SectionFade>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* Caso real destacado — Edommo */}
      <section className="py-12 md:py-16 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <SectionFade>
            <div className="grid md:grid-cols-5 gap-4 md:gap-5">

              {/* Tarjeta caso — cita grande */}
              <div className="md:col-span-3 bg-card/40 border border-border/30 rounded-3xl p-8 md:p-10 flex flex-col hover:border-border/50 transition-colors duration-500 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-teal/[0.05] blur-[80px] pointer-events-none" />
                <p className="text-[11px] font-display font-semibold tracking-[0.28em] uppercase text-white mb-6">
                  Caso real · Edommo Energía
                </p>
                <blockquote className="font-display text-xl md:text-2xl font-semibold text-foreground leading-snug tracking-tight mb-8 flex-1">
                  &ldquo;CALLA unificó todo: atiende, deriva a la sede correcta y agenda.&rdquo;
                </blockquote>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <img src={avatarMiguel} alt="Miguel Santos" className="w-11 h-11 rounded-full object-cover ring-1 ring-border/30" loading="lazy" />
                    <div>
                      <div className="text-base font-medium text-foreground">Miguel Santos</div>
                      <div className="text-sm text-foreground/70">Director de Operaciones</div>
                    </div>
                  </div>
                  <Link
                    to="/caso/edommo"
                    className="inline-flex items-center gap-2 text-sm font-display font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Ver caso completo <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Tarjeta métricas — números grandes */}
              <div className="md:col-span-2 bg-card/40 border border-border/30 rounded-3xl p-8 md:p-10 flex flex-col justify-between gap-6 hover:border-border/50 transition-colors duration-500">
                {[
                  { value: "3", label: "sedes unificadas" },
                  { value: "200", label: "llamadas gestionadas al día" },
                  { value: "2", label: "puestos de recepción ahorrados" },
                ].map((m, i) => (
                  <div key={m.label} className={i > 0 ? "pt-6 border-t border-border/20" : ""}>
                    <div className="font-display text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-none mb-1.5">{m.value}</div>
                    <div className="text-sm text-foreground/70">{m.label}</div>
                  </div>
                ))}
              </div>

            </div>
          </SectionFade>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* Campaign Results Dashboard */}
      <Suspense fallback={<div className="py-20 text-center text-foreground/70">Cargando resultados...</div>}>
        <CampaignResults />
      </Suspense>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* Call Recordings */}
      <div className="bg-white/[0.03]">
        <Suspense fallback={<div className="py-20 text-center text-foreground/70">Cargando llamadas...</div>}>
          <CallPlayer onContact={() => setContactOpen(true)} />
        </Suspense>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />


      {/* Testimonials */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto">
          <SectionFade>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 tracking-tight text-foreground">
                Lo que dicen <span className="text-gradient">nuestros clientes</span>
              </h2>
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
                    <blockquote className="text-base text-foreground/90 leading-relaxed mb-5 flex-1 font-normal">
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
                        <div className="text-base font-medium text-foreground leading-snug">{t.name}</div>
                        <div className="text-sm text-foreground/75 leading-snug line-clamp-2">{t.role}, {t.company}</div>
                      </div>
                      <span className="text-[11px] uppercase tracking-wider text-foreground/75 bg-secondary/40 px-2 py-0.5 rounded-full shrink-0">{t.context}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Expand/Collapse */}
          <div className="flex justify-center mb-16">
            <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-3 bg-card/80 backdrop-blur-md border border-border/30 rounded-full px-6 py-3 hover:border-border/50 transition-all duration-300">
              <span className="text-sm text-foreground/70 font-medium">Empresas de toda España confían en CALLA</span>
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


      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* CTA */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto text-center">
          <SectionFade>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-5 tracking-tight text-foreground">
              ¿Listo para obtener <span className="text-gradient">estos resultados?</span>
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto text-base md:text-lg font-normal mb-8">
              Agenda una demo y descubre cómo CALLA puede transformar las comunicaciones de tu empresa.
            </p>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity"
            >
              Solicitar información
              <ArrowRight className="w-4 h-4" />
            </button>
          </SectionFade>
        </div>
      </section>

      <Footer onContact={() => setContactOpen(true)} />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="resultados" />
    </div>
  );
};

export default Results;
