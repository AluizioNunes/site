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

function badRequest(error: string, details?: Record<string, unknown>) {
  return NextResponse.json(
    { ok: false, error, details },
    { status: 400 },
  );
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Payload | null;

  if (!body) {
    return badRequest("Payload inválido.");
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const company = String(body.company || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !message) {
    return badRequest("Preencha nome, email e mensagem.", {
      missing: {
        name: !name,
        email: !email,
        message: !message,
      },
    });
  }

  if (!isEmail(email)) {
    return badRequest("Email inválido.", { field: "email" });
  }

  if (message.length < 3) {
    return badRequest("Mensagem muito curta.", {
      field: "message",
      minLength: 3,
      messageLength: message.length,
    });
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

  const to = process.env.CONTACT_TO || "contatos@itfact.com";
  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const from = process.env.SMTP_FROM!;

  if (!Number.isFinite(port) || port <= 0) {
    return NextResponse.json(
      { error: "SMTP_PORT inválida." },
      { status: 500 },
    );
  }

  const secure =
    typeof process.env.SMTP_SECURE === "string"
      ? process.env.SMTP_SECURE === "true"
      : port === 465;

  const rejectUnauthorized =
    typeof process.env.SMTP_TLS_REJECT_UNAUTHORIZED === "string"
      ? process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false"
      : true;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    tls: { rejectUnauthorized },
  });

  const subject = `Contato - ${name}${company ? ` (${company})` : ""}`;

  try {
    await transporter.verify();

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
  } catch (err) {
    const details = normalizeSendError(err, { user, pass });
    console.error("contact: sendMail failed", details);
    return NextResponse.json(
      {
        error: "Falha ao enviar email.",
        details,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    received: { name, email, company, messageLength: message.length },
  });
}

function normalizeSendError(err: unknown, secrets: { user: string; pass: string }) {
  const asRecord = err as Record<string, unknown> | null;
  const message =
    err instanceof Error ? err.message : typeof err === "string" ? err : "Erro desconhecido.";

  const safeMessage = String(message)
    .replaceAll(secrets.user, "[redacted]")
    .replaceAll(secrets.pass, "[redacted]");

  const code = typeof asRecord?.code === "string" ? asRecord.code : undefined;
  const command = typeof asRecord?.command === "string" ? asRecord.command : undefined;
  const responseCode =
    typeof asRecord?.responseCode === "number" ? asRecord.responseCode : undefined;
  const response = typeof asRecord?.response === "string" ? asRecord.response : undefined;

  return {
    code,
    command,
    responseCode,
    response,
    message: safeMessage,
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
