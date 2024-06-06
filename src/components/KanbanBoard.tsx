"use client";
import { UseClientOnlyPortal } from "@/app/hooks/UseClientOnlyPortal";
import { UseActionsBoard } from "@/app/hooks/actionsColumns";
import AddIcon from "@/icons/AddIcon";
import { IColumn } from "@/models/column.model";
import { ITask } from "@/models/task.model";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import ColumnContainer from "./ColumnsContainer";
import TaskCard from "./TaskCard";
import { Button } from "./ui/button";

export default function KanbanBoard() {
  const {
    updateColumn,
    deleteColumn,
    createNewColumn,
    createTask,
    deleteTask,
    updateTask,
    setColumns,
    setTasks,
    tasks,
    columns,
  } = UseActionsBoard();
  const columnsId = useMemo(() => columns.map((col) => col._id), [columns]);
  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
  );

  const t = useTranslations("Board");
  const tColumn = useTranslations("Column");

  return (
    <div className="m-auto w-[332px] max-w-[332px] overflow-x-auto overflow-y-hidden md:w-[896px] md:max-w-2xl lg:w-[1280px] lg:max-w-7xl">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-2 md:gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col._id}
                  column={col}
                  tasks={tasks.filter((task) => task.columnId === col._id)}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
          <Button
            onClick={() => createNewColumn()}
            variant={"board"}
            className="flex h-[45px] w-[272px] min-w-[272px] cursor-pointer gap-2 rounded-lg border-2 p-4"
          >
            <AddIcon />
            {t("addColBtn")}
          </Button>
        </div>
        <UseClientOnlyPortal>
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn._id,
                )}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>
          ,
        </UseClientOnlyPortal>
      </DndContext>
    </div>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col._id === activeId,
      );
      const overColumnIndex = columns.findIndex((col) => col._id === overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task._id === activeId);
        const overIndex = tasks.findIndex((task) => task._id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task._id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}
