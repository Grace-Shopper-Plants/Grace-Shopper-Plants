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
  }, //CG: Change this to intger and measure pennies to avoid rounding problems.
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.0,
      isDecimal: true
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  //CG: Be careful using abbreviations so that evryone who works on your app is on the same page.
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://i.pinimg.com/originals/a3/fd/14/a3fd14162d2d10b04daf3f59b92c5599.jpg'
  }
})

module.exports = Plant
