import mongoose from "mongoose";

export interface Task extends mongoose.Document {
  content: string;
  columnId: Number;
}

const TaskSchema = new mongoose.Schema<Task>(
  {
    content: {
      type: String,
    },
    columnId: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose?.models?.Task ||
  mongoose.model<Task>("Task", TaskSchema);
