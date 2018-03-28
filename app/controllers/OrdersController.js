const Order = require('../models/Order');
const baseCallback = require('../utils/baseCallback');

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
    Order.create(this.db, req.body, baseCallback(res));
  }
}

module.exports = OrdersController;
