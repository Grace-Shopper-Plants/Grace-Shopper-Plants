const Sequelize = require('sequelize')
const db = require('../db')

const orderNumber = db.define('orderNumber', {})

module.exports = orderNumber
