import { useEffect, useState, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, PhoneOutgoing, CalendarCheck, BarChart3, HeartHandshake, ArrowRight, CheckCircle2, Quote, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import SectionFade from "@/components/SectionFade";
import { TrustpilotStars } from "@/components/TrustpilotStars";
import { BOOKING_URL } from "@/lib/constants";
import agentInbound from "@/assets/characters/agent-inbound.webp";
import agentOutbound from "@/assets/characters/agent-outbound.webp";
import agentScheduler from "@/assets/characters/agent-scheduler-cut.png";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";
import agentSupport from "@/assets/characters/agent-support.webp";

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

interface AgentStep {
  step: string;
  title: string;
  description: string;
}

interface AgentFeatureCard {
  title: string;
  description: string;
}

interface AgentScenario {
  time: string;
  title: string;
  scenario: string;
  result: string;
}

interface AgentData {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  taglineHighlight: string;
  description: string;
  image: string;
  icon: typeof Phone;
  useCases: { title: string; description: string }[];
  features: string[];
  testimonials: AgentTestimonial[];
  taglineBreakBefore?: boolean;
  taglineBreakAfter?: string;
  showDemoCall?: boolean;
  showCallSimulator?: boolean;
  howItWorks?: AgentStep[];
  featureCards?: AgentFeatureCard[];
  scenarios?: AgentScenario[];
}

const agentData: Record<string, AgentData> = {
  aria: {
    slug: "aria",
    name: "ARIA",
    role: "Recepcionista Virtual",
    tagline: "Tu recepcionista que nunca descansa",
    taglineHighlight: "que nunca descansa",
    taglineBreakBefore: true,
    description:
      "ARIA atiende todas las llamadas entrantes de tu empresa con voz natural. Resuelve dudas, transfiere llamadas y agenda citas. Disponible 24/7, sin días malos ni bajas.",
    image: agentInbound,
    icon: Phone,
    showDemoCall: true,
    showCallSimulator: true,
    howItWorks: [
      { step: "01", title: "Entra la llamada", description: "ARIA responde al instante, identifica al interlocutor y detecta el motivo de la llamada en los primeros segundos." },
      { step: "02", title: "ARIA actúa", description: "Agenda la cita, resuelve la duda, informa de horarios o transfiere la llamada al responsable con contexto completo." },
      { step: "03", title: "Todo queda registrado", description: "BYTE transcribe la conversación, CARE programa el seguimiento si es necesario y HALO coordina la respuesta del equipo." },
    ],
    featureCards: [
      { title: "Voz natural", description: "Habla con tus clientes como lo haría una persona real. Sin robótica, sin pausas extrañas. Los clientes no notan la diferencia." },
      { title: "Transferencia inteligente", description: "Detecta a qué persona o departamento debe ir cada llamada y la transfiere con el contexto completo ya explicado." },
      { title: "Agenda automática", description: "Se integra con tu calendario y agenda citas directamente, sin llamadas de ida y vuelta ni intermediarios." },
      { title: "Detección de urgencias", description: "Identifica situaciones críticas y escala inmediatamente al responsable adecuado, sin perder tiempo." },
      { title: "Transcripción completa", description: "Cada llamada queda transcrita y resumida automáticamente. Nada se pierde, todo queda registrado." },
      { title: "Tu tono de empresa", description: "Se configura con el vocabulario, estilo y protocolo de tu negocio. No suena a IA genérica, suena a tu empresa." },
    ],
    scenarios: [
      { time: "22:45h", title: "Un paciente llama fuera de horario", scenario: "La clínica está cerrada. Un paciente angustiado llama por un dolor agudo. Nadie del equipo puede atender.", result: "ARIA atiende, evalúa la urgencia, tranquiliza al paciente y agenda la primera cita disponible para las 8:30h del día siguiente." },
      { time: "13:15h", title: "El teléfono suena y el equipo está ocupado", scenario: "Todo el personal está atendiendo clientes presenciales. El teléfono lleva tres llamadas perdidas en 20 minutos.", result: "ARIA gestionó las tres llamadas: dos agendaron cita y una dejó disponibilidad para que el equipo devuelva la llamada." },
      { time: "Campaña", title: "150 llamadas tras un envío de newsletter", scenario: "Acabas de enviar una oferta a tu base de datos. El teléfono explota. El equipo no puede asumir ese volumen.", result: "ARIA atiende todas en paralelo, responde dudas sobre la oferta y agenda citas para los interesados sin colas ni esperas." },
    ],
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
    tagline: "Tu comercial que nunca para de llamar",
    taglineHighlight: "nunca para de llamar",
    taglineBreakBefore: true,
    description:
      "NOVA llama a tus prospectos, cualifica oportunidades y cierra ventas sin que tu equipo levante el teléfono. Campañas outbound a escala y con seguimiento inteligente.",
    image: agentOutbound,
    icon: PhoneOutgoing,
    howItWorks: [
      { step: "01", title: "Recibe la lista de contactos", description: "NOVA importa los prospectos desde tu CRM o un fichero, verifica los datos y prioriza los contactos con mayor probabilidad de conversión." },
      { step: "02", title: "Llama y cualifica", description: "Presenta la oferta, responde objeciones, detecta el nivel de interés y clasifica cada contacto: listo para cerrar, en seguimiento o descartado." },
      { step: "03", title: "Tu equipo cierra", description: "Los leads cualificados llegan a tu equipo con el contexto completo. Solo tienen que aparecer a la reunión y firmar." },
    ],
    featureCards: [
      { title: "Llamadas a escala", description: "NOVA puede realizar cientos de llamadas al día sin pausas, sin descansos y sin bajones de motivación. Tu pipeline siempre activo." },
      { title: "Cualificación BANT", description: "Detecta presupuesto, autoridad, necesidad y tiempo antes de pasar el lead a tu equipo. Solo llegan oportunidades reales." },
      { title: "Scripts dinámicos", description: "Se adapta en tiempo real a cada respuesta del interlocutor. No sigue un guión rígido, gestiona la conversación con criterio." },
      { title: "Seguimiento automático", description: "Si no contesta, NOVA reintenta en el momento óptimo. Si dice 'llámame la semana que viene', NOVA lo hace. Sin excepciones." },
      { title: "Integración CRM", description: "Sincroniza resultados directamente con tu CRM: estado del lead, notas de la llamada, próxima acción. Tu equipo ve todo actualizado." },
      { title: "Reportes de conversión", description: "Métricas de contactados, cualificados, descartados y cerrados. Sabes exactamente qué está funcionando y qué no." },
    ],
    scenarios: [
      { time: "09:00h", title: "100 leads fríos de una feria", scenario: "Tu equipo recogió 100 tarjetas en una feria. Llevan dos semanas sin contactar porque no hay tiempo. Los leads se enfrían.", result: "NOVA llama a los 100 en la mañana. 34 muestran interés, 12 aceptan una reunión con tu equipo. El pipeline se llena solo." },
      { time: "Campaña", title: "Reactivación de clientes inactivos", scenario: "Tienes 300 clientes que no han comprado en más de 6 meses. Tu equipo no puede dedicarles tiempo, pero tampoco quieres perderlos.", result: "NOVA lanza la campaña: detecta a los 40 con mayor probabilidad de reactivación, les llama con una oferta personalizada y cierra 18 ventas." },
      { time: "15:30h", title: "Lead entra pero el comercial está ocupado", scenario: "Un prospecto rellena el formulario web a las 3 de la tarde. Tu comercial está en reunión hasta las 6. Para entonces, el lead ya está frío.", result: "NOVA llama en menos de 2 minutos, cualifica el interés, resuelve las primeras dudas y agenda la reunión con el comercial para el día siguiente." },
    ],
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
      { quote: "Teníamos 400 leads en el CRM sin contactar desde hacía meses. En una semana NOVA llamó a todos, cualificó 87 y mi equipo cerró 19 contratos. No me lo creía.", name: "Carlos Vega", role: "Director Comercial, SolarTech España", company: "SolarTech España", result: "19 contratos en una semana" },
      { quote: "Mi equipo se resistía al principio: 'una IA no va a poder vender nuestros productos, son complejos'. A los tres días me dijeron que era lo mejor que habíamos implantado.", name: "Marta Sánchez", role: "CEO, Grupo Reformas del Sur", company: "Grupo Reformas del Sur", result: "Equipo convencido en 3 días" },
      { quote: "Antes tardábamos 5 días en contactar a un lead nuevo. Ahora NOVA llama en menos de 2 minutos. La tasa de conversión subió un 34% solo por eso.", name: "Roberto Fuentes", role: "Gerente Comercial, Servicios Industriales Fuentes", company: "Servicios Industriales Fuentes", result: "+34% conversión" },
    ],
  },
  lumi: {
    slug: "lumi",
    name: "LUMI",
    role: "Coordinador de Citas",
    tagline: "El mejor gestor de tu agenda",
    taglineHighlight: "mejor gestor",
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
    taglineHighlight: "transforman decisiones",
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
  care: {
    slug: "care",
    name: "CARE",
    role: "Atención y Satisfacción del Cliente",
    tagline: "Convierte clientes en fans para toda la vida",
    taglineHighlight: "para toda la vida",
    taglineBreakBefore: true,
    taglineBreakAfter: "Convierte",
    description:
      "CARE se encarga del post-venta: hace seguimiento, mide satisfacción, gestiona reclamaciones y fideliza. Detecta a los clientes en riesgo antes de que se vayan y convierte una venta puntual en una relación de años.",
    image: agentSupport,
    icon: HeartHandshake,
    useCases: [
      { title: "Seguimiento post-venta", description: "Llama o escribe por WhatsApp tras cada servicio para confirmar que todo ha ido bien y resolver dudas." },
      { title: "Encuestas de satisfacción (NPS)", description: "Mide la satisfacción de cada cliente y te alerta cuando alguien puntúa bajo, antes de que se queje públicamente." },
      { title: "Gestión de reclamaciones", description: "Recoge la incidencia, la clasifica por urgencia y la escala al responsable adecuado con todo el contexto." },
      { title: "Fidelización y reactivación", description: "Felicitaciones, recordatorios de revisión, ofertas personalizadas y campañas para recuperar clientes inactivos." },
    ],
    features: [
      "Seguimiento automático por llamada y WhatsApp tras cada venta o servicio",
      "Encuestas de satisfacción y NPS con análisis automático",
      "Detección temprana de clientes insatisfechos y alerta a tu equipo",
      "Gestión de reclamaciones con escalado inteligente por gravedad",
      "Recordatorios de revisiones, renovaciones y citas periódicas",
      "Programa de fidelización: felicitaciones, ofertas y reactivación de inactivos",
    ],
    testimonials: [
      { quote: "Antes perdíamos clientes y no sabíamos por qué. CARE llama 3 días después de cada reparación. Ahora detectamos los problemas al momento y los arreglamos antes de que escriban una reseña mala.", name: "Roberto Gil", role: "Gerente, Taller Gil & Hijos", company: "Taller Gil & Hijos", result: "0 reseñas negativas en 4 meses" },
      { quote: "Implementamos CARE para las encuestas post-tratamiento. La tasa de respuesta pasó del 8% (email) al 64% (llamada). Ahora sabemos qué mejorar de verdad.", name: "Lucía Ramos", role: "Directora, Clínica Estética Lumière", company: "Clínica Estética Lumière", result: "Respuesta NPS x8" },
      { quote: "CARE recupera clientes que llevaban más de un año sin venir. El primer mes nos trajo 23 citas de gente que dábamos por perdida. Se paga sola.", name: "Iván Cortés", role: "Propietario, Centro Auditivo Cortés", company: "Centro Auditivo Cortés", result: "23 clientes recuperados/mes" },
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
    if (location.hash) {
      // Wait for lazy sections to mount
      const id = location.hash.replace("#", "");
      const tryScroll = (attempt = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempt < 20) {
          setTimeout(() => tryScroll(attempt + 1), 100);
        }
      };
      tryScroll();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

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

  // Exact same gradients + hsl glow values as Features.tsx home cards
  const agentGradient =
    agent.slug === "aria" ? "linear-gradient(135deg, hsl(190 100% 60%), hsl(175 100% 55%), hsl(210 100% 65%))" :
    agent.slug === "nova" ? "linear-gradient(135deg, hsl(245 100% 70%), hsl(285 100% 65%), hsl(325 100% 65%))" :
    agent.slug === "lumi" ? "linear-gradient(135deg, hsl(170 100% 55%), hsl(150 100% 55%), hsl(95 100% 60%))" :
    agent.slug === "byte" ? "linear-gradient(135deg, hsl(48 100% 62%), hsl(28 100% 60%), hsl(355 100% 65%))" :
                            "linear-gradient(135deg, hsl(340 100% 65%), hsl(355 100% 65%), hsl(20 100% 65%))";

  const agentHsl =
    agent.slug === "aria" ? "190 60% 55%" :
    agent.slug === "nova" ? "260 50% 65%" :
    agent.slug === "lumi" ? "160 50% 48%" :
    agent.slug === "byte" ? "35 70% 58%" :
                            "340 55% 60%";

  const highlight = agent.taglineHighlight;
  const hIdx = agent.tagline.indexOf(highlight);
  const taglineBefore = agent.tagline.slice(0, hIdx);
  const taglineAfter = agent.tagline.slice(hIdx + highlight.length);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onContact={() => setContactOpen(true)} />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 md:pb-20 px-5 md:px-6">
        <div className="container mx-auto">
          <motion.div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl mx-auto" {...fade}>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{agent.name}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-4 tracking-tight text-foreground leading-[1.1]">
                {agent.taglineBreakAfter ? (() => {
                  const idx = taglineBefore.indexOf(agent.taglineBreakAfter!) + agent.taglineBreakAfter!.length;
                  return (
                    <>
                      <span className="md:block">{taglineBefore.slice(0, idx).trim()}</span>
                      <span className="md:block">{taglineBefore.slice(idx).trim()}{" "}</span>
                    </>
                  );
                })() : agent.taglineBreakBefore ? (
                  <span className="block">{taglineBefore.trim()}{" "}</span>
                ) : taglineBefore}
                <span
                  className="bg-clip-text text-transparent whitespace-nowrap"
                  style={{
                    backgroundImage: agentGradient,
                    textShadow: "none",
                    WebkitTextStroke: "0",
                    filter: `drop-shadow(0 -1px 0 hsl(0 0% 100% / 0.15)) drop-shadow(0 1px 0 hsl(0 0% 0% / 0.55)) drop-shadow(0 3px 5px hsl(0 0% 0% / 0.45)) drop-shadow(0 0 12px hsl(${agentHsl} / 0.3))`,
                  }}
                >
                  {highlight}
                </span>
                {taglineAfter}
              </h1>
              <p className="text-foreground/80 max-w-xl text-base md:text-lg font-light mb-6">
                {agent.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                {agent.slug === "aria" ? (
                  <Button
                    size="lg"
                    className="rounded-full px-8 shadow-lg hover:opacity-90 transition-opacity"
                    style={{ background: "#000", color: "transparent" }}
                    onClick={() => window.open(BOOKING_URL, "_blank")}
                  >
                    <span
                      className="bg-clip-text text-transparent flex items-center gap-2"
                      style={{ backgroundImage: agentGradient }}
                    >
                      Solicitar demo
                      <ArrowRight className="h-4 w-4 shrink-0" style={{ color: "hsl(190 100% 60%)" }} />
                    </span>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/20"
                    onClick={() => window.open(BOOKING_URL, "_blank")}
                  >
                    Solicitar demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="shrink-0 relative flex items-center justify-center p-6 md:p-8">
              {(() => {
                const glow =
                  agent.slug === "aria" ? "190 70% 55%" :
                  agent.slug === "nova" ? "260 60% 65%" :
                  agent.slug === "lumi" ? "160 60% 50%" :
                  agent.slug === "byte" ? "35 80% 60%" : "340 65% 60%";
                return (
                  <>
                    {/* Outer aura — smaller scale on mobile */}
                    <div
                      className="absolute inset-0 scale-[2] md:scale-[3] rounded-full blur-3xl pointer-events-none animate-pulse-slow"
                      style={{ background: `radial-gradient(circle, hsl(${glow} / 0.32), hsl(${glow} / 0.08) 45%, transparent 70%)` }}
                    />
                    {/* Inner halo */}
                    <div
                      className="absolute inset-0 scale-[1.4] md:scale-[1.6] rounded-full blur-2xl pointer-events-none"
                      style={{ background: `radial-gradient(circle, hsl(${glow} / 0.45), transparent 65%)` }}
                    />
                    <div
                      className="absolute inset-0 scale-[1.1] md:scale-[1.15] rounded-full pointer-events-none"
                      style={{ boxShadow: `0 0 60px hsl(${glow} / 0.5), inset 0 0 40px hsl(${glow} / 0.2)` }}
                    />
                    <motion.img
                      src={agent.image}
                      alt={agent.name}
                      className="w-48 sm:w-64 md:w-[22rem] lg:w-[26rem] object-contain relative z-10 animate-float-gentle drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                      width={512}
                      height={512}
                      initial={{ opacity: 0, scale: 0, rotate: -12 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.3 }}
                    />
                  </>
                );
              })()}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cómo trabaja — only if howItWorks data exists */}
      {agent.howItWorks && (
        <section className="py-12 md:py-20 px-5 md:px-6 bg-white/[0.03]">
          <div className="container mx-auto max-w-4xl">
            <SectionFade>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
                Cómo trabaja {agent.name}
              </h2>
              <div className="grid sm:grid-cols-3 gap-6 mb-14">
                {agent.howItWorks.map((s, i) => (
                  <motion.div key={i} className="flex flex-col items-center text-center gap-3" {...fade} transition={{ duration: 0.5, delay: i * 0.12 }}>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <span className="font-display font-extrabold text-lg text-primary">{s.step}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground">{s.title}</h3>
                    <p className="text-base text-foreground/70 font-light leading-relaxed">{s.description}</p>
                  </motion.div>
                ))}
              </div>
            </SectionFade>

            {/* Feature cards */}
            {agent.featureCards && (
              <SectionFade>
                <div className="grid sm:grid-cols-2 gap-4">
                  {agent.featureCards.map((fc, i) => (
                    <motion.div key={i} className="bg-card/40 border border-border/20 rounded-xl p-5 flex gap-3" {...fade} transition={{ duration: 0.4, delay: i * 0.08 }}>
                      <CircleDot className="h-4 w-4 text-primary shrink-0 mt-0.5" style={{ color: `hsl(${agentHsl})` }} />
                      <div>
                        <h3 className="font-display font-semibold text-base text-foreground mb-1.5">{fc.title}</h3>
                        <p className="text-sm text-foreground/70 font-light leading-relaxed">{fc.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </SectionFade>
            )}
          </div>
        </section>
      )}

      {/* Features (fallback for agents without featureCards) */}
      {!agent.howItWorks && (
        <section className="py-12 md:py-20 px-5 md:px-6 bg-white/[0.03]">
          <div className="container mx-auto max-w-4xl">
            <SectionFade>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-10">
                Capacidades de {agent.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {agent.features.map((feature, i) => (
                  <motion.div key={i} className="flex items-start gap-3 bg-card/40 border border-border/20 rounded-xl p-4" {...fade} transition={{ duration: 0.4, delay: i * 0.08 }}>
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/85">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </SectionFade>
          </div>
        </section>
      )}

      {/* DemoCall */}
      {agent.showDemoCall && (
        <div className="bg-white/[0.03]">
          <Suspense fallback={<div className="py-20 text-center text-foreground/50">Cargando demo...</div>}>
            <DemoCall />
          </Suspense>
        </div>
      )}

      {/* Scenarios (rich) or Use Cases (fallback) */}
      {agent.scenarios ? (
        <section className="py-12 md:py-20 px-5 md:px-6">
          <div className="container mx-auto max-w-5xl">
            <SectionFade>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-10">
                Un día con {agent.name}
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                {agent.scenarios.map((sc, i) => (
                  <motion.div key={i} className="bg-card/40 border border-border/20 rounded-2xl p-6 flex flex-col gap-4" {...fade} transition={{ duration: 0.5, delay: i * 0.1 }}>
                    <div className="inline-flex items-center bg-card/70 border border-border/30 rounded-full px-3 py-1 self-start">
                      <span className="text-xs font-mono font-bold text-primary">{sc.time}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground leading-snug">{sc.title}</h3>
                    <p className="text-sm text-foreground/65 font-light leading-relaxed flex-1">{sc.scenario}</p>
                    <div className="flex items-start gap-2.5 pt-3 border-t border-border/15">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs text-foreground/80 font-medium leading-snug">{sc.result}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </SectionFade>
          </div>
        </section>
      ) : (
        <section className="py-12 md:py-20 px-5 md:px-6">
          <div className="container mx-auto max-w-5xl">
            <SectionFade>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-10">
                Casos de uso
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {agent.useCases.map((uc, i) => (
                  <motion.div key={i} className="bg-card/40 border border-border/20 rounded-2xl p-6 hover:border-primary/20 transition-all" {...fade} transition={{ duration: 0.5, delay: i * 0.1 }}>
                    <h3 className="text-lg font-bold text-foreground mb-2">{uc.title}</h3>
                    <p className="text-sm text-foreground/70 font-light">{uc.description}</p>
                  </motion.div>
                ))}
              </div>
            </SectionFade>
          </div>
        </section>
      )}

      {agent.showCallSimulator && (
        <Suspense fallback={<div className="py-20 text-center text-foreground/50">Cargando simulador...</div>}>
          <CallSimulator />
        </Suspense>
      )}

      {/* Testimonials */}
      <section className="py-12 md:py-20 px-5 md:px-6 bg-white/[0.03]">
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
                  <div className="text-xs text-foreground/65">{t.role}</div>
                </motion.div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source={`agent-${agentSlug}`} />
    </div>
  );
};

export default AgentPage;
