const API_URL = 'http://localhost:4000/api/bookings';

export const createBooking = async (bookingData) => {
    const response = await fetch(`${API_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    });
    return response.json();
};

export const processPayment = async (paymentData) => {
    const response = await fetch(`${API_URL}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
    });
    return response.json();
};