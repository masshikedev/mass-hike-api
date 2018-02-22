const ObjectID = require('mongodb').ObjectID;

class TripsController {
  constructor(db) {
    this.db = db;
    this.listAll = this.listAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
  }

  listAll(req, res) {
    this.db
      .collection('trips')
      .find({})
      .toArray((err, trips) => {
        console.log(trips);
        if (err) {
          res.send({ error: 'An error has occured' });
        } else {
          res.send(trips);
        }
      });
  }

  // not being used until a later sprint
  getById(req, res) {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    this.db.collection('trips').findOne(details, (err, item) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(item);
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
