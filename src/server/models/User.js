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
  amazon: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  beam: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  bitbucket: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  bnet: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  dropbox: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  evernote: {
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
  fitbit: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  forcedotcom: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  foursquare: {
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
  instagram: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  linkedin: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  paypal: {
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
  runkeeper: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  sharepoint: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  slack: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  soundcloud: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  spotify: {
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
  vkontakte: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  weibo: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  windowslive: {
    id: String,
    token: String,
    refresh: String,
    profile: Object,
  },
  yahoo: {
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
  if (user.password && (this.isModified('password') || this.isNew)) {
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
