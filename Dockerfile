# stage 1: Compile and Build angular codebase
FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]


# The above commands build the Angular app and then configure and build a 
# Docker image for serving it using the nginx web server.