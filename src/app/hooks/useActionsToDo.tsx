import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

const { NEXT_PUBLIC_API_URL } = process.env;

export function UseActionsTodo() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [newTodo, setNewTodo] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    if (!NEXT_PUBLIC_API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }
    fetch(NEXT_PUBLIC_API_URL, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
        setIsLoading(false);
      });
  };

  const addTodo = async () => {
    if (!newTodo) return;
    if (!NEXT_PUBLIC_API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const response = await fetch(NEXT_PUBLIC_API_URL, {
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
    getTodos();
  };
  const handleSave = async () => {
    if (!editTodo) return;
    if (!NEXT_PUBLIC_API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }
    const response = await fetch(NEXT_PUBLIC_API_URL, {
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

  const handleEdit = (todo: Todo) => {
    setEditTodo(todo);
  };

  const handleDelete = async (id: string) => {
    if (!NEXT_PUBLIC_API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }
    const response = await fetch(NEXT_PUBLIC_API_URL, {
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
    const currentTodo = todo.find((todo: Todo) => todo._id === id);

    if (!currentTodo) {
      console.error("Todo not found");
      return;
    }
    if (!NEXT_PUBLIC_API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const response = await fetch(NEXT_PUBLIC_API_URL, {
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

  return {
    todo,
    getTodos,
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
  };
}
