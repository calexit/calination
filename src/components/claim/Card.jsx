import React from 'react';

const Card = ({ image, title, price, isSelected, onSelect }) => {
    return (
        <article 
            className={`overflow-hidden rounded-[15px] shadow-sm transition hover:shadow-lg cursor-pointer ${
                isSelected ? 'border-2 border-[#C68F00]' : 'border-2 border-transparent'
            }`}
            onClick={onSelect}
        >
            <img
                alt=""
                src={image}
                className="object-cover w-full h-48"
            />

            <div className="bg-[#3B3B3B] p-4 sm:p-6">
                <div className="flex justify-between items-center">
                    <p className="text-sm/relaxed text-white">
                        Coin
                    </p>
                    <p className="text-sm/relaxed text-white font-bold">
                        {title}
                    </p>
                </div>
                <p className="text-sm/relaxed mb-[-8px] justify-start flex text-gray-500 font-bold">Price</p>
                <p className="mt-2 justify-start flex line-clamp-3 text-[12px] text-white">
                    {price} ETH
                </p>
            </div>
        </article>
    );
};

export default Card;