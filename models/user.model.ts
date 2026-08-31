import mongoose, { Schema, Document, Model } from "mongoose";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "MODERATOR" | "USER";
export type UserStatus = "ACTIVE" | "BLOCKED" | "PENDING";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "MODERATOR", "USER"],
      default: "USER",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED", "PENDING"],
      default: "ACTIVE",
    },
    avatar: {
      type: String,
      default: "",
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export { User };
export default User;
