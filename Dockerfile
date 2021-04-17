FROM node:12.14.0-alpine3.11

ENV NODE_ENV=development

RUN apk add --no-cache bash

WORKDIR /var/www/html/cursos/aula105

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --development

COPY . .

CMD [ "npm", "start:dev" ]