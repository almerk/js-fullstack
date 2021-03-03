# stage1 as builder
FROM node:10-alpine as builder

WORKDIR /vue-ui

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Build the project
RUN npm run build


FROM nginx:alpine as production-build
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN chmod 744 /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

# Copy from the stage 1
COPY --from=builder /vue-ui/dist /usr/share/nginx/html/dist
COPY --from=builder /vue-ui/index.html /usr/share/nginx/html/index.html
RUN chmod -R 755 /usr/share/nginx/html/


EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]