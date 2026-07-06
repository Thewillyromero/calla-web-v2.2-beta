import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://appcalla.com";
const DEFAULT_DESC = "CALLA atiende tus llamadas, agenda citas y gestiona la comunicación de tu empresa con agentes de voz IA, 24/7.";

const SECTOR_NAMES: Record<string, string> = {
  automocion: "Automoción", educacion: "Educación", energia: "Energía",
  hosteleria: "Hostelería", inmobiliaria: "Inmobiliaria", legal: "Legal",
  logistica: "Logística", rrhh: "RRHH", salud: "Salud", seguros: "Seguros",
  servicios: "Servicios", turismo: "Turismo",
};
const AGENTS = ["aria", "nova", "lumi", "byte", "care"];
const BLOG_SLUGS = ["coste-llamadas-perdidas", "asistentes-voz-ia", "clinica-dental-200-llamadas"];

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

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) { el = create(); document.head.appendChild(el); }
  el.setAttribute(attr, value);
}
const setMetaName = (name: string, content: string) =>
  upsert(`meta[name="${name}"]`, () => { const m = document.createElement("meta"); m.setAttribute("name", name); return m; }, "content", content);
const setMetaProp = (prop: string, content: string) =>
  upsert(`meta[property="${prop}"]`, () => { const m = document.createElement("meta"); m.setAttribute("property", prop); return m; }, "content", content);
const setCanonical = (href: string) =>
  upsert('link[rel="canonical"]', () => { const l = document.createElement("link"); l.setAttribute("rel", "canonical"); return l; }, "href", href);

function resolve(pathname: string) {
  // ¿ruta conocida?
  let known = pathname in TITLES;
  let title = TITLES[pathname];
  let desc = DESCRIPTIONS[pathname];
  const seg = pathname.split("/").filter(Boolean);

  if (!known && seg[0] === "sectores" && seg[1] && SECTOR_NAMES[seg[1]]) {
    known = true;
    const n = SECTOR_NAMES[seg[1]];
    title = `CALLA para ${n} — agentes IA`;
    desc = `CALLA para el sector ${n.toLowerCase()}: agentes de IA que atienden llamadas, agendan citas y no pierden clientes. Solicita una demo.`;
  } else if (!known && seg.length === 1 && AGENTS.includes(seg[0])) {
    known = true;
  } else if (!known && seg[0] === "blog" && seg[1] && BLOG_SLUGS.includes(seg[1])) {
    known = true; title = "Blog — CALLA"; desc = DESCRIPTIONS["/blog"];
  }
  return { known, title: title ?? "Página no encontrada — CALLA", desc: desc ?? DEFAULT_DESC };
}

const TitleManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const { known, title, desc } = resolve(pathname);
    const url = `${SITE}${pathname === "/" ? "" : pathname}`;

    document.title = title;
    setMetaName("description", desc);
    setCanonical(url);
    setMetaName("robots", known ? "index, follow" : "noindex, follow");

    // Open Graph / Twitter por página
    setMetaProp("og:title", title);
    setMetaProp("og:description", desc);
    setMetaProp("og:url", url);
    setMetaName("twitter:title", title);
    setMetaName("twitter:description", desc);
  }, [pathname]);

  return null;
};

export default TitleManager;
