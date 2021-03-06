const router = require('express').Router()
const {User, Order, OrderHistory, Plant} = require('../db/models')
module.exports = router

// route for getting all users (for admin)
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({attributes: ['id', 'name', 'email']})
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// route for a user getting their profile information
router.get('/:userId/profile', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    const user = await User.findById(userId, {
      attributes: [
        'name',
        'email',
        'houseNumber',
        'street',
        'city',
        'state',
        'zipCode'
      ]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// route for a user updating their profile
router.put('/:userId/profile', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)

    const user = await User.findById(userId)

    const userInfo = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      houseNumber: req.body.houseNumber,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipCode,
      cardNumber: req.body.cardNumber,
      cardExpireDate: req.body.cardExpireDate,
      cvc: req.body.cvc
    }

    const updatedUserInfo = await user.update(userInfo)
    res.json(updatedUserInfo)
  } catch (err) {
    next(err)
  }
})

// route for a user deleting their account
router.delete('/:userId/profile', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    const user = await User.findById(userId)
    const deletedUser = await user.destroy()
    res.json('USER DELETED')
  } catch (err) {
    next(err)
  }
})

//route for a user getting all their orders
router.get('/:userId/orders', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    const orders = await Order.findAll({
      where: {userId, bought: true}
    })

    if (!orders) {
      res.status(404).json('YOU HAVE NO ORDERS!')
    }
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//route for a user finding all items in one order
router.get('/:userId/orders/:orderId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    const orderId = Number(req.params.orderId)

    const order = await Order.findOne({
      where: {userId, id: orderId, bought: true}
    })

    if (!order) {
      res.status(404).json('Not a valid order')
    }

    const orderItems = await OrderHistory.findAll({
      where: {orderId},
      include: [{model: Plant}]
    })
    res.json(orderItems)
  } catch (error) {
    next(error)
  }
})

//route for a user getting their cart items
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    const cart = await Order.findAll({
      where: {userId, bought: false}
    })

    if (!cart) {
      res.status(404).json('CART IS EMPTY!')
    }

    const cartItems = await OrderHistory.findAll({
      where: {orderId: cart[cart.length - 1].id},
      include: [{model: Plant}]
    })
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

//route for updating quantity in a cart
router.put('/:userId/cart', async (req, res, next) => {
  try {
    const plantId = req.body.plantId
    const quantity = req.body.quantity
    const userId = req.params.userId
    const cartToUpdate = await Order.findOne({
      where: {userId, bought: false}
    })
    if (!cartToUpdate) {
      res.status(404).json('CART DOES NOT EXIST!')
    }

    const cartItemToUpdate = await OrderHistory.findOne({
      where: {orderId: cartToUpdate.id, plantId},
      include: [{model: Plant}]
    })
    if (cartItemToUpdate) {
      cartItemToUpdate.quantity += quantity
      cartItemToUpdate.plant.inventory -= quantity
      res.json(cartItemToUpdate)
    } else {
      const plant = await Plant.findById(plantId)
      const newCartItem = await OrderHistory.create(
        {
          orderId: cartToUpdate.id,
          plantId,
          soldprice: plant.price,
          quantity: req.body.quantity
        },
        {include: [{model: Plant}]}
      )
      res.json(newCartItem)
    }
  } catch (error) {
    next(error)
  }
})

//route for deleting a plantId from the cart
router.delete('/:userId/cart/:plantId', async (req, res, next) => {
  try {
    const plantId = req.params.plantId
    const userId = req.params.userId
    const cartToUpdate = await Order.findOne({
      where: {userId, bought: false},
      attributes: ['id']
    })

    const cartItemToDelete = await OrderHistory.findOne({
      where: {orderId: cartToUpdate.id, plantId}
    })
    await cartItemToDelete.destroy()

    res.json('ITEM DELETED!')
  } catch (error) {
    next(error)
  }
})

// route for turning cart into completed order
router.put('/:userId/cart/purchase', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    const cart = await Order.findOne({
      where: {userId, bought: false}
    })
    const purchased = await cart.update({
      bought: true,
      date: new Date()
    })

    res.json(purchased)
  } catch (err) {
    next(err)
  }
})
