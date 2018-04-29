const Availability = require('../models/Availability');
const baseCallback = require('../utils/baseCallback');

class AvailabilityController {
  constructor(db) {
    this.db = db;
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
  }

  get(req, res) {
    Availability.get(this.db, baseCallback(res));
  }

  update(req, res) {
    Availability.update(this.db, req.body, baseCallback(res));
  }
}

module.exports = AvailabilityController;
