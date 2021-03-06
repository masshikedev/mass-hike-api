const Member = require('../models/Member');
const baseCallback = require('../utils/baseCallback');

class MembersController {
  constructor(db) {
    this.db = db;
    this.create = this.create.bind(this);
    this.listAll = this.listAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
  }

  create(req, res) {
    Member.create(this.db, req.body, baseCallback(res));
  }

  listAll(req, res) {
    Member.listAll(this.db, baseCallback(res));
  }

  getById(req, res) {
    Member.findById(this.db, req.params.id, baseCallback(res));
  }

  update(req, res) {
    Member.update(this.db, req.params.id, req.body, baseCallback(res));
  }
}

module.exports = MembersController;
