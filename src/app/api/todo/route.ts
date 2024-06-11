import clientPromise from "@/lib/todoConnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const collection = client.db().collection("todo");
  try {
    const todo = await collection.find({}).toArray();
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Error", error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const collection = client.db().collection("todo");
  const { text } = await req.json();
  try {
    const newTask = { text: text, completed: false };
    await collection.insertOne(newTask);

    return NextResponse.json(
      { msg: "OK", POST: "Successful Task", newTask },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ msg: "Error", error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const client = await clientPromise;
  const collection = client.db().collection("todo");
  const { id, text, completed } = await req.json();
  try {
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { text: text, completed: completed } },
    );

    return NextResponse.json(
      { msg: "OK", Task: "Task Successful update" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ msg: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const client = await clientPromise;
  const collection = client.db().collection("todo");
  const { id } = await req.json();
  try {
    await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json(
      { message: "Task Successful delete" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ msg: "Error", error }, { status: 500 });
  }
}
