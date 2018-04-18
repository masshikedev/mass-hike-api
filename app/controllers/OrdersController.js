const Order = require('../models/Order');
const baseCallback = require('../utils/baseCallback');
const stripe = require('stripe')(process.env.STRIPE_KEY);

class OrdersController {
  constructor(db) {
    this.db = db;
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
  }

  getById(req, res) {
    Order.findById(this.db, req.params.id, baseCallback(res));
  }

  create(req, res) {
    const order = req.body;
    Order.create(this.db, order, baseCallback(res));
    stripe.charges.create({
      amount: order.selectedPrice * 100 * order.tickets,
      currency: 'usd',
      description: 'booking platform charge',
      statement_descriptor: 'Mass Hike tickets',
      source: order.stripeToken.id,
    });
  }
}

module.exports = OrdersController;
