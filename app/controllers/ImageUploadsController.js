const awsUrl = require('../utils/awsUrl');

class ImageUploadsController {
  constructor() {
    this.getImageUrl = this.getImageUrl.bind(this);
  }

  getImageUrl(req, res) {
    if (!req.file || !req.file.key) {
      res.status(500).send({ error: 'An error has occured' });
    }
    res.status(200).send({ imageUrl: awsUrl(req.file.key) });
  }
}

module.exports = ImageUploadsController;
