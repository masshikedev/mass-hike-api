const ContactController = require('../controllers/ContactController');

const contactRoutes = app => {
  const controller = new ContactController();
  app.route('/contact').post(controller.sendMessage);
};

module.exports = contactRoutes;
