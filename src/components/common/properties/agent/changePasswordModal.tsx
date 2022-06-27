import React, { FC, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { setSnackbar } from '@src/store/reducers/feedbackReducer';
import { CloseIcon, EyeIcon, EyeSlashIcon, ForwardArrow } from '../../svgIcons';

interface IProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const schema = z.object({
  password: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Password must be atleast 8 characters, and must contain uppercase, lowercase, number and special character'
    ),
  newPassword: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Password must be atleast 8 characters, and must contain uppercase, lowercase, number and special character'
    ),
});

const ChangePasswordModal: FC<IProps> = ({ isOpen, setIsOpen }) => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    setLoading(true);

    axios
      .post(`${process.env.NEXT_PUBLIC_REST_API}/auth/local`, {
        identifier: user.email,
        password: data.password,
      })
      .then(() => {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_REST_API}/users-permissions/change-password`,
            {
              password: data.newPassword,
            },
            {
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          )
          .then(() => {
            setLoading(false);
            setIsOpen(false);
            dispatch(
              setSnackbar({
                status: 'success',
                message: ` Password Changed Successfully`,
                open: true,
              })
            );
          })
          .catch(() => {
            dispatch(
              setSnackbar({
                status: 'error',
                message: ` There was a problem changing your password, please try again.`,
                open: true,
              })
            );
          });
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          setSnackbar({
            status: 'error',
            message: ` Old Password is Invalid.`,
            open: true,
          })
        );
      });
  });

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-1000 max-h-8"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Change Password
                  </Dialog.Title>
                  <Dialog.Title
                    as="p"
                    className="text-base leading-6 text-gray-900"
                  >
                    Input your current password and your new password. If you
                    can't remember your current password, kindly logout and
                    click on forgot password to reset your password
                  </Dialog.Title>

                  <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 mt-3">
                    {/* Form Fields */}
                    <div className="p-2 sm:px-5 sm:py-4">
                      <form>
                        <div className="px-3 py-4">
                          <form>
                            {/* Old Password */}
                            <div className="mb-5">
                              <label
                                htmlFor="password"
                                className={`font-semibold text-base pb-1 block ${
                                  errors.password
                                    ? 'text-red-500'
                                    : 'text - gray - 600'
                                }`}
                              >
                                Current Password
                              </label>
                              <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  {...register('password')}
                                  className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                                    errors.password &&
                                    'border-red-500 text-red-500 focus:outline-red-500'
                                  }`}
                                />
                                <div
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute inset-y-0 right-0 pr-3 pt-3 transition duration-200"
                                >
                                  {showPassword ? (
                                    <EyeSlashIcon
                                      width="26"
                                      height="26"
                                      fill="#9333EA"
                                    />
                                  ) : (
                                    <EyeIcon
                                      width="26"
                                      height="26"
                                      fill="#9333EA"
                                    />
                                  )}
                                </div>
                              </div>
                              {errors.password?.message && (
                                <p className="text-red-500 text-sm mt-2">
                                  {errors.password?.message}
                                </p>
                              )}
                            </div>

                            {/* New Password */}
                            <div className="mb-5">
                              <label
                                htmlFor="password"
                                className={`font-semibold text-base pb-1 block ${
                                  errors.newPassword
                                    ? 'text-red-500'
                                    : 'text - gray - 600'
                                }`}
                              >
                                New Password
                              </label>
                              <div className="relative">
                                <input
                                  type={showNewPassword ? 'text' : 'password'}
                                  {...register('newPassword')}
                                  className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                                    errors.newPassword &&
                                    'border-red-500 text-red-500 focus:outline-red-500'
                                  }`}
                                />
                                <div
                                  onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                  }
                                  className="absolute inset-y-0 right-0 pr-3 pt-3 transition duration-200"
                                >
                                  {showNewPassword ? (
                                    <EyeSlashIcon
                                      width="26"
                                      height="26"
                                      fill="#9333EA"
                                    />
                                  ) : (
                                    <EyeIcon
                                      width="26"
                                      height="26"
                                      fill="#9333EA"
                                    />
                                  )}
                                </div>
                              </div>
                              {errors.newPassword?.message && (
                                <p className="text-red-500 text-sm mt-2">
                                  {errors.newPassword?.message}
                                </p>
                              )}
                            </div>
                          </form>
                        </div>

                        <div className="flex justify-between mt-4">
                          <button
                            disabled={loading}
                            className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
                            onClick={onSubmit}
                          >
                            <span className="mr-2">Change Password</span>
                            {loading ? (
                              <div className="border-b-2 border-purple-600 rounded-full animate-spin w-5 h-5 " />
                            ) : (
                              <ForwardArrow />
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-4"
                  >
                    <CloseIcon width="32" height="32" fill="#9333EA" />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ChangePasswordModal;
