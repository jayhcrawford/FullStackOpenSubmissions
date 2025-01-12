const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
    default: null
  },
  bookCount: {
    type: Number
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ID",
  },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Author", schema);
