import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import { Plane, User, Phone, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // --- HOOKS ---
  const navigate = useNavigate();

  // --- HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await registerUser(formData);
      if (result.success) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(result.message || 'An error occurred. Please try again.');
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
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Start your journey with us today.
            </p>
          </div>

          {error && <div className="text-center p-3 mb-6 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
          {success && <div className="text-center p-3 mb-6 bg-green-100 text-green-700 rounded-lg text-sm">{success}</div>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input name="name" type="text" required placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
            </div>

            {/* Phone Number Input */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input name="phoneNumber" type="tel" required placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
            </div>
            
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input name="email" type="email" placeholder="Email (Optional)" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input name="password" type={showPassword ? 'text' : 'password'} required placeholder="Password" value={formData.password} onChange={handleChange} className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Confirm Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div>
              <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 transition-all duration-300">
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-sky-600 hover:text-sky-500">
              Sign In
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop" 
            alt="Travel registration background" 
            className="absolute h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
           <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
            <h3 className="text-4xl font-bold leading-tight">Begin your adventure.</h3>
            <p className="mt-4 text-lg opacity-90">Create an account to unlock a world of travel.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
