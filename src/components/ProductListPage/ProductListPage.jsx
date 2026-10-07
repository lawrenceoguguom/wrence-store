import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import CategoryHeader from '../CategoryHeader/CategoryHeader'
import ProductFilters from '../ProductFilters/ProductFilters'
import ProductGrid from '../ProductGrid/ProductGrid'
import QuickView from '../QuickView/QuickView'
import { useWishlist } from '../../context/WishlistContext'
import { categoryMeta, products } from '../../data/products'
import './ProductListPage.css'

const initialFilters = {
  category: 'all',
  priceRange: 'all',
  color: 'all',
  size: 'all',
  availability: 'all',
  brand: 'all',
}

const ProductListPage = () => {
  const { categorySlug } = useParams()
  const meta = categoryMeta[categorySlug] || categoryMeta['new-arrivals']
  const { toggleWishlist, isWishlisted } = useWishlist()

  const [filters, setFilters] = useState(initialFilters)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const categories = ['all', 'bags', 'footwear', 'women', 'men', 'sale']
  const allColors = Array.from(new Set(products.flatMap((product) => product.colors)))
  const allBrands = Array.from(new Set(products.map((product) => product.brand)))
  const allSizes = Array.from(new Set(products.flatMap((product) => product.sizes || [])))

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        categorySlug === 'new-arrivals'
          ? product.isNew
          : categorySlug === 'bestsellers'
            ? product.isBestSeller
            : categorySlug === 'gift-cards'
              ? true
              : categorySlug === 'sale'
                ? product.isSale
                : categorySlug === 'women'
                  ? product.gender === 'women' || product.gender === 'unisex'
                  : categorySlug === 'men'
                    ? product.gender === 'men' || product.gender === 'unisex'
                    : categorySlug === 'bags'
                      ? product.category === 'bags'
                      : categorySlug === 'footwear'
                        ? product.category === 'footwear'
                        : true

      const matchesCategoryFilter =
        filters.category === 'all' || product.category === filters.category

      const matchesPrice = (() => {
        if (filters.priceRange === 'all') return true
        const [min, max] = filters.priceRange.split('-').map(Number)
        if (filters.priceRange === '300-max') return product.price >= 300
        return product.price >= min && product.price <= max
      })()

      const matchesColor = filters.color === 'all' || product.colors.includes(filters.color)
      const matchesSize =
        filters.size === 'all' || !product.sizes || product.sizes.includes(filters.size)
      const matchesAvailability =
        filters.availability === 'all' ||
        (filters.availability === 'in-stock' && product.stock > 10) ||
        (filters.availability === 'low-stock' && product.stock <= 10)
      const matchesBrand = filters.brand === 'all' || product.brand === filters.brand

      return (
        matchesCategory &&
        matchesCategoryFilter &&
        matchesPrice &&
        matchesColor &&
        matchesSize &&
        matchesAvailability &&
        matchesBrand
      )
    })
  }, [categorySlug, filters])

  const handleQuickView = (product) => setSelectedProduct(product)

  return (
    <section className='category-page'>
      <div className='container'>
        <CategoryHeader title={meta.title} description={meta.description} count={filteredProducts.length} />

        <div className='category-layout'>
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            categories={categories}
            brands={allBrands}
            colors={allColors}
            sizes={allSizes}
          />

          <div className='category-content'>
            <div className='toolbar'>
              <div className='toolbar__left'>
                <span>Showing {filteredProducts.length} products</span>
              </div>
              <div className='toolbar__right'>
                <label htmlFor='sort'>Sort by</label>
                <select id='sort' defaultValue='featured'>
                  <option value='featured'>Featured</option>
                  <option value='price-low'>Price: low to high</option>
                  <option value='price-high'>Price: high to low</option>
                  <option value='new'>Newest</option>
                </select>
              </div>
            </div>

            <ProductGrid
              products={filteredProducts}
              onQuickView={handleQuickView}
              onWishlist={toggleWishlist}
              isWishlisted={isWishlisted}
              onAddToCart={(product) => console.log('Added to cart:', product.name)}
            />
          </div>
        </div>
      </div>

      {selectedProduct && <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  )
}

export default ProductListPage
