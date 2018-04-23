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
      cardType: attributes.stripeToken.card.brand,
      cardNumber: attributes.stripeToken.card.last4,
      meetingLocation: attributes.meetingLocation,
      meetingDate: attributes.meetingDate,
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

  static create(db, attributes, callback) {
    db.collection('members').findOne(
      {
        $or: [{ email: attributes.email }, { phone: attribues.phone }],
      },
      (err, member) => {
        const order = this.build(attributes, member);
        db.collection('orders').insert(order, callback);
      }
    );
  }
}

module.exports = Order;
