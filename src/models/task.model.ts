import mongoose from "mongoose";

export interface ITask extends mongoose.Document {
  _id: string;
  content: string;
  columnId: string | number;
}

const TaskSchema = new mongoose.Schema<ITask>(
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
  mongoose.model<ITask>("Task", TaskSchema);
