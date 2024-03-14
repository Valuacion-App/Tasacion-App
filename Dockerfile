# stage 1: Compile and Build angular codebase
FROM node:latest as build
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build

# stage 2: Serve app with nginx server
# nginx state for serving content
# Expose port 80 for the container
EXPOSE 80

# Start the app
CMD ["npm", "start"]
