const AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId:process.env.AWS_ACCESS_KEYID,
    secretAccessKey: process.env.AWS_SECRETKEY,
    region: 'eu-north-1'
  });

const s3 = new AWS.S3();
const S3_BUCKET = "sdgithubbucket";

module.exports = { s3, S3_BUCKET };