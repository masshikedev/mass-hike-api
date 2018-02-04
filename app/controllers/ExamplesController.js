const ObjectID = require('mongodb').ObjectID;

class ExamplesController {
  constructor(db) {
    this.db = db;
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
  }

  getById(req, res) {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    this.db.collection('examples').findOne(details, (err, item) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  }

  create(req, res) {
    const example = { text: req.body.body, title: req.body.title };
    this.db.collection('examples').insert(example, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  }
}

module.exports = ExamplesController;
