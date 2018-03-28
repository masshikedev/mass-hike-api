const tripRoutes = require('./trips');
const orderRoutes = require('./orders');
const authRoutes = require('./auth');

const routes = (app, db) => {
  tripRoutes(app, db);
  orderRoutes(app, db);
  authRoutes(app, db);
};

module.exports = routes;
