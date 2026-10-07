import { Eye, Heart, ShoppingCart } from 'lucide-react'
import './ProductCard.css'
import { formatCurrency } from '../../data/products'

const ProductCard = ({ product, isWishlisted = false, onQuickView, onWishlist, onAddToCart }) => {
  const originalPrice = product.originalPrice || (product.isSale ? Math.round(product.price * 1.35) : null)
  const discount = product.isSale ? Math.max(10, Math.round(((originalPrice - product.price) / originalPrice) * 100)) : null

  const handleWishlistToggle = () => {
    if (onWishlist) {
      onWishlist(product.id)
    }
  }

  return (
    <article className='product-card'>
      <div className='product-card__image-wrap'>
        <img src={product.images[0]} alt={product.name} className='product-card__image' />

        <div className='product-card__badges'>
          {product.isNew && <span className='badge badge--new'>New</span>}
          {product.isBestSeller && <span className='badge badge--popular'>Bestseller</span>}
          {product.isSale && <span className='badge badge--sale'>-{discount}%</span>}
        </div>

        <button
          type='button'
          className={`wishlist-button ${isWishlisted ? 'is-active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className='product-card__content'>
        <div className='product-card__meta'>
          <span>{product.brand}</span>
          <span>{product.colors.length} colors</span>
        </div>

        <h3>{product.name}</h3>

        <div className='product-card__price-row'>
          <span className='product-card__price'>{formatCurrency(product.price)}</span>
          {originalPrice && <span className='product-card__price product-card__price--old'>{formatCurrency(originalPrice)}</span>}
        </div>

        <p className='product-card__info'>
          {product.stock > 0 ? `${product.stock} items left` : 'Sold out'}
          {product.isSale && ' · Limited offer'}
        </p>

        <div className='product-card__actions'>
          <button type='button' className='quick-view-btn' onClick={() => onQuickView(product)}>
            <Eye size={15} />
            Quick View
          </button>

          <button type='button' className='cart-btn' onClick={() => onAddToCart?.(product)}>
            <ShoppingCart size={15} />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
