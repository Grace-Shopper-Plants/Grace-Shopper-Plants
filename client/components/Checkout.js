import React from 'react'
import {connect} from 'react-redux'
import {getUserCart, getPurchasedCart} from '../store/cart'
import {
  Container,
  Row,
  Col,
  Table,
  Media,
  Button,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import {Link} from 'react-router-dom'

class Checkout extends React.Component {
  render() {
    console.log('rendercart', this.props.cart)
    if (!this.props.cart.length) this.props.loadUserCart(this.props.user.id)
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
              </div>
            )}
          </Col>
        </Row>
        <h3 id="shippingInfo">Shipping Info</h3>
        <Col md={6}>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Enter Address Here"
            />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label for="addressNumber">Apartment/Studio/Floor Number</Label>
            <Input
              type="text"
              name="addressNumber"
              id="addressNumber"
              placeholder="Enter Apartment, Studio, or Floor Here"
            />
          </FormGroup>
        </Col>

        <Col md={2}>
          <FormGroup>
            <Label for="city">City</Label>
            <Input type="text" name="city" id="city" />
          </FormGroup>
        </Col>

        <Col md={1}>
          <FormGroup>
            <Label for="state">State</Label>
            <Input type="text" name="state" id="state" />
          </FormGroup>
        </Col>

        <Col md={2}>
          <FormGroup>
            <Label for="zip">Zip</Label>
            <Input type="text" name="zip" id="zip" />
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="cardNumber">Credit Card Number</Label>
            <Input
              type="text"
              name="cardNumber"
              id="cardNumber"
              placeholder="Enter Credit Card Number Here"
            />
          </FormGroup>
        </Col>

        <Link to="/confirmation">
          <Button>PURCHASE</Button>
        </Link>
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
    loadUserCart: userId => dispatch(getUserCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
