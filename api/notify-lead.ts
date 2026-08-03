import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Rate limiting best-effort en memoria (por instancia caliente) ---
// Mismo enfoque que submit-contact: endurece sin sustituir a un CAPTCHA.
const IP_HITS = new Map<string, number[]>();
const IP_LIMIT = 5;               // máx. avisos por IP...
const IP_WINDOW_MS = 60 * 60_000; // ...por hora
let globalHits: number[] = [];
const GLOBAL_LIMIT = 60;          // tope global de correos/hora (anti mail-bombing)

const SOURCES: Record<string, string> = {
  "demo-call": "Demo de voz (habló con ARIA)",
  chatbot: "Chatbot de la web",
};

function clientIp(req: any): string {
  return (
    req.headers["x-real-ip"] ||
    (req.headers["x-vercel-forwarded-for"] || "").split(",")[0].trim() ||
    "unknown"
  );
}

// Evita saltos de línea en campos que van en una sola línea del correo
function oneLine(s: string): string {
  return s.replace(/[\r\n]+/g, " ").trim();
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
    const now = Date.now();
    const ip = clientIp(req);

    // --- Rate limit por IP y tope global ---
    const hits = (IP_HITS.get(ip) ?? []).filter((t) => now - t < IP_WINDOW_MS);
    if (hits.length >= IP_LIMIT) {
      return res.status(429).json({ error: "Demasiados envíos. Inténtalo más tarde." });
    }
    globalHits = globalHits.filter((t) => now - t < IP_WINDOW_MS);
    if (globalHits.length >= GLOBAL_LIMIT) {
      return res.status(429).json({ error: "Servicio saturado. Inténtalo en un rato." });
    }

    // --- Validación ---
    const name = typeof body.name === "string" ? oneLine(body.name).slice(0, 100) : "";
    const phone = typeof body.phone === "string" ? oneLine(body.phone).slice(0, 30) || null : null;
    const email = typeof body.email === "string" ? oneLine(body.email).toLowerCase().slice(0, 255) || null : null;
    const source = typeof body.source === "string" && SOURCES[body.source] ? body.source : null;

    if (!name || name.length < 2) return res.status(400).json({ error: "Nombre inválido." });
    if (!source) return res.status(400).json({ error: "Origen inválido." });
    if (email && !EMAIL_RE.test(email)) return res.status(400).json({ error: "Email inválido." });

    hits.push(now); IP_HITS.set(ip, hits);
    globalHits.push(now);

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notifyTo = process.env.NOTIFY_EMAIL ?? "contacto@appcalla.com";
    if (!smtpUser || !smtpPass) {
      console.warn("SMTP_USER/SMTP_PASS no configurados.");
      return res.status(500).json({ error: "Servicio no disponible." });
    }

    const transporter = nodemailer.createTransport({
      host: "mail.infomaniak.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });
    const lines = [
      `Nombre: ${name}`,
      phone ? `Teléfono: ${phone}` : null,
      email ? `Email: ${email}` : null,
      ``,
      `Origen: ${SOURCES[source]}`,
      !phone && !email ? `(No dejó datos de contacto — lead solo informativo)` : null,
    ].filter((l) => l !== null).join("\n");
    await transporter.sendMail({
      from: `"Web CALLA" <${smtpUser}>`,
      to: notifyTo,
      ...(email ? { replyTo: email } : {}),
      subject: `Nuevo lead — ${SOURCES[source]} — ${name}`,
      text: lines,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("notify-lead error:", err);
    return res.status(500).json({ error: "Error inesperado." });
  }
}
