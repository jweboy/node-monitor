/*
 * @Author: jweboy
 * @Date: 2019-11-23 14:03:03
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-24 00:54:22
 */
import Koa from 'koa';
import bodyParser from'koa-bodyparser';
import mongoose from'mongoose';
import cors from'@koa/cors';
import Ora from'ora';
import chalk from'chalk';
import dotenv from 'dotenv';
import router from'./routes';

dotenv.config();

const spinner = new Ora();
const server = new Koa();
const { SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, DB_HOST } = process.env;
const DBURL = `mongodb://${DB_HOST}:27017/monitor`;


function main() {
  // Connect database
  mongoose.connect(DBURL, {
    useNewUrlParser: true, // 新解析器中发现错误就回退到旧解析器
  }).then(() => {
    spinner.succeed(chalk.green('Database connection is successful.'));
  }).catch((err) => {
    spinner.fail(chalk.red(err.message));
    process.exit(1);
  });

  // Connect server
  server
    .use(bodyParser())
    .use(cors())
    .use(router.routes())
    .listen(SERVER_PORT, () => {
      spinner.succeed(chalk.green(`Server is running at ${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`));
    });
}

main();

process.on('unhandledRejection', (err) => {
  throw err;
});
