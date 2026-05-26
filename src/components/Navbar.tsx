import { Menu, X, ChevronDown, Phone, PhoneOutgoing, CalendarCheck, BarChart3, HeartHandshake, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroRobot from "@/assets/hero-robot.webp";
import { sectors } from "@/data/sectors";
import { BOOKING_URL } from "@/lib/constants";

interface NavbarProps {
  onContact?: () => void;
}

const agentLinks = [
  { name: "ARIA", subtitle: "Recepcionista", icon: Phone,         path: "/aria",   hsl: "190 70% 55%" },
  { name: "NOVA", subtitle: "Ventas",         icon: PhoneOutgoing, path: "/nova",   hsl: "260 60% 65%" },
  { name: "LUMI", subtitle: "Citas",          icon: CalendarCheck, path: "/lumi",   hsl: "160 50% 48%" },
  { name: "BYTE", subtitle: "Analítica",      icon: BarChart3,     path: "/byte",   hsl: "35 70% 58%"  },
  { name: "CARE", subtitle: "Post-Venta",     icon: HeartHandshake,path: "/care",   hsl: "340 55% 60%" },
  { name: "HALO", subtitle: "Orquestación",   icon: Sparkles,      path: "/equipo", hsl: "220 12% 62%" },
];

const Navbar = ({ onContact }: NavbarProps = {}) => {
  const [open, setOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [mobileTeamOpen, setMobileTeamOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const teamRef = useRef<HTMLDivElement>(null);
  const sectorsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (teamRef.current && !teamRef.current.contains(e.target as Node)) {
        setTeamOpen(false);
      }
      if (sectorsRef.current && !sectorsRef.current.contains(e.target as Node)) {
        setSectorsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openBooking = () => {
    if (onContact) {
      onContact();
      return;
    }

    window.open(BOOKING_URL, "_blank");
  };

  return (
    <nav
      style={scrolled ? { backgroundColor: "hsl(240 10% 4% / 0.97)" } : {}}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl border-b border-border/30 shadow-xl shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5"
        >
          <img src={heroRobot} alt="CALLA" className="h-8 w-8 object-contain" width={64} height={64} />
          <span className="text-xl font-display font-bold text-foreground tracking-tight">
            CA<span className="text-gradient-blue">LLA</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {/* Nuestro equipo dropdown */}
          <div ref={teamRef} className="relative">
            <button
              onClick={() => { setTeamOpen(!teamOpen); setSectorsOpen(false); }}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white hover:text-white/80 transition-colors rounded-lg hover:bg-white/10"
            >
              Nuestro equipo
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${teamOpen ? "rotate-180" : ""}`} />
            </button>
            {teamOpen && (
              <div style={{ backgroundColor: "hsl(240 8% 6%)" }} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[260px] backdrop-blur-2xl border border-border/40 rounded-xl p-2 shadow-2xl shadow-black/50 animate-in fade-in-0 zoom-in-95 duration-200">
                {agentLinks.map((a) => {
                  const Icon = a.icon;
                  return (
                    <Link
                      key={a.name}
                      to={a.path}
                      onClick={() => setTeamOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/80 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Icon className="h-4 w-4 shrink-0" style={{ color: `hsl(${a.hsl})` }} />
                      <div>
                        <span className="font-semibold text-white">{a.name}</span>
                        <span className="text-foreground/60 ml-1.5">{a.subtitle}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sectores dropdown */}
          <div ref={sectorsRef} className="relative">
            <button
              onClick={() => { setSectorsOpen(!sectorsOpen); setTeamOpen(false); }}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white hover:text-white/80 transition-colors rounded-lg hover:bg-white/10"
            >
              Sectores
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${sectorsOpen ? "rotate-180" : ""}`} />
            </button>
            {sectorsOpen && (
              <div style={{ backgroundColor: "hsl(240 8% 6%)" }} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] backdrop-blur-2xl border border-border/40 rounded-xl p-2 shadow-2xl shadow-black/50 animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="grid grid-cols-3 grid-rows-4 grid-flow-col gap-0.5">
                  {[...sectors].sort((a, b) => a.name.localeCompare(b.name, "es")).map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.slug}
                        to={`/sectores/${s.slug}`}
                        onClick={() => setSectorsOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-foreground/80 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <Icon className="h-4 w-4 text-primary shrink-0" />
                        {s.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link to="/resultados" className="px-4 py-2 text-sm font-medium text-white hover:text-white/80 transition-colors rounded-lg hover:bg-white/10">
            Resultados
          </Link>
          <Link to="/precios" className="px-4 py-2 text-sm font-medium text-white hover:text-white/80 transition-colors rounded-lg hover:bg-white/10">
            Precios
          </Link>
          <Link to="/seguridad" className="px-4 py-2 text-sm font-medium text-white hover:text-white/80 transition-colors rounded-lg hover:bg-white/10">
            Seguridad
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 shadow-lg shadow-primary/20"
            onClick={openBooking}
          >
            Solicitar demo
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-border/30 px-6 py-5 flex flex-col gap-1">
          {/* Nuestro equipo */}
          <button
            onClick={() => setMobileTeamOpen(!mobileTeamOpen)}
            className="flex items-center justify-between py-2.5 text-sm font-medium text-white"
          >
            Nuestro equipo
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileTeamOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileTeamOpen && (
            <div className="pl-4 flex flex-col gap-1 pb-2">
              {agentLinks.map((a) => {
                const Icon = a.icon;
                return (
                  <Link
                    key={a.name}
                    to={a.path}
                    onClick={() => { setOpen(false); setMobileTeamOpen(false); }}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: `hsl(${a.hsl})` }} />
                    {a.name} — {a.subtitle}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Sectores */}
          <button
            onClick={() => setMobileSectorsOpen(!mobileSectorsOpen)}
            className="flex items-center justify-between py-2.5 text-sm font-medium text-white"
          >
            Sectores
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileSectorsOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileSectorsOpen && (
            <div className="pl-4 flex flex-col gap-1 pb-2">
              {sectors.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.slug}
                    to={`/sectores/${s.slug}`}
                    onClick={() => { setOpen(false); setMobileSectorsOpen(false); }}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                    {s.name}
                  </Link>
                );
              })}
            </div>
          )}

          <Link to="/resultados" className="py-2.5 text-sm font-medium text-white" onClick={() => setOpen(false)}>
            Resultados
          </Link>
          <Link to="/precios" className="py-2.5 text-sm font-medium text-white" onClick={() => setOpen(false)}>
            Precios
          </Link>
          <Link to="/seguridad" className="py-2.5 text-sm font-medium text-white" onClick={() => setOpen(false)}>
            Seguridad
          </Link>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full mt-3 shadow-lg shadow-primary/20"
            onClick={() => { setOpen(false); openBooking(); }}
          >
            Solicitar demo
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
