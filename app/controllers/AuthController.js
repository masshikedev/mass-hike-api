const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const baseCallback = require('../utils/baseCallback');

class AuthController {
  constructor(db) {
    this.db = db;
    this.createUser = this.createUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.login = this.login.bind(this);
  }

  createUser(req, res) {
    const callback = (err, result) => {
      if (err) {
        res.status(500).send({ error: 'An error has occurred' });
      } else {
        const createdUser = result.ops[0];
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT_KEY, {
          expiresIn: 86400,
        });
        res.status(200).send({ auth: true, token });
      }
    };
    User.create(this.db, req.body, callback);
  }

  // not currently used
  getUserById(req, res) {
    User.findById(this.db, req.userId, baseCallback(res));
  }

  login(req, res) {
    const callback = (err, user) => {
      if (err) {
        return res.status(500).send({ error: 'An error has occured' });
      }
      if (!user) {
        return res
          .status(404)
          .send({ error: 'Invalid username/password combination' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          token: null,
          error: 'Invalid username/password combination',
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: 86400, // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    };
    User.findByEmail(this.db, req.body.email, callback);
  }
}

module.exports = AuthController;
