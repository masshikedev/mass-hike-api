const COLLECTION = 'trips';

const build = (attributes, tripId) => {
  return {
    tripId,
    name: attributes.name,
    time: attributes.time,
    capacity: attributes.capacity,
    difficulty: attributes.difficulty,
    detail: attributes.detail,
    location: attributes.location,
    distanceAway: attributes.distanceAway,
    pricing: attributes.pricing,
    stats: attributes.stats,
    cashLocations: attributes.cashLocations,
    pickupZipcodes: attributes.pickupZipcodes,
    orders: [],
  };
};

const generateTripId = db => {
  db
    .collection(COLLECTION)
    .find({})
    .sort({ tripId: -1 })
    .limit(1)
    .toArray((err, result));
};

const findByTripId = (db, tripId, showOrders, callback) => {
  const fields = showOrders ? {} : { orders: 0 };
  db.collection(COLLECTION).findOne({ tripId }, { showOrders }, callback);
};

const findMultiple = (db, query, showOrders, callback) => {
  const fields = showOrders ? {} : { orders: 0 };
  db
    .collection(COLLECTION)
    .find(query, { fields })
    .toArray(callback);
};

const create = (db, attributes, callback) => {
  db.collection(COLLECTION).count((err, count) => {
    if (err) {
      return callback(err, null);
    }
    const trip = build(attributes, count);
    db.collection(COLLECTION).insert(trip, (err, results) => {
      const trip = result.ops[0];
      callback(err, trip);
    });
  });
};

const addOrderToTrip = (db, order, callback) => {
  db
    .collection(COLLECTION)
    .updateOne(
      { tripId: order.tripId },
      { $push: { orders: order } },
      callback
    );
};

module.exports = { findByTripId, findMultiple, addOrderToTrip, create };
