import React from 'react';
import { Star } from 'lucide-react';

const RatingBar = ({ percentage }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
);

const ReviewSummary = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return null; // Không hiển thị gì nếu chưa có review
    }

    const totalReviews = reviews.length;
    const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);
    
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => r.rating === star).length;
        return { star, count, percentage: (count / totalReviews) * 100 };
    });

    return (
        <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg w-full md:w-40">
                <p className="text-5xl font-bold text-gray-800">{averageRating}</p>
                <div className="flex my-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className={` ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                </div>
                <p className="text-sm text-gray-600">Dựa trên {totalReviews} đánh giá</p>
            </div>
            <div className="w-full flex flex-col-reverse gap-2">
                {ratingDistribution.map(item => (
                    <div key={item.star} className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">{item.star} sao</span>
                        <RatingBar percentage={item.percentage} />
                        <span className="text-sm font-semibold text-gray-600 w-8 text-right">{item.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSummary;