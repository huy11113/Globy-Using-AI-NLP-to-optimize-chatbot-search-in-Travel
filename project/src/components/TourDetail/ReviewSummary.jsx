import React from 'react';
import { Star } from 'lucide-react';

const RatingBar = ({ percentage }) => (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
);

const ReviewSummary = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return null;
    }

    const totalReviews = reviews.length;
    const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);
    
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => r.rating === star).length;
        return { star, count, percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0 };
    });

    return (
        <div className="border-b pb-6 mb-6">
            <div className="flex items-center gap-4">
                <p className="text-4xl font-bold text-gray-800">{averageRating}</p>
                <div>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} className={` ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <p className="text-sm text-gray-600">{totalReviews} đánh giá</p>
                </div>
            </div>
            <div className="w-full flex flex-col-reverse gap-1 mt-4">
                {ratingDistribution.map(item => (
                    <div key={item.star} className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500">{item.star}</span>
                        <RatingBar percentage={item.percentage} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSummary;