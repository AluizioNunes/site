import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export const runtime = "nodejs";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Payload | null;

  if (!body) {
    return NextResponse.json(
      { error: "Payload inválido." },
      { status: 400 },
    );
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const company = String(body.company || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Preencha nome, email e mensagem." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json(
      { error: "Mensagem muito curta." },
      { status: 400 },
    );
  }

  const missingEnv = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
  ].filter((key) => !process.env[key]);

  if (missingEnv.length > 0) {
    return NextResponse.json(
      {
        error:
          "Env de email não configurada. Defina SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS e SMTP_FROM.",
        missing: missingEnv,
      },
      { status: 500 },
    );
  }

  const to = process.env.CONTACT_TO || "contatos@itfact.com.br";
  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const from = process.env.SMTP_FROM!;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `Contato - ${name}${company ? ` (${company})` : ""}`;

  await transporter.sendMail({
    from,
    to,
    replyTo: email,
    subject,
    text: [
      `Nome: ${name}`,
      `Email: ${email}`,
      company ? `Empresa: ${company}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
        <h2 style="margin: 0 0 12px;">Novo contato</h2>
        <p style="margin: 0 0 6px;"><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${
          company
            ? `<p style="margin: 0 0 6px;"><strong>Empresa:</strong> ${escapeHtml(company)}</p>`
            : ""
        }
        <p style="margin: 16px 0 6px;"><strong>Mensagem:</strong></p>
        <pre style="white-space: pre-wrap; margin: 0; padding: 12px; border: 1px solid #eee; border-radius: 8px;">${escapeHtml(
          message,
        )}</pre>
      </div>
    `,
  });

  return NextResponse.json({
    ok: true,
    received: { name, email, company, messageLength: message.length },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
