import React from 'react'
import {Link} from 'react-router-dom'
import {
  Card,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  CardBody,
  Col
} from 'reactstrap'

const ProductCard = props => {
  const {product} = props
  return (
    <Col sm="4">
      <Link to={`/plants/${product.id}`}>
        <Card>
          <CardImg width="20%" src={product.imageUrl} className="card-image" />
          <CardBody className="text-center">
            <CardTitle>{product.name}</CardTitle>
            <CardSubtitle>${(product.price / 100).toFixed(2)}</CardSubtitle>
            <CardText>{product.description}</CardText>
          </CardBody>
        </Card>
      </Link>
    </Col>
  )
}

export default ProductCard
