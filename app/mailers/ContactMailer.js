const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const contactMessage = require('../templates/contactMessage');

class ContactMailer {
  constructor() {
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(message, callback) {
    const data = {
      from: 'Mass Hike contact@masshike.org',
      to: 'masshikedev@gmail.com',
      subject: `New message from ${message.name} via Masshike.org contact form`,
      html: contactMessage(message),
    };
    mailgun.messages().send(data, callback);
  }
}

module.exports = ContactMailer;
