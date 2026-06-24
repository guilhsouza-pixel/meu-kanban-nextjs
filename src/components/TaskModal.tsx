"use client";

import { FormEvent, useState } from "react";

interface TaskModalProps {
  title: string;
  initialValue?: string;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

export default function TaskModal({ title, initialValue = "", onClose, onSubmit }: TaskModalProps) {
  const [content, setContent] = useState(initialValue);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      setError("Descreva a tarefa");
      return;
    }

    onSubmit(content.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100">Fechar</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Descricao da tarefa</label>
            <textarea value={content} onChange={(event) => setContent(event.target.value)} rows={4} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500" placeholder="Exemplo: estudar deploy na Vercel" />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">Salvar tarefa</button>
        </form>
      </div>
    </div>
  );
}
