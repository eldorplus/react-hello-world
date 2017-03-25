module.exports = {
  Ctor: require('passport-sharepoint').Strategy,
  getConfig: (env) => {
    const appId = env.auth.sharepoint.appID;
    const appSecret = env.auth.sharepoint.appSecret;
    const callbackURL = env.auth.sharepoint.callbackURL;
    if (appId && appSecret) {
      return {
        appId,
        appSecret,
        callbackURL,
        passReqToCallback: true,
      }
    }
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'sharepoint';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.gender = profile.gender ? profile.gender : null;
      user.email = profile.email ? profile.email : null;
      user.username = profile.username ? profile.username : null;
      user.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  }
};
