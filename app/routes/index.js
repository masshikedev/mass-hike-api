const tripRoutes = require('./trips');
const orderRoutes = require('./orders');
const authRoutes = require('./auth');
const imageUploadRoutes = require('./imageUploads');

const routes = (app, db) => {
  tripRoutes(app, db);
  orderRoutes(app, db);
  authRoutes(app, db);
  imageUploads(app);
};

module.exports = routes;
