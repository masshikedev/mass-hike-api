const ObjectID = require('mongodb').ObjectID;

class Member {
  static build(attributes) {
    return {
      name: attributes.name,
      email: attributes.email,
      phone: attributes.phone,
      classification: attributes.classification,
      createdAt: Date.now(),
      orders: [],
    };
  }

  static listAll(db, callback) {
    db
      .collection('members')
      .find({})
      .toArray(callback);
  }

  static findById(db, id, callback) {
    const details = { _id: new ObjectID(id) };
    db.collection('members').findOne(details, (err, member) => {
      if (err) {
        return callback(err, null);
      }
      db
        .collection('orders')
        .find({
          memberId: member._id,
        })
        .toArray((err, orders) => {
          if (err) {
            return callback(err, null);
          }
          orders.forEach((order, i) => {
            db
              .collection('trips')
              .findOne({ tripId: order.tripId }, (err, trip) => {
                order.trip = trip;
                if (i === orders.length - 1) {
                  member.orders = orders;
                  return callback(err, member);
                }
              });
          });
        });
    });
  }

  static create(db, attributes, callback) {
    const member = this.build(attributes);
    db
      .collection('members')
      .insert(member, (err, results) => callback(err, results.ops[0]));
  }
}

module.exports = Member;
