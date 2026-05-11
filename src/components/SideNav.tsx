import { House, Phone, PhoneOutgoing, CalendarCheck, BarChart3, HeartHandshake, CreditCard, Shield, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { BOOKING_URL } from "@/lib/constants";

const links = [
  { label: "Home", icon: House, path: "/" },
  { label: "ARIA", icon: Phone, path: "/aria" },
  { label: "NOVA", icon: PhoneOutgoing, path: "/nova" },
  { label: "LUMI", icon: CalendarCheck, path: "/lumi" },
  { label: "BYTE", icon: BarChart3, path: "/byte" },
  { label: "CARE", icon: HeartHandshake, path: "/care" },
  { label: "Precios", icon: CreditCard, path: "/precios" },
  { label: "Seguridad", icon: Shield, path: "/seguridad" },
  { label: "Contacto", icon: Mail, path: BOOKING_URL, external: true },
] as const;

const SideNav = () => {
  const location = useLocation();

  return (
    <nav
      className="fixed left-0 top-4 z-40 hidden lg:flex flex-col
        w-12 hover:w-48 overflow-hidden
        bg-background/60 backdrop-blur-lg border border-border/20 border-l-0
        rounded-r-xl shadow-lg shadow-black/10
        opacity-40 hover:opacity-100
        transition-all duration-300 ease-in-out
        py-3 gap-0.5"
    >
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.path;
        const isExternal = "external" in link && link.external;

        const className = `flex items-center gap-3 px-3.5 py-2.5 text-sm whitespace-nowrap transition-colors ${
          isActive
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        }`;

        if (isExternal) {
          return (
            <a
              key={link.label}
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="truncate">{link.label}</span>
            </a>
          );
        }

        return (
          <Link key={link.label} to={link.path} className={className}>
            <Icon className="h-5 w-5 shrink-0" />
            <span className="truncate">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SideNav;
