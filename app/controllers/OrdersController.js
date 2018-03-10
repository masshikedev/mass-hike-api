const ObjectID = require('mongodb').ObjectID;

const buildOrder = req => {
  const { body } = req;
  return {
    name: body.name,
    phone: body.phone,
    email: body.email,
    preferredContactMethods: body.preferredContactMethods,
    tickets: body.tickets,
    pickupLocation: body.pickupLocation,
    paymentType: body.paymentType,
    cardType: body.cardType,
    cardNumber: body.cardNumber,
    tripId: body.tripId,
  };
};

class OrdersController {
  constructor(db) {
    this.db = db;
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
  }

  getById(req, res) {
    const details = { _id: new ObjectID(req.params.id) };
    this.db.collection('orders').findOne(details, (err, item) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  }

  create(req, res) {
    const order = buildOrder(req);
    this.db.collection('orders').insert(trip, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  }
}

module.exports = OrdersController;
