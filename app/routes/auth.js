const AuthController = require('../controllers/AuthController');
const verifyToken = require('../middleware/verifyToken');

const authRoutes = (app, db) => {
  const controller = new AuthController(db);
  app
    .route('/users')
    .post(controller.createUser)
    .get(verifyToken, controller.getUserById);
  app.route('/login').post(controller.login);
};

module.exports = authRoutes;
