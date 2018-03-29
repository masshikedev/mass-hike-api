const TripsController = require('../controllers/TripsController');
const verifyToken = require('../middleware/verifyToken');

const tripRoutes = (app, db) => {
  const controller = new TripsController(db);
  app.route('/trips').get(controller.listUpcoming);
  app
    .route('/admin/trips')
    .get(verifyToken, controller.listAllWithOrders)
    .post(verifyToken, controller.create);
  app.route('/trips/:tripId').get(controller.getByTripId);
  app
    .route('/admin/trips/:tripId')
    .get(verifyToken, controller.getByTripIdWithOrders);
};

module.exports = tripRoutes;
