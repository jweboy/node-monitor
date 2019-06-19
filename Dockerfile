FROM mhart/alpine-node

WORKDIR /app
COPY . .

# RUN yarn install
# RUN yarn build

RUN npm install -d --registry=https://registry.npm.taobao.org --no-cache
RUN npm run build

# EXPOSE 3000
CMD ["yarn", "start"]
