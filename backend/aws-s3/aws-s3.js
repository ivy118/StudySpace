const S3 = require("aws-sdk/clients/s3");

require("dotenv").config();

const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKeyID = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const config = {
  apiVersion: "2010-12-01",
  accessKeyId: accessKeyID, 
  accessSecretKey: secretAccessKey, 
  region: bucketRegion
}

const s3 = new S3(config);
module.exports = s3;