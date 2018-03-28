const TripsController = require('../controllers/TripsController');
const verifyToken = require('../middleware/verifyToken');

const tripRoutes = (app, db) => {
  const controller = new TripsController(db);
  app.route('/trips').get(controller.listUpcoming);
  app
    .route('/admin/trips')
    .get(verifyToken, controller.listAllWithOrders)
    .post(controller.create);
  app.route('/trips/:tripId').get(controller.getByTripId);
};

module.exports = tripRoutes;
