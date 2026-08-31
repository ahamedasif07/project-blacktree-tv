import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVideo extends Document {
  videoId: string;
  title: string;
  provider: string;
  videoUrl: string;
  size?: number;
  runtimeSeconds?: number;
  thumbnailUrl?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    videoId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    provider: {
      type: String,
      default: "YouTube",
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
    },
    size: {
      type: Number,
      default: 0,
    },
    runtimeSeconds: {
      type: Number,
      default: 0,
    },
    thumbnailUrl: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "General",
    },
  },
  {
    timestamps: true,
  }
);

const Video: Model<IVideo> =
  mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
