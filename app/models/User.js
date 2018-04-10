const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs');

const COLLECTION = 'users';

class User {
  static build(attributes) {
    return {
      email: attributes.email,
      password: bcrypt.hashSync(attributes.password, 8),
    };
  }

  static findById(db, id, callback) {
    const details = { _id: new ObjectID(id) };
    const fields = { password: 0 };
    db.collection(COLLECTION).findOne(details, { fields }, callback);
  }

  static findByEmail(db, email, callback) {
    db.collection(COLLECTION).findOne({ email }, callback);
  }

  static create(db, attributes, callback) {
    const user = this.build(attributes);
    db.collection(COLLECTION).insert(user, callback);
  }
}

module.exports = User;
