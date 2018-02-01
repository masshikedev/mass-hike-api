// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dbConfig = require('./config/db');

const routes = require('./app/routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8000;

MongoClient.connect(dbConfig.url, (err, database) => {
  const db = database.db(dbConfig.name);
  if (err) {
    return console.log(err);
  }
  routes(app, db);
  app.listen(port, () => {
    console.log('Up and running on localhost:' + port);
  });
});
