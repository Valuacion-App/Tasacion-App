# stage 1: Compile and Build angular codebase
FROM node:20-alpine as angular
WORKDIR /ng-app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=angular /app/dist/tasacion-app/browser /usr/share/nginx/html
EXPOSE 80
