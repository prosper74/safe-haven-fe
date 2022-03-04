import React, { FC, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
// import { setUser } from '@src/store/reducers/userReducer';
// import { setSnackbar } from '@src/store/reducers/feedbackReducer';
import Login from './login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
// import Link from 'next/link';

interface IProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AuthPortal: FC<IProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [selectedStep, setSelectedStep] = useState(0);

  const steps = [
    { component: Login, label: 'Login' },
    { component: ForgotPassword, label: 'Forgot Password' },
    { component: Signup, label: 'Sign Up' },
    // { component: Complete, label: 'Complete' },
    // { component: Reset, label: 'Reset' },
  ];

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto z-[2000]"
          onClose={() => ''}
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
                <ForgotPassword setIsOpen={setIsOpen} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AuthPortal;
