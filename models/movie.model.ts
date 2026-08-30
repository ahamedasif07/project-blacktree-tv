import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMovie extends Document {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  backdropUrl?: string;
  trailerUrl?: string;
  videoUrl?: string;
  year: number;
  duration: string;
  rating: number;
  genres: string[];
  languages: string[];
  quality: string;
  pgRating: string;
  isFeatured: boolean;
  isUpcoming: boolean;
  isTrending: boolean;
  releaseDate?: string;
  label?: string;
  subtitle?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MovieSchema = new Schema<IMovie>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Poster image is required"],
    },
    backdropUrl: {
      type: String,
      default: "",
    },
    trailerUrl: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
    year: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0.0,
    },
    genres: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      default: ["English"],
    },
    quality: {
      type: String,
      default: "HD",
    },
    pgRating: {
      type: String,
      default: "PG-13",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isUpcoming: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    releaseDate: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Movie: Model<IMovie> =
  mongoose.models.Movie || mongoose.model<IMovie>("Movie", MovieSchema);
