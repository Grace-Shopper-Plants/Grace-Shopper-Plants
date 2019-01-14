import React from 'react'
import {getPlants} from '../store/plants'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import {Container, Row} from 'reactstrap'

class AllPlants extends React.Component {
  componentDidMount() {
    this.props.getAllPlants()
  }

  render() {
    const {plants} = this.props
    return (
      <div id="all-plants">
        <h1>Please Buy Our Plants! So we don't end up like SEARS :(</h1>
        <Container fluid>
          <Row>
            {plants.map(plant => {
              return <ProductCard product={plant} key={plant.id} />
            })}
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    plants: state.products.plants
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllPlants: () => dispatch(getPlants())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPlants)
