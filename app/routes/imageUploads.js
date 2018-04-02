const ImageUploadsController = require('../controllers/OrdersController');

const imageUploadRoutes = app => {
  const controller = new ImageUploadsController();
  app.route('/images').post(controller.uploadToS3);
};

module.exports = orderRoutes;
