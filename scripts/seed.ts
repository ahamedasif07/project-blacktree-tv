import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { seedAdmin } from "./admin/seed-admin";
import { seedMovies } from "./movies/seed-movies";
import { seedActors } from "./actors/seed-actors";
import { seedVideos } from "./videos/seed-videos";

export async function runDatabaseSeed() {
  console.log("🚀 Starting complete database seeding...\n");
  await connectDB();

  // 1. Seed Admin
  const admin = await seedAdmin();

  // 2. Seed Movies
  const movies = await seedMovies();

  // 3. Seed Actors
  const actors = await seedActors();

  // 4. Seed Videos
  const videos = await seedVideos();

  console.log("\n🎉 All database collections seeded successfully!");
  return {
    admin: admin.email,
    movies: movies.length,
    actors: actors.length,
    videos: videos.length,
  };
}

async function main() {
  try {
    const result = await runDatabaseSeed();
    console.log("\n📊 Seed Summary:", result);
    process.exit(0);
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  main();
}
