import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { Plane, Phone, Lock, Eye, EyeOff } from 'lucide-react';

// Component for social login buttons
const SocialLoginButton = ({ icon, text }) => (
  <button
    type="button"
    className="flex-1 flex items-center justify-center py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

const Login = () => {
  // --- STATE MANAGEMENT ---
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // --- HOOKS ---
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- HANDLERS ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await loginUser({ phoneNumber, password });
      if (result.success) {
        login(result.data);
        navigate('/'); // Navigate to homepage after successful login
      } else {
        // Use a generic English error message if the backend message is in Vietnamese
        setError('Invalid phone number or password.');
      }
    } catch (err) {
      setError('Could not connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 pt-20">
      <div className="relative w-full max-w-4xl flex bg-white shadow-2xl rounded-2xl overflow-hidden">
        
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="p-2 bg-sky-500 text-white rounded-full">
                <Plane className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Globy</h1>
            </Link>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Welcome Back!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to continue your journey.
            </p>
          </div>

          {error && (
            <div className="text-center p-3 mb-6 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Phone Number Input */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                id="phone-number" 
                name="phoneNumber" 
                type="tel" 
                autoComplete="tel" 
                required 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" 
                placeholder="Phone Number" 
                value={phoneNumber} 
                onChange={e => setPhoneNumber(e.target.value)} 
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                id="password-login" 
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                autoComplete="current-password" 
                required 
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="text-sm text-right">
              <Link to="/forgot-password" className="font-medium text-sky-600 hover:text-sky-500">
                Forgot password?
              </Link>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-400 transition-all duration-300"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-sm text-gray-500">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          {/* Social Logins */}
          <div className="flex flex-col sm:flex-row gap-4">
            <SocialLoginButton icon={<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5"/>} text="Google" />
            <SocialLoginButton icon={<img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-5 h-5"/>} text="Facebook" />
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-sky-600 hover:text-sky-500">
              Sign up now
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop" 
            alt="Travel background" 
            className="absolute h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
            <h3 className="text-4xl font-bold leading-tight">Explore the world.</h3>
            <p className="mt-4 text-lg opacity-90">Amazing journeys are waiting for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
