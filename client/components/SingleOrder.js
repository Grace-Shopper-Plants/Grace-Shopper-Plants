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
    return (
      <div id="single-order">
        <h1>Order Info</h1>
        {order.map(item => (
          <div key={item.id}>
            <h3>Order Id: {item.orderId}</h3>
            <h3>Total Items Ordered: {item.quantity}</h3>
            <h3>Total Price: {'$' + item.soldprice / 100}</h3>
          </div>
        ))}
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
