const mongoose = require('mongoose');
const { Schema } = mongoose;

const interfaceSchema = new Schema({
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
interfaceSchema.set('toJSON', { virtuals: true });

module.exports =  mongoose.model('interface', interfaceSchema);
