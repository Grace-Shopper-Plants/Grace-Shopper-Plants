import React from 'react'
import {getSinglePlant} from '../store/plants'
import {addToUserCart} from '../store/cart'
import {connect} from 'react-redux'
import {
  Container,
  Card,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  CardBody,
  Button,
  Row,
  Col
} from 'reactstrap'

class SinglePlant extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    console.log(`We're in a component!`)
    const plantId = this.props.match.params.plantId
    this.props.getSinglePlant(plantId)
  }

  handleChange(evt) {
    this.setState({quantity: Number(evt.target.value)})
  }

  handleClick() {
    const {plant, user} = this.props
    console.log('This is the plant:', plant)
    if (this.props.user.id) {
      // const quantity = this.state.quantity
      // let i = 1
      // while (i < quantity) {
      this.props.addToUserCart(plant.id, user.id, this.state.quantity)
      // i++
      // }
    }
    // else {
    //   localStorage.setItem('quantity:', this.state.quantity)
    //   localStorage.setItem('')
    // }
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
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSinglePlant: id => dispatch(getSinglePlant(id)),
    addToUserCart: item => dispatch(addToUserCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlant)
