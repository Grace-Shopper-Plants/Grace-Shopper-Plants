const {expect} = require('chai')
const db = require('../index')
const Plant = db.model('plant')

describe('Plant model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Model Data', () => {
    let dummy

    beforeEach(async () => {
      dummy = await Plant.create({
        name: 'Cattail',
        description:
          'Cattails are upright perennial plants that emerge from creeping rhizomes...',
        price: 2150,
        inventory: 10
      })
    })

    it('returns the correct information of the plant', async () => {
      let cattail = await Plant.findOne({
        where: {
          name: dummy.name,
          description: dummy.description,
          price: dummy.price,
          inventory: dummy.inventory
        }
      })
      expect(cattail.name).to.be.equal('Cattail')
      expect(cattail.description).to.be.equal(
        'Cattails are upright perennial plants that emerge from creeping rhizomes...'
      )
      expect(cattail.price.toString()).to.be.equal('2150')
      expect(cattail.inventory).to.be.equal(10)
    })
  })
})
