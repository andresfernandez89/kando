import mongoose from "mongoose";

export interface Task extends mongoose.Document {
  _id: string;
  content: string;
  columnId: string;
}

const TaskSchema = new mongoose.Schema<Task>(
  {
    content: {
      type: String,
    },
    columnId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose?.models?.Task ||
  mongoose.model<Task>("Task", TaskSchema);
