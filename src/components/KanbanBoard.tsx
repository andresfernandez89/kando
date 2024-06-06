"use client";
import { UseClientOnlyPortal } from "@/app/hooks/UseClientOnlyPortal";
import AddIcon from "@/icons/AddIcon";
import { generateId } from "@/lib/utils";
import { IColumn } from "@/models/column.model";
import type { Id, Task } from "@/types/kanbanBoard";
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
import { useEffect, useMemo, useState } from "react";
import ColumnContainer from "./ColumnsContainer";
import TaskCard from "./TaskCard";
import { Button } from "./ui/button";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col._id), [columns]);
  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  console.log(columns);

  useEffect(() => {
    const fetchColumns = async () => {
      const columnsData = await getAllColumns();
      setColumns(columnsData);
    };

    fetchColumns();
  }, []);

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
                  (task) => task.columnId === activeColumn.id,
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
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
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
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  async function getAllColumns() {
    try {
      const response = await fetch(`http://localhost:3000/api/board/columns`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch columns: ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        return data as IColumn[];
      } else {
        throw new Error(`API response is not an array: ${data}`);
      }
    } catch (error) {
      throw new Error(`Error fetching columns: ${error}`);
    }
  }

  async function createNewColumn() {
    try {
      const response = await fetch(`http://localhost:3000/api/board/columns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: tColumn("colTitle"),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create column: ${response.statusText}`);
      }

      const columnToAdd = await response.json();
      setColumns([...columns, columnToAdd]);
      return;
    } catch (error) {
      throw new Error(`Failed to create column: ${error}`);
    }
  }

  async function deleteColumn(id: Id) {
    try {
      const response = await fetch(`http://localhost:3000/api/board/columns`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (response.ok) {
        const filteredColumns = columns.filter((col) => col._id !== id);
        setColumns(filteredColumns);

        const newTasks = tasks.filter((task) => task.columnId !== id);
        setTasks(newTasks);
      } else {
        const errorData = await response.json();
        throw new Error(`Error deleting column: ${errorData.msg}`);
      }
    } catch (error) {
      throw new Error(`Error deleting column: ${error}`);
    }
  }

  async function updateColumn(id: Id, title: IColumn["title"]) {
    try {
      const response = await fetch(`http://localhost:3000/api/board/columns`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, title }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update column: ${response.statusText}`);
      }
      const columnsData = await getAllColumns();
      setColumns(columnsData);
    } catch (error) {
      throw new Error(`Error updating column: ${error}`);
    }
  }

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: "",
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: Task["content"]) {
    const tasksUpdated = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(tasksUpdated);
  }
}
