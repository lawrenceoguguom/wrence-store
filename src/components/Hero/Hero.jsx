import './Hero.css'
import { Link } from 'react-router-dom'
import heroimage from '../../assets/disocunt.jpg'

const Hero = () => {
  return (
    <div className="hero">
      <Link to="/products" className="hero-link">
        <img src={heroimage} alt="70% discount" className="hero-img" />
      </Link>

      <div className="shop">
        <h3>Add-to-closest-ASAP <br />
          for so much less.
        </h3>
        <Link to="/products" className="shop-link">Shop Now</Link>
      </div>
    </div>
  )
}

export default Hero