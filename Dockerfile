FROM node:16

WORKDIR /usr/src/app


RUN apt-get update && apt-get install -y python3 make g++


COPY package*.json ./


RUN npm install

COPY . .


RUN npm rebuild bcrypt --build-from-source

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]