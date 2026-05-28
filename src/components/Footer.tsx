import { memo } from "react";
import { Link } from "react-router-dom";
import { Mail, Shield } from "lucide-react";
import heroRobot from "@/assets/hero-robot.webp";

const Footer = memo(({ onContact }: { onContact?: () => void } = {}) => {
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
            <p className="text-sm text-foreground/80 font-light leading-relaxed max-w-xs mb-5">
              Automatizamos y digitalizamos la comunicación y procesos de tu empresa.
            </p>
            <a
              href="mailto:hola@callao.app"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4 shrink-0" />
              hola@callao.app
            </a>
            <Link
              to="/seguridad"
              className="inline-flex items-center gap-1.5 mt-4 text-xs text-muted-foreground/70 hover:text-muted-foreground border border-border/30 rounded-full px-3 py-1.5 transition-colors"
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

        <div className="border-t border-border/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/70">
            © 2026 CALLA. Todos los derechos reservados.
          </p>
          <button
            onClick={() => onContact?.()}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            Contacto →
          </button>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
