var mongoose = require('mongoose');

var ProfileSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

    gender:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Profile', ProfileSchema);
