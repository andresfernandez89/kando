import { IColumn } from "@/models/column.model";
import { ITask } from "@/models/task.model";
import { Id } from "@/types/kanbanBoard";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function UseActionsBoard() {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const t = useTranslations("Board");
  const tColumn = useTranslations("Column");

  useEffect(() => {
    const fetchColumns = async () => {
      const columnsData = await getAllColumns();
      setColumns(columnsData);
      const tasksData = await getAllTasks();
      setTasks(tasksData);
    };

    fetchColumns();
  }, []);

  async function getAllColumns() {
    try {
      const response = await fetch(`http://localhost:3000/api/board/columns`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch columns: ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        return data as IColumn[];
      } else {
        throw new Error(`API response is not an array: ${data}`);
      }
    } catch (error) {
      throw new Error(`Error fetching columns: ${error}`);
    }
  }

  async function createNewColumn() {
    try {
      const response = await fetch(`http://localhost:3000/api/board/columns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: tColumn("colTitle"),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create column: ${response.statusText}`);
      }

      const columnToAdd = await response.json();
      setColumns([...columns, columnToAdd]);
      return;
    } catch (error) {
      throw new Error(`Failed to create column: ${error}`);
    }
  }

  async function deleteColumn(id: Id) {
    try {
      const response = await fetch(`http://localhost:3000/api/board/columns`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (response.ok) {
        const filteredColumns = columns.filter((col) => col._id !== id);
        setColumns(filteredColumns);

        const newTasks = tasks.filter((task) => task.columnId !== id);
        setTasks(newTasks);
      } else {
        const errorData = await response.json();
        throw new Error(`Error deleting column: ${errorData.msg}`);
      }
    } catch (error) {
      throw new Error(`Error deleting column: ${error}`);
    }
  }

  async function updateColumn(id: Id, title: IColumn["title"]) {
    try {
      const response = await fetch(`http://localhost:3000/api/board/columns`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, title }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update column: ${response.statusText}`);
      }
      const columnsData = await getAllColumns();
      setColumns(columnsData);
    } catch (error) {
      throw new Error(`Error updating column: ${error}`);
    }
  }

  async function getAllTasks() {
    try {
      const response = await fetch(`http://localhost:3000/api/board/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        return data as ITask[];
      } else {
        throw new Error(`API response is not an array: ${data}`);
      }
    } catch (error) {
      throw new Error(`Error fetching tasks: ${error}`);
    }
  }

  async function createTask(columnId: Id) {
    try {
      const response = await fetch(`http://localhost:3000/api/board/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          columnId,
          content: "",
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create task: ${response.statusText}`);
      }

      const taskToAdd = await response.json();
      setTasks([...tasks, taskToAdd]);
      return;
    } catch (error) {
      throw new Error(`Failed to create task: ${error}`);
    }
  }

  async function deleteTask(id: Id) {
    try {
      const response = await fetch(`http://localhost:3000/api/board/tasks`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (response.ok) {
        const newTasks = await getAllTasks();
        setTasks(newTasks);
      } else {
        const errorData = await response.json();
        throw new Error(`Error deleting task: ${errorData.msg}`);
      }
    } catch (error) {
      throw new Error("Error deleting task:" + error);
    }
  }

  async function updateTask(id: Id, content: ITask["content"]) {
    try {
      const response = await fetch(`http://localhost:3000/api/board/tasks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, content }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.statusText}`);
      }
      const tasksData = await getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      throw new Error(`Error updating task: ${error}`);
    }
  }

  return {
    getAllColumns,
    createNewColumn,
    updateColumn,
    deleteColumn,
    getAllTasks,
    createTask,
    deleteTask,
    updateTask,
    tasks,
    columns,
    setColumns,
    setTasks,
  };
}
