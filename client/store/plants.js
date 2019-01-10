import axios from 'axios'

export const SET_PLANTS = 'SET_PLANTS'
export const SET_SINGLE_PLANT = 'SET_SINGLE_PLANT'

let initialState = {
  plants: [],
  singlePlant: {}
}

export const gotPlants = plants => {
  return {
    type: SET_PLANTS,
    plants
  }
}

export const gotSinglePlant = plant => {
  return {
    type: SET_SINGLE_PLANT,
    plant
  }
}

export const getPlants = () => async dispatch => {
  const {data} = await axios.get('/api/plants')
  dispatch(gotPlants(data))
}

export const getSinglePlant = id => async dispatch => {
  const {data} = await axios.get(`/api/plants/${id}`)
  dispatch(gotSinglePlant(data))
}

const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANTS:
      return {
        ...state,
        plants: action.plants
      }
    case SET_SINGLE_PLANT:
      return {
        ...state,
        singlePlant: action.plant
      }
    default:
      return state
  }
}

export default plantsReducer
