FROM node:20.11.1-slim

WORKDIR /app

COPY package*.json ./

COPY --chown=node:node . .

RUN  mkdir -p logs/ && touch logs/access.log  && chown -R node:node . && npm ci

USER node

CMD ["npm", "run", "dev"]
