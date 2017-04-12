// https://github.com/coligo-io/url-shortener-node-mongo-express/blob/master/models/url.js

const mongoose = require('mongoose');
const increment = require('mongoose-increment');
const encode = require('./../_lib/base58').encode;

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  _id: {type: String, required: true},
  seq: { type: Number, default: 1000 }
});

CounterSchema.plugin(increment, {
  modelName: 'url_counter',
  fieldName: 'seq',
});

const urlCounter = mongoose.model('url_counter', CounterSchema);

// create a schema for our links
const urlSchema = new Schema({
  _id: {type: Number, index: true},
  long_url: String,
  created_at: Date
}, {
  toJSON: {
    transform: (doc, ret, options) => {
      delete ret.__v;
      ret.path = encode(ret._id);
      delete ret._id;
      ret.url = ret.long_url;
      delete ret.long_url;
      delete ret.created_at;
    }
  },
});

// urlSchema.pre('save', (next) => {
//   const doc = this;
//   urlCounter.collection.findAndModify({_id: 'value'}, [], {$inc: {seq: 1} }, {new: true, upsert: true, select: {next: 1}}, (error, counter) => {
//     if (error) return next(error);
//     doc.created_at = new Date();
//     doc._id = counter.value.seq;
//     return next();
//   });
// });

const Url = mongoose.model('Url', urlSchema);

module.exports.Url = Url;
module.exports.urlCounter = urlCounter;
