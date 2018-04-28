const tripRoutes = require('./trips');
const orderRoutes = require('./orders');
const authRoutes = require('./auth');
const imageUploadRoutes = require('./imageUploads');
const memberRoutes = require('./members');
const availabilityRoutes = require('./availability');

const routes = (app, db) => {
  tripRoutes(app, db);
  orderRoutes(app, db);
  authRoutes(app, db);
  imageUploadRoutes(app);
  memberRoutes(app, db);
  availabilityRoutes(app, db);
};

module.exports = routes;
