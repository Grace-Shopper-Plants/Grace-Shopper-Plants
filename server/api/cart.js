const router = require('express').Router()
const {Order, Plant, OrderHistory} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = Number(req.params.userId)

    if (req.user && req.user.id === user) {
      const cart = await Order.max('id', {
        where: {userId: user, bought: false}
      })

      if (!cart) {
        res.status(404).json('CART IS EMPTY!')
      }

      const cartItems = await OrderHistory.findAll({
        where: {orderId: cart.id},
        include: [{model: Plant}]
      })
      res.json(cartItems)
    } else {
      res.json('ACCESS DENIED')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = Number(req.params.userId)
    let cart
    const quantity = req.body.quantity
    const plantId = req.body.plantId

    if (req.user && req.user.id === user) {
      cart = await Order.max('id', {
        where: {userId: user, bought: false}
      })

      if (!cart) {
        cart = Order.create({
          userId: user
        })
      }
      const newOrderHistory = OrderHistory.create({
        orderId: cart.id,
        plantId,
        quantity
      })
      res.json(newOrderHistory)
    } else {
      res.json('ACCESS DENIED')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const plantId = req.body.plantId
    const quantity = req.body.quantity

    if (req.user && req.user.id === user) {
      const cartToUpdate = await Order.max('id', {
        where: {userId: user, bought: false}
      })

      if (!cartToUpdate) {
        res.status(404).json('CART DOES NOT EXIST!')
      }

      const cartItemToUpdate = await OrderHistory.findOne({
        where: {orderId: cartToUpdate.id, plantId},
        include: [{model: Plant}]
      })
      const updatedItem = await cartItemToUpdate.update({
        quantity
      })

      res.json(updatedItem)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const plantId = req.body.plantId

    if (req.user && req.user.id === user) {
      const cartToUpdate = await Order.max('id', {
        where: {userId: user, bought: false}
      })

      if (!cartToUpdate) {
        res.status(404).json('CART DOES NOT EXIST!')
      }

      const cartItemToDelete = await OrderHistory.findOne({
        where: {orderId: cartToUpdate.id, plantId},
        include: [{model: Plant}]
      })
      await cartItemToDelete.destroy()

      res.json('ITEM DELETED!')
    }
  } catch (error) {
    next(error)
  }
})
