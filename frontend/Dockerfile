FROM node:lts-alpine

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json /home/node/app/

RUN npm ci

COPY --chown=node:node . /home/node/app/

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]