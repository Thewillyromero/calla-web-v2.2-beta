import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { faqs } from "@/data/faqs";

const SITE = "https://appcalla.com";

const SECTOR_NAMES: Record<string, string> = {
  automocion: "Automoción", educacion: "Educación", energia: "Energía",
  hosteleria: "Hostelería", inmobiliaria: "Inmobiliaria", legal: "Legal",
  logistica: "Logística", rrhh: "RRHH", salud: "Salud", seguros: "Seguros",
  servicios: "Servicios", turismo: "Turismo",
};
const AGENTS: Record<string, string> = {
  aria: "ARIA", nova: "NOVA", lumi: "LUMI", byte: "BYTE", care: "CARE",
};
const SIMPLE: Record<string, string> = {
  precios: "Precios", resultados: "Resultados", seguridad: "Seguridad",
  preguntas: "Preguntas frecuentes", equipo: "Equipo", blog: "Blog", legal: "Legal",
};

function crumb(pathname: string): { name: string; url: string }[] | null {
  const items = [{ name: "Inicio", url: SITE + "/" }];
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return null;
  if (parts[0] === "sectores" && parts[1] && SECTOR_NAMES[parts[1]]) {
    items.push({ name: "Sectores", url: `${SITE}/sectores/${parts[1]}` });
    items.push({ name: SECTOR_NAMES[parts[1]], url: `${SITE}${pathname}` });
  } else if (AGENTS[parts[0]]) {
    items.push({ name: "Equipo", url: `${SITE}/equipo` });
    items.push({ name: AGENTS[parts[0]], url: `${SITE}${pathname}` });
  } else if (parts[0] === "blog" && parts[1]) {
    items.push({ name: "Blog", url: `${SITE}/blog` });
    items.push({ name: "Artículo", url: `${SITE}${pathname}` });
  } else if (parts[0] === "caso") {
    items.push({ name: "Resultados", url: `${SITE}/resultados` });
    items.push({ name: "Caso de éxito", url: `${SITE}${pathname}` });
  } else if (SIMPLE[parts[0]]) {
    items.push({ name: SIMPLE[parts[0]], url: `${SITE}${pathname}` });
  } else {
    return null;
  }
  return items;
}

const StructuredData = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const graph: any[] = [];

    // Breadcrumbs en páginas profundas
    const items = crumb(pathname);
    if (items && items.length > 1) {
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: it.url,
        })),
      });
    }

    // FAQPage solo en /preguntas
    if (pathname === "/preguntas") {
      graph.push({
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
    }

    const id = "route-structured-data";
    document.getElementById(id)?.remove();
    if (graph.length) {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      el.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
      document.head.appendChild(el);
    }

    return () => { document.getElementById(id)?.remove(); };
  }, [pathname]);

  return null;
};

export default StructuredData;
