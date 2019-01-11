const User = require('./user')
const Plant = require('./plant')
const Order = require('./order')
const OrderHistory = require('./orderHistory')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderHistory)
OrderHistory.belongsTo(Order)

Plant.hasMany(OrderHistory)
OrderHistory.belongsTo(Plant)

module.exports = {
  User,
  Plant,
  Order,
  OrderHistory
}
