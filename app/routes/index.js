const tripRoutes = require('./trips');
const orderRoutes = require('./orders');
const authRoutes = require('./auth');
const imageUploadRoutes = require('./imageUploads');
const memberRoutes = require('./members');
const availabilityRoutes = require('./availability');
const donationRoutes = require('./donations');
const contactRoutes = require('./contact');

const routes = (app, db) => {
  tripRoutes(app, db);
  orderRoutes(app, db);
  authRoutes(app, db);
  imageUploadRoutes(app);
  memberRoutes(app, db);
  availabilityRoutes(app, db);
  donationRoutes(app, db);
  contactRoutes(app, db);
};

module.exports = routes;
