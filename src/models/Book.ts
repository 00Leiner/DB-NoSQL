import mongoose, { Document, Schema } from "mongoose";

export interface IBook {
  title: string;
  author: string;
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, requird: true },
    author: { type: Schema.Types.ObjectId, requires: true, ref: "Author" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBookModel>("Book", BookSchema);
