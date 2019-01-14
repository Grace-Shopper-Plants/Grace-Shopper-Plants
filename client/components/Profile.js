import React from 'react'
import {getProfile} from '../store/profile'
import {connect} from 'react-redux'
//import {Container, Row} from 'reactstrap'

class Profile extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.userId
    this.props.getProfile(id)
  }

  render() {
    const {profile} = this.props
    return (
      <div id="profile">
        <h1 id="profileHeader">Profile</h1>
        <p id="profileName">Name: {profile.name}</p>
        <p id="profileEmail">Email: {profile.email}</p>
        <p id="profileAddress">
          Address:
          {profile.houseNumber} {profile.street}
          {profile.city} {profile.state} {profile.zipCode}
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProfile: id => dispatch(getProfile(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
