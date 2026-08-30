// import fs from "node:fs";
// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import { prisma } from "../lib/prisma";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// async function main() {
//   const jsonPath = path.join(__dirname, "../data/parsed/video.json");
//   const fileContent = fs.readFileSync(jsonPath, "utf-8");
//   const videos = JSON.parse(fileContent);

//   console.log(`Loaded ${videos.length} videos from JSON.`);

//   // Clear existing records
//   await prisma.videoFile.deleteMany();
//   console.log("Cleared existing VideoFile records.");

//   // Map JSON keys to VideoFile prisma model
//   const dataToInsert = videos.map((video: any) => ({
//     title: video.title,
//     provider: video.platform,
//     videoUrl: video.videoUrl,
//     size: video.runtimeSeconds, // Mapping duration in seconds to size float field
//   }));

//   const result = await prisma.videoFile.createMany({
//     data: dataToInsert,
//   });

//   console.log(`Successfully seeded ${result.count} VideoFile records!`);
// }

// main()
//   .catch((e) => {
//     console.error("Error seeding database:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
