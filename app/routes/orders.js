const OrdersController = require('../controllers/OrdersController');
const verifyToken = require('../middleware/verifyToken');

const orderRoutes = (app, db) => {
  const controller = new OrdersController(db);
  app.route('/orders').post(controller.create);
  app
    .route('/orders/:id')
    .get(controller.getById)
    .put(verifyToken, controller.update);
  app.route('/admin/orders').get(verifyToken, controller.listUnpaid);
};

module.exports = orderRoutes;
