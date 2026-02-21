import { NextResponse } from "next/server";
import { Resend } from "resend";
import { business } from "@/content/business";

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count++;
  return false;
}

export async function POST(request: Request) {
  // Get IP for rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intente de nuevo más tarde." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { nombre, telefono, email, servicio, mensaje, urgente } = body;

    // Validation
    if (!nombre || !telefono) {
      return NextResponse.json(
        { error: "Nombre y teléfono son obligatorios" },
        { status: 400 }
      );
    }

    // Validate phone number format (basic validation for Spanish numbers)
    const phoneRegex = /^[+]?[0-9\s\-()]{9,}$/;
    if (!phoneRegex.test(telefono)) {
      return NextResponse.json(
        { error: "Número de teléfono no válido" },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Email no válido" },
          { status: 400 }
        );
      }
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitize = (str: string) =>
      str
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");

    const safeNombre = sanitize(nombre);
    const safeTelefono = sanitize(telefono);
    const safeEmail = email ? sanitize(email) : "";
    const safeServicio = servicio ? sanitize(servicio) : "";
    const safeMensaje = mensaje ? sanitize(mensaje) : "";

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email notification
    await resend.emails.send({
      from: `Web <noreply@${process.env.RESEND_DOMAIN || "arturomorgadanes.com"}>`,
      to: business.email,
      subject: urgente
        ? `🚨 URGENTE: Nueva solicitud de ${safeNombre}`
        : `Nueva solicitud de ${safeNombre}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1d4ed8; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .urgent { background: #fef2f2; border: 2px solid #ef4444; padding: 10px; margin-bottom: 20px; border-radius: 4px; }
            .urgent p { color: #dc2626; font-weight: bold; margin: 0; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #374151; }
            .value { color: #111827; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
            a { color: #1d4ed8; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Nueva Solicitud desde la Web</h1>
            </div>
            <div class="content">
              ${
                urgente
                  ? `
              <div class="urgent">
                <p>⚠️ EL CLIENTE INDICA QUE ES URGENTE</p>
              </div>
              `
                  : ""
              }

              <div class="field">
                <p class="label">Nombre:</p>
                <p class="value">${safeNombre}</p>
              </div>

              <div class="field">
                <p class="label">Teléfono:</p>
                <p class="value"><a href="tel:${safeTelefono}">${safeTelefono}</a></p>
              </div>

              ${
                safeEmail
                  ? `
              <div class="field">
                <p class="label">Email:</p>
                <p class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></p>
              </div>
              `
                  : ""
              }

              ${
                safeServicio
                  ? `
              <div class="field">
                <p class="label">Servicio solicitado:</p>
                <p class="value">${safeServicio}</p>
              </div>
              `
                  : ""
              }

              ${
                safeMensaje
                  ? `
              <div class="field">
                <p class="label">Mensaje:</p>
                <p class="value">${safeMensaje.replace(/\n/g, "<br>")}</p>
              </div>
              `
                  : ""
              }
            </div>
            <div class="footer">
              <p>Enviado desde arturomorgadanes.com el ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
