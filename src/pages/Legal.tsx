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
        {/* Background blurs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-lavender/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-brand-teal/[0.04] blur-[100px]" />

        <div className="container mx-auto relative z-10 max-w-3xl">
          {/* Header */}
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

          {/* Tabs */}
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

          {/* Content */}
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
/*  Aviso Legal                                                        */
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

const AvisoLegal = () => (
  <div>
    <SectionTitle>1. Datos identificativos</SectionTitle>
    <P>
      En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
      Sociedad de la Información y de Comercio Electrónico (LSSICE), se informan los
      siguientes datos:
    </P>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-none">
      <li><strong className="text-foreground/80">Titular:</strong> CALLA (nombre comercial)</li>
      <li><strong className="text-foreground/80">Actividad:</strong> Plataforma de asistentes de voz con inteligencia artificial</li>
      <li><strong className="text-foreground/80">Email:</strong> hola@callao.app</li>
      <li><strong className="text-foreground/80">Web:</strong> callao.app</li>
    </ul>
    <P>
      Datos mercantiles en proceso de inscripción. Este aviso se actualizará con los
      datos registrales una vez completado el proceso.
    </P>

    <SectionTitle>2. Objeto</SectionTitle>
    <P>
      El presente sitio web tiene como finalidad informar sobre los servicios ofrecidos por CALLA,
      facilitar el contacto con los usuarios interesados y la contratación de los servicios
      de asistentes de voz con inteligencia artificial.
    </P>

    <SectionTitle>3. Propiedad intelectual e industrial</SectionTitle>
    <P>
      Todos los contenidos del sitio web (textos, imágenes, logotipos, diseño gráfico,
      código fuente, software) son propiedad de CALLA o de sus legítimos titulares y
      están protegidos por las leyes de propiedad intelectual e industrial. Queda prohibida
      su reproducción, distribución o transformación sin autorización expresa.
    </P>

    <SectionTitle>4. Condiciones de uso</SectionTitle>
    <P>
      El usuario se compromete a utilizar el sitio web de conformidad con la ley, el presente aviso
      legal y las buenas costumbres. El uso indebido del contenido podrá dar lugar a las
      acciones legales oportunas.
    </P>

    <SectionTitle>5. Limitación de responsabilidad</SectionTitle>
    <P>
      CALLA no se responsabiliza de los daños que pudieran derivarse de interferencias,
      interrupciones, virus informáticos, averías o desconexiones en el funcionamiento
      del sistema electrónico, así como de los daños causados por terceros mediante
      intromisiones ilegítimas fuera de nuestro control.
    </P>

    <SectionTitle>6. Legislación aplicable y jurisdicción</SectionTitle>
    <P>
      Las presentes condiciones se rigen por la legislación española. Para cualquier
      controversia que pudiera surgir, las partes se someten a los juzgados y tribunales del
      domicilio del usuario, de conformidad con la legislación vigente.
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
/*  Política de Privacidad                                      */
/* ------------------------------------------------------------------ */
const Privacidad = () => (
  <div>
    <SectionTitle>1. Responsable del tratamiento</SectionTitle>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-none">
      <li><strong className="text-foreground/80">Responsable:</strong> CALLA</li>
      <li><strong className="text-foreground/80">Email de contacto:</strong> hola@callao.app</li>
      <li><strong className="text-foreground/80">Web:</strong> callao.app</li>
    </ul>

    <SectionTitle>2. Finalidad del tratamiento</SectionTitle>
    <P>
      Los datos personales recabados a través de este sitio web serán tratados con las
      siguientes finalidades:
    </P>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-disc list-inside">
      <li>Gestión de consultas y solicitudes de información.</li>
      <li>Prestación de los servicios contratados.</li>
      <li>Envío de comunicaciones comerciales (solo con consentimiento previo).</li>
    </ul>

    <SectionTitle>3. Legitimación</SectionTitle>
    <P>
      La base legal para el tratamiento de sus datos es:
    </P>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-disc list-inside">
      <li>El consentimiento del interesado (art. 6.1.a RGPD).</li>
      <li>La ejecución de un contrato o medidas precontractuales (art. 6.1.b RGPD).</li>
      <li>El interés legítimo del responsable (art. 6.1.f RGPD).</li>
    </ul>

    <SectionTitle>4. Destinatarios</SectionTitle>
    <P>
      No se cederán datos a terceros salvo obligación legal. Los datos podrán
      ser tratados por proveedores de servicios (encargados del tratamiento) que actúan bajo
      nuestras instrucciones y con las garantías adecuadas.
    </P>

    <SectionTitle>5. Derechos del interesado</SectionTitle>
    <P>
      Puede ejercer los siguientes derechos dirigiéndose a{" "}
      <a href="mailto:hola@callao.app" className="text-primary hover:underline">hola@callao.app</a>:
    </P>
    <ul className="text-sm text-muted-foreground font-light leading-relaxed mb-4 space-y-1.5 list-disc list-inside">
      <li><strong className="text-foreground/80">Acceso:</strong> conocer qué datos personales tratamos.</li>
      <li><strong className="text-foreground/80">Rectificación:</strong> modificar datos inexactos o incompletos.</li>
      <li><strong className="text-foreground/80">Supresión:</strong> solicitar la eliminación de sus datos.</li>
      <li><strong className="text-foreground/80">Portabilidad:</strong> recibir sus datos en formato estructurado.</li>
      <li><strong className="text-foreground/80">Oposición:</strong> oponerse al tratamiento de sus datos.</li>
      <li><strong className="text-foreground/80">Limitación:</strong> solicitar la limitación del tratamiento.</li>
    </ul>
    <P>
      Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de
      Protección de Datos (
      <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
        www.aepd.es
      </a>
      ).
    </P>

    <SectionTitle>6. Conservación de datos</SectionTitle>
    <P>
      Los datos se conservarán mientras dure la relación contractual y, una vez
      finalizada, durante los plazos legalmente establecidos. Los datos recabados por consentimiento
      se conservarán hasta que el interesado lo revoque.
    </P>

    <SectionTitle>7. Seguridad</SectionTitle>
    <P>
      CALLA adopta las medidas técnicas y organizativas necesarias para garantizar la
      seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o
      acceso no autorizado.
    </P>

    <SectionTitle>8. Cookies</SectionTitle>
    <P>
      Para información sobre el uso de cookies, consulte nuestra{" "}
      <CookiesLink />.
    </P>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Política de Cookies                                         */
/* ------------------------------------------------------------------ */
const Cookies = () => (
  <div>
    <SectionTitle>1. ¿Qué son las cookies?</SectionTitle>
    <P>
      Las cookies son pequeños archivos de texto que se almacenan en su dispositivo al visitar
      un sitio web. Permiten que el sitio recuerde sus acciones y preferencias durante un periodo de
      tiempo.
    </P>

    <SectionTitle>2. Cookies que utilizamos</SectionTitle>

    <h3 className="text-base font-display font-semibold text-foreground/90 mb-2 mt-5">
      Cookies técnicas (necesarias)
    </h3>
    <P>
      Son imprescindibles para el funcionamiento del sitio web. Permiten la navegación y el
      uso de las funcionalidades básicas. No requieren consentimiento.
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
            <td className="p-3 font-mono text-xs">session_id</td>
            <td className="p-3 text-xs">Mantener la sesión del usuario</td>
            <td className="p-3 text-xs">Sesión</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 className="text-base font-display font-semibold text-foreground/90 mb-2 mt-5">
      Cookies analíticas (opcionales)
    </h3>
    <P>
      Nos permiten analizar el uso del sitio web para mejorar su funcionamiento. Requieren su
      consentimiento previo.
    </P>
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm text-muted-foreground border border-border/20 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-secondary/30">
            <th className="text-left p-3 font-display font-semibold text-foreground/80 text-xs">Cookie</th>
            <th className="text-left p-3 font-display font-semibold text-foreground/80 text-xs">Proveedor</th>
            <th className="text-left p-3 font-display font-semibold text-foreground/80 text-xs">Finalidad</th>
            <th className="text-left p-3 font-display font-semibold text-foreground/80 text-xs">Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border/10">
            <td className="p-3 font-mono text-xs">_ga</td>
            <td className="p-3 text-xs">Google Analytics</td>
            <td className="p-3 text-xs">Distinguir usuarios únicos</td>
            <td className="p-3 text-xs">2 años</td>
          </tr>
          <tr className="border-t border-border/10">
            <td className="p-3 font-mono text-xs">_ga_*</td>
            <td className="p-3 text-xs">Google Analytics</td>
            <td className="p-3 text-xs">Mantener estado de sesión</td>
            <td className="p-3 text-xs">2 años</td>
          </tr>
        </tbody>
      </table>
    </div>

    <SectionTitle>3. Cómo gestionar las cookies</SectionTitle>
    <P>
      Puede configurar su navegador para bloquear o eliminar las cookies. A continuación, los
      enlaces de ayuda de los principales navegadores:
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
      Tenga en cuenta que la desactivación de cookies puede afectar al funcionamiento del
      sitio web.
    </P>

    <SectionTitle>4. Actualización de la política</SectionTitle>
    <P>
      Esta política de cookies puede actualizarse periódicamente. Le recomendamos
      revisarla de forma habitual. Última actualización: abril 2026.
    </P>
  </div>
);

export default Legal;
