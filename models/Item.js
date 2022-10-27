const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required:true,
  },
});
module.exports = Item = mongoose.model("item", ItemSchema);
