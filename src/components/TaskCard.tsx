import DeleteIcon from "@/icons/deleteIcon";
import type { Id, Task } from "@/types/kanbanBoard";
import { useState } from "react";
import { Button } from "./ui/button";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: Task["content"]) => void;
}

export default function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const togleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (editMode) {
    return (
      <div className="flex h-[100px] min-h-[100px] cursor-grab flex-col place-content-between items-start rounded bg-[#f3f4f6] p-2 hover:ring-2 hover:ring-inset hover:ring-[#ddd6fe]">
        <textarea
          className="h-[90%] w-full resize-none rounded border-none bg-transparent focus:outline-none"
          value={task.content}
          autoFocus
          placeholder="Write here"
          onBlur={togleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") togleEditMode();
          }}
          onChange={(e) => {
            updateTask(task.id, e.target.value);
          }}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      onClick={togleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className="flex h-[100px] min-h-[100px] cursor-grab flex-col place-content-between items-start rounded bg-[#f3f4f6] p-2 hover:ring-2 hover:ring-inset hover:ring-[#ddd6fe]"
    >
      <p className="py-auto w-full">{task.content}</p>
      {mouseIsOver && (
        <Button
          onClick={() => deleteTask(task.id)}
          className="block self-end rounded bg-card stroke-[#4b5563] p-2 hover:bg-card"
        >
          <DeleteIcon />
        </Button>
      )}
    </div>
  );
}
