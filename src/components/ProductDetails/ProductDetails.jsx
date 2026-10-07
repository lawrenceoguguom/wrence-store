import { useParams } from 'react-router-dom'
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import './ProductDetails.css'
import { products, formatCurrency } from '../../data/products'

const ProductDetails = () => {
  const { productId } = useParams()
  const product = products.find((item) => item.id === productId)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '')
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <section className='product-details-page'>
        <div className='container'>
          <h1>Product not found</h1>
        </div>
      </section>
    )
  }

  return (
    <section className='product-details-page'>
      <div className='container'>
        <div className='product-details'>
          <div className='product-details__gallery'>
            <img src={product.images[0]} alt={product.name} className='main-image' />
            <div className='thumb-row'>
              {product.images.map((image, index) => (
                <img key={index} src={image} alt={`${product.name} ${index + 1}`} className='thumb' />
              ))}
            </div>
          </div>

          <div className='product-details__info'>
            <p className='product-details__brand'>{product.brand}</p>
            <h1>{product.name}</h1>
            <p className='product-details__price'>{formatCurrency(product.price)}</p>
            <p className='product-details__description'>{product.description}</p>

            <div className='selector-group'>
              <h3>Color</h3>
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

            {product.sizes?.length > 0 && (
              <div className='selector-group'>
                <h3>Size</h3>
                <div className='option-row'>
                  {product.sizes.map((size) => (
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

            <div className='selector-group'>
              <h3>Quantity</h3>
              <div className='quantity-control'>
                <button type='button' onClick={() => setQuantity((q) => Math.max(1, q - 1))}><Minus size={16} /></button>
                <span>{quantity}</span>
                <button type='button' onClick={() => setQuantity((q) => q + 1)}><Plus size={16} /></button>
              </div>
            </div>

            <div className='product-details__actions'>
              <button type='button' className='primary-action'>
                <ShoppingCart size={16} />
                Add to Cart
              </button>
              <button type='button' className='secondary-action'>
                <Heart size={16} />
                Wishlist
              </button>
            </div>

            <div className='product-details__info-block'>
              <h3>Product Information</h3>
              <ul>
                <li>Availability: {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</li>
                <li>Brand: {product.brand}</li>
                <li>Category: {product.category}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
