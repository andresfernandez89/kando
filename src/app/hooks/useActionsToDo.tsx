"use client";
import { Todo } from "@/types/todo";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function UseActionsTodo() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [newTodo, setNewTodo] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      getTodos();
    }
  }, [status]);

  const getTodos = () => {
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }
    fetch(`${API_URL}?userEmail=${session?.user?.email}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
        setIsLoading(false);
      });
  };

  const addTodo = async () => {
    if (!newTodo) return;
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
        sessionUser: session?.user?.email,
      }),
    });
    const data = await response.json();
    setTodo([...todo, data]);
    setNewTodo("");
    getTodos();
  };
  const handleSave = async () => {
    if (!editTodo) return;
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }
    const response = await fetch(API_URL, {
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
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }
    const response = await fetch(API_URL, {
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
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const response = await fetch(API_URL, {
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
