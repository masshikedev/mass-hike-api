const Order = require('../models/Order');

class OrdersController {
  constructor(db) {
    this.db = db;
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
  }

  getById(req, res) {
    const callback = (err, order) => {
      if (err) {
        res.status(500).send({ error: 'An error has occurred' });
      } else {
        res.status(200).send(order);
      }
    };
    Order.findById(this.db, req.params.id, callback);
  }

  create(req, res) {
    const callback = (err, order) => {
      if (err) {
        res.status(500).send({ error: 'An error has occurred' });
      } else {
        res.status(200).send(order);
      }
    };
    Order.create(this.db, req.body, callback);
  }
}

module.exports = OrdersController;
