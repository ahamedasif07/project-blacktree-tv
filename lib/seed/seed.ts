import { connectDB } from "@/lib/db";
import { Movie, Actor, Video, User } from "@/models";
import bcrypt from "bcryptjs";
import moviesData from "./movies.json";
import actorsData from "./actors.json";
import videosData from "./videos.json";

export async function runDatabaseSeed() {
  console.log("🚀 Starting database seeding...");
  await connectDB();

  // 1. Seed Movies
  console.log(`🎬 Seeding ${moviesData.length} movies...`);
  let movieCount = 0;
  for (const movie of moviesData) {
    await Movie.findOneAndUpdate(
      { slug: movie.slug },
      { ...movie },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    movieCount++;
  }
  console.log(`✅ ${movieCount} movies seeded successfully.`);

  // 2. Seed Actors
  console.log(`🌟 Seeding ${actorsData.length} actors...`);
  let actorCount = 0;
  for (const actor of actorsData) {
    await Actor.findOneAndUpdate(
      { slug: actor.slug },
      { ...actor },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    actorCount++;
  }
  console.log(`✅ ${actorCount} actors seeded successfully.`);

  // 3. Seed Videos
  console.log(`📹 Seeding ${videosData.length} videos...`);
  let videoCount = 0;
  for (const video of videosData) {
    await Video.findOneAndUpdate(
      { videoId: video.videoId },
      { ...video },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    videoCount++;
  }
  console.log(`✅ ${videoCount} videos seeded successfully.`);

  // 4. Ensure Super Admin Exists
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
  } else {
    console.log(`👑 Super Admin already exists: ${adminEmail}`);
  }

  console.log("🎉 Database seeding completed successfully!");
  return {
    movies: movieCount,
    actors: actorCount,
    videos: videoCount,
  };
}
