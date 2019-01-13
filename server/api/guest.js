const router = require('express').Router()
const {User, Order, OrderHistory, Plant} = require('../db/models')

// this route has to receive an array of the items that were purchased from state
router.post('/checkout', async (req, res, next) => {
  const guestOrder = await Order.create({
    bought: true,
    date: new Date()
  })
  //MUST CHECK WHAT STATE OBJECT KEY FOR CART IS ON STATE
  const guestCart = [{plantId: 1, quantity: 2}, {plantId: 4, quantity: 1}]

  for (let i = 0; i < guestCart.length; i++) {
    const plant = await Plant.findById(guestCart[i].plantId)
    await OrderHistory.create({
      quantity: guestCart[i].quantity,
      plantId: guestCart[i].plantId,
      orderId: guestOrder.id,
      soldprice: plant.price
    })
  }
  res.json(guestOrder)
})

module.exports = router
