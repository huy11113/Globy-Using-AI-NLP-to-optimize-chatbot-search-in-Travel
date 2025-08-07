import React, { useState, useEffect, useContext } from 'react';
import { Star, Send } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import { getReviewsByTour, submitReview } from '@/api/review';
import ReviewSummary from './ReviewSummary'; // Import component mới

// --- Component phụ: Form gửi đánh giá ---
const ReviewForm = ({ tourId, onReviewSubmit }) => {
    const { user } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!user) {
        return <p className="text-center p-4 bg-gray-100 rounded-lg">Vui lòng <a href="/login" className="font-bold text-sky-600 hover:underline">đăng nhập</a> để để lại đánh giá.</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (rating === 0) {
            setError('Vui lòng chọn số sao đánh giá.');
            return;
        }
        setIsSubmitting(true);
        const reviewData = { userId: user._id, tourId, rating, comment };
        const result = await submitReview(reviewData);
        setIsSubmitting(false);

        if (result.success) {
            alert('Cảm ơn bạn đã gửi đánh giá!');
            setRating(0);
            setComment('');
            onReviewSubmit(); // Báo cho component cha để tải lại danh sách review
        } else {
            setError(result.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-12 p-6 bg-gray-50 rounded-xl border-2 border-dashed">
            <h4 className="font-bold text-lg mb-4 text-gray-800">Chia sẻ trải nghiệm của bạn</h4>
            <div className="flex items-center gap-2 mb-4">
                <span className="font-semibold text-gray-700">Đánh giá của bạn:</span>
                {[1, 2, 3, 4, 5].map(star => (
                    <Star
                        key={star}
                        className="w-7 h-7 cursor-pointer transition-all duration-150 transform hover:scale-125"
                        color={ (hoverRating || rating) >= star ? '#FBBF24' : '#D1D5DB' }
                        fill={ (hoverRating || rating) >= star ? '#FBBF24' : 'none' }
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                    />
                ))}
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                placeholder={`Bạn nghĩ gì về chuyến đi này?`}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 transition"
                required
            ></textarea>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 transition-all shadow-md hover:shadow-lg disabled:bg-gray-400">
                {isSubmitting ? 'Đang gửi...' : <><Send size={16} /> Gửi đánh giá</>}
            </button>
        </form>
    );
};

// --- Component chính ---
const ReviewSection = ({ tourId }) => {
    const [reviews, setReviews] = useState([]);
    
    // Hàm này sẽ được gọi từ component con để tải lại danh sách
    const fetchReviews = async () => {
        if (tourId) {
            const result = await getReviewsByTour(tourId);
            if (result.success) {
                // Sắp xếp review mới nhất lên đầu
                const sortedReviews = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setReviews(sortedReviews);
            }
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [tourId]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 pb-4 mb-8 border-b">
                Đánh giá của khách hàng
            </h3>

            <ReviewSummary reviews={reviews} />

            <div className="border-t my-10"></div>
            
            <ReviewForm tourId={tourId} onReviewSubmit={fetchReviews} />

            <div className="space-y-8">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="flex items-start gap-4 border-b pb-8 last:border-b-0">
                            <img src={review.user?.avatar || `https://ui-avatars.com/api/?name=${review.user?.name}&background=random&color=fff`} alt={review.user?.name} className="w-12 h-12 rounded-full object-cover" />
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <div>
                                        <h5 className="font-bold text-gray-800">{review.user?.name}</h5>
                                        <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                                    </div>
                                    <div className="flex mt-2 sm:mt-0">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={18} className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                                    </div>
                                </div>
                                <p className="mt-3 text-gray-700 leading-relaxed whitespace-pre-wrap">{review.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-8">Chưa có đánh giá nào. Hãy là người đầu tiên chia sẻ trải nghiệm của bạn!</p>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;