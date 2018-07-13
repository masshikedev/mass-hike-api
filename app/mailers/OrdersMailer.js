const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const orderConfirmation = require('../templates/orderConfirmation');

class OrdersMailer {
  constructor() {
    this.sendConfirmation = this.sendConfirmation.bind(this);
  }

  sendConfirmation(order) {
    const data = {
      from:
        'Mass Hike <masshike@sandboxe20e5376e0e248fc9b74effbe142da11.mailgun.org>',
      to: order.email,
      subject: 'Thank you for your purchase!',
      html: orderConfirmation(order),
    };
    mailgun.messages().send(data, (error, body) => {
      console.log('body: ', body);
      console.log('error: ', error);
    });
  }
}

module.exports = OrdersMailer;
