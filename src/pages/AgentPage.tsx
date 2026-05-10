import { useEffect, useState, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, PhoneOutgoing, CalendarCheck, BarChart3, ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import SectionFade from "@/components/SectionFade";
import { TrustpilotStars } from "@/components/TrustpilotStars";
import { BOOKING_URL } from "@/lib/constants";
import agentInbound from "@/assets/characters/agent-inbound.webp";
import agentOutbound from "@/assets/characters/agent-outbound.webp";
import agentScheduler from "@/assets/characters/agent-scheduler.webp";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";

// Which character peeks on each agent's page (a different teammate, curious)

const DemoCall = lazy(() => import("@/components/DemoCall"));
const CallSimulator = lazy(() => import("@/components/CallSimulator"));

interface AgentTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  result: string;
}

interface AgentData {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  description: string;
  image: string;
  icon: typeof Phone;
  useCases: { title: string; description: string }[];
  features: string[];
  testimonials: AgentTestimonial[];
  showDemoCall?: boolean;
  showCallSimulator?: boolean;
}

const agentData: Record<string, AgentData> = {
  aria: {
    slug: "aria",
    name: "ARIA",
    role: "Recepcionista Virtual",
    tagline: "Tu recepcionista que nunca descansa",
    description:
      "ARIA atiende todas las llamadas entrantes de tu empresa con voz natural. Resuelve dudas, transfiere llamadas y agenda citas. Disponible 24/7 sin días malos ni bajas.",
    image: agentInbound,
    icon: Phone,
    showDemoCall: true,
    showCallSimulator: true,
    useCases: [
      { title: "Clínicas y consultas médicas", description: "Atiende pacientes, agenda citas y gestiona cancelaciones sin intervención humana." },
      { title: "Despachos profesionales", description: "Filtra llamadas por urgencia y conecta con el profesional adecuado." },
      { title: "Restaurantes y hostelería", description: "Gestiona reservas, informa sobre menú y horarios." },
      { title: "Comercio y retail", description: "Resuelve dudas sobre productos, horarios y disponibilidad." },
    ],
    features: [
      "Voz natural indistinguible de una persona real",
      "Transferencia inteligente al departamento correcto",
      "Agenda automática integrada con tu calendario",
      "Detección de urgencias y escalado inmediato",
      "Transcripción completa de cada llamada",
      "Personalización de tono y estilo",
    ],
    testimonials: [
      { quote: "Te soy sincero: al principio me daba miedo que mis pacientes se sintieran 'atendidos por una máquina'. Pero es que no lo notan. Me llaman diciendo 'qué maja la chica que me cogió el teléfono ayer'.", name: "Dr. Sergio López", role: "Director, Clínica Dental López", company: "Clínica Dental López", result: "Pacientes no lo notan" },
      { quote: "CALLA ha transformado nuestra clínica. Antes perdíamos 10-15 llamadas al día porque la recepcionista no daba abasto. Ahora no se pierde ni una y las citas se agendan solas.", name: "Patricia Ruiz", role: "Gerente, Centro Médico Salud Plus", company: "Centro Médico Salud Plus", result: "0 llamadas perdidas" },
      { quote: "Mis clientes tienen 60-70 años de media. Pensaba que no iban a aceptar hablar con una IA. Pero la voz es tan natural que ni lo cuestionan.", name: "Jorge Navarro", role: "Propietario, Restaurante La Brasa", company: "Restaurante La Brasa", result: "Clientes mayores encantados" },
    ],
  },
  nova: {
    slug: "nova",
    name: "NOVA",
    role: "Agente de Ventas",
    tagline: "Convierte leads en clientes mientras duermes",
    description:
      "NOVA realiza llamadas salientes para captar leads, cualificar oportunidades y cerrar ventas. Ejecuta campañas outbound automatizadas con seguimiento inteligente.",
    image: agentOutbound,
    icon: PhoneOutgoing,
    useCases: [
      { title: "Generación de leads", description: "Llama a listas de prospectos, cualifica y agenda reuniones con tu equipo comercial." },
      { title: "Seguimiento post-venta", description: "Contacta clientes tras la compra para asegurar satisfacción y detectar oportunidades de upsell." },
      { title: "Recuperación de carritos", description: "Llama a clientes que abandonaron el proceso de compra y cierra la venta." },
      { title: "Campañas de reactivación", description: "Contacta clientes inactivos con ofertas personalizadas." },
    ],
    features: [
      "Llamadas salientes automatizadas a escala",
      "Cualificación inteligente de leads (BANT)",
      "Seguimiento multicontacto con cadencias",
      "Integración CRM bidireccional",
      "Scripts dinámicos según respuesta",
      "Reportes de conversión en tiempo real",
    ],
    testimonials: [
      { quote: "In just 14 days we generated $7,200 in new customers. The automated follow-up calls were the key to closing.", name: "Michael Torres", role: "Propietario, Advanced Plumbing", company: "Advanced Plumbing", result: "$7.2K en 14 días" },
      { quote: "Mi equipo se resistía: '¿una IA va a hacer nuestro trabajo?'. A los dos días me dijeron 'esto es lo mejor que has hecho'. Ahora se dedican a cerrar ventas.", name: "Carlos Vega", role: "Director Comercial, SolarTech España", company: "SolarTech España", result: "Equipo convencido en 2 días" },
      { quote: "We hired 3 separate teams to find the best fit, and Guillermo stood out above all of them. Over $300K in new revenue generated.", name: "Tim Michael Bissonnette", role: "CEO, Direct Public Funding", company: "Direct Public Funding", result: "$300K+ generados" },
    ],
  },
  lumi: {
    slug: "lumi",
    name: "LUMI",
    role: "Coordinador de Citas",
    tagline: "Cero no-shows, cero llamadas perdidas",
    description:
      "LUMI gestiona tu agenda de forma autónoma. Agenda, confirma, reagenda y envía recordatorios. Reduce los no-shows hasta un 80% sin que tu equipo mueva un dedo.",
    image: agentScheduler,
    icon: CalendarCheck,
    useCases: [
      { title: "Confirmación automática", description: "Llama a cada paciente o cliente 24h antes para confirmar su cita." },
      { title: "Reagendamiento inteligente", description: "Cuando alguien cancela, LUMI llena el hueco con otro cliente de la lista de espera." },
      { title: "Recordatorios multicanal", description: "Combina llamada + SMS + email para maximizar asistencia." },
      { title: "Gestión de lista de espera", description: "Mantiene una cola priorizada y asigna huecos al instante." },
    ],
    features: [
      "Sincronización con Google Calendar, Outlook y más",
      "Recordatorios automáticos configurables",
      "Reagendamiento con un solo comando de voz",
      "Detección de conflictos y solapamientos",
      "Panel de ocupación en tiempo real",
      "Reducción de no-shows del 80%",
    ],
    testimonials: [
      { quote: "Nuestra academia recibe consultas de padres a todas horas. CALLA les da la información, resuelve dudas sobre horarios y matricula directamente. Matriculaciones subieron un 40%.", name: "Sofía Herrero", role: "Directora, Academia Herrero", company: "Academia Herrero", result: "+40% matriculaciones" },
      { quote: "Nuestro centro recibe 40 llamadas al día. Antes contestábamos 25 si teníamos suerte. Con CALLA, 40 de 40.", name: "Carmen Ortega", role: "Directora, Centro Estética Carmen", company: "Centro Estética Carmen", result: "40/40 llamadas atendidas" },
      { quote: "Somos una gestoría con 400 clientes. En campaña de renta nos saturábamos. CALLA atiende, clasifica la urgencia y agenda la cita con el asesor correcto.", name: "Ana Morales", role: "Socia, Gestoría Morales & Asociados", company: "Gestoría Morales & Asociados", result: "400 clientes sin saturación" },
    ],
  },
  byte: {
    slug: "byte",
    name: "BYTE",
    role: "Analista de Datos",
    tagline: "Datos que transforman decisiones",
    description:
      "BYTE analiza cada llamada y genera reportes accionables. Detecta patrones, mide satisfacción y te dice exactamente qué mejorar. Inteligencia de negocio en tiempo real.",
    image: agentAnalytics,
    icon: BarChart3,
    useCases: [
      { title: "Análisis de sentimiento", description: "Detecta el tono emocional de cada llamada y alerta sobre clientes insatisfechos." },
      { title: "Reportes ejecutivos", description: "Genera dashboards diarios, semanales y mensuales con métricas clave." },
      { title: "Detección de oportunidades", description: "Identifica patrones de compra y sugiere acciones comerciales." },
      { title: "Control de calidad", description: "Evalúa cada interacción y genera scoring de satisfacción." },
    ],
    features: [
      "Dashboard en tiempo real personalizable",
      "Análisis de sentimiento por IA",
      "Transcripción y resumen automático",
      "Alertas configurables por KPIs",
      "Exportación a CSV, PDF y API",
      "Integración con herramientas de BI",
    ],
    testimonials: [
      { quote: "Antes dedicaba 3 horas al día al teléfono. Ahora CALLA atiende, filtra y solo me pasa las llamadas que realmente importan. Recuperé mi agenda.", name: "David Martínez", role: "Director Comercial, Instalaciones Martínez", company: "Instalaciones Martínez", result: "3h/día recuperadas" },
      { quote: "Gestionamos 200 llamadas al día entre 3 sedes. CALLA unificó todo: atiende, deriva a la sede correcta y agenda. Ahorramos 2 puestos de recepción.", name: "Miguel Santos", role: "Director de Operaciones, Edommo Energía", company: "Edommo Energía", result: "2 puestos ahorrados" },
      { quote: "Tenemos 12 técnicos en la calle y las llamadas de clientes para avisos de avería eran un caos. CALLA las recoge, prioriza y asigna al técnico más cercano.", name: "Antonio Ruiz", role: "Jefe de Operaciones, Climatizaciones Ruiz", company: "Climatizaciones Ruiz", result: "Averías priorizadas al instante" },
    ],
  },
};

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5 },
};

const AgentPage = () => {
  const location = useLocation();
  const [contactOpen, setContactOpen] = useState(false);
  const agentSlug = location.pathname.replace("/", "");
  const agent = agentData[agentSlug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onContact={() => setContactOpen(true)} />
        <section className="pt-28 sm:pt-32 pb-20 px-5 md:px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-display font-extrabold mb-5 text-foreground">
              Agente no encontrado
            </h1>
          </div>
        </section>
        <Footer />
        <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source={`agent-${agentSlug}`} />
      </div>
    );
  }

  const Icon = agent.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar onContact={() => setContactOpen(true)} />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 md:pb-20 px-5 md:px-6">
        <div className="container mx-auto">
          <motion.div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto" {...fade}>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{agent.name}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-4 tracking-tight text-foreground">
                {agent.tagline}
              </h1>
              <p className="text-foreground/80 max-w-xl text-base md:text-lg font-light mb-6">
                {agent.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/20"
                  onClick={() => window.open(BOOKING_URL, "_blank")}
                >
                  Solicitar demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="shrink-0 relative">
              {/* Glow behind character */}
              <div
                className="absolute inset-0 scale-[2.5] rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, hsl(190 60% 55% / 0.15), transparent 70%)" }}
              />
              <motion.img
                src={agent.image}
                alt={agent.name}
                className="w-48 md:w-64 object-contain relative z-10 animate-float-gentle"
                width={256}
                height={256}
                initial={{ opacity: 0, scale: 0, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-10">
              Capacidades de {agent.name}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {agent.features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 bg-card/40 border border-border/20 rounded-xl p-4"
                  {...fade}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/85">{feature}</span>
                </motion.div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-10">
              Casos de uso
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {agent.useCases.map((uc, i) => (
                <motion.div
                  key={i}
                  className="bg-card/40 border border-border/20 rounded-2xl p-6 hover:border-primary/20 transition-all"
                  {...fade}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-2">{uc.title}</h3>
                  <p className="text-sm text-foreground/70 font-light">{uc.description}</p>
                </motion.div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-10">
              Lo que dicen nuestros clientes
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {agent.testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  className="bg-card/40 border border-border/20 rounded-2xl p-6 hover:border-primary/20 transition-all flex flex-col"
                  {...fade}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <TrustpilotStars rating={5} size={16} />
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#00b67a40' }} />
                  </div>
                  <blockquote className="text-sm text-foreground/85 leading-relaxed mb-4 flex-1 font-light">
                    <Quote className="inline h-3.5 w-3.5 text-primary/25 mr-1 -mt-1" />
                    {t.quote}
                  </blockquote>
                  <div className="mb-3">
                    <span className="text-[11px] font-display font-bold tracking-wide px-2.5 py-1 rounded-full" style={{ backgroundColor: 'hsl(160 50% 48% / 0.12)', color: 'hsl(160 50% 60%)' }}>
                      {t.result}
                    </span>
                  </div>
                  <div className="h-px bg-border/20 mb-3" />
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-foreground/50">{t.role}</div>
                </motion.div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ARIA-specific: DemoCall + CallSimulator */}
      {agent.showDemoCall && (
        <Suspense fallback={<div className="py-20 text-center text-foreground/50">Cargando demo...</div>}>
          <DemoCall />
        </Suspense>
      )}
      {agent.showCallSimulator && (
        <Suspense fallback={<div className="py-20 text-center text-foreground/50">Cargando simulador...</div>}>
          <CallSimulator />
        </Suspense>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto text-center">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-5">
              Activa {agent.name} en tu empresa
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto text-base md:text-lg font-light mb-8">
              Agenda una demo personalizada y descubre cómo {agent.name} puede transformar tu negocio.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/20"
              onClick={() => window.open(BOOKING_URL, "_blank")}
            >
              Solicitar demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </SectionFade>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source={`agent-${agentSlug}`} />
    </div>
  );
};

export default AgentPage;
