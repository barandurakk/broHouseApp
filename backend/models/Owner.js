const mongoose = require("mongoose");
const { Schema } = mongoose;

const ownerShema = new Schema({
  name: {},
  pass: {},
});

mongoose.model("owners", ownerShema);
