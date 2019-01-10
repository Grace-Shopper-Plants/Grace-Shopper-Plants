const Sequelize = require('sequelize')
const db = require('../db')

const OrderNumber = db.define('ordernumber', {})

module.exports = OrderNumber
