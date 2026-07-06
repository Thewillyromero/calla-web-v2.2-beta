import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};

    // --- Validación (misma que la función de Supabase) ---
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 255) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) || null : null;
    const company = typeof body.company === "string" ? body.company.trim().slice(0, 100) || null : null;
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 2000) || null : null;
    const source = typeof body.source === "string" ? body.source.trim().slice(0, 50) : "general";

    if (!name) return res.status(400).json({ error: "El nombre es obligatorio." });
    if (!email || !EMAIL_RE.test(email)) return res.status(400).json({ error: "Email inválido." });

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
      console.error("Email notification failed:", e);
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
