import React, { useState } from 'react';

import PromotionModal from '../ModalOther/PromotionModal';

const promotions = [
    { id: 1, imageUrl: '/1.jpg', discount: '50%', location: 'Lotte Hotels & Resorts Korea' },
    { id: 2, imageUrl: '/2.jpg', discount: '40%', location: 'Lotte Hotels & Resorts Korea' },
    { id: 3, imageUrl: '/3.jpg', discount: '40%', location: 'Lotte Hotels & Resorts Korea' },
    { id: 4, imageUrl: '/4.jpg', discount: '50%', location: 'Lotte Hotels & Resorts Korea' },
    { id: 5, imageUrl: '/5.jpg', discount: '40%', location: 'Lotte Hotels & Resorts Korea' },
    { id: 6, imageUrl: '/6.jpg', discount: '50%', location: 'Lotte Hotels & Resorts Korea' },
    { id: 7, imageUrl: '/7.jpg', discount: '40%', location: 'Lotte Hotels & Resorts Korea' },
    { id: 8, imageUrl: '/8.jpg', discount: '40%', location: 'Lotte Hotels & Resorts Korea' },
    { id: 9, imageUrl: '/9.jpg', discount: '50%', location: 'Lotte Hotels & Resorts Korea' },
    { id: 10, imageUrl: '/10.jpg', discount: '40%', location: 'Lotte Hotels & Resorts Korea' },
];

function PromotionListShowAll() {
    const [selectedPromo, setSelectedPromo] = useState(null); //modal

    const openModal = (promo) => {
        setSelectedPromo(promo);
    };

    const closeModal = () => {
        setSelectedPromo(null);
    };

    const handleMouseMove = (e, index) => {
        const card = document.getElementById(`promo-card-${index}`);
        const shadow = document.getElementById(`shadow-card-${index}`);
        const rect = card.getBoundingClientRect(); //ได้ตำแหน่งและขนาดของการ์ดใน viewport (เช่น ตำแหน่ง x, y, ความกว้าง และความสูง)
        const x = e.clientX - rect.left; //คำนวณตำแหน่งของเมาส์ภายในการ์ด โดยการลบตำแหน่งเริ่มต้นของการ์ด
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((centerY - y) / centerY) * 10;
        const rotateY = ((centerX - x) / centerX) * -10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';

        shadow.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(-100px)`;
        shadow.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    };

    const handleMouseLeave = (index) => {
        const card = document.getElementById(`promo-card-${index}`);
        const shadow = document.getElementById(`shadow-card-${index}`);
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'; //รีเซ็ตการหมุน (rotateX และ rotateY) และการขยายขนาด (scale) ของการ์ดให้กลับมาเป็นค่าเริ่มต้น
        card.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'; //สำหรับการคืนค่าให้กลับมาเป็นค่าเริ่มต้นอย่างนุ่มนวล

        shadow.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(-100px)';
        shadow.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
    };

    return (
        <div className="max-w-7xl mx-auto p-6 relative justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ paddingLeft: '40px' }}>
                {promotions.map((promo, index) => (
                    <div
                        key={promo.id}
                        className="mb-8"
                        style={{
                            perspective: '1000px',
                            width: '300px',
                            height: '200px',
                            position: 'relative',
                        }}
                    >
                        <div
                            id={`shadow-card-${index}`}
                            className="absolute inset-0 rounded-lg"
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                transform: 'translateZ(-800px)',
                                transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                                boxShadow: '0 60px 80px rgba(0, 0, 0, 0.4), 0 20px 40px rgba(0, 0, 0, 0.3)',
                                zIndex: -1,
                            }}
                        ></div>

                        <div
                            id={`promo-card-${index}`}
                            className="relative bg-[#FFF8EC] rounded-lg shadow-lg overflow-hidden cursor-pointer flex "
                            style={{
                                width: '100%',
                                height: '100%',
                                transformStyle: 'preserve-3d',
                                transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                            }}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            onClick={() => openModal(promo)}
                        >
                            <img
                                src={promo.imageUrl}
                                alt="Promotion"
                                className="w-1/2 h-full object-cover rounded-l-lg"
                            />
                            <div className="flex flex-col justify-center items-center w-1/2 p-4 text-center">
                                <h3 className="text-orange-600 text-lg font-bold">
                                    Special Discounts {promo.discount}
                                </h3>
                                <p className="text-gray-600 text-sm">{promo.location}</p>
                                <button
                                    className="mt-4 bg-orange-500 text-white py-1 px-4 rounded-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(promo);
                                    }}
                                >
                                    More
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPromo && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={closeModal}
                >
                    <PromotionModal promo={selectedPromo} onClose={closeModal} />
                </div>
            )}
        </div>
    );
}

export default PromotionListShowAll;