const Sequelize = require('sequelize')
const db = require('../db')

const OrderHistory = db.define('orderhistory', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
      isDecimal: false
    }
  },
  soldprice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      isDecimal: false
    }
  }
})

module.exports = OrderHistory
