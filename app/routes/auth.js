const AuthController = require('../controllers/AuthController');

const authRoutes = (app, db) => {
  const controller = new AuthController(db);
  app
    .route('/users')
    .post(controller.createUser)
    .get(controller.authenticateUser);
  app.route('/login').post(controller.login);
};

module.exports = authRoutes;
