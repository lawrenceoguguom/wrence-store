import ProductCard from '../ProductCard/ProductCard'
import './ProductGrid.css'

const ProductGrid = ({ products, onQuickView, onWishlist, isWishlisted, onAddToCart }) => {
  return (
    <div className='product-grid'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={isWishlisted ? isWishlisted(product.id) : false}
          onQuickView={onQuickView}
          onWishlist={onWishlist}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductGrid
