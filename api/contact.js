const { Resend } = require("resend");

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const FROM = "Pathways Academy <admissions@pathwaysacademy.nl>";
const ADMISSIONS = "admissions@pathwaysacademy.nl";

module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    const key = process.env.RESEND_API_KEY || "";
    res.status(200).json({
      diagnostic: true,
      functionRunning: true,
      hasResendKey: key.length > 0,
      keyLength: key.length,
      keyPrefix: key.slice(0, 3),
      nodeVersion: process.version,
    });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set in Vercel environment variables.");
    res.status(500).json({ error: "Email service is not configured. Please contact admissions@pathwaysacademy.nl directly." });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const fullName = String(body.fullName || "").trim();
  const email = String(body.email || "").trim();
  const whatsapp = String(body.whatsapp || "").trim();
  const programme = String(body.programme || "").trim();
  const message = String(body.message || "").trim();

  if (!fullName || !email || !whatsapp || !programme) {
    res.status(400).json({ error: "Please fill in your name, email, WhatsApp number and programme." });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Please enter a valid email address." });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const safe = {
    fullName: escapeHtml(fullName),
    email: escapeHtml(email),
    whatsapp: escapeHtml(whatsapp),
    programme: escapeHtml(programme),
    message: escapeHtml(message) || "—",
  };

  try {
    await resend.emails.send({
      from: FROM,
      to: [ADMISSIONS],
      replyTo: email,
      subject: `New application: ${fullName} — ${programme}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.6">
          <h2 style="color:#E86233;margin-bottom:4px">New application received</h2>
          <p style="color:#475569;margin-top:0">Submitted via pathwaysacademy.nl</p>
          <table style="border-collapse:collapse;margin-top:12px">
            <tr><td style="padding:6px 16px 6px 0;font-weight:bold">Full name</td><td style="padding:6px 0">${safe.fullName}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;font-weight:bold">Email</td><td style="padding:6px 0">${safe.email}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;font-weight:bold">WhatsApp</td><td style="padding:6px 0">${safe.whatsapp}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;font-weight:bold">Programme</td><td style="padding:6px 0">${safe.programme}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;font-weight:bold;vertical-align:top">Message</td><td style="padding:6px 0">${safe.message}</td></tr>
          </table>
          <p style="color:#64748b;margin-top:16px">Reply directly to this email to respond to the applicant.</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: FROM,
      to: [email],
      replyTo: ADMISSIONS,
      subject: "Your application has been received — Pathways Academy",
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.6">
          <h2 style="color:#E86233">Thank you for applying, ${safe.fullName}</h2>
          <p>We have successfully received your application for the <strong>${safe.programme}</strong>.</p>
          <p>Our admissions team will review your details and contact you within <strong>four (4) business working days</strong>.</p>
          <p>If you have any questions in the meantime, you can reach us at
            <a href="mailto:admissions@pathwaysacademy.nl" style="color:#E86233">admissions@pathwaysacademy.nl</a>.
          </p>
          <p style="margin-top:24px">Warm regards,<br/><strong>Pathways Academy Admissions Team</strong></p>
        </div>
      `,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("RESEND ERROR:", error);
    res.status(500).json({ error: "We could not send your application right now. Please email admissions@pathwaysacademy.nl directly." });
  }
};
