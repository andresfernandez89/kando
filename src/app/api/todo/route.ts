import { dbConnect } from "@/lib/dbConnect";
import Todo from "@/models/todo.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const todo = await Todo.find({});
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: "Error fetching todos", error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json(
        { msg: "Missing text in request body" },
        { status: 400 },
      );
    }
    await dbConnect();
    const newTask = await Todo.create({ text: text, completed: false });

    return NextResponse.json(
      { msg: "OK", POST: "Task created successfully", newTask },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Error creating new task", error },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, text, completed } = await req.json();
    if (!id) {
      return NextResponse.json(
        { msg: "Missing id in request body" },
        { status: 400 },
      );
    } else if (!text) {
      return NextResponse.json(
        { msg: "Missing text in request body" },
        { status: 400 },
      );
    } else if (completed) {
      return NextResponse.json(
        { msg: "Missing completed in request body" },
        { status: 400 },
      );
    }
    await dbConnect();
    await Todo.updateOne(
      { _id: id },
      { $set: { text: text, completed: completed } },
    );

    return NextResponse.json(
      { msg: "OK", Task: "Task Successful update" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Error updating a task", error },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { msg: "Missing id in request body" },
        { status: 400 },
      );
    }
    await dbConnect();
    const result = await Todo.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Task successful delete" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Error deleting task", error },
      { status: 500 },
    );
  }
}
