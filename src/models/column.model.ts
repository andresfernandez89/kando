import mongoose from "mongoose";

export interface IColumn extends mongoose.Document {
  _id: string;
  title: string;
}

const ColumnSchema = new mongoose.Schema<IColumn>(
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
  mongoose.model<IColumn>("Column", ColumnSchema);
