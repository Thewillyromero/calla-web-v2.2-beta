import { Phone, PhoneOutgoing, CalendarCheck, BarChart3, HeartHandshake } from "lucide-react";
import agentInbound from "@/assets/characters/agent-inbound.webp";
import agentOutbound from "@/assets/characters/agent-outbound.webp";
import agentScheduler from "@/assets/characters/agent-scheduler-cut.png";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";
import agentSupport from "@/assets/characters/agent-support.webp";

export type Agent = {
  slug: string;
  name: string;
  icon: typeof Phone;
  image: string;
  personality: string;
  title: string;
  description: string;
  color: string;
  hsl: string;
  features: string[];
  howItWorks: { step: string; description: string }[];
  useCases: { sector: string; example: string }[];
  cta: string;
  hasDemo: boolean;
};

export const agents: Agent[] = [
  {
    slug: "aria",
    name: "ARIA",
    icon: Phone,
    image: agentInbound,
    personality: "Tu recepcionista virtual",
    title: "Atiende todas tus llamadas, 24 horas al día",
    description: "ARIA contesta cada llamada entrante con una voz natural. Identifica lo que necesita el cliente, agenda citas, toma mensajes y transfiere llamadas urgentes a tu equipo. Como una recepcionista que nunca descansa.",
    color: "brand-teal",
    hsl: "190 60% 55%",
    features: [
      "Contesta todas las llamadas al primer tono, incluidos festivos y noches",
      "Identifica qué necesita el cliente y lo gestiona automáticamente",
      "Agenda citas directamente en tu calendario sin intervención humana",
      "Transfiere a una persona real cuando detecta urgencia",
      "Habla en español e inglés con voz natural",
      "Toma mensajes detallados cuando tu equipo no está disponible",
    ],
    howItWorks: [
      { step: "Conectamos tu número", description: "Vinculamos tu número de teléfono actual. Sin cambiar nada en tu empresa." },
      { step: "Configuramos ARIA", description: "Adaptamos el asistente a tu negocio: servicios, horarios, equipo, preguntas frecuentes." },
      { step: "Empieza a atender", description: "ARIA comienza a contestar llamadas inmediatamente. Tú supervisas desde tu panel." },
    ],
    useCases: [
      { sector: "Clínicas", example: "Un paciente llama a las 22h para pedir cita. ARIA le agenda para el día siguiente." },
      { sector: "Inmobiliarias", example: "Un comprador llama preguntando por un piso. ARIA le da la información y programa una visita." },
      { sector: "Industria", example: "Un proveedor llama para confirmar un pedido. ARIA toma nota y avisa al responsable." },
      { sector: "Despachos", example: "Un cliente llama con una consulta urgente. ARIA la identifica y transfiere al abogado de guardia." },
    ],
    cta: "Probar ARIA en vivo",
    hasDemo: true,
  },
  {
    slug: "nova",
    name: "NOVA",
    icon: PhoneOutgoing,
    image: agentOutbound,
    personality: "Tu equipo comercial automatizado",
    title: "Llama a tus clientes potenciales por ti",
    description: "NOVA realiza campañas de llamadas salientes de forma automática. Contacta con los leads, cualifica prospectos, agenda reuniones con tu equipo comercial y hace seguimiento. Como tener 10 comerciales trabajando a la vez.",
    color: "brand-lavender",
    hsl: "260 50% 65%",
    features: [
      "Lanza campañas de llamadas salientes a listas de contactos",
      "Cualifica prospectos con preguntas predefinidas",
      "Agenda reuniones directamente en el calendario de tu equipo comercial",
      "Detecta contestador automático y reintenta en otro momento",
      "Captura datos estructurados de cada conversación",
      "Hasta 3 llamadas simultáneas por línea",
    ],
    howItWorks: [
      { step: "Subes tu lista de contactos", description: "Un CSV con nombres y teléfonos. Nosotros limpiamos y validamos los datos." },
      { step: "Configuramos la campaña", description: "Definimos el mensaje, horarios, número de intentos y criterios de cualificación." },
      { step: "NOVA empieza a llamar", description: "Lanza llamadas automáticas y te reporta los resultados en tiempo real." },
    ],
    useCases: [
      { sector: "Energía solar", example: "NOVA llama a 500 empresas para ofrecer un estudio de ahorro energético. Agenda 40 visitas en una semana." },
      { sector: "Seguros", example: "NOVA contacta con clientes con pólizas por renovar. Confirma datos y agenda cita con el agente." },
      { sector: "Formación", example: "NOVA llama a leads interesados en un curso. Cualifica por presupuesto y disponibilidad." },
      { sector: "Servicios B2B", example: "NOVA hace seguimiento de propuestas enviadas. Detecta interés y agenda cierre con el comercial." },
    ],
    cta: "Ver cómo funciona NOVA",
    hasDemo: false,
  },
  {
    slug: "lumi",
    name: "LUMI",
    icon: CalendarCheck,
    image: agentScheduler,
    personality: "Tu agenda inteligente",
    title: "Organiza citas y pedidos sin que tú intervengas",
    description: "LUMI gestiona tu calendario de forma autónoma. Agenda citas, envía confirmaciones, manda recordatorios y reagenda no-shows. Tu agenda se llena sola, sin solapamientos ni errores.",
    color: "brand-emerald",
    hsl: "160 50% 48%",
    features: [
      "Sincroniza con Google Calendar, Outlook y los principales CRM",
      "Agenda citas comprobando disponibilidad en tiempo real",
      "Envía confirmación automática por WhatsApp o email",
      "Recordatorios 24h y 1h antes de cada cita",
      "Reagenda automáticamente cuando alguien no se presenta",
      "Evita solapamientos y dobles reservas",
    ],
    howItWorks: [
      { step: "Conectamos tu calendario", description: "Vinculamos Google Calendar, Outlook o el sistema que uses. Sin cambiar tu forma de trabajar." },
      { step: "Definimos reglas", description: "Horarios disponibles, duración de citas, margen entre citas, tipos de servicio." },
      { step: "LUMI se encarga", description: "Cada vez que alguien quiere cita, LUMI la agenda, confirma y recuerda. Tú solo apareces." },
    ],
    useCases: [
      { sector: "Salud", example: "Un paciente llama pidiendo cita. LUMI comprueba huecos, agenda y envía confirmación por WhatsApp." },
      { sector: "Estética", example: "LUMI gestiona 50 citas al día entre 3 profesionales sin un solo solapamiento." },
      { sector: "Talleres", example: "Un cliente llama para dejar el coche. LUMI encuentra hueco, lo apunta y envía recordatorio." },
      { sector: "Consultoría", example: "LUMI agenda reuniones de 1 hora con margen de 15 min, sincronizadas con tu equipo." },
    ],
    cta: "Ver cómo funciona LUMI",
    hasDemo: false,
  },
  {
    slug: "byte",
    name: "BYTE",
    icon: BarChart3,
    image: agentAnalytics,
    personality: "Tu analista de datos",
    title: "Métricas de cada llamada, en tiempo real",
    description: "BYTE analiza todas las conversaciones y te da métricas claras: cuántas llamadas se atienden, duración media, tasa de resolución, motivos de llamada y mucho más. Sabrás exactamente qué pasa con tu atención telefónica.",
    color: "brand-amber",
    hsl: "35 70% 58%",
    features: [
      "Panel de métricas en tiempo real accesible desde cualquier dispositivo",
      "Transcripción automática de cada llamada",
      "Análisis de motivos y resultados: sabe por qué llaman tus clientes y cómo termina cada llamada",
      "Identifica patrones: horas pico, motivos de llamada más frecuentes, objeciones",
      "Informes semanales automáticos por email",
      "Transcripciones de llamadas (30 días) para revisión y mejora",
    ],
    howItWorks: [
      { step: "Se activa automáticamente", description: "BYTE analiza cada llamada que gestiona ARIA o NOVA. No tienes que hacer nada." },
      { step: "Consulta tu panel", description: "Entra en tu dashboard y ve las métricas del día, semana o mes." },
      { step: "Recibe informes", description: "Cada lunes recibes un resumen por email con lo más importante." },
    ],
    useCases: [
      { sector: "Call centers", example: "BYTE detecta que los martes a las 11h hay un pico de llamadas. Ajustas recursos." },
      { sector: "Comercial", example: "BYTE identifica que el 60% de las objeciones son por precio. Cambias el guion." },
      { sector: "Dirección", example: "El CEO ve en su móvil cuántas llamadas se atendieron hoy sin preguntar a nadie." },
      { sector: "Calidad", example: "BYTE marca las llamadas no resueltas o con incidencia para que el equipo las revise." },
    ],
    cta: "Ver el panel de BYTE",
    hasDemo: false,
  },
  {
    slug: "care",
    name: "CARE",
    icon: HeartHandshake,
    image: agentSupport,
    personality: "Tu servicio posventa",
    title: "Cuida a tus clientes después de la venta",
    description: "CARE gestiona el seguimiento post-venta, encuestas de satisfacción, recordatorios y fidelización. Convierte clientes puntuales en clientes de por vida.",
    color: "brand-rose",
    hsl: "340 55% 60%",
    features: [
      "Seguimiento post-venta automatizado por WhatsApp y llamada",
      "Encuestas de satisfacción después de cada servicio",
      "Recordatorios de revisiones, renovaciones y citas periódicas",
      "Detecta clientes insatisfechos y alerta a tu equipo antes de perderlos",
      "Programa de fidelización: felicitaciones, ofertas personalizadas",
      "Gestión de reclamaciones con escalado inteligente",
    ],
    howItWorks: [
      { step: "Se activa después de cada venta", description: "CARE detecta automáticamente cuándo un cliente ha completado un servicio o compra." },
      { step: "Hace seguimiento personalizado", description: "Contacta al cliente por WhatsApp o llamada para comprobar su satisfacción." },
      { step: "Fideliza y recupera", description: "Programa recordatorios, ofertas y detecta riesgo de pérdida antes de que ocurra." },
    ],
    useCases: [
      { sector: "Talleres", example: "CARE llama al cliente 3 días después de la reparación para comprobar que todo va bien." },
      { sector: "Clínicas", example: "CARE envía recordatorio de revisión anual por WhatsApp. El paciente confirma y LUMI agenda la cita." },
      { sector: "Seguros", example: "CARE contacta a clientes 30 días antes del vencimiento. El 70% renueva sin intervención humana." },
      { sector: "Inmobiliarias", example: "CARE hace seguimiento post-escritura y genera referidos de clientes satisfechos." },
    ],
    cta: "Ver cómo funciona CARE",
    hasDemo: false,
  },
];
