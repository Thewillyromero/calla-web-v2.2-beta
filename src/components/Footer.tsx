import { Link } from "react-router-dom";
import heroRobot from "@/assets/hero-robot.webp";
import { BOOKING_URL } from "@/lib/constants";

const Footer = () => {
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
            <p className="text-sm text-muted-foreground/80 font-light leading-relaxed max-w-xs">
              Automatizamos y digitalizamos la comunicación y procesos de tu empresa.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-display font-semibold text-foreground tracking-wider uppercase mb-4">Producto</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Servicios</Link></li>
              <li><Link to="/precios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Precios</Link></li>
              <li><Link to="/equipo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Equipo IA</Link></li>
              <li><Link to="/resultados" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resultados</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-display font-semibold text-foreground tracking-wider uppercase mb-4">Recursos</h4>
            <ul className="space-y-2.5">
              <li><Link to="/preguntas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Preguntas frecuentes</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/caso/edommo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Caso de estudio</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-display font-semibold text-foreground tracking-wider uppercase mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><Link to="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Aviso legal</Link></li>
              <li><Link to="/legal#privacidad" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Política de privacidad</Link></li>
              <li><Link to="/seguridad" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Seguridad</Link></li>
              <li><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/70">
            © 2026 CALLA. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground/65">
            callao.app
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
