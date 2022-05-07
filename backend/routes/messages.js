const router = require("express").Router();
const io = require("../socket-io/socket-io");

/*
Problem right now is when user goes to the chat room, how should express handle all socket io operations
Functionality of a chat room:
1. Fetch all the conversations, based on which chat we are in
2. Post messages into the chat
3. Be able to fetch previous conversations
*/

/*
 * Gets all the messages with the current user and id, and establishes a connection?
 * Open and close connections based on who opens the chat..
 */
router.get('/:id/messages', (req, res) => {
  // maybe has a middleware that starts the connections or checks for connections,
  // Then this message will just receive all the messages from the database?
});

/*
 * Store the message in the chat into database
 */
router.post('/storeMessage', (req, res) => {
  // 
})


module.exports = router