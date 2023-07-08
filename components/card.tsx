import React from 'react';

interface CardProps {
  imageSrc: string;
  name: string;
  description: string;
  handleUpdate: () => void;
  handleRemove: () => void;
}

const Card: React.FC<CardProps> = ({ imageSrc, name, description, handleRemove, handleUpdate }) => {
  return (
    <div
      className="block rounded-lg bg-[#BDCDD6]] p-6 h-96 bg-[#BDCDD6] text-[#6096B4]">
      <img src={imageSrc} alt={name} className="w-full h-40 object-cover mb-4" />
      <p className="mb-4 text-base  text-[#6096B4] h-9">
        {name}
      </p>
      <p className="mb-4 text-base text-[#6096B4] h-9">
        {description}
      </p>
      <div className="space-x-2 mb-4 mt-6">
        <button className="hover:bg-transparent bg-[#6096B4] hover:text-[#6096B4] font-semibold text-[#BDCDD6] py-2 px-4 border hover:border-[#6096B4] border-transparent rounded" onClick={handleRemove}>Remove</button>
        <button className="hover:bg-transparent bg-[#6096B4] hover:text-[#6096B4] font-semibold text-[#BDCDD6] py-2 px-4 border hover:border-[#6096B4] border-transparent rounded" onClick={handleUpdate}>Update</button>
      </div>

    </div>
  );
};

export default Card;
