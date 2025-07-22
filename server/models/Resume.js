const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: String,
  template: String,
  data: Object,
});

module.exports = mongoose.model('Resume', resumeSchema);
