const ObjectID = require('mongodb').ObjectID;

class Member {
  static build(attributes) {
    return {
      name: attributes.name,
      email: attributes.email,
      phone: attributes.phone,
      classification: attributes.classification,
      createdAt: Date.now(),
    };
  }

  static listAll(db, callback) {
    db
      .collection('members')
      .find({}, { sort: { createdAt: -1 } })
      .toArray((err, members) => {
        if (err) {
          return callback(err, null);
        }
        let complete = 0;
        members.forEach(member => {
          db
            .collection('orders')
            .find({
              memberId: member._id,
            })
            .toArray((err, orders) => {
              if (err) {
                return callback(err, null);
              }
              member.orders = orders;
              complete++;
              if (complete === members.length) {
                return callback(err, members);
              }
            });
        });
      });
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
          if (orders.length === 0) {
            return callback(err, member);
          }
          let complete = 0;
          orders.forEach(order => {
            db
              .collection('trips')
              .findOne({ tripId: order.tripId }, (err, trip) => {
                order.trip = trip;
                complete++;
                if (complete === orders.length) {
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
