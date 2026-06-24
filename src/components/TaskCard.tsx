"use client";

import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import type { Task } from "@/types";
import TaskModal from "./TaskModal";

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, index, onEdit, onDelete }: TaskCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <article
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="group rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md"
          >
            <p className="whitespace-pre-wrap text-sm text-slate-800">{task.content}</p>
            <div className="mt-3 flex justify-end gap-2 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
              <button onClick={() => setShowEditModal(true)} className="text-xs font-medium text-blue-600 hover:text-blue-800">Editar</button>
              <button onClick={() => onDelete(task.id)} className="text-xs font-medium text-red-600 hover:text-red-800">Excluir</button>
            </div>
          </article>
        )}
      </Draggable>

      {showEditModal && (
        <TaskModal
          title="Editar tarefa"
          initialValue={task.content}
          onClose={() => setShowEditModal(false)}
          onSubmit={(content) => {
            onEdit({ ...task, content });
            setShowEditModal(false);
          }}
        />
      )}
    </>
  );
}
