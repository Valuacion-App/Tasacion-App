# stage 1: Compile and Build angular codebase
FROM node:latest as build
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build

# stage 2: Serve app with nginx server
# use the latest version of the official nginx image as the base image
FROM nginx:latest
COPY --from=build /app/dist/tasacion-app /usr/share/nginx/html

#copying nginx config from local to image
COPY /nginx.conf /etc/nginx/conf.d/default.conf

#exposing internal port
EXPOSE 80

# The above commands build the Angular app and then configure and build a 
# Docker image for serving it using the nginx web server.