var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String,
    userName     : String,
    photo        : String,
    gender       : String,
  },
  userRole       : String,

});

module.exports = mongoose.model('User', userSchema);
