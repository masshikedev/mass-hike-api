const TripsController = require('../controllers/TripsController');
const verifyToken = require('../middleware/verifyToken');

const tripRoutes = (app, db) => {
  const controller = new TripsController(db);
  app
    .route('/trips')
    .get(controller.listUpcoming)
    .post(controller.create);
  app.route('/admin/trips').get(verifyToken, controller.listAllWithOrders);
  app.route('/trips/:tripId').get(controller.getByTripId);
};

module.exports = tripRoutes;
