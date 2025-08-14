// src/components/ToastConfig.jsx
import React from 'react';
import { toast } from 'react-toastify';

// Define the three toast types
const toastTypes = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
};

const ToastConfig = () => {
  const showToast = (type) => {
    switch (type) {
      case 'success':
        toastTypes.success('This is a success message! 🎉');
        break;
      case 'error':
        toastTypes.error('This is an error message! 🚨');
        break;
      case 'info':
        toastTypes.info('This is an info message! ℹ️');
        break;
      default:
        toastTypes.info('Hello, default toast!');
    }
  };

  return (
    <div>
      <button onClick={() => showToast('success')}>Show Success Toast</button>
      <button onClick={() => showToast('error')}>Show Error Toast</button>
      <button onClick={() => showToast('info')}>Show Info Toast</button>
    </div>
  );
};

export default ToastConfig;