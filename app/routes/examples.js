const ExamplesController = require('../controllers/ExamplesController');

const exampleRoutes = (app, db) => {
  const controller = new ExamplesController(db);
  app.route('/examples').post(controller.create);
  app.route('/examples/:id').get(controller.getById);
};

module.exports = exampleRoutes;
