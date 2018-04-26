const tripRoutes = require('./trips');
const orderRoutes = require('./orders');
const authRoutes = require('./auth');
const imageUploadRoutes = require('./imageUploads');
const memberRoutes = require('./members');

const routes = (app, db) => {
  tripRoutes(app, db);
  orderRoutes(app, db);
  authRoutes(app, db);
  imageUploadRoutes(app);
  memberRoutes(app, db);
};

module.exports = routes;
