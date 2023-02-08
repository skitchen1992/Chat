FROM node:16-alpine

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "./server.ts"]
