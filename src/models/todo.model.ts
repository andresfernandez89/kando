import mongoose from "mongoose";

export interface ITodo extends mongoose.Document {
  _id: string;
  text: string;
  completed: boolean;
}

const TodoSchema = new mongoose.Schema<ITodo>(
  {
    text: {
      type: String,
    },
    completed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose?.models?.Todo ||
  mongoose.model<ITodo>("Todo", TodoSchema);
