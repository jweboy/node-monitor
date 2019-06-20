FROM mhart/alpine-node

WORKDIR /app
COPY . .

# RUN yarn install
# RUN yarn build

RUN npm install -d --registry=https://registry.npm.taobao.org --no-cache
RUN npm run build

ENV NODE_ENV=production
ENV DB_HOST=mongo-service

# EXPOSE 3000
CMD ["npm", "start"]
