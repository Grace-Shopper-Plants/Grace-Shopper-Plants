/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {})

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const codysPassword = 'test123'
    const codysName = 'Cody Smith'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        password: codysPassword,
        name: codysName
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('GET /api/profile', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(codysName)
    })
  })
})
