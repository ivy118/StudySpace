const pool = require('../db/postgreDB');
const myS3Instance = require("../aws-s3/aws-s3");

require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;

// Deletes the image stored in S3 if it exists, otherwise it goes to the next middleware
module.exports = async (req, res, next) => {
  try {
    const { postImageKey } = req.body;

    // If the file doens't exist, skip this middleware
    if (postImageKey !== undefined) {
      // Set up s3 Params and delete the object from s3
      const s3DeleteParams = {
        Bucket: bucketName,
        Key: postImageKey
      };
      await myS3Instance.deleteObject(s3DeleteParams).promise();
    }

    next();
  } catch (err) {
    console.log(err.message);
    res.send(500).json("Error at deleteImage middelware.")
  }

}