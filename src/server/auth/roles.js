const _ = require('lodash');
var ConnectRoles = require('connect-roles');

var userRole = new ConnectRoles({
  failureHandler: function (req, res, action) {
    res.status(403);
    res.json({error: "You don't have permission to: \'" + action + "\'"});
  }
});

userRole.use(function (req, action) {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) return action === 'access home page';
});

userRole.use('access users page', function (req) {
  if (_.includes(['Manager', 'Admin'], req.user.role)) {
    return true;
  }
});

userRole.use(function (req) {
  if (req.user.role === 'Admin') {
    return true;
  }
});

userRole.use(function (req, action) {
  return req.isAuthenticated() && req.user.permissions.find(function (permission) {
      return permission.name == action;
    }) != null;
});

module.exports = userRole;
