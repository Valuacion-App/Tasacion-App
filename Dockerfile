# stage 1: Compile and Build angular codebase
FROM node:latest as build
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build

# stage 2: Serve app with nginx server
# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=build /app/dist/tasacion-app /usr/share/nginx/html

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
EXPOSE 80
