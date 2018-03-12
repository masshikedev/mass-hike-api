const tripRoutes = require('./trips');
const orderRoutes = require('./orders');

const routes = (app, db) => {
  tripRoutes(app, db);
  orderRoutes(app, db);
};

module.exports = routes;
