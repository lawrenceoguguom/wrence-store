import './QuickView.css'
import { X, Plus, Minus, Heart } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { formatCurrency } from '../../data/products'

const QuickView = ({ product, onClose }) => {
  const navigate = useNavigate()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const availableSizes = product.sizes || []
  const isSaved = isWishlisted(product.id)

  return (
    <div className='quick-view-backdrop' onClick={onClose}>
      <div className='quick-view-modal' onClick={(e) => e.stopPropagation()}>
        <button type='button' className='quick-view-close' onClick={onClose} aria-label='Close quick view'>
          <X size={18} />
        </button>

        <div className='quick-view-layout'>
          <div className='quick-view-image-wrap'>
            <img src={product.images[0]} alt={product.name} className='quick-view-image' />
          </div>

          <div className='quick-view-content'>
            <div className='quick-view-topline'>
              <span>{product.brand}</span>
              <span>{product.stock > 0 ? 'In Stock' : 'Out of stock'}</span>
            </div>

            <h2>{product.name}</h2>
            <p className='quick-view-price'>{formatCurrency(product.price)}</p>

            <div className='quick-view-section'>
              <h3>Colors</h3>
              <div className='option-row'>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type='button'
                    className={`option-chip ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {availableSizes.length > 0 && (
              <div className='quick-view-section'>
                <h3>Sizes</h3>
                <div className='option-row'>
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type='button'
                      className={`option-chip ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className='quick-view-section'>
              <h3>Quantity</h3>
              <div className='quantity-control'>
                <button type='button' onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label='Decrease quantity'>
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button type='button' onClick={() => setQuantity((q) => q + 1)} aria-label='Increase quantity'>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <p className='quick-view-description'>{product.description}</p>

            <div className='quick-view-actions'>
              <button type='button' className='primary-action' onClick={() => onClose?.()}>
                Add to Cart
              </button>
              <button
                type='button'
                className='secondary-action'
                onClick={() => {
                  onClose?.()
                  navigate(`/product/${product.id}`)
                }}
              >
                View Full Details
              </button>
              <button
                type='button'
                className={`icon-inline-action ${isSaved ? 'is-active' : ''}`}
                aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                aria-pressed={isSaved}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickView
