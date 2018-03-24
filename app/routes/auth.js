const AuthController = require('../controllers/AuthController');

const authRoutes = (app, db) => {
  const controller = new AuthController(db);
  app.route('/register').post(controller.createUser);
  app.route('/authenticate').get(controller.authenticateUser);
};

module.exports = authRoutes;
