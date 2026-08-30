# ==============================================================================
# STAGE 1: Build stage (Node-based for robust Next.js and native builds)
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies needed for secure network calls and native compiling
RUN apk add --no-cache openssl ca-certificates libc6-compat build-base python3 make

# Copy dependency files
COPY package.json ./

# Install all dependencies with legacy peer dependency resolution for React 19 compatibility
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Set build-time environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Run Next.js build (generates .next/standalone and .next/static)
RUN npm run build

# ==============================================================================
# STAGE 2: Runner stage (Fully Bun-based for production speed)
# ==============================================================================
FROM oven/bun:1.1.20-alpine AS runner

# Install tini to handle PID 1 signal forwarding and zombie process reaping
RUN apk add --no-cache tini

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

# Copy public assets and static files from build stage
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Harden permissions: set file ownership to the built-in non-root "bun" user
RUN chown -R bun:bun /app

# Run the container under non-privileged user space
USER bun

EXPOSE 3000

# Bind tini as the entrypoint to handle graceful shutdowns (SIGTERM / SIGINT)
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["bun", "run", "server.js"]