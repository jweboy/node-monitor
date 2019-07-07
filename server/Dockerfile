# 镜像多阶段编译

# step1
# 使用生产环境镜像 alpine
FROM node:10.15.3-alpine AS builder

# 创建项目目录
WORKDIR /usr/src/app

# 下载 node 和 npm
RUN apk add --no-cache --update nodejs nodejs-npm

# 确保 package.json 和 package-lock.json 都被复制到项目目录
COPY package*.json ./

# 使用淘宝镜像源
RUN npm install -d --registry=https://registry.npm.taobao.org

# step2
FROM node:10.15.3-alpine

# 指定项目目录
WORKDIR /usr/src/app

# 下载 node 和 npm
RUN apk add --no-cache --update nodejs nodejs-npm

# 拷贝 node_modules 目录
COPY --from=builder /usr/src/app/node_modules ./node_modules

# 拷贝项目文件
COPY . .

# 全局变量
ENV SERVER_HOST=jweboy.com
ENV SERVER_PROTOCOL=http
ENV SERVER_PORT=4004
ENV DB_HOST=mongo-service
ENV NODE_ENV=production

# 运行 server
CMD ["node", "app.js"]
