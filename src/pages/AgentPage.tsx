import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";

const AgentPage = () => {
  const location = useLocation();
  const [contactOpen, setContactOpen] = useState(false);
  const agentSlug = location.pathname.replace("/", "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onContact={() => setContactOpen(true)} />
      <section className="pt-28 sm:pt-32 pb-20 px-5 md:px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-5 tracking-tight text-foreground uppercase">
            {agentSlug}
          </h1>
          <p className="text-foreground/80 max-w-xl mx-auto text-base md:text-lg font-light">
            Página del agente en construcción.
          </p>
        </div>
      </section>
      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source={`agent-${agentSlug}`} />
    </div>
  );
};

export default AgentPage;
