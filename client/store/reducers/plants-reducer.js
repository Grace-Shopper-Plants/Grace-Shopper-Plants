import axios from 'axios'

const GOT_PLANTS = 'GOT_PLANTS'

let initialState = {
  plants: []
}

const gotPlants = plants => {
  return {
    type: GOT_PLANTS,
    plants
  }
}

export const getPlants = () => async dispatch => {
  const {data} = await axios.get('/api/plants')
  dispatch(gotPlants(data))
}

const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PLANTS:
      return {
        ...state,
        plants: action.plants
      }
    default:
      return state
  }
}

export default plantsReducer
