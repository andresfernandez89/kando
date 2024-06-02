import { Task } from "@/types/kanbanBoard";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="h-[100px] min-h-[100px] cursor-grab items-center rounded bg-[#f3f4f6] p-2 text-left hover:ring-2 hover:ring-inset hover:ring-[#ddd6fe]">
      {task.content}
    </div>
  );
}
