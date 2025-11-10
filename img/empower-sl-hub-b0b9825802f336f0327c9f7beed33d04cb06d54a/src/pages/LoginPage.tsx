import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = '/';
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <LogIn className="login-logo-icon" />
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-description">Sign in to access your digital learning platform</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-field">
              <label htmlFor="email" className="form-label">
                <Mail className="label-icon" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="your.email@example.com"
                required
                className="form-input"
                defaultValue="demo@example.com"
              />
            </div>

            <div className="form-field">
              <label htmlFor="password" className="form-label">
                <Lock className="label-icon" />
                Password
              </label>
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  required
                  className="form-input"
                  defaultValue="demo123"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>

            <div className="login-demo-info">
              <p>Demo credentials are pre-filled - just click Sign In!</p>
            </div>
          </form>
        </div>

        <div className="login-footer">
          <p>© 2025 Empower Sierra Leone. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
