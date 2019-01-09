import axios from 'axios'

// CG: SET_PLANTS maybe?
export const GOT_PLANTS = 'GOT_PLANTS'
export const GOT_SINGLE_PLANT = 'GOT_SINGLE_PLANT'

let initialState = {
  plants: [],
  singlePlant: {}
}

export const gotPlants = plants => {
  return {
    type: GOT_PLANTS,
    plants
  }
}

export const gotSinglePlant = plant => {
  return {
    type: GOT_SINGLE_PLANT,
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
    case GOT_PLANTS:
      return {
        ...state,
        plants: action.plants
      }
    case GOT_SINGLE_PLANT:
      return {
        ...state,
        singlePlant: action.plant
      }
    default:
      return state
  }
}

export default plantsReducer
