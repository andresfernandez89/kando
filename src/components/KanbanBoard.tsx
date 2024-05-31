"use client";
import AddIcon from "@/icons/AddIcon";
import { Column, Id } from "@/types/kanbanBoard";
import { useState } from "react";
import ColumnContainer from "./ColumnsContainer";
import { Button } from "./ui/button";
export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              deleteColumn={deleteColumn}
            />
          ))}
        </div>
        <Button
          onClick={() => createNewColumn()}
          className="flex h-[62px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-md border-2 p-4"
        >
          <AddIcon />
          Add Column
        </Button>
      </div>
    </div>
  );
  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
    return;
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  }

  function generateId() {
    return self.crypto.randomUUID();
  }
}
