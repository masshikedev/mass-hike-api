const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthController {
  constructor(db) {
    this.db = db;
    this.createUser = this.createUser.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.login = this.login.bind(this);
  }

  createUser(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    this.db.collection('users').insert(user, (err, result) => {
      if (err) {
        res.status(500).send({ error: 'An error has occurred' });
      } else {
        const createdUser = result.ops[0];
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT_KEY, {
          expiresIn: 86400,
        });
        res.status(200).send({ auth: true, token });
      }
    });
  }

  authenticateUser(req, res) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Failed to authenticate token.',
        });
      } else {
        const userDetails = { _id: new ObjectID(decoded.id) };
        const fields = { password: 0 };
        this.db
          .collection('users')
          .findOne(userDetails, { fields }, (err, user) => {
            if (err) {
              res.status(500).send({ error: 'An error has occured.' });
            } else {
              res.status(200).send(user);
            }
          });
      }
    });
  }

  login(req, res) {
    const userDetails = { email: req.body.email };
    this.db.collection('users').findOne(userDetails, (err, user) => {
      if (err) {
        return res.status(500).send({ error: 'An error has occured' });
      }
      if (!user) {
        return res.status(404).send({ error: 'No user found.' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: 86400, // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
  }
}

module.exports = AuthController;
