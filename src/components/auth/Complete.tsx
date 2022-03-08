import React, { FC } from 'react';
import Lottie from 'react-lottie-player';

import lottieJson from './success-animation.json';

interface IProps {
  setIsOpen: (open: boolean) => void;
}

const Complete: FC<IProps> = ({ setIsOpen }) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="p-4 xs:p-0 mx-auto md:w-full md:max-w-md">
          <p className="text-2xl font-bold text-center my-6">
            Account Created Successfully!!!
          </p>
          <div className="flex justify-center items-center">
            <Lottie
              loop
              play
              // animationData={lottieJson}
              direction={1}
              style={{
                width: 150,
                height: 150,
                marginBottom: 10,
                alignSelf: 'center',
              }}
            />
          </div>
          <p className="text-base font-normal text-center px-4">
            Kindly input your registered email address, and we will send an
            email with instructions on how to reset your password
          </p>

          {/* Login Instead  */}
          <div className="py-1">
            <div className="grid grid-cols-2 xs:gap-4 md:gap-32">
              <button
                type="button"
                className="inline-flex justify-center items-center mt-10 py-2 text-base font-medium text-gray-500 border-transparent rounded-md hover:bg-gray-200"
                onClick={closeModal}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Complete;
