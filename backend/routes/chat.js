const router = require("express").Router();
const pool = require("./../db/postgreDB");
const mongoDB = require("mongodb");
const CryptoJS = require("crypto-js");
const mongoDBPool = require("./../db/mongoDB");
const auth = require("../middleware/authorization");
const chatSchema = require("../db/mongoDBSchema/chatSchema");
const chatMetadataSchema = require("../db/mongoDBSchema/chatMetadataSchema");


/*
 /getAllChats/user
 Frontend: a get request
 All the conversations the user has: for the name of the conversation, just send me the names of people;  
 inside, excluding the user himself. 
 Also send to me the last message in all the conversations, including a time of the last message
 ! Could add a seperate middleware to validate the user is allowed to getAllChats
 */
router.get('/getAllChats/:username', auth, async (req, res) => {
  try {
    // username - string of the current user in session
    const username = req.params.username;
    const tokenUserId = req.user;

    // Validate the current user using the user
    const userQuery = await pool.query(
      `SELECT user_id FROM users WHERE user_name = '${username}';`
    );
    const userQueryId = userQuery.rows[0].user_id
    if (userQueryId !== tokenUserId) {
      return res.status(500).json(`You are not ${username}. Cannot retrieve info on ${username}.`);
    }

    // Retrieve all the meta data for each chatroom
    const userChatDataQuery = await pool.query(
      `SELECT 
        chatroom_metadata.*
      FROM 
        unnest(
          (SELECT user_chats FROM users WHERE user_name = '${username}')
        ) AS user_chatroom_uuid
      LEFT JOIN 
        chatroom_metadata ON
      user_chatroom_uuid = chatroom_metadata.chatroom_uuid;`
    );
    const userChatData = userChatDataQuery.rows

    // Filter userChatData and retrieve for each chat
    for (chatIndex in userChatData) {
      // Remove the user from the users for the frontend
      let indexOfUser = userChatData[chatIndex].users.indexOf(username);
      userChatData[chatIndex].users.splice(indexOfUser, 1);

      // Retrieve the most recent message from MongoDB 
      const chatDatabase = `chatroom#${userChatData[chatIndex].chatroom_id}`;
      const chatModel = mongoDBPool.model(chatDatabase, chatSchema);
      const mostRecentChatMessage = await chatModel.aggregate([
        { $sort: {timestamp : -1} }
      ]).limit(1);
      userChatData[chatIndex]["most_recent_message"] = mostRecentChatMessage;
    }

    // userChatData - holds an array of maps of chats
    res.status(200).json(userChatData);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server error at getAllChats in chat.js");
  }
});

/*
  /createChat: post, with the members names send to you
  Body: [string of usernames]
  ! Need to add authentication middleware
*/
router.post('/createChat', auth, async (req, res) => {
  try {
    // usernames - sorted array containing all the usernames
    const usernames = req.body.usernames;
    const usernames_array = `[${usernames.map(x => `'${x}'`)}]`

    // Create a entry in the SQL table
    const chatMetaDataQuery = await pool.query(
      `INSERT INTO 
        chatroom_metadata (users) 
      VALUES 
      (
        ARRAY${usernames_array}
      ) 
      RETURNING 
        chatroom_id;`
    );
    const chatroomId = chatMetaDataQuery.rows[0].chatroom_id;
    const chatroomDatabase  = `chatroom#${chatroomId}`;
    const chatroomUUID = CryptoJS.SHA3(chatroomDatabase).toString();
    await pool.query(
      `UPDATE 
          chatroom_metadata 
      SET 
        chatroom_uuid = '${chatroomUUID}' 
      WHERE 
        chatroom_id = ${chatroomId};`
    );
    
    // Add these groupchats to the users 
    for (username of usernames) {
      // Ensure that the user exists in the database
      const userQuery = await pool.query(
        `SELECT user_id FROM users WHERE user_name = '${username}';`
      );
      if (userQuery.rowCount === 0) {
        return res.status(500).json(`User ${username} does not exist in the system`);
      }

      // Update the user's user_chats
      await pool.query(
        `UPDATE users SET user_chats = \
          (SELECT ARRAY_APPEND( \
            (SELECT user_chats FROM users WHERE user_name = '${username}'), \
            '${chatroomUUID}')) WHERE user_name = '${username}';  `
      )
    }

    // Create a table in MongoDB with the new chatroom
    const chatModel = mongoDBPool.model(chatroomDatabase, chatSchema);
    const newChat = new chatModel();
    await newChat.save();


    const json_response = {
      message : "Successfully created the chat",
      chatroom_uuid : chatroomUUID,
      chatroom_database_name : chatroomDatabase
    };

    res.status(200).json(json_response);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server error at createChat in chat.js");
  }

});

/*
  /chat/:id, post request, this saves messages into the database. 
  Body: the message, the name of the user who sent the message
  ! This will be done in socket IO
*/
router.post('/:chatId', (req, res) => {

});

/*
  /addUser/:id, update request, 
  Add members into the group, I will give you the name of the new user and you can find the conversation id in the params
*/
router.put('/addUser', auth, async (req, res) => {
  try {
    const { chatId, newUsername, userId } = req.body;
    const tokenUserId = req.user;

    // Simple Queries
    const userQuery = await pool.query(
      `SELECT * FROM users WHERE user_id = ${userId};`
    );
    const chatQuery = await pool.query(
      `SELECT * FROM chatroom_metadata WHERE chatroom_uuid = '${chatId}';`
    );
    
    // Check that the user requesting this has access 
    const userQueryId = userQuery.rows[0].user_id;
    const username = userQuery.rows[0].user_name;
    if (userQueryId !== tokenUserId) {
      return res.status(500).json(`You are not ${username}, cannot add user to the groupchat.`);
    }

    // Check that this user has access to this chat, and ensure that the new user is not already in the chat
    const chatData = chatQuery.rows[0];
    if (chatQuery.rows === 0 || chatData.users.indexOf(username) == -1) {
      return res.status(200).json("Chatroom does not exist or you are not authorized to view this chat.");
    } else if (chatData.users.indexOf(newUsername) !== -1) {
      return res.status(200).json("User is already in the chat.");
    }

    // Add the new user into the chat
    await pool.query(
      `UPDATE 
        chatroom_metadata 
      SET 
        users = (
          SELECT ARRAY_APPEND(
            (SELECT 
              users 
            FROM 
              chatroom_metadata 
            WHERE 
              chatroom_uuid = '${chatId}'), 
            '${newUsername}'
          )
        ) 
      WHERE chatroom_uuid = '${chatId}';`
    );

    // Add the chat to the user data
    await pool.query(
      `UPDATE 
        users 
      SET 
        user_chats = (
          SELECT ARRAY_APPEND(
            (SELECT 
              user_chats 
            FROM 
              users 
            WHERE 
              user_name = '${newUsername}'), 
            '${chatId}'
          )
        ) 
      WHERE user_name = '${newUsername}';`
    );

    res.status(200).json("Successfully added the member to the group.");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server error at put /addUser/:chatId in chat.js");
  }
});

/*
  /chat/:id, get request, will send you the ID in the params
  This should send me only the specific conversation, id being the id of the conversation, in the conversation, send me the messages for only 5 day, and who said what. For instance, Amy: “yes”, Ivy:”haha,ok”. And for each specific message, send me the time stamp. And the user profile picture if possible,
  Also send me all the members in the conversation
  Timestamp 
*/
router.get('/getChat/:chatId', auth, async (req, res) => {
  try {
    const chatUUID = req.params.chatId;
    const userId = req.user;

    // Simple queries
    const userQuery = await pool.query(
      `SELECT * FROM users WHERE user_id = ${userId};`
    );
    const chatQuery = await pool.query(
      `SELECT * FROM chatroom_metadata WHERE chatroom_uuid = '${chatUUID}';`
    );

    // Validation checks on the chat and ensures that only users that are in the chat can view the chat
    const chatData = chatQuery.rows[0];
    const username = userQuery.rows[0].user_name;
    if (chatData.size === 0 || chatData.users.indexOf(username) == -1) {
      return res.status(200).json("Chatroom does not exist or you are not authorized to view this chat.");
    }

    // ! Need to finish retrieving all the data from MongoDB
    // Retrieve the most recent message from MongoDB 
    const chatDatabase = `chatroom#${chatData.chatroom_id}`;
    const chatModel = mongoDBPool.model(chatDatabase, chatSchema);
    const chatMessages = await chatModel.aggregate([
      { $sort: {timestamp : -1} }
    ]).limit(20);
    chatData["messages"] = chatMessages;

    res.status(200).json(chatData);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server error at get /:chatid in chat.js");
  }
});

module.exports = router;