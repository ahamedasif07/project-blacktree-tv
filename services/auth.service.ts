import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User, IUser, UserRole } from "@/models/user.model";
import { signToken, TokenPayload } from "@/lib/jwt";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: string;
    avatar?: string;
  };
  token: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SUPER_ADMIN_EMAIL = "rxasif31@gmail.com";
const SUPER_ADMIN_NAME = "admin";

// ─── Handlers ─────────────────────────────────────────────────────────────────

/**
 * Seed the Super Admin user if it does not already exist in MongoDB.
 * Also ensures the existing super admin has correct role, status, and password.
 */
async function seedSuperAdmin(): Promise<void> {
  try {
    await connectDB();
    const defaultPassword = process.env.SUPER_ADMIN_PASSWORD || "RX asif 100";
    const existingSuperAdmin = await User.findOne({ email: SUPER_ADMIN_EMAIL });

    if (!existingSuperAdmin) {
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      await User.create({
        name: SUPER_ADMIN_NAME,
        email: SUPER_ADMIN_EMAIL,
        password: hashedPassword,
        role: "SUPER_ADMIN",
        status: "ACTIVE",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      });
      console.log("👑 Super Admin seeded: rxasif31@gmail.com (Username: admin)");
      return;
    }

    // Sync existing super admin fields if they drifted
    let isModified = false;

    if (existingSuperAdmin.name !== SUPER_ADMIN_NAME) {
      existingSuperAdmin.name = SUPER_ADMIN_NAME;
      isModified = true;
    }
    if (existingSuperAdmin.role !== "SUPER_ADMIN") {
      existingSuperAdmin.role = "SUPER_ADMIN";
      isModified = true;
    }
    if (existingSuperAdmin.status !== "ACTIVE") {
      existingSuperAdmin.status = "ACTIVE";
      isModified = true;
    }

    // Ensure password matches either accepted variant
    const isPassValid1 = await bcrypt.compare("RX asif 100", existingSuperAdmin.password);
    const isPassValid2 = await bcrypt.compare("RXasif@100", existingSuperAdmin.password);
    if (!isPassValid1 && !isPassValid2) {
      existingSuperAdmin.password = await bcrypt.hash(defaultPassword, 10);
      isModified = true;
    }

    if (isModified) {
      await existingSuperAdmin.save();
    }
  } catch (error) {
    console.warn("[AuthService] seedSuperAdmin skipped/errored:", error);
  }
}

/**
 * Authenticate a user by email or username + password.
 * Returns user data and a signed JWT token.
 */
async function login(identifier: string, password: string): Promise<AuthResponse> {
  await connectDB();
  await seedSuperAdmin();

  const normalizedIdentifier = identifier.trim();
  if (!normalizedIdentifier) {
    throw new Error("Please enter your username or email");
  }

  // Match by email OR username (case-insensitive)
  const escapedIdentifier = normalizedIdentifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const user = await User.findOne({
    $or: [
      { email: normalizedIdentifier.toLowerCase() },
      { name: { $regex: new RegExp(`^${escapedIdentifier}$`, "i") } },
    ],
  });

  if (!user?.password) {
    throw new Error("Invalid username/email or password");
  }

  if (user.status === "BLOCKED") {
    throw new Error("Your account has been suspended. Please contact support.");
  }

  let isPasswordValid = await bcrypt.compare(password, user.password);

  // Fallback support for Super Admin credential variants
  if (!isPasswordValid && user.email === SUPER_ADMIN_EMAIL) {
    if (password === "RX asif 100" || password === "RXasif@100") {
      isPasswordValid = true;
      user.password = await bcrypt.hash(password, 10); // upgrade hash
    }
  }

  if (!isPasswordValid) {
    throw new Error("Invalid username/email or password");
  }

  user.lastLogin = new Date();
  await user.save();

  const tokenPayload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const token = await signToken(tokenPayload, "7d");

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      avatar: user.avatar,
    },
    token,
  };
}

/**
 * Register a new user account.
 * Returns user data and a signed JWT token.
 */
async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  await connectDB();
  await seedSuperAdmin();

  const trimmedName = name.trim();
  const normalizedEmail = email.toLowerCase().trim();

  if (!trimmedName || trimmedName.length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(normalizedEmail)) {
    throw new Error("Please enter a valid email address");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name: trimmedName,
    email: normalizedEmail,
    password: hashedPassword,
    role: "USER",
    status: "ACTIVE",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(trimmedName)}`,
  });

  const tokenPayload: TokenPayload = {
    userId: newUser._id.toString(),
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
  };

  const token = await signToken(tokenPayload, "7d");

  return {
    user: {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      avatar: newUser.avatar,
    },
    token,
  };
}

/**
 * Retrieve a user by their ID (excludes password field).
 */
async function getCurrentUser(userId: string): Promise<IUser | null> {
  await connectDB();
  return User.findById(userId).select("-password");
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const authService = { seedSuperAdmin, login, register, getCurrentUser };

/** @deprecated Use `authService` (camelCase) instead */
export const AuthService = authService;
