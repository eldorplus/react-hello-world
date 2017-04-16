// https://coligo.io/create-url-shortener-with-node-express-mongo/

const validUrl = require('valid-url');
const Url = require('./../../models/Url').Url;
const urlCounter = require('./../../models/Url').urlCounter;
const base58 = require('./../../_lib/base58');

module.exports = (config, passport, router, userRole) => {
  router
    .get('/urls',
      passport.authenticate('jwt'),
      userRole.can('access all urls'),
      (req, res) => {
        Url.find({})
          .then((urls) => {
            urls = urls.map((url) => {
              return url.toJSON()
            });
            return res.json({ success: true, urls, count: urls.length });
          });
      })
    .post('/urls',
      passport.authenticate('jwt'),
      userRole.can('create urls'),
      (req, res) => {
        const url = req.body.url;

        if(!validUrl.isWebUri(url)) {
          return res.status(600).send({success: false, message: 'Invalid URL'})
        }

        Url.findOne({long_url: url}, (err, doc) => {
          if (doc){
            return res.send({success: true, url: `${config.schema}${req.headers.host}/urls/${base58.encode(doc._id)}`});
          } else {
            urlCounter.collection.findAndModify({_id: 'value'}, [], {$inc: {seq: 1} }, {new: true, upsert: true, select: {next: 1}}, (error, counter) => {
              if (error) return next(error);
              const newUrl = new Url({
                _id: counter.value.seq,
                long_url: url,
                created_at: new Date()
              });

              newUrl.save((err, url) => {
                if (err) throw err;

                return res.send({success: true, url: `${config.schema}${req.headers.host}/urls/${base58.encode(newUrl._id)}`});
              });
            });

          }
        });

      })
};
