const Trip = require('../models/Trip');

class TripsController {
  constructor(db) {
    this.db = db;
    this.listUpcoming = this.listUpcoming.bind(this);
    this.listAllWithOrders = this.listAllWithOrders.bind(this);
    this.getByTripId = this.getByTripId.bind(this);
    this.create = this.create.bind(this);
  }

  listCallback(err, trips) {
    if (err) {
      res.status(500).send({ error: 'An error has occured' });
    } else {
      res.status(200).send(trips);
    }
  }

  listUpcoming(req, res) {
    const query = { 'time.pickupStart': { $gte: Date.now() } };
    const callback = (err, trips) => {
      if (err) {
        res.status(500).send({ error: 'An error has occured' });
      } else {
        res.status(200).send(trips);
      }
    };
    Trip.findMultiple(this.db, query, false, callback);
  }

  listAllWithOrders(req, res) {
    const callback = (err, trips) => {
      if (err) {
        res.status(500).send({ error: 'An error has occured' });
      } else {
        res.status(200).send(trips);
      }
    };
    Trip.findMultiple(this.db, {}, true, callback);
  }

  getByTripId(req, res) {
    const callback = (err, item) => {
      if (err) {
        res.status(500).send({ error: 'An error has occurred' });
      } else {
        res.status(200).send(item);
      }
    };
    Trip.findByTripId(this.db, req.params.tripId, false, callback);
  }

  create(req, res) {
    const callback = (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    };
    Trip.create(this.db, req.body, callback);
  }
}

module.exports = TripsController;
