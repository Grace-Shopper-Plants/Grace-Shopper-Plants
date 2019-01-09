import React from 'react'
import {getPlants} from '../store/plants-reducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllPlants extends React.Component {
  componentDidMount() {
    this.props.getAllPlants()
  }

  render() {
    return (
      <div>
        <h1>Please Buy Our Plants! So we don't end up like SEARS :(</h1>
        {this.props.plants.map(plant => {
          return (
            <div key={plant.id}>
              <Link to={`/plants/${plant.id}`}>
                <h3>{plant.name}</h3>
                <img src={plant.imgUrl} />
                <h3>${plant.price}</h3>
                <h5>{plant.description}</h5>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    plants: state.plantsReducer.plants
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllPlants: () => dispatch(getPlants())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPlants)
