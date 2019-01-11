const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  bought: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
})

module.exports = Order
