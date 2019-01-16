import React from 'react'
import {connect} from 'react-redux'
import {getCart, deleteCartItem} from '../store/cart'
import {Container, Row, Col, Table, Media, Button} from 'reactstrap'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  componentDidMount() {
    // console.log('LOCAL STORAGE', localStorage.getItem('cart'))
    if (this.props.user.id) {
      this.props.getCart(this.props.user.id)
    }
  }

  render() {
    if (this.props.user.id && !this.props.cart.length) {
      this.props.getCart(this.props.user.id)
    }

    if (!this.props.user.id && !this.props.cart.length) {
      this.props.getCart()
    }
    const {cart, user} = this.props
    console.log('CART', cart)
    let total = 0
    total += cart
      .map(item => item.quantity * item.plant.price)
      .reduce((accum, nextVal) => accum + nextVal, 0)

    return (
      <Container fluid>
        <Row>
          <Col>
            {!cart.length ? (
              <h1>Your Cart is Empty</h1>
            ) : (
              <div id="cart">
                <Table striped>
                  <thead>
                    <tr>
                      <th>Item Image</th>
                      <th>Item Name</th>
                      <th>Quantity of Items</th>
                      <th>Remove Item</th>
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
                        <td>
                          <select value={item.quantity}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                          <button
                            type="button"
                            onClick={() =>
                              this.props.user
                                ? this.props.deleteCartItem(
                                    user.id,
                                    item.plant.id
                                  )
                                : this.props.deleteCartItem(null, item.plant.id)
                            }
                          >
                            Remove Item
                          </button>
                        </td>
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
                <Link to="/cart">
                  <Button>CHECKOUT</Button>
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
    getCart: userId => dispatch(getCart(userId)),
    deleteCartItem: (userId, plantId) =>
      dispatch(deleteCartItem(userId, plantId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
