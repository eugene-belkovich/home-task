FROM node:18.15-alpine

ARG NPM_TOKEN

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build; rm -f .npmrc

EXPOSE 8080

CMD npm run start:prod
