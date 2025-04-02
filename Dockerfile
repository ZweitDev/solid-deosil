# Use an official Node.js runtime as a base image
FROM node:22-alpine AS builder

# Install PNPM globally
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package*.json .
COPY . .
RUN pnpm install
RUN pnpm build
CMD ["node", "./dist/server.js", "--host", "0.0.0.0", "--port", "3000"]