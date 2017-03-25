module.exports = (config, passport, User, router) => {
  router.get(
    '/users',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      User.find({},(err, users) => {
        return res.json({users})
      })
    }
  )
};
