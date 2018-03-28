const Trip = require('../models/Trip');

class TripsController {
  constructor(db) {
    this.db = db;
    this.listUpcoming = this.listUpcoming.bind(this);
    this.listAllWithOrders = this.listAllWithOrders.bind(this);
    this.getByTripId = this.getByTripId.bind(this);
    this.create = this.create.bind(this);
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
    Trip.findMultiple(this.db, query, callback);
  }

  listAllWithOrders(req, res) {
    this.db
      .collection('trips')
      .find({})
      .toArray((err, trips) => {
        if (err) {
          res.status(500).send({ error: 'An error has occured' });
        } else {
          res.status(200).send(trips);
        }
      });
  }

  getByTripId(req, res) {
    const callback = (err, item) => {
      if (err) {
        res.status(500).send({ error: 'An error has occurred' });
      } else {
        res.status(200).send(item);
      }
    };
    Trip.findByTripId(this.db, req.params.tripId, callback);
  }

  // not being used until a later sprint
  create(req, res) {
    const trip = { name: req.body.name, location: req.body.location };
    this.db.collection('trip').insert(trip, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  }
}

module.exports = TripsController;
