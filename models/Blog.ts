import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  tags: string[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
