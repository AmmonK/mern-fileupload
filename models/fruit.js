var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FruitSchema = new Schema({
  name: { type: String, required: true },
  image: String
});

module.exports = mongoose.model("Fruit", FruitSchema);
