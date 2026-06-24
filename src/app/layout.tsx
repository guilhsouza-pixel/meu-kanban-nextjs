import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meu Kanban - Gestao de Tarefas",
  description: "Aplicativo Kanban em Next.js para gestao de tarefas e projetos."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
