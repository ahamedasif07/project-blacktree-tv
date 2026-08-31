import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User, { IUser, UserRole, UserStatus } from "@/models/user.model";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalUsers: number;
  totalSuperAdmins: number;
  totalAdmins: number;
  totalModerators: number;
  totalRegularUsers: number;
  activeUsers: number;
  blockedUsers: number;
}

export interface GetUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole | "ALL";
  status?: UserStatus | "ALL";
}

export interface PaginatedUsersResult {
  users: Array<Omit<IUser, "password">>;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateStaffInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

// ─── Super Admin Service Functions ────────────────────────────────────────────

/**
 * 1. Get overview statistics for the Super Admin Dashboard
 */
async function getDashboardStats(): Promise<DashboardStats> {
  await connectDB();

  const [
    totalUsers,
    totalSuperAdmins,
    totalAdmins,
    totalModerators,
    totalRegularUsers,
    activeUsers,
    blockedUsers,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "SUPER_ADMIN" }),
    User.countDocuments({ role: "ADMIN" }),
    User.countDocuments({ role: "MODERATOR" }),
    User.countDocuments({ role: "USER" }),
    User.countDocuments({ status: "ACTIVE" }),
    User.countDocuments({ status: "BLOCKED" }),
  ]);

  return {
    totalUsers,
    totalSuperAdmins,
    totalAdmins,
    totalModerators,
    totalRegularUsers,
    activeUsers,
    blockedUsers,
  };
}

/**
 * 2. Get paginated and filtered list of users
 */
async function getUsers(query: GetUsersQuery): Promise<PaginatedUsersResult> {
  await connectDB();

  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(query.limit) || 10));
  const skip = (page - 1) * limit;

  // Build MongoDB query filter
  const filter: Record<string, unknown> = {};

  if (query.role && query.role !== "ALL") {
    filter.role = query.role;
  }

  if (query.status && query.status !== "ALL") {
    filter.status = query.status;
  }

  if (query.search && query.search.trim()) {
    const searchRegex = new RegExp(query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ name: searchRegex }, { email: searchRegex }];
  }

  const [users, total] = await Promise.all([
    User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments(filter),
  ]);

  return {
    users: users as unknown as Array<Omit<IUser, "password">>,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
}

/**
 * 3. Get single user details by ID
 */
async function getUserById(userId: string) {
  await connectDB();
  const user = await User.findById(userId).select("-password").lean();
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

/**
 * 4. Super Admin creates a new Staff/User account directly
 */
async function createStaffUser(input: CreateStaffInput) {
  await connectDB();

  const trimmedName = input.name.trim();
  const normalizedEmail = input.email.toLowerCase().trim();

  if (!trimmedName || trimmedName.length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(normalizedEmail)) {
    throw new Error("Please provide a valid email address");
  }

  if (!input.password || input.password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  const newUser = await User.create({
    name: trimmedName,
    email: normalizedEmail,
    password: hashedPassword,
    role: input.role || "USER",
    status: "ACTIVE",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(trimmedName)}`,
  });

  return {
    id: newUser._id.toString(),
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    status: newUser.status,
    avatar: newUser.avatar,
    createdAt: newUser.createdAt,
  };
}

/**
 * 5. Update user role (e.g. Promote to ADMIN, MODERATOR, or change to USER)
 */
async function updateUserRole(userId: string, newRole: UserRole, superAdminId: string) {
  await connectDB();

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Prevent super admin from accidentally demoting themselves if they are the target
  if (userId === superAdminId && newRole !== "SUPER_ADMIN") {
    throw new Error("You cannot change your own Super Admin role");
  }

  // Protect main system super admin email
  if (user.email === "rxasif31@gmail.com" && newRole !== "SUPER_ADMIN") {
    throw new Error("Cannot modify the Primary Super Admin role");
  }

  user.role = newRole;
  await user.save();

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}

/**
 * 6. Update user account status (ACTIVE, BLOCKED, PENDING)
 */
async function updateUserStatus(userId: string, newStatus: UserStatus, superAdminId: string) {
  await connectDB();

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Cannot block self
  if (userId === superAdminId && newStatus === "BLOCKED") {
    throw new Error("You cannot block your own Super Admin account");
  }

  // Cannot block primary super admin
  if (user.email === "rxasif31@gmail.com" && newStatus === "BLOCKED") {
    throw new Error("Cannot suspend the Primary Super Admin account");
  }

  user.status = newStatus;
  await user.save();

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}

/**
 * 7. Permanently delete a user account
 */
async function deleteUser(userId: string, superAdminId: string) {
  await connectDB();

  if (userId === superAdminId) {
    throw new Error("You cannot delete your own account");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.email === "rxasif31@gmail.com") {
    throw new Error("Cannot delete the Primary Super Admin account");
  }

  await User.findByIdAndDelete(userId);

  return {
    id: userId,
    message: `User ${user.email} successfully deleted`,
  };
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const superAdminService = {
  getDashboardStats,
  getUsers,
  getUserById,
  createStaffUser,
  updateUserRole,
  updateUserStatus,
  deleteUser,
};
