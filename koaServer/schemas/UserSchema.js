const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {type: String, require: true, unique: true,},
  password: {type: String, require: true},
  type: {type: String, require: true},
  title: {type: String},
  desc: {type: String},
  company: {type: String},
  money: {type: String},
  meta: {
    createdAt: {type: Date, default: Date.now(),},
    updatedAt: {type: Date, default: Date.now(),},
  },
});

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
