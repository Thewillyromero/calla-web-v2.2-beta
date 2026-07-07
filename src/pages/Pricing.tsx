import { useState, useEffect, lazy, Suspense } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap, Crown, Building2 } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

const ROICalculator = lazy(() => import("@/components/ROICalculator"));

const tiers = [
  {
    name: "Starter",
    icon: Zap,
    price: "299",
    annualDiscount: 15,
    setupNote: "Puesta en marcha · presupuesto a medida",
    period: "/mes",
    description: "Para pequeños negocios que quieren atender cada llamada y olvidarse de tareas repetitivas.",
    accent: "brand-teal",
    accentClass: "text-brand-teal",
    hsl: "190 60% 55%",
    badge: null,
    features: [
      "1 agente de IA (llamadas entrantes)",
      "Hasta 200 llamadas/mes",
      "Agenda de citas automática",
      "Horario personalizado",
      "Transcripción de llamadas",
      "Soporte por email",
      "Panel de métricas básico",
    ],
    cta: "Solicitar demo",
    popular: false,
    paymentLinks: {
      monthly: "https://buy.stripe.com/28E5kD9ZR0Mwf1fa2yfEk00",
      annual: "https://buy.stripe.com/7sY7sL1tl52M7yN3EafEk02",
    },
  },
  {
    name: "Pro",
    icon: Crown,
    price: "699",
    annualDiscount: 20,
    period: "/mes",
    description: "Para empresas que necesitan inbound + outbound, analítica avanzada y automatizaciones.",
    accent: "brand-lavender",
    accentClass: "text-brand-lavender",
    hsl: "260 50% 65%",
    badge: "Más popular",
    setupNote: "Puesta en marcha · presupuesto a medida",
    features: [
      "Agentes de IA (entrantes y salientes)",
      "Hasta 750 llamadas/mes",
      "CRM integrado",
      "Analítica avanzada con BYTE",
      "Soporte prioritario",
      "Personalización de voz y tono",
      "Webhook e integraciones API",
      "Campañas outbound automatizadas (opcional)",
    ],
    cta: "Solicitar demo",
    popular: true,
    paymentLinks: {
      monthly: "https://buy.stripe.com/3cI7sL1tlfHq6uJ2A6fEk01",
      annual: "https://buy.stripe.com/28E5kD2xpcve7yN1w2fEk03",
    },
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Custom",
    annualDiscount: 0,
    period: "",
    description: "Solución a medida para grandes volúmenes y necesidades específicas.",
    accent: "brand-amber",
    accentClass: "text-brand-amber",
    hsl: "35 70% 58%",
    badge: null,
    features: [
      "Agentes IA a medida",
      "Llamadas ilimitadas",
      "Squad completo personalizado",
      "Puesta en marcha acompañada",
      "Disponibilidad objetivo del 99%",
      "Gestor de cuenta dedicado",
      "Integraciones a medida",
      "Multilingüe y multisede",
      "Facturación personalizada",
    ],
    cta: "Contacta con el equipo",
    popular: false,
    paymentLinks: null,
  },
];

const faqs = [
  { q: "¿Puedo cambiar de plan en cualquier momento?", a: "Sí, puedes subir o bajar de plan cuando quieras. Los cambios se aplican en el siguiente ciclo de facturación." },
  { q: "¿Qué pasa si supero el límite de llamadas?", a: "Te avisamos antes de llegar al límite. Las llamadas extra se facturan a tarifa reducida, sin cortes de servicio." },
  { q: "¿Hay periodo de permanencia?", a: "No. Todos los planes son mensuales sin permanencia. Cancela cuando quieras avisando con 30 días de antelación." },
  { q: "¿Cuánto tarda la puesta en marcha?", a: "Tu agente queda operativo en la primera semana: lo configuramos por ti y lo validamos con más de 50 llamadas de prueba supervisadas antes de arrancar." },
];

const cardVariants = (i: number) => ({
  hidden: { opacity: 0, y: 40, x: i === 0 ? -30 : i === 2 ? 30 : 0 },
  visible: {
    opacity: 1, y: 0, x: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  },
});


const Pricing = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [variant, setVariant] = useState<"demo" | "enterprise" | "roi">("demo");
  const openForm = (v: "demo" | "enterprise" | "roi") => { setVariant(v); setContactOpen(true); };
  const [annual, setAnnual] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const tryScroll = (attempt = 0) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else if (attempt < 20) setTimeout(() => tryScroll(attempt + 1), 100);
      };
      tryScroll();
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => openForm("demo")} />

      {/* ── Calculadora ── */}
      <section className="pt-28 sm:pt-32 pb-16 md:pb-20 px-5 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-lavender/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-brand-teal/[0.04] blur-[100px]" />
        <div className="container mx-auto relative z-10">
          <div id="calculadora" className="scroll-mt-24">
            <Suspense fallback={<div className="py-20 text-center text-foreground/70">Cargando calculadora...</div>}>
              <ROICalculator onContact={() => openForm("roi")} />
            </Suspense>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Planes ── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto">
          {/* Title + toggle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-5 tracking-tight leading-[1.1]">
              Elige tu <span className="text-gradient">plan perfecto</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg font-normal">
              Sin permanencia. Sin sorpresas. Escala cuando lo necesites.
            </p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-sm font-medium transition-colors ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Mensual</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${annual ? "bg-primary" : "bg-secondary"}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-foreground transition-transform duration-300 ${annual ? "translate-x-7" : "translate-x-0"}`} />
              </button>
              <span className={`text-sm font-medium transition-colors ${annual ? "text-foreground" : "text-muted-foreground"}`}>Anual</span>
              {annual && (
                <span className="text-xs font-bold text-brand-emerald bg-brand-emerald/10 px-2 py-0.5 rounded-full">Hasta -20%</span>
              )}
            </div>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto items-stretch pt-10">
            {tiers.map((tier, i) => {
              const discount = "annualDiscount" in tier ? (tier.annualDiscount as number) : 20;
              const rawPrice = tier.price === "Custom" ? "Custom" : annual ? Math.round(parseInt(tier.price) * (1 - discount / 100)) : parseInt(tier.price);
              const displayPrice = rawPrice === "Custom" ? "Custom" : Math.round(rawPrice as number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

              return (
                <motion.div
                  key={tier.name}
                  variants={cardVariants(i)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-60px" }}
                  className="relative h-full"
                  whileHover={{
                    y: -10,
                    filter: `drop-shadow(0 20px 32px hsl(${tier.hsl} / 0.22)) drop-shadow(0 6px 12px rgba(0,0,0,0.30))`,
                    transition: { duration: 0.22, ease: "easeOut" },
                  }}
                  whileTap={{ y: -4 }}
                >
                  {/* Badge FUERA del glow-border para que overflow:hidden no lo corte */}
                  {tier.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <span className="bg-gradient-to-r from-brand-lavender to-brand-rose text-primary-foreground text-[11px] font-bold rounded-full shadow-lg whitespace-nowrap inline-block leading-none px-5 py-2">
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  <div
                    className={`rounded-2xl h-full flex flex-col transition-all duration-500 ${
                      tier.popular
                        ? "glass-warm glow-border pt-8 px-5 sm:px-6 lg:px-8 pb-5 sm:pb-6 lg:pb-8"
                        : "glass p-5 sm:p-6 lg:p-8"
                    }`}
                    style={{
                      border: `1px solid hsl(${tier.hsl} / 0.4)`,
                      boxShadow: tier.popular
                        ? `0 0 50px hsl(${tier.hsl} / 0.12)`
                        : undefined,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `hsl(${tier.hsl} / 0.12)`, border: `1px solid hsl(${tier.hsl} / 0.25)` }}>
                        <tier.icon className="h-5 w-5" style={{ color: `hsl(${tier.hsl})` }} />
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">{tier.name}</h3>
                    </div>

                    <div className="mb-4">
                      {"setupNote" in tier && tier.setupNote ? (
                        <div className="flex flex-col gap-2">
                          {/* Paso 1 — Setup */}
                          <div className="rounded-xl p-3" style={{ border: `1px solid hsl(${tier.hsl} / 0.25)`, background: `hsl(${tier.hsl} / 0.06)` }}>
                            <span className="text-[11px] font-bold uppercase tracking-widest block mb-0.5" style={{ color: `hsl(${tier.hsl})` }}>Puesta en marcha</span>
                            <span className="text-sm font-semibold text-foreground">Presupuesto a medida</span>
                          </div>
                          {/* Separador */}
                          <div className="flex justify-center text-lg font-bold leading-none select-none" style={{ color: `hsl(${tier.hsl})` }}>+</div>
                          {/* Paso 2 — Cuota mensual */}
                          <div className="rounded-xl p-3" style={{ border: `1px solid hsl(${tier.hsl} / 0.25)`, background: `hsl(${tier.hsl} / 0.06)` }}>
                            <span className="text-[11px] font-bold uppercase tracking-widest block mb-0.5" style={{ color: `hsl(${tier.hsl})` }}>Cuota mensual</span>
                            {displayPrice === "Custom" ? (
                              <span className="text-2xl sm:text-3xl font-display font-extrabold text-gradient">A medida</span>
                            ) : (
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">{displayPrice} €</span>
                                <span className="text-muted-foreground text-sm">{tier.period}</span>
                                {annual && discount > 0 && (
                                  <span className="text-xs font-bold text-brand-emerald bg-brand-emerald/10 px-1.5 py-0.5 rounded-full">-{discount}%</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : displayPrice === "Custom" ? (
                        <span
                          className="text-3xl sm:text-4xl font-display font-extrabold bg-clip-text text-transparent whitespace-nowrap"
                          style={{
                            backgroundImage: "linear-gradient(135deg, hsl(35 90% 52%), hsl(45 100% 70%), hsl(30 85% 55%))",
                            textShadow: "none",
                            WebkitTextStroke: "0",
                            filter: `drop-shadow(0 0 10px hsl(40 80% 55% / 0.4))`,
                          }}
                        >
                          A medida
                        </span>
                      ) : (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-foreground">{displayPrice} €</span>
                          <span className="text-muted-foreground text-sm">{tier.period}</span>
                          {annual && discount > 0 && (
                            <span className="text-xs font-bold text-brand-emerald bg-brand-emerald/10 px-1.5 py-0.5 rounded-full ml-1">-{discount}%</span>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-foreground/85 mb-5 sm:mb-6 font-normal leading-relaxed">{tier.description}</p>

                    <Button
                      size="lg"
                      className="w-full mb-5 sm:mb-6 text-sm sm:text-base rounded-xl transition-all duration-200"
                      variant="outline"
                      onMouseEnter={() => setHoveredBtn(i)}
                      onMouseLeave={() => setHoveredBtn(null)}
                      style={hoveredBtn === i ? {
                        backgroundColor: `hsl(${tier.hsl} / 0.12)`,
                        borderColor: `hsl(${tier.hsl} / 0.6)`,
                        color: `hsl(${tier.hsl})`,
                      } : {}}
                      onClick={() => openForm(tier.cta === "Contacta con el equipo" ? "enterprise" : "demo")}
                    >
                      {tier.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <ul className="space-y-2.5 sm:space-y-3 flex-1">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 sm:gap-3 text-sm">
                          <Check className={`h-4 w-4 mt-0.5 shrink-0 ${tier.accentClass}`} />
                          <span className="text-foreground/90 text-[13px] sm:text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-display font-extrabold text-center mb-8 md:mb-10 tracking-tight"
          >
            Preguntas <span className="text-gradient">frecuentes</span>
          </motion.h2>
          <div className="space-y-3 sm:space-y-4">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`pricing-faq-${i}`}
                  className="bg-card/40 rounded-2xl border border-border/30 px-6 hover:border-primary/20 transition-colors duration-300 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-5 text-[15px]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 font-normal leading-relaxed pb-5 text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer onContact={() => openForm("demo")} />
      <ContactFormDialog
        open={contactOpen} onOpenChange={setContactOpen}
        source={variant === "enterprise" ? "pricing-enterprise" : variant === "roi" ? "pricing-roi" : "pricing"}
        {...(variant === "enterprise" ? { title: <>Una solución a tu <span className="text-gradient-blue">medida</span></>, description: "Diseñamos una solución personalizada para tu empresa.", submitLabel: "Hablar con el equipo" }
           : variant === "roi" ? { title: <>Tu propuesta <span className="text-gradient-blue">personalizada</span></>, description: "Preparamos un cálculo de ahorro real para tu empresa.", submitLabel: "Solicitar propuesta" }
           : {})}
      />
    </div>
  );
};

export default Pricing;
