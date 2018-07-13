const DonationsController = require('../controllers/DonationsController');

const donationsRoutes = app => {
  const controller = new DonationsController();
  app.route('/donations').post(controller.create);
};

module.exports = donationsRoutes;
