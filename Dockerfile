FROM node:18-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD npm run dev