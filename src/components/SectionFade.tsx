import { memo } from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const SectionFade = memo(({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
));

SectionFade.displayName = "SectionFade";

export default SectionFade;
