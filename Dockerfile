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
COPY --from=builder /app/dist/tasacion-app/browser /usr/share/nginx/html
EXPOSE 80
