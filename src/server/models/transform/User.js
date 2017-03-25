module.exports = function transform(doc, ret, options) {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  const keys = [
    'password',
    'beam',
    'bnet',
    'dropbox',
    'facebook',
    'fitbit',
    'forcedotcom',
    'foursquare',
    'github',
    'google',
    'instagram',
    ''
  ]
  ret.password && delete ret.password;

  ret.beam && delete ret.beam;
  ret.facebook && delete ret.facebook;
  ret.github && delete ret.github;
  ret.google && delete ret.google;
  ret.linkedin && delete ret.linkedin;
  ret.paypal && delete ret.paypal;
  ret.soundcloud && delete ret.soundcloud;
  ret.reddit && delete ret.reddit;
  ret.tumblr && delete ret.tumblr;
  ret.twitter && delete ret.twitter;
  ret.vkontakte && delete ret.vkontakte;
};