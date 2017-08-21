module.exports = function(app) {
  require('./db');
  require('../modules/profile')(app);
};
