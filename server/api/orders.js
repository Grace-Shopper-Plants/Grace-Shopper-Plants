const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const singleUserId = Number(req.params.userId)
  try {
    const orders = await Order.findAll({
      where: {userId: singleUserId}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//Next tasks are:
/* User can get order history.
 Once order is submitted, needs to update bought and date */
router.put('/:orderId')
