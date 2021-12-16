# contacts-client

# 1. Setting up NODE and app compilation
FROM node:14-alpine as node
WORKDIR /usr/src/contacts-client
COPY . .
RUN npm install
RUN npm run build --prod

# 2. Desplegar la aplicación en nginx
FROM nginx:latest

ARG APP_FOLDER=contacts-demo-client
ARG SOURCE_DIR=/usr/src/contacts-client/dist/apps

COPY --from=node ${SOURCE_DIR}/${APP_FOLDER} /usr/share/nginx/html
EXPOSE 80
