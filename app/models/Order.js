const ObjectID = require('mongodb').ObjectID;

class Order {
  static build(attributes, member) {
    return {
      name: attributes.name,
      phone: attributes.phone,
      email: attributes.email,
      preferredContactMethods: attributes.preferredContactMethods,
      tickets: attributes.tickets,
      children: attributes.children,
      pickupLocation: attributes.pickupLocation,
      selectedPrice: attributes.selectedPrice,
      paymentType: attributes.paymentType,
      cardType: attributes.stripeToken && attributes.stripeToken.card.brand,
      cardNumber: attributes.stripeToken && attributes.stripeToken.card.last4,
      meetingLocation: attributes.meetingLocation,
      meetingDate: attributes.meetingDate,
      paid: attributes.paymentType === 'card',
      cancelled: false,
      tripId: attributes.tripId,
      memberId: member && member._id,
    };
  }

  static findById(db, id, callback) {
    const details = { _id: new ObjectID(id) };
    db.collection('orders').findOne(details, (err, order) => {
      if (err) {
        return callback(err, order);
      }
      db.collection('trips').findOne({ tripId: order.tripId }, (err, trip) => {
        if (err) {
          return callback(err, null);
        }
        order.trip = trip;
        callback(err, order);
      });
    });
  }

  static listUnpaid(db, callback) {
    db
      .collection('orders')
      .find({ paid: false })
      .toArray(callback);
  }

  static create(db, attributes, callback) {
    db.collection('members').findOne(
      {
        $or: [{ email: attributes.email }, { phone: attributes.phone }],
      },
      (err, member) => {
        const order = this.build(attributes, member);
        db.collection('orders').insert(order, (err, result) => {
          if (err) {
            return callback(err, null);
          }
          const order = result.ops[0];
          db
            .collection('trips')
            .updateOne(
              { tripId: order.tripId },
              { $inc: { ticketsSold: order.tickets } },
              (err, trip) => {
                if (err) {
                  return callback(err, null);
                }
                callback(err, order);
              }
            );
        });
      }
    );
  }

  static update(db, id, attributes, callback) {
    db
      .collection('orders')
      .findAndModify(
        { _id: new ObjectID(id) },
        { _id: 1 },
        { $set: attributes },
        { new: true },
        (err, results) => {
          if (err) {
            return callback(err, null);
          }
          const order = results.value;
          if (order.cancelled) {
            db
              .collection('trips')
              .updateOne(
                { tripId: order.tripId },
                { $inc: { ticketsSold: -order.tickets } },
                (err, trip) => {
                  if (err) {
                    return callback(err, null);
                  }
                  callback(err, order);
                }
              );
          } else {
            return callback(err, order);
          }
        }
      );
  }
}

module.exports = Order;
