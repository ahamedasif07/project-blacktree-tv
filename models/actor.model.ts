import mongoose, { Schema, Document, Model } from "mongoose";

export interface IActor extends Document {
  id: number;
  slug: string;
  name: string;
  role: string;
  label: string;
  shortDesc: string;
  bio: string[];
  details: {
    born: string;
    awards: string;
    training: string;
  };
  image: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ActorSchema = new Schema<IActor>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    role: {
      type: String,
      default: "Actor",
    },
    label: {
      type: String,
      default: "Featured Talent",
    },
    shortDesc: {
      type: String,
      required: [true, "Short description is required"],
    },
    bio: {
      type: [String],
      default: [],
    },
    details: {
      born: { type: String, default: "" },
      awards: { type: String, default: "" },
      training: { type: String, default: "" },
    },
    image: {
      type: String,
      required: [true, "Actor image is required"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Actor: Model<IActor> =
  mongoose.models.Actor || mongoose.model<IActor>("Actor", ActorSchema);
