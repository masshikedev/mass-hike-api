const examplesRoutes = require('./examples');

const routes = (app, db) => {
  examplesRoutes(app, db);
};

module.exports = routes;
