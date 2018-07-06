const DonationsController = require('../controllers/DonationsController');

const donationsRoutes = (app, db) => {
  const controller = new DonationsController(db);
  app.route('donations').post(controller.create);
};

module.exports = donationsRoutes;
