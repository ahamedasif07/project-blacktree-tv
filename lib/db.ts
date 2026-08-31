import mongoose from "mongoose";

const MONGODB_URI = (process.env.MONGODB_URI || "mongodb+srv://blacktreeTV:X4OykIPgLvtz1BJV@cluster0.tzvnomp.mongodb.net/blacktree_tv?retryWrites=true&w=majority&appName=Cluster0").trim().replace(/;$/, "");

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development and serverless invocations.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log(" MongoDB Connected successfully.");
      return mongooseInstance;
    }).catch((err) => {
      console.error(" MongoDB connection error:", err);
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
