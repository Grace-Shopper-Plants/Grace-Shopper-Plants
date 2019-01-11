const router = require('express').Router()
const {Order, Plant, OrderHistory} = require('../db/models')
module.exports = router

// router.post('/', async (req, res, next) => {
//     try {
//       const user = Number(req.params.userId)
//       let cart
//       const quantity = req.body.quantity
//       const plantId = req.body.plantId

//       if (req.user && req.user.id === user) {
//         cart = await Order.max('id', {
//           where: {userId: user, bought: false}
//         })

//         if (!cart) {
//           cart = Order.create({
//             userId: user
//           })
//         }
//         const newOrderHistory = OrderHistory.create({
//           orderId: cart.id,
//           plantId,
//           quantity
//         })
//         res.json(newOrderHistory)
//       } else {
//         res.json('ACCESS DENIED')
//       }
//     } catch (error) {
//       next(error)
//     }
//   })
