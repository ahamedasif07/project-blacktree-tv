import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User, IUser, UserRole } from "@/models/user.model";
import { signToken, TokenPayload } from "@/lib/jwt";

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

export class AuthService {
  /**
   * Automatically ensure Super Admin user exists in MongoDB
   */
  static async seedSuperAdmin(): Promise<void> {
    try {
      await connectDB();
      const superAdminEmail = "rxasif31@gmail.com";
      const superAdminName = "admin";
      const defaultPassword = process.env.SUPER_ADMIN_PASSWORD || "RX asif 100";

      const existingSuperAdmin = await User.findOne({ email: superAdminEmail });

      if (!existingSuperAdmin) {
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        await User.create({
          name: superAdminName,
          email: superAdminEmail,
          password: hashedPassword,
          role: "SUPER_ADMIN",
          status: "ACTIVE",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
        });

        console.log("👑 Super Admin seeded successfully: rxasif31@gmail.com (Username: admin)");
      } else {
        let isModified = false;
        if (existingSuperAdmin.name !== superAdminName) {
          existingSuperAdmin.name = superAdminName;
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

        // Ensure password matches RX asif 100 or RXasif@100
        const isPassValid1 = await bcrypt.compare("RX asif 100", existingSuperAdmin.password);
        const isPassValid2 = await bcrypt.compare("RXasif@100", existingSuperAdmin.password);
        if (!isPassValid1 && !isPassValid2) {
          existingSuperAdmin.password = await bcrypt.hash(defaultPassword, 10);
          isModified = true;
        }

        if (isModified) {
          await existingSuperAdmin.save();
        }
      }
    } catch (error) {
      console.warn("Super admin seeding skipped/errored:", error);
    }
  }

  /**
   * Authenticate user with Email/Username & Password
   */
  static async login(identifier: string, password: string): Promise<AuthResponse> {
    await connectDB();
    await this.seedSuperAdmin();

    const normalizedIdentifier = identifier.trim();
    if (!normalizedIdentifier) {
      throw new Error("Please enter your username or email");
    }

    // Look up by Email OR Name/Username (case-insensitive)
    const escapedIdentifier = normalizedIdentifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const user = await User.findOne({
      $or: [
        { email: normalizedIdentifier.toLowerCase() },
        { name: { $regex: new RegExp(`^${escapedIdentifier}$`, "i") } },
      ],
    });

    if (!user || !user.password) {
      throw new Error("Invalid username/email or password");
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);

    // Fallback support for Super Admin credentials variants
    if (!isPasswordValid && user.email === "rxasif31@gmail.com") {
      if (password === "RX asif 100" || password === "RXasif@100") {
        isPasswordValid = true;
        // Update to new hash
        user.password = await bcrypt.hash(password, 10);
      }
    }

    if (!isPasswordValid) {
      throw new Error("Invalid username/email or password");
    }

    // Update last login
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
   * Register a new user
   */
  static async register(name: string, email: string, password: string): Promise<AuthResponse> {
    await connectDB();
    await this.seedSuperAdmin();

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      throw new Error("An account with this email already exists");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "USER",
      status: "ACTIVE",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
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
   * Retrieve current user by userId
   */
  static async getCurrentUser(userId: string): Promise<IUser | null> {
    await connectDB();
    return await User.findById(userId).select("-password");
  }
}
