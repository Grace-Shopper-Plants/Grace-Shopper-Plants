const router = require('express').Router()
const {User, Order, OrderHistory, Plant} = require('../db/models')
module.exports = router

// route for getting all users (for admin)
router.get('/', async (req, res, next) => {
  try {
    // if (req.user && req.user.isAdmin) {
    const users = await User.findAll({attributes: ['id', 'name', 'email']})
    res.json(users)

    // } else {
    //   res.json('ACCESS DENIED')
    // }
  } catch (err) {
    next(err)
  }
})

// route for a user getting their profile information
router.get('/:userId/profile', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)

    // if (req.user && req.user.id === userId) {
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

    // } else {
    //   res.json('ACCESS DENIED')
    // }
  } catch (err) {
    next(err)
  }
})

// route for a guest signing up as a user
// router.post('/signup', async (req, res, next) => {
//   try {
//     const userInfo = {
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       houseNumber: req.body.houseNumber,
//       street: req.body.street,
//       city: req.body.city,
//       state: req.body.state,
//       zipcode: req.body.zipCode,
//       cardNumber: req.body.cardNumber,
//       cardExpireDate: req.body.cardExpireDate,
//       cvc: req.body.cvc
//     }
//     const user = await User.create(userInfo)
//     res.json(user)
//   } catch (err) {
//     next(err)
//   }
// })

// route for a user updating their profile
router.put('/:userId/profile', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)

    // if (req.user && req.user.id === userId) {
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

    // } else {
    //   res.json('ACCESS DENIED')
    // }
  } catch (err) {
    next(err)
  }
})

// route for a user deleting their account
router.delete('/:userId/profile', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)

    // if (req.user && req.user.id === userId) {
    const user = await User.findById(userId)
    const deletedUser = await user.destroy()
    res.json('USER DELETED')

    // } else {
    //   res.json('ACCESS DENIED')
    // }
  } catch (err) {
    next(err)
  }
})

//route for a user getting all their orders
router.get('/:userId/orders', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)

    // if (req.user && req.user.id === userId) {
    const orders = await Order.findAll({
      where: {userId, bought: true}
    })

    if (!orders) {
      res.status(404).json('YOU HAVE NO ORDERS!')
    }
    res.json(orders)

    // } else {
    //   res.json('ACCESS DENIED')
    // }
  } catch (error) {
    next(error)
  }
})

//route for a user finding all items in one order
router.get('/:userId/orders/:orderId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    const orderId = Number(req.params.orderId)

    // if (req.user && req.user.id === userId) {
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

    // } else {
    //   res.json('ACCESS DENIED')
    // }
  } catch (error) {
    next(error)
  }
})

//route for a user getting their cart items
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)

    // if (req.user && req.user.id === userId) {
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
    // } else {
    //   res.json('ACCESS DENIED')
    // }
  } catch (error) {
    next(error)
  }
})

//route for adding items to a cart
router.post('/:userId/cart', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    let cart
    const quantity = req.body.quantity
    const plantId = req.body.plantId

    // if (req.user && req.user.id === userId) {
    cart = await Order.findOrCreate({
      where: {userId, bought: false}
    })

    const plant = await Plant.findById(plantId)

    const newOrderHistory = await OrderHistory.create({
      orderId: cart[0].id,
      plantId,
      soldprice: plant.price,
      quantity
    })
    res.json(newOrderHistory)
    // } else {
    //   res.json('ACCESS DENIED')
    // }
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

    // if (req.user && req.user.id === userId) {

    const cartToUpdate = await Order.findAll({
      where: {userId, bought: false}
    })

    if (!cartToUpdate) {
      res.status(404).json('CART DOES NOT EXIST!')
    }

    const cartItemToUpdate = await OrderHistory.findOne({
      where: {orderId: cartToUpdate[cartToUpdate.length - 1].id, plantId},
      include: [{model: Plant}]
    })
    const updatedItem = await cartItemToUpdate.update({
      quantity
    })

    res.json(updatedItem)
    // } else {
    //   res.json('ACCESS DENIED')
    // }
  } catch (error) {
    next(error)
  }
})

//route for deleting a plantId from the cart
router.delete('/:userId/cart', async (req, res, next) => {
  try {
    const plantId = req.body.plantId
    const userId = req.params.userId

    // if (req.user && req.user.id === userId) {
    const cartToUpdate = await Order.findAll({
      where: {userId, bought: false}
    })

    if (!cartToUpdate) {
      res.status(404).json('CART DOES NOT EXIST!')
    }

    const cartItemToDelete = await OrderHistory.findOne({
      where: {orderId: cartToUpdate[cartToUpdate.length - 1].id, plantId},
      include: [{model: Plant}]
    })
    await cartItemToDelete.destroy()

    res.json('ITEM DELETED!')
    // } else {
    //   res.json('ACCESS DENIED')
    // }
  } catch (error) {
    next(error)
  }
})

// route for turning cart into completed order
router.put('/:userId/cart/purchase', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)

    // if (req.user && req.user.id === userId) {
    const cart = await Order.findOne({
      where: {userId, bought: false}
    })

    //update date in model to 'new Date' as the default

    const purchased = await cart.update({
      bought: true,
      date: new Date()
    })

    res.json(purchased)

    // } else {
    //   res.json('ACCESS DENIED')
    // }
  } catch (err) {
    next(err)
  }
})

// //Left this here to reference when implementing login/admin stuff:

// router.get('/:id', async (req, res, next) => {
//   try {
//     if ((req.login && req.id) || req.isAdmin) {
//       const user = await User.findById(req.params.id)
//       res.json(user)
//     }
//   } catch (err) {
//     next(err)
//   }
// })
