const ObjectID = require('mongodb').ObjectID;
const Trip = require('../models/Trip');

const COLLECTION = 'orders';

const build = attributes => {
  return {
    name: attributes.name,
    phone: attributes.phone,
    email: attributes.email,
    preferredContactMethods: attributes.preferredContactMethods,
    tickets: attributes.tickets,
    pickupLocation: attributes.pickupLocation,
    selectedPrice: attributes.selectedPrice,
    paymentType: attributes.paymentType,
    cardType: attributes.cardType,
    cardNumber: attributes.cardNumber,
    meetingLocation: attributes.meetingLocation,
    meetingDate: attributes.meetingDate,
    tripId: attributes.tripId,
  };
};

const findById = (db, id, callback) => {
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
};

const create = (db, attributes, callback) => {
  const order = build(attributes);
  db.collection(COLLECTION).insert(order, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    const order = result.ops[0];
    Trip.addOrderToTrip(db, order, err => {
      if (err) {
        return callback(err, null);
      }
      callback(err, order);
    });
  });
};

module.exports = { findById, create };
