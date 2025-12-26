import { NextResponse } from "next/server";

type Payload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

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

  await new Promise((r) => setTimeout(r, 450));

  return NextResponse.json({
    ok: true,
    received: { name, email, company, messageLength: message.length },
  });
}

