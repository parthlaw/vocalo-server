const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  word_id: String,
  lexicalCategory: String,
  pronunciations: String,
  definitions: String,
  examples: String,
});

module.exports = mongoose.model("Word", wordSchema);
