const fs = require('fs');
const util = require('util');
const unlink = util.promisify(fs.unlink);
const myS3Instance = require("../aws-s3/aws-s3");

const bucketName = process.env.AWS_BUCKET_NAME;

/*
require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKeyID = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const config = {
  apiVersion: "2010-12-01",
  accessKeyId: accessKeyID, 
  accessSecretKey: secretAccessKey, 
  region: bucketRegion
}

const myS3Instance = new S3(config);
*/

// Uploads the file to S3 and saves the file name and info in the req
module.exports = async (req, res, next) => {
  try {
    console.log(req);
    // Get the image file
    const file = req.file;

    // If the file doesn't exist, skip this middleware
    if (file !== undefined) {
      // Read the file from local storage and upload the file to S3
      const fileStream = fs.createReadStream(file.path);
      const s3UploadParams = {
        Bucket: bucketName, 
        Body: fileStream,
        Key: file.filename
      };
      const uploadResults = await myS3Instance.upload(s3UploadParams).promise();
      await unlink(file.path);
      // pass the uploadKey to the next middleware
      req.body.uploadResultsKey = uploadResults.Key;
    }

    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error at storeImage Middelware.");
  }
}