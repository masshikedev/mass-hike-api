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

  addTripToOrder(order, success, error) {
    const tripDetails = { tripId: order.tripId };
    this.db.collection('trips').findOne(tripDetails, (err, trip) => {
      if (err) {
        error(err);
      } else {
        order.trip = trip;
        success(order);
      }
    });
  }

  getById(req, res) {
    const orderDetails = { _id: new ObjectID(req.params.id) };
    this.db.collection('orders').findOne(orderDetails, (err, order) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        this.addTripToOrder(
          order,
          orderWithTrip => res.send(orderWithTrip),
          error => res.send({ error: 'An error has occured' })
        );
      }
    });
  }

  create(req, res) {
    const order = buildOrder(req);
    this.db.collection('orders').insert(order, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  }
}

module.exports = OrdersController;
