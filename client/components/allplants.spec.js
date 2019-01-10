'use strict'

import React from 'react'
const chai = require('chai')
import {expect} from 'chai'
const chaiThings = require('chai-things')
chai.use(chaiThings)

import enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({adapter: new Adapter()})

import AllPlants from './AllPlants'
import {gotPlants, SET_PLANTS} from '../store/plants'
import plantsReducer from '../store/plants'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  plantsReducer: {
    plants: [
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
    ],
    singlePlant: {}
  }
}

const store = mockStore(initialState)

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

// describe('<AllPlants /> component rendering', () => {

//   it('renders a div', () => {
//     const wrapper = shallow(<AllPlants store={store} />)
//     console.log("I AM STATE FROM STORE: ", store.getState())
//     console.log("WRAPPER: ", wrapper)
//     expect(wrapper.find('h1').text()).to.equal("Please Buy Our Plants! So we don't end up like SEARS :(")
//   })

// });

describe('`gotPlants action creator', () => {
  const gotPlantsAction = gotPlants(plants)

  it('creates an object with `type` and `plants`', () => {
    expect(gotPlantsAction.type).to.equal(SET_PLANTS)
    expect(gotPlantsAction.plants[1].price).to.equal(20)
  })
})

describe('plantsReducer', () => {
  const initialState = {
    plants: [],
    singlePlant: {}
  }

  const newState = plantsReducer(initialState, {
    type: SET_PLANTS,
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
