var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup work and export for the JWT passport strategy
module.exports = function(config, passport, User) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.tokenSecret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // console.log('jwt_payload', jwt_payload);
    User.findOne({_id: jwt_payload.id}, function(err, user) {
      // console.log('jwt_user', user);
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
