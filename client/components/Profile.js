import React from 'react'
import {getProfile} from '../store/profile'
import {connect} from 'react-redux'
import {ListGroup, ListGroupItem} from 'reactstrap'

class Profile extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.userId
    this.props.getProfile(id)
  }

  render() {
    const {profile} = this.props
    return (
      <div id="profile">
        <h3 id="profileHeader">Profile</h3>
        <ListGroup>
          <ListGroupItem color="primary">Name: {profile.name}</ListGroupItem>
          <ListGroupItem color="primary">Email: {profile.email}</ListGroupItem>
          <ListGroupItem color="primary">
            Address: {profile.houseNumber} {profile.street} {profile.city},{' '}
            {profile.state} {profile.zipCode}{' '}
          </ListGroupItem>
        </ListGroup>
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
