import React from 'react'
import {getSinglePlant} from '../store/plants'
import {addToCart} from '../store/cart'
import {connect} from 'react-redux'
import {Container, Card, CardImg, CardSubtitle, Row, Col} from 'reactstrap'

class SinglePlant extends React.Component {
  constructor() {
    super()
    this.state = {
      plant: {},
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const plantId = this.props.match.params.plantId
    this.props.getSinglePlant(plantId)
  }

  handleChange(evt) {
    this.setState({plant: this.props.plant})
    this.setState({quantity: Number(evt.target.value)})
  }

  handleClick() {
    const {plant, user} = this.props
    if (user.id) {
      this.props.addToCart(plant.id, user.id, this.state.quantity)
    } else {
      this.props.addToCart(null, null, null, this.state)
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="text-center">
            <Card>
              {/* <h1>Please buy me, I need a new home! They don't feed me :(</h1> */}
              <h1>{this.props.plant.name}</h1>
              <Row>
                <Col>
                  <CardImg src={this.props.plant.imageUrl} />
                </Col>
                <Col>
                  <h5>{this.props.plant.description}</h5>
                  <CardSubtitle>
                    ${(this.props.plant.price / 100).toFixed(2)}
                  </CardSubtitle>
                  <h5>Quantity:</h5>
                  <form>
                    <select
                      className="quantity-dropdown"
                      value={this.state.quantity}
                      onChange={this.handleChange}
                    >
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                    <button type="button" onClick={this.handleClick}>
                      Add to Cart
                    </button>
                  </form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    plant: state.products.singlePlant,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSinglePlant: id => dispatch(getSinglePlant(id)),
    addToCart: (plantId, userId, quantity, cartItem) =>
      dispatch(addToCart(plantId, userId, quantity, cartItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlant)
