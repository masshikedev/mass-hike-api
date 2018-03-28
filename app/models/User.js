const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs');

const COLLECTION = 'users';

const build = attributes => {
  return {
    email: attributes.email,
    password: bcrypt.hashSync(attributes.password, 8),
  };
};

const findById = (db, id, callback) => {
  const details = { _id: new ObjectID(id) };
  const fields = { password: 0 };
  db.collection(COLLECTION).findOne(details, { fields }, callback);
};

const findByEmail = (db, email, callback) => {
  db.collection(COLLECTION).findOne({ email }, callback);
};

const create = (db, attributes, callback) => {
  const user = build(attributes);
  db.collection(COLLECTION).insert(user, callback);
};

module.exports = { create, findByEmail };
