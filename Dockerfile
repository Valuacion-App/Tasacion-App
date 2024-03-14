# stage 1: Compile and Build angular codebase
FROM node:latest as build
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code to /app
COPY . .

# Build the app for production
RUN npm run build --prod

# Expose port 80 for the container
EXPOSE 80

# Start the app
CMD ["npm", "start"]
