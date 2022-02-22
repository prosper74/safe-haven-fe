import React, { FC, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import Link from 'next/link';

type Images = {
  url: String;
};

interface IProps {
  agent: {
    id?: String;
    username?: String;
    phone?: Number;
    verified?: Boolean;
    image?: Images[];
  };
  isOpen: Boolean;
  setIsOpen: Boolean;
}

const Login: FC<IProps> = ({ isOpen, setIsOpen }) => {
  // let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto z-[2000]"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-slate-700 bg-opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-2 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex flex-col justify-center">
                  <div className="p-4 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                      <div className="px-5 py-4">
                        <label className="font-semibold text-base text-gray-600 pb-1 block">
                          E-mail
                        </label>
                        <input
                          type="text"
                          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-base w-full"
                        />
                        <label className="font-semibold text-base text-gray-600 pb-1 block">
                          Password
                        </label>
                        <input
                          type="text"
                          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-base w-full"
                        />
                        <button
                          type="button"
                          className="transition duration-200 bg-purple-600 hover:bg-purple-700 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-base shadow-sm hover:shadow-md font-semibold text-center inline-block"
                        >
                          <span className="inline-block mr-2">Login</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4 inline-block"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="p-2">
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            className="transition duration-200 border border-gray-200 text-gray-700 w-full py-2.5 rounded-lg text-base shadow-sm hover:shadow-md font-normal text-center flex items-center justify-center"
                          >
                            <svg
                              width="22"
                              height="22"
                              xmlns="http://www.w3.org/2000/svg"
                              data-name="Layer 1"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22.60229,10.00391a1.00005,1.00005,0,0,0-.98388-.82227H12.2a.99974.99974,0,0,0-1,1V14.0498a.99974.99974,0,0,0,1,1h3.9624a3.65162,3.65162,0,0,1-1.13183,1.1875A5.0604,5.0604,0,0,1,12.2,17.02246a4.93525,4.93525,0,0,1-4.64624-3.4378L7.55347,13.583a4.90382,4.90382,0,0,1,0-3.167l.00024-.00165A4.9356,4.9356,0,0,1,12.2,6.97754,4.37756,4.37756,0,0,1,15.3313,8.19531a1.00053,1.00053,0,0,0,1.39844-.01562L19.5979,5.31152a.99918.99918,0,0,0-.02539-1.43847A10.62342,10.62342,0,0,0,12.2,1,10.949,10.949,0,0,0,2.37134,7.05878l-.00147.00177A10.92175,10.92175,0,0,0,1.2,12a11.07862,11.07862,0,0,0,1.16992,4.93945l.00147.00177A10.949,10.949,0,0,0,12.2,23a10.5255,10.5255,0,0,0,7.29468-2.687l.00073-.00049.00079-.00085.00019-.00013.00006-.00012a10.78575,10.78575,0,0,0,3.30365-8.08386A12.51533,12.51533,0,0,0,22.60229,10.00391ZM12.2,3a8.68219,8.68219,0,0,1,5.2085,1.67285L15.95483,6.126A6.46322,6.46322,0,0,0,12.2,4.97754,6.88648,6.88648,0,0,0,6.21069,8.52832L5.14148,7.69958l-.585-.45367A8.95257,8.95257,0,0,1,12.2,3ZM3.67944,14.90332a9.02957,9.02957,0,0,1,0-5.80664l1.78223,1.38184a6.85381,6.85381,0,0,0,0,3.042ZM12.2,21A8.9528,8.9528,0,0,1,4.5564,16.75391l.37841-.29352,1.27588-.98969A6.88482,6.88482,0,0,0,12.2,19.02246a7.27662,7.27662,0,0,0,3.30573-.75079L17.19739,19.585A8.88989,8.88989,0,0,1,12.2,21Zm6.52588-2.76074-.183-.142L17.16553,17.028a5.60626,5.60626,0,0,0,1.39966-2.79553.9998.9998,0,0,0-.9834-1.18262H13.2V11.18164h7.54883c.03418.3457.05127.69531.05127,1.0459A9.05156,9.05156,0,0,1,18.72583,18.23926Z" />
                            </svg>
                            Google
                          </button>
                          <button
                            type="button"
                            className="transition duration-200 border border-gray-200 text-gray-700 w-full py-2.5 rounded-lg text-base shadow-sm hover:shadow-md font-normal text-center flex items-center justify-center"
                          >
                            <svg
                              width="22"
                              height="22"
                              xmlns="http://www.w3.org/2000/svg"
                              data-name="Layer 1"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15.12,5.32H17V2.14A26.11,26.11,0,0,0,14.26,2C11.54,2,9.68,3.66,9.68,6.7V9.32H6.61v3.56H9.68V22h3.68V12.88h3.06l.46-3.56H13.36V7.05C13.36,6,13.64,5.32,15.12,5.32Z" />
                            </svg>
                            Facebook
                          </button>
                        </div>
                      </div>
                      <div className="py-1">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-center sm:text-left whitespace-nowrap">
                            <button className="transition duration-200 mx-5 px-5 py-4 font-normal text-base rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 inline-block align-text-top"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="ml-1">Forgot Password</span>
                            </button>
                          </div>
                          <div className="text-center sm:text-right whitespace-nowrap">
                            <button className="transition duration-200 mx-5 px-5 py-4 font-normal text-base rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 inline-block align-text-bottom	"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                              </svg>
                              <span className="inline-block ml-1">Help</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <div className="grid grid-cols-2 xs:gap-4 md:gap-32">
                        <div className="text-center sm:text-left whitespace-nowrap">
                          <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-base rounded-lg text-gray-500hover:text-white hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset flex items-center">
                            <svg
                              width="22"
                              height="22"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M21,10.5H20v-1a1,1,0,0,0-2,0v1H17a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0v-1h1a1,1,0,0,0,0-2Zm-7.7,1.72A4.92,4.92,0,0,0,15,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,2,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,13.3,12.22ZM10,11.5a3,3,0,1,1,3-3A3,3,0,0,1,10,11.5Z" />
                            </svg>
                            <span className="inline-block ml-1">
                              Create Account
                            </span>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="inline-flex justify-center items-center  text-base font-medium text-gray-500 border-transparent rounded-md hover:bg-gray-200"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Login;
