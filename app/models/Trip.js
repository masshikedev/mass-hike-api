const COLLECTION = 'trips';

const findByTripId = (db, tripId, callback) => {
  db.collection(COLLECTION).findOne({ tripId }, callback);
};

const findMultiple = (db, query, callback) => {
  db
    .collection(COLLECTION)
    .find(query)
    .toArray(callback);
};

module.exports = { findByTripId, findMultiple };
