class TripsController {
  constructor(db) {
    this.db = db;
    this.listAll = this.listAll.bind(this);
    this.getByTripId = this.getByTripId.bind(this);
    this.create = this.create.bind(this);
  }

  listAll(req, res) {
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
    const details = { tripId: req.params.tripId };
    this.db.collection('trips').findOne(details, (err, item) => {
      if (err) {
        res.statu(500).send({ error: 'An error has occurred' });
      } else {
        res.statu(200).send(item);
      }
    });
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
