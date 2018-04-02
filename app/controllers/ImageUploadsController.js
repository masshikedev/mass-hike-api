const aws = require('aws-sdk');

class ImageUploadsController {
  constructor() {
    this.uploadToS3 = this.uploadToS3.bind(this);
  }

  uploadToS3(req, res) {
    const s3 = new aws.s3();
    console.log(req);
  }
}
