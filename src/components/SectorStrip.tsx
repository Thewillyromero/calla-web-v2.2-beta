import { memo } from "react";
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

const SectorItem = ({ slug, label }: (typeof sectors)[number]) => (
  <span className="marquee-item !px-0 flex items-center">
    <Link
      to={`/sectores/${slug}`}
      className="font-display text-xl md:text-2xl font-semibold tracking-tight text-foreground/30 hover:text-foreground/90 transition-colors duration-500 whitespace-nowrap px-8 md:px-10"
    >
      {label}
    </Link>
    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-foreground/15 shrink-0" />
  </span>
);

const SectorStrip = memo(() => (
  <section className="border-y border-white/[0.04] overflow-hidden relative py-10 md:py-14">
    <p className="text-center text-[11px] sm:text-xs font-display font-semibold tracking-[0.28em] uppercase text-white mb-8 md:mb-10">
      Especialistas en tu sector
    </p>
    <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

    <div className="marquee-container">
      <div className="marquee-track" style={{ animationDuration: "55s" }}>
        {sectors.map((s) => (
          <SectorItem key={`a-${s.slug}`} {...s} />
        ))}
        <div aria-hidden="true" className="contents">
          {sectors.map((s) => (
            <SectorItem key={`b-${s.slug}`} {...s} />
          ))}
        </div>
      </div>
    </div>
  </section>
));

SectorStrip.displayName = "SectorStrip";
export default SectorStrip;
