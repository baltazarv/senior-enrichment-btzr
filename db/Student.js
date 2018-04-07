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
});

module.exports = Student;
