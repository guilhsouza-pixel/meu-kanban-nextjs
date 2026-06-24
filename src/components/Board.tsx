"use client";

import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import Column from "./Column";
import ColumnModal from "./ColumnModal";
import type { Column as ColumnType, Task } from "@/types";

const initialColumns: ColumnType[] = [
  { id: "a-fazer", title: "A Fazer", status: "a-fazer" },
  { id: "fazendo", title: "Fazendo", status: "fazendo" },
  { id: "concluido", title: "Concluido", status: "concluido" }
];

export default function Board() {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showColumnModal, setShowColumnModal] = useState(false);

  useEffect(() => {
    const savedColumns = localStorage.getItem("meu-kanban-columns");
    const savedTasks = localStorage.getItem("meu-kanban-tasks");

    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("meu-kanban-columns", JSON.stringify(columns));
    localStorage.setItem("meu-kanban-tasks", JSON.stringify(tasks));
  }, [columns, tasks]);

  function onDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const movedTask = tasks.find((task) => task.id === draggableId);
    if (!movedTask) return;

    const remainingTasks = tasks.filter((task) => task.id !== draggableId);
    const updatedTask = { ...movedTask, status: destination.droppableId };
    const destinationTasks = remainingTasks.filter((task) => task.status === destination.droppableId);
    const beforeDestination = remainingTasks.filter((task) => task.status !== destination.droppableId);

    destinationTasks.splice(destination.index, 0, updatedTask);

    if (source.droppableId === destination.droppableId) {
      const sameColumnTasks = tasks.filter((task) => task.status === source.droppableId);
      const otherTasks = tasks.filter((task) => task.status !== source.droppableId);
      const reordered = Array.from(sameColumnTasks);
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);
      setTasks([...otherTasks, ...reordered]);
      return;
    }

    setTasks([...beforeDestination, ...destinationTasks]);
  }

  function handleCreateTask(content: string, status: string) {
    const newTask: Task = {
      id: Date.now().toString(),
      content,
      status
    };

    setTasks((current) => [...current, newTask]);
  }

  function handleEditTask(updatedTask: Task) {
    setTasks((current) => current.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  }

  function handleDeleteTask(taskId: string) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  }

  function handleCreateColumn(data: { title: string; status: string }) {
    const newColumn: ColumnType = {
      id: data.status,
      title: data.title,
      status: data.status
    };

    setColumns((current) => [...current, newColumn]);
    setShowColumnModal(false);
  }

  function handleEditColumn(updatedColumn: ColumnType) {
    setColumns((current) => current.map((column) => (column.id === updatedColumn.id ? updatedColumn : column)));
  }

  function handleDeleteColumn(status: string) {
    setColumns((current) => current.filter((column) => column.status !== status));
    setTasks((current) => current.filter((task) => task.status !== status));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex min-h-[560px] gap-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.status)}
              onCreateTask={handleCreateTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onEditColumn={handleEditColumn}
              onDeleteColumn={handleDeleteColumn}
            />
          ))}

          <div className="w-72 shrink-0">
            <button
              onClick={() => setShowColumnModal(true)}
              className="h-full min-h-32 w-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-sm font-medium text-slate-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
            >
              + Adicionar coluna
            </button>
          </div>
        </div>
      </section>

      {showColumnModal && <ColumnModal onClose={() => setShowColumnModal(false)} onSubmit={handleCreateColumn} />}
    </DragDropContext>
  );
}
