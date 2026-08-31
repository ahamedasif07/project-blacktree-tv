import { connectDB } from "@/lib/db";
import Movie from "@/models/movie.model";
import Actor from "@/models/actor.model";
import Video from "@/models/video.model";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { seedMovies, seedActors, seedVideos } from "./seed-data";

/**
 * Clean and simple database seeder
 */
export async function runDatabaseSeed() {
  console.log("🚀 Starting database seeding...");
  await connectDB();

  // 1. Seed Movies
  console.log(`🎬 Seeding ${seedMovies.length} movies...`);
  for (const movie of seedMovies) {
    await Movie.findOneAndUpdate({ slug: movie.slug }, movie, { upsert: true });
  }

  // 2. Seed Actors
  console.log(`🌟 Seeding ${seedActors.length} actors...`);
  for (const actor of seedActors) {
    await Actor.findOneAndUpdate({ slug: actor.slug }, actor, { upsert: true });
  }

  // 3. Seed Videos
  console.log(`📹 Seeding ${seedVideos.length} videos...`);
  for (const video of seedVideos) {
    await Video.findOneAndUpdate({ videoId: video.videoId }, video, { upsert: true });
  }

  // 4. Ensure Super Admin Account Exists
  const adminEmail = "admin@blacktree.tv";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const rawPassword = process.env.SUPER_ADMIN_PASSWORD || "RXasif@100";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    await User.create({
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin",
    });
    console.log(`👑 Super Admin created: ${adminEmail}`);
  }

  console.log("🎉 Database seeding completed successfully!");
  return {
    movies: seedMovies.length,
    actors: seedActors.length,
    videos: seedVideos.length,
  };
}
