import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me} from '../store/user'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getUserInfo(userId)
  }

  render() {
    const {user} = this.props
    return (
      <div>
        <h3>Welcome, {user.email}</h3>
        <Link to="/plants">
          <button type="button">SHOP</button>
        </Link>
        <Link to={`/users/${user.id}/orders`}>
          <button type="button">ORDERS</button>
        </Link>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getUserInfo: userId => dispatch(me(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
