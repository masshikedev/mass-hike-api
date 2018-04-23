const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'members';

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
      .collection(COLLECTION)
      .find({})
      .toArray(callback);
  }

  static findById(db, id, callback) {
    const details = { _id: new ObjectID(id) };
    db.collection(COLLECTION).findOne(details, callback);
  }

  static create(db, attributes, callback) {
    const member = this.build(attributes);
    db
      .collection(COLLECTION)
      .insert(member, (err, results) => callback(err, results.ops[0]));
  }

  static addOrderToMember(db, order, callback) {
    db
      .collection(COLLECTION)
      .updateOne(
        { $or: [{ email: order.email }, { phone: order.phone }] },
        { $push: { orders: order } },
        callback
      );
  }
}

module.exports = Member;
