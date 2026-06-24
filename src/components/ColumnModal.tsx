"use client";

import { FormEvent, useState } from "react";

interface ColumnModalProps {
  mode?: "create" | "edit";
  initialData?: { title: string; status: string };
  onClose: () => void;
  onSubmit: (data: { title: string; status: string }) => void;
}

function normalizeStatus(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ColumnModal({ mode = "create", initialData, onClose, onSubmit }: ColumnModalProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [status, setStatus] = useState(initialData?.status ?? "");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const finalTitle = title.trim();
    const finalStatus = mode === "edit" ? status : normalizeStatus(status || title);

    if (!finalTitle || !finalStatus) {
      setError("Preencha o titulo da coluna");
      return;
    }

    onSubmit({ title: finalTitle, status: finalStatus });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">{mode === "create" ? "Criar coluna" : "Editar coluna"}</h2>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100">Fechar</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Titulo da coluna</label>
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500" placeholder="Exemplo: Em andamento" />
          </div>

          {mode === "create" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Chave da coluna opcional</label>
              <input value={status} onChange={(event) => setStatus(event.target.value)} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500" placeholder="Exemplo: em-andamento" />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">Salvar coluna</button>
        </form>
      </div>
    </div>
  );
}
