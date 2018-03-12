const OrdersController = require('../controllers/OrdersController');

const orderRoutes = (app, db) => {
  const controller = new OrdersController(db);
  app.route('/orders').post(controller.create);
  app.route('/orders/:id').get(controller.getById);
};

module.exports = orderRoutes;
