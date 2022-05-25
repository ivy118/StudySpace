const validateCommunity = require("../middleware/validateCommunity");
const storeImage = require("../middleware/storeImage");
const downloadImage = require("../middleware/downloadImage");
const deleteImage = require("../middleware/deleteImage");
const auth = require("../middleware/authorization");
const pool = require("../db/postgreDB");
const router = require("express").Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/*
  /addPost
  Frontend: a post request, req.body = [username, text, photos(if any), communityName)]
  Backend
 */
router.post("/addPost", auth, upload.single('image'), storeImage, async (req, res, next) => {
  try {
    const { username, text, communityName, uploadResultsKey } = req.body;

    // Query for user
    const user = await pool.query(
      `SELECT user_id FROM users WHERE user_name = '${username}'`,
    );
    // Insert post into the corresponding community table
    const userId = user.rows[0].user_id;
    const queryString = 
      uploadResultsKey === undefined 
      ? `INSERT INTO ${communityName} (user_id, post_description) VALUES('${userId}', '${text}');`
      : `INSERT INTO ${communityName} (user_id, post_description, post_image_key) VALUES (${userId}, '${text}', '${uploadResultsKey}');`;
    await pool.query(queryString);

    res.send("Uploaded post succesfully");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error at addPost in post.js.");
  }
});

/*
  /deletePost
  Frontend: a post request, req.body = [postId, communityName]
 */
router.delete("/deletePost", auth, deleteImage, async (req, res) => {
  try {
    const { postId, communityName } = req.body;

    // Query for post
    const post = await pool.query(`SELECT * FROM ${communityName} WHERE post_id = ${postId}`);
    const numberPosts = post.rowCount;

    // Check if the post exists
    if (numberPosts === 1) {
      await pool.query(`DELETE FROM ${communityName} WHERE post_id = ${postId}`);
    }

    res.send("Successfully deleted post");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error at deletePost in post.js");
  }

});

/*
  /getPost/:communityName
  Frontend: a post request, req.body = [communityName]
 */
router.get("/getPost/:communityName", async (req, res) => {
  //temporarily took off validateCommunity//
  try {
    const communityName = req.params.communityName;
    const communitNameComments = `${communityName}_post_comments`;
    const postQuery = await pool.query(`SELECT * FROM ${communityName} ORDER BY post_id DESC LIMIT 10`);
    const posts = postQuery.rows;
    // Retrieve the first 3 comments of each post
    for (post of posts) {
      const commentQuery = await pool.query(`
      SELECT  
        ${communitNameComments}.sender,
        ${communitNameComments}.receiver, 
        ${communitNameComments}.comment,
        ${communitNameComments}.created_on
      FROM
      (
        SELECT * FROM unnest(
          (SELECT replies FROM ${communityName} WHERE post_id = ${post.post_id})
        ) AS post_comments
      ) AS post
      INNER JOIN 
      ${communitNameComments}
      ON
        post.post_comments = ${communitNameComments}.comment_id
      ORDER BY ${communitNameComments}.created_on DESC LIMIT 3;
      `);
      post.replies = commentQuery.rows;
    }
    res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error at getPost in post.js");
  }
});


/*
  /getPost/:communityName/image/:fileKey
  Backend: sends back a stream of the stored image
  * I believe a better idea is have the front-end directly contacting aws * 
 */
router.get("/getPost/:communityName/image/:fileKey", downloadImage, async (req, res) => {
  try {
    const readStream = req.body.fileStream;
    readStream.pipe(res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error at getPost/images in post.js")
  }
});

/*
Techinally we can toggle likes
*/

/* 
 /likePost - toggle the likes on the post
 Frontend: send username, postID
 */
router.post('/likePost', auth, async (req, res) => {
  try {
    const { username, communityName, postID } = req.body;
    console.log(username, communityName, postID);
    const post = await pool.query(`SELECT post_id FROM ${communityName} WHERE post_id = ${postID} AND '${username}' = ANY (users_likes_post);`);
    const likePost = post.rowCount == 0;
    const queryString = 
      likePost 
      ? `UPDATE ${communityName} SET users_likes_post = \
          (SELECT ARRAY_APPEND( \
            (SELECT users_likes_post FROM ${communityName} WHERE post_id = ${postID}), \
            '${username}')) WHERE post_id = ${postID}; `
      : `UPDATE ${communityName} SET users_likes_post = \
          (SELECT ARRAY_REMOVE( \
            (SELECT users_likes_post FROM ${communityName} WHERE post_id = ${postID}), \
            '${username}')) WHERE post_id = ${postID}; `;
    await pool.query(queryString);
    res.status(200).json(likePost);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error at /likePost in post.js");
  }
});

/* 
 /addComment
 Frontend: send username1, username2, postID, commentText
 */
router.post('/addComment', async (req, res) => {
  try {
    const { sender, receiver, postID, communityName, comment } = req.body;
    const communityComment = `${communityName}_post_comments`;
    const communityCommentQueryString = 
      receiver != undefined
      ? `INSERT INTO ${communityComment} (sender, receiver, comment) VALUES ('${sender}', '${receiver}', '${comment}') RETURNING comment_id; `
      : `INSERT INTO ${communityComment} (sender, comment) VALUES ('${sender}', '${comment}') RETURNING comment_id;`;
    const communityCommentQuery = await pool.query(communityCommentQueryString);
    const commentID = communityCommentQuery.rows[0].comment_id;
    await pool.query(`UPDATE ${communityName} SET replies = (
      SELECT ARRAY_APPEND(
        (SELECT replies FROM ${communityName} WHERE post_id = ${postID}),
        ${commentID})) WHERE post_id = ${postID};`);
    res.status(200).json("Successfully added comment");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error at /addComment in post.js");
  }
});


//please rewrite post table to store like for each post, all the users that like the post, comments and remmebr to conclude a timestamp, on each comments, and the two users who are writing the comments, and user profile pictures.
module.exports = router;