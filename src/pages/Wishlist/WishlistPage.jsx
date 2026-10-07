import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import ProductCard from '../../components/ProductCard/ProductCard'
import QuickView from '../../components/QuickView/QuickView'
import { products } from '../../data/products'
import { useWishlist } from '../../context/WishlistContext'
import './WishlistPage.css'

const WishlistPage = () => {
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist()
  const [selectedProduct, setSelectedProduct] = useState(null)

  const savedProducts = products.filter((product) => wishlist.includes(product.id))

  return (
    <section className='wishlist-page'>
      <div className='container'>
        <div className='wishlist-page__header'>
          <div>
            <p className='eyebrow'>Saved items</p>
            <h1>My Wishlist</h1>
          </div>
          <span className='wishlist-count'>{savedProducts.length} item{savedProducts.length === 1 ? '' : 's'}</span>
        </div>

        {savedProducts.length === 0 ? (
          <div className='empty-state empty-state--wishlist'>
            <div className='empty-state__icon'>
              <Heart size={28} />
            </div>
            <h3>Your Wishlist is Empty</h3>
            <p>Start saving pieces you love and revisit them anytime.</p>
            <div className='empty-state__actions'>
              <Link to='/' className='primary-button'>Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div className='product-grid product-grid--four'>
            {savedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={isWishlisted(product.id)}
                onWishlist={toggleWishlist}
                onQuickView={setSelectedProduct}
                onAddToCart={(item) => console.log('Added to cart:', item.name)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  )
}

export default WishlistPage
