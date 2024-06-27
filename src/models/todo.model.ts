import mongoose from "mongoose";

export interface ITodo extends mongoose.Document {
  _id: string;
  text: string;
  completed: boolean;
  userEmail: string;
}

const TodoSchema = new mongoose.Schema<ITodo>(
  {
    text: {
      type: String,
    },
    completed: {
      type: Boolean,
    },
    userEmail: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose?.models?.Todo ||
  mongoose.model<ITodo>("Todo", TodoSchema);
