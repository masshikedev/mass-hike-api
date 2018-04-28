const AvailabilityController = require('../controllers/AvailabilityController');
const verifyToken = require('../middleware/verifyToken');

const availabilityRoutes = (app, db) => {
  const controller = new AvailabilityController(db);
  app
    .route('/availability')
    .get(controller.get)
    .put(verifyToken, controller.update);
};

module.exports = availabilityRoutes;
