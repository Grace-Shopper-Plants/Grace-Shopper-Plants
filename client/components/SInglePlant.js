import React from 'react'
import {getSinglePlant} from '../store/plants-reducer'
import {connect} from 'react-redux'

class SinglePlant extends React.Component {
  componentDidMount() {
    const plantId = this.props.match.params.plantId
    this.props.getSinglePlant(plantId)
  }

  render() {
    return (
      <div>
        <h1>Please buy me, I need a new home! They don't feed me :(</h1>
        <h3>{this.props.plant.name}</h3>
        <h3>${this.props.plant.price}</h3>
        <img src={this.props.plant.imgUrl} />
        <h5>{this.props.plant.description}</h5>
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
