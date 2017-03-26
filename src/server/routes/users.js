module.exports = (config, passport, User, router, userRole) => {
  router.get(
    '/users',
    passport.authenticate('jwt'),
    userRole.can('access users page'),
    (req, res) => {
      User.getAll({role: req.user.role})
        .then((users) => {
          res.json({users, count: users.length})
        });
    }
  )
};
