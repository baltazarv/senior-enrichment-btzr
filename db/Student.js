const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Student = conn.define('student', {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  gpa: {
    type: Sequelize.FLOAT
  },
  imageurl: {
    type: Sequelize.STRING,
    defaultValue: '/images/student-placeholder.jpeg'
  },
}, {
  getterMethods: {
    name: function() {
      return this.firstname + ' ' + this.lastname;
    }
  },
  setterMethods: {
    name: function(name) {
      var parts = name.split(' ');
      this.firstname = parts[0];
      this.lastname = parts[1];
    }
  }
});

module.exports = Student;
