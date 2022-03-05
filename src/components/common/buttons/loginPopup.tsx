import React, { FC } from 'react';
// import Link from 'next/link';

interface IProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  buttonText: string;
}

const LoginPopupButton: FC<IProps> = ({ isOpen, setIsOpen, buttonText }) => {
  return (
    <div className="flex justify-center ml-auto">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center shadow-lg xs:py-1 my-2 md:py-2 xs:px-2 md:px-5 sm:mt-0 sm:-ml-4 font-heading font-medium tracking-tighter xs:text-lg md:text-xl text-white text-center bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 hover:bg-purple-900 rounded-xl"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default LoginPopupButton;
