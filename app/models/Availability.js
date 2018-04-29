class Availability {
  static get(db, callback) {
    db.collection('availability').findOne({ _id: 0 }, callback);
  }

  static update(db, attributes, callback) {
    db
      .collection('availability')
      .findAndModify(
        { _id: 0 },
        { _id: 1 },
        { $set: attributes },
        { new: true },
        callback
      );
  }
}

module.exports = Availability;
