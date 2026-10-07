import './CategoryHeader.css'

const CategoryHeader = ({ title, description, count }) => {
  return (
    <div className='category-header'>
      <div>
        <p className='eyebrow'>Collection</p>
        <h1>{title}</h1>
      </div>
      <div className='category-header__meta'>
        <p>{description}</p>
        <span>{count} Items</span>
      </div>
    </div>
  )
}

export default CategoryHeader
