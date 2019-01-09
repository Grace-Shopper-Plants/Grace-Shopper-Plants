'use strict'

// Assertions
const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
chai.use(chaiThings)

// CampusList component
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({adapter: new Adapter()})
import React from 'react'
import {AllPlants} from './AllPlants'

// Redux
import {gotPlants, GOT_PLANTS} from '../store/plants-reducer'
import plantsReducer from '../store/plants-reducer'

describe('Front-End', () => {
  const plants = [
    {
      id: 1,
      name: 'Whomping Willow',
      price: 500,
      imageUrl: 'PLACEHOLDER',
      description: "Broke Ron's car"
    },
    {
      id: 2,
      name: 'Poison Ivy',
      price: 20,
      imageUrl: 'PLACEHOLDER',
      description: 'The remedy is aloe'
    }
  ]

  // describe('<AllPlants /> component', () => {

  // //     it('renders the plants', async () => {
  // //         const plantRecords = await Plant.bulkCreate(plants)
  // //         const wrapper = shallow(<AllPlants plants={plantRecords} />)
  // //         expect(plantItems).to.have.length(2)
  // //         expect(plantItems.at(1).name()).to.contain('Poison Ivy')
  // //         expect(plantItems.at(1).description()).to.contain('The remedy is aloe')
  // //     });
  // // });

  describe('`gotPlants action creator', () => {
    const gotPlantsAction = gotPlants(plants)

    it('creates an object with `type` and `plants`', () => {
      expect(gotPlantsAction.type).to.equal(GOT_PLANTS)
      expect(gotPlantsAction.plants[1].price).to.equal(20)
    })
  })

  describe('plantsReducer', () => {
    const initialState = {
      plants: [],
      singlePlant: {}
    }

    const newState = plantsReducer(initialState, {
      type: GOT_PLANTS,
      plants
    })

    it('returns a new state with the updated `plants`', () => {
      expect(newState.plants).to.deep.equal(plants)
    })

    it('does not modify the previous state', () => {
      expect(initialState).to.deep.equal({
        plants: [],
        singlePlant: {}
      })
    })
  })
})
