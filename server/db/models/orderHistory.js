const Sequelize = require('sequelize')
const db = require('../db')

const orderHistory = db.define('orderHistory', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  bought: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = orderHistory
