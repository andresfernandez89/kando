import mongoose from "mongoose";

export interface Column extends mongoose.Document {
  title: string;
}

const ColumnSchema = new mongoose.Schema<Column>(
  {
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose?.models?.Column ||
  mongoose.model<Column>("Column", ColumnSchema);
