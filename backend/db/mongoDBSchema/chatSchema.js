const { Schema } = require("Mongoose");

const chatSchema = new Schema({
  sender: String,
  message: String, 
  timestamp: { type: Date, default: Date.now },
});

module.exports = chatSchema;