const tripRoutes = require('./trips');

const routes = (app, db) => {
  tripRoutes(app, db);
};

module.exports = routes;
