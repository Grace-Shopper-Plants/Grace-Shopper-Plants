import React from 'react'
import {getSinglePlant} from '../store/plants-reducer'
import {connect} from 'react-redux'

class SinglePlant extends React.Component {
  componentDidMount() {
    const plantId = this.props.match.params.plantId
    this.props.getSinglePlant(plantId)
  }

  render() {
    const plant = {
      id: 1,
      name: 'Whomping Willow',
      price: 500,
      imageUrl: 'PLACEHOLDER',
      description: "Broke Ron's car"
    }
    return (
      <div>
        <h1>Please buy me, I need a new home!</h1>
        <h3>{plant.name}</h3>
        <h3>${plant.price}</h3>
        <h3>{plant.imageUrl}</h3>
        <h5>{plant.description}</h5>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    plant: state.plantsReducer.singlePlant
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSinglePlant: id => dispatch(getSinglePlant(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlant)
