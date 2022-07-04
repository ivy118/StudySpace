const { Schema } = require("Mongoose");

const chatMetadataSchema = new Schema({
  chatRoomName: String, 
  chatName: String,
  users: [String]
});

module.exports = chatMetadataSchema;