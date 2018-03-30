const conn = require('./conn');
const Sequelize = conn.Sequelize;

const School = conn.define('school', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageurl: {
    type: Sequelize.STRING,
    defaultValue: '/images/student-placeholder.jpeg'
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = School;
