import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://appcalla.com";

const SECTOR_NAMES: Record<string, string> = {
  automocion: "Automoción",
  educacion: "Educación",
  energia: "Energía",
  hosteleria: "Hostelería",
  inmobiliaria: "Inmobiliaria",
  legal: "Legal",
  logistica: "Logística",
  rrhh: "RRHH",
  salud: "Salud",
  seguros: "Seguros",
  servicios: "Servicios",
  turismo: "Turismo",
};

const TITLES: Record<string, string> = {
  "/": "CALLA — Atención telefónica automatizada con IA",
  "/precios": "Precios y planes — CALLA",
  "/resultados": "Resultados y casos reales — CALLA",
  "/aria": "ARIA, recepcionista IA 24/7 — CALLA",
  "/nova": "NOVA, agente comercial IA — CALLA",
  "/lumi": "LUMI, coordinador de citas IA — CALLA",
  "/byte": "BYTE, analítica de llamadas IA — CALLA",
  "/care": "CARE, posventa y fidelización IA — CALLA",
  "/equipo": "HALO, tu equipo de agentes IA — CALLA",
  "/preguntas": "Preguntas frecuentes — CALLA",
  "/seguridad": "Seguridad y RGPD — CALLA",
  "/legal": "Información legal — CALLA",
  "/blog": "Blog — CALLA",
  "/caso/edommo": "Caso de éxito: Edommo Energía — CALLA",
};

// Descripciones por página (la home mantiene la del index.html; aquí solo el resto).
const DESCRIPTIONS: Record<string, string> = {
  "/precios": "Planes de CALLA para automatizar la atención telefónica de tu empresa con agentes de IA. Sin permanencia. Solicita una demo personalizada.",
  "/resultados": "Casos reales y resultados de empresas que usan CALLA para no perder llamadas, agendar citas y atender a sus clientes 24/7.",
  "/aria": "ARIA, la recepcionista con IA de CALLA: atiende tus llamadas, informa y agenda citas 24/7, sin llamadas perdidas.",
  "/nova": "NOVA, el agente comercial con IA de CALLA: contacta con tus clientes, cualifica y agenda para tu equipo de ventas.",
  "/lumi": "LUMI, el coordinador de citas con IA de CALLA: gestiona tu agenda, confirma y reduce las ausencias.",
  "/byte": "BYTE, la analítica con IA de CALLA: motivos de llamada, resultados y métricas claras de tu atención telefónica.",
  "/care": "CARE, la posventa con IA de CALLA: seguimiento tras la venta, fidelización y detección de clientes en riesgo.",
  "/equipo": "HALO coordina el equipo de agentes de IA de CALLA (ARIA, NOVA, LUMI, BYTE, CARE) para cubrir toda tu comunicación.",
  "/preguntas": "Resolvemos las dudas más frecuentes sobre CALLA: cómo funciona, precios, seguridad, integración y puesta en marcha.",
  "/seguridad": "Cómo protege CALLA los datos de tu empresa y de tus clientes: cifrado, cumplimiento RGPD y transparencia.",
  "/legal": "Aviso legal, política de privacidad y política de cookies de App Calla, S.L. (appcalla.com).",
  "/blog": "Blog de CALLA: ideas y guías sobre atención telefónica, agentes de voz con IA y automatización para empresas.",
  "/caso/edommo": "Cómo Edommo Energía unificó la atención de sus 3 sedes con CALLA y ahorró 2 puestos de recepción.",
};

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", "canonical"); document.head.appendChild(el); }
  el.setAttribute("href", href);
}

const TitleManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Título
    let title = TITLES[pathname];
    if (!title && pathname.startsWith("/sectores/")) {
      const name = SECTOR_NAMES[pathname.split("/")[2] ?? ""];
      title = name ? `CALLA para ${name} — agentes IA` : undefined;
    }
    if (!title && pathname.startsWith("/blog/")) title = "Blog — CALLA";
    document.title = title ?? "Página no encontrada — CALLA";

    // Canonical por página (la home queda como raíz)
    setCanonical(`${SITE}${pathname === "/" ? "" : pathname}`);

    // Descripción por página (la home mantiene la estática del index.html)
    let desc = DESCRIPTIONS[pathname];
    if (!desc && pathname.startsWith("/sectores/")) {
      const name = SECTOR_NAMES[pathname.split("/")[2] ?? ""];
      if (name) desc = `CALLA para el sector ${name.toLowerCase()}: agentes de IA que atienden llamadas, agendan citas y no pierden clientes. Solicita una demo.`;
    }
    if (desc) setMeta("description", desc);
  }, [pathname]);

  return null;
};

export default TitleManager;
