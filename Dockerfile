# Stage 0, "build-stage"
FROM node:12.2.0-alpine as build-stage
WORKDIR /app
COPY package.json /app/
RUN  npm set registry http://172.16.10.13:4873
RUN npm install
COPY ./ /app/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.16
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/workflow-web
COPY nginx.conf /etc/nginx/conf.d/default.conf
