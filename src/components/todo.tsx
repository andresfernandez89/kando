"use client";
import { UseActionsTodo } from "@/app/hooks/useActionsToDo";
import DeleteIcon from "@/icons/deleteIcon";
import EditIcon from "@/icons/editIcon";
import { Todo } from "@/types/todo";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";

export default function ToDo() {
  const {
    todo,
    addTodo,
    handleSave,
    handleEdit,
    handleDelete,
    toggleTodo,
    newTodo,
    setNewTodo,
    editTodo,
    setEditTodo,
    isLoading,
  } = UseActionsTodo();

  const t = useTranslations("Todo");

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="m-auto flex w-full flex-col items-center justify-center gap-3 overflow-x-auto overflow-y-hidden">
        {editTodo ? (
          <>
            <input
              type="text"
              className="log:w-8/12 h-[45px] w-[272px] rounded-lg p-3 outline-none"
              value={editTodo.text!}
              onChange={(e) =>
                setEditTodo({ ...editTodo, text: e.target.value })
              }
            />
            <Button
              variant={"board"}
              className="flex h-[45px] w-[272px] min-w-[272px] cursor-pointer gap-2 rounded-lg border-none p-4"
              onClick={handleSave}
            >
              {t("saveBtn")}
            </Button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder={t("inputTxt")}
              value={newTodo}
              className="log:w-8/12 h-[45px] w-[272px] rounded-lg p-3 outline-none"
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <Button
              variant={"board"}
              className="flex h-[45px] w-[272px] min-w-[272px] cursor-pointer gap-2 rounded-lg border-none p-4"
              onClick={addTodo}
            >
              {t("addBtn")}
            </Button>
          </>
        )}
      </div>
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-1">
        {isLoading && (
          <p className="my-10 text-xl text-pink-400">{t("loading")}</p>
        )}
        {!isLoading && todo && todo.length === 0 ? (
          <div className="my-10 text-xl italic text-pink-400">No Task</div>
        ) : (
          <>
            {!isLoading &&
              todo &&
              todo.map((todo: Todo) => (
                <li
                  key={todo._id}
                  className="my-1 flex w-full items-center justify-between rounded-lg bg-background px-2 py-2"
                >
                  <div className="flex items-center justify-start gap-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo._id, todo.completed)}
                      className="h-5 w-5 cursor-pointer pl-2"
                    />
                    <span
                      className={`${todo.completed ? "text-gray-500 line-through" : "list-none"} w-full px-4 hover:text-violet-400`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div>
                    <button
                      className=" stroke-gray-400 pl-2 hover:stroke-red-500"
                      onClick={() => handleEdit(todo)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className=" stroke-gray-400 pl-2 hover:stroke-red-500"
                      onClick={() => handleDelete(todo._id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </li>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
