// Ping diario a Supabase (cron de Vercel, ver vercel.json).
// El plan gratuito de Supabase pausa el proyecto tras 7 días sin actividad
// y eso tumba el chat y la demo de voz. Una consulta real a la base de datos
// al día basta para que cuente como actividad.
export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método no permitido" });
  }

  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    return res.status(500).json({ ok: false, error: "Faltan las variables de Supabase" });
  }

  try {
    // Consulta mínima con la clave pública: RLS no devuelve filas, pero la
    // petición llega a Postgres y cuenta como actividad.
    const r = await fetch(`${url}/rest/v1/contact_leads?select=id&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok, supabase: r.status });
  } catch (e: any) {
    return res.status(502).json({ ok: false, error: String(e?.message || e) });
  }
}
