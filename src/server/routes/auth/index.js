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
  onProfile: (req, res) => {
    return res.json({user: req.user.toJSON()});
  },
  onRegister: (req, res, next) => {
    if(!req.body.name || !req.body.email || !req.body.username || !req.body.password) {
      return res.json({ success: false, message: 'Please enter name, email, username and password.' });
    } else {
      User.find({ $or: [
        {
          'email': req.body.email
        },
        {
          'username': req.body.username
        }
      ]})
      .exec((err, users) => {
        if (err) next(err);
        console.log('registered', users)
        if (users.length === 0) {
          let role = 'Developer';
          if (_.includes(['Admin', 'Manager', 'Developer'], req.body.role)){
            role = req.body.role;
          }
          new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            role
          }).save(function(err, user) {
            if (err) throw err;
            var token = jwt.sign({id: user._id}, tokenSecret, jwtOpts);
            res.cookie(tokenCookieName, token);
            res.json({ success: true, message: 'Successfully created new user.', token });
          });
        } else {
          res.json({ success: false, message: 'That user already exists.'});
        }

      });
    }
  },
  onLogin: (req, res) => {
    console.log('body', req.body);
    User.findOne({$or: [
      {'email': req.body.username_or_email},
      {'username': req.body.username_or_email},
      ]}, (err, user) => {
      if (err) throw err;
      if(user) {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            console.log(user, user._id);
            // Create token if the password matched and no error was thrown
            var token = jwt.sign({id: user._id}, tokenSecret, jwtOpts);
            res.cookie(tokenCookieName, token);
            res.json({ success: true, token, message: 'Logged in successfully!' });
          } else {
            res.json({ success: false, message: 'Authentication failed.' });
          }
        });
      } else {
        res.json({ success: false, message: 'Authentication failed.' });
      }
    });

  }
});
