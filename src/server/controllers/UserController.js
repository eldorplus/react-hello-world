var User = require('../models/User');

module.exports = {
  find: function(params, callback) {
    User.find(params, function(err, users){
      if (err){
        callback(err, null);
        return null;
      }

      callback(null, users);
    })
  }
};
