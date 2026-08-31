import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export const initialAdmin = {
  name: "Super Admin",
  email: "admin@blacktree.tv",
  role: "SUPER_ADMIN" as const,
  status: "ACTIVE" as const,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin",
};

export async function seedAdmin() {
  await connectDB();
  console.log("Connecting to MongoDB to seed Super Admin...");

  const existingAdmin = await User.findOne({ email: initialAdmin.email });
  const rawPassword = process.env.SUPER_ADMIN_PASSWORD || "RXasif@100";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  if (!existingAdmin) {
    const created = await User.create({
      ...initialAdmin,
      password: hashedPassword,
    });
    console.log(`👑 Super Admin created: ${created.email} (ObjectId: ${created._id})`);
    return created;
  } else {
    existingAdmin.name = initialAdmin.name;
    existingAdmin.role = "SUPER_ADMIN";
    existingAdmin.status = "ACTIVE";
    existingAdmin.password = hashedPassword;
    await existingAdmin.save();
    console.log(`👑 Super Admin updated & synced: ${existingAdmin.email} (ObjectId: ${existingAdmin._id})`);
    return existingAdmin;
  }
}

// Allow direct script execution: bun scripts/admin/seed-admin.ts
if (require.main === module) {
  seedAdmin()
    .then(() => {
      console.log("🎉 Admin seed finished.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Failed to seed admin:", err);
      process.exit(1);
    });
}
