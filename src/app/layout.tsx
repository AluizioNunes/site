import type { Metadata } from "next";
import { geistMono, geistSans, nGage } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "ITFACT | IT Solutions",
    template: "%s | ITFACT",
  },
  description:
    "DevSecOps e IA para acelerar entregas com segurança, observabilidade e automação.",
  applicationName: "ITFACT | IT Solutions",
  keywords: [
    "DevSecOps",
    "IA",
    "Segurança",
    "Cloud",
    "Kubernetes",
    "CI/CD",
    "Observabilidade",
    "SRE",
  ],
  openGraph: {
    title: "ITFACT | IT Solutions",
    description:
      "DevSecOps e IA para acelerar entregas com segurança, observabilidade e automação.",
    type: "website",
    images: [{ url: "/brand/itfact.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ITFACT | IT Solutions",
    description:
      "DevSecOps e IA para acelerar entregas com segurança, observabilidade e automação.",
    images: ["/brand/itfact.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nGage.variable} bg-background text-foreground font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
