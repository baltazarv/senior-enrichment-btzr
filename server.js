const db = require('./db');
// const { Student } = db.models;

db.sync()
  .then(() => db.seed());
