const ContactMailer = require('../mailers/ContactMailer');

class ContactController {
  constructor() {
    this.mailer = new ContactMailer();
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(req, res) {
    const message = req.body;
    this.mailer.sendMessage(message, (err, body) => {
      if (err) {
        res.status(500).send({ error: 'Error sending message' });
      } else {
        res.status(200).send({ body });
      }
    });
  }
}

module.exports = ContactController;
