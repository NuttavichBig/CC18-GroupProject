import React from 'react';

function HotelDetailReview({reviews}) {

    return (
        <div className="bg-white rounded-lg p-4 shadow-md h-full">
            <h3 className="text-lg font-semibold mb-4">
                Reviews <span className="text-yellow-500">★★★★☆</span>
            </h3>
            <div className="space-y-4">
                {reviews.map((review, index) => (
                    <div key={index} className="bg-[#fef6e4] p-4 rounded-lg shadow-sm">
                        <div className="flex items-center mb-2">
                            <span className="font-semibold mr-2">{review.name}</span>
                            <div className="flex">
                                <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                                <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HotelDetailReview;
