import { useMemo, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import ProductCard from './components/ProductCard/ProductCard'
import ProductDetails from './components/ProductDetails/ProductDetails'
import ProductListPage from './components/ProductListPage/ProductListPage'
import QuickView from './components/QuickView/QuickView'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Footer from './components/Footer/Footer'
import { WishlistProvider, useWishlist } from './context/WishlistContext'
import { products } from './data/products'
import InfoPage from './pages/InfoPage/InfoPage'
import Login from './pages/Login/Login'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import Registration from './pages/Registration/Registration'
import ReturnsPolicy from './pages/ReturnsPolicy/ReturnsPolicy'
import SearchPage from './pages/Search/SearchPage'
import TermsConditions from './pages/TermsConditions/TermsConditions'
import WishlistPage from './pages/Wishlist/WishlistPage'
import './App.css'

const collections = [
  {
    name: 'Women\'s Bags',
    description: 'Elegant carryalls for workdays, travel and polished everyday styling.',
    image: products[2].images[0],
    to: '/bags',
  },
  {
    name: 'Men\'s Bags',
    description: 'Practical silhouettes built to move with your routine.',
    image: products[3].images[0],
    to: '/bags',
  },
  {
    name: 'Footwear',
    description: 'Comfort-first essentials with elevated finishing touches.',
    image: products[0].images[0],
    to: '/footwear',
  },
  {
    name: 'New Arrivals',
    description: 'Fresh seasonal edits and new favourites for your wardrobe.',
    image: products[8].images[0],
    to: '/new-arrivals',
  },
  {
    name: 'Sale',
    description: 'Limited-time pieces selected to help you refresh your routine.',
    image: products[6].images[0],
    to: '/sale',
  },
]

const specialOffers = [
  {
    title: 'Weekend Edit',
    subtitle: 'Up to 40% off refined carryalls and everyday silhouettes.',
    cta: 'Shop the edit',
    image: products[1].images[0],
    to: '/sale',
  },
  {
    title: 'Travel Ready',
    subtitle: 'Built for movement with durable materials and clean utility details.',
    cta: 'Explore travel bags',
    image: products[7].images[0],
    to: '/bags',
  },
]

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { toggleWishlist, isWishlisted } = useWishlist()

  const hotDeals = useMemo(() => products.filter((product) => product.isSale).slice(0, 4), [])
  const featuredProducts = useMemo(() => products.filter((product) => product.isBestSeller).slice(0, 4), [])
  const newArrivals = useMemo(() => products.filter((product) => product.isNew).slice(0, 4), [])

  return (
    <section className='home-page'>
      <div className='section home-spotlight'>
        <div className='home-spotlight__content'>
          <p className='eyebrow'>Curated essentials</p>
          <h1>Modern footwear and carry-all design for everyday life.</h1>
          <p>
            Discover elevated staples for work, movement, and travel — built with premium details,
            effortless styling, and all-day comfort.
          </p>
        </div>
      </div>

      <section className='section section-surface'>
        <div className='section-heading'>
          <div>
            <p className='eyebrow'>Hot Deals — Selling Fast</p>
            <h2>Hot Deals — Selling Fast</h2>
          </div>
          <Link to='/sale' className='text-link'>View all offers</Link>
        </div>

        <div className='product-grid product-grid--four'>
          {hotDeals.map((product) => (
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
      </section>

      <section className='section section-surface section-surface--muted'>
        <div className='section-heading'>
          <div>
            <p className='eyebrow'>Featured selection</p>
            <h2>Featured Products</h2>
          </div>
          <Link to='/bestsellers' className='text-link'>Shop bestsellers</Link>
        </div>

        <div className='product-grid product-grid--four'>
          {featuredProducts.map((product) => (
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
      </section>

      <section className='section section-surface'>
        <div className='section-heading'>
          <div>
            <p className='eyebrow'>Shop by mood</p>
            <h2>Collections</h2>
          </div>
        </div>

        <div className='collection-grid'>
          {collections.map((collection) => (
            <Link key={collection.name} to={collection.to} className='collection-card'>
              <img src={collection.image} alt={collection.name} />
              <div className='collection-card__content'>
                <h3>{collection.name}</h3>
                <p>{collection.description}</p>
                <span className='collection-link'>View Collection</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className='section section-surface section-surface--muted'>
        <div className='section-heading'>
          <div>
            <p className='eyebrow'>Limited-time perks</p>
            <h2>Special Offers</h2>
          </div>
        </div>

        <div className='special-offers'>
          {specialOffers.map((offer) => (
            <div key={offer.title} className='special-offer'>
              <div className='special-offer__content'>
                <p className='eyebrow'>Exclusive</p>
                <h3>{offer.title}</h3>
                <p>{offer.subtitle}</p>
                <Link to={offer.to} className='primary-button'>{offer.cta}</Link>
              </div>
              <img src={offer.image} alt={offer.title} />
            </div>
          ))}
        </div>
      </section>

      <section className='section section-surface'>
        <div className='section-heading'>
          <div>
            <p className='eyebrow'>Fresh arrivals</p>
            <h2>New Arrivals</h2>
          </div>
          <Link to='/new-arrivals' className='text-link'>View all</Link>
        </div>

        <div className='product-grid product-grid--four'>
          {newArrivals.map((product) => (
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
      </section>

      <section className='section home-footer-strip'>
        <div className='home-footer-strip__item'>
          <strong>Free shipping</strong>
          <span>Orders over $100</span>
        </div>
        <div className='home-footer-strip__item'>
          <strong>Easy returns</strong>
          <span>30-day exchange</span>
        </div>
        <div className='home-footer-strip__item'>
          <strong>Secure checkout</strong>
          <span>Protected payments</span>
        </div>
      </section>

      {selectedProduct && <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  )
}

const App = () => {
  const location = useLocation()
  const showHero = location.pathname === '/'

  const footerInfoRoutes = [
    { path: '/contact', title: 'Contact Us', description: 'Our support team is here to answer product questions, shipping enquiries, and purchase help.', eyebrow: 'Customer service', details: [{ title: 'Need help?', text: 'Reach out to our concierge team and we will guide you through your order or product question.' }] },
    { path: '/faq', title: 'FAQs', description: 'Find quick answers to the most common questions about shipping, delivery, sizing, and order support.', eyebrow: 'Help centre', details: [{ title: 'Common questions', text: 'Most shoppers ask about delivery times, returns, sizing, and care instructions before checkout.' }] },
    { path: '/shipping', title: 'Shipping & Delivery', description: 'We offer reliable delivery to cities and towns across the country with clear shipping timelines and order tracking.', eyebrow: 'Shipping', details: [{ title: 'Delivery information', text: 'Standard and express shipping options are available for most orders, with tracking sent after purchase confirmation.' }] },
    { path: '/order-help', title: 'Order Help', description: 'Need support with a purchase, delivery status, or changes to your order? We can help.', eyebrow: 'Orders', details: [{ title: 'Order support', text: 'Track updates, manage delivery questions, and review the status of your recent purchases with our help team.' }] },
    { path: '/account', title: 'My Account', description: 'Access your saved details, recent orders, wishlist and account preferences in one secure place.', eyebrow: 'My account', details: [{ title: 'Account overview', text: 'Your account dashboard keeps your information, saved favourites, and order history organised in one place.' }] },
    { path: '/cart', title: 'Shopping Cart', description: 'Review the items you have selected and continue to a secure checkout when you are ready.', eyebrow: 'Cart', details: [{ title: 'Your bag', text: 'Your selected items are saved here while you continue shopping, track delivery preferences and checkout with ease.' }] },
    { path: '/orders', title: 'Order History', description: 'Review your recent purchases, delivery milestones, and past transactions from one secure area.', eyebrow: 'Orders', details: [{ title: 'Recent orders', text: 'Use this area to revisit your order history, check receipt details, and keep track of delivery progress.' }] },
    { path: '/track-order', title: 'Track Order', description: 'Use your order confirmation to follow the progress of your purchase from dispatch to delivery.', eyebrow: 'Tracking', details: [{ title: 'Live delivery updates', text: 'Track status updates, estimate arrival windows, and keep an eye on your order as it moves through fulfilment.' }] },
    { path: '/about', title: 'About Us', description: 'Wrence Store brings together refined essentials, everyday comfort, and premium craftsmanship for modern living.', eyebrow: 'Our brand', details: [{ title: 'Who we are', text: 'We design and curate considered essentials for the way people move through work, travel, and everyday routines.' }] },
    { path: '/our-story', title: 'Our Story', description: 'Discover the inspiration and values behind our curated collection of footwear and carry essentials.', eyebrow: 'Brand story', details: [{ title: 'Built for real life', text: 'From daily essentials to elevated staples, each piece is selected to blend practical use with style and lasting quality.' }] },
    { path: '/size-guide', title: 'Size Guide', description: 'Find the right fit for footwear and accessories with our quick guide to sizing and fit recommendations.', eyebrow: 'Fit & sizing', details: [{ title: 'Helpful fit notes', text: 'Use this guide to compare sizing, find your ideal fit, and shop with more confidence before you order.' }] },
    { path: '/sitemap', title: 'Sitemap', description: 'Browse the key sections, products, and support pages of the store from one simple overview.', eyebrow: 'Explore', details: [{ title: 'Store navigation', text: 'Use this page as a quick guide to the best places to explore the collection, account details, and support information.' }] },
  ]

  return (
    <WishlistProvider>
      <ScrollToTop />
      <div className='app'>
        <Header />
        {showHero && <Hero />}
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/wishlist' element={<WishlistPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/privacy' element={<PrivacyPolicy />} />
            <Route path='/terms' element={<TermsConditions />} />
            <Route path='/returns' element={<ReturnsPolicy />} />
            <Route path='/product/:productId' element={<ProductDetails />} />
            {footerInfoRoutes.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={<InfoPage title={page.title} description={page.description} eyebrow={page.eyebrow} details={page.details} />}
              />
            ))}
            <Route path='/:categorySlug' element={<ProductListPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </WishlistProvider>
  )
}

export default App
