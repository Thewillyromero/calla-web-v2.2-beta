import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Quote, ArrowRight, TrendingUp, Building2, CheckCircle2, ShieldCheck } from "lucide-react";
import { TrustpilotStars } from "@/components/TrustpilotStars";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import SectionFade from "@/components/SectionFade";
import { BOOKING_URL } from "@/lib/constants";

import avatarTim from "@/assets/avatars/tim-bissonnette.webp";
import avatarCarin from "@/assets/avatars/carin-cowell.webp";
import avatarLaurence from "@/assets/avatars/laurence-fendrich.webp";
import avatarTimV from "@/assets/avatars/tim-virga.webp";
import avatarMichael from "@/assets/avatars/michael-torres.webp";
import avatarDirector from "@/assets/avatars/director-td.webp";
import avatarSergio from "@/assets/avatars/sergio-lopez.webp";
import avatarRoberto from "@/assets/avatars/roberto-mendez.webp";
import avatarDavid from "@/assets/avatars/david-martinez.webp";
import avatarAlejandro from "@/assets/avatars/alejandro-diaz.webp";
import avatarJorge from "@/assets/avatars/jorge-navarro.webp";
import avatarElena from "@/assets/avatars/elena-garcia.webp";
import avatarPatricia from "@/assets/avatars/patricia-ruiz.webp";
import avatarCarmen from "@/assets/avatars/carmen-ortega.webp";
import avatarFrancisco from "@/assets/avatars/francisco-torres.webp";
import avatarCarlos from "@/assets/avatars/carlos-vega.webp";
import avatarMiguel from "@/assets/avatars/miguel-santos.webp";
import avatarAntonio from "@/assets/avatars/antonio-ruiz.webp";
import avatarMarta from "@/assets/avatars/marta-jimenez.webp";
import avatarAna from "@/assets/avatars/ana-morales.webp";
import avatarSofia from "@/assets/avatars/sofia-herrero.webp";

const testimonials = [
  { quote: "Te soy sincero: al principio me daba miedo que mis pacientes se sintieran 'atendidos por una máquina'. Pero es que no lo notan. Me llaman diciendo 'qué maja la chica que me cogió el teléfono ayer'.", name: "Dr. Sergio López", role: "Director", company: "Clínica Dental López", initials: "SL", result: "Pacientes no lo notan", context: "Dental", avatar: avatarSergio },
  { quote: "Mi mayor miedo era perder el trato cercano con los clientes. Resulta que CALLA es más amable y paciente que cualquier recepcionista que haya tenido. Y no tiene días malos.", name: "Elena García", role: "Directora", company: "Inmobiliaria Mediterráneo", initials: "EG", result: "Mejor trato que humanos", context: "Inmobiliaria", avatar: avatarElena },
  { quote: "Llevaba meses mirando soluciones de IA y siempre pensaba 'esto no va a funcionar en mi sector'. Me equivocaba. En una semana ya estaba agendando citas sola, sin un solo error.", name: "Marta Jiménez", role: "Socia Directora", company: "Fernández & Asociados Abogados", initials: "MJ", result: "0 errores primera semana", context: "Despacho legal", avatar: avatarMarta },
  { quote: "Mis clientes tienen 60-70 años de media. Pensaba que no iban a aceptar hablar con una IA. Pero la voz es tan natural que ni lo cuestionan. Solo dicen 'qué bien me atendieron'.", name: "Jorge Navarro", role: "Propietario", company: "Restaurante La Brasa", initials: "JN", result: "Clientes mayores encantados", context: "Hostelería", avatar: avatarJorge },
  { quote: "Pensaba que era caro hasta que calculé lo que me costaba perder 8 llamadas al día. Cada llamada perdida era un cliente potencial que se iba a la competencia. CALLA cuesta menos que una mañana de recepcionista.", name: "Roberto Méndez", role: "Propietario", company: "Taller Méndez e Hijos", initials: "RM", result: "Más barato que perder clientes", context: "Taller mecánico", avatar: avatarRoberto },
  { quote: "Mi equipo se resistía: '¿una IA va a hacer nuestro trabajo?'. A los dos días me dijeron 'esto es lo mejor que has hecho'. Ahora se dedican a cerrar ventas en vez de contestar teléfonos.", name: "Carlos Vega", role: "Director Comercial", company: "SolarTech España", initials: "CV", result: "Equipo convencido en 2 días", context: "Energía solar", avatar: avatarCarlos },
  { quote: "CALLA ha transformado nuestra clínica. Antes perdíamos 10-15 llamadas al día porque la recepcionista no daba abasto. Ahora no se pierde ni una y las citas se agendan solas.", name: "Patricia Ruiz", role: "Gerente", company: "Centro Médico Salud Plus", initials: "PR", result: "0 llamadas perdidas", context: "Centro médico", avatar: avatarPatricia },
  { quote: "We hired 3 separate teams to find the best fit, and Guillermo stood out above all of them. What surprised us most was how seamlessly they handled everything in English — you'd never guess they're a Spanish team. Over $300K in new revenue generated.", name: "Tim Michael Bissonnette", role: "CEO", company: "Direct Public Funding", initials: "TB", result: "$300K+ generados", context: "Finanzas", avatar: avatarTim },
  { quote: "Gestionamos 200 llamadas al día entre 3 sedes. CALLA unificó todo: atiende, deriva a la sede correcta y agenda. Ahorramos 2 puestos de recepción.", name: "Miguel Santos", role: "Director de Operaciones", company: "Edommo Energía", initials: "MS", result: "2 puestos ahorrados", context: "Energía", avatar: avatarMiguel, caseStudyUrl: "/caso/edommo" },
  { quote: "The system they built generates over 200 leads per month and consistent appointments for high-value procedures. Communication was flawless — they work in English as naturally as in Spanish. Truly impressive.", name: "Dr. Laurence Fendrich", role: "Fundador", company: "Dental 101", initials: "LF", result: "200+ leads/mes", context: "Salud dental", avatar: avatarLaurence },
  { quote: "Nuestro centro recibe 40 llamadas al día. Antes contestábamos 25 si teníamos suerte. Con CALLA, 40 de 40. Y las urgencias las deriva al móvil del doctor de guardia.", name: "Carmen Ortega", role: "Directora", company: "Centro Estética Carmen", initials: "CO", result: "40/40 llamadas atendidas", context: "Estética", avatar: avatarCarmen },
  { quote: "En nuestra fábrica recibimos pedidos por teléfono de toda España. Antes se perdían en post-its. Ahora CALLA los registra todos directamente en el sistema.", name: "Francisco Torres", role: "Director General", company: "Metálicas Torres S.L.", initials: "FT", result: "0 pedidos perdidos", context: "Industrial", avatar: avatarFrancisco },
  { quote: "Antes dedicaba 3 horas al día al teléfono. Ahora CALLA atiende, filtra y solo me pasa las llamadas que realmente importan. Recuperé mi agenda.", name: "David Martínez", role: "Director Comercial", company: "Instalaciones Martínez", initials: "DM", result: "3h/día recuperadas", context: "Instalaciones", avatar: avatarDavid },
  { quote: "It was a pleasure working with Guillermo and his team. They're experts in their field and helped me execute a very successful campaign from day one. The fact that they're based in Spain but operate perfectly in English is a real competitive advantage.", name: "Carin Cowell", role: "Marketing Manager", company: "Reputation Loop", initials: "CC", result: "Campaña exitosa desde día 1", context: "Lead Generation", avatar: avatarCarin },
  { quote: "Somos una gestoría con 400 clientes. En campaña de renta nos saturábamos. CALLA atiende, clasifica la urgencia y agenda la cita con el asesor correcto.", name: "Ana Morales", role: "Socia", company: "Gestoría Morales & Asociados", initials: "AM", result: "400 clientes sin saturación", context: "Gestoría", avatar: avatarAna },
  { quote: "To say they pay attention to detail would be an understatement. Exceptional communicators who provided detailed explanations of their methodology. Working across languages was never an issue — if anything, their bilingual approach opened new doors for us.", name: "Tim Virga", role: "Director", company: "Capify", initials: "TV", result: "ROI excepcional", context: "Fintech", avatar: avatarTimV },
  { quote: "Lo que más me sorprendió es que CALLA detecta cuándo un paciente está nervioso y adapta el tono. Mis pacientes de primera visita llegan más tranquilos.", name: "Alejandro Díaz", role: "Psicólogo clínico", company: "Centro Psicológico Equilibrio", initials: "AD", result: "Mejor experiencia paciente", context: "Psicología", avatar: avatarAlejandro },
  { quote: "Tenemos 12 técnicos en la calle y las llamadas de clientes para avisos de avería eran un caos. CALLA las recoge, prioriza y asigna al técnico más cercano.", name: "Antonio Ruiz", role: "Jefe de Operaciones", company: "Climatizaciones Ruiz", initials: "AR", result: "Averías priorizadas al instante", context: "Climatización", avatar: avatarAntonio },
  { quote: "In just 14 days we generated $7,200 in new customers. The automated follow-up calls were the key to closing. And honestly, working with a European team that speaks perfect English gave us a fresh perspective we didn't expect.", name: "Michael Torres", role: "Propietario", company: "Advanced Plumbing", initials: "MT", result: "$7.2K en 14 días", context: "Servicios", avatar: avatarMichael },
  { quote: "Nuestra academia recibe consultas de padres a todas horas. CALLA les da la información, resuelve dudas sobre horarios y matricula directamente. Matriculaciones subieron un 40%.", name: "Sofía Herrero", role: "Directora", company: "Academia Herrero", initials: "SH", result: "+40% matriculaciones", context: "Educación", avatar: avatarSofia },
  { quote: "En la primera semana cerramos $5,000 en ventas solo con los leads que nos generaron. Y lo mejor: el equipo detrás tiene una estrategia de crecimiento que nos está cambiando el negocio.", name: "Director Regional", role: "Franquiciado", company: "Tutor Doctor", initials: "DR", result: "$5K primera semana", context: "Educación", avatar: avatarDirector },
];

const caseStudies = [
  { company: "Clínica Dental", result: "$5,000", description: "en ventas primera semana", metric: "25 leads a $30/lead", detail: "ROI positivo desde la primera semana" },
  { company: "Startup Médica", result: "$400K", description: "en capital captado", metric: "Inversores a <$15/lead", detail: "Estrategia de pre-framing y retargeting" },
  { company: "Empresa de Fontanería", result: "$7,200", description: "en ventas en 14 días", metric: "Leads a $6 · Citas a $26", detail: "Posicionamiento en cuidado preventivo" },
  { company: "Empresa de Suelos", result: "$18K", description: "en ventas el primer mes", metric: "Presupuestos a $10.53", detail: "Leads desde $0.93" },
  { company: "Agente Inmobiliario", result: "$17-25", description: "por lead cualificado", metric: "Evaluaciones agendadas", detail: "Vendedores interesados cualificados" },
  { company: "Agencia de Marketing", result: "+$25K/mes", description: "en ingresos recurrentes", metric: "En solo 45 días", detail: "Estrategia integral: voz + captación" },
  { company: "Programa Formativo", result: "$48K", description: "en ventas primera semana", metric: "Leads a <$3", detail: "Llamadas automáticas + campaña digital" },
  { company: "Empresa Solar", result: "<$10/lead", description: "cualificados con cita", metric: "Citas a <$50", detail: "Leads consistentes bajo coste" },
  { company: "Ecommerce Cosmética", result: "Sold out", description: "primer mes de campaña", metric: "Leads a $7.12", detail: "Voz IA + marketing integrado" },
];

const stats = [
  { value: "2M+", label: "Llamadas gestionadas" },
  { value: "5M+", label: "Usuarios finales" },
  { value: "4.9/5", label: "Valoración media" },
  { value: "3 años", label: "En el mercado" },
];

const avatarGradients = [
  "from-brand-teal/40 to-brand-emerald/30",
  "from-brand-lavender/40 to-primary/30",
  "from-brand-rose/40 to-brand-amber/30",
  "from-brand-amber/40 to-brand-teal/30",
  "from-brand-emerald/40 to-brand-lavender/30",
  "from-primary/40 to-brand-rose/30",
];

const Results = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const visibleTestimonials = expanded ? testimonials : testimonials.slice(0, 6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onContact={() => setContactOpen(true)} />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 md:pb-20 px-5 md:px-6">
        <div className="container mx-auto text-center">
          <SectionFade>
            <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
              Casos reales
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-5 tracking-tight text-foreground">
              Resultados probados
            </h1>
            <p className="text-foreground/80 max-w-2xl mx-auto text-base md:text-lg font-light">
              Más de 200 empresas en +20 industrias confían en CALLA para gestionar sus comunicaciones.
            </p>
          </SectionFade>
        </div>
      </section>

      {/* Stats — simplified 4 numbers */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto">
          <SectionFade>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-foreground">
                    {s.value}
                  </div>
                  <p className="text-sm text-foreground/60 mt-2 font-light">{s.label}</p>
                </div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto">
          <SectionFade>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 tracking-tight text-foreground">
                Lo que dicen nuestros clientes
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-4 mt-6">
                {[{ label: "Google Reviews", rating: 4.9 }, { label: "Trustpilot", rating: 4.8 }, { label: "Clutch.co", rating: 5.0 }].map((b) => (
                  <div key={b.label} className="bg-card/50 rounded-xl border border-border/30 px-3.5 md:px-5 py-2.5 md:py-3 flex items-center gap-2.5 md:gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-foreground">{b.rating}</span>
                        <TrustpilotStars rating={b.rating} size={14} />
                      </div>
                      <span className="text-[10px] text-foreground/50">{b.label}</span>
                    </div>
                  </div>
                ))}
                <div className="bg-card/50 rounded-xl border border-border/30 px-3.5 md:px-5 py-2.5 md:py-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" style={{ color: '#00b67a' }} />
                  <div>
                    <span className="text-xs font-semibold text-foreground block leading-tight">Verificado</span>
                    <span className="text-[10px] text-foreground/50">Opiniones reales</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionFade>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-6">
            <AnimatePresence>
              {visibleTestimonials.map((t, i) => (
                <motion.div
                  key={`testimonial-${t.initials}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: i > 5 ? (i - 6) * 0.06 : i * 0.05 }}
                >
                  <div className="bg-card/40 rounded-2xl border border-border/30 p-6 hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <TrustpilotStars rating={5} size={18} />
                      <CheckCircle2 className="w-4 h-4" style={{ color: '#00b67a40' }} />
                    </div>
                    <blockquote className="text-sm text-foreground/85 leading-relaxed mb-5 flex-1 font-light">
                      <Quote className="inline h-3.5 w-3.5 text-primary/25 mr-1 -mt-1" />{t.quote}
                    </blockquote>
                    <div className="mb-4 flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-display font-bold tracking-wide px-2.5 py-1 rounded-full" style={{ backgroundColor: 'hsl(160 50% 48% / 0.12)', color: 'hsl(160 50% 60%)' }}>{t.result}</span>
                      {"caseStudyUrl" in t && t.caseStudyUrl && (
                        <Link to={t.caseStudyUrl} className="text-[11px] font-display font-semibold text-primary/70 hover:text-primary transition-colors flex items-center gap-1">
                          Ver caso completo <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                    <div className="h-px bg-border/20 mb-4" />
                    <div className="flex items-center gap-3">
                      {t.avatar ? (
                        <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-border/20" loading="lazy" />
                      ) : (
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center ring-1 ring-border/20`}>
                          <span className="font-display font-bold text-foreground text-xs">{t.initials}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{t.name}</div>
                        <div className="text-xs text-foreground/50 truncate">{t.role}, {t.company}</div>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-foreground/30 bg-secondary/40 px-2 py-0.5 rounded-full shrink-0">{t.context}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Expand/Collapse */}
          <div className="flex justify-center mb-16">
            <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-3 bg-card/80 backdrop-blur-md border border-border/30 rounded-full px-6 py-3 hover:border-border/50 transition-all duration-300">
              <span className="text-sm text-foreground/70 font-medium">+200 empresas confían en CALLA</span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors">
                {expanded ? "Ver menos" : "Ver más"}
                <svg className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto">
          <SectionFade>
            <div className="bg-card/40 rounded-2xl border border-border/30 p-5 md:p-10">
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-display font-bold text-lg text-foreground">Resultados probados en +20 industrias</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {caseStudies.map((cs, i) => (
                  <motion.div key={cs.company + cs.result} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-secondary/30 rounded-xl border border-border/20 p-4 hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="h-4 w-4 text-foreground/30" />
                      <span className="text-xs text-foreground/60 font-medium">{cs.company}</span>
                    </div>
                    <div className="text-2xl font-display font-bold text-foreground mb-1">{cs.result}</div>
                    <div className="text-sm text-foreground/70 font-medium mb-1">{cs.description}</div>
                    <div className="text-xs text-foreground/50 mb-1">{cs.metric}</div>
                    <div className="text-[10px] text-foreground/30 italic">{cs.detail}</div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-border/20 flex flex-wrap items-center gap-6 text-sm text-foreground/60">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />Datos verificados</span>
                <span className="flex items-center gap-1.5"><ArrowRight className="h-3 w-3 text-primary" />Campañas gestionadas por Guillermo y equipo</span>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto text-center">
          <SectionFade>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-5 tracking-tight text-foreground">
              ¿Listo para obtener estos resultados?
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto text-base md:text-lg font-light mb-8">
              Agenda una demo y descubre cómo CALLA puede transformar las comunicaciones de tu empresa.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity"
            >
              Solicitar demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </SectionFade>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="resultados" />
    </div>
  );
};

export default Results;
