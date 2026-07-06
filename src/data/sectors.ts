import { Heart, Scale, Building, ShieldCheck, GraduationCap, Wrench, Car, Utensils, Truck, Users, Zap, Plane } from "lucide-react";

export type Sector = {
  slug: string;
  name: string;
  icon: typeof Heart;
  tagline: string;
  description: string;
  heroTitle: string;
  heroHighlight: string;
  chips: string[];
  painPoints: { title: string; description: string }[];
  agents: {
    key: "ARIA" | "NOVA" | "LUMI" | "BYTE" | "CARE";
    use: string;
  }[];
  useCases: {
    time: string;
    title: string;
    scenario: string;
    result: string;
  }[];
  stats: { value: string; label: string; context?: string }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  cta: string;
  capabilities?: {
    iconName: string;
    title: string;
    description: string;
  }[];
  capabilitiesTitle?: string;
  capabilitiesSubtitle?: string;
};

export const sectors: Sector[] = [
  {
    slug: "automocion",
    name: "Automoción",
    icon: Car,
    tagline: "Tu concesionario o taller, siempre al teléfono para el cliente",
    description: "CALLA gestiona llamadas entrantes, agendas de revisiones, seguimiento de presupuestos y campañas de reactivación para concesionarios y talleres. Sin llamadas perdidas, sin clientes que se van a la competencia.",
    heroTitle: "Más ventas y revisiones para tu",
    heroHighlight: "concesionario o taller",
    chips: ["Citas 24/7", "Sin llamadas perdidas", "Clientes que vuelven"],
    painPoints: [
      {
        title: "Llamadas perdidas en el taller",
        description: "Cuando el mecánico está debajo del coche y el mostrador está ocupado, el teléfono suena en el vacío. Ese cliente llama al siguiente taller de la lista."
      },
      {
        title: "Presupuestos que se enfrían",
        description: "El cliente pide un presupuesto, lo recibe y desaparece. Sin seguimiento estructurado, el 60% de los presupuestos nunca se convierten en trabajo."
      },
      {
        title: "Clientes que no vuelven a revisión",
        description: "El coche sale del taller y el cliente no recibe ningún aviso hasta que algo falla. La competencia le capta con una oferta de ITV o revisión anual."
      },
      {
        title: "Picos de demanda que colapsan la agenda",
        description: "En temporada de cambio de neumáticos o revisiones estacionales, las llamadas se multiplican y el equipo no da abasto para atender y agendar a la vez."
      }
    ],
    agents: [
      {
        key: "ARIA",
        use: "Atiende todas las llamadas entrantes del taller o concesionario, informa sobre servicios, precios orientativos y disponibilidad, sin interrumpir el trabajo del equipo."
      },
      {
        key: "LUMI",
        use: "Agenda citas de revisión, cambio de neumáticos, ITV y entrega de vehículos directamente en el calendario del taller, confirmando día y hora al cliente."
      },
      {
        key: "NOVA",
        use: "Llama a clientes con presupuestos pendientes y a vehículos próximos a revisión anual para reactivarlos antes de que vayan a la competencia."
      },
      {
        key: "CARE",
        use: "Hace seguimiento post-servicio para verificar satisfacción, solicitar valoración en Google y recordar la próxima revisión programada."
      }
    ],
    useCases: [
      {
        time: "08:15h",
        title: "Apertura con llamadas acumuladas",
        scenario: "El taller abre a las 8:00h y ya hay cinco llamadas perdidas de la tarde anterior y primera hora de la mañana. El recepcionista aún está preparando el sistema.",
        result: "ARIA ha atendido todas las llamadas, ha tomado nota de los servicios solicitados y ha agendado tres citas para esa misma semana."
      },
      {
        time: "Seguimiento",
        title: "Presupuesto de 800 € sin respuesta",
        scenario: "Un cliente solicitó un presupuesto de cambio de embrague hace cuatro días. No ha llamado ni ha respondido al correo enviado manualmente.",
        result: "NOVA le llama, le recuerda el presupuesto, resuelve su duda sobre el plazo de entrega y cierra la cita para el lunes siguiente."
      },
      {
        time: "Campaña",
        title: "Reactivación de clientes inactivos",
        scenario: "La base de datos del taller tiene 340 clientes que no han pasado en más de 14 meses. El equipo no tiene tiempo para llamarlos uno a uno.",
        result: "NOVA ejecuta la campaña en 48 horas, contacta a todos los clientes y recupera 28 citas de revisión ese mismo mes."
      }
    ],
    stats: [
      { value: "95%", label: "llamadas atendidas", context: "incluso en momentos de máxima ocupación" },
      { value: "40%", label: "más presupuestos cerrados", context: "con seguimiento automático de NOVA" },
      { value: "2,4x", label: "más revisiones recurrentes", context: "gracias a recordatorios de CARE" }
    ],
    testimonial: {
      quote: "Teníamos un problema serio: el taller a tope y el teléfono sin atender. Con CALLA, todas las llamadas se atienden y los clientes ya no se van. Solo en el primer mes recuperamos ocho clientes que llevaban más de un año sin venir.",
      author: "Miquel Torrens",
      role: "Propietario",
      company: "Taller multimarca, Sabadell"
    },
    cta: "Solicitar demo"
  },
  {
    slug: "educacion",
    name: "Educación",
    icon: GraduationCap,
    tagline: "Tu centro educativo, con la agenda siempre llena",
    description: "CALLA gestiona consultas de matrícula, citas con orientadores y seguimiento de familias interesadas para academias, colegios y centros de formación. Sin perder ninguna oportunidad de captación.",
    heroTitle: "Más matrículas y alumnos para tu",
    heroHighlight: "centro educativo",
    chips: ["Atención 24/7", "Seguimiento de familias", "Cero llamadas perdidas", "Gestión de matrículas"],
    painPoints: [
      {
        title: "Familias que preguntan y no vuelven",
        description: "Los padres llaman en enero para el curso siguiente, reciben información y se quedan pensando. Sin seguimiento estructurado, en febrero ya han matriculado al niño en otro centro."
      },
      {
        title: "Picos de demanda en período de matrícula",
        description: "Durante las semanas de apertura de matrícula, el teléfono no para. El personal administrativo no puede atender consultas, preparar documentación y gestionar la matrícula a la vez."
      },
      {
        title: "Jornadas de puertas abiertas mal aprovechadas",
        description: "Las familias se apuntan a la jornada, asisten y muestran interés. Pero nadie hace seguimiento estructurado y la mitad acaba eligiendo otro centro."
      },
      {
        title: "Consultas fuera de horario sin respuesta",
        description: "Los padres llaman por la tarde o el fin de semana, que es cuando tienen tiempo. Si nadie atiende, la consulta se pierde y la familia busca alternativas."
      }
    ],
    agents: [
      {
        key: "ARIA",
        use: "Atiende llamadas de familias interesadas fuera de horario administrativo, informa sobre oferta formativa, precio y proceso de matrícula sin perder ningún contacto."
      },
      {
        key: "LUMI",
        use: "Agenda visitas al centro, reuniones con el orientador y citas de matrícula directamente en el calendario del equipo, sin llamadas de ida y vuelta."
      },
      {
        key: "NOVA",
        use: "Hace seguimiento proactivo de las familias que han pedido información pero no han concretado la matrícula, antes de que se decidan por la competencia."
      },
      {
        key: "CARE",
        use: "Contacta a las familias matriculadas al inicio de curso para resolver dudas, recoger su valoración y detectar necesidades de servicios adicionales."
      }
    ],
    useCases: [
      {
        time: "19:30h",
        title: "Padre interesado fuera de horario",
        scenario: "Un padre llama a las 7:30 de la tarde para preguntar por el programa de inglés intensivo. El centro cerró a las 6:00h y nadie puede atender.",
        result: "ARIA atiende la llamada, explica el programa, resuelve las dudas sobre horarios y precio, y agenda una visita para el jueves siguiente."
      },
      {
        time: "Matrícula",
        title: "40 familias interesadas sin respuesta",
        scenario: "Tras las jornadas de puertas abiertas, 40 familias dejaron sus datos. El equipo administrativo tiene tiempo para llamar a diez, como mucho.",
        result: "NOVA contacta a las 40 familias en 48 horas, cualifica el interés y agenda 22 citas de matrícula ese mismo mes."
      },
      {
        time: "Septiembre",
        title: "Inicio de curso con dudas de familias",
        scenario: "La primera semana de septiembre, las familias nuevas llaman con todo tipo de dudas: horarios de comedor, actividades extraescolares, uniformes.",
        result: "ARIA gestiona el volumen de llamadas sin saturar al personal, resuelve las consultas frecuentes y deriva solo las incidencias reales al equipo."
      }
    ],
    stats: [
      { value: "85%", label: "familias que reciben seguimiento", context: "frente al 20% con gestión manual" },
      { value: "30%", label: "más matrículas por período", context: "gracias al seguimiento estructurado de NOVA" },
      { value: "100%", label: "llamadas atendidas", context: "también fuera de horario administrativo" }
    ],
    testimonial: {
      quote: "Antes de CALLA, perdíamos familias interesadas simplemente porque no teníamos tiempo de llamarlas. Ahora NOVA hace el seguimiento por nosotros y este año hemos subido la matrícula un 28% respecto al anterior. El retorno es evidente.",
      author: "Carmen Villanueva",
      role: "Directora académica",
      company: "Academia de idiomas, Valencia"
    },
    cta: "Solicitar demo"
  },
  {
    slug: "energia",
    name: "Energía",
    icon: Zap,
    tagline: "Incidencias resueltas, clientes sin espera",
    description: "CALLA gestiona altas, bajas, consultas de facturación e incidencias para comercializadoras de energía, instaladores y empresas de utilities. Sin saturar el call center, sin dejar a ningún cliente sin respuesta.",
    heroTitle: "Más eficiencia en atención para tu",
    heroHighlight: "empresa de energía",
    chips: ["Resolución 24/7", "Cero esperas", "Gestión de incidencias", "Reducción de coste"],
    painPoints: [
      {
        title: "Picos de llamadas en período de facturación",
        description: "Cuando salen las facturas, el volumen de llamadas se dispara. Las colas de espera superan los 15 minutos y los clientes cuelgan frustrados antes de ser atendidos."
      },
      {
        title: "Consultas simples que consumen al equipo especializado",
        description: "El 70% de las llamadas son para saber el importe de la factura o el estado de un alta. Ese tiempo se lo roba a incidencias técnicas que sí necesitan un especialista."
      },
      {
        title: "Incidencias sin comunicación proactiva",
        description: "Cuando hay un corte o una avería, los clientes llaman en masa. Sin notificación proactiva, el teléfono se colapsa con llamadas que preguntan lo mismo."
      },
      {
        title: "Alta rotación en el call center",
        description: "Contratar y formar agentes de atención al cliente para el pico de facturación es caro y lento. Y cuando el agente ya sabe el trabajo, se va a otro sitio."
      }
    ],
    agents: [
      {
        key: "ARIA",
        use: "Atiende llamadas de clientes sobre facturación, estado de contratos y consultas frecuentes, resolviendo el 75% sin necesidad de derivar a un agente humano."
      },
      {
        key: "NOVA",
        use: "Llama de forma proactiva a clientes afectados por incidencias o cambios de tarifa para informarles antes de que tengan que llamar ellos."
      },
      {
        key: "BYTE",
        use: "Analiza el volumen y tipo de consultas para detectar patrones, identificar preguntas frecuentes y ayudar al equipo a mejorar los procesos de atención."
      },
      {
        key: "CARE",
        use: "Contacta a clientes que han tenido una incidencia para confirmar que se ha resuelto correctamente y recoger su valoración del servicio."
      }
    ],
    useCases: [
      {
        time: "Facturación",
        title: "Colapso en período de facturación",
        scenario: "El día 15 de cada mes, cuando se emiten las facturas, las llamadas se multiplican por cuatro. Los tiempos de espera superan los 20 minutos y los clientes se quejan en redes sociales.",
        result: "ARIA absorbe el 80% de las llamadas de consulta de facturación de forma inmediata, sin esperas, dejando a los agentes humanos para los casos complejos."
      },
      {
        time: "Avería",
        title: "Corte de suministro en una zona",
        scenario: "Una avería deja sin suministro a 200 clientes en un área durante dos horas. El teléfono de atención se colapsa con llamadas que preguntan por la incidencia.",
        result: "NOVA llama proactivamente a los clientes afectados antes de que llamen ellos, les informa del tiempo estimado de resolución y reduce el volumen de llamadas entrantes un 65%."
      },
      {
        time: "Post-incidencia",
        title: "Verificación de resolución",
        scenario: "Tras resolver una incidencia técnica, el equipo no tiene tiempo de verificar con cada cliente que el servicio ha quedado correctamente restablecido.",
        result: "CARE llama a los 200 clientes afectados en pocas horas, confirma que el suministro está normalizado y recoge su valoración del servicio."
      }
    ],
    stats: [
      { value: "75%", label: "consultas resueltas sin agente humano", context: "en facturación y consultas estándar" },
      { value: "0 min", label: "tiempo de espera", context: "para consultas de facturación y estado de contrato" },
      { value: "50%", label: "reducción del volumen de llamadas entrantes", context: "gracias a la comunicación proactiva de NOVA" }
    ],
    testimonial: {
      quote: "Nuestro call center se saturaba cada mes cuando salían las facturas. Con CALLA, el 75% de las llamadas se resuelven sin intervención humana y nuestros agentes solo atienden los casos que realmente lo necesitan. El coste de atención ha bajado un 40%.",
      author: "Jesús Morales",
      role: "Director de Operaciones",
      company: "Comercializadora de energía, Zaragoza"
    },
    cta: "Solicitar demo"
  },
  {
    slug: "hosteleria",
    name: "Hostelería",
    icon: Utensils,
    tagline: "Tu restaurante o hotel, con la sala siempre llena",
    description: "CALLA gestiona reservas, confirmaciones y seguimiento para restaurantes, hoteles y espacios de eventos. Sin no-shows, sin llamadas perdidas en servicio, sin clientes que se van a la competencia.",
    heroTitle: "Más reservas y menos no-shows para tu",
    heroHighlight: "negocio de hostelería",
    chips: ["Reservas 24/7", "Cero no-shows", "Más clientes recurrentes", "Sin perder ninguna llamada"],
    painPoints: [
      {
        title: "No-shows que vacían la sala",
        description: "Una mesa para cuatro que no aparece un sábado noche son 150 € que no entran. Sin recordatorio automático, el 15-20% de las reservas no se presentan."
      },
      {
        title: "El teléfono suena pero nadie puede cogerlo",
        description: "En el momento del servicio, todo el equipo está en sala o en cocina. Las llamadas de reserva entran y nadie las atiende. Ese cliente reserva en el restaurante de al lado."
      },
      {
        title: "Gestión manual de eventos y grupos",
        description: "Un grupo de 20 personas para una cena de empresa requiere confirmaciones, menús especiales y recordatorios. Gestionar todo esto a mano consume horas del encargado."
      },
      {
        title: "Clientes que vienen una vez y no vuelven",
        description: "Sin seguimiento posterior, el cliente que tuvo una buena experiencia se olvida del restaurante. No hay nada que le invite a volver ni a recomendar."
      }
    ],
    agents: [
      {
        key: "ARIA",
        use: "Atiende llamadas de reserva a cualquier hora, informa sobre disponibilidad, menús y precios, y confirma la reserva directamente en el sistema de gestión del local."
      },
      {
        key: "LUMI",
        use: "Gestiona el libro de reservas, envía recordatorios automáticos 24 horas antes y gestiona cancelaciones y cambios de hora sin necesidad de llamadas manuales."
      },
      {
        key: "NOVA",
        use: "Contacta a clientes de grupos y eventos para confirmar asistencia, recoger preferencias alimentarias y detalles del menú con antelación suficiente."
      },
      {
        key: "CARE",
        use: "Llama o envía mensaje a los clientes después de su visita para recoger su valoración, solicitar reseña en Google y ofrecerles una propuesta para su próxima visita."
      }
    ],
    useCases: [
      {
        time: "22:45h",
        title: "Reserva de última hora un viernes",
        scenario: "Una pareja llama a las 10:45 de la noche para reservar mesa el sábado. El restaurante ya ha cerrado, no hay nadie para atender y el buzón de voz nunca funciona.",
        result: "ARIA atiende la llamada, comprueba disponibilidad en tiempo real y confirma la reserva para el sábado a las 21:30h. La pareja no llama a otro restaurante."
      },
      {
        time: "Recordatorio",
        title: "Reducción de no-shows en fin de semana",
        scenario: "Un viernes hay 18 mesas reservadas para el sábado. Históricamente, 3 o 4 no se presentan. Llamar a cada reserva manualmente lleva más de una hora.",
        result: "LUMI envía recordatorios automáticos el viernes por la tarde. Solo una mesa no confirma, se libera a tiempo y se ocupa con otro cliente de la lista de espera."
      },
      {
        time: "Post-visita",
        title: "Reseñas que no llegan solas",
        scenario: "El restaurante tiene una media de 4,3 estrellas en Google pero lleva meses sin recibir reseñas nuevas, lo que hace perder visibilidad frente a competidores recientes.",
        result: "CARE contacta a los clientes 24 horas después de su visita, recoge su valoración y a los satisfechos les pide directamente una reseña. Las reseñas mensuales se triplican."
      }
    ],
    stats: [
      { value: "70%", label: "reducción de no-shows", context: "con recordatorios automáticos de LUMI" },
      { value: "100%", label: "llamadas atendidas", context: "incluso durante el servicio y fuera de horario" },
      { value: "3x", label: "más reseñas en Google", context: "gracias al seguimiento de CARE" }
    ],
    testimonial: {
      quote: "Los no-shows eran mi pesadilla los fines de semana. Desde que usamos CALLA, casi han desaparecido. Y lo que más me ha sorprendido es que también estamos captando reservas que antes perdíamos porque nadie cogía el teléfono durante el servicio.",
      author: "Rosa Figueras",
      role: "Propietaria",
      company: "Restaurante familiar, Girona"
    },
    cta: "Solicitar demo"
  },
  {
    slug: "inmobiliaria",
    name: "Inmobiliaria",
    icon: Building,
    tagline: "Tu agencia, atendiendo a cada comprador y propietario",
    description: "CALLA gestiona llamadas de compradores, seguimiento de propietarios vendedores y campañas de reactivación para agencias inmobiliarias. Sin perder un lead, sin dejar una operación por falta de seguimiento.",
    heroTitle: "Más operaciones cerradas para tu",
    heroHighlight: "agencia inmobiliaria",
    chips: ["Atención 24/7", "Seguimiento de leads", "Reactivación de propietarios", "Sin llamadas perdidas"],
    painPoints: [
      {
        title: "Leads que se enfrían en 24 horas",
        description: "Un comprador potencial llama por un piso, no hay nadie disponible y deja un mensaje. Para cuando el agente le llama al día siguiente, ya ha visitado dos pisos con otra agencia."
      },
      {
        title: "Propietarios que quieren vender y no saben a quién llamar",
        description: "Muchos propietarios contactan con tres o cuatro agencias a la vez. La que responde primero y hace mejor seguimiento se lleva el encargo exclusivo."
      },
      {
        title: "Agentes con la agenda desorganizada",
        description: "Coordinar visitas, confirmarlas, gestionar cambios de hora y recordar a compradores y propietarios consume más tiempo del que parece. Un olvido puede costar una operación."
      },
      {
        title: "Base de datos inactiva sin aprovechar",
        description: "La agencia tiene cientos de contactos de compradores de años anteriores. Nadie tiene tiempo de llamarles para ver si siguen interesados o si conocen a alguien que quiera vender."
      }
    ],
    agents: [
      {
        key: "ARIA",
        use: "Atiende llamadas de compradores y propietarios en cualquier momento, recoge sus necesidades y disponibilidad, y evita que ningún lead se pierda por falta de respuesta inmediata."
      },
      {
        key: "LUMI",
        use: "Coordina y confirma visitas a inmuebles, gestiona cambios de horario y envía recordatorios automáticos a compradores y propietarios para evitar ausencias."
      },
      {
        key: "NOVA",
        use: "Llama a compradores con búsquedas activas cuando entra un nuevo inmueble que encaja con su perfil, y reactiva contactos inactivos de la base de datos."
      },
      {
        key: "CARE",
        use: "Hace seguimiento post-visita para conocer las impresiones del comprador, detectar objeciones y mantener vivo el interés hasta el cierre de la operación."
      }
    ],
    useCases: [
      {
        time: "20:00h",
        title: "Propietario que quiere vender",
        scenario: "Un propietario llama a las 8 de la tarde para informarse sobre cómo vender su piso. La oficina cerró a las 7:00h. Tiene pensado llamar a tres agencias más.",
        result: "ARIA atiende la llamada, recoge los datos del inmueble y la urgencia del propietario, y agenda una visita de valoración para el día siguiente a primera hora."
      },
      {
        time: "Campaña",
        title: "Reactivación de compradores dormidos",
        scenario: "La base de datos tiene 280 compradores potenciales que consultaron en los últimos dos años. El mercado ha cambiado y muchos podrían estar listos para comprar ahora.",
        result: "NOVA contacta a los 280 en una semana, actualiza sus necesidades y detecta 45 compradores activos que no sabían que la agencia tenía inmuebles de su interés."
      },
      {
        time: "Post-visita",
        title: "Comprador que duda después de ver el piso",
        scenario: "Una pareja visita un piso de 280.000 € y queda bien. Pero no llaman. Sin seguimiento, la duda se convierte en olvido y buscan otras opciones.",
        result: "CARE les llama 48 horas después, recoge sus dudas sobre la hipoteca y el estado del inmueble, y coordina una segunda visita con el agente para cerrar la operación."
      }
    ],
    stats: [
      { value: "95%", label: "leads atendidos en menos de 5 minutos", context: "incluso fuera de horario de oficina" },
      { value: "35%", label: "más visitas confirmadas", context: "con recordatorios automáticos de LUMI" },
      { value: "2x", label: "tasa de cierre de operaciones", context: "con seguimiento estructurado de CARE" }
    ],
    testimonial: {
      quote: "En inmobiliaria, quien responde primero gana. Antes perdíamos operaciones porque el agente estaba en una visita y no podía atender el teléfono. Con CALLA, ningún propietario ni comprador se queda sin respuesta y este trimestre hemos cerrado un 30% más de operaciones.",
      author: "Fernando Alcántara",
      role: "Gerente",
      company: "Agencia inmobiliaria, Málaga"
    },
    cta: "Solicitar demo"
  },
  {
    slug: "legal",
    name: "Legal",
    icon: Scale,
    tagline: "Tu despacho, atendiendo a cada cliente con la misma excelencia",
    description: "CALLA gestiona llamadas de nuevos clientes, agenda primeras consultas y hace seguimiento de casos pendientes para despachos de abogados y gestorías. Sin perder un cliente potencial, sin que ninguna consulta quede sin respuesta.",
    heroTitle: "Más clientes y casos para tu",
    heroHighlight: "despacho jurídico",
    chips: ["Primera consulta 24/7", "Seguimiento de casos", "Sin llamadas perdidas", "Clientes bien informados"],
    painPoints: [
      {
        title: "Clientes potenciales que no consiguen hablar con nadie",
        description: "Alguien con un problema legal urgente llama al despacho. El abogado está en juicio o en consulta. Si no hay nadie que atienda con criterio, el cliente llama al despacho de al lado."
      },
      {
        title: "Tiempo del abogado consumido en gestión",
        description: "Responder consultas telefónicas, confirmar citas, aclarar documentación pendiente y actualizar a clientes sobre el estado de su expediente consume horas que se cobran a tarifa de abogado."
      },
      {
        title: "Clientes que no saben en qué punto está su caso",
        description: "La falta de comunicación proactiva genera ansiedad en el cliente y llamadas innecesarias al despacho. Un cliente bien informado llama menos y confía más."
      },
      {
        title: "Captación dependiente de recomendaciones, sin control",
        description: "La mayoría de los despachos medianos dependen del boca a boca. Sin un sistema de seguimiento de consultas entrantes, muchos casos se pierden antes de la primera reunión."
      }
    ],
    agents: [
      {
        key: "ARIA",
        use: "Atiende llamadas de clientes potenciales, recoge el tipo de problema legal, la urgencia y los datos de contacto, garantizando que ninguna consulta quede sin respuesta."
      },
      {
        key: "LUMI",
        use: "Agenda primeras consultas, reuniones con clientes y vistas en el calendario del abogado, confirmando la cita y recordando la documentación necesaria."
      },
      {
        key: "NOVA",
        use: "Llama a clientes potenciales que solicitaron información pero no concretaron cita, antes de que acudan a otro despacho de la competencia."
      },
      {
        key: "CARE",
        use: "Actualiza a clientes sobre el estado de su expediente, confirma recepción de documentación y gestiona el seguimiento entre fases del caso sin consumir tiempo del abogado."
      }
    ],
    useCases: [
      {
        time: "17:30h",
        title: "Cliente con urgencia laboral",
        scenario: "Un trabajador acaba de recibir una carta de despido y llama angustiado a las 5:30 de la tarde. Los abogados están terminando el día y no hay recepcionista disponible.",
        result: "ARIA atiende la llamada, recoge la situación, tranquiliza al cliente explicando los pasos generales y agenda una primera consulta urgente para la mañana siguiente."
      },
      {
        time: "Seguimiento",
        title: "Consulta que no se convierte en encargo",
        scenario: "Una empresa pidió información sobre una reclamación a un proveedor hace una semana. El abogado no ha tenido tiempo de hacer seguimiento y el cliente no ha vuelto a llamar.",
        result: "NOVA llama al cliente, retoma el interés, resuelve sus dudas sobre honorarios y plazos, y cierra la cita para firmar el encargo de representación."
      },
      {
        time: "En curso",
        title: "Cliente que llama cada semana a preguntar",
        scenario: "Un cliente con un proceso de divorcio largo llama cada semana para saber cómo va su caso. Estas llamadas consumen 30 minutos semanales del abogado sin aportar valor.",
        result: "CARE le llama proactivamente cada vez que hay una novedad en el expediente, reduciéndose las llamadas entrantes del cliente a prácticamente cero."
      }
    ],
    stats: [
      { value: "90%", label: "consultas atendidas en primer contacto", context: "incluso fuera del horario de despacho" },
      { value: "4h", label: "ahorradas por abogado a la semana", context: "en gestión y actualización de clientes" },
      { value: "25%", label: "más encargos cerrados", context: "con seguimiento sistemático de NOVA" }
    ],
    testimonial: {
      quote: "En un despacho pequeño, cuando estás en juicio el teléfono no se atiende. Perdíamos clientes buenos por eso. Con CALLA, todos los que llaman reciben atención inmediata y a los que dudan en contratar los llamamos nosotros antes. Este año hemos crecido un 20% en facturación.",
      author: "Cristina Mendoza",
      role: "Socia directora",
      company: "Despacho de abogados, Bilbao"
    },
    cta: "Solicitar demo"
  },
  {
    slug: "logistica",
    name: "Logística",
    icon: Truck,
    tagline: "Menos llamadas, más entregas a tiempo",
    description: "CALLA gestiona consultas de seguimiento, incidencias y coordinación de entregas para empresas de transporte y logística. Sin colapsar el teléfono, sin dejar a ningún cliente sin información.",
    heroTitle: "Más eficiencia operativa para tu",
    heroHighlight: "empresa de logística",
    chips: ["Seguimiento 24/7", "Incidencias en tiempo real", "Cero llamadas sin respuesta", "Reducción de costes"],
    painPoints: [
      {
        title: "El teléfono de atención siempre saturado",
        description: "El 80% de las llamadas son del tipo: ¿dónde está mi paquete? Estas consultas consumen al equipo de atención y no aportan ningún valor añadido."
      },
      {
        title: "Clientes sin información ante un retraso",
        description: "Cuando un envío se retrasa, el cliente no recibe ningún aviso y llama repetidamente hasta obtener una respuesta. Cada llamada de ese cliente son tres minutos de tu equipo."
      },
      {
        title: "Coordinación de entrega que falla en el último tramo",
        description: "El conductor intenta entregar, no hay nadie, deja un aviso y el proceso se complica. Sin comunicación proactiva con el destinatario, el porcentaje de entregas fallidas dispara los costes."
      },
      {
        title: "Gestión manual de incidencias que escala mal",
        description: "Cuando hay una avería o un retraso masivo, el equipo no puede atender todas las llamadas entrantes a la vez. Los clientes más importantes acaban esperando en cola."
      }
    ],
    agents: [
      {
        key: "ARIA",
        use: "Atiende todas las llamadas de seguimiento de envíos, resuelve consultas de estado y plazos de entrega sin necesidad de intervención del equipo de operaciones."
      },
      {
        key: "NOVA",
        use: "Llama proactivamente al destinatario antes de la entrega para confirmar disponibilidad, reduciendo las entregas fallidas y las costosas repeticiones de visita."
      },
      {
        key: "CARE",
        use: "Notifica a clientes ante retrasos o incidencias antes de que llamen ellos, reduciendo el volumen de llamadas entrantes y gestionando la expectativa."
      },
      {
        key: "BYTE",
        use: "Analiza los patrones de incidencias, los tramos horarios con más consultas y las rutas con más problemas para ayudar al equipo a mejorar la operativa."
      }
    ],
    useCases: [
      {
        time: "Seguimiento",
        title: "100 llamadas en una mañana por el mismo envío",
        scenario: "Un retraso en un centro logístico afecta a 150 envíos de un cliente corporativo. Sus destinatarios empiezan a llamar para preguntar por el estado de sus pedidos.",
        result: "ARIA atiende todas las llamadas de forma inmediata, informa del retraso y el plazo estimado, y desaparece la cola de espera. El equipo puede centrarse en solucionar la incidencia."
      },
      {
        time: "Pre-entrega",
        title: "Reducción de entregas fallidas",
        scenario: "El transportista tiene 40 entregas programadas para la mañana. Históricamente, un 20% fallan porque el destinatario no está. Cada entrega fallida cuesta dinero y tiempo.",
        result: "NOVA llama a los 40 destinatarios la tarde anterior, confirma disponibilidad y reagenda las que no pueden recibir. El porcentaje de entregas fallidas cae al 5%."
      },
      {
        time: "Incidencia",
        title: "Avería de un vehículo en ruta",
        scenario: "Un camión sufre una avería a mitad de ruta. Hay 12 clientes que esperan su entrega hoy. Avisar a todos manualmente lleva más de una hora.",
        result: "CARE notifica a los 12 clientes en minutos, les informa del nuevo plazo y les ofrece reagendar la entrega. Las reclamaciones formales se reducen al mínimo."
      }
    ],
    stats: [
      { value: "80%", label: "consultas de seguimiento resueltas sin agente", context: "gracias a ARIA" },
      { value: "20% → 5%", label: "en entregas fallidas", context: "con confirmación proactiva de NOVA" },
      { value: "40%", label: "menos coste en atención al cliente", context: "al automatizar consultas repetitivas" }
    ],
    testimonial: {
      quote: "Nuestro mayor problema era el teléfono. El 80% de las llamadas eran de seguimiento y saturaban al equipo. Con CALLA, esas llamadas las gestiona el sistema y nuestro equipo se centra en lo que importa. Hemos reducido el coste de atención a la mitad.",
      author: "Andrés Valverde",
      role: "Director de Operaciones",
      company: "Empresa de transporte y logística, Sevilla"
    },
    cta: "Solicitar demo"
  },
  {
    slug: "rrhh",
    name: "Recursos Humanos",
    icon: Users,
    tagline: "Selección más rápida, candidatos mejor filtrados",
    description: "CALLA gestiona la criba inicial, la citación de candidatos y el seguimiento del proceso de selección para departamentos de RRHH y consultoras. Sin candidatos que desaparecen, sin tiempo perdido en perfiles que no encajan.",
    heroTitle: "Más agilidad en la selección para tu",
    heroHighlight: "departamento de RRHH",
    chips: ["Criba automática", "Citas sin llamadas manuales", "Cero ausencias a entrevista", "Proceso más rápido"],
    painPoints: [
      {
        title: "Cientos de candidatos a los que es imposible llamar uno a uno",
        description: "Una oferta de operario de almacén recibe 180 CVs. El equipo puede llamar a 30. Los 150 restantes quedan en el limbo y alguno de ellos era el candidato ideal."
      },
      {
        title: "Tiempo perdido en entrevistas con perfiles no válidos",
        description: "Sin criba telefónica previa, el técnico de selección dedica 45 minutos a un candidato que no cumple un requisito básico que se podría haber detectado en dos preguntas."
      },
      {
        title: "Candidatos que desaparecen entre el CV y la entrevista",
        description: "Entre que el candidato envía el CV y recibe la llamada de citación pasan días. En ese tiempo ha encontrado otro trabajo o simplemente ha perdido el interés."
      },
      {
        title: "Proceso lento que hace perder talento frente a la competencia",
        description: "El buen candidato tiene varias opciones sobre la mesa. La empresa que confirma la oferta antes se lo lleva. Un proceso de selección lento es sinónimo de talento perdido."
      }
    ],
    agents: [
      {
        key: "ARIA",
        use: "Llama a todos los candidatos de una oferta en las primeras 24 horas para realizar la criba inicial con preguntas personalizadas según el perfil buscado."
      },
      {
        key: "LUMI",
        use: "Agenda las entrevistas con los candidatos cualificados directamente en el calendario del técnico de selección, sin llamadas de ida y vuelta."
      },
      {
        key: "NOVA",
        use: "Contacta a candidatos de procesos anteriores cuando se abre una nueva posición que encaja con su perfil, reduciendo el tiempo y coste de captación."
      },
      {
        key: "CARE",
        use: "Envía confirmación de entrevista, recordatorio 24 horas antes y seguimiento post-entrevista para mantener informado al candidato y reducir las ausencias."
      }
    ],
    useCases: [
      {
        time: "Criba",
        title: "180 candidatos, equipo desbordado",
        scenario: "Una oferta para operario de producción recibe 180 solicitudes en 48 horas. El equipo de RRHH tiene capacidad para gestionar 25 candidatos a la vez.",
        result: "ARIA llama a los 180 candidatos en 24 horas, realiza la criba inicial con 5 preguntas clave y presenta 35 candidatos cualificados listos para entrevista al técnico de selección."
      },
      {
        time: "Citación",
        title: "Candidato que no recibe respuesta en 5 días",
        scenario: "Un perfil técnico muy solicitado envía su CV el lunes. El equipo de selección no puede llamarle hasta el viernes. En ese tiempo ha aceptado otra oferta.",
        result: "ARIA le llama el mismo lunes, le confirma que su perfil encaja, realiza la criba inicial y LUMI le agenda entrevista para el miércoles. El candidato no tiene tiempo de irse."
      },
      {
        time: "Entrevista",
        title: "Tres ausencias en una mañana de entrevistas",
        scenario: "Hay seis entrevistas programadas para el martes. Tres candidatos no aparecen sin avisar. El técnico de selección pierde media jornada esperando.",
        result: "CARE envía recordatorio la tarde anterior y confirma asistencia. Solo un candidato no puede venir y avisa con tiempo suficiente para reajustar el calendario."
      }
    ],
    stats: [
      { value: "5x", label: "más candidatos procesados por semana", context: "sin ampliar el equipo de selección" },
      { value: "60%", label: "reducción en tiempo de criba", context: "de semanas a días en procesos complejos" },
      { value: "90%", label: "tasa de asistencia a entrevistas", context: "con recordatorios automáticos de CARE" }
    ],
    testimonial: {
      quote: "Antes tardábamos tres semanas en cerrar una posición de operario. Ahora tardamos una. CALLA llama a todos los candidatos el mismo día que publicamos la oferta y nos presenta los cualificados listos para entrevistar. El talento no se escapa mientras tramitamos el papel.",
      author: "Laura Peinado",
      role: "Responsable de Selección",
      company: "Empresa industrial, Burgos"
    },
    cta: "Solicitar demo"
  },
  {
    slug: "salud",
    name: "Salud",
    icon: Heart,
    tagline: "Tu clínica, siempre disponible para tus pacientes",
    description: "CALLA gestiona citas, confirmaciones y seguimiento para clínicas, centros médicos y consultas. En el sector sanitario, la activación incluye un protocolo reforzado de protección de datos (art. 9 RGPD).",
    heroTitle: "Tu clínica, sin llamadas perdidas ni",
    heroHighlight: "no-shows",
    chips: ["Citas 24/7", "Menos no-shows", "Seguimiento post-consulta", "Protocolo sanitario RGPD"],
    painPoints: [
      {
        title: "No-shows que vacían la agenda",
        description: "Un paciente que no aparece es tiempo del médico perdido para siempre. Sin recordatorio automático, entre el 15% y el 20% de las citas no se presentan."
      },
      {
        title: "El teléfono de citas siempre ocupado o sin atender",
        description: "Durante el horario de consulta, el personal está con los pacientes. Las llamadas de nuevos pacientes entran al contestador o rebotan, y se pierden a la competencia."
      },
      {
        title: "Pacientes que no vuelven tras la primera visita",
        description: "Sin seguimiento estructurado, los pacientes que necesitan revisión o tratamiento continuado se olvidan de pedir cita. La agenda tiene huecos evitables."
      },
      {
        title: "Gestión manual de urgencias fuera de horario",
        description: "Cuando un paciente tiene un problema urgente por la tarde o el fin de semana, no sabe si llamar a urgencias o esperar. La clínica no puede estar disponible 24 horas con personal."
      }
    ],
    agents: [
      {
        key: "ARIA",
        use: "Atiende todas las llamadas entrantes, agenda citas nuevas, resuelve dudas de horarios y precios, y gestiona urgencias fuera del horario de consulta."
      },
      {
        key: "LUMI",
        use: "Gestiona el calendario de citas, envía recordatorios 24 horas antes y gestiona cancelaciones y cambios de hora para mantener la agenda siempre optimizada."
      },
      {
        key: "CARE",
        use: "Contacta a pacientes después de su consulta para verificar que siguen el tratamiento, resolver dudas y recordarles la próxima revisión programada."
      },
      {
        key: "BYTE",
        use: "Analiza los patrones de no-shows, los horarios con más cancelaciones y las especialidades con más demanda para ayudar al centro a optimizar la agenda."
      }
    ],
    useCases: [
      {
        time: "23:00h",
        title: "Paciente con dolor agudo",
        scenario: "Un paciente llama angustiado por un dolor de muelas a las 11 de la noche. La clínica está cerrada, pero necesita orientación y quiere pedir cita urgente.",
        result: "ARIA evalúa la urgencia, tranquiliza al paciente y agenda una cita de urgencia para primera hora del día siguiente. El paciente no acude a urgencias hospitalarias innecesariamente."
      },
      {
        time: "Recordatorio",
        title: "Agenda del lunes llena de no-shows",
        scenario: "El lunes hay 22 citas programadas. Históricamente, 4 o 5 no se presentan. Llamar a todos los pacientes el viernes lleva más de dos horas al personal.",
        result: "LUMI envía recordatorios automáticos el viernes. Solo dos pacientes cancelan, con tiempo suficiente para ofrecer su hueco a pacientes en lista de espera."
      },
      {
        time: "Post-consulta",
        title: "Paciente que abandona el tratamiento",
        scenario: "Un paciente con tratamiento de ortodoncia lleva tres semanas sin pedir la siguiente revisión. Sin seguimiento, puede abandonar el tratamiento y no completar el protocolo.",
        result: "CARE le llama, pregunta cómo lleva el tratamiento, resuelve sus dudas y agenda la revisión. El paciente sigue el protocolo completo y la clínica no pierde ingresos recurrentes."
      }
    ],
    stats: [
      { value: "95%", label: "reducción de no-shows", context: "con recordatorios automáticos de LUMI" },
      { value: "100%", label: "llamadas de cita atendidas", context: "incluso durante las consultas y fuera de horario" },
      { value: "30%", label: "más revisiones completadas", context: "gracias al seguimiento proactivo de CARE" }
    ],
    testimonial: {
      quote: "Antes perdíamos entre el 15% y el 20% de las citas por no-shows y otras tantas porque el teléfono no se atendía durante la consulta. Con CALLA tenemos la agenda llena y el personal puede centrarse en los pacientes, no en el teléfono.",
      author: "Dr. Pablo Ramos",
      role: "Director",
      company: "Clínica dental, Madrid"
    },
    cta: "Solicitar demo"
  },
  {
    slug: "seguros",
    name: "Seguros",
    icon: ShieldCheck,
    tagline: "Más pólizas vendidas, sin más agentes contratados",
    description: "CALLA gestiona llamadas de clientes, agenda citas de asesoramiento y ejecuta campañas de renovación y venta cruzada para agencias de seguros y mediadores. Con un sistema predecible de generación de negocio.",
    heroTitle: "Más pólizas y renovaciones para tu",
    heroHighlight: "agencia de seguros",
    chips: ["Citas de asesoramiento 24/7", "Renovaciones automáticas", "Cross-selling estructurado", "Sin leads perdidos"],
    painPoints: [
      {
        title: "Leads que no contestan el teléfono",
        description: "El cliente dejó sus datos en un comparador a las 11 de la noche. Por la mañana, cuando el agente le llama, ya ha contratado con otra compañía. La velocidad de respuesta lo es todo en seguros."
      },
      {
        title: "Renovaciones que se pierden por falta de seguimiento",
        description: "Una póliza que vence sin que nadie llame al cliente es una póliza perdida. Sin sistema de recordatorios y seguimiento, el porcentaje de renovaciones cae cada año."
      },
      {
        title: "Cross-selling desaprovechado en la cartera existente",
        description: "El cliente que tiene el seguro de coche con la agencia probablemente necesita seguro de hogar, de vida o de empresa. Pero nadie tiene tiempo de llamar a la cartera para explorar oportunidades."
      },
      {
        title: "Escalar sin contratar más agentes",
        description: "Contratar más agentes para gestionar más clientes aumenta los costes fijos. Sin automatización, el crecimiento tiene un techo marcado por la capacidad del equipo."
      }
    ],
    agents: [
      {
        key: "ARIA",
        use: "Atiende llamadas de clientes y prospectos a cualquier hora, recoge sus necesidades y asegura que ningún lead se enfríe por falta de respuesta inmediata."
      },
      {
        key: "LUMI",
        use: "Agenda citas de asesoramiento directamente en el calendario del agente, confirmando disponibilidad y recordando la cita para reducir ausencias."
      },
      {
        key: "NOVA",
        use: "Llama a clientes con pólizas próximas a vencer para iniciar el proceso de renovación, y a la cartera activa para explorar oportunidades de venta cruzada."
      },
      {
        key: "CARE",
        use: "Hace seguimiento de los clientes que han tenido un siniestro reciente para verificar su satisfacción con la gestión y reforzar la relación antes de la renovación."
      }
    ],
    useCases: [
      {
        time: "07:30h",
        title: "Lead del comparador sin respuesta",
        scenario: "A las 11 de la noche, un cliente dejó sus datos en un comparador buscando seguro de coche. El agente no empieza hasta las 9 de la mañana y hay seis leads más en cola.",
        result: "ARIA le llama a las 7:30 de la mañana, recoge sus necesidades, agenda una cita con el agente para las 10:00h y el cliente llega a la reunión con la decisión prácticamente tomada."
      },
      {
        time: "Renovación",
        title: "120 pólizas con vencimiento próximo",
        scenario: "El agente tiene 120 pólizas que vencen en los próximos 30 días. Llamar a todos con tiempo suficiente es materialmente imposible mientras gestiona el día a día.",
        result: "NOVA inicia el proceso de renovación con los 120 clientes, filtra los que quieren seguir, detecta los que están mirando alternativas y agenda reuniones solo con estos últimos."
      },
      {
        time: "Cross-selling",
        title: "Cartera de 400 clientes sin explotar",
        scenario: "La agencia tiene 400 clientes con al menos una póliza. El análisis indica que el 30% podría contratar un seguro adicional, pero nadie ha tenido tiempo de hacer esas llamadas.",
        result: "NOVA ejecuta la campaña en dos semanas, identifica 85 clientes con interés real en pólizas adicionales y los agenda con el agente para la reunión de ampliación."
      }
    ],
    stats: [
      { value: "85%", label: "tasa de renovación de pólizas", context: "con seguimiento proactivo de NOVA" },
      { value: "3x", label: "más citas de asesoramiento por agente", context: "sin aumentar la jornada laboral" },
      { value: "20%", label: "de la cartera con venta cruzada activa", context: "identificado y gestionado automáticamente" }
    ],
    testimonial: {
      quote: "Mis agentes pasaban la mitad del día llamando para renovaciones y no daban abasto. Con CALLA, NOVA se encarga de toda la fase previa de contacto y renovación, y mis agentes solo hablan con quien ya está listo para firmar. Hemos subido el porcentaje de renovaciones del 72% al 88% en seis meses.",
      author: "Jorge Santamaría",
      role: "Director",
      company: "Correduría de seguros, Valladolid"
    },
    cta: "Solicitar demo"
  },
  {
    slug: "servicios",
    name: "Servicios",
    icon: Wrench,
    tagline: "Más trabajos cerrados, sin perder ningún presupuesto",
    description: "CALLA gestiona llamadas de clientes, agendas de visitas y seguimiento de presupuestos para empresas de mantenimiento, instalaciones, limpieza y servicios técnicos. Sin llamadas sin atender, sin presupuestos olvidados.",
    heroTitle: "Más contratos y clientes para tu",
    heroHighlight: "empresa de servicios",
    chips: ["Atención 24/7", "Presupuestos que cierran", "Agenda organizada", "Clientes recurrentes"],
    painPoints: [
      {
        title: "Llamadas perdidas cuando el equipo está en obra",
        description: "El técnico está instalando, el encargado está conduciendo y el teléfono de la empresa suena sin que nadie lo coja. Ese cliente llama a la siguiente empresa del listado."
      },
      {
        title: "Presupuestos que salen pero no se cierran",
        description: "Se va a visitar al cliente, se prepara el presupuesto, se envía y no hay respuesta. Sin seguimiento activo, el 50% de los presupuestos enviados no se convierten en trabajo."
      },
      {
        title: "Agenda sin organizar que genera conflictos",
        description: "Coordinar visitas técnicas, trabajos programados y urgencias en una empresa de servicios sin sistema centralizado genera duplicidades, olvidos y clientes que esperan."
      },
      {
        title: "Clientes puntuales que no repiten",
        description: "El cliente para el que se hizo una instalación no vuelve para el mantenimiento anual porque nadie le ha recordado. Ese servicio de revisión se lo lleva otra empresa."
      }
    ],
    agents: [
      {
        key: "ARIA",
        use: "Atiende llamadas de clientes para solicitar presupuesto, avisar de una avería o consultar el estado de un trabajo, incluso cuando todo el equipo está en campo."
      },
      {
        key: "LUMI",
        use: "Organiza la agenda de visitas técnicas, confirma citas con clientes, gestiona urgencias y distribuye los trabajos evitando solapamientos y desplazamientos innecesarios."
      },
      {
        key: "NOVA",
        use: "Llama a clientes que tienen presupuesto pendiente para resolver sus dudas y cerrar el trabajo antes de que se decidan por otro proveedor."
      },
      {
        key: "CARE",
        use: "Contacta a clientes con servicios de mantenimiento o revisión periódica para recordarles la fecha, confirmar la cita y asegurar la recurrencia del contrato."
      }
    ],
    useCases: [
      {
        time: "11:30h",
        title: "Avería urgente sin nadie para atender",
        scenario: "Un cliente llama por una avería en su local comercial a media mañana. Todos los técnicos están en obra y el encargado está gestionando un presupuesto en otra empresa.",
        result: "ARIA atiende la llamada, recoge la información de la avería y la urgencia, y contacta al técnico más próximo para coordinar la visita ese mismo día."
      },
      {
        time: "Presupuesto",
        title: "Propuesta de 3.500 € sin respuesta en una semana",
        scenario: "Se visitó a una empresa para presupuestar la instalación de aire acondicionado industrial. El presupuesto se envió hace siete días y no hay respuesta.",
        result: "NOVA llama al responsable, detecta que la duda era sobre el plazo de ejecución, lo resuelve y cierra el trabajo para el mes siguiente."
      },
      {
        time: "Mantenimiento",
        title: "Contratos anuales que no se renuevan",
        scenario: "La empresa tiene 60 clientes con contrato de mantenimiento anual. Sin aviso proactivo, muchos no renuevan simplemente porque no han pensado en ello hasta que algo falla.",
        result: "CARE contacta a los 60 clientes un mes antes del vencimiento, confirma la renovación y agenda la visita de revisión anual. La tasa de renovación sube al 90%."
      }
    ],
    stats: [
      { value: "95%", label: "llamadas atendidas", context: "aunque todo el equipo esté en campo" },
      { value: "45%", label: "más presupuestos cerrados", context: "con seguimiento sistemático de NOVA" },
      { value: "90%", label: "tasa de renovación de contratos", context: "con recordatorios proactivos de CARE" }
    ],
    testimonial: {
      quote: "Mi problema era que perdíamos llamadas cuando estábamos en obra y presupuestos que se enviaban y se olvidaban. Con CALLA, todas las llamadas se atienden y NOVA cierra los presupuestos que yo no tenía tiempo de perseguir. Este año hemos facturado un 35% más con el mismo equipo.",
      author: "Tomás Guerrero",
      role: "Gerente",
      company: "Empresa de instalaciones y mantenimiento, Murcia"
    },
    cta: "Solicitar demo"
  },
  {
    slug: "turismo",
    name: "Turismo",
    icon: Plane,
    tagline: "Tu agencia o alojamiento, vendiendo las 24 horas",
    description: "CALLA gestiona consultas, reservas, cambios y seguimiento para agencias de viaje, apartamentos turísticos y operadores. Sin perder una venta fuera de horario, sin gestión manual de cambios y cancelaciones.",
    heroTitle: "Más reservas y clientes fieles para tu",
    heroHighlight: "negocio turístico",
    chips: ["Reservas 24/7", "Gestión de cambios", "Más clientes recurrentes", "Sin llamadas perdidas"],
    painPoints: [
      {
        title: "Consultas fuera de horario que se van a la competencia",
        description: "El cliente que quiere reservar sus vacaciones busca un sábado por la mañana. Si tu agencia no atiende y Booking sí, ya sabes dónde acaba haciendo la reserva."
      },
      {
        title: "Gestión manual de cambios y cancelaciones",
        description: "Cada cambio de vuelo, cada cancelación de hotel y cada modificación de reserva consume 20-30 minutos del agente. En temporada alta, esto colapsa el equipo."
      },
      {
        title: "Clientes que reservan una vez y no vuelven",
        description: "Sin seguimiento post-viaje, el cliente satisfecho no piensa en la agencia hasta que le surge la necesidad. Para entonces ya ha buscado en Google y ha comparado con la competencia."
      },
      {
        title: "Picos de demanda en temporada que superan la capacidad",
        description: "En enero, cuando todo el mundo empieza a planificar el verano, el volumen de consultas se multiplica por tres. El equipo no puede atender todo el tráfico de forma simultánea."
      }
    ],
    agents: [
      {
        key: "ARIA",
        use: "Atiende consultas de viaje, informa sobre destinos, precios y disponibilidad, y recoge los datos del cliente para que el agente humano cierre la reserva con el contexto completo."
      },
      {
        key: "LUMI",
        use: "Gestiona cambios de reserva, modificaciones de fecha y actualizaciones de itinerario, informando al cliente en tiempo real sin necesitar intervención del agente."
      },
      {
        key: "NOVA",
        use: "Llama a clientes que han solicitado presupuesto pero no han confirmado la reserva, y reactiva a clientes de años anteriores cuando se acerca la temporada vacacional."
      },
      {
        key: "CARE",
        use: "Hace seguimiento post-viaje para recoger la valoración del cliente, solicitar reseña y proponerle el próximo destino antes de que empiece a buscar por su cuenta."
      }
    ],
    useCases: [
      {
        time: "Sábado 10:00h",
        title: "Familia buscando vacaciones de verano",
        scenario: "Una familia llama el sábado por la mañana para informarse sobre un viaje organizado al Caribe. La agencia tiene la persiana bajada hasta el lunes.",
        result: "ARIA atiende la llamada, recoge las preferencias de la familia, les informa sobre los paquetes disponibles y agenda una videollamada con el agente para el lunes a las 10:00h."
      },
      {
        time: "Cambio",
        title: "Cancelación masiva por condiciones meteorológicas",
        scenario: "Un operador cancela 15 viajes por condiciones climáticas adversas. Hay que contactar a todos los clientes afectados, informarles y gestionar el rebooking o la devolución.",
        result: "LUMI y ARIA contactan a los 15 clientes en dos horas, les informan de la cancelación, recogen su preferencia entre nueva reserva y devolución, y gestionan el proceso sin colapsar al equipo."
      },
      {
        time: "Post-viaje",
        title: "Cliente que vuelve de luna de miel",
        scenario: "Una pareja acaba de volver de su luna de miel organizada por la agencia. Están felices con el viaje pero nadie les llama para saberlo ni para proponerles el siguiente.",
        result: "CARE les llama a la semana de volver, recoge su valoración, les pide una reseña y les presenta una propuesta para el primer aniversario. El 40% acepta escuchar la oferta."
      }
    ],
    stats: [
      { value: "35%", label: "más reservas fuera de horario laboral", context: "atendidas y cualificadas por ARIA" },
      { value: "2x", label: "tasa de repetición de clientes", context: "con seguimiento post-viaje de CARE" },
      { value: "24/7", label: "disponibilidad comercial", context: "sin coste adicional de personal" }
    ],
    testimonial: {
      quote: "Estábamos perdiendo clientes los fines de semana y en verano, cuando más demanda hay. Con CALLA, los sábados y domingos ya no son días muertos para la agencia. Atendemos todas las consultas y el agente el lunes tiene la agenda llena de clientes que ya saben lo que quieren.",
      author: "Isabel Herrero",
      role: "Propietaria",
      company: "Agencia de viajes, Alicante"
    },
    cta: "Solicitar demo"
  }
];
