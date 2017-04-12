// https://coligo.io/create-url-shortener-with-node-express-mongo/

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
          res.json({ urls, count: urls.length });
        });
    });
  router.post('/shorten', function(req, res){
    var longUrl = req.body.url;
    var shortUrl = '';

    if (longUrl) {
      Url.findOne({long_url: longUrl}, function (err, doc){
        if (doc){
          shortUrl = '/' + base58.encode(doc._id);
          res.send({'url': shortUrl});
        } else {
          urlCounter.collection.findAndModify({_id: 'value'}, [], {$inc: {seq: 1} }, {new: true, upsert: true, select: {next: 1}}, (error, counter) => {
            if (error) return next(error);
            var newUrl = new Url({
              _id: counter.value.seq,
              long_url: longUrl,
              created_at: new Date()
            });

            newUrl.save(function(err, url) {
              if (err) throw err;

              shortUrl = '/' + base58.encode(newUrl._id);
              res.send({'url': shortUrl});
            });
          });

        }
      });
    } else {
      res.status(600).send({error: 'Invalid request'})
    }

  });

  router.get('/url/:encoded_id', function(req, res){
    var base58Id = req.params.encoded_id;
    var id = base58.decode(base58Id);

    Url.findOne({_id: id}, function (err, doc){
      if (doc) {
        const redirectUrl = doc.long_url;
        res.render('redirect', {url: redirectUrl});
      } else {
        res.redirect('/');
      }
    });
  });
};
