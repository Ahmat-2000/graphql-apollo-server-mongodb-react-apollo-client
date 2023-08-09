const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AutoIncrementSchema = new Schema({
  _id: String,  // Counter name, e.g., 'user'
  count: Number // last inserted id
});

const AutoIncrementModel = mongoose.model('AutoIncrementModel', AutoIncrementSchema);

module.exports = AutoIncrementModel;
