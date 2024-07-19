# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
