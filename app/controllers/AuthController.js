let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

class AuthController {
  constructor(db) {
    this.db = db;
    this.createUser = this.createUser.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  createUser(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const userDetails = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    this.db.collection('users').insert(userDetails, (err, result) => {
      if (err) {
        res.status(500).send({ error: 'An error has occurred' });
      } else {
        const user = result.ops[0];
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
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
      if (err)
        return res.status(500).send({
          auth: false,
          message: 'Failed to authenticate token.',
        });
      res.status(200).send(decoded);
    });
  }
}

module.exports = AuthController;
