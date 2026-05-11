import { House, Users, PhoneCall, CreditCard, Shield, Mail, ChevronDown, Phone, PhoneOutgoing, CalendarCheck, BarChart3, HeartHandshake, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { BOOKING_URL } from "@/lib/constants";

const teamLinks = [
  { label: "ARIA", icon: Phone, path: "/aria" },
  { label: "NOVA", icon: PhoneOutgoing, path: "/nova" },
  { label: "LUMI", icon: CalendarCheck, path: "/lumi" },
  { label: "BYTE", icon: BarChart3, path: "/byte" },
  { label: "CARE", icon: HeartHandshake, path: "/care" },
  { label: "HALO", icon: Sparkles, path: "/equipo" },
] as const;

const SideNav = () => {
  const location = useLocation();
  const [teamOpen, setTeamOpen] = useState(
    teamLinks.some((l) => location.pathname === l.path)
  );

  const itemClass = (active: boolean) =>
    `flex items-center gap-3 px-3.5 py-2.5 text-sm whitespace-nowrap transition-colors ${
      active
        ? "text-primary bg-primary/10"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
    }`;

  const isActive = (path: string) => location.pathname === path;
  const teamActive = teamLinks.some((l) => isActive(l.path));

  return (
    <nav
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col
        w-12 hover:w-52 overflow-hidden
        bg-background/60 backdrop-blur-lg border border-border/20 border-l-0
        rounded-r-xl shadow-lg shadow-black/10
        opacity-40 hover:opacity-100
        transition-all duration-300 ease-in-out
        py-3 gap-0.5
        group/nav"
    >
      <Link
        to="/"
        onClick={(e) => {
          if (location.pathname === "/") {
            e.preventDefault();
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={itemClass(isActive("/"))}
      >
        <House className="h-5 w-5 shrink-0" />
        <span className="truncate">Home</span>
      </Link>

      {/* Probar ARIA — destacado */}
      <Link
        to="/aria#demo"
        className={`flex items-center gap-3 px-3.5 py-2.5 text-sm whitespace-nowrap transition-colors text-primary hover:bg-primary/15`}
      >
        <PhoneCall className="h-5 w-5 shrink-0" />
        <span className="truncate font-semibold">Probar ARIA</span>
      </Link>

      {/* Equipo (expandable) */}
      <button
        onClick={() => setTeamOpen((v) => !v)}
        className={`${itemClass(teamActive)} w-full justify-between`}
      >
        <span className="flex items-center gap-3">
          <Users className="h-5 w-5 shrink-0" />
          <span className="truncate">Equipo</span>
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 opacity-0 group-hover/nav:opacity-100 ${
            teamOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {teamOpen && (
        <div className="flex flex-col gap-0.5 pl-2 border-l border-border/20 ml-5 hidden group-hover/nav:flex">
          {teamLinks.map((l) => {
            const Icon = l.icon;
            return (
              <Link key={l.label} to={l.path} className={itemClass(isActive(l.path))}>
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate text-xs">{l.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      <Link
        to="/precios#calculadora"
        className={itemClass(isActive("/precios"))}
        title="Incluye calculadora de gastos"
      >
        <span className="relative shrink-0">
          <CreditCard className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground leading-none shadow-sm shadow-primary/40">
            *
          </span>
        </span>
        <span className="truncate">
          Precios
          <span className="ml-1 text-[10px] text-primary font-bold">*</span>
        </span>
      </Link>
      <Link to="/seguridad" className={itemClass(isActive("/seguridad"))}>
        <Shield className="h-5 w-5 shrink-0" />
        <span className="truncate">Seguridad</span>
      </Link>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass(false)}
      >
        <Mail className="h-5 w-5 shrink-0" />
        <span className="truncate">Contacto</span>
      </a>
    </nav>
  );
};

export default SideNav;
