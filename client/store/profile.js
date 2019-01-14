import axios from 'axios'

export const SET_PROFILE = 'SET_PROFILE'

let initialState = {
  profile: {}
}

export const setProfile = profile => {
  return {
    type: SET_PROFILE,
    profile
  }
}

export const getProfile = id => async dispatch => {
  const {data} = await axios.get(`/api/users/${id}/profile`)
  dispatch(setProfile(data))
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    default:
      return state
  }
}

export default profileReducer
