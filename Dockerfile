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

# Copy backend configuration and source
COPY backend/config ./config
COPY backend/src ./src
COPY backend/public ./public

# Create additional required directories
RUN mkdir -p .tmp

# Ensure public directory has proper permissions and content
RUN mkdir -p public && chmod 755 public && touch public/.gitkeep

# Build the application (non-interactive)
RUN NODE_ENV=production npm run build

# Verify structure
RUN echo "=== Directory Structure ===" && ls -la && echo "=== Public folder ===" && ls -la public/

# Expose port
EXPOSE 1337

# Start the application
CMD ["npm", "start"]