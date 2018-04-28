const stripe = require('stripe')(process.env.STRIPE_KEY);

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
      cancelled: false,
    };
  }

  static findByTripId(db, tripId, includeOrders, callback) {
    db.collection('trips').findOne({ tripId }, (err, trip) => {
      if (err) {
        return callback(err, null);
      }
      if (!includeOrders) {
        return callback(err, trip);
      }
      db
        .collection('orders')
        .find({ tripId: trip.tripId })
        .toArray((err, orders) => {
          trip.orders = orders;
          return callback(err, trip);
        });
    });
  }

  static findMultiple(db, query, includeOrders, callback) {
    db
      .collection('trips')
      .find(query, { sort: { 'time.hikeStart': 1 } })
      .toArray((err, trips) => {
        if (err) {
          return callback(err, null);
        }
        if (!includeOrders) {
          return callback(err, trips);
        }
        let complete = 0;
        trips.forEach(trip => {
          db
            .collection('orders')
            .find({ tripId: trip.tripId })
            .toArray((err, orders) => {
              trip.orders = orders;
              complete++;
              if (complete === trips.length) {
                return callback(err, trips);
              }
            });
        });
      });
  }

  static create(db, attributes, callback) {
    db.collection('trips').count((err, count) => {
      if (err) {
        return callback(err, null);
      }
      const trip = this.build(attributes, `${count + 1}`);
      db.collection('trips').insert(trip, (err, results) => {
        const trip = results.ops[0];
        return callback(err, trip);
      });
    });
  }

  static update(db, tripId, attributes, callback) {
    db
      .collection('trips')
      .findAndModify(
        { tripId },
        { tripId: 1 },
        { $set: attributes },
        { new: true },
        callback
      );
  }

  static cancel(db, tripId, callback) {
    db
      .collection('orders')
      .find({ tripId })
      .toArray((err, orders) => {
        const ordersToRefund = orders.filter(
          order => order.paymentType === 'card'
        );
        let completed = 0;
        ordersToRefund.forEach(order => {
          stripe.refunds
            .create({
              charge: order.stripeChargeId,
            })
            .then(() => {
              completed++;
              if (completed === ordersToRefund.length) {
                db
                  .collection('trips')
                  .findAndModify(
                    { tripId },
                    { tripId: 1 },
                    { $set: { cancelled: true } },
                    { new: true },
                    callback
                  );
              }
            });
        });
      });
  }
}

module.exports = Trip;
