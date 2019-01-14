import React from 'react'
import {connect} from 'react-redux'
import {getUserCart} from '../store/cart'
// import { Container, Row, Col, Table, Media, Button } from 'reactstrap'
// import {Link} from 'react-router-dom'

class Cart extends React.Component {
  componentDidMount() {
    const {user} = this.props
    getUserCart(user.id)
  }

  render() {
    const {cart} = this.props

    if (!cart.length) {
      return null
    }

    let total = 0
    total += cart
      .map(item => item.quantity * item.plant.price)
      .reduce((accum, nextVal) => accum + nextVal, 0)

    return (
      // <Container fluid>
      //     <Row>
      //         <Col>
      //             <Table striped>
      //                 <thead>
      //                     <tr>
      //                         <th>Item Image</th>
      //                         <th>Item Name</th>
      //                         <th>Quantity of Items</th>
      //                         <th>Unit Price</th>
      //                         <th>Price</th>
      //                     </tr>
      //                 </thead>
      //                 <tbody>
      //                     {
      //                         cart.map(item => (
      //                             <tr key={item.id}>
      //                                 <td>
      //                                     <Media>
      //                                         <Media left href="#">
      //                                             <Media object src={item.plant.imageUrl} />
      //                                         </Media>
      //                                     </Media>
      //                                 </td>
      //                                 <td>{item.plant.name}</td>
      //                                 <td>{item.quantity}</td>
      //                                 <td>{'$' + (item.plant.price / 100)}</td>
      //                                 <td>{'$' + item.quantity * (item.plant.price / 100)}</td>
      //                             </tr>
      //                         ))
      //                     }
      //                 </tbody>
      //             </Table>
      //             <h4 className="align-center">
      //                     <strong>Total: {'$' + total / 100}</strong>
      //             </h4>
      //             <Link to="/cart"><Button>CHECKOUT</Button></Link>
      //         </Col>
      //     </Row>
      // </Container>
      <div>Hello</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserCart: userId => dispatch(getUserCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
