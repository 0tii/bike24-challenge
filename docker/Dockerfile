FROM node:18-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

COPY docker/entrypoint.sh /entrypoint.sh

RUN chmod +rwx /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]