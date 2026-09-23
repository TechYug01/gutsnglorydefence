import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;          // Cloudinary URL
  imagePublicId?: string; // Cloudinary public ID for deletion
  externalLink: string;   // Enroll / buy link
  tags: string[];
  views: number;
  enrollClicks: number;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  // Virtuals
  isFree: boolean;
  isNew: boolean;
  discountPercent: number;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, default: 0, min: 0 },
    discountPrice: { type: Number, min: 0 },
    image: { type: String, required: true },
    imagePublicId: { type: String },
    externalLink: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0, min: 0 },
    enrollClicks: { type: Number, default: 0, min: 0 },
    expiryDate: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Virtuals ──────────────────────────────────────

CourseSchema.virtual("isFree").get(function () {
  return this.price === 0;
});

CourseSchema.virtual("isNew").get(function () {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return this.createdAt > sevenDaysAgo;
});

CourseSchema.virtual("discountPercent").get(function () {
  if (!this.discountPrice || this.price === 0) return 0;
  return Math.round(((this.price - this.discountPrice) / this.price) * 100);
});

// ── Indexes ───────────────────────────────────────

CourseSchema.index({ enrollClicks: -1 }); // popular
CourseSchema.index({ views: -1 }); // trending
CourseSchema.index({ createdAt: -1 }); // new
CourseSchema.index({ price: 1 }); // free / paid filter
CourseSchema.index({ title: "text", description: "text" }); // search

// ── Model ─────────────────────────────────────────

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);

export default Course;

// ── Sort helpers (used in API routes) ─────────────

export type SortType = "popular" | "trending" | "old" | "default";

export function getSortQuery(sort: SortType): Record<string, 1 | -1> {
  switch (sort) {
    case "popular":
      return { enrollClicks: -1 };
    case "trending":
      return { views: -1 };
    case "old":
      return { createdAt: 1 };
    default:
      return { createdAt: -1 };
  }
}
