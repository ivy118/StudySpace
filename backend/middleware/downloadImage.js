const myS3Instance = require('../aws-s3/aws-s3');

const bucketName = process.env.AWS_BUCKET_NAME;

module.exports = async (req, res, next) => {
  try {
    const fileKey = req.params.fileKey;
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }
    req.body.fileStream = myS3Instance.getObject(downloadParams).createReadStream();
    next();
  } catch (err) {
    console.log(err.messgae)
    res.status(500).send("Error at middleware downloadImage");
  }
}