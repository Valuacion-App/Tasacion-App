# stage 1: Compile and Build angular codebase
FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# stage 2: Serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/tasacion-app /usr/share/nginx/html
COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80