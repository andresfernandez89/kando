import DeleteIcon from "@/icons/deleteIcon";
import type { Column, Id } from "@/types/kanbanBoard";
import { Button } from "./ui/button";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

export default function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;
  return (
    <div className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-4 bg-card">
      <div className="text-md flex h-[56px] w-full cursor-grab items-center justify-between rounded-[1px] rounded-b-none bg-primary p-3 font-bold">
        <div className="flex w-full items-center gap-2 text-primary-foreground">
          <div className="flex items-center justify-center rounded border bg-[#ddd6fe] p-2 text-sm text-[#09090b]">
            0
          </div>
          <div className="flex-grow">{column.title}</div>
          <Button
            onClick={() => deleteColumn(column.id)}
            className="self-end rounded stroke-[#ddd6fe] px-1 py-2 hover:bg-[#8b5cf6] hover:stroke-[#f5f3ff]"
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        Content
      </div>
      <div className="p-2">Footer</div>
    </div>
  );
}
