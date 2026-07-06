import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import heroRobot from "@/assets/hero-robot.webp";
import { TURNSTILE_SITE_KEY } from "@/lib/constants";

// Carga el script de Turnstile una sola vez
let turnstileScriptLoading: Promise<void> | null = null;
function loadTurnstile(): Promise<void> {
  if ((window as any).turnstile) return Promise.resolve();
  if (turnstileScriptLoading) return turnstileScriptLoading;
  turnstileScriptLoading = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("No se pudo cargar Turnstile"));
    document.head.appendChild(s);
  });
  return turnstileScriptLoading;
}

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
  title?: React.ReactNode;
  description?: string;
  submitLabel?: string;
}

const ContactFormDialog = ({ open, onOpenChange, source = "general", title, description, submitLabel }: ContactFormDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef<number>(Date.now());
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => { if (open) openedAt.current = Date.now(); }, [open]);

  // Renderiza el widget de Turnstile al abrir el diálogo
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        const ts = (window as any).turnstile;
        if (cancelled || !ts || !captchaRef.current || widgetId.current) return;
        widgetId.current = ts.render(captchaRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setCaptchaToken(token),
          "expired-callback": () => setCaptchaToken(""),
          "error-callback": () => setCaptchaToken(""),
        });
      })
      .catch(() => {/* si no carga, el resto de defensas (honeypot/IP) siguen activas */});
    return () => {
      cancelled = true;
      const ts = (window as any).turnstile;
      if (ts && widgetId.current) { try { ts.remove(widgetId.current); } catch {} }
      widgetId.current = null;
      setCaptchaToken("");
    };
  }, [open]);

  const resetCaptcha = () => {
    const ts = (window as any).turnstile;
    if (ts && widgetId.current) { try { ts.reset(widgetId.current); } catch {} }
    setCaptchaToken("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim() || !form.message.trim()) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("Por favor, introduce un email válido.");
      return;
    }
    if (!captchaToken) {
      toast.error("Un momento, estamos verificando que no eres un robot…");
      return;
    }
    setLoading(true);
    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      company: form.company.trim() || null,
      message: form.message.trim() || null,
      source,
      company_url: honeypot,      // honeypot anti-bot (debe ir vacío)
      ts: openedAt.current,       // marca de tiempo de apertura del formulario
      turnstileToken: captchaToken,
    };
    try {
      // Producción: función de Vercel (guarda el lead y avisa por correo a la empresa)
      const res = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 404) {
        // Entorno local sin funciones de Vercel: vía directa a Supabase
        const { data, error } = await supabase.functions.invoke("submit-contact", { body: payload });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
      } else {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data?.error) throw new Error(data?.error || "Error");
      }
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      toast.error("Ha ocurrido un error. Inténtalo de nuevo.");
      resetCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) setTimeout(() => setSuccess(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card/90 backdrop-blur-2xl border-border/30 sm:max-w-lg">
        {success ? (
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-emerald/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-brand-emerald" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-extrabold">¡Mensaje enviado!</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2">
                Nos pondremos en contacto contigo en menos de 24 horas.
              </DialogDescription>
            </DialogHeader>
            <img loading="lazy" src={heroRobot} alt="" className="w-24 opacity-40 mt-2" width={1024} height={1024} />
            <Button variant="outline" onClick={() => handleClose(false)} className="mt-2 rounded-full">Cerrar</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-extrabold">
                {title ?? (<>Solicita tu <span className="text-gradient-blue">demo</span></>)}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {description ?? "Contacta con nosotros y analizamos tu caso de forma personalizada."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              {/* Honeypot anti-bot: oculto para humanos, invisible a lectores de pantalla */}
              <input
                type="text"
                name="company_url"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />
              <div className="space-y-1.5">
                <Label htmlFor="name">Nombre y apellidos *</Label>
                <Input id="name" placeholder="Tu nombre y apellidos" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} required className="bg-secondary/50 border-border/40" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="tu@empresa.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required className="bg-secondary/50 border-border/40" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="+34 600 000 000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={30} className="bg-secondary/50 border-border/40" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company">Empresa *</Label>
                <Input id="company" placeholder="Tu empresa" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} maxLength={100} required className="bg-secondary/50 border-border/40" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Mensaje *</Label>
                <Textarea id="message" placeholder="Cuéntanos qué necesitas..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} rows={3} required className="bg-secondary/50 border-border/40 resize-none" />
              </div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 rounded border-border/60 accent-primary" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  He leído y acepto la{" "}
                  <a href="/legal#privacidad" target="_blank" rel="noopener" className="text-primary hover:underline">política de privacidad</a>{" "}
                  y consiento el tratamiento de mis datos para atender mi solicitud. *
                </span>
              </label>
              {/* Cloudflare Turnstile — verificación anti-bot */}
              <div ref={captchaRef} className="flex justify-center min-h-[65px]" />
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-base shadow-lg shadow-primary/20" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>{submitLabel ?? "Solicitar demo"} <ArrowRight className="ml-2 h-5 w-5" /></>}
              </Button>
              <p className="text-sm text-muted-foreground/75 text-center">Sin compromiso · Respuesta en &lt;24h</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
