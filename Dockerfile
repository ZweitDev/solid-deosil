# Use an official Node.js runtime as a base image
FROM node:22-alpine AS builder

# Install PNPM globally
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package*.json .
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "run","dev"]