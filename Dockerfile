# Use lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (caching benefit)
COPY package*.json ./
RUN npm install

# Copy remaining code
COPY . .

# Generate Prisma client inside the container
RUN npx prisma generate

# Expose app port
EXPOSE 3000

# Start the app (development)
CMD ["npm", "run", "dev"]