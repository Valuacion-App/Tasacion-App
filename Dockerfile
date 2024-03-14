# stage 1: Compile and Build angular codebase
FROM node:20-alpine as angular
WORKDIR /ng-app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
ARG name
COPY --from=angular /app/dist/tasacion-app/browser /usr/share/nginx/html
EXPOSE 80


# The above commands build the Angular app and then configure and build a 
# Docker image for serving it using the nginx web server.