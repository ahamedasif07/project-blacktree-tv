# ==============================================================================
# STAGE 1: Build stage (Node-based for robust native C++ compiling & Prisma)
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies needed for compiling native C++ addons (like bcrypt) on Alpine
RUN apk add --no-cache openssl ca-certificates libc6-compat build-base python3 make

# Copy package files
COPY package.json ./

# Install all dependencies with legacy peer dependency resolution
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Set dummy DATABASE_URL to satisfy Prisma schema validation during build phase
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Generate the type-safe Prisma client (outputs to src/generated as per schema.prisma)
RUN npx prisma generate

# ==============================================================================
# STAGE 2: Production dependencies installer (Node-based)
# ==============================================================================
FROM node:20-alpine AS prod-deps

WORKDIR /app

COPY package.json ./

# Install system dependencies needed for native C++ addons on Alpine
RUN apk add --no-cache openssl ca-certificates libc6-compat build-base python3 make

# Install only production dependencies
RUN npm install --omit=dev --legacy-peer-deps

# ==============================================================================
# STAGE 3: Final Runner stage (Fully Bun-based running native TypeScript!)
# ==============================================================================
FROM oven/bun:1.1.20-alpine AS runner

# Install tini to handle PID 1 signal forwarding and zombie process reaping
RUN apk add --no-cache tini

WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Copy source, tsconfig, prisma config, production dependencies, and prisma files
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/prisma ./prisma
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/package.json ./package.json

# Harden permissions: set file ownership to the built-in non-root "bun" user
RUN chown -R bun:bun /app

# Run the container under non-privileged user space
USER bun

EXPOSE 5000

# Bind tini as the entrypoint to handle graceful shutdowns (SIGTERM / SIGINT)
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["bun", "run", "src/server.ts"]