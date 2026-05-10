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

const faqs = [
  {
    q: "¿Qué es CALLA y cómo funciona?",
    a: "CALLA es una plataforma de IA conversacional que atiende llamadas telefónicas, agenda citas y gestiona campañas outbound de forma autónoma. Nuestros agentes virtuales (ARIA, NOVA, LUMI, BYTE y CARE) trabajan 24/7 con voz natural, sin intervención humana.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "Menos de 30 minutos. Nuestro equipo configura tu agente IA personalizado, lo entrena con la información de tu negocio y lo deja listo para recibir o realizar llamadas desde el primer día.",
  },
  {
    q: "¿Puedo usar CALLA para llamadas entrantes y salientes?",
    a: "Sí. CALLA gestiona tanto inbound (recepción de llamadas, atención al cliente, agenda de citas) como outbound (campañas de appointment setting, seguimiento de leads, encuestas de satisfacción).",
  },
  {
    q: "¿En qué sectores funciona CALLA?",
    a: "CALLA está optimizada para más de 20 sectores: salud, legal, inmobiliario, educación, hostelería, finanzas, seguros, e-commerce y muchos más. Cada agente se adapta al vocabulario y procesos específicos de tu industria.",
  },
  {
    q: "¿Qué pasa si un cliente necesita hablar con una persona real?",
    a: "CALLA detecta automáticamente cuándo una conversación requiere intervención humana y transfiere la llamada a tu equipo en tiempo real, proporcionando un resumen del contexto para que el agente humano pueda continuar sin fricciones.",
  },
  {
    q: "¿Hay periodo de permanencia o compromiso?",
    a: "No. Todos los planes son mensuales sin permanencia. Puedes cancelar, subir o bajar de plan en cualquier momento. Los cambios se aplican en el siguiente ciclo de facturación.",
  },
  {
    q: "¿Cómo se integra CALLA con mis herramientas actuales?",
    a: "CALLA se integra con los principales CRMs, calendarios (Google Calendar, Calendly), sistemas de gestión y herramientas de comunicación mediante API y webhooks. El plan Pro y Enterprise incluyen integraciones personalizadas.",
  },
  {
    q: "¿Qué métricas puedo ver sobre las llamadas?",
    a: "BYTE, nuestro agente de analytics, ofrece métricas en tiempo real: duración de llamadas, tasa de resolución, citas agendadas, sentimiento del cliente, horas pico, y mucho más. Todo accesible desde tu panel de control.",
  },
];

const Questions = () => {
  const [contactOpen, setContactOpen] = useState(false);

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
              FAQ
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-5 tracking-tight text-foreground">
              Preguntas frecuentes
            </h1>
            <p className="text-foreground/80 max-w-xl mx-auto text-base md:text-lg font-light">
              Todo lo que necesitas saber antes de empezar con CALLA.
            </p>
          </SectionFade>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 md:py-20 px-5 md:px-6">
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
                  <AccordionContent className="text-foreground/70 font-light leading-relaxed pb-5 text-sm">
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
              ¿Tienes más preguntas?
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto text-base md:text-lg font-light mb-8">
              Habla con nuestro equipo y resuelve cualquier duda sobre cómo CALLA puede ayudar a tu negocio.
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
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="preguntas" />
    </div>
  );
};

export default Questions;
