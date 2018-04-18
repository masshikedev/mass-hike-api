const Trip = require('../models/Trip');
const baseCallback = require('../utils/baseCallback');

class TripsController {
  constructor(db) {
    this.db = db;
    this.listUpcoming = this.listUpcoming.bind(this);
    this.listAllWithOrders = this.listAllWithOrders.bind(this);
    this.getByTripId = this.getByTripId.bind(this);
    this.getByTripIdWithOrders = this.getByTripIdWithOrders.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  listUpcoming(req, res) {
    const query = { 'time.pickupStart': { $gte: Date.now() } };
    Trip.findMultiple(this.db, query, false, baseCallback(res));
  }

  listAllWithOrders(req, res) {
    Trip.findMultiple(this.db, {}, true, baseCallback(res));
  }

  getByTripId(req, res) {
    Trip.findByTripId(this.db, req.params.tripId, false, baseCallback(res));
  }

  getByTripIdWithOrders(req, res) {
    Trip.findByTripId(this.db, req.params.tripId, true, baseCallback(res));
  }

  create(req, res) {
    Trip.create(this.db, req.body, baseCallback(res));
  }

  update(req, res) {
    Trip.update(this.db, req.params.tripId, req.body, baseCallback(res));
  }
}

module.exports = TripsController;
