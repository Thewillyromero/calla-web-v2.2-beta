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

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  result: string;
  context: string;
  avatar: string;
  caseStudyUrl?: string;
};

export const testimonials: Testimonial[] = [
  { quote: "Te soy sincero: al principio me daba miedo que mis pacientes se sintieran 'atendidos por una máquina'. Pero es que no lo notan. Me llaman diciendo 'qué maja la chica que me cogió el teléfono ayer'.", name: "Dr. Sergio López", role: "Director", company: "Clínica Dental López", initials: "SL", result: "Pacientes no lo notan", context: "Dental", avatar: avatarSergio },
  { quote: "Mi mayor miedo era perder el trato cercano con los clientes. Resulta que CALLA es más amable y paciente que cualquier recepcionista que haya tenido. Y no tiene días malos.", name: "Elena García", role: "Directora", company: "Inmobiliaria Mediterráneo", initials: "EG", result: "Mejor trato que humanos", context: "Inmobiliaria", avatar: avatarElena },
  { quote: "Llevaba meses mirando soluciones de IA y siempre pensaba 'esto no va a funcionar en mi sector'. Me equivocaba. En una semana ya estaba agendando citas sola, sin un solo error.", name: "Marta Jiménez", role: "Socia Directora", company: "Fernández & Asociados Abogados", initials: "MJ", result: "0 errores primera semana", context: "Despacho legal", avatar: avatarMarta },
  { quote: "Mis clientes tienen 60-70 años de media. Pensaba que no iban a aceptar hablar con una IA. Pero la voz es tan natural que ni lo cuestionan. Solo dicen 'qué bien me atendieron'.", name: "Jorge Navarro", role: "Propietario", company: "Restaurante La Brasa", initials: "JN", result: "Clientes mayores encantados", context: "Hostelería", avatar: avatarJorge },
  { quote: "Pensaba que era caro hasta que calculé lo que me costaba perder 8 llamadas al día. Cada llamada perdida era un cliente potencial que se iba a la competencia. CALLA cuesta menos que una mañana de recepcionista.", name: "Roberto Méndez", role: "Propietario", company: "Taller Méndez e Hijos", initials: "RM", result: "Más barato que perder clientes", context: "Taller mecánico", avatar: avatarRoberto },
  { quote: "Mi equipo se resistía: '¿una IA va a hacer nuestro trabajo?'. A los dos días me dijeron 'esto es lo mejor que has hecho'. Ahora se dedican a cerrar ventas en vez de contestar teléfonos.", name: "Carlos Vega", role: "Director Comercial", company: "SolarTech España", initials: "CV", result: "Equipo convencido en 2 días", context: "Energía solar", avatar: avatarCarlos },
  { quote: "CALLA ha transformado nuestra clínica. Antes perdíamos 10-15 llamadas al día porque la recepcionista no daba abasto. Ahora no se pierde ni una y las citas se agendan solas.", name: "Patricia Ruiz", role: "Gerente", company: "Centro Médico Salud Plus", initials: "PR", result: "0 llamadas perdidas", context: "Centro médico", avatar: avatarPatricia },
  { quote: "We hired 3 separate teams to find the best fit, and Guillermo stood out above all of them. What surprised us most was how seamlessly they handled everything in English — you'd never guess they're a Spanish team. Over 300K€ in new revenue generated.", name: "Tim Michael Bissonnette", role: "CEO", company: "Direct Public Funding", initials: "TB", result: "300K€+ generados", context: "Finanzas", avatar: avatarTim },
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
  { quote: "In just 14 days we generated 7.200€ in new customers. The automated follow-up calls were the key to closing. And honestly, working with a European team that speaks perfect English gave us a fresh perspective we didn't expect.", name: "Michael Torres", role: "Propietario", company: "Advanced Plumbing", initials: "MT", result: "7.200€ en 14 días", context: "Servicios", avatar: avatarMichael },
  { quote: "Nuestra academia recibe consultas de padres a todas horas. CALLA les da la información, resuelve dudas sobre horarios y matricula directamente. Matriculaciones subieron un 40%.", name: "Sofía Herrero", role: "Directora", company: "Academia Herrero", initials: "SH", result: "+40% matriculaciones", context: "Educación", avatar: avatarSofia },
  { quote: "En la primera semana cerramos 5.000€ en ventas solo con los leads que nos generaron. Y lo mejor: el equipo detrás tiene una estrategia de crecimiento que nos está cambiando el negocio.", name: "Director Regional", role: "Franquiciado", company: "Tutor Doctor", initials: "DR", result: "5.000€ primera semana", context: "Educación", avatar: avatarDirector },
];
