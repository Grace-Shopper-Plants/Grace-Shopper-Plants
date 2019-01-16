import React from 'react'
import {getOrders} from '../store/orders'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Table, Container, Row, Col} from 'reactstrap'

class AllOrders extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getAllOrders(userId)
  }

  render() {
    const {orders} = this.props
    if (orders.length === 0) {
      return null
    }
    return (
      <div id="all-orders">
        <h3>Order History</h3>
        <Container fluid>
          <Row>
            <Col>
              <Table hover>
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Order Date</th>
                    <th>Order Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => {
                    return (
                      // <Link to={`/users/${order.userId}/orders/${order.id}`}>
                      <tr key={order.id}>
                        {/* <th scope="row"></th> */}
                        <td>{order.id}</td>
                        <td>{order.date.slice(0, 10)}</td>
                        <td>
                          <Link
                            to={`/users/${order.userId}/orders/${order.id}`}
                          >
                            <Button>View Details</Button>
                          </Link>
                        </td>
                      </tr>
                      // </Link>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
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
