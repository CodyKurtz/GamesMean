FROM node
RUN mkdir -p /app
RUN mkdir -p /app
WORKDIR /app
COPY . /app

EXPOSE 3000
CMD [ "npm", "start" ]