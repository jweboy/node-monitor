FROM node:8

WORKDIR /usr/app/node-monitor

COPY package*.json ./

RUN npm install -d --registry=https://registry.npm.taobao.org

COPY . .

EXPOSE 4002

CMD ["npm", "start"]
