const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Plant = db.model('plant')

describe('Plant routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/plants/', () => {
    beforeEach(() => {
      return Plant.create({
        name: 'Cattail',
        description:
          'Cattails are upright perennial plants that emerge from creeping rhizomes...',
        price: 21.5,
        inventory: 10
      })
    })

    it('GET /api/plants', async () => {
      const res = await request(app)
        .get('/api/plants')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Cattail')
    })
  })

  describe('/api/plants/:id', () => {
    beforeEach(() => {
      return Plant.create({
        id: 4,
        name: 'Tree',
        description: 'This is a tall tree',
        price: 50.0,
        inventory: 5
      })
    })

    it('GET /api/plants/:id', async () => {
      const res = await request(app)
        .get('/api/plants/4')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Tree')
    })
  })
})
