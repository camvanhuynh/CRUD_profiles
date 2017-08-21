var Profile = require('./models/profile');

module.exports = function(app) {

  app.get('/api/profile/list', function(req, res) {
    Profile.find({}, function(err, profiles) {
      if(err)
        res.send(err);
      res.json(profiles);
    });
  });

  app.post('/api/profile/add', function(req, res) {
    var profile = new Profile(req.body);
    profile.save(function(err, insertedProfile) {
      if(err) {
        return res.status(400).send({
          message: err
        })
      }
      res.status(200).send({
        profile: insertedProfile
      });
    });
  });

  app.delete('/api/profile/:profileId/delete', function(req, res) {
    Profile.remove({ _id: req.params.profileId}, function(err,result) {
      if(err) {
        return res.status(400).send({
          message: err
        });
      }
      res.sendStatus(200);
    })
  });

  app.put('/api/profile/:profileId/edit', function(req, res) {
    Profile.update(
      {
        _id: req.params.profileId
      },
      req.body,
      function(err,result) {
        if(err) {
          return res.status(400).send({
            message: err
          });
        }
        res.sendStatus(200);
      }
    );
  });
};
