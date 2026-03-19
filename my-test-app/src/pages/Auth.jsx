import { useState, useRef, useEffect } from 'react'
import '../App.css'
import Nav from '../Components/nav';
import Footer from '../Components/footer';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const googleButtonRef = useRef(null)
  const googleButtonSignupRef = useRef(null)

  useEffect(() => {
    const handleGoogleSignIn = (response) => {
      console.log('Google Sign-In:', response)
      setSuccessMessage('Successfully signed in with Google!')
      setErrors({})
    }

    const initializeGoogleSignIn = () => {
      if (googleButtonRef.current && window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
          callback: handleGoogleSignIn
        })
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
          width: '100%'
        })
      }

      if (googleButtonSignupRef.current && window.google) {
        window.google.accounts.id.renderButton(googleButtonSignupRef.current, {
          theme: 'outline',
          size: 'large',
          width: '100%'
        })
      }
    }

    // Load Google Sign-In script
    if (window.google) {
      initializeGoogleSignIn()
    } else {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = initializeGoogleSignIn
      document.head.appendChild(script)
    }
  }, [])

  const handleMetaSignIn = async () => {
    try {
      if (!window.FB) {
        console.error('Facebook SDK not loaded')
        return
      }
      
      window.FB.login((response) => {
        if (response.authResponse) {
          console.log('Facebook Sign-In:', response)
          setSuccessMessage('Successfully signed in with Facebook!')
          setErrors({})
        }
      }, { scope: 'public_profile,email' })
    } catch (error) {
      console.error('Facebook login error:', error)
      setErrors({ facebook: 'Facebook login failed' })
    }
  }

  const validateLoginForm = () => {
    const newErrors = {}
    
    if (!loginData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) newErrors.email = 'Email is invalid'
    
    if (!loginData.password) newErrors.password = 'Password is required'
    else if (loginData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    
    return newErrors
  }

  const validateSignupForm = () => {
    const newErrors = {}
    
    if (!signupData.fullName) newErrors.fullName = 'Full name is required'
    
    if (!signupData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(signupData.email)) newErrors.email = 'Email is invalid'
    
    if (!signupData.password) newErrors.password = 'Password is required'
    else if (signupData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    
    if (!signupData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
    else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    return newErrors
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    
    const newErrors = validateLoginForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setErrors({})
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      setSuccessMessage('Login successful!')
      console.log('Login response:', data)
      
      // Redirect or store auth token
      // localStorage.setItem('authToken', data.token)
      
    } catch (error) {
      setErrors({ form: error.message || 'Login failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    
    const newErrors = validateSignupForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setErrors({})
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: signupData.fullName,
          email: signupData.email,
          password: signupData.password
        })
      })

      if (!response.ok) {
        throw new Error('Signup failed')
      }

      const data = await response.json()
      setSuccessMessage('Account created successfully! You can now log in.')
      console.log('Signup response:', data)
      
      // Reset form
      setSignupData({ fullName: '', email: '', password: '', confirmPassword: '' })
      setIsLogin(true)
      
    } catch (error) {
      setErrors({ form: error.message || 'Signup failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSignupChange = (e) => {
    const { name, value } = e.target
    setSignupData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <>
      <Nav />

      <div className="auth-container">
        <h2 id="formHeader">{isLogin ? 'Login' : 'Sign Up'}</h2>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {errors.form && (
          <div className="error-message">{errors.form}</div>
        )}

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div ref={googleButtonRef} style={{ marginBottom: '1rem' }}></div>

            <button
              type="button"
              onClick={handleMetaSignIn}
              className="btn facebook-btn"
            >
              <svg className="facebook-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Sign in with Facebook
            </button>

            <div className="divider"><span>or</span></div>

            <div className="form-group">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="email"
                id="loginEmail"
                name="email"
                placeholder="Enter your email"
                required
                autoComplete="email"
                value={loginData.email}
                onChange={handleLoginChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                id="loginPassword"
                name="password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="toggle-form">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false)
                  setErrors({})
                  setSuccessMessage('')
                }}
                style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Sign Up
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div ref={googleButtonSignupRef} style={{ marginBottom: '1rem' }}></div>

            <button
              type="button"
              onClick={handleMetaSignIn}
              className="btn facebook-btn"
            >
              <svg className="facebook-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Sign in with Facebook
            </button>

            <div className="divider"><span>or</span></div>

            <div className="form-group">
              <label htmlFor="signupName">Full Name</label>
              <input
                type="text"
                id="signupName"
                name="fullName"
                placeholder="Enter your full name"
                required
                autoComplete="name"
                value={signupData.fullName}
                onChange={handleSignupChange}
              />
              {errors.fullName && <div className="error-message">{errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="signupEmail">Email</label>
              <input
                type="email"
                id="signupEmail"
                name="email"
                placeholder="Enter your email"
                required
                autoComplete="email"
                value={signupData.email}
                onChange={handleSignupChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="signupPassword">Password</label>
              <input
                type="password"
                id="signupPassword"
                name="password"
                placeholder="Enter your password"
                required
                autoComplete="new-password"
                value={signupData.password}
                onChange={handleSignupChange}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="signupConfirmPassword">Confirm Password</label>
              <input
                type="password"
                id="signupConfirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
              />
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="toggle-form">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true)
                  setErrors({})
                  setSuccessMessage('')
                }}
                style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </>
  )
}
