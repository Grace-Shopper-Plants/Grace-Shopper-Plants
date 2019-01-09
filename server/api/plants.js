const router = require('express').Router()
const {Plant} = require('../db/models')
module.exports = router

//route to /api/plants
router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll()
    res.json(plants)
  } catch (err) {
    next(err)
  }
})

//route to single plant /api/plants/:id
router.get('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id)
    res.json(plant)
  } catch (err) {
    next(err)
  }
})
