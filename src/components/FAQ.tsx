import { motion } from "framer-motion";
import agentScheduler from "@/assets/characters/agent-scheduler.webp";
import CharacterReveal from "@/components/CharacterReveal";
import TextReveal from "@/components/TextReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqs } from "@/data/faqs";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = (i: number) => ({
  hidden: { opacity: 0, y: 15, x: i % 2 === 0 ? -25 : 25 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-28 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/10 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.03] blur-[150px] pointer-events-none" />

      {/* Large background character — LUMI with reveal */}
      <div className="absolute -left-8 bottom-10 pointer-events-none select-none">
        <CharacterReveal
          src={agentScheduler}
          alt=""
          className="w-[150px] sm:w-[200px] md:w-[320px] lg:w-[420px] opacity-[0.06] sm:opacity-[0.08] lg:opacity-[0.12]"
          glowColor="hsl(160 50% 48%)"
          revealOffset={[0.05, 0.35]}
        />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="text-center mb-14"
        >
          <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold mb-4 md:mb-5 tracking-tight text-glow">
            <TextReveal>Preguntas</TextReveal>{" "}
            <span className="text-gradient text-glow-lavender">
              <TextReveal delay={0.1}>frecuentes</TextReveal>
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg font-normal">
            Resolvemos las dudas para impulsarte a dar el paso.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={itemVariants(i)}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="bg-card/40 rounded-2xl border border-border/30 px-6 hover:border-primary/20 transition-colors duration-300 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-5 text-[15px]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 font-normal leading-relaxed pb-5 text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
