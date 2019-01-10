import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div id="homepage">
      <h1>WELCOME TO IHOP! WE'RE THE INTERNATIONAL HOUSE OF PLANTS</h1>
      <Link to="/plants">
        <button type="button" className="homepage=shop">
          SHOP
        </button>
      </Link>
    </div>
  )
}

export default Home
