import { dbConnect } from "@/lib/dbConnect";
import Column from "@/models/column.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const columns = await Column.find({});

    return NextResponse.json(columns, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: "Error fetching columns", error: error },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { msg: "Missing title in request body" },
        { status: 400 },
      );
    }

    const newColumn = await Column.create({ title });

    return NextResponse.json(newColumn, { status: 201 });
  } catch (error) {
    NextResponse.json(
      { msg: "Error creating new column:", error: error },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { _id } = await req.json();

    const columnDeleted = await Column.deleteOne({ _id: _id });

    if (columnDeleted.deletedCount === 0) {
      return NextResponse.json({ msg: "Column not found" }, { status: 404 });
    }

    return NextResponse.json(
      { msg: "Column deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    NextResponse.json(
      { msg: "Error deleting column:", error: error },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { _id, title } = await req.json();

    if (!_id || !title) {
      return NextResponse.json(
        { msg: "Missing _id or title in request body" },
        { status: 400 },
      );
    }

    const columnUpdated = await Column.updateOne({ _id }, { $set: { title } });

    if (columnUpdated.modifiedCount === 0) {
      return NextResponse.json(
        { msg: "Column not found or no changes made" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { msg: "Column updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Error updating column", error: error },
      { status: 500 },
    );
  }
}
