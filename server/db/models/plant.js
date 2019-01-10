const Sequelize = require('sequelize')
const db = require('../db')

const Plant = db.define('plant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'Information coming soon!'
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      isDecimal: false
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://i.pinimg.com/originals/a3/fd/14/a3fd14162d2d10b04daf3f59b92c5599.jpg'
  }
})

module.exports = Plant
