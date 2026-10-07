import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section className='auth-page'>
      <div className='auth-card'>
        <div className='auth-card__visual'>
          <div className='auth-card__badge'>Wrence Store</div>
          <h2>Welcome back.</h2>
          <p>
            Track orders, save favorites, and access exclusive offers designed for your next upgrade.
          </p>
          <ul>
            <li>Fast checkout</li>
            <li>Saved wishlist</li>
            <li>Member-only drops</li>
          </ul>
        </div>

        <div className='auth-card__form'>
          <div className='auth-brand'>
            <span className='auth-brand__mark'>W</span>
            <span>Wrence Store</span>
          </div>

          <div className='auth-header'>
            <p className='eyebrow'>Account access</p>
            <h1>Log in</h1>
          </div>

          <form className='auth-form'>
            <label className='auth-field'>
              <span>Email address</span>
              <input type='email' placeholder='you@example.com' />
            </label>

            <label className='auth-field'>
              <span>Password</span>
              <div className='password-field'>
                <input type={showPassword ? 'text' : 'password'} placeholder='Enter your password' />
                <button
                  type='button'
                  className='password-toggle'
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className='auth-row'>
              <label className='checkbox-row'>
                <input type='checkbox' />
                <span>Remember me</span>
              </label>
              <Link to='/reset-password'>Forgot password?</Link>
            </div>

            <button type='submit' className='auth-button'>Sign in</button>
          </form>

          <p className='auth-footer'>
            New to Wrence Store? <Link to='/register'>Create an account</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
