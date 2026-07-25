FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy application source
COPY . .

# Expose port
EXPOSE 5000

# Run the server using the existing start script (tsx)
CMD ["npm", "start"]
