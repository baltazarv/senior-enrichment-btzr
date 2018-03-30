const conn = require('./conn');
const Student = require('./Student');
const School = require('./School');
const data = require('../seed');
const { students, schools } = data;

School.hasMany(Student);
Student.belongsTo(School);

const sync = () => conn.sync({ force: true });

const seed = () => {
  Promise.all(schools.map(school => {
    return School.create(school);
  }))
  .then(_schools => {
    Promise.all(students.map(student => {
      var school = _schools[Math.floor(Math.random() * _schools.length)];
      Student.create(student)
      .then(_student => {
        _student.setSchool(school);
      });
    }));
  })
  // .then([]));
  .catch(err => console.log(err));
};

module.exports = {
  sync,
  seed,
  models: {
    Student
  }
};
