import './ProductFilters.css'

const ProductFilters = ({ filters, onChange, categories, brands, colors, sizes }) => {
  const handleFilterChange = (key, value) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <aside className='product-filters'>
      <div className='filter-group'>
        <label htmlFor='category'>Category</label>
        <select id='category' value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
          <option value='all'>All</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className='filter-group'>
        <label htmlFor='price'>Price</label>
        <select id='price' value={filters.priceRange} onChange={(e) => handleFilterChange('priceRange', e.target.value)}>
          <option value='all'>Any price</option>
          <option value='0-100'>Under $100</option>
          <option value='100-200'>$100 - $200</option>
          <option value='200-300'>$200 - $300</option>
          <option value='300-max'>$300+</option>
        </select>
      </div>

      <div className='filter-group'>
        <label htmlFor='color'>Color</label>
        <select id='color' value={filters.color} onChange={(e) => handleFilterChange('color', e.target.value)}>
          <option value='all'>All colors</option>
          {colors.map((color) => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </div>

      {sizes.length > 0 && (
        <div className='filter-group'>
          <label htmlFor='size'>Size</label>
          <select id='size' value={filters.size} onChange={(e) => handleFilterChange('size', e.target.value)}>
            <option value='all'>All sizes</option>
            {sizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}

      <div className='filter-group'>
        <label htmlFor='availability'>Availability</label>
        <select id='availability' value={filters.availability} onChange={(e) => handleFilterChange('availability', e.target.value)}>
          <option value='all'>All items</option>
          <option value='in-stock'>In stock</option>
          <option value='low-stock'>Low stock</option>
        </select>
      </div>

      {brands.length > 0 && (
        <div className='filter-group'>
          <label htmlFor='brand'>Brand</label>
          <select id='brand' value={filters.brand} onChange={(e) => handleFilterChange('brand', e.target.value)}>
            <option value='all'>All brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      )}
    </aside>
  )
}

export default ProductFilters
