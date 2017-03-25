module.exports = {
  Ctor: require('passport-beam').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.beam.clientID;
    const clientSecret = env.auth.beam.clientSecret;
    const callbackURL = env.auth.beam.callbackURL;
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        passReqToCallback: true,
      }
    }
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    console.log('beam', profile);
    User.findOne({ 'beam.id' :  profile.id }, function(err, user) {
      if (err) done(err);

      if (!user) {
        user = new User();
      }

      if(!user.name) {
        user.name = profile.displayName ? profile.displayName : null;
      }
      if(!user.email) {
        user.email = profile.email ? profile.email : null;
      }
      if(!user.username) {
        user.username = profile.username ? profile.username : profile.email ? profile.email : profile.id;
      }
      if(!user.photo) {
        user.photo = profile.photos[0] ? profile.photos[0].value : null;
      }

      user.role = req.session.role;
      user.provider = 'beam';

      user.beam.id = profile.id;

      user.beam.token = accessToken;
      user.beam.refresh = refreshToken;
      user.beam.profile = profile;

      require('./index').saver(user, done);
    });
  }
};
