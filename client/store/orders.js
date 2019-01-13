import axios from 'axios'

export const SET_ORDERS = 'SET_ORDERS'
export const SET_SINGLE_ORDER = 'SET_SINGLE_ORDER'

let initialState = {
  orders: [],
  singleOrder: {}
}

export const setOrders = orders => {
  return {
    type: SET_ORDERS,
    orders
  }
}

export const setSingleOrder = order => {
  return {
    type: SET_SINGLE_ORDER,
    order
  }
}

export const getOrders = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/user/${userId}/orders`)
    dispatch(setOrders(data))
  } catch (err) {
    console.error(err)
  }
}

export const getSingleOrder = (userId, orderId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/user/${userId}/orders/${orderId}`)
    dispatch(setSingleOrder(data))
  } catch (err) {
    console.error(err)
  }
}

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders
      }
    case SET_SINGLE_ORDER:
      return {
        ...state,
        singleOrder: action.order
      }
    default:
      return state
  }
}

export default ordersReducer
