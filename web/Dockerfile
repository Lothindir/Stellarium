# Build stage
FROM node:lts-alpine as builder

RUN apk add --no-cache git

USER node

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json /home/node/app/

RUN npm ci

COPY --chown=node:node . /home/node/app/

RUN node ace build --production && cd build && npm ci --production

# Run stage
FROM node:lts-alpine as app

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node --from=builder /home/node/app/build .

EXPOSE 3333

ENTRYPOINT ["node","server.js"]