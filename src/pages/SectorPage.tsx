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
            animate: { y: [0, -6, 0] },
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

            /* ── Wind turbine – real path from Wikimedia Commons (CC BY-SA 3.0, OsvaldoGago) ── */
            energia: (
              <svg width="262" height="372" viewBox="0 0 524.40942 744.09448" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0,-308.26769)">
                  <path fill="white" d="m 96.169401,310.49103 c -0.06225,-0.0297 -0.11052,0.0182 -0.11052,0.0552 0,1.3341 19.275149,26.94569 33.929469,45.09194 31.45448,38.94966 97.05739,117.43851 105.93291,126.71056 6.82503,7.12993 8.27046,9.65241 7.51532,13.42812 -0.68226,3.4113 0.28337,5.98126 3.70241,9.67046 4.40514,4.75322 4.60662,5.72107 3.53662,17.51732 -0.62275,6.86534 -3.04286,20.91597 -5.3602,31.22176 -2.31733,10.30578 -5.75662,32.98437 -7.6811,50.39687 -11.58328,104.80475 -15.97379,152.57753 -16.90947,184.62276 l -0.77364,27.40882 3.42611,-28.29297 c 9.46805,-78.44713 28.29086,-207.73941 37.41083,-256.95775 l 3.7024,-20.00394 6.41014,0.5526 6.41012,0.55259 -0.16569,129.97089 c -0.32576,225.32045 0.0225,371.48424 -0.44208,407.92734 l 31.44278,0 c -1.02668,-6.8473 -1.61807,-20.695 -2.26564,-48.9601 -1.90579,-83.18297 -4.57149,-183.0915 -6.46539,-243.14284 -3.08639,-97.8629 -3.47661,-113.31838 -4.58655,-180.8651 l -1.04994,-65.92486 15.03064,0.22104 c 8.27172,0.14093 15.81458,-0.2205 16.79896,-0.82889 2.52817,-1.56249 6.04526,-19.04266 4.19974,-20.88818 -0.83704,-0.83705 -5.62084,-2.18664 -10.66513,-2.98403 -5.04428,-0.7974 -9.58829,-1.79666 -10.05727,-2.26565 -1.50786,-1.50786 43.8475,-40.03543 82.39226,-69.95881 8.00647,-6.21567 33.89126,-25.15717 50.94947,-37.30033 32.41619,-23.07594 -9.95017,-0.17453 -67.85894,36.69247 -10.69829,6.81093 -21.79149,13.69951 -24.64585,15.30694 -10.16961,5.72698 -56.89754,36.76056 -69.24044,45.9761 -12.78417,9.54499 -19.475,12.46441 -23.09857,10.05727 -1.1126,-0.7391 -5.23089,-8.09003 -9.17311,-16.35688 -8.24603,-17.29204 -8.40634,-17.48174 -43.65519,-50.34162 -28.14202,-26.23463 -60.87142,-58.87424 -90.57079,-90.23914 -9.34581,-9.86991 -17.082081,-17.62564 -18.014669,-18.06993 z"/>
                </g>
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

            /* ── Scales of justice – real silhouette from Wikimedia Commons (CC BY-SA 4.0) ── */
            legal: (
              <svg width="300" height="306" viewBox="0 0 850.394 864.567" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0.220942 0.0259173)">
                  <path fill="white" d="M579.997,784.201c0,0.01,0,0.02,0,0.02v32.45c0.08,36-311.13,34.3-310.04,0v-32.36c0.59-4.33,4.09-15.02,24.42-15.3c25.5-0.36,248.44,0,265.08,0C574.347,769.011,579.237,778.141,579.997,784.201z"/>
                  <path fill="white" d="M559.706,761.781v22.79c0.07,24.66-268.97,21.62-269.46,0v-23.04c0.01-0.03,0.02-0.06,0.04-0.1c2.09-6.18,43.75-20.91,130.44-20.91c86.8,0,136.51,11.64,138.92,21.03C559.686,761.631,559.696,761.711,559.706,761.781z"/>
                  <path fill="white" d="M430.645,706.651h-11.339c-7.882,0-26.929,18.7-26.929,21.118s19.047,21.118,26.929,21.118h11.339c7.882,0,26.929-18.7,26.929-21.118S438.528,706.651,430.645,706.651z"/>
                  <polygon fill="white" points="408.253,719.683 408.253,193.845 441.699,193.845 441.52,719.683"/>
                  <path fill="white" fillRule="evenodd" d="M451.307,139.146c0-7.267-5.9-13.167-13.167-13.167h-26.333c-7.263,0-13.162,5.9-13.162,13.167v52.238c0,7.267,5.9,13.163,13.162,13.163h26.333c7.267,0,13.167-5.896,13.167-13.163V139.146z"/>
                  <path fill="white" d="M424.003,90.724c-1.1,0-2.208,0.05-3.25,0.129c-1.237,0.096-2.371,0.321-3.508,0.521c-6.779,1.175-11.558,3.979-11.558,7.396v63.196c0,3.417,4.779,6.221,11.558,7.396c1.138,0.196,2.271,0.425,3.508,0.521c1.042,0.079,2.15,0.129,3.25,0.129h1.425c1.417,0,2.833,0,4.158-0.129c8.375-0.746,14.679-4.004,14.679-7.917V98.77c0-3.917-6.304-7.171-14.679-7.917c-0.129-0.013-0.263,0.012-0.388,0c-1.038-0.092-2.158-0.117-3.25-0.129H424.003z"/>
                  <rect fill="white" x="411.172" y="78.03" width="27.609" height="18.322"/>
                  <path fill="white" d="M415.362,58.549v10.638c0,0-0.662,0.342-0.75,0.375c-0.025,0.008-0.221-0.013-0.25,0c-4.125,0.729-9.896,2.167-11.762,4.254c-0.75,0.833-0.554,1.4,0,2.125c1.1,1.454,10.779,6.008,21.646,6.008c0.204,0,0.421,0.004,0.625,0c0.246,0.008,0.508,0,0.754,0c10.863,0,20.517-4.55,21.646-6.008c0.896-1.154,0.621-1.363,0-2.125c-1.171-1.442-7.667-3.533-11.763-4.254c-0.017-0.008-0.112,0.004-0.125,0c-0.112-0.046-0.875-0.375-0.875-0.375V58.549H415.362z"/>
                  <circle fill="white" cx="424.976" cy="41.785" r="23.102"/>
                </g>
                <path fill="white" d="M424.244,122.782c-1.073,0-2.157,0.049-3.176,0.127c-1.211,0.093-2.318,0.315-3.43,0.508c-6.633,1.15-11.307,3.895-11.307,7.241v17.659c-20.066-11.636-44.872-17.913-62.632-17.913c-23.716,0-36.065,2.798-64.537,18.548c-23.676,13.096-30.222,18.711-46.751,15.118s-24.407-12.116-33.031-14.991c-8.624-2.875-21.548,6.389-22.359,9.147c-0.898,3.054-3.728-0.766-4.446-2.922c-0.719-2.156-16.98,7.082-16.261,12.831c0.719,5.749,14.701,21.506,16.77,14.737c1.976-6.468,4.726-7.089,7.241-4.574c2.541,2.541,11.902,7.725,13.339,17.786c1.437,10.061-3.648,12.911-7.241,10.036c-3.593-2.875-4.998-4.24-5.717-7.114c-0.719-2.875-15.749,4.323-13.593,6.479c2.156,2.156,6.403,15.713,11.434,17.151c5.031,1.437,5.082,7.924,5.082,10.799s8.639,2.243,8.639,1.525s0.635-10.163,0.635-10.163s16.599-1.391,15.88-22.232c-0.719-20.841-12.272-27.274-7.241-28.711s30.146,11.477,51.706,12.196s50.757-20.835,89.565-20.835c28.795,0,52.929,13.386,63.521,20.327v6.987c0,3.346,4.674,6.092,11.307,7.241c1.112,0.193,2.219,0.415,3.43,0.508c1.019,0.078,2.103,0.127,3.176,0.127c0.17,0.002,0.337,0,0.508,0h0.889c1.384,0,2.77,0.001,4.065-0.127c8.192-0.729,14.356-3.918,14.356-7.75v-6.987c10.592-6.941,34.726-20.327,63.521-20.327c38.808,0,68.005,21.554,89.565,20.835c21.56-0.719,46.675-13.633,51.706-12.196c5.031,1.437-6.523,7.87-7.241,28.711c-0.719,20.841,15.88,22.232,15.88,22.232s0.635,9.445,0.635,10.163s8.639,1.35,8.639-1.525s0.051-9.361,5.082-10.799c5.031-1.437,9.278-14.995,11.434-17.151c2.156-2.156-12.875-9.354-13.594-6.479c-0.719,2.875-2.124,4.24-5.717,7.114c-3.593,2.875-8.679,0.025-7.241-10.036c1.437-10.061,10.798-15.245,13.339-17.786c2.515-2.515,5.138-1.894,7.114,4.574c2.068,6.769,16.178-8.988,16.897-14.737s-15.543-14.987-16.261-12.831c-0.719,2.156-3.548,5.976-4.446,2.922c-0.811-2.758-13.736-12.022-22.359-9.147c-8.624,2.875-16.502,11.398-33.031,14.991c-16.529,3.593-23.076-2.022-46.751-15.118c-28.473-15.75-40.949-18.548-64.664-18.548c-17.759,0-42.439,6.276-62.505,17.913v-17.659c0-3.832-6.164-7.02-14.356-7.75c-0.125-0.011-0.255,0.01-0.381,0c-1.012-0.09-2.11-0.114-3.176-0.127C426.15,122.782,424.244,122.782,424.244,122.782z"/>
                <g transform="translate(34.1704 5.60824) scale(0.78682)">
                  <path fill="white" d="M796.858,270.753c-0.762,6.758-0.9,13.517,0,20.271c0,0-12.763-0.175-12.763,2.754c0,2.929,1.596,56.008-3.004,61.317c-4.6,5.308-7.512,4.208-9.633,1.375c-2.125-2.829-8.429-2.417-9.137-1c-0.708,1.417-2.258,10.096,2.254,13.017c6.296,4.071,21.983,3.954,23.4-11.263c1.417-15.221,1.375-28.283,7.258-28.283c2.125,0,2,7.254,2,15.392c0,8.142-0.708,10.246-2.125,12.013c-1.417,1.771-1.063,18.771,0,18.771h10.637c1.058,0,1.413-17,0-18.771c-1.417-1.767-2.129-3.871-2.129-12.013c0-8.138-0.996-15.392,1.125-15.392c6.383,0,5.592,11.688,7.008,26.904c1.417,15.221,16.071,15.617,23.15,13.142c7.079-2.479,3.646-12.696,3.004-14.142c-0.958-2.167-5.133-0.329-7.758,1.25c-3.033,1.829-6.038,3.933-10.637-1.375c-4.6-5.308-5.004-58.008-5.004-60.942c0-2.929-11.638-2.754-11.638-2.754c-0.296-6.758-1.246-13.513,0-20.271C799.824,272.416,798.258,271.72,796.858,270.753z M800.112,295.153c3.396,0,6.133,0.6,6.133,1.379v9.508c0,0.779-2.737,1.375-6.133,1.375c-3.396,0-6.133-0.596-6.133-1.375v-9.508C793.979,295.753,796.716,295.153,800.112,295.153z M626.024,732.624c108.642,60.9,246.238,57.496,353.938,0c8.904-5.371-117.663-19.304-177.554-19.304C695.387,713.32,624.078,723.954,626.024,732.624z"/>
                </g>
                <g transform="translate(34.1704 5.60824) scale(0.78682)">
                  <path fill="white" d="M197.084,270.753c0.762,6.758,0.9,13.517,0,20.271c0,0,12.763-0.175,12.763,2.754c0,2.929-1.596,56.008,3.004,61.317c4.6,5.308,7.512,4.208,9.633,1.375c2.125-2.829,8.429-2.417,9.137-1c0.708,1.417,2.258,10.096-2.254,13.017c-6.296,4.071-21.983,3.954-23.4-11.263c-1.417-15.221-1.375-28.283-7.258-28.283c-2.125,0-2,7.254-2,15.392c0,8.142,0.708,10.246,2.125,12.013c1.417,1.771,1.063,18.771,0,18.771h-10.637c-1.058,0-1.413-17,0-18.771c1.417-1.767,2.129-3.871,2.129-12.013c0-8.138,0.996-15.392-1.125-15.392c-6.383,0-5.592,11.688-7.008,26.904c-1.417,15.221-16.071,15.617-23.15,13.142c-7.079-2.479-3.646-12.696-3.004-14.142c0.958-2.167,5.133-0.329,7.758,1.25c3.033,1.829,6.038,3.933,10.637-1.375c4.6-5.308,5.004-58.008,5.004-60.942c0-2.929,11.637-2.754,11.637-2.754c0.296-6.758,1.246-13.513,0-20.271C194.117,272.416,195.684,271.72,197.084,270.753z M193.829,295.153c-3.396,0-6.133,0.6-6.133,1.379v9.508c0,0.779,2.737,1.375,6.133,1.375s6.133-0.596,6.133-1.375v-9.508C199.963,295.753,197.225,295.153,193.829,295.153z M367.917,732.624c-108.642,60.9-246.238,57.496-353.938,0c-8.904-5.371,117.663-19.304,177.554-19.304C298.555,713.32,369.863,723.954,367.917,732.624z"/>
                </g>
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

            /* ── Stethoscope – Font Awesome icon path (CC BY-SA 3.0, Dave Gandy / Wikimedia) ── */
            salud: (
              <svg width="240" height="266" viewBox="0 0 1408 1536" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="m 1280,832 q 0,26 -19,45 -19,19 -45,19 -26,0 -45,-19 -19,-19 -19,-45 0,-26 19,-45 19,-19 45,-19 26,0 45,19 19,19 19,45 z m 128,0 q 0,-62 -35.5,-111 Q 1337,672 1280,651 V 256 Q 1280,97 1148.5,-15.5 1017,-128 832,-128 647,-128 515.5,-15.5 384,97 384,256 V 388 Q 220,408 110,516 0,624 0,768 v 512 q 0,26 19,45 19,19 45,19 6,0 16,-2 17,30 47,48 30,18 65,18 53,0 90.5,-37.5 Q 320,1333 320,1280 320,1227 282.5,1189.5 245,1152 192,1152 q -33,0 -64,18 V 768 q 0,-106 94,-181 94,-75 226,-75 132,0 226,75 94,75 94,181 v 402 q -31,-18 -64,-18 -53,0 -90.5,37.5 -37.5,37.5 -37.5,90.5 0,53 37.5,90.5 37.5,37.5 90.5,37.5 35,0 65,-18 30,-18 47,-48 10,2 16,2 26,0 45,-19 19,-19 19,-45 V 768 Q 896,624 786,516 676,408 512,388 V 256 Q 512,150 606,75 700,0 832,0 q 132,0 226,75 94,75 94,181 v 395 q -57,21 -92.5,70 -35.5,49 -35.5,111 0,80 56,136 56,56 136,56 80,0 136,-56 56,-56 56,-136 z"/>
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

            /* ── Airplane silhouette – real path from Wikimedia Commons (public domain) ── */
            turismo: (
              <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(-147.06733,-109.44716)">
                  <path fill="white" d="M 157.98695,184.38488 L 173.37483,168.20017 C 182.38616,159.18884 197.56012,162.31477 197.56012,162.31477 L 242.58958,168.47612 L 265.39575,146.16045 C 277.41087,134.35989 288.26269,152.4142 283.54247,158.63631 L 271.83305,172.24635 L 320.32641,181.22794 L 336.78707,162.03882 C 354.38063,141.01237 367.47041,159.95529 359.53185,171.11218 L 348.89521,184.56906 L 421.75804,194.07153 C 484.40828,133.78139 509.98537,108.77262 526.46939,123.63021 C 543.05967,138.5836 513.71315,168.38877 456.64135,227.17701 L 467.00204,302.24678 L 482.26714,289.52597 C 491.27847,282.01653 507.27901,294.06392 490.75822,309.72648 L 469.76089,329.52825 L 478.61969,378.66527 L 491.73923,368.58052 C 503.32523,359.35463 517.39476,371.55518 501.7322,388.29052 L 480.88803,409.28786 C 480.02981,409.93153 487.69305,452.38631 487.69305,452.38631 C 492.41327,473.19821 480.67347,480.80195 480.67347,480.80195 L 466.35838,493.27782 L 411.97962,339.67439 C 407.47395,326.15738 396.0546,311.47862 376.97351,313.22076 C 366.8894,314.29354 341.41552,331.49026 337.98263,335.56682 L 279.00579,392.27531 C 277.5039,393.34809 288.07915,465.99635 288.07915,465.99635 C 288.07915,468.14191 269.38054,492.66454 269.38054,492.66454 L 232.01433,426.14725 L 213.56128,434.7301 L 224.35108,417.93211 L 157.06733,379.9526 L 182.29502,361.49956 C 194.31014,364.28878 257.3034,371.36975 258.59073,370.72608 C 258.59073,370.72608 309.88762,319.85344 312.81633,316.77643 C 329.76623,298.96831 335.46935,292.31456 338.04402,283.51778 C 340.6208,274.71377 336.23117,261.81195 309.62838,245.4769 C 272.93937,222.94855 157.98695,184.38488 157.98695,184.38488 z"/>
                </g>
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
