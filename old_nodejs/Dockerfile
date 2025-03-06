# Use NodeJS runtime as the base image
FROM node:18

# Set the wordkir in the container
WORKDIR /app

# Copy the package.json and package-lock.json for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY .. .

# Export the used port
EXPOSE 3000

# Run the application with CMD
CMD ["node", "server.js"]