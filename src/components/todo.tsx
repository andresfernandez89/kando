"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import DeleteIcon from "@/icons/deleteIcon";
import EditIcon from "@/icons/editIcon";

type Todo = {
  _id: string;
  text: string | null;
  completed: boolean;
};

const { API_URL } = process.env;

export default function ToDo() {
  const [isLoading, setIsLoading] = useState(true);
  const [todo, setTodo] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/todo`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
        setIsLoading(false);
      });
  }, []);

  const getData = () => {
    fetch(`http://localhost:3000/api/todo`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
        setIsLoading(false);
      });
  };

  const addTodo = async () => {
    if (!newTodo) return;

    const response = await fetch(`http://localhost:3000/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    });
    const data = await response.json();
    setTodo([...todo, data]);
    setNewTodo("");
    getData();
  };

  const handleEdit = (todo: Todo) => {
    setEditTodo(todo);
  };

  const handleSave = async () => {
    if (!editTodo) return;
    const response = await fetch(`http://localhost:3000/api/todo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editTodo._id,
        text: editTodo.text,
        completed: editTodo.completed,
      }),
    });
    if (response.status === 200) {
      setTodo(
        todo.map((todo: Todo) =>
          todo._id === editTodo._id ? { ...todo, text: editTodo.text } : todo,
        ),
      );
      setEditTodo(null);
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/todo`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      setTodo(todo.filter((todo: Todo) => todo._id !== id));
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    // Encuentra el todo correspondiente por su id para obtener el texto actual
    const currentTodo = todo.find((todo: Todo) => todo._id === id);

    if (!currentTodo) {
      console.error("Todo not found");
      return;
    }

    const response = await fetch(`http://localhost:3000/api/todo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        text: currentTodo.text,
        completed: !completed,
      }),
    });

    if (response.status === 200) {
      setTodo(
        todo.map((todo: Todo) =>
          todo._id === id ? { ...todo, completed: !completed } : todo,
        ),
      );
    } else {
      console.error("Failed to update todo:", await response.text());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="m-auto flex w-full flex-col items-center justify-center gap-3 overflow-x-auto overflow-y-hidden">
        {editTodo ? (
          /* Edit ToDo */
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
              Save
            </Button>
          </>
        ) : (
          /* Add ToDo */
          <>
            <input
              type="text"
              placeholder="Write here new task..."
              value={newTodo}
              className="log:w-8/12 h-[45px] w-[272px] rounded-lg p-3 outline-none"
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <Button
              variant={"board"}
              className="flex h-[45px] w-[272px] min-w-[272px] cursor-pointer gap-2 rounded-lg border-none p-4"
              onClick={addTodo}
            >
              Add ToDo
            </Button>
          </>
        )}
      </div>
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-1">
        {isLoading && (
          <p className="my-10 text-xl italic text-pink-400">Loading Task...</p>
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
