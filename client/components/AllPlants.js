import React from 'react'
import {getPlants} from '../store/reducers/plants-reducer'

class AllPlants extends React.Component {
  componentDidMount() {
    this.props.getAllPlants()
  }

  render() {
    const plants = [
      {
        id: 1,
        name: 'Whomping Willow',
        price: 500,
        imageUrl: 'PLACEHOLDER',
        description: 'Broke Rons car'
      },
      {
        id: 2,
        name: 'Poison Ivy',
        price: 20,
        imageUrl: 'PLACEHOLDER',
        description: 'The remedy is aloe'
      }
    ]
    return (
      <div>
        <h1>Please Buy Our Plants! So we don't end up like SEARS :(</h1>
        {plants.map(plant => {
          return (
            <div key={plant.id}>
              {plant.name}
              {plant.price}
              {plant.imageUrl}
              {plant.description}
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
