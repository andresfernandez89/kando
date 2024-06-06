import DeleteIcon from "@/icons/deleteIcon";
import { ITask } from "@/models/task.model";
import type { Id } from "@/types/kanbanBoard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "./ui/button";

interface Props {
  task: ITask;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: ITask["content"]) => void;
}

export default function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const t = useTranslations("Column");

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const togleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-[100px] min-h-[100px] cursor-grab flex-col place-content-between items-start rounded border-2 border-[#ddd6fe] bg-[#f3f4f6] p-2 opacity-40"
      />
    );
  }
  console.log(task);
  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex h-[100px] min-h-[100px] cursor-grab flex-col place-content-between items-start rounded bg-[#f3f4f6] p-2 hover:ring-2 hover:ring-inset hover:ring-[#ddd6fe]"
      >
        <textarea
          className="h-[90%] w-full resize-none rounded border-none bg-transparent text-[#4b5563] focus:outline-none"
          value={task.content?.length > 0 ? task.content : ""}
          autoFocus
          placeholder={task.content?.length <= 0 ? t("txtTask") : ""}
          onBlur={togleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") togleEditMode();
          }}
          onChange={(e) => {
            updateTask(task._id, e.target.value);
          }}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={togleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className="flex h-[100px] min-h-[100px] cursor-grab flex-col place-content-between items-start rounded bg-[#f3f4f6] p-2 hover:ring-2 hover:ring-inset hover:ring-[#ddd6fe]"
    >
      <p className="py-auto w-full text-[#4b5563]">
        {task.content?.length > 0 && task.content}
      </p>
      {mouseIsOver && (
        <Button
          onClick={() => deleteTask(task._id)}
          className="block self-end rounded bg-[#f3f4f6] stroke-[#4b5563] p-2 hover:bg-[#f3f4f6] hover:stroke-red-500"
        >
          <DeleteIcon />
        </Button>
      )}
    </div>
  );
}
