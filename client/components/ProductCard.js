import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {product} = props
  return (
    <div className="product-card">
      <Link to={`/plants/${product.id}`}>
        <h3>{product.name}</h3>
        <img src={product.imageUrl} />
        <h3>${(product.price / 100).toFixed(2)}</h3>
        <h5>{product.description}</h5>
      </Link>
    </div>
  )
}

export default ProductCard
