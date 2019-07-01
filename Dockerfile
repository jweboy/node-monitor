FROM mhart/alpine-node

WORKDIR /app
COPY . .

# RUN yarn install
# RUN yarn build

RUN npm install -d --registry=https://registry.npm.taobao.org --no-cache
RUN npm run build

ENV SERVER_HOST=118.24.155.105
ENV SERVER_PROTOCOL=http
ENV SERVER_PORT=4004
ENV DB_HOST=mongo-service
ENV NODE_ENV=production

# EXPOSE 4004
CMD ["npm", "start"]
