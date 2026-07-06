import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Rate limiting best-effort en memoria (por instancia caliente) ---
// No es persistente entre invocaciones frías; endurece sin sustituir a un CAPTCHA/Firewall.
const IP_HITS = new Map<string, number[]>();
const IP_LIMIT = 4;              // máx. envíos por IP...
const IP_WINDOW_MS = 60 * 60_000; // ...por hora
let globalHits: number[] = [];
const GLOBAL_LIMIT = 60;         // tope global de correos/hora (anti mail-bombing)

function clientIp(req: any): string {
  // Vercel fija x-real-ip / x-vercel-forwarded-for en el edge (no manipulable por el cliente).
  return (
    req.headers["x-real-ip"] ||
    (req.headers["x-vercel-forwarded-for"] || "").split(",")[0].trim() ||
    "unknown"
  );
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
    const now = Date.now();

    // --- Anti-bot 1: honeypot (campo oculto que un humano nunca rellena) ---
    if (typeof body.company_url === "string" && body.company_url.trim() !== "") {
      return res.status(200).json({ success: true }); // fingimos éxito, no hacemos nada
    }

    // --- Anti-bot 2: tiempo mínimo en el formulario (los bots envían al instante) ---
    const startedAt = typeof body.ts === "number" ? body.ts : 0;
    if (startedAt && now - startedAt < 2000) {
      return res.status(200).json({ success: true }); // demasiado rápido → descartar en silencio
    }

    // --- Anti-bot 3: rate limit por IP y tope global ---
    const ip = clientIp(req);
    const hits = (IP_HITS.get(ip) ?? []).filter((t) => now - t < IP_WINDOW_MS);
    if (hits.length >= IP_LIMIT) {
      return res.status(429).json({ error: "Demasiados envíos. Inténtalo más tarde." });
    }
    globalHits = globalHits.filter((t) => now - t < IP_WINDOW_MS);
    if (globalHits.length >= GLOBAL_LIMIT) {
      return res.status(429).json({ error: "Servicio saturado. Inténtalo en un rato." });
    }

    // --- Validación (misma que la función de Supabase) ---
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 255) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) || null : null;
    const company = typeof body.company === "string" ? body.company.trim().slice(0, 100) || null : null;
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 2000) || null : null;
    const source = typeof body.source === "string" ? body.source.trim().slice(0, 50) : "general";

    if (!name) return res.status(400).json({ error: "El nombre es obligatorio." });
    if (!email || !EMAIL_RE.test(email)) return res.status(400).json({ error: "Email inválido." });

    // Registrar el intento válido en los contadores
    hits.push(now); IP_HITS.set(ip, hits);
    globalHits.push(now);

    // --- 1) Guardar el lead en Supabase (la función existente, con su rate-limit) ---
    let saved = false;
    try {
      const supaUrl = process.env.VITE_SUPABASE_URL;
      const supaKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      if (supaUrl && supaKey) {
        const r = await fetch(`${supaUrl}/functions/v1/submit-contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supaKey,
            Authorization: `Bearer ${supaKey}`,
          },
          body: JSON.stringify({ name, email, phone, company, message, source }),
        });
        if (r.status === 429) {
          return res.status(429).json({ error: "Demasiados envíos. Inténtalo más tarde." });
        }
        saved = r.ok;
      }
    } catch (e) {
      console.error("Supabase forward failed:", e);
    }

    // --- 2) Notificación por correo a la empresa ---
    let mailed = false;
    let mailError = "";
    try {
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const notifyTo = process.env.NOTIFY_EMAIL ?? "contacto@appcalla.com";
      if (smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: "mail.infomaniak.com",
          port: 465,
          secure: true,
          auth: { user: smtpUser, pass: smtpPass },
        });
        const lines = [
          `Nombre: ${name}`,
          `Email: ${email}`,
          phone ? `Teléfono: ${phone}` : null,
          company ? `Empresa: ${company}` : null,
          message ? `Mensaje:\n${message}` : null,
          ``,
          `Origen: formulario web (${source})`,
          `Guardado en base de datos: ${saved ? "sí" : "NO (revisar)"}`,
        ].filter((l) => l !== null).join("\n");
        await transporter.sendMail({
          from: `"Web CALLA" <${smtpUser}>`,
          to: notifyTo,
          replyTo: email,
          subject: `Nueva solicitud de demo — ${name}${company ? ` (${company})` : ""}`,
          text: lines,
        });
        mailed = true;
      } else {
        console.warn("SMTP_USER/SMTP_PASS no configurados.");
      }
    } catch (e) {
      mailError = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
      console.error("Email notification failed:", mailError);
    }

    if (!saved && !mailed) {
      return res.status(500).json({ error: "Error al procesar la solicitud." });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Error inesperado." });
  }
}
