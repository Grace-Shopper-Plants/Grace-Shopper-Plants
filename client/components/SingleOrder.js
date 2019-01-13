import React from 'react'
import {getSingleOrder} from '../store/orders'
import {connect} from 'react-redux'

class GetSingleOrder extends React.Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId
    const userId = this.props.match.params.userId
    this.props.getSingleOrder(userId, orderId)
  }

  render() {
    const {order} = this.props
    console.log('This is the order info:', order)
    return (
      <div id="single-order">
        <h1>Order Info</h1>
        <h3>Order Id: {order.orderId}</h3>
        <h3>Total Items Ordered: {order.quantity}</h3>
        <h3>Total Price: {order.soldprice}</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(GetSingleOrder)
