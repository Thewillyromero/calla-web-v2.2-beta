import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const sectors = [
  { slug: "automocion", label: "Automoción" },
  { slug: "salud", label: "Salud" },
  { slug: "inmobiliaria", label: "Inmobiliaria" },
  { slug: "hosteleria", label: "Hostelería" },
  { slug: "legal", label: "Legal" },
  { slug: "energia", label: "Energía" },
  { slug: "logistica", label: "Logística" },
  { slug: "seguros", label: "Seguros" },
  { slug: "educacion", label: "Educación" },
  { slug: "turismo", label: "Turismo" },
  { slug: "rrhh", label: "RRHH" },
  { slug: "servicios", label: "Servicios" },
];

const SectorStrip = () => (
  <section className="py-12 md:py-16 px-5 md:px-6">
    <div className="container mx-auto max-w-4xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-sm text-muted-foreground mb-6"
      >
        Soluciones adaptadas a tu sector
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-2.5"
      >
        {sectors.map((s) => (
          <Link
            key={s.slug}
            to={`/sectores/${s.slug}`}
            className="bg-card/50 border border-border/30 rounded-full px-4 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:border-border/60 transition-colors"
          >
            {s.label}
          </Link>
        ))}
      </motion.div>
    </div>
  </section>
);

export default SectorStrip;
