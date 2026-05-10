import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Server, CheckCircle2, ArrowRight, Globe, ShieldCheck, Database, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import { BOOKING_URL } from "@/lib/constants";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const badges = [
  { icon: ShieldCheck, title: "RGPD Compliant", subtitle: "Cumplimiento total" },
  { icon: Lock, title: "SSL Encryption", subtitle: "Cifrado extremo a extremo" },
  { icon: Globe, title: "European Servers", subtitle: "Frankfurt, Alemania" },
  { icon: Shield, title: "ISO 27001", subtitle: "En proceso" },
];

const Security = () => {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => setContactOpen(true)} />

      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-16 md:pb-24 px-5 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-teal/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-brand-lavender/[0.04] blur-[100px]" />

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs font-display font-semibold text-primary tracking-wide uppercase">Seguridad</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6 tracking-tight leading-[1.08]">
              Tu seguridad es nuestra{" "}
              <span className="text-gradient">prioridad</span>
            </h1>
            <p className="text-foreground/70 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              Protegemos los datos de tu empresa y de tus clientes con los m&aacute;s altos est&aacute;ndares europeos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* RGPD Compliance */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card/40 rounded-2xl border border-border/30 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground tracking-tight">
                    Cumplimiento RGPD
                  </h2>
                </div>
              </div>
              <p className="text-lg text-foreground/80 font-light leading-relaxed mb-6">
                Cumplimos con el Reglamento General de Protecci&oacute;n de Datos (RGPD) en todos nuestros procesos.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-secondary/30 rounded-xl p-4 border border-border/20">
                  <CheckCircle2 className="h-5 w-5 text-brand-emerald mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Servidores europeos</p>
                    <p className="text-sm text-foreground/60 font-light">Todos los datos se procesan y almacenan en servidores ubicados en Europa.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-secondary/30 rounded-xl p-4 border border-border/20">
                  <CheckCircle2 className="h-5 w-5 text-brand-emerald mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">DPA disponible</p>
                    <p className="text-sm text-foreground/60 font-light">Acuerdo de procesamiento de datos (Data Processing Agreement) disponible para clientes enterprise.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call Security */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-foreground tracking-tight mb-3">
                Seguridad en las llamadas
              </h2>
              <p className="text-foreground/60 font-light max-w-xl mx-auto">
                Cada llamada gestionada por CALLA est&aacute; protegida de principio a fin.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              <div className="bg-card/40 rounded-2xl border border-border/30 p-6 text-center hover:border-primary/20 hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-base font-display font-bold text-foreground mb-2">Encriptaci&oacute;n total</h3>
                <p className="text-sm text-foreground/60 font-light leading-relaxed">
                  Grabaciones encriptadas en reposo y en tr&aacute;nsito.
                </p>
              </div>

              <div className="bg-card/40 rounded-2xl border border-border/30 p-6 text-center hover:border-primary/20 hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-base font-display font-bold text-foreground mb-2">Acceso por roles</h3>
                <p className="text-sm text-foreground/60 font-light leading-relaxed">
                  Acceso restringido por roles &mdash; solo tu equipo autorizado.
                </p>
              </div>

              <div className="bg-card/40 rounded-2xl border border-border/30 p-6 text-center hover:border-primary/20 hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Database className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-base font-display font-bold text-foreground mb-2">Retenci&oacute;n configurable</h3>
                <p className="text-sm text-foreground/60 font-light leading-relaxed">
                  T&uacute; decides cu&aacute;nto tiempo se guardan las grabaciones.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-card/40 rounded-2xl border border-border/30 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground tracking-tight">
                  Infraestructura
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { text: "Servidores en Europa (Oracle Cloud, regi\u00F3n Frankfurt)", icon: Globe },
                  { text: "SSL/TLS en todas las comunicaciones", icon: Lock },
                  { text: "Backups diarios automatizados", icon: Database },
                  { text: "Monitorizaci\u00F3n 24/7", icon: Eye },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-3 bg-secondary/30 rounded-xl p-4 border border-border/20">
                      <Icon className="h-5 w-5 text-primary shrink-0" />
                      <p className="text-sm font-medium text-foreground">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications / Badges */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-foreground tracking-tight mb-3">
                Certificaciones y garant&iacute;as
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.title}
                    className="glass rounded-2xl border border-border/30 p-6 text-center hover:border-primary/20 hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-sm font-display font-bold text-foreground mb-1">{badge.title}</h3>
                    <p className="text-xs text-foreground/50 font-light">{badge.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="h-10 w-10 text-primary mx-auto mb-5" />
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-5 tracking-tight text-foreground">
              &iquest;Tienes preguntas sobre seguridad?
            </h2>
            <p className="text-foreground/70 max-w-xl mx-auto text-base md:text-lg font-light mb-8">
              Nuestro equipo est&aacute; disponible para resolver cualquier duda sobre protecci&oacute;n de datos y cumplimiento normativo.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Hablar con un experto
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="seguridad" />
    </div>
  );
};

export default Security;
