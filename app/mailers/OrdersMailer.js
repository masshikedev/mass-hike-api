const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const orderConfirmation = require('../templates/orderConfirmation');

class OrdersMailer {
  constructor() {
    this.sendConfirmation = this.sendConfirmation.bind(this);
  }

  sendConfirmation(order, id) {
    const data = {
      from: 'Mass Hike <info@mg.masshike.org>',
      to: order.email,
      subject: `Thank you for your purchase! Order number ${id}`,
      html: orderConfirmation(order, id),
    };
    mailgun.messages().send(data, (error, body) => {
      console.log('body: ', body);
      console.log('error: ', error);
    });
  }
}

module.exports = OrdersMailer;
