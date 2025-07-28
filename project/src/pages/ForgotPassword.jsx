import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../api/auth';
import { Plane, Phone, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const result = await requestPasswordReset(phoneNumber);
      if (result.success) {
        setMessage('Request successful! Redirecting to the reset page...');
        setTimeout(() => navigate(`/reset-password?phone=${phoneNumber}`), 2500);
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
      <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden p-8 sm:p-12">
        
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="p-3 bg-sky-500 text-white rounded-full">
              <Plane className="h-8 w-8" />
            </div>
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't worry! Enter your phone number and we'll send you a reset code.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {message && (
            <div className="text-center p-3 bg-green-100 text-green-700 rounded-lg text-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="text-center p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              id="phone-number-forgot" 
              name="phoneNumber" 
              type="tel" 
              autoComplete="tel" 
              required 
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" 
              placeholder="Registered Phone Number" 
              value={phoneNumber} 
              onChange={e => setPhoneNumber(e.target.value)} 
            />
          </div>

          <div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-400 transition-all duration-300"
            >
              {isLoading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-sky-600">
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;