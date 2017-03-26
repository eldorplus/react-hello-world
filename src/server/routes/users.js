const transformUser = require('./../models/transform/User');

module.exports = (config, passport, User, router, userRole) => {
  router.get(
    '/users',
    passport.authenticate('jwt'),
    userRole.can('access users page'),
    (req, res) => {
      User.find({},(err, users) => {
        res.json({users: users.map((user) => {
          return user.toObject({transform: function(doc, ret, opts) {
            transformUser(doc, ret, opts);
            if(req.user.role === 'Manager') {
              delete ret.email;
              delete ret.username;
            }
          }})
        })})
      })
    }
  )
};
