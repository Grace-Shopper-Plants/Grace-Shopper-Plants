const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: null,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Order