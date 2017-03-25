const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const transform = require('./transform/User');

var userSchema = new Schema({
  name: String,
  username: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ['Developer', 'Manager', 'Admin'],
    default: 'Developer'
  },
  permissions: [
    {
      name: {
        type: String
      },
      path: {
        type: String
      }
    }
  ],
  photo: String,
  provider: String,
  beam: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  facebook: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  github: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  google: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  reddit: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  tumblr: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  twitter: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
}, {
  toObject: {
    transform: transform
  },
  toJSON: {
    transform: transform
  }
});

userSchema.pre('save', function (next) {
  var user = this;
  if (this.hasOwnProperty('password')
      && (this.isModified('password') || this.isNew)) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
