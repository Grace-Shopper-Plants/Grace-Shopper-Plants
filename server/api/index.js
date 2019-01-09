const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/plants', require('./plants'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

// /api/users/:id
// /api/users/:id/orders
// /orders/:userid "?!?@?? NO"