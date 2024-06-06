import mongoose from "mongoose";

export interface Todo extends mongoose.Document {
  title: string;
  description: string;
  status: boolean;
}

const TodoSchema = new mongoose.Schema<Todo>(
  {
    title: {
      type: String,
      required: [true, "Please provide a name for this pet."],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide the pet owner's name"],
      maxlength: [250, "Owner's Name cannot be more than 60 characters"],
    },
    status: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose?.models?.Todo ||
  mongoose.model<Todo>("Todo", TodoSchema);
