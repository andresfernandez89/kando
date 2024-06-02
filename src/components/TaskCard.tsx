import DeleteIcon from "@/icons/deleteIcon";
import type { Id, Task } from "@/types/kanbanBoard";
import { useState } from "react";
import { Button } from "./ui/button";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
}

export default function TaskCard({ task, deleteTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className="flex h-[100px] min-h-[100px] cursor-grab flex-col place-content-between items-start rounded bg-[#f3f4f6] p-2 hover:ring-2 hover:ring-inset hover:ring-[#ddd6fe]"
    >
      <p>{task.content}</p>
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
