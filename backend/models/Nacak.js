const mongoose = require("mongoose");
const { Schema } = mongoose;

const nacakSchema = new Schema({
  body: String,
  dateSent: Date,
  owner: String,
  mis: { type: Boolean, default: false },
  cost: Number,
});

mongoose.model("nacaklar", nacakSchema);
