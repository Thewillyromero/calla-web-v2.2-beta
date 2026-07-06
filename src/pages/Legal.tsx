import { useState, useEffect, createContext, useContext } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";

const TabContext = createContext<(tab: TabId) => void>(() => {});

const tabs = [
  { id: "aviso", label: "Aviso Legal" },
  { id: "privacidad", label: "Privacidad" },
  { id: "cookies", label: "Cookies" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const Legal = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [active, setActive] = useState<TabId>("aviso");

  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = window.location.hash.replace("#", "") as TabId;
    if (["aviso", "privacidad", "cookies"].includes(hash)) setActive(hash);
  }, []);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => setContactOpen(true)} />

      <section className="pt-28 sm:pt-32 pb-16 md:pb-20 px-5 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-lavender/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-brand-teal/[0.04] blur-[100px]" />

        <div className="container mx-auto relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 md:mb-14"
          >
            <p className="text-primary/80 font-display text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-medium">
              Legal
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-5 tracking-tight leading-[1.1]">
              Información <span className="text-gradient">legal</span>
            </h1>
          </motion.div>

          <div className="flex gap-2 mb-8 justify-center flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActive(tab.id);
                  window.history.replaceState(null, "", `#${tab.id}`);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-display font-semibold transition-all duration-300 ${
                  active === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <TabContext.Provider value={(tab: TabId) => { setActive(tab); window.history.replaceState(null, "", `#${tab}`); }}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-6 sm:p-8 lg:p-10"
            >
              {active === "aviso" && <AvisoLegal />}
              {active === "privacidad" && <Privacidad />}
              {active === "cookies" && <Cookies />}
            </motion.div>
          </TabContext.Provider>
        </div>
      </section>

      <Footer onContact={() => setContactOpen(true)} />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="legal" />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Shared components                                                   */
/* ------------------------------------------------------------------ */
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg sm:text-xl font-display font-bold text-foreground mb-3 mt-8 first:mt-0">
    {children}
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-3">
    {children}
  </p>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base font-display font-semibold text-foreground/90 mb-2 mt-5">
    {children}
  </h3>
);

/* ------------------------------------------------------------------ */
/*  Aviso Legal                                                         */
/* ------------------------------------------------------------------ */
const AvisoLegal = () => (
  <div>
    <P>Última actualización: mayo de 2026</P>

    <SectionTitle>1. Datos identificativos</SectionTitle>
    <P>
      En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
      Sociedad de la Información y de Comercio Electrónico (LSSICE), y de la Ley Orgánica
      3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos
      digitales (LOPDGDD), se facilitan los siguientes datos identificativos:
    </P>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-none">
      <li><strong className="text-foreground/80">Denominación social:</strong> App Calla, S.L.</li>
      <li><strong className="text-foreground/80">Nombre comercial:</strong> CALLA</li>
      <li><strong className="text-foreground/80">CIF:</strong> B88969308</li>
      <li><strong className="text-foreground/80">Domicilio social:</strong> Avenida Pérez Galdós 62, Piso 2, Puerta 10, 46008 Valencia</li>
      <li><strong className="text-foreground/80">Registro Mercantil:</strong> Sociedad constituida e inscrita en el Registro Mercantil de Valencia (datos de inscripción —tomo, folio y hoja— pendientes de asignación registral).</li>
      <li><strong className="text-foreground/80">Actividad:</strong> Plataforma de agentes de inteligencia artificial para la automatización de comunicaciones y procesos empresariales</li>
      <li><strong className="text-foreground/80">Email:</strong> contacto@appcalla.com</li>
      <li><strong className="text-foreground/80">Web:</strong> appcalla.com</li>
    </ul>

    <SectionTitle>2. Objeto y ámbito de aplicación</SectionTitle>
    <P>
      El presente sitio web tiene como finalidad informar sobre los servicios ofrecidos por CALLA:
      automatización de comunicaciones mediante agentes de inteligencia artificial, asistentes IA
      a medida y soluciones de digitalización de procesos para empresas. El acceso y uso del sitio
      implica la aceptación del presente aviso legal.
    </P>

    <SectionTitle>3. Propiedad intelectual e industrial</SectionTitle>
    <P>
      Todos los contenidos del sitio web —textos, imágenes, logotipos, diseño gráfico, código fuente,
      denominaciones, marcas y cualquier otro signo distintivo— son propiedad de CALLA o de sus
      legítimos titulares y están protegidos por la legislación española e internacional sobre
      propiedad intelectual e industrial (Real Decreto Legislativo 1/1996 y Ley 17/2001).
      Queda expresamente prohibida su reproducción, distribución, comunicación pública o
      transformación sin autorización escrita previa.
    </P>

    <SectionTitle>4. Condiciones de uso</SectionTitle>
    <P>
      El usuario se compromete a utilizar este sitio web de conformidad con la ley, el presente
      aviso legal, las buenas costumbres y el orden público. En particular, queda prohibido:
    </P>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-disc list-inside">
      <li>Utilizar el sitio con fines ilícitos o contrarios a las presentes condiciones.</li>
      <li>Reproducir, copiar o explotar comercialmente los contenidos sin autorización.</li>
      <li>Introducir virus, malware o cualquier código dañino.</li>
      <li>Intentar acceder sin autorización a sistemas o redes vinculados al sitio.</li>
    </ul>

    <SectionTitle>5. Limitación de responsabilidad</SectionTitle>
    <P>
      CALLA no garantiza la disponibilidad continua del sitio y no se responsabiliza de los daños
      que pudieran derivarse de interrupciones, virus informáticos, averías técnicas o accesos
      no autorizados fuera de su control. Los enlaces a sitios de terceros se facilitan a título
      informativo; CALLA no responde de su contenido ni de su política de privacidad.
    </P>

    <SectionTitle>6. Legislación aplicable y jurisdicción</SectionTitle>
    <P>
      Las presentes condiciones se rigen por la legislación española. Para la resolución de
      cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio
      del usuario, conforme a lo previsto en la normativa vigente de protección de consumidores
      y usuarios (Real Decreto Legislativo 1/2007). Para usuarios de la Unión Europea, la
      Comisión Europea pone a disposición la plataforma de resolución de litigios en línea:{" "}
      <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
        ec.europa.eu/consumers/odr
      </a>.
    </P>
  </div>
);

const CookiesLink = () => {
  const switchTab = useContext(TabContext);
  return (
    <button onClick={() => switchTab("cookies")} className="text-primary hover:underline">
      Política de Cookies
    </button>
  );
};

/* ------------------------------------------------------------------ */
/*  Política de Privacidad                                              */
/* ------------------------------------------------------------------ */
const Privacidad = () => (
  <div>
    <P>Última actualización: mayo de 2026</P>

    <SectionTitle>1. Responsable del tratamiento</SectionTitle>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-none">
      <li><strong className="text-foreground/80">Responsable:</strong> App Calla, S.L. (nombre comercial «CALLA»)</li>
      <li><strong className="text-foreground/80">CIF:</strong> B88969308</li>
      <li><strong className="text-foreground/80">Domicilio social:</strong> Avenida Pérez Galdós 62, Piso 2, Puerta 10, 46008 Valencia</li>
      <li><strong className="text-foreground/80">Email de contacto:</strong> contacto@appcalla.com</li>
      <li><strong className="text-foreground/80">Web:</strong> appcalla.com</li>
    </ul>
    <P>
      Esta política de privacidad se ha redactado conforme al Reglamento (UE) 2016/679 del
      Parlamento Europeo (RGPD), la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de
      Datos Personales y garantía de los derechos digitales (LOPDGDD), y demás normativa
      vigente aplicable.
    </P>

    <SectionTitle>2. Datos recabados y finalidad del tratamiento</SectionTitle>
    <P>Los datos personales recabados a través de este sitio web se tratan con las siguientes finalidades:</P>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-disc list-inside">
      <li>Gestión de consultas, solicitudes de información y contacto comercial.</li>
      <li>Prestación, gestión y facturación de los servicios contratados.</li>
      <li>Envío de comunicaciones comerciales sobre nuestros productos y servicios (solo con consentimiento previo y expreso).</li>
      <li>Cumplimiento de obligaciones legales aplicables.</li>
    </ul>

    <SectionTitle>3. Base legal del tratamiento</SectionTitle>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-disc list-inside">
      <li><strong className="text-foreground/80">Consentimiento del interesado</strong> — art. 6.1.a RGPD: para el envío de comunicaciones comerciales y el uso de cookies no esenciales.</li>
      <li><strong className="text-foreground/80">Ejecución de un contrato</strong> — art. 6.1.b RGPD: para la prestación de los servicios contratados y medidas precontractuales.</li>
      <li><strong className="text-foreground/80">Cumplimiento de obligación legal</strong> — art. 6.1.c RGPD: cuando la normativa fiscal, laboral o mercantil así lo exija.</li>
      <li><strong className="text-foreground/80">Interés legítimo</strong> — art. 6.1.f RGPD: para la gestión interna y mejora de servicios, siempre que no prevalezcan los derechos del interesado.</li>
    </ul>

    <SectionTitle>4. Destinatarios y encargados del tratamiento</SectionTitle>
    <P>
      No se cederán datos a terceros salvo obligación legal. Los datos podrán ser tratados por
      encargados del tratamiento que actúan bajo nuestras instrucciones y con las garantías
      adecuadas, en particular:
    </P>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-disc list-inside">
      <li>Proveedores de infraestructura cloud y bases de datos (alojamiento de la plataforma).</li>
      <li>Herramientas de comunicación y CRM para la gestión de clientes.</li>
      <li>Proveedores de servicios de inteligencia artificial para el procesamiento de conversaciones.</li>
      <li>Plataformas de analítica web para la mejora del sitio (con su consentimiento previo).</li>
    </ul>

    <SectionTitle>5. Transferencias internacionales de datos</SectionTitle>
    <P>
      Algunos de nuestros proveedores tecnológicos tienen sede o procesan datos fuera del
      Espacio Económico Europeo (EEE). En estos casos, las transferencias se realizan bajo
      las garantías previstas en el RGPD, en particular mediante Cláusulas Contractuales
      Tipo (CCT) aprobadas por la Comisión Europea, o en países con decisión de adecuación
      reconocida. Puede solicitar información sobre las garantías concretas aplicables
      escribiendo a contacto@appcalla.com.
    </P>

    <SectionTitle>6. Conservación de datos</SectionTitle>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-disc list-inside">
      <li><strong className="text-foreground/80">Solicitudes recibidas a través de la web:</strong> 1 año desde la solicitud. <strong className="text-foreground/80">Datos de contactos comerciales sin conversión:</strong> 24 meses desde el último contacto.</li>
      <li><strong className="text-foreground/80">Datos contractuales:</strong> durante la vigencia del contrato y, posteriormente, 6 años conforme al Código de Comercio y 4 años conforme a la normativa fiscal (Ley General Tributaria).</li>
      <li><strong className="text-foreground/80">Datos tratados por consentimiento:</strong> hasta que el interesado revoque su consentimiento.</li>
      <li><strong className="text-foreground/80">Grabaciones de llamadas:</strong> el plazo aplicable se indicará en el contrato de servicio correspondiente.</li>
    </ul>

    <SectionTitle>7. Decisiones automatizadas y elaboración de perfiles</SectionTitle>
    <P>
      CALLA ofrece servicios basados en inteligencia artificial que pueden implicar el procesamiento
      automatizado de datos para analizar conversaciones, clasificar consultas o generar respuestas.
      En ningún caso se tomarán decisiones automatizadas que produzcan efectos jurídicos
      significativos sobre el interesado sin intervención humana, salvo que sea necesario para la
      ejecución de un contrato o exista consentimiento expreso, conforme al artículo 22 del RGPD.
      El interesado puede solicitar revisión humana de cualquier decisión automatizada escribiendo
      a contacto@appcalla.com.
    </P>

    <SectionTitle>8. Derechos del interesado</SectionTitle>
    <P>
      Puede ejercer los siguientes derechos dirigiéndose a{" "}
      <a href="mailto:contacto@appcalla.com" className="text-primary hover:underline">contacto@appcalla.com</a>,
      acompañando copia de su documento de identidad:
    </P>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-disc list-inside">
      <li><strong className="text-foreground/80">Acceso:</strong> conocer qué datos personales tratamos sobre usted.</li>
      <li><strong className="text-foreground/80">Rectificación:</strong> corregir datos inexactos o completar los incompletos.</li>
      <li><strong className="text-foreground/80">Supresión («derecho al olvido»):</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
      <li><strong className="text-foreground/80">Portabilidad:</strong> recibir sus datos en formato estructurado y legible por máquina.</li>
      <li><strong className="text-foreground/80">Oposición:</strong> oponerse al tratamiento basado en interés legítimo o con fines de marketing directo.</li>
      <li><strong className="text-foreground/80">Limitación:</strong> solicitar la restricción del tratamiento en determinadas circunstancias.</li>
      <li><strong className="text-foreground/80">No ser objeto de decisiones automatizadas:</strong> solicitar intervención humana en procesos de decisión automatizada (art. 22 RGPD).</li>
    </ul>
    <P>
      Responderemos a su solicitud en el plazo máximo de un mes (prorrogable a tres en casos complejos).
      Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección
      de Datos (
      <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
        www.aepd.es
      </a>
      ).
    </P>

    <SectionTitle>9. Seguridad</SectionTitle>
    <P>
      CALLA implementa medidas técnicas y organizativas apropiadas conforme al estado de la
      técnica para garantizar un nivel de seguridad adecuado al riesgo, incluyendo cifrado de
      datos, control de accesos, auditorías periódicas y protocolos de respuesta ante incidentes.
      En caso de brecha de seguridad que pueda afectar a sus derechos, le notificaremos en los
      plazos establecidos por el RGPD.
    </P>

    <SectionTitle>10. Cookies</SectionTitle>
    <P>
      Para información detallada sobre el uso de cookies, consulte nuestra{" "}
      <CookiesLink />.
    </P>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Política de Cookies                                                 */
/* ------------------------------------------------------------------ */
const Cookies = () => (
  <div>
    <P>Última actualización: mayo de 2026. Redactada conforme a la Guía sobre el uso de las cookies de la AEPD (mayo 2024) y las Directrices 03/2022 del Comité Europeo de Protección de Datos.</P>

    <SectionTitle>1. ¿Qué son las cookies?</SectionTitle>
    <P>
      Las cookies son pequeños archivos de texto que se almacenan en su dispositivo al visitar
      un sitio web. Permiten que el sitio recuerde sus acciones y preferencias durante un período
      determinado, mejorando su experiencia de navegación.
    </P>

    <SectionTitle>2. Cookies que utilizamos</SectionTitle>
    <P>
      Este sitio web utiliza únicamente cookies técnicas propias, necesarias para el correcto
      funcionamiento de sus funcionalidades. No se utilizan cookies analíticas, publicitarias
      ni de terceros. Por este motivo, conforme al artículo 22.2 de la LSSICE, no es necesario
      el consentimiento previo del usuario.
    </P>
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm text-muted-foreground border border-border/20 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-secondary/30">
            <th className="text-left p-3 font-display font-semibold text-foreground/80 text-xs">Cookie</th>
            <th className="text-left p-3 font-display font-semibold text-foreground/80 text-xs">Finalidad</th>
            <th className="text-left p-3 font-display font-semibold text-foreground/80 text-xs">Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border/10">
            <td className="p-3 font-mono text-xs">calla_demo_calls</td>
            <td className="p-3 text-xs">Limitar el número de demos de llamada por día para garantizar la calidad del servicio</td>
            <td className="p-3 text-xs">24 horas</td>
          </tr>
          <tr className="border-t border-border/10">
            <td className="p-3 font-mono text-xs">sidebar:state</td>
            <td className="p-3 text-xs">Recordar el estado del menú de navegación lateral</td>
            <td className="p-3 text-xs">7 días</td>
          </tr>
        </tbody>
      </table>
    </div>
    <P>
      Adicionalmente, el sitio utiliza <strong className="text-foreground/80">localStorage</strong> del navegador
      para almacenar la sesión del chat y la autenticación de usuario. Esta tecnología no instala
      cookies y no está sujeta a la normativa de cookies, si bien los datos permanecen en su
      dispositivo hasta que borre los datos de navegación.
    </P>

    <SectionTitle>3. Cómo gestionar las cookies</SectionTitle>
    <P>
      Puede configurar su navegador para bloquear o eliminar las cookies en cualquier momento.
      Instrucciones por navegador:
    </P>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-disc list-inside">
      <li>
        <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Google Chrome
        </a>
      </li>
      <li>
        <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Mozilla Firefox
        </a>
      </li>
      <li>
        <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Safari
        </a>
      </li>
      <li>
        <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Microsoft Edge
        </a>
      </li>
    </ul>
    <P>
      Tenga en cuenta que la desactivación de cookies técnicas puede afectar al funcionamiento
      del sitio web.
    </P>

    <SectionTitle>5. Incorporación de nuevas cookies en el futuro</SectionTitle>
    <P>
      Si en el futuro se incorporan cookies analíticas, publicitarias o de terceros, esta política
      se actualizará y se implementará un banner de consentimiento conforme a la Guía de la AEPD.
      Le recomendamos revisar esta política periódicamente.
    </P>
  </div>
);

export default Legal;
