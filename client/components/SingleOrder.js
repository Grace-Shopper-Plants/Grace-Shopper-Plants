import React from 'react'
import {getSingleOrder} from '../store/orders'
import {connect} from 'react-redux'
import {Media, Table, Container, Row, Col} from 'reactstrap'

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
      <Container fluid>
        <Row>
          <Col>
            <h1>Order Info</h1>
            <h2>Order Number: {order[0].id}</h2>
            <Table striped>
              <thead>
                <tr>
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>Quantity of Items</th>
                  <th>Unit Price</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.map(item => (
                  <tr key={item.id}>
                    <td>
                      <Media>
                        <Media left href="#">
                          <Media object src={item.plant.imageUrl} />
                        </Media>
                      </Media>
                    </td>
                    <td>{item.plant.name}</td>
                    <td>{item.quantity}</td>
                    <td>{'$' + item.plant.price / 100}</td>
                    <td>{'$' + item.quantity * (item.plant.price / 100)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h4 className="float-right">
              <strong>Total: {'$' + total / 100}</strong>
            </h4>
          </Col>
        </Row>
      </Container>
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
