import { ReactNode, FC } from 'react';

interface CardProps {
	children: ReactNode
}

const Card: FC<CardProps> = ({ children }) => {
  return (
    <div
      className="block rounded-lg bg-[#BDCDD6]] p-6 h-96 bg-[#BDCDD6] text-[#6096B4]">
		{children}
    </div>
  );
};

export default Card;
