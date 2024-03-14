FROM node:20-alpine3.18
WORKDIR /app
COPY package*.json ./
COPY decorate-angular-cli.js ./
COPY dist ./dist
RUN npm install
EXPOSE 4200
CMD ["node", "dist/myApp/server/server.mjs" ]