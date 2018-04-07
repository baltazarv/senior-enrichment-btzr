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
    defaultValue: 'http://www.mshistorynow.mdah.ms.gov/images/650.jpg'
  },
  address1: {
    type: Sequelize.STRING
  },
  address2: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = School;
