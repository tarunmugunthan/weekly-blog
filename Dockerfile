# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set environment to production early
ENV NODE_ENV=production

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy backend source code
COPY backend/ ./

# Create tmp directory for SQLite (if using in development)
RUN mkdir -p .tmp

# Build the application (non-interactive)
RUN NODE_ENV=production npm run build

# Expose port
EXPOSE 1337

# Start the application
CMD ["npm", "start"]