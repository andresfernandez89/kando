import { dbConnect } from "@/lib/dbConnect";
import Task from "@/models/task.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find({});

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: "Error fetching tasks", error: error },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { columnId } = await req.json();

    if (!columnId) {
      return NextResponse.json(
        { msg: "Missing columnId in request body" },
        { status: 400 },
      );
    }

    const newTask = await Task.create({ columnId });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    NextResponse.json(
      { msg: "Error creating new task:", error: error },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { _id } = await req.json();

    const taskDeleted = await Task.deleteOne({ _id: _id });

    if (taskDeleted.deletedCount === 0) {
      return NextResponse.json({ msg: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { msg: "Task deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    NextResponse.json(
      { msg: "Error deleting task:", error: error },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { _id, columnId, content } = await req.json();

    if (!_id || !content) {
      return NextResponse.json(
        { msg: "Missing _id, columnId or content in request body" },
        { status: 400 },
      );
    }

    const taskUpdated = await Task.updateOne(
      { _id },
      { $set: { columnId, content } },
    );

    if (taskUpdated.modifiedCount === 0) {
      return NextResponse.json(
        { msg: "Task not found or no changes made" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { msg: "Task updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Error updating task", error: error },
      { status: 500 },
    );
  }
}
