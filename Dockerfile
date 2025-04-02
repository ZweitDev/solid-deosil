# Use an official Node.js runtime as a base image
FROM node:22-alpine AS builder

# Enable and configure pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# First copy package files and lockfile
COPY package.json pnpm-lock.yaml* .npmrc* ./

# Install dependencies (frozen lockfile for prod)
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build the app
RUN pnpm build

# Stage 2: Prod image
FROM node:22-alpine

WORKDIR /app

# Copy package.json and production dependencies
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

# Copy built assets (may need adjustment based on SolidJS config)
COPY --from=builder /app/.output ./.output

# Env Variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Start command
CMD ["node", "./output/server/index.mjs" ]