const awsUrl = filename =>
  `https://s3.amazonaws.com/${process.env.S3_BUCKET}/${filename}`;

module.exports = awsUrl;
