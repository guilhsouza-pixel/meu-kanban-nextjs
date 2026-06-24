import Board from "@/components/Board";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Projeto 1 - GitHub, Codex e Vercel</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Meu Kanban</h1>
          <p className="mt-2 max-w-2xl text-slate-600">Organize tarefas, projetos e rotinas em um quadro simples no estilo Trello.</p>
        </header>
        <Board />
      </div>
    </main>
  );
}
