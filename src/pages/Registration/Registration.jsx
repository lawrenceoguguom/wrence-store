import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Registration.css'

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <section className='auth-page'>
      <div className='auth-card auth-card--register'>
        <div className='auth-card__visual'>
          <div className='auth-card__badge'>New here?</div>
          <h2>Create your account.</h2>
          <p>
            Unlock early access to new arrivals, styling edits, and a smoother checkout experience.
          </p>
          <ul>
            <li>Exclusive launch alerts</li>
            <li>Saved wishlist and cart</li>
            <li>Priority support</li>
          </ul>
        </div>

        <div className='auth-card__form'>
          <div className='auth-brand'>
            <span className='auth-brand__mark'>W</span>
            <span>Wrence Store</span>
          </div>

          <div className='auth-header'>
            <p className='eyebrow'>Create account</p>
            <h1>Sign up</h1>
          </div>

          <form className='auth-form'>
            <div className='auth-grid'>
              <label className='auth-field'>
                <span>First name</span>
                <input type='text' placeholder='First name' />
              </label>

              <label className='auth-field'>
                <span>Last name</span>
                <input type='text' placeholder='Last name' />
              </label>
            </div>

            <label className='auth-field'>
              <span>Email address</span>
              <input type='email' placeholder='you@example.com' />
            </label>

            <label className='auth-field'>
              <span>Password</span>
              <div className='password-field'>
                <input type={showPassword ? 'text' : 'password'} placeholder='Create password' />
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

            <label className='auth-field'>
              <span>Confirm password</span>
              <div className='password-field'>
                <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm password' />
                <button
                  type='button'
                  className='password-toggle'
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <label className='checkbox-row checkbox-row--full'>
              <input type='checkbox' />
              <span>I agree to the terms and privacy policy</span>
            </label>

            <button type='submit' className='auth-button'>Create account</button>
          </form>

          <p className='auth-footer'>
            Already a member? <Link to='/login'>Log in</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Registration
