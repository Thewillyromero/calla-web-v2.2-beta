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

            inmobiliaria: (
              <svg width="420" height="300" viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" fillRule="evenodd" d="M0 132L72 132L72 300L0 300ZM10 150L30 150L30 164L10 164ZM40 150L62 150L62 164L40 164ZM10 174L30 174L30 188L10 188ZM40 174L62 174L62 188L40 188ZM10 198L30 198L30 212L10 212ZM40 198L62 198L62 212L40 212Z"/>
                <path fill="white" fillRule="evenodd" d="M82 54L176 54L176 300L82 300ZM94 72L113 72L113 86L94 86ZM126 72L145 72L145 86L126 86ZM160 72L166 72L166 86L160 86ZM94 96L113 96L113 110L94 110ZM126 96L145 96L145 110L126 110ZM94 120L113 120L113 134L94 134ZM126 120L145 120L145 134L126 134ZM160 120L166 120L166 134L160 134ZM94 144L113 144L113 158L94 158ZM126 144L145 144L145 158L126 158ZM94 168L113 168L113 182L94 182ZM126 168L145 168L145 182L126 182ZM160 168L166 168L166 182L160 182Z"/>
                <path fill="white" fillRule="evenodd" d="M186 172L250 172L250 300L186 300ZM197 190L216 190L216 204L197 204ZM228 190L240 190L240 204L228 204ZM197 214L216 214L216 228L197 228ZM228 214L240 214L240 228L228 228Z"/>
                <path fill="white" fillRule="evenodd" d="M260 28L356 28L356 300L260 300ZM272 46L290 46L290 60L272 60ZM302 46L320 46L320 60L302 60ZM332 46L346 46L346 60L332 60ZM272 70L290 70L290 84L272 84ZM302 70L320 70L320 84L302 84ZM332 70L346 70L346 84L332 84ZM272 94L290 94L290 108L272 108ZM302 94L320 94L320 108L302 108ZM272 118L290 118L290 132L272 132ZM302 118L320 118L320 132L302 132ZM332 118L346 118L346 132L332 132ZM272 142L290 142L290 156L272 156ZM302 142L320 142L320 156L302 156ZM272 166L290 166L290 180L272 180ZM302 166L320 166L320 180L302 180ZM332 166L346 166L346 180L332 180Z"/>
                <path fill="white" fillRule="evenodd" d="M366 90L420 90L420 300L366 300ZM374 106L392 106L392 120L374 120ZM402 106L414 106L414 120L402 120ZM374 130L392 130L392 144L374 144ZM402 130L414 130L414 144L402 144ZM374 154L392 154L392 168L374 168Z"/>
                <line x1="0" y1="298" x2="420" y2="298" stroke="white" strokeWidth="1" strokeOpacity="0.25"/>
              </svg>
            ),

            educacion: (
              <svg width="280" height="240" viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="140,18 266,72 140,126 14,72" fill="white"/>
                <rect x="92" y="118" width="96" height="74" fill="white"/>
                <ellipse cx="140" cy="118" rx="48" ry="13" fill="white"/>
                <ellipse cx="140" cy="192" rx="48" ry="13" fill="white"/>
                <line x1="266" y1="72" x2="266" y2="158" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                <rect x="253" y="154" width="26" height="34" rx="7" fill="white"/>
              </svg>
            ),

            energia: (
              <svg width="200" height="320" viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M100 8L80 76L58 76L36 320L62 320L80 194L96 194L100 218L104 194L120 194L138 320L164 320L142 76L120 76Z"/>
                <rect x="6" y="72" width="188" height="8" rx="4" fill="white"/>
                <rect x="20" y="148" width="160" height="8" rx="4" fill="white"/>
                <circle cx="18" cy="76" r="7" fill="white"/>
                <circle cx="100" cy="76" r="7" fill="white"/>
                <circle cx="182" cy="76" r="7" fill="white"/>
                <circle cx="32" cy="152" r="6" fill="white"/>
                <circle cx="168" cy="152" r="6" fill="white"/>
              </svg>
            ),

            hosteleria: (
              <svg width="320" height="310" viewBox="0 0 320 310" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" fillRule="evenodd" d="M58 88L262 88L262 310L58 310ZM78 106L104 106L104 124L78 124ZM118 106L144 106L144 124L118 124ZM158 106L184 106L184 124L158 124ZM198 106L224 106L224 124L198 124ZM78 134L104 134L104 152L78 152ZM118 134L144 134L144 152L118 152ZM158 134L184 134L184 152L158 152ZM198 134L224 134L224 152L198 152ZM78 162L104 162L104 180L78 180ZM118 162L144 162L144 180L118 180ZM158 162L184 162L184 180L158 162ZM198 162L224 162L224 180L198 180ZM78 190L104 190L104 208L78 208ZM198 190L224 190L224 208L198 208ZM128 230L192 230L192 310L128 310Z"/>
                <path fill="white" d="M54 90L160 46L266 90Z"/>
                <rect x="157" y="14" width="6" height="34" rx="3" fill="white"/>
                <path fill="white" d="M163 16L196 26L163 36Z"/>
              </svg>
            ),

            legal: (
              <svg width="280" height="340" viewBox="0 0 280 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="133" y="18" width="14" height="272" rx="7" fill="white"/>
                <rect x="18" y="74" width="244" height="12" rx="6" fill="white"/>
                <line x1="55" y1="86" x2="55" y2="150" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                <ellipse cx="55" cy="160" rx="50" ry="14" fill="white"/>
                <line x1="225" y1="86" x2="225" y2="166" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                <ellipse cx="225" cy="176" rx="50" ry="14" fill="white"/>
                <path fill="white" d="M104 286L176 286L193 310L87 310Z"/>
                <rect x="126" y="272" width="28" height="18" rx="5" fill="white"/>
              </svg>
            ),

            logistica: (
              <svg width="440" height="168" viewBox="0 0 440 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="18" width="288" height="118" rx="5" fill="white"/>
                <path fill="white" d="M293 85L293 18L318 18C348 18 382 52 402 80L420 102L422 132L422 136L293 136Z"/>
                <rect x="0" y="134" width="440" height="5" rx="2" fill="white" fillOpacity="0.22"/>
                <circle cx="365" cy="135" r="22" stroke="white" strokeWidth="6" fill="none"/>
                <circle cx="365" cy="135" r="8" fill="white"/>
                <circle cx="78"  cy="135" r="22" stroke="white" strokeWidth="6" fill="none"/>
                <circle cx="78"  cy="135" r="8" fill="white"/>
                <circle cx="130" cy="135" r="22" stroke="white" strokeWidth="6" fill="none"/>
                <circle cx="130" cy="135" r="8" fill="white"/>
              </svg>
            ),

            rrhh: (
              <svg width="320" height="300" viewBox="0 0 320 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="160" cy="52" r="32" fill="white"/>
                <path fill="white" d="M116 90C116 84 138 78 160 78C182 78 204 84 204 90L204 158L116 158Z"/>
                <circle cx="52"  cy="186" r="26" fill="white"/>
                <path fill="white" d="M16 218C16 213 34 207 52 207C70 207 88 213 88 218L88 275L16 275Z"/>
                <circle cx="268" cy="186" r="26" fill="white"/>
                <path fill="white" d="M232 218C232 213 250 207 268 207C286 207 304 213 304 218L304 275L232 275Z"/>
                <line x1="128" y1="138" x2="76"  y2="174" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                <line x1="192" y1="138" x2="244" y2="174" stroke="white" strokeWidth="5" strokeLinecap="round"/>
              </svg>
            ),

            salud: (
              <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M78 18L162 18L162 78L222 78L222 162L162 162L162 222L78 222L78 162L18 162L18 78L78 78Z"/>
              </svg>
            ),

            seguros: (
              <svg width="240" height="284" viewBox="0 0 240 284" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" fillRule="evenodd" d="M120 8L224 50L224 150C224 214 174 264 120 284C66 264 16 214 16 150L16 50ZM74 140L102 168L172 98L156 82L102 136L88 122Z"/>
              </svg>
            ),

            servicios: (
              <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" fillRule="evenodd" d="M240 130L209 97L208 52L163 51L130 20L97 51L52 52L51 97L20 130L51 163L52 208L97 209L130 240L163 209L208 208L209 163ZM130 86A44 44 0 0 1 174 130A44 44 0 0 1 130 174A44 44 0 0 1 86 130A44 44 0 0 1 130 86Z"/>
                <circle cx="130" cy="130" r="18" fill="white"/>
              </svg>
            ),

            turismo: (
              <svg width="420" height="190" viewBox="0 0 420 185" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M12 108C12 108 130 92 202 90L282 90C314 90 346 80 374 60L404 40C414 36 418 50 410 58L380 78C358 94 328 102 298 104L258 106L238 144L196 144L218 106L138 108L106 128L74 128L92 108C48 108 12 114 12 108Z"/>
                <path fill="white" d="M18 108L26 60L58 80L58 108Z"/>
                <ellipse cx="250" cy="118" rx="32" ry="13" fill="white"/>
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
