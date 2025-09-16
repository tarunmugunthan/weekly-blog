# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Create tmp directory for SQLite (if using in development)
RUN mkdir -p .tmp

# Build the application
RUN npm run build

# Expose port
EXPOSE 1337

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]