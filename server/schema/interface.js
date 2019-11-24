/*
 * @Author: jweboy
 * @Date: 2019-11-23 14:03:03
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-24 00:52:52
 */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  createAt: { type: Date, default: Date.now },
  method: { type: String },
  url: { type: String },
  browser: { type: String },
  info: { type: String },
  message: { type: String },
  code: { type: Number },
  status: { type: String },
  request: { type: Number },
});

// https://www.jianshu.com/p/2181b2e27021

// 增加 id 字段
schema.set('toJSON', { virtuals: true });

const interfaceSchema = mongoose.model('_interface', schema);

export default interfaceSchema;
