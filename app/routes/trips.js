const TripsController = require('../controllers/TripsController');

const tripRoutes = (app, db) => {
  const controller = new TripsController(db);
  app
    .route('/trips')
    .get(controller.listAll)
    .post(controller.create);
  app.route('/trips/:id').get(controller.getById);
};

module.exports = tripRoutes;
