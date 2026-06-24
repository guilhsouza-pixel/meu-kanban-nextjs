"use client";

import { Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import type { Column as ColumnType, Task } from "@/types";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import ColumnModal from "./ColumnModal";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onCreateTask: (content: string, status: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onEditColumn: (column: ColumnType) => void;
  onDeleteColumn: (status: string) => void;
}

export default function Column({ column, tasks, onCreateTask, onEditTask, onDeleteTask, onEditColumn, onDeleteColumn }: ColumnProps) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);

  return (
    <div className="w-72 shrink-0 rounded-xl bg-slate-100 p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h2 className="font-semibold text-slate-900">{column.title}</h2>
          <p className="text-xs text-slate-500">{tasks.length} tarefa(s)</p>
        </div>

        <div className="flex gap-1">
          <button onClick={() => setShowColumnModal(true)} className="rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-white">Editar</button>
          <button onClick={() => onDeleteColumn(column.status)} className="rounded-md px-2 py-1 text-xs text-red-600 hover:bg-red-50">Excluir</button>
        </div>
      </div>

      <Droppable droppableId={column.status}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-32 space-y-2">
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} onEdit={onEditTask} onDelete={onDeleteTask} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button onClick={() => setShowTaskModal(true)} className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700">
        + Criar tarefa
      </button>

      {showTaskModal && (
        <TaskModal
          title="Criar tarefa"
          onClose={() => setShowTaskModal(false)}
          onSubmit={(content) => {
            onCreateTask(content, column.status);
            setShowTaskModal(false);
          }}
        />
      )}

      {showColumnModal && (
        <ColumnModal
          mode="edit"
          initialData={column}
          onClose={() => setShowColumnModal(false)}
          onSubmit={(data) => {
            onEditColumn({ ...column, title: data.title });
            setShowColumnModal(false);
          }}
        />
      )}
    </div>
  );
}
