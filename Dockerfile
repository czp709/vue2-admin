FROM node:14
FROM nginx:1.21.1

LABEL maintainer="zipen"
LABEL email="chenzhipeng709@163.com"

COPY dist/ /usr/share/nginx/html

COPY Docker/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;"]