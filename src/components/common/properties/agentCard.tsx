import React, { FC, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Image } from '../interfaces';
import { VerifiedIcon } from '../svgIcons';

interface IProps {
  agent: {
    id: string;
    username: string;
    phone: number;
    verified: boolean;
    image: Image;
  };
}

const AgentCard: FC<IProps> = ({ agent }) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="w-full h-32 bg-purple-50 shadow-lg rounded-lg flex flex-col items-center justify-center my-6">
        <h4 className="font-medium text-2xl mb-3">
          Interested in this property?
        </h4>
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Contact Agent
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-3xl font-medium leading-6 text-gray-900"
                >
                  Agent Information
                </Dialog.Title>
                <img
                  src={agent?.image?.url}
                  alt={agent.username}
                  className="w-24 h-24 mt-6 rounded-full object-cover"
                />
                <div className="my-4">
                  <p className="text-lg text-gray-500 my-2 capitalize">
                    Name: {agent.username}
                  </p>
                  <p className="text-lg text-gray-500 my-2">
                    Number:{' '}
                    <a href={`tel:+234${agent.phone}`}>+234 {agent.phone}</a>
                  </p>
                  <p className="text-lg text-gray-500 my-2">
                    Status:{' '}
                    {agent.verified ? (
                      <span>
                        Verified
                        <VerifiedIcon />
                      </span>
                    ) : (
                      'Not verified'
                    )}
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <Link
                    href={
                      agent.username
                        ? `/agent/${agent.username
                            .toLowerCase()
                            .replace(/ /g, '-')}&id=${agent.id}`
                        : ''
                    }
                  >
                    <a>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-base font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      >
                        View Agent ads
                      </button>
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-base font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AgentCard;
