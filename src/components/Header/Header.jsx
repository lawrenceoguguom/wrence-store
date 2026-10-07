import './Header.css'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, CircleHelp, Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'

const navItems = [
  {
    label: 'Shop',
    items: [
      { label: 'New Arrivals', to: '/new-arrivals' },
      { label: 'Bestsellers', to: '/bestsellers' },
      { label: 'Gift Cards', to: '/gift-cards' },
      { label: 'Sale Picks', to: '/sale' },
    ],
  },
  {
    label: 'Women',
    items: [
      { label: 'Women Edit', to: '/women' },
      { label: 'Accessories', to: '/women' },
      { label: 'Luxury Edit', to: '/women' },
      { label: 'Occasion Wear', to: '/women' },
    ],
  },
  {
    label: 'Men',
    items: [
      { label: 'Men Edit', to: '/men' },
      { label: 'Footwear', to: '/footwear' },
      { label: 'Essentials', to: '/men' },
      { label: 'Accessories', to: '/men' },
    ],
  },
  {
    label: 'Bags',
    items: [
      { label: 'Totes', to: '/bags' },
      { label: 'Crossbody', to: '/bags' },
      { label: 'Backpacks', to: '/bags' },
      { label: 'Travel', to: '/bags' },
    ],
  },
  {
    label: 'Footwear',
    items: [
      { label: 'Sneakers', to: '/footwear' },
      { label: 'Boots', to: '/footwear' },
      { label: 'Heels', to: '/women' },
      { label: 'Formal', to: '/men' },
    ],
  },
]

const utilityLinks = [
  { label: 'Search', icon: Search, to: '/search' },
  { label: 'Wishlist', icon: Heart, to: '/wishlist' },
  { label: 'Account', icon: User, to: '/login' },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navRef = useRef(null)
  const { wishlistCount } = useWishlist()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = (label) => {
    setActiveDropdown((current) => (current === label ? null : label))
  }

  return (
    <header className='header-shell'>
      <div className='topbar'>
        <div className='topbar-inner'>
          <Link to='/' className='promo-link' onClick={() => setActiveDropdown(null)}>
            Spend $100+ to unlock free shipping. <span>See details</span>
          </Link>

          <div className='topbar-meta'>
            <span>+1 (706) 991-8965</span>
            <span>Mon–Fri · 6AM–6PM PST</span>
            <span>Live chat</span>
          </div>

          <div className='topbar-actions'>
            <button type='button' className='currency-button'>USD</button>
            <button type='button' className='currency-button'>English</button>
            <Link to='/help' className='icon-button' aria-label='Help' onClick={() => setActiveDropdown(null)}>
              <CircleHelp size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className='header'>
        <div className='header-inner'>
          <div className='mobile-brand-row'>
            <Link to='/' className='logo' aria-label='Wrence Store home' onClick={() => setActiveDropdown(null)}>
              <span className='logo-mark'>W</span>
              <span className='logo-text'>Wrence-Store</span>
            </Link>

            <button
              type='button'
              className='mobile-menu-toggle'
              aria-label='Toggle navigation menu'
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav ref={navRef} className={`navbar ${menuOpen ? 'is-open' : ''}`} aria-label='Main navigation'>
            {navItems.map((item) => {
              const isOpen = activeDropdown === item.label

              return (
                <div
                  key={item.label}
                  className={`nav-item ${isOpen ? 'is-open' : ''}`}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => {
                    setActiveDropdown((current) => (current === item.label ? null : current))
                  }}
                >
                  <button
                    type='button'
                    className={`nav-button ${isOpen ? 'active' : ''}`}
                    onClick={() => toggleDropdown(item.label)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={14} className={`chevron ${isOpen ? 'rotated' : ''}`} />
                  </button>

                  <div className={`dropdown-panel ${isOpen ? 'open' : ''}`}>
                    <div className='dropdown-grid'>
                      {item.items.map((entry) => (
                        <Link
                          key={entry.label}
                          to={entry.to}
                          className='dropdown-item'
                          onClick={() => {
                            setActiveDropdown(null)
                            setMenuOpen(false)
                          }}
                        >
                          <span className='dropdown-badge'>Page</span>
                          <strong>{entry.label}</strong>
                          <small>Browse collection</small>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </nav>

          <div className='header-actions'>
            {utilityLinks.map(({ label, icon: Icon, to }) => (
              <Link key={label} to={to} className='action-link' onClick={() => setActiveDropdown(null)}>
                <Icon size={16} />
                <span>{label}</span>
                {label === 'Wishlist' && wishlistCount > 0 ? <span className='cart-count'>{wishlistCount}</span> : null}
              </Link>
            ))}

            <Link to='/cart' className='cart-link' onClick={() => setActiveDropdown(null)}>
              <ShoppingCart size={16} />
              <span>Cart</span>
              <span className='cart-count'>0</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
