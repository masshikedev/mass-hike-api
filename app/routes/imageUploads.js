const ImageUploadsController = require('../controllers/ImageUploadsController');
const verifyToken = require('../middleware/verifyToken');
const s3Upload = require('../middleware/s3Upload');

const imageUploadRoutes = app => {
  const controller = new ImageUploadsController();
  app
    .route('/images')
    .post(verifyToken, s3Upload.single('image'), controller.getImageUrl);
};

module.exports = imageUploadRoutes;
