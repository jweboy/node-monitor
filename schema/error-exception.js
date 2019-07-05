const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const errorExceptionSchema = new Schema({
	createAt: { type: Date, default: Date.now },
	message: { type: String },
	lineNo: { type: Number },
	columnNo: { type: Number },
	url: { type: String },
	// error: { type: Object },
});

errorExceptionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('errorException', errorExceptionSchema, 'error_exception');
