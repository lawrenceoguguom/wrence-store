import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../../components/ProductCard/ProductCard'
import QuickView from '../../components/QuickView/QuickView'
import { products } from '../../data/products'
import { useWishlist } from '../../context/WishlistContext'
import './SearchPage.css'

const suggestions = ['New Arrivals', 'Bestsellers', 'Bags', 'Footwear', 'Sale']

const SearchPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: 'all',
    price: 'all',
    color: 'all',
    size: 'all',
    availability: 'all',
  })

  const queryFromUrl = searchParams.get('q') || ''
  const [query, setQuery] = useState(queryFromUrl)

  useEffect(() => {
    setQuery(queryFromUrl)
  }, [queryFromUrl])

  useEffect(() => {
    inputRef.current?.focus()
  }, [location.pathname])

  const categories = ['all', 'bags', 'footwear', 'women', 'men', 'sale']
  const colors = Array.from(new Set(products.flatMap((product) => product.colors)))
  const sizes = Array.from(new Set(products.flatMap((product) => product.sizes || [])))

  const filteredProducts = useMemo(() => {
    const searchValue = query.trim().toLowerCase()

    return products.filter((product) => {
      const categoryMatch =
        filters.category === 'all' ||
        (filters.category === 'women' && (product.gender === 'women' || product.gender === 'unisex')) ||
        (filters.category === 'men' && (product.gender === 'men' || product.gender === 'unisex')) ||
        product.category === filters.category

      const priceMatch = (() => {
        if (filters.price === 'all') return true
        if (filters.price === 'under-100') return product.price < 100
        if (filters.price === '100-200') return product.price >= 100 && product.price <= 200
        if (filters.price === '200-300') return product.price > 200 && product.price <= 300
        if (filters.price === '300-plus') return product.price > 300
        return true
      })()

      const colorMatch = filters.color === 'all' || product.colors.includes(filters.color)
      const sizeMatch = filters.size === 'all' || !product.sizes || product.sizes.includes(filters.size)
      const availabilityMatch =
        filters.availability === 'all' ||
        (filters.availability === 'in-stock' && product.stock > 0) ||
        (filters.availability === 'low-stock' && product.stock > 0 && product.stock <= 10)

      const matchesSearch = !searchValue
        ? true
        : [
            product.name,
            product.brand,
            product.category,
            product.description,
            product.gender,
            product.colors.join(' '),
            product.sizes?.join(' ') || '',
          ]
            .join(' ')
            .toLowerCase()
            .includes(searchValue)

      return categoryMatch && priceMatch && colorMatch && sizeMatch && availabilityMatch && matchesSearch
    })
  }, [query, filters])

  const handleQueryChange = (value) => {
    setQuery(value)

    if (value.trim()) {
      setSearchParams({ q: value.trim() })
      return
    }

    setSearchParams({})
  }

  const clearFilters = () => {
    setFilters({ category: 'all', price: 'all', color: 'all', size: 'all', availability: 'all' })
    setQuery('')
    setSearchParams({})
  }

  const hasSearchTerm = query.trim().length > 0

  return (
    <section className='search-page'>
      <div className='container'>
        <div className='search-page__header'>
          <div>
            <p className='eyebrow'>Search</p>
            <h1>Find what you love</h1>
          </div>
        </div>

        <div className='search-bar-wrap'>
          <div className='search-input-shell'>
            <Search size={18} className='search-icon' />
            <input
              ref={inputRef}
              type='text'
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder='Search shoes, bags, brands and more...'
              aria-label='Search products'
            />
            {query && (
              <button type='button' className='clear-search' onClick={() => handleQueryChange('')} aria-label='Clear search'>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {!hasSearchTerm ? (
          <div className='search-landing'>
            <div className='search-landing__panel'>
              <p className='eyebrow'>Popular searches</p>
              <div className='suggestion-list'>
                {suggestions.map((item) => (
                  <button key={item} type='button' className='suggestion-chip' onClick={() => handleQueryChange(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className='search-layout'>
          <aside className={`search-filters ${mobileFiltersOpen ? 'is-open' : ''}`}>
            <div className='search-filters__heading'>
              <h3>Filters</h3>
              <button type='button' className='text-button' onClick={clearFilters}>Clear all</button>
            </div>

            <div className='filter-group'>
              <label htmlFor='search-category'>Category</label>
              <select id='search-category' value={filters.category} onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}>
                <option value='all'>All</option>
                {categories.filter((category) => category !== 'all').map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className='filter-group'>
              <label htmlFor='search-price'>Price</label>
              <select id='search-price' value={filters.price} onChange={(event) => setFilters((current) => ({ ...current, price: event.target.value }))}>
                <option value='all'>Any price</option>
                <option value='under-100'>Under $100</option>
                <option value='100-200'>$100 - $200</option>
                <option value='200-300'>$200 - $300</option>
                <option value='300-plus'>$300+</option>
              </select>
            </div>

            <div className='filter-group'>
              <label htmlFor='search-color'>Color</label>
              <select id='search-color' value={filters.color} onChange={(event) => setFilters((current) => ({ ...current, color: event.target.value }))}>
                <option value='all'>All colors</option>
                {colors.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            {sizes.length > 0 && (
              <div className='filter-group'>
                <label htmlFor='search-size'>Size</label>
                <select id='search-size' value={filters.size} onChange={(event) => setFilters((current) => ({ ...current, size: event.target.value }))}>
                  <option value='all'>All sizes</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}

            <div className='filter-group'>
              <label htmlFor='search-availability'>Availability</label>
              <select id='search-availability' value={filters.availability} onChange={(event) => setFilters((current) => ({ ...current, availability: event.target.value }))}>
                <option value='all'>All items</option>
                <option value='in-stock'>In stock</option>
                <option value='low-stock'>Low stock</option>
              </select>
            </div>
          </aside>

          <div className='search-results'>
            <div className='search-results__toolbar'>
              <div className='search-results__summary'>
                {hasSearchTerm ? (
                  filteredProducts.length > 0 ? (
                    <span>{filteredProducts.length} results for “{query}”</span>
                  ) : (
                    <span>No products found for “{query}”</span>
                  )
                ) : (
                  <span>{filteredProducts.length} products ready to browse</span>
                )}
              </div>

              <div className='search-results__actions'>
                <button type='button' className='filter-toggle' onClick={() => setMobileFiltersOpen((current) => !current)}>
                  <SlidersHorizontal size={15} />
                  Filters
                </button>
                <select defaultValue='featured'>
                  <option value='featured'>Featured</option>
                  <option value='price-low'>Price: low to high</option>
                  <option value='price-high'>Price: high to low</option>
                </select>
              </div>
            </div>

            {hasSearchTerm && filteredProducts.length === 0 ? (
              <div className='empty-state'>
                <div className='empty-state__icon'>
                  <Search size={30} />
                </div>
                <h3>No products found for “{query}”</h3>
                <p>Try another keyword or adjust your filters to explore more styles.</p>
                <div className='empty-state__actions'>
                  <button type='button' className='primary-button' onClick={clearFilters}>Clear Search</button>
                  <Link to='/' className='secondary-button'>Continue Shopping</Link>
                </div>
              </div>
            ) : (
              <div className='product-grid product-grid--four'>
                {filteredProducts.map((product) => (
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
        </div>
      </div>

      {selectedProduct && <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  )
}

export default SearchPage
