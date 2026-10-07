import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, ChevronDown, MessageCircle, Music2, Send } from 'lucide-react'
import './Footer.css'

const customerServiceLinks = [
  { label: 'Contact Us', to: '/contact' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Shipping & Delivery', to: '/shipping' },
  { label: 'Returns & Refunds', to: '/returns' },
  { label: 'Order Help', to: '/order-help' },
  { label: 'Contact Support', to: '/contact' },
]

const shoppingLinks = [
  { label: 'Women', to: '/women' },
  { label: 'Men', to: '/men' },
  { label: 'Bags', to: '/bags' },
  { label: 'Footwear', to: '/footwear' },
  { label: 'New Arrivals', to: '/new-arrivals' },
  { label: 'Bestsellers', to: '/bestsellers' },
  { label: 'Sale', to: '/sale' },
]

const accountLinks = [
  { label: 'Login / Register', to: '/login' },
  { label: 'My Account', to: '/account' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Cart', to: '/cart' },
  { label: 'Order History', to: '/orders' },
  { label: 'Track Order', to: '/track-order' },
]

const infoLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Size Guide', to: '/size-guide' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Sitemap', to: '/sitemap' },
]

const socialLinks = [
  { label: 'Instagram', icon: Camera, href: 'https://instagram.com' },
  { label: 'Facebook', icon: MessageCircle, href: 'https://facebook.com' },
  { label: 'TikTok', icon: Music2, href: 'https://tiktok.com' },
  { label: 'X / Twitter', icon: Send, href: 'https://x.com' },
]

const footerSections = [
  { id: 'customer-service', title: 'Customer Service', links: customerServiceLinks },
  { id: 'shopping', title: 'Shopping', links: shoppingLinks },
  { id: 'my-account', title: 'My Account', links: accountLinks },
  { id: 'information', title: 'Information', links: infoLinks },
]

const FooterColumn = ({ title, links, isOpen, onToggle, columnId }) => (
  <div className={`footer-column ${isOpen ? 'is-open' : ''}`}>
    <div className='footer-column__header'>
      <h3>{title}</h3>
      <button
        type='button'
        className='footer-column__toggle'
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={columnId}
      >
        <ChevronDown size={16} />
      </button>
    </div>

    <nav className={`footer-column__links ${isOpen ? 'is-open' : ''}`} id={columnId} aria-label={title}>
      {links.map((link) => (
        <Link key={link.label} to={link.to} className='footer-link'>
          {link.label}
        </Link>
      ))}
    </nav>
  </div>
)

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedValue = email.trim()
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)

    if (!trimmedValue || !isValidEmail) {
      setStatus('error')
      return
    }

    setStatus('success')
    setEmail('')
  }

  return (
    <div className='newsletter'>
      <div className='newsletter__content'>
        <p className='eyebrow'>Stay connected</p>
        <h3>Stay in the loop</h3>
        <p>Get updates on new arrivals, exclusive offers and special collections.</p>
      </div>

      <form className='newsletter__form' onSubmit={handleSubmit} noValidate>
        <label htmlFor='newsletter-email' className='sr-only'>Email address</label>
        <input
          id='newsletter-email'
          type='email'
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
          placeholder='Enter your email'
          aria-invalid={status === 'error'}
          aria-describedby='newsletter-message'
        />
        <button type='submit'>Subscribe</button>
      </form>

      <div id='newsletter-message' className={`newsletter__message ${status}`} aria-live='polite'>
        {status === 'error' && 'Please enter a valid email address.'}
        {status === 'success' && 'Thanks for subscribing. We’ll keep you posted.'}
      </div>
    </div>
  )
}

const Footer = () => {
  const [openSection, setOpenSection] = useState('customer-service')

  const toggleSection = (sectionId) => {
    setOpenSection((current) => (current === sectionId ? '' : sectionId))
  }

  return (
    <footer className='site-footer'>
      <div className='container'>
        <Newsletter />

        <div className='footer-grid'>
          {footerSections.map((section) => (
            <FooterColumn
              key={section.id}
              title={section.title}
              links={section.links}
              columnId={section.id}
              isOpen={openSection === section.id}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </div>

        <div className='footer-bottom'>
          <div className='social-links' aria-label='Social media'>
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a key={label} href={href} target='_blank' rel='noreferrer' aria-label={label} className='social-link'>
                <Icon size={16} />
              </a>
            ))}
          </div>

          <div className='payment-block'>
            <span className='payment-label'>We Accept</span>
            <div className='payment-list'>
              <span className='payment-badge'>Visa</span>
              <span className='payment-badge'>Mastercard</span>
              <span className='payment-badge'>Verve</span>
            </div>
          </div>
        </div>

        <div className='legal-bar'>
          <p>© 2026 Wrence Store. All rights reserved.</p>
          <div className='legal-links'>
            <Link to='/privacy'>Privacy Policy</Link>
            <Link to='/terms'>Terms & Conditions</Link>
            <Link to='/returns'>Returns Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
