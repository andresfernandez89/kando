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
    <div className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md bg-orange-300">
      <div className="text-md cursor grab flex h-14 items-center justify-between rounded-md rounded-b-none border-4 border-cyan-300 p-3 font-bold">
        <div className="flex gap-2">
          <div className="flex items-center justify-center rounded-full bg-cyan-300 px-2 py-1 text-sm">
            0
          </div>
          {column.title}
          <Button
            onClick={() => deleteColumn(column.id)}
            className="rounded stroke-gray-500 px-1 py-2 hover:bg-cyan-300 hover:stroke-white"
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
}

//<div className="text-md flex h-14 flex-grow cursor-grab rounded-md rounded-b-none border-4 border-y-red-800 p-3 font-bold">
