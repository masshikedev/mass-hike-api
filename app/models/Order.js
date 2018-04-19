const ObjectID = require('mongodb').ObjectID;
const Trip = require('../models/Trip');
const Member = require('../models/Member');

const COLLECTION = 'orders';

class Order {
  static build(attributes) {
    return {
      name: attributes.name,
      phone: attributes.phone,
      email: attributes.email,
      preferredContactMethods: attributes.preferredContactMethods,
      tickets: attributes.tickets,
      pickupLocation: attributes.pickupLocation,
      selectedPrice: attributes.selectedPrice,
      paymentType: attributes.paymentType,
      cardType: attributes.stripeToken.card.brand,
      cardNumber: attributes.stripeToken.card.last4,
      meetingLocation: attributes.meetingLocation,
      meetingDate: attributes.meetingDate,
      tripId: attributes.tripId,
    };
  }

  static findById(db, id, callback) {
    const details = { _id: new ObjectID(id) };
    db.collection(COLLECTION).findOne(details, (err, order) => {
      if (err) {
        return callback(err, order);
      }
      Trip.findByTripId(db, order.tripId, false, (err, trip) => {
        order.trip = trip;
        callback(err, order);
      });
    });
  }

  static create(db, attributes, callback) {
    const order = this.build(attributes);
    db.collection(COLLECTION).insert(order, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const order = result.ops[0];
      Trip.addOrderToTrip(db, order, err => {
        if (err) {
          console.log(err);
          return callback(err, null);
        }
        callback(err, order);
      });
      Member.addOrderToMember(db, order, err => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
}

module.exports = Order;
