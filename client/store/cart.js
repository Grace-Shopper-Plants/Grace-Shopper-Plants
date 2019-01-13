import axios from 'axios'

export const SET_CART = 'SET_CART'
export const ADD_ITEM = 'ADD_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'

let initialState = {
  cart: []
}

export const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

export const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  }
}

export const deleteItem = itemId => {
  return {
    type: DELETE_ITEM,
    itemId
  }
}

export const getUserCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/cart`)
    dispatch(setCart(data))
  } catch (err) {
    console.err(err)
  }
}

export const addToUserCart = (plantId, userId, quantity) => async dispatch => {
  try {
    const {data} = await axios.post(
      `/api/users/${userId}/cart`,
      plantId,
      quantity
    )
    dispatch(addItem(data))
  } catch (err) {
    console.err(err)
  }
}

export const deleteUserCartItem = userId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/users/${userId}/cart`)
    dispatch(deleteItem(data))
  } catch (err) {
    console.err(err)
  }
}

// export const getNonUserCart = () => async dispatch => {
//     try {
//         const {data} = await localStorage.get()
//         dispatch(setCart(data))
//     }
//     catch (err) {
//         console.err(err)
//     }
// }

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        cart: [action.cart]
      }
    case ADD_ITEM:
      return {
        cart: [state.cart, action.item]
      }
    case DELETE_ITEM:
      return {
        cart: [state.cart].filter(item => item.id !== action.itemId)
      }
    default:
      return state
  }
}

export default cartReducer
