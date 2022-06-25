# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# production stage
FROM nginx:alpine as production-stage

ADD vhost.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www
COPY --from=build-stage /app/dist ./
EXPOSE 80
