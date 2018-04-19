const MembersController = require('../controllers/MembersController');
const verifyToken = require('../middleware/verifyToken');

const memberRoutes = (app, db) => {
  const controller = new MembersController(db);
  app
    .route('/members')
    .post(controller.create)
    .get(verifyToken, controller.listAll);
  app.route('/members/:id').get(verifyToken, controller.getById);
};

module.exports = memberRoutes;
