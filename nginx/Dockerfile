FROM nginx

RUN apt-get update && apt-get -y install apache2-utils

COPY ./config/default.conf /etc/nginx/conf.d/default.conf
COPY ./config/htpasswd /etc/nginx/htpasswd
COPY ./ssl/server.crt /etc/nginx/conf.d/
COPY ./ssl/server.key /etc/nginx/conf.d/

CMD nginx -g "daemon off;"
