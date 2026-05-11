import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Chatbot from "./components/Chatbot.tsx";
import SideNav from "./components/SideNav.tsx";
import ScrollProgress from "./components/ScrollProgress.tsx";
import { LiveMetricsProvider } from "@/contexts/LiveMetricsContext";

const Pricing = lazy(() => import("./pages/Pricing.tsx"));
const SectorPage = lazy(() => import("./pages/SectorPage.tsx"));
const Legal = lazy(() => import("./pages/Legal.tsx"));
const CaseStudy = lazy(() => import("./pages/CaseStudy.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const AgentPage = lazy(() => import("./pages/AgentPage.tsx"));
const Results = lazy(() => import("./pages/Results.tsx"));
const Questions = lazy(() => import("./pages/Questions.tsx"));
const Security = lazy(() => import("./pages/Security.tsx"));
const SquadWorkflow = lazy(() => import("./pages/SquadWorkflow.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="hidden lg:block"><SideNav /></div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/precios" element={<Suspense fallback={<div className="py-20" />}><Pricing /></Suspense>} />
          <Route path="/sectores/:slug" element={<Suspense fallback={<div className="py-20" />}><SectorPage /></Suspense>} />
          <Route path="/legal" element={<Suspense fallback={<div className="py-20" />}><Legal /></Suspense>} />
          <Route path="/caso/edommo" element={<Suspense fallback={<div className="py-20" />}><CaseStudy /></Suspense>} />
          <Route path="/blog" element={<Suspense fallback={<div className="py-20" />}><Blog /></Suspense>} />
          <Route path="/blog/:slug" element={<Suspense fallback={<div className="py-20" />}><BlogPost /></Suspense>} />
          <Route path="/aria" element={<Suspense fallback={<div className="py-20" />}><AgentPage /></Suspense>} />
          <Route path="/nova" element={<Suspense fallback={<div className="py-20" />}><AgentPage /></Suspense>} />
          <Route path="/lumi" element={<Suspense fallback={<div className="py-20" />}><AgentPage /></Suspense>} />
          <Route path="/byte" element={<Suspense fallback={<div className="py-20" />}><AgentPage /></Suspense>} />
          <Route path="/care" element={<Suspense fallback={<div className="py-20" />}><AgentPage /></Suspense>} />
          <Route path="/equipo" element={<Suspense fallback={<div className="py-20" />}><SquadWorkflow /></Suspense>} />
          <Route path="/resultados" element={<Suspense fallback={<div className="py-20" />}><Results /></Suspense>} />
          <Route path="/preguntas" element={<Suspense fallback={<div className="py-20" />}><Questions /></Suspense>} />
          <Route path="/seguridad" element={<Suspense fallback={<div className="py-20" />}><Security /></Suspense>} />
{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollProgress />
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
