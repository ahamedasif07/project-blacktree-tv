import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { runDatabaseSeed } from "../lib/seed/seed";

async function main() {
  try {
    const result = await runDatabaseSeed();
    console.log(" Seeding completed with result:", result);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

main();
