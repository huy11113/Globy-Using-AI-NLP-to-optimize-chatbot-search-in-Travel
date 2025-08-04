import React, { useState, useEffect } from 'react';
import { BedDouble } from 'lucide-react';

// Component con để hiển thị một thẻ khách sạn
const HotelCard = ({ hotel, onSelect, isSelected }) => (
    <div 
        onClick={() => onSelect(hotel)}
        className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${isSelected ? 'border-sky-500 ring-2 ring-sky-200 bg-sky-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
    >
        <img src={hotel.image} alt={hotel.name} className="w-full h-32 object-cover rounded-md mb-3" />
        <h4 className="font-semibold text-gray-800 leading-tight">{hotel.name}</h4>
        <p className="text-xs text-gray-500 mt-1 truncate">{hotel.address}</p>
        <div className="mt-2 text-right">
             {/* Bạn có thể thay đổi giá phòng ở đây hoặc lấy từ API sau */}
            <span className="text-base font-bold text-sky-600">$120</span>
            <span className="text-sm text-gray-500"> / đêm</span>
        </div>
    </div>
);

const HotelSuggestion = ({ city, onHotelSelect }) => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHotel, setSelectedHotel] = useState(null);

    useEffect(() => {
        // Chỉ gọi API khi có 'city'
        if (!city) {
            setLoading(false);
            return;
        };

        const fetchHotels = async () => {
            setLoading(true);
            try {
                // Gọi API bằng city để lấy danh sách khách sạn
                const response = await fetch(`http://localhost:4000/api/hotels?city=${city}`);
                const result = await response.json();
                if (result.success) {
                    // Chỉ lấy tối đa 3 khách sạn để gợi ý
                    setHotels(result.data.slice(0, 3));
                }
            } catch (error) {
                console.error("Failed to fetch suggested hotels:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [city]); // Effect sẽ chạy lại mỗi khi 'city' thay đổi

    const handleSelectHotel = (hotel) => {
        // Nếu bấm lại khách sạn đã chọn -> bỏ chọn
        const newSelectedHotel = selectedHotel?._id === hotel._id ? null : hotel;
        setSelectedHotel(newSelectedHotel);
        onHotelSelect(newSelectedHotel); // Báo cho component cha (CheckoutPage) biết lựa chọn
    };

    if (loading) {
        return <div className="text-center text-gray-500 p-4">Đang tìm khách sạn gần bạn...</div>;
    }
    
    // Không hiển thị gì nếu không có khách sạn
    if (hotels.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 border-t border-dashed pt-8">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <BedDouble className="mr-3 text-sky-500" />
                Dịch vụ bổ sung
            </h2>
            <p className="text-gray-600 mt-2 mb-4">
                Thêm khách sạn vào chuyến đi của bạn để có một trải nghiệm trọn vẹn.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {hotels.map(hotel => (
                    <HotelCard 
                        key={hotel._id} 
                        hotel={hotel} 
                        onSelect={handleSelectHotel}
                        isSelected={selectedHotel?._id === hotel._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default HotelSuggestion;