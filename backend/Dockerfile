# Build stage, download base image for node
FROM node:16

LABEL maintainer="Thabang Zwane"

RUN export DEBIAN_FRONTEND=noninteractive

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]