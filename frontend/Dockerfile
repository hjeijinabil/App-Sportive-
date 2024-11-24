# Use an official Node.js runtime as the base image
FROM node:20.11.0-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Set the network mode to host (add this line in the Dockerfile)
# RUN --network=host npm install

# Install the project dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular project for production
RUN npm run build --prod

# Stage 2: Create a new image to serve the built Angular application using Nginx
FROM nginx:alpine

# Copy the built Angular application from the previous stage to the Nginx HTML directory
COPY --from=build /app/dist/sporte /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]