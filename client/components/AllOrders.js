import React from 'react'
import {getOrders} from '../store/orders'
import {connect} from 'react-redux'
import Link from 'react-router-dom'

class AllOrders extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getAllOrders(userId)
  }

  render() {
    const {orders, user} = this.props
    return (
      <div id="all-orders">
        <h1>Order History(</h1>
        {orders.map(order => {
          return (
            <div key={order.id}>
              <Link to={`/user/${user.id}/orders/${order.id}`}>
                <span>
                  <p>{order.id}</p>
                  <p>{order.date.slice(0, 10)}</p>
                </span>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllOrders: userId => dispatch(getOrders(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
