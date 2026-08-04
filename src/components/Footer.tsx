import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Shield } from "lucide-react";
import heroRobot from "@/assets/hero-robot.webp";
import ContactFormDialog from "@/components/ContactFormDialog";

const Footer = memo(({ onContact }: { onContact?: () => void } = {}) => {
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <footer className="border-t border-border/20 pt-12 md:pt-16 pb-8 px-5 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img loading="lazy" src={heroRobot} alt="CALLA" className="h-8 w-8 object-contain" width={64} height={64} />
              <span className="text-lg font-display font-bold text-foreground tracking-tight">
                CA<span className="text-gradient-blue">LLA</span>
              </span>
            </Link>
            <p className="text-sm text-foreground/80 font-normal leading-relaxed max-w-xs mb-5">
              Automatizamos y digitalizamos la comunicación y procesos de tu empresa.
            </p>
            <a
              href="mailto:contacto@appcalla.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4 shrink-0" />
              contacto@appcalla.com
            </a>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <a href="tel:+34613139734" aria-label="Llamar por teléfono" className="hover:text-foreground transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
              </a>
              <a href="https://wa.me/34613139734" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp" className="text-[#25D366] hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
              <a href="tel:+34613139734" className="hover:text-foreground transition-colors">
                +34 613 139 734
              </a>
            </div>
            <Link
              to="/seguridad"
              className="inline-flex items-center gap-1.5 mt-4 text-xs text-muted-foreground/70 hover:text-muted-foreground border border-border/30 rounded-full px-3 py-2.5 md:py-1.5 transition-colors"
            >
              <Shield className="h-3 w-3" />
              Datos protegidos · RGPD
            </Link>
          </div>

          {/* Producto */}
          <div>
            <h4 className="text-xs font-display font-semibold text-foreground tracking-wider uppercase mb-4">Producto</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Inicio</Link></li>
              <li><Link to="/precios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Precios</Link></li>
              <li><Link to="/equipo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Equipo IA</Link></li>
              <li><Link to="/sectores/automocion" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sectores</Link></li>
              <li><Link to="/resultados" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resultados</Link></li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-xs font-display font-semibold text-foreground tracking-wider uppercase mb-4">Recursos</h4>
            <ul className="space-y-2.5">
              <li><Link to="/preguntas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Preguntas frecuentes</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/caso/edommo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Casos de éxito</Link></li>
              <li>
                <button
                  onClick={() => setContactOpen(true)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-display font-semibold text-foreground tracking-wider uppercase mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><Link to="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Aviso legal</Link></li>
              <li><Link to="/legal#privacidad" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Política de privacidad</Link></li>
              <li><Link to="/legal#cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 pt-6 pb-16 md:pb-0">
          <p className="text-sm text-muted-foreground/70 text-center md:text-left">
            © 2026 App Calla, S.L. · CIF B88969308 · Todos los derechos reservados.
          </p>
        </div>
      </div>

      <ContactFormDialog
        open={contactOpen}
        onOpenChange={setContactOpen}
        source="footer"
        title={<>Contacta con <span className="text-gradient-blue">nosotros</span></>}
        description="¿Tienes alguna pregunta? Escríbenos y te responderemos a la mayor brevedad posible."
        submitLabel="Contacto"
      />
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
