import React, { FC, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { setSnackbar } from '@src/store/reducers/feedbackReducer';
import {
  EyeIcon,
  EyeSlashIcon,
  ForwardArrow,
  BackArrowIcon,
} from '@src/components/common/svgIcons';

const schema = z.object({
  password: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Password must be atleast 8 characters, and must contain uppercase, lowercase, number and special character'
    ),
  confirmPassword: z
    .string()
    .min(8, { message: 'Must be at least 8 characters' }),
});

const ResetPasswordPage: FC = () => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.onboarding) {
      router.push('/');
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    if (data.confirmPassword !== data.password) {
      setConfirmPasswordError(true);
    } else {
      setLoading(true);
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      axios
        .post(`${process.env.NEXT_PUBLIC_REST_API}/auth/reset-password`, {
          code,
          password: data.password,
          passwordConfirmation: data.confirmPassword,
        })
        .then(() => {
          setConfirmPasswordError(false);
          dispatch(
            setSnackbar({
              status: 'success',
              message: ` Password Changed. Please loging with your new password`,
              open: true,
            })
          );
          setLoading(false);
          router.push('/');
        })
        .catch((error) => {
          setConfirmPasswordError(false);
          const { message } = error.response.data.message[0].messages[0];
          dispatch(
            setSnackbar({
              status: 'error',
              message:
                message +
                ' Kindly request another code by filling out the Forgot Password form',
              open: true,
            })
          );
          setLoading(false);
        });
    }
  });

  return (
    <>
      <Head>
        <title>Safe Haven | Reset Password</title>
        <link rel="icon" href="/favicon.png" />
        <meta content="Reset your password" />
      </Head>

      {!user.jwt && !user.onboarding ? (
        <div className="flex flex-col justify-center mt-16 px-3 py-16 sm:p-16">
          <div className="p-4 xs:p-0 mx-auto md:w-full md:max-w-md shadow-lg rounded-lg">
            <p className="text-2xl font-bold text-center mt-6">
              Reset Your Password?
            </p>
            <p className="text-base font-normal text-center px-4 mb-6">
              Kindly input your new password and conrfim the password
            </p>
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
              {/* Reset Password Fields */}
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
                          <EyeSlashIcon width="26" height="26" fill="#9333EA" />
                        ) : (
                          <EyeIcon width="26" height="26" fill="#9333EA" />
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
                          <EyeSlashIcon width="26" height="26" fill="#9333EA" />
                        ) : (
                          <EyeIcon width="26" height="26" fill="#9333EA" />
                        )}
                      </div>
                    </div>
                    {errors.confirmPassword?.message && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.confirmPassword?.message}
                      </p>
                    )}
                    {confirmPasswordError && (
                      <p className="text-red-500 text-sm mt-2">
                        Passwords do not match!
                      </p>
                    )}
                  </div>

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
                      <ForwardArrow />
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Return Home  */}
            <div className="py-1">
              <div className="grid grid-cols-2 xs:gap-4 md:gap-32">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <Link href="/">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-base rounded-lg text-gray-900 hover:bg-purple-100 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset flex items-center">
                      <BackArrowIcon width="22" height="22" />
                      <span className="inline-block ml-1">Home</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center my-32 p-2 md:p-16">
          <p className="text-center text-2xl font-bold">
            You Are already Logged in
          </p>
        </div>
      )}
    </>
  );
};

export default ResetPasswordPage;
