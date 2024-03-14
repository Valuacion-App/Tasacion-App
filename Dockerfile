# stage 1: Compile and Build angular codebase
FROM node:latest as build
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build

# stage 2: Serve app with nginx server
# use the latest version of the official nginx image as the base image
FROM nginx:1.15
COPY --from=build /app/dist/out/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf

#exposing internal port
EXPOSE 80
