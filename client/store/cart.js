import axios from 'axios'

export const SET_CART = 'SET_CART'
export const ADD_ITEM = 'ADD_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'
export const PURCHASE_CART = 'PURCHASE_CART'

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

export const purchaseCart = cart => {
  return {
    type: PURCHASE_CART,
    cart
  }
}

export const getCart = (userId = null) => async dispatch => {
  try {
    if (userId) {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(setCart(data))
    } else {
      dispatch(setCart(JSON.parse(localStorage.getItem('cart'))))
    }
  } catch (err) {
    console.error(err)
  }
}

export const addToCart = (
  plantId = null,
  userId = null,
  quantity = null,
  cartItem = null
) => async dispatch => {
  try {
    if (userId) {
      const {data} = await axios.put(`/api/users/${userId}/cart`, {
        quantity,
        plantId
      })
      console.log('This is user data', data)
      dispatch(addItem(data))
    } else {
      if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([cartItem]))
      } else {
        localStorage.setItem(
          'cart',
          JSON.stringify([
            ...JSON.parse(localStorage.getItem('cart')),
            cartItem
          ])
        )
      }
      dispatch(addItem(cartItem))
    }
  } catch (err) {
    console.error(err)
  }
}

export const deleteCartItem = (userId = null, plantId) => async dispatch => {
  try {
    if (userId) {
      await axios.delete(`/api/users/${userId}/cart/${plantId}`)
      dispatch(deleteItem(plantId))
    } else {
      let cart = JSON.parse(localStorage.getItem('cart'))
      cart = cart.filter(item => item.plant.id !== plantId)
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(deleteItem(plantId))
    }
  } catch (err) {
    console.error(err)
  }
}

export const getPurchasedCart = userId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/users/${userId}/cart/purchase`)
    dispatch(purchaseCart(data))
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
        cart: action.cart
      }
    case ADD_ITEM:
      return {
        cart: [...state.cart, action.item]
      }
    case DELETE_ITEM:
      return {
        cart: state.cart.filter(item => item.id !== action.itemId)
      }
    case PURCHASE_CART:
      return {
        cart: [action.cart]
      }
    default:
      return state
  }
}

export default cartReducer
