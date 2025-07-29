import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TourCard from '../components/home/tours/TourCard';
import { Heart, Compass, UserX } from 'lucide-react';

// Component for the "Empty Wishlist" state
const EmptyWishlist = () => (
  <div className="text-center py-20 px-6 bg-white border-2 border-dashed rounded-2xl">
    <div className="inline-block p-4 bg-sky-100 text-sky-500 rounded-full">
      <Compass size={40} />
    </div>
    <h2 className="mt-6 text-2xl font-bold text-gray-800">Your Wishlist is Empty!</h2>
    <p className="text-gray-500 mt-2 max-w-md mx-auto">
      Looks like you haven't added any trips yet. Start exploring and save your dream journeys here.
    </p>
    <Link 
      to="/tours" 
      className="mt-8 inline-block bg-sky-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-sky-600 transition-transform hover:scale-105"
    >
      Explore Tours
    </Link>
  </div>
);

// Component for the "Not Logged In" state
const NotLoggedIn = () => (
  <div className="text-center py-40">
     <div className="inline-block p-4 bg-gray-200 text-gray-600 rounded-full mb-4">
      <UserX size={40} />
    </div>
    <h2 className="text-3xl font-bold mb-4 text-gray-800">Please Sign In</h2>
    <p className="mb-8 text-gray-600 max-w-md mx-auto">You need to be logged in to view and manage your wishlist of favorite trips.</p>
    <Link 
      to="/auth" 
      className="bg-sky-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-sky-600 transition-transform hover:scale-105"
    >
      Go to Sign In Page
    </Link>
  </div>
);

const WishlistPage = () => {
  const { user, wishlist } = useContext(AuthContext);

  // Handle the case where the user is not logged in
  if (!user) {
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8 pt-24">
          <NotLoggedIn />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative bg-black pt-32 pb-16 text-white text-center">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIGp-QE1OzOKr_kvmOkA0KpgSqYOuN7x9bKQ&s" 
          alt="Travel wishlist background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative container mx-auto px-4">
          <div className="flex justify-center items-center gap-4">
            <Heart className="text-white drop-shadow-lg" size={40} strokeWidth={1.5} />
            <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">My Wishlist</h1>
          </div>
          <p className="mt-4 text-lg opacity-90">
            {wishlist.length > 0
              ? `You have ${wishlist.length} dream ${wishlist.length > 1 ? 'trips' : 'trip'} saved.`
              : 'Your dream journeys will appear here.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 -mt-8">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map(tour => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
