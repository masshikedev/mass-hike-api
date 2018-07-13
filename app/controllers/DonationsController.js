const stripe = require('stripe')(process.env.STRIPE_KEY);

class DonationsController {
  constructor() {
    this.create = this.create.bind(this);
  }

  create(req, res) {
    const donation = req.body;
    stripe.charges
      .create({
        amount: donation.amount * 100,
        currency: 'usd',
        description: `Donation made by ${donation.email}`,
        statement_descriptor: 'Mass Hike donation',
        source: donation.stripeToken.id,
      })
      .then(() => {
        res.status(200).send({
          amount: donation.amount,
          cardType: donation.stripeToken.card.brand,
          cardNumber: donation.stripeToken.card.last4,
        });
      })
      .catch(err => {
        res
          .status(err.statusCode || 500)
          .send({ error: 'Error processing donation' });
      });
  }
}

module.exports = DonationsController;
