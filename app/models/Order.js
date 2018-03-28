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
      callback(err, order);
    }
    Trip.findByTripId(db, order.tripId, (err, trip) => {
      order.trip = trip;
      callback(err, order);
    });
  });
};

const create = (db, attributes, callback) => {
  const order = build(attributes);
  db.collection(COLLECTION).insert(order, callback);
};

module.exports = { findById, create };
