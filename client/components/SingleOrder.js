import React from 'react'
import {getSingleOrder} from '../store/orders'
import {connect} from 'react-redux'

class SingleOrder extends React.Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId
    const userId = this.props.match.params.userId
    this.props.getSingleOrder(userId, orderId)
  }

  render() {
    const order = this.props.order

    if (order.length === 0) {
      return null
    }

    let total = 0
    total += order
      .map(item => item.quantity * item.plant.price)
      .reduce((accum, nextVal) => accum + nextVal, 0)

    return (
      <div id="single-order">
        <h1>Order Info</h1>
        <h3>Order Id</h3>
        <h3>Item Name</h3>
        <h3>Quantity of Items</h3>
        <h3>Unit Price</h3>
        <h3>Price</h3>
        {order.map(item => (
          <div key={item.id}>
            <h3>{item.orderId}</h3>
            <h3>{item.plant.name}</h3>
            <h3>{item.quantity}</h3>
            <h3>{'$' + item.plant.price / 100}</h3>
            <h3>{'$' + item.quantity * (item.plant.price / 100)}</h3>
          </div>
        ))}
        <h3>Total: {'$' + total / 100}</h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.orders.singleOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleOrder: (userId, orderId) =>
      dispatch(getSingleOrder(userId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
