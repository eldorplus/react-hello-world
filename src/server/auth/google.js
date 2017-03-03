const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const config = require('./../config');
const User = require('./../models/User');

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy(config.auth.google,
  (token, tokenSecret, profile, done) => {
    User.findOrCreate({ 'google.id': profile.id }, (err, user) => {
      return done(err, user);
    });
  },
));
