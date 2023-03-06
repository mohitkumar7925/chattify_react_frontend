FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
ENV baseURL=10.1.4.1
EXPOSE 3000

COPY . .

CMD [ "npm","start"] 




