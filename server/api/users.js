const router = require('express').Router()
const {User, Order, OrderHistory, Plant} = require('../db/models')
module.exports = router

router.get('/:userId/orders', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)

    // if (req.user && req.user.id === user) {
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

router.get('/:userId/orders/:orderId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    const orderId = Number(req.params.orderId)

    // if (req.user && req.user.id === singleUserId) {
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

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)

    // if (req.user && req.user.id === user) {
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

// router.post('/:userId/cart', async (req, res, next) => {
//   try {
//     const userId = Number(req.params.userId)
//     let cart
//     const quantity = req.body.quantity
//     const plantId = req.body.plantId

//     // if (req.user && req.user.id === user) {
//     cart = await Order.findOne({
//       where: {userId, bought: false}
//     })

//     if (!cart) {
//       cart = Order.create({
//         userId
//       })
//     }
//     const newOrderHistory = OrderHistory.create({
//       orderId: cart.id,
//       plantId,
//       quantity
//     })
//     res.json(newOrderHistory)
//     // } else {
//     //   res.json('ACCESS DENIED')
//     // }
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/', async (req, res, next) => {
//   try {
//     const plantId = req.body.plantId
//     const quantity = req.body.quantity

//     if (req.user && req.user.id === user) {
//       const cartToUpdate = await Order.max('id', {
//         where: {userId: user, bought: false}
//       })

//       if (!cartToUpdate) {
//         res.status(404).json('CART DOES NOT EXIST!')
//       }

//       const cartItemToUpdate = await OrderHistory.findOne({
//         where: {orderId: cartToUpdate.id, plantId},
//         include: [{model: Plant}]
//       })
//       const updatedItem = await cartItemToUpdate.update({
//         quantity
//       })

//       res.json(updatedItem)
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/', async (req, res, next) => {
//   try {
//     const plantId = req.body.plantId

//     if (req.user && req.user.id === user) {
//       const cartToUpdate = await Order.max('id', {
//         where: {userId: user, bought: false}
//       })

//       if (!cartToUpdate) {
//         res.status(404).json('CART DOES NOT EXIST!')
//       }

//       const cartItemToDelete = await OrderHistory.findOne({
//         where: {orderId: cartToUpdate.id, plantId},
//         include: [{model: Plant}]
//       })
//       await cartItemToDelete.destroy()

//       res.json('ITEM DELETED!')
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/', async (req, res, next) => {
//   //THIS ROUTE IS FOR WHEN A CART IS PURCHASED

//  try {
//     const user = Number(req.params.userId)
//     let cart
//     const quantity = req.body.quantity
//     const plantId = req.body.plantId

//     if (req.user && req.user.id === user) {
//       cart = await Order.max('id', {
//         where: {userId: user, bought: false}
//       })

//       if (!cart) {
//         cart = Order.create({
//           userId: user
//         })
//       }
//       const newOrderHistory = OrderHistory.create({
//         orderId: cart.id,
//         plantId,
//         quantity
//       })
//       res.json(newOrderHistory)
//     } else {
//       res.json('ACCESS DENIED')
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll()
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

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
