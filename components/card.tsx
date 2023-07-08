import React from 'react';

interface CardProps {
  id: number;
  name: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ id, name, description }) => {
  return (
    <div
    className="block rounded-lg bg-[#BDCDD6]] p-6  bg-[#6096B4]">
    <p
      className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
      {id}
    </p>
    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
      {name}
    </p>
    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
      {description}
    </p>
    
  </div>
  );
};

export default Card;
