// https://coligo.io/create-url-shortener-with-node-express-mongo/

const validUrl = require('valid-url');
const Url = require('./../../models/Url').Url;
const urlCounter = require('./../../models/Url').urlCounter;
const base58 = require('./../../_lib/base58');

module.exports = (config, passport, router, userRole) => {
  router.get('/urls',
    // passport.authenticate('jwt'),
    // userRole.can('access short urls'),
    (req, res) => {
      Url.find({})
        .then((urls) => {
          urls = urls.map((url) => {
            return url.toJSON()
          });
          return res.json({ urls, count: urls.length });
        });
    });
  router.post('/shorten', function(req, res){
    var url = req.body.url;

    if(!validUrl.isWebUri(url)) {
      return res.status(600).send({error: 'Invalid URL'})
    }

    Url.findOne({long_url: url}, function (err, doc){
      if (doc){
        return res.send({url: `${config.schema}${req.headers.host}/${base58.encode(doc._id)}`});
      } else {
        urlCounter.collection.findAndModify({_id: 'value'}, [], {$inc: {seq: 1} }, {new: true, upsert: true, select: {next: 1}}, (error, counter) => {
          if (error) return next(error);
          var newUrl = new Url({
            _id: counter.value.seq,
            long_url: url,
            created_at: new Date()
          });

          newUrl.save(function(err, url) {
            if (err) throw err;

            return res.send({url: `${config.schema}${req.headers.host}/${base58.encode(newUrl._id)}`});
          });
        });

      }
    });

  });

  router.get('/url/:encoded_id', function(req, res){
    var base58Id = req.params.encoded_id;
    var id = base58.decode(base58Id);

    Url.findOne({_id: id}, function (err, doc){
      if (doc) {
        const redirectUrl = doc.long_url;
        return res.render('redirect', {url: redirectUrl});
      } else {
        return res.redirect('/');
      }
    });
  });
};
