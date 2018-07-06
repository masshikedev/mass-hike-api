const baseCallback = require('../utils/baseCallback');
const stripe = require('stripe')(process.env.STRIPE_KEY);

class DonationsController {
  constructor(db) {
    this.db = db;
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
        res.status(200).send('OK');
      })
      .catch(err =>
        res
          .status(err.statusCode || 500)
          .send({ error: 'Error processing donation' })
      );
  }
}
