import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  createAt: { type: Date, default: Date.now },
  message: { type: String },
  lineNo: { type: Number },
  columnNo: { type: Number },
  url: { type: String },
  // error: { type: Object },
});

schema.set('toJSON', { virtuals: true });

const codeSchema = mongoose.model('code', schema);

export default codeSchema;
