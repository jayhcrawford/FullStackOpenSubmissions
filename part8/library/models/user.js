const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  favoriteGenre: {
    type: String,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ID",
  },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);
