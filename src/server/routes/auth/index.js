const _ = require('lodash');
const jwt = require('jsonwebtoken');

const cookieOpts = ({ httpOnly, reset = false, domain, maxAge = false }) => ({
  secure: true,
  httpOnly,
  domain,
  expires: reset ? new Date() : null,
  maxAge: !reset ? maxAge : maxAge,
});

const jwtOpts = {
  expiresIn: 10080 // in seconds
};

module.exports = ({
  User,
  strategies,
  passport,
  tokenCookieName,
  tokenSecret,
  cookieDomain,
  maxAge = false,
  secret,
}) => ({
  onAuthenticationRequest: (req, res, next) => {
    req.session.success = req.query.success;
    req.session.failure = req.query.failure;

    // Validate user role is one of these strings
    if (_.includes(['Developer', 'Manager', 'Admin'], req.query.role)) {
      req.session.role = req.query.role;
    } else {
      req.session.role = 'Developer'
    }

    const type = req.path.split('/')[2];
    const strategy = strategies.find(strategy => strategy.type === type);
    const opts = {};

    if (strategy.preHook) {
      strategy.preHook(req, opts);
    }
    passport.authenticate(type, opts)(req, res, next);
  },
  onAuthenticationCallback: (req, res, next) => {
    const type = req.path.split('/')[2];
    passport.authenticate(type, (error, user) => {
      if (error) {
        res.cookie(tokenCookieName, '');
        if (req.session.failure) {
          return res.redirect(decodeURIComponent(req.session.failure))
        }
      } else if (user) {
        const token = jwt.sign(user, tokenSecret, jwtOpts);
        res.cookie(tokenCookieName, token);
        if (req.session.success) {
          return res.redirect(decodeURIComponent(req.session.success))
        }
      }
      return res.json({error, user});

    })(req, res)
  },
  onLogout: (req, res) => {
    res.cookie(tokenCookieName, '');
    if (req.query.success) {
      return res.redirect(decodeURIComponent(req.query.success))
    }
    return res.json({status: 'logged out'})
  },
  onUser: (req, res) => {
    return res.json({user: req.user.toObject()});
  },
  onRegister: (req, res) => {
    if(!req.body.email || !req.body.password) {
      res.json({ success: false, message: 'Please enter email and password.' });
    } else {
      var newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      newUser.save(function(err) {
        if (err) {
          return res.json({ success: false, message: 'That email address already exists.'});
        }
        res.json({ success: true, message: 'Successfully created new user.' });
      });
    }
  },
  onLogin: (req, res) => {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user, secret, jwtOpts);
            res.cookie(tokenCookieName, token);
            if (req.query.success) {
              return res.redirect(decodeURIComponent(req.query.success))
            }
            return res.json({ success: true, token: 'JWT ' + token });
          } else {
            if (req.query.failure) {
              return res.redirect(decodeURIComponent(req.query.failure))
            }
            return res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
          }
        });
      }
    });
  }
});
