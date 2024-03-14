# stage 1: Compile and Build angular codebase
FROM node:latest as build
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build

# stage 2: Serve app with nginx server
# nginx state for serving content
FROM node:18-alpine
WORKDIR /usr/app
COPY --from=build /app/src/dist/tasacion-app/server ./
CMD node server.mjs
EXPOSE 4000
