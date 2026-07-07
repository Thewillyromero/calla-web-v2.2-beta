import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import SectionFade from "@/components/SectionFade";
import { BOOKING_URL } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqs } from "@/data/faqs";

const Questions = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [variant, setVariant] = useState<"demo" | "preguntas">("demo");
  const openForm = (v: "demo" | "preguntas") => { setVariant(v); openForm("demo"); };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onContact={() => openForm("demo")} />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 md:pb-20 px-5 md:px-6">
        <div className="container mx-auto text-center">
          <SectionFade>
            <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
              FAQ
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-5 tracking-tight text-foreground">
              Preguntas <span className="text-gradient">frecuentes</span>
            </h1>
            <p className="text-foreground/80 max-w-xl mx-auto text-base md:text-lg font-normal">
              Resolvemos las dudas para impulsarte a dar el paso.
            </p>
          </SectionFade>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 md:py-20 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card/40 rounded-2xl border border-border/30 px-6 hover:border-primary/20 transition-colors duration-300 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-5 text-[15px]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 font-normal leading-relaxed pb-5 text-sm">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto text-center">
          <SectionFade>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-5 tracking-tight text-foreground">
              ¿Tienes <span className="text-gradient">más preguntas?</span>
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto text-base md:text-lg font-normal mb-8">
              Contacta con nuestro equipo y resuelve cualquier duda sobre cómo CALLA puede ayudar a tu negocio.
            </p>
            <button
              onClick={() => openForm("preguntas")}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity"
            >
              Solicitar información
              <ArrowRight className="w-4 h-4" />
            </button>
          </SectionFade>
        </div>
      </section>

      <Footer onContact={() => openForm("demo")} />
      <ContactFormDialog
        open={contactOpen} onOpenChange={setContactOpen}
        source={variant === "preguntas" ? "preguntas" : "preguntas-demo"}
        {...(variant === "preguntas" ? { title: "Estamos para ayudarte", description: "Un especialista de CALLA responderá a tus preguntas.", submitLabel: "Contactar" } : {})}
      />
    </div>
  );
};

export default Questions;
