const _ = require('lodash');
const User = require('./../../../models/User');

module.exports = {
  Ctor: require('passport-google-oauth20').Strategy,
  getConfig: (config) => {
    const clientID = config.auth.google.clientID;
    const clientSecret = config.auth.google.clientSecret;
    const callbackURL = config.auth.google.callbackURL;
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL
      }
    }
  },
  preHook: (req, opts) => {
    opts.scope = ['email']
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    // User.findOne({ 'google.id' :  profile.id }, function(err, user) {
    //   if (err) done(err);
    //
    //   if (!user) {
        user = new User();
    //   }
    //

      user.google.token = accessToken;
      user.google.id = profile.id;
      user.google.userName = profile.displayName;
      user.google.name = profile.displayName;
      user.google.email = profile.emails[0] ? profile.emails[0].value : null;
      user.google.photo = profile.photos[0] ? profile.photos[0].value : null;
      user.google.gender = profile.gender ? profile.gender : null;
      // user.save((err) => {
      //   if (err) throw err;
        done(null, {
          accessToken,
          refreshToken,
          profile: _.merge({provider: 'google'}, user.google.toObject()),
        });
    //   })
    // });
  },
  // unlink: (req, res) => {
  //   const user = req.user;
  //   user.google.token = undefined;
  //   user.save((err) => {
  //     if (err) return {error: err};
  //     res.redirect('/');
  //   })
  // }
};
