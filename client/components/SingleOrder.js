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
    const {order, user, product} = this.props
    return (
      <div id="single-order">
        <h1>Order Info</h1>
        <h3>Order/Product Info</h3>
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
