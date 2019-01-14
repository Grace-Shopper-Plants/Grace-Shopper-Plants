import React from 'react'
import {connect} from 'react-redux'
import {getUserCart, getPurchasedCart} from '../store/cart'
import {me} from '../store/user'
import {Container, Row, Col, Table, Media, Button} from 'reactstrap'
import {Link} from 'react-router-dom'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.getUserCart(userId)
    this.props.getUserInfo(userId)
    const userId = this.props.user.id
  }

  handleClick() {
    const userId = this.props.match.params.userId
    this.props.getPurchasedCart(userId)
  }

  render() {
    const {cart} = this.props

    let total = 0
    total += cart
      .map(item => item.quantity * item.plant.price)
      .reduce((accum, nextVal) => accum + nextVal, 0)

    return (
      <Container fluid>
        <Row>
          <Col>
            {!cart.length ? (
              <h1>Your Cart is Empty!</h1>
            ) : (
              <div id="cart">
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
                    {cart.map(item => (
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
                        <td>{'$' + (item.plant.price / 100).toFixed(2)}</td>
                        <td>
                          {'$' +
                            (item.quantity * (item.plant.price / 100)).toFixed(
                              2
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <h4 className="align-center">
                  <strong>Total: {'$' + (total / 100).toFixed(2)}</strong>
                </h4>
                <Link to="/confirmation">
                  <Button onClick={this.handleClick()}>PURCHASE</Button>
                </Link>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserCart: userId => dispatch(getUserCart(userId)),
    getPurchasedCart: userId => dispatch(getPurchasedCart(userId)),
    getUserInfo: userId => dispatch(me(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
