import React, { FC, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '@src/store/reducers/feedbackReducer';
import Link from 'next/link';

const schema = z.object({
  password: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Password must be atleast 8 characters, and must contain uppercase, lowercase, number and special character'
    ),
  confirmPassword: z.string(),
});

const ResetPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      .post(`${process.env.NEXT_PUBLIC_REST_API}/auth/forgot-password`, {
        email: data.email,
      })
      .then(() => {
        dispatch(
          setSnackbar({
            status: 'success',
            message: ` Email sent, please check your inbox for instructions to reset your password`,
            open: true,
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        const { message } = error.response.data.message[0].messages[0];
        dispatch(setSnackbar({ status: 'error', message, open: true }));
        setLoading(false);
      });
  });

  return (
    <>
      <Head>
        <title>Safe Haven | Reset Password</title>
        <link rel="icon" href="/favicon.png" />
        <meta content="Reset your password" />
      </Head>

      <div className="flex flex-col justify-center mt-16 p-16">
        <div className="p-4 xs:p-0 mx-auto md:w-full md:max-w-md shadow-lg rounded-lg">
          <p className="text-2xl font-bold text-center mt-6">
            Reset Your Password?
          </p>
          <p className="text-base font-normal text-center px-4">
            Kindly input your new password and conrfim the password
          </p>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            {/* Local Login */}
            <div className="px-5 py-4">
              <form>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className={`font-semibold text-base pb-1 block ${
                      errors.password ? 'text-red-500' : 'text - gray - 600'
                    }`}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
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
                        <svg
                          width="26"
                          height="26"
                          xmlns="http://www.w3.org/2000/svg"
                          data-name="Layer 1"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#9333EA"
                            d="M10.94,6.08A6.93,6.93,0,0,1,12,6c3.18,0,6.17,2.29,7.91,6a15.23,15.23,0,0,1-.9,1.64,1,1,0,0,0-.16.55,1,1,0,0,0,1.86.5,15.77,15.77,0,0,0,1.21-2.3,1,1,0,0,0,0-.79C19.9,6.91,16.1,4,12,4a7.77,7.77,0,0,0-1.4.12,1,1,0,1,0,.34,2ZM3.71,2.29A1,1,0,0,0,2.29,3.71L5.39,6.8a14.62,14.62,0,0,0-3.31,4.8,1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20a9.26,9.26,0,0,0,5.05-1.54l3.24,3.25a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Zm6.36,9.19,2.45,2.45A1.81,1.81,0,0,1,12,14a2,2,0,0,1-2-2A1.81,1.81,0,0,1,10.07,11.48ZM12,18c-3.18,0-6.17-2.29-7.9-6A12.09,12.09,0,0,1,6.8,8.21L8.57,10A4,4,0,0,0,14,15.43L15.59,17A7.24,7.24,0,0,1,12,18Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="26"
                          height="26"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#9333EA"
                            d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  {errors.password?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.password?.message}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="confirmPassword"
                    className={`font-semibold text-base pb-1 block ${
                      errors.confirmPassword
                        ? 'text-red-500'
                        : 'text - gray - 600'
                    }`}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword')}
                      className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                        errors.confirmPassword &&
                        'border-red-500 text-red-500 focus:outline-red-500'
                      }`}
                    />
                    <div
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 pt-3 transition duration-200"
                    >
                      {showConfirmPassword ? (
                        <svg
                          width="26"
                          height="26"
                          xmlns="http://www.w3.org/2000/svg"
                          data-name="Layer 1"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#9333EA"
                            d="M10.94,6.08A6.93,6.93,0,0,1,12,6c3.18,0,6.17,2.29,7.91,6a15.23,15.23,0,0,1-.9,1.64,1,1,0,0,0-.16.55,1,1,0,0,0,1.86.5,15.77,15.77,0,0,0,1.21-2.3,1,1,0,0,0,0-.79C19.9,6.91,16.1,4,12,4a7.77,7.77,0,0,0-1.4.12,1,1,0,1,0,.34,2ZM3.71,2.29A1,1,0,0,0,2.29,3.71L5.39,6.8a14.62,14.62,0,0,0-3.31,4.8,1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20a9.26,9.26,0,0,0,5.05-1.54l3.24,3.25a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Zm6.36,9.19,2.45,2.45A1.81,1.81,0,0,1,12,14a2,2,0,0,1-2-2A1.81,1.81,0,0,1,10.07,11.48ZM12,18c-3.18,0-6.17-2.29-7.9-6A12.09,12.09,0,0,1,6.8,8.21L8.57,10A4,4,0,0,0,14,15.43L15.59,17A7.24,7.24,0,0,1,12,18Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="26"
                          height="26"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#9333EA"
                            d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  {errors.confirmPassword?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                </div>

                {confirmPasswordError && (
                  <p className="text-red-500 text-sm mt-2">
                    Passwords do not match
                  </p>
                )}

                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={loading}
                  className={`transition duration-200 bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 w-full py-2.5 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center ${
                    loading
                      ? 'hover:bg-purple-300 text-gray-300'
                      : 'hover:bg-purple-700 text-white'
                  }`}
                >
                  <span className="mr-2">Submit</span>
                  {loading ? (
                    <div className="border-b-2 border-white rounded-full animate-spin w-6 h-6 "></div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Login Instead  */}
          <div className="py-1">
            <div className="grid grid-cols-2 xs:gap-4 md:gap-32">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-base rounded-lg text-gray-500hover:text-white hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset flex items-center">
                  <svg
                    width="22"
                    height="22"
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.5,12.8l5.7,5.6c0.4,0.4,1,0.4,1.4,0c0,0,0,0,0,0c0.4-0.4,0.4-1,0-1.4l-4.9-5l4.9-5c0.4-0.4,0.4-1,0-1.4c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3l-5.7,5.6C8.1,11.7,8.1,12.3,8.5,12.8C8.5,12.7,8.5,12.7,8.5,12.8z" />
                  </svg>
                  <span className="inline-block ml-1">Login instead</span>
                </button>
              </div>
              <Link href="/">
                <button
                  type="button"
                  className="inline-flex justify-center items-center  text-base font-medium text-gray-500 border-transparent rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
