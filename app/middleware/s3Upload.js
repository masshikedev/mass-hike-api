const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.region = 'us-east-1';
const s3 = new aws.S3();

const extensionMap = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
};

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}${extensionMap[file.mimetype]}`);
    },
  }),
});

module.exports = upload;
