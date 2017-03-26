const redisCache = require('./rediscache');

const getUsersFromCache = (options) => {
  if (!options.role) return null;

  return redisCache.getKey(`users_${options.role}`).then((cached) => {
    if (!cached || !cached.data || !cached.data.count) return null;
    return cached;
  });
};

const setUsersInCache = (users, options) => {
  if (users && options && options.role) {
    redisCache.setLong(`users_${options.role}`, users);
  }
  return users;
};

module.exports = {
  getUsersFromCache,
  setUsersInCache,
};
