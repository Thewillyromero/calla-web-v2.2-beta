import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";

const NotFound = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => setContactOpen(true)} />

      <section className="pt-32 pb-20 px-5 md:px-6 min-h-[70vh] flex items-center">
        <div className="container mx-auto max-w-2xl text-center">
          <img
            src={agentAnalytics}
            alt=""
            className="w-36 md:w-44 mx-auto mb-8 opacity-90"
            width={512}
            height={512}
          />
          <p className="text-primary/80 font-display text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-medium">
            Error 404
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-4 tracking-tight text-foreground">
            Esta página <span className="text-gradient">no existe</span>
          </h1>
          <p className="text-base md:text-lg text-foreground/80 mb-10 max-w-md mx-auto">
            BYTE lo ha comprobado todo y aquí no hay nada. Puede que el enlace esté mal escrito o que la página haya cambiado de sitio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-7 py-3 font-display font-semibold text-base transition-colors"
            >
              <Home className="h-4 w-4" /> Ir al inicio
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 border border-border/50 hover:border-border text-foreground rounded-full px-7 py-3 font-display font-semibold text-base transition-colors"
            >
              Solicitar demo <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer onContact={() => setContactOpen(true)} />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="404" />
    </div>
  );
};

export default NotFound;
