const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  first_name: String,
  last_name: { type: String, default: null },
  email: { type: String, index: true, unique: true },
  password: { type: String },
});

const model = mongoose.model('User', schema)

module.exports = { model, schema }
