FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package.json ./

RUN apk add --no-cache git

COPY . /home/node/app/

RUN chown -R node:node /home/node

RUN npm ci

RUN node ace build --production

RUN cd build

RUN npm ci --production

USER node

EXPOSE 3333

EXPOSE 8080

ENTRYPOINT ["node","server.js"]