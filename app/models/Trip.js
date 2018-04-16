const COLLECTION = 'trips';

class Trip {
  static build(attributes, tripId) {
    return {
      tripId,
      name: attributes.name,
      time: attributes.time,
      capacity: attributes.capacity,
      difficulty: attributes.difficulty,
      detail: attributes.detail,
      location: attributes.location,
      pricing: attributes.pricing,
      promoCodes: attributes.promoCodes,
      stats: attributes.stats,
      cashLocations: attributes.cashLocations,
      cashAvailability: attributes.cashAvailability,
      pickupZipcodes: attributes.pickupZipcodes,
      orders: [],
      ticketsSold: 0,
    };
  }

  static findByTripId(db, tripId, showOrders, callback) {
    const fields = showOrders ? {} : { orders: 0 };
    db.collection(COLLECTION).findOne({ tripId }, { fields }, callback);
  }

  static findMultiple(db, query, showOrders, callback) {
    const fields = showOrders ? {} : { orders: 0 };
    db
      .collection(COLLECTION)
      .find(query, { fields })
      .toArray(callback);
  }

  static create(db, attributes, callback) {
    db.collection(COLLECTION).count((err, count) => {
      if (err) {
        return callback(err, null);
      }
      const trip = this.build(attributes, `${count + 1}`);
      db.collection(COLLECTION).insert(trip, (err, results) => {
        const trip = results.ops[0];
        callback(err, trip);
      });
    });
  }

  static update(db, tripId, attributes, callback) {
    db
      .collection(COLLECTION)
      .findAndModify(
        { tripId },
        { tripId: 1 },
        { $set: attributes },
        { new: true },
        callback
      );
  }

  static addOrderToTrip(db, order, callback) {
    db
      .collection(COLLECTION)
      .updateOne(
        { tripId: order.tripId },
        { $push: { orders: order }, $inc: { ticketsSold: order.tickets } },
        callback
      );
  }
}

module.exports = Trip;
