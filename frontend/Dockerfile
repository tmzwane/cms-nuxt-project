FROM node:16-alpine

WORKDIR /frontend

RUN apk --no-cache add openssh g++ make python3 git

COPY package.json /frontend/
COPY package-lock.json /frontend/

RUN npm ci && npm cache clean --force

ADD . /frontend

RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]