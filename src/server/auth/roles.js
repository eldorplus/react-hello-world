const _ = require('lodash');
const ConnectRoles = require('connect-roles');

const userRole = new ConnectRoles({
  failureHandler: (req, res, action) => {
    res.status(403).json({success: false, message: req.t(`Not permitted to ${action}`)});
  }
});

userRole.use((req, action) => {
  if (!req.isAuthenticated()) return action === 'access home page';
});

userRole.use('access users page', (req) => {
  if (_.includes(['Manager', 'Admin'], req.user.role)) {
    return true;
  }
});

_.each([
  'access users page',
  'access all urls',
], (scope) => {
  userRole.use(scope,
  (req) => {
    if (_.includes(['Manager', 'Admin'], req.user.role)) {
      return true;
    }
  })
});

_.each([
  'access urls',
  'create urls',
], (scope) => {
  userRole.use(scope,
  (req) => {
    if (_.includes(['Manager', 'Admin', 'Developer'], req.user.role)) {
      return true;
    }
  })
});

userRole.use((req) => {
  if (req.user.role === 'Admin') {
    return true;
  }
});

userRole.use((req, action) => {
  return req.isAuthenticated() && req.user.permissions.find((permission) => {
      return permission.name == action;
    }) != null;
});

module.exports = userRole;
