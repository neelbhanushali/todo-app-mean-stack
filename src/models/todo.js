const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  description: { type: String, default: null },
  completed: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const model = mongoose.model('Todo', schema)

module.exports = { model, schema }