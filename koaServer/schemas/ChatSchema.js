const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  chatId: {type: String, require: true},
  from: {type: String, require: true},
  to: {type: String, require: true},
  read: {type: Boolean, require: true, default: false,},
  content: {type: String, require: true},
  meta: {
    createdAt: {type: Date, default: Date.now(),},
    updatedAt: {type: Date, default: Date.now(),},
  },
});

ChatSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Chat', ChatSchema);
