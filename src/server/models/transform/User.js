module.exports = function transform(doc, ret, options) {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  ret.password && delete ret.password;

  ret.beam && delete ret.beam;
  ret.facebook && delete ret.facebook;
  ret.github && delete ret.github;
  ret.google && delete ret.google;
  ret.reddit && delete ret.reddit;
  ret.tumblr && delete ret.tumblr;
  ret.twitter && delete ret.twitter;
};