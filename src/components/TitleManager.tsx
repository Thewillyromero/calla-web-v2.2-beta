import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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

const TitleManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = TITLES[pathname];
    if (!title && pathname.startsWith("/sectores/")) {
      const name = SECTOR_NAMES[pathname.split("/")[2] ?? ""];
      title = name ? `CALLA para ${name} — agentes IA` : undefined;
    }
    if (!title && pathname.startsWith("/blog/")) title = "Blog — CALLA";
    document.title = title ?? "Página no encontrada — CALLA";
  }, [pathname]);

  return null;
};

export default TitleManager;
