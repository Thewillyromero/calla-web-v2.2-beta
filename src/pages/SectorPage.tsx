import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Quote, CheckCircle2, AlertTriangle,
  Phone, PhoneOutgoing, CalendarCheck, BarChart3, HeartHandshake,
  PhoneCall, FileCheck2, RotateCcw,
} from "lucide-react";

const CAPABILITY_ICONS: Record<string, typeof PhoneCall> = {
  "phone-call": PhoneCall,
  "calendar-check": CalendarCheck,
  "file-check-2": FileCheck2,
  "rotate-ccw": RotateCcw,
  "phone": Phone,
  "phone-outgoing": PhoneOutgoing,
  "bar-chart": BarChart3,
};
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import mercedesSilhouette from "@/assets/automocion-mercedes.webp";
import ContactFormDialog from "@/components/ContactFormDialog";
import { sectors } from "@/data/sectors";
import { BOOKING_URL } from "@/lib/constants";

const AGENT_META = {
  ARIA:  { label: "ARIA",  role: "Recepcionista Virtual", hsl: "190 60% 55%",  Icon: Phone          },
  NOVA:  { label: "NOVA",  role: "Agente de Ventas",      hsl: "260 50% 65%",  Icon: PhoneOutgoing  },
  LUMI:  { label: "LUMI",  role: "Gestión de Agenda",     hsl: "160 50% 48%",  Icon: CalendarCheck  },
  BYTE:  { label: "BYTE",  role: "Analítica & Registro",  hsl: "35 70% 58%",   Icon: BarChart3      },
  CARE:  { label: "CARE",  role: "Seguimiento",           hsl: "340 55% 60%",  Icon: HeartHandshake },
} as const;

type AgentKey = keyof typeof AGENT_META;

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" } as const,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const SectorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const sector = sectors.find((s) => s.slug === slug);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!sector) return <Navigate to="/" replace />;

  const Icon = sector.icon;

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => setContactOpen(true)} />

      {/* ── Hero ── */}
      <section className="pt-28 sm:pt-36 pb-20 px-5 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-primary/[0.04] blur-[130px] pointer-events-none" />

        {/* Sector illustration */}
        {(() => {
          const cls = "absolute right-0 bottom-0 pointer-events-none select-none hidden lg:block";
          const anim = {
            animate: { y: [0, -6, 0] } as const,
            transition: { duration: 14, repeat: Infinity, ease: "easeInOut" as const },
          };

          if (sector.slug === "automocion") return (
            <motion.div className={cls} style={{ transform: "translateX(22%)" }} {...anim}>
              <img src={mercedesSilhouette} alt="" width={420}
                style={{ mixBlendMode: "screen" as const, opacity: 0.18 }} className="object-contain" />
            </motion.div>
          );

          const svgMap: Record<string, JSX.Element> = {

            /* ── City skyline with detailed buildings, windows, antenna ── */
            inmobiliaria: (
              <svg width="480" height="320" viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ground line */}
                <rect x="0" y="308" width="480" height="4" fill="white" fillOpacity="0.3"/>
                {/* Building 1 – far left low */}
                <rect x="0" y="220" width="56" height="88" fill="white"/>
                <rect x="6" y="228" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="20" y="228" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="34" y="228" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="6" y="246" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="20" y="246" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="34" y="246" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="6" y="264" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="20" y="264" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="34" y="264" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="6" y="282" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="34" y="282" width="10" height="10" fill="black" fillOpacity="0.35"/>
                {/* Building 2 – mid left tall */}
                <rect x="62" y="80" width="78" height="228" fill="white"/>
                <rect x="116" y="58" width="18" height="24" fill="white"/>
                <rect x="123" y="38" width="4" height="22" fill="white"/>
                <rect x="70" y="90" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="88" y="90" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="106" y="90" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="70" y="108" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="88" y="108" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="106" y="108" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="70" y="126" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="88" y="126" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="106" y="126" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="70" y="144" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="88" y="144" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="106" y="144" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="70" y="162" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="88" y="162" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="106" y="162" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="70" y="180" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="88" y="180" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="106" y="180" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="70" y="198" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="88" y="198" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="106" y="198" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="70" y="216" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="88" y="216" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="106" y="216" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="70" y="234" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="88" y="234" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="106" y="234" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="70" y="252" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="88" y="252" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="106" y="252" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="70" y="270" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="88" y="270" width="12" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="106" y="270" width="12" height="10" fill="black" fillOpacity="0.35"/>
                {/* Building 3 – centre medium */}
                <rect x="148" y="160" width="68" height="148" fill="white"/>
                <rect x="156" y="170" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="174" y="170" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="192" y="170" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="156" y="190" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="174" y="190" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="192" y="190" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="156" y="210" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="174" y="210" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="192" y="210" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="156" y="230" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="174" y="230" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="192" y="230" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="156" y="250" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="174" y="250" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="192" y="250" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="156" y="270" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="174" y="270" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="192" y="270" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="156" y="290" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="192" y="290" width="12" height="12" fill="black" fillOpacity="0.35"/>
                {/* Building 4 – tallest centre-right, tapered top */}
                <path fill="white" d="M226 20L248 20L260 50L260 308L222 308L222 50Z"/>
                <rect x="228" y="30" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="60" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="60" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="76" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="76" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="92" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="92" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="108" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="108" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="124" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="124" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="140" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="140" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="156" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="156" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="172" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="172" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="188" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="188" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="204" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="204" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="220" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="220" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="236" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="236" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="252" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="252" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="268" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="268" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="228" y="284" width="8" height="8" fill="black" fillOpacity="0.3"/>
                <rect x="242" y="284" width="8" height="8" fill="black" fillOpacity="0.3"/>
                {/* Antenna on tallest */}
                <rect x="238" y="6" width="4" height="16" fill="white"/>
                <rect x="234" y="8" width="12" height="3" fill="white"/>
                {/* Building 5 – right mid */}
                <rect x="268" y="130" width="72" height="178" fill="white"/>
                <rect x="276" y="140" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="294" y="140" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="312" y="140" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="276" y="160" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="294" y="160" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="312" y="160" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="276" y="180" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="294" y="180" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="312" y="180" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="276" y="200" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="294" y="200" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="312" y="200" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="276" y="220" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="294" y="220" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="312" y="220" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="276" y="240" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="294" y="240" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="312" y="240" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="276" y="260" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="294" y="260" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="312" y="260" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="276" y="280" width="12" height="12" fill="black" fillOpacity="0.35"/>
                <rect x="312" y="280" width="12" height="12" fill="black" fillOpacity="0.35"/>
                {/* Building 6 – far right */}
                <rect x="348" y="186" width="60" height="122" fill="white"/>
                <rect x="356" y="196" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="372" y="196" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="388" y="196" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="356" y="214" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="372" y="214" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="388" y="214" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="356" y="232" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="372" y="232" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="388" y="232" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="356" y="250" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="372" y="250" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="388" y="250" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="356" y="268" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="372" y="268" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="388" y="268" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="356" y="286" width="10" height="10" fill="black" fillOpacity="0.35"/>
                <rect x="388" y="286" width="10" height="10" fill="black" fillOpacity="0.35"/>
                {/* Tiny building far right edge */}
                <rect x="416" y="240" width="40" height="68" fill="white"/>
                <rect x="422" y="248" width="8" height="8" fill="black" fillOpacity="0.35"/>
                <rect x="436" y="248" width="8" height="8" fill="black" fillOpacity="0.35"/>
                <rect x="422" y="262" width="8" height="8" fill="black" fillOpacity="0.35"/>
                <rect x="436" y="262" width="8" height="8" fill="black" fillOpacity="0.35"/>
                <rect x="422" y="276" width="8" height="8" fill="black" fillOpacity="0.35"/>
                <rect x="436" y="276" width="8" height="8" fill="black" fillOpacity="0.35"/>
              </svg>
            ),

            /* ── Graduation cap – detailed mortarboard with tassel ── */
            educacion: (
              <svg width="320" height="280" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Board shadow base */}
                <ellipse cx="160" cy="110" rx="138" ry="22" fill="white" fillOpacity="0.15"/>
                {/* Main diamond board */}
                <path fill="white" d="M160 26L294 90L160 154L26 90Z"/>
                {/* Top cap relief */}
                <path fill="white" fillOpacity="0.5" d="M160 44L256 90L160 136L64 90Z"/>
                {/* Centre button */}
                <circle cx="160" cy="90" r="10" fill="white"/>
                {/* Tassel string from right corner */}
                <line x1="294" y1="90" x2="294" y2="176" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                {/* Tassel knot */}
                <circle cx="294" cy="176" r="9" fill="white"/>
                {/* Tassel fringe lines */}
                <line x1="282" y1="185" x2="276" y2="218" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="291" y1="187" x2="289" y2="222" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="300" y1="185" x2="304" y2="218" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="307" y1="183" x2="314" y2="215" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                {/* Cap underside / body */}
                <path fill="white" d="M100 104L220 104L220 148C220 148 200 162 160 162C120 162 100 148 100 148Z"/>
                {/* Diploma scroll below */}
                <rect x="112" y="195" width="96" height="58" rx="8" fill="white"/>
                <path fill="white" d="M108 195Q112 185 120 195Z"/>
                <path fill="white" d="M208 195Q204 185 196 195Z"/>
                <path fill="white" d="M108 253Q112 263 120 253Z"/>
                <path fill="white" d="M208 253Q204 263 196 253Z"/>
                {/* Lines on scroll */}
                <line x1="126" y1="213" x2="194" y2="213" stroke="black" strokeWidth="3" strokeOpacity="0.3" strokeLinecap="round"/>
                <line x1="126" y1="225" x2="194" y2="225" stroke="black" strokeWidth="3" strokeOpacity="0.3" strokeLinecap="round"/>
                <line x1="126" y1="237" x2="172" y2="237" stroke="black" strokeWidth="3" strokeOpacity="0.3" strokeLinecap="round"/>
                {/* Ribbon seal */}
                <circle cx="160" cy="224" r="10" fill="black" fillOpacity="0.2"/>
              </svg>
            ),

            /* ── Wind turbine – detailed three-blade + tower ── */
            energia: (
              <svg width="280" height="380" viewBox="0 0 280 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Tower – tapered */}
                <path fill="white" d="M127 172L153 172L166 370L114 370Z"/>
                {/* Tower door */}
                <rect x="132" y="336" width="16" height="28" rx="5" fill="black" fillOpacity="0.3"/>
                {/* Nacelle (hub housing) */}
                <rect x="118" y="158" width="44" height="22" rx="8" fill="white"/>
                {/* Hub centre */}
                <circle cx="140" cy="169" r="11" fill="white"/>
                <circle cx="140" cy="169" r="5" fill="black" fillOpacity="0.3"/>
                {/* Blade 1 – up-right */}
                <path fill="white" d="M145 163C148 148 162 92 156 24C154 16 142 14 138 22C134 60 136 130 140 158Z"/>
                {/* Blade 2 – lower-left */}
                <path fill="white" d="M133 175C118 178 62 192 14 220C6 226 8 238 16 238C52 232 120 206 140 178Z"/>
                {/* Blade 3 – lower-right */}
                <path fill="white" d="M148 175C161 182 206 216 244 250C250 256 260 248 256 240C236 218 174 190 140 178Z"/>
                {/* Base foundation */}
                <path fill="white" d="M94 368L186 368L194 380L86 380Z"/>
                {/* Horizon line subtle */}
                <line x1="10" y1="368" x2="270" y2="368" stroke="white" strokeWidth="2" strokeOpacity="0.2"/>
                {/* Small turbine silhouette in background – scale 0.4 */}
                <path fill="white" fillOpacity="0.25" d="M218 280C219 274 224 252 221 228C220 224 216 224 215 228C213 244 214 262 215 274Z"/>
                <path fill="white" fillOpacity="0.25" d="M215 282C210 283 196 287 184 294C182 295 182 298 184 298C194 296 210 290 215 284Z"/>
                <path fill="white" fillOpacity="0.25" d="M219 282C223 285 234 292 244 300C246 302 248 300 247 298C242 292 228 286 216 282Z"/>
                <rect x="215" y="280" width="5" height="60" fill="white" fillOpacity="0.25"/>
              </svg>
            ),

            /* ── Hotel building – classical facade with flag + entrance ── */
            hosteleria: (
              <svg width="360" height="340" viewBox="0 0 360 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ground */}
                <rect x="0" y="330" width="360" height="6" fill="white" fillOpacity="0.25"/>
                {/* Main body */}
                <rect x="36" y="96" width="288" height="234" fill="white"/>
                {/* Roofline cornice */}
                <rect x="28" y="88" width="304" height="12" fill="white"/>
                {/* Triangular pediment centre */}
                <path fill="white" d="M130 88L180 48L230 88Z"/>
                {/* Flag mast */}
                <rect x="178" y="20" width="4" height="30" fill="white"/>
                {/* Flag */}
                <path fill="white" d="M182 22L210 30L182 38Z"/>
                {/* Wing extensions */}
                <rect x="0" y="148" width="40" height="182" fill="white"/>
                <rect x="320" y="148" width="40" height="182" fill="white"/>
                {/* Windows row 1 */}
                <rect x="54" y="112" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="90" y="112" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="126" y="112" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="208" y="112" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="244" y="112" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="280" y="112" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                {/* Windows row 2 */}
                <rect x="54" y="146" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="90" y="146" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="126" y="146" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="208" y="146" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="244" y="146" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="280" y="146" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                {/* Windows row 3 */}
                <rect x="54" y="180" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="90" y="180" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="126" y="180" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="208" y="180" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="244" y="180" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="280" y="180" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                {/* Windows row 4 */}
                <rect x="54" y="214" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="90" y="214" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="126" y="214" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="208" y="214" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="244" y="214" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="280" y="214" width="26" height="22" rx="2" fill="black" fillOpacity="0.3"/>
                {/* Wing windows */}
                <rect x="8" y="162" width="22" height="18" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="8" y="190" width="22" height="18" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="330" y="162" width="22" height="18" rx="2" fill="black" fillOpacity="0.3"/>
                <rect x="330" y="190" width="22" height="18" rx="2" fill="black" fillOpacity="0.3"/>
                {/* Entrance arch */}
                <path fill="black" fillOpacity="0.25" d="M148 330L148 268C148 252 212 252 212 268L212 330Z"/>
                {/* Columns */}
                <rect x="154" y="258" width="8" height="72" fill="white" fillOpacity="0.5"/>
                <rect x="198" y="258" width="8" height="72" fill="white" fillOpacity="0.5"/>
                {/* Awning */}
                <path fill="white" fillOpacity="0.6" d="M140 258L220 258L214 246L146 246Z"/>
                {/* Stars decoration */}
                <circle cx="160" cy="68" r="4" fill="black" fillOpacity="0.2"/>
                <circle cx="180" cy="62" r="4" fill="black" fillOpacity="0.2"/>
                <circle cx="200" cy="68" r="4" fill="black" fillOpacity="0.2"/>
              </svg>
            ),

            /* ── Scales of justice – detailed beam, chains, pans, base ── */
            legal: (
              <svg width="320" height="380" viewBox="0 0 320 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Base pedestal */}
                <rect x="106" y="346" width="108" height="16" rx="4" fill="white"/>
                <path fill="white" d="M88 362L232 362L244 378L76 378Z"/>
                {/* Vertical staff */}
                <rect x="153" y="24" width="14" height="324" rx="7" fill="white"/>
                {/* Top orb */}
                <circle cx="160" cy="24" r="14" fill="white"/>
                {/* Horizontal beam */}
                <rect x="22" y="78" width="276" height="12" rx="6" fill="white"/>
                {/* Left chain */}
                <line x1="60" y1="90" x2="54" y2="108" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="54" y1="108" x2="60" y2="126" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="60" y1="126" x2="54" y2="144" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="54" y1="144" x2="60" y2="162" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="60" y1="162" x2="54" y2="180" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="54" y1="180" x2="60" y2="198" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                {/* Left pan */}
                <path fill="white" d="M18 204C18 204 32 232 60 232C88 232 102 204 102 204Z"/>
                <rect x="18" y="198" width="84" height="8" rx="4" fill="white"/>
                {/* Right chain – hangs lower (unbalanced) */}
                <line x1="260" y1="90" x2="264" y2="108" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="264" y1="108" x2="260" y2="126" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="260" y1="126" x2="264" y2="144" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="264" y1="144" x2="260" y2="162" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="260" y1="162" x2="264" y2="180" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="264" y1="180" x2="260" y2="198" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <line x1="260" y1="198" x2="264" y2="218" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                {/* Right pan – slightly lower */}
                <path fill="white" d="M218 228C218 228 232 256 260 256C288 256 302 228 302 228Z"/>
                <rect x="218" y="222" width="84" height="8" rx="4" fill="white"/>
                {/* Beam tilt – visual cue */}
                <path fill="white" fillOpacity="0.3" d="M22 84L298 84L298 78L22 78Z"/>
              </svg>
            ),

            /* ── Semi-truck – detailed cab, trailer, wheels, grille ── */
            logistica: (
              <svg width="480" height="200" viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Trailer body */}
                <rect x="4" y="28" width="296" height="122" rx="6" fill="white"/>
                {/* Trailer rear door details */}
                <line x1="150" y1="34" x2="150" y2="144" stroke="black" strokeWidth="3" strokeOpacity="0.25"/>
                <rect x="10" y="34" width="136" height="110" fill="black" fillOpacity="0.08"/>
                <rect x="154" y="34" width="140" height="110" fill="black" fillOpacity="0.08"/>
                {/* Trailer ridge lines */}
                <line x1="4" y1="84" x2="300" y2="84" stroke="black" strokeWidth="2" strokeOpacity="0.15"/>
                {/* Trailer undercarriage frame */}
                <rect x="4" y="148" width="296" height="8" fill="white" fillOpacity="0.6"/>
                {/* Fifth wheel coupling */}
                <rect x="290" y="140" width="24" height="12" rx="3" fill="white" fillOpacity="0.7"/>
                {/* Cab body */}
                <path fill="white" d="M308 62L308 28L340 28C374 28 416 60 438 96L454 120L458 150L458 152L308 152Z"/>
                {/* Cab roof fairing */}
                <path fill="white" d="M308 28L308 8L334 8C354 8 372 18 386 32L340 28Z"/>
                {/* Cab windshield */}
                <path fill="black" fillOpacity="0.3" d="M318 36L318 68L350 68C350 68 370 60 386 36Z"/>
                {/* Cab side window */}
                <rect x="318" y="76" width="34" height="28" rx="4" fill="black" fillOpacity="0.3"/>
                {/* Grille */}
                <rect x="440" y="100" width="16" height="50" rx="4" fill="black" fillOpacity="0.25"/>
                <line x1="440" y1="108" x2="456" y2="108" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
                <line x1="440" y1="118" x2="456" y2="118" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
                <line x1="440" y1="128" x2="456" y2="128" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
                <line x1="440" y1="138" x2="456" y2="138" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
                {/* Headlight */}
                <rect x="454" y="92" width="18" height="12" rx="3" fill="white" fillOpacity="0.7"/>
                {/* Bumper */}
                <path fill="white" d="M440 150L476 150L476 162L438 162Z"/>
                {/* Road line */}
                <rect x="0" y="170" width="480" height="4" rx="2" fill="white" fillOpacity="0.18"/>
                {/* Trailer wheels (4) */}
                <circle cx="56" cy="162" r="24" fill="white"/>
                <circle cx="56" cy="162" r="14" fill="black" fillOpacity="0.35"/>
                <circle cx="56" cy="162" r="6" fill="white"/>
                <circle cx="112" cy="162" r="24" fill="white"/>
                <circle cx="112" cy="162" r="14" fill="black" fillOpacity="0.35"/>
                <circle cx="112" cy="162" r="6" fill="white"/>
                <circle cx="200" cy="162" r="24" fill="white"/>
                <circle cx="200" cy="162" r="14" fill="black" fillOpacity="0.35"/>
                <circle cx="200" cy="162" r="6" fill="white"/>
                <circle cx="256" cy="162" r="24" fill="white"/>
                <circle cx="256" cy="162" r="14" fill="black" fillOpacity="0.35"/>
                <circle cx="256" cy="162" r="6" fill="white"/>
                {/* Drive axle wheels */}
                <circle cx="380" cy="162" r="26" fill="white"/>
                <circle cx="380" cy="162" r="15" fill="black" fillOpacity="0.35"/>
                <circle cx="380" cy="162" r="6" fill="white"/>
                <circle cx="436" cy="162" r="26" fill="white"/>
                <circle cx="436" cy="162" r="15" fill="black" fillOpacity="0.35"/>
                <circle cx="436" cy="162" r="6" fill="white"/>
                {/* Steer wheel */}
                <circle cx="456" cy="166" r="20" fill="white"/>
                <circle cx="456" cy="166" r="11" fill="black" fillOpacity="0.35"/>
                <circle cx="456" cy="166" r="5" fill="white"/>
                {/* Exhaust stack */}
                <rect x="318" y="2" width="8" height="28" rx="4" fill="white"/>
                <rect x="316" y="2" width="12" height="5" rx="2" fill="white"/>
              </svg>
            ),

            /* ── People org-chart – 3 levels with connectors ── */
            rrhh: (
              <svg width="360" height="320" viewBox="0 0 360 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Level 1 – CEO */}
                <circle cx="180" cy="40" r="28" fill="white"/>
                <path fill="white" d="M140 76C140 65 158 58 180 58C202 58 220 65 220 76L220 130L140 130Z"/>
                {/* Connector down */}
                <rect x="177" y="130" width="6" height="32" fill="white" fillOpacity="0.6"/>
                {/* Horizontal bar */}
                <rect x="62" y="162" width="236" height="6" fill="white" fillOpacity="0.6"/>
                {/* Connector to left */}
                <rect x="62" y="162" width="6" height="28" fill="white" fillOpacity="0.6"/>
                {/* Connector to centre */}
                <rect x="177" y="162" width="6" height="28" fill="white" fillOpacity="0.6"/>
                {/* Connector to right */}
                <rect x="292" y="162" width="6" height="28" fill="white" fillOpacity="0.6"/>
                {/* Level 2 – left */}
                <circle cx="65" cy="212" r="22" fill="white"/>
                <path fill="white" d="M34 242C34 233 48 228 65 228C82 228 96 233 96 242L96 288L34 288Z"/>
                {/* Level 2 – centre */}
                <circle cx="180" cy="212" r="22" fill="white"/>
                <path fill="white" d="M149 242C149 233 163 228 180 228C197 228 211 233 211 242L211 288L149 288Z"/>
                {/* Level 2 – right */}
                <circle cx="295" cy="212" r="22" fill="white"/>
                <path fill="white" d="M264 242C264 233 278 228 295 228C312 228 326 233 326 242L326 288L264 288Z"/>
                {/* Detail badges on persons */}
                <circle cx="180" cy="40" r="10" fill="black" fillOpacity="0.15"/>
                <circle cx="65" cy="212" r="8" fill="black" fillOpacity="0.15"/>
                <circle cx="180" cy="212" r="8" fill="black" fillOpacity="0.15"/>
                <circle cx="295" cy="212" r="8" fill="black" fillOpacity="0.15"/>
                {/* Tie on CEO */}
                <path fill="black" fillOpacity="0.2" d="M176 76L180 118L184 76C183 74 177 74 176 76Z"/>
              </svg>
            ),

            /* ── Stethoscope – detailed chest piece, tubing, earpieces ── */
            salud: (
              <svg width="280" height="320" viewBox="0 0 280 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Earpieces */}
                <ellipse cx="78" cy="28" rx="12" ry="7" fill="white" transform="rotate(-30 78 28)"/>
                <ellipse cx="202" cy="28" rx="12" ry="7" fill="white" transform="rotate(30 202 28)"/>
                {/* Ear tips */}
                <circle cx="66" cy="22" r="8" fill="white"/>
                <circle cx="214" cy="22" r="8" fill="white"/>
                {/* Binaurals (metal rods) */}
                <line x1="76" y1="32" x2="100" y2="56" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                <line x1="204" y1="32" x2="180" y2="56" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                {/* Y-piece junction */}
                <circle cx="140" cy="60" r="12" fill="white"/>
                {/* Tube left down to curve */}
                <path fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" d="M100 56 Q106 60 140 60"/>
                <path fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" d="M180 56 Q174 60 140 60"/>
                {/* Main tube going down and curving */}
                <path fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" d="M140 72 Q140 150 80 200 Q40 235 60 280"/>
                {/* Diaphragm chest piece – large circle */}
                <circle cx="72" cy="292" r="26" fill="white"/>
                <circle cx="72" cy="292" r="16" fill="black" fillOpacity="0.2"/>
                {/* Chest piece rim detail */}
                <circle cx="72" cy="292" r="22" stroke="white" strokeWidth="4" fill="none"/>
                {/* Bell (open end) underneath */}
                <path fill="white" fillOpacity="0.6" d="M58 314C58 314 60 320 72 320C84 320 86 314 86 314Z"/>
                {/* Tube highlight */}
                <path fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4" d="M140 72 Q140 150 80 200 Q40 235 60 280"/>
              </svg>
            ),

            /* ── Shield with checkmark – ornate security badge ── */
            seguros: (
              <svg width="280" height="320" viewBox="0 0 280 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer shield shadow */}
                <path fill="white" fillOpacity="0.15" d="M140 10L252 52L252 158C252 232 200 288 140 312C80 288 28 232 28 158L28 52Z"/>
                {/* Main shield body */}
                <path fill="white" d="M140 22L238 60L238 158C238 222 192 272 140 294C88 272 42 222 42 158L42 60Z"/>
                {/* Inner shield border */}
                <path fill="white" fillOpacity="0.25" stroke="black" strokeOpacity="0.15" strokeWidth="3" d="M140 40L220 72L220 158C220 208 182 252 140 272C98 252 60 208 60 158L60 72Z"/>
                {/* Shield centre detail – ornate cross lines */}
                <line x1="140" y1="72" x2="140" y2="260" stroke="black" strokeWidth="3" strokeOpacity="0.12"/>
                <line x1="72" y1="160" x2="208" y2="160" stroke="black" strokeWidth="3" strokeOpacity="0.12"/>
                {/* Large checkmark */}
                <path fill="none" stroke="black" strokeOpacity="0.3" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" d="M88 160L122 196L196 116"/>
                {/* Checkmark white fill */}
                <path fill="none" stroke="white" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" d="M88 160L122 196L196 116"/>
                {/* Top crest ornament */}
                <path fill="white" fillOpacity="0.5" d="M118 22C118 22 126 10 140 10C154 10 162 22 162 22Z"/>
                {/* Side ornaments */}
                <circle cx="70" cy="108" r="8" fill="white" fillOpacity="0.4"/>
                <circle cx="210" cy="108" r="8" fill="white" fillOpacity="0.4"/>
                {/* Bottom tip jewel */}
                <path fill="white" fillOpacity="0.5" d="M128 286L140 306L152 286Z"/>
              </svg>
            ),

            /* ── Wrench & gear combined – detailed industrial tool ── */
            servicios: (
              <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Large gear */}
                <path fill="white" fillRule="evenodd" d="
                  M150 20
                  L163 20 L170 38 L186 32 L196 46 L182 56
                  L192 70 L180 82 L168 72
                  L164 88 L150 90 L136 88
                  L132 72 L120 82 L108 70
                  L118 56 L104 46 L114 32
                  L130 38 Z
                  M150 60 A38 38 0 0 1 188 98 A38 38 0 0 1 150 136 A38 38 0 0 1 112 98 A38 38 0 0 1 150 60Z
                " transform="scale(1.5) translate(-50 -10)"/>
                {/* Gear inner ring cutout */}
                <circle cx="150" cy="118" r="30" fill="black" fillOpacity="0.3"/>
                <circle cx="150" cy="118" r="12" fill="white" fillOpacity="0.6"/>
                {/* Wrench handle diagonal */}
                <path fill="white" d="M172 148L256 264C258 267 262 268 265 266C268 264 268 260 266 257L182 141C184 134 184 126 180 119C174 108 162 102 150 104C146 105 144 108 146 112L158 130C160 133 158 137 154 137L143 134C140 132 137 134 136 138C132 152 140 168 154 170C162 171 170 162 172 148Z"/>
                {/* Wrench open end ring */}
                <path fill="none" stroke="white" strokeWidth="12" d="M136 104 A30 30 0 0 1 180 120" strokeLinecap="round"/>
              </svg>
            ),

            /* ── Commercial airplane – detailed fuselage, wings, tail, engines ── */
            turismo: (
              <svg width="480" height="220" viewBox="0 0 480 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main fuselage */}
                <path fill="white" d="M38 96C38 96 60 84 100 82L380 82C408 82 428 88 446 100C462 110 472 120 472 120C472 120 464 132 446 140C428 152 408 158 380 158L100 158C60 156 38 144 38 144C28 140 22 130 22 130C22 130 26 102 38 96Z"/>
                {/* Nose cone */}
                <path fill="white" d="M22 130C22 130 8 122 4 118C2 115 6 110 10 112C16 114 22 118 22 118Z"/>
                {/* Cockpit windows */}
                <ellipse cx="34" cy="108" rx="8" ry="6" fill="black" fillOpacity="0.3"/>
                <ellipse cx="50" cy="104" rx="7" ry="5" fill="black" fillOpacity="0.3"/>
                {/* Fuselage windows row */}
                <rect x="110" y="104" width="14" height="10" rx="5" fill="black" fillOpacity="0.25"/>
                <rect x="134" y="104" width="14" height="10" rx="5" fill="black" fillOpacity="0.25"/>
                <rect x="158" y="104" width="14" height="10" rx="5" fill="black" fillOpacity="0.25"/>
                <rect x="182" y="104" width="14" height="10" rx="5" fill="black" fillOpacity="0.25"/>
                <rect x="206" y="104" width="14" height="10" rx="5" fill="black" fillOpacity="0.25"/>
                <rect x="230" y="104" width="14" height="10" rx="5" fill="black" fillOpacity="0.25"/>
                <rect x="254" y="104" width="14" height="10" rx="5" fill="black" fillOpacity="0.25"/>
                <rect x="278" y="104" width="14" height="10" rx="5" fill="black" fillOpacity="0.25"/>
                <rect x="302" y="104" width="14" height="10" rx="5" fill="black" fillOpacity="0.25"/>
                <rect x="326" y="104" width="14" height="10" rx="5" fill="black" fillOpacity="0.25"/>
                <rect x="350" y="104" width="14" height="10" rx="5" fill="black" fillOpacity="0.25"/>
                {/* Main wing – left upper sweep */}
                <path fill="white" d="M340 102L170 46L148 62L292 106Z"/>
                {/* Main wing – right lower */}
                <path fill="white" d="M340 138L170 192L148 178L292 134Z"/>
                {/* Wing tip winglets */}
                <path fill="white" d="M170 46L162 28L172 28L178 46Z"/>
                <path fill="white" d="M170 192L162 210L172 210L178 192Z"/>
                {/* Engine left – upper wing */}
                <ellipse cx="230" cy="58" rx="24" ry="10" fill="white"/>
                <rect x="210" y="56" width="40" height="10" rx="5" fill="white"/>
                <ellipse cx="210" cy="61" rx="8" ry="8" fill="black" fillOpacity="0.25"/>
                {/* Engine right – lower wing */}
                <ellipse cx="230" cy="182" rx="24" ry="10" fill="white"/>
                <rect x="210" y="176" width="40" height="10" rx="5" fill="white"/>
                <ellipse cx="210" cy="181" rx="8" ry="8" fill="black" fillOpacity="0.25"/>
                {/* Tail section */}
                <path fill="white" d="M420 120L380 82L380 158Z"/>
                {/* Vertical stabiliser */}
                <path fill="white" d="M420 120L444 56L460 68L436 120Z"/>
                {/* Horizontal stabiliser upper */}
                <path fill="white" d="M420 108L460 90L464 100L424 114Z"/>
                {/* Horizontal stabiliser lower */}
                <path fill="white" d="M420 132L460 150L464 140L424 126Z"/>
                {/* Ventral fin */}
                <path fill="white" fillOpacity="0.5" d="M430 152L448 172L438 174L422 154Z"/>
                {/* Landing gear bay hints */}
                <rect x="270" y="154" width="20" height="6" rx="3" fill="black" fillOpacity="0.2"/>
                <rect x="80" y="150" width="16" height="6" rx="3" fill="black" fillOpacity="0.2"/>
              </svg>
            ),
          };

          const svg = svgMap[sector.slug];
          if (!svg) return null;
          return (
            <motion.div className={cls} style={{ opacity: 0.07 }} {...anim}>
              {svg}
            </motion.div>
          );
        })()}

        <div className="container mx-auto max-w-4xl text-center relative z-10">

          <motion.div {...fade}
            className="inline-flex items-center gap-2 bg-card/60 border border-border/30 rounded-full px-4 py-1.5 mb-6">
            <Icon className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-display font-semibold tracking-wider text-foreground/70 uppercase">
              {sector.name}
            </span>
          </motion.div>

          <motion.h1
            {...fade} transition={{ ...fade.transition, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold mb-5 tracking-tight leading-[1.08] text-foreground">
            {sector.heroTitle}{" "}
            <span className="text-gradient">{sector.heroHighlight}</span>
          </motion.h1>

          <motion.p
            {...fade} transition={{ ...fade.transition, delay: 0.2 }}
            className="text-foreground/70 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed mb-8">
            {sector.description}
          </motion.p>

          <motion.div
            {...fade} transition={{ ...fade.transition, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-10">
            {sector.chips.map((chip) => (
              <div key={chip} className="flex items-center gap-1.5 bg-card/50 border border-border/30 rounded-full px-4 py-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-xs font-medium text-foreground/80">{chip}</span>
              </div>
            ))}
          </motion.div>

          <motion.div {...fade} transition={{ ...fade.transition, delay: 0.4 }}>
            <a
              href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              Solicitar demo <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Stats ── */}
      <section className="py-14 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-5">
            {sector.stats.map((stat, i) => (
              <motion.div
                key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }}
                className="bg-card/40 border border-border/20 rounded-2xl p-6 md:p-8 text-center">
                <div className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/70 font-medium leading-snug">{stat.label}</div>
                {stat.context && (
                  <div className="text-xs text-foreground/45 font-light mt-1">{stat.context}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Pain Points ── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div {...fade} className="mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-display font-extrabold text-foreground tracking-tight mb-3">
              Lo que frena tu negocio
            </h2>
            <p className="text-foreground/60 font-light max-w-xl">
              Problemas reales del sector que CALLA resuelve desde el primer día.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {sector.painPoints.map((point, i) => (
              <motion.div
                key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }}
                className="bg-card/35 border border-border/20 rounded-2xl p-5 md:p-6 flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-red-400/80" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-foreground mb-1.5">{point.title}</h3>
                  <p className="text-sm text-foreground/65 font-light leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Capabilities (sector-specific) ── */}
      {sector.capabilities && (
        <section className="py-16 md:py-24 px-5 md:px-6 bg-white/[0.03] relative overflow-hidden">
          {/* Watermark sector icon */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none">
            <Icon className="w-[28rem] h-[28rem] text-foreground/[0.025]" />
          </div>

          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div {...fade} className="mb-10 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-display font-extrabold text-foreground tracking-tight mb-3">
                {sector.capabilitiesTitle ?? `Qué hace CALLA en tu ${sector.name.toLowerCase()}`}
              </h2>
              <p className="text-foreground/60 font-light max-w-xl">
                {sector.capabilitiesSubtitle ?? "Cubierto desde el primer día."}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
              {sector.capabilities.map((cap, i) => {
                const CapIcon = CAPABILITY_ICONS[cap.iconName] ?? Icon;
                return (
                  <motion.div
                    key={i}
                    {...fade}
                    transition={{ ...fade.transition, delay: i * 0.1 }}
                    className="bg-card/35 border border-border/20 rounded-2xl p-7 md:p-8 flex flex-col gap-5 hover:border-border/40 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: "hsl(var(--primary) / 0.08)", border: "1px solid hsl(var(--primary) / 0.15)" }}
                      >
                        <CapIcon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-6xl font-display font-extrabold text-foreground/[0.05] leading-none select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-foreground mb-2 leading-tight">
                        {cap.title}
                      </h3>
                      <p className="text-base text-foreground/65 font-light leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Casos de uso ── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div {...fade} className="mb-10 md:mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight mb-3">
              Un día con CALLA en {sector.name.toLowerCase()}
            </h2>
            <p className="text-foreground/60 font-light">
              Situaciones reales del sector, resueltas automáticamente.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {sector.useCases.map((uc, i) => (
              <motion.div
                key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }}
                className="bg-card/40 border border-border/20 rounded-2xl p-5 md:p-6 flex flex-col gap-4">
                <div
                  className="inline-flex items-center rounded-full px-3 py-1 self-start"
                  style={{ background: "hsl(var(--primary) / 0.10)", border: "1px solid hsl(var(--primary) / 0.25)" }}
                >
                  <span className="text-xs font-mono font-bold" style={{ color: "hsl(var(--primary))" }}>{uc.time}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground leading-snug">
                  {uc.title}
                </h3>
                <p className="text-base text-foreground/65 font-light leading-relaxed flex-1">
                  {uc.scenario}
                </p>
                <div
                  className="rounded-xl p-4 flex items-start gap-3 mt-1"
                  style={{ background: "hsl(var(--primary) / 0.10)", border: "1px solid hsl(var(--primary) / 0.20)" }}
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />
                  <span className="text-sm font-medium leading-snug text-foreground">{uc.result}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Testimonial ── */}
      <section className="py-16 md:py-20 px-5 md:px-6 bg-white/[0.03]">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            {...fade}
            className="bg-card/40 border border-border/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <Quote className="w-12 h-12 text-primary/15 absolute top-6 right-6 pointer-events-none" />
            <p className="text-lg md:text-xl text-foreground/85 font-light leading-relaxed mb-8 relative z-10">
              &ldquo;{sector.testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                <span className="text-sm font-display font-bold text-primary">
                  {sector.testimonial.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div>
                <div className="font-display font-semibold text-sm text-foreground">
                  {sector.testimonial.author}
                </div>
                <div className="text-xs text-foreground/55">
                  {sector.testimonial.role} · {sector.testimonial.company}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            {...fade}
            className="bg-card/40 border border-border/20 rounded-2xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-primary/[0.04] blur-[80px] pointer-events-none" />
            <Icon className="h-8 w-8 text-primary mx-auto mb-6 relative z-10" />
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-4 tracking-tight text-foreground relative z-10">
              ¿Listo para transformar tu {sector.name.toLowerCase()}?
            </h2>
            <p className="text-foreground/65 max-w-xl mx-auto text-base font-light mb-2 relative z-10">
              Contacta con nosotros y te informamos cómo CALLA te ayudaría en tu sector.
            </p>
            <p className="text-foreground/45 max-w-xl mx-auto text-sm font-light mb-8 relative z-10">
              Solicita información sin compromiso.
            </p>
            <a
              href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 relative z-10">
              Solicitar demo <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source={`sector-${sector.slug}`} />
    </div>
  );
};

export default SectorPage;
