/*
 * @Author: jweboy
 * @Date: 2019-11-22 22:25:32
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-22 22:42:05
 */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function getEnvKeys() {
  const rootPath = fs.realpathSync(process.cwd());
  const { NODE_ENV } = process.env;
  const envPath = path.resolve(rootPath, `.env.${NODE_ENV}`);
  const fileEnv = dotenv.config({ path: envPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((obj, key) => {
    obj['process.env'][`${key}`] = JSON.stringify(fileEnv[key]);
    return obj;
  }, { 'process.env': {} });
  return envKeys;
}

module.exports = getEnvKeys;

