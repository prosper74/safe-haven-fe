import React, { FC, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import { setUser } from '@src/store/reducers/userReducer';
import { setSnackbar } from '@src/store/reducers/feedbackReducer';
import {
  EyeIcon,
  EyeSlashIcon,
  ForwardArrow,
} from '@src/components/common/svgIcons';

interface IProps {
  setIsOpen: (open: boolean) => void;
  setSelectedStep: (open: number) => void;
  steps: any;
}

const schema = z.object({
  email: z.string().email().nonempty({ message: 'Invalid email' }),
  password: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Password must be atleast 8 characters, and must contain uppercase, lowercase, number and special character'
    ),
});

export const RequestProperty: FC<IProps> = ({
  setIsOpen,
  steps,
  setSelectedStep,
}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateForgotPassword = () => {
    const forgotPassword = steps.find(
      (step: { label: string }) => step.label === 'Forgot Password'
    );
    setSelectedStep(steps.indexOf(forgotPassword));
  };

  const navigateSignup = () => {
    const signUp = steps.find(
      (step: { label: string }) => step.label === 'Sign Up'
    );
    setSelectedStep(steps.indexOf(signUp));
  };

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
        identifier: data.email,
        password: data.password,
      })
      .then((response) => {
        dispatch(
          setUser({
            ...response.data.user,
            jwt: response.data.jwt,
            onboarding: true,
          })
        );
        dispatch(
          setSnackbar({
            status: 'success',
            message: ` Welcome Back ${response.data.user.username.toUpperCase()}`,
            open: true,
          })
        );
        setLoading(false);
        setIsOpen(false);
      })
      .catch((error) => {
        const { message } = error.response.data.message[0].messages[0];
        if (message === 'Your account email is not confirmed') {
          dispatch(
            setSnackbar({
              status: 'error',
              message: message + '. Resend Email Confirmation',
              open: true,
            })
          );
          const resend = steps.find(
            (step: { label: string }) =>
              step.label === 'Resend Email Confirmation'
          );
          setSelectedStep(steps.indexOf(resend));
          setLoading(false);
        } else {
          dispatch(setSnackbar({ status: 'error', message, open: true }));
          setLoading(false);
        }
      });
  });

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="p-4 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h3 className="font-bold text-xl text-center mt-3 mb-6">
            Request A Property
          </h3>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            {/* Form Fields */}
            <div className="px-5 py-4">
              <form>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className={`font-semibold text-base pb-1 block ${
                      errors.email ? 'text-red-500' : 'text - gray - 600'
                    }`}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    autoComplete="email"
                    type="text"
                    {...register('email')}
                    className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                      errors.email &&
                      'border-red-500 text-red-500 focus:outline-red-500'
                    }`}
                  />
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className={`font-semibold text-base pb-1 block ${
                      errors.password ? 'text-red-500' : 'text - gray - 600'
                    }`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      autoComplete="password"
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
                  <span className="mr-2">Login</span>
                  {loading ? (
                    <div className="border-b-2 border-white rounded-full animate-spin w-6 h-6 "></div>
                  ) : (
                    <ForwardArrow />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const InspectProperty: FC<IProps> = ({
  setIsOpen,
  steps,
  setSelectedStep,
}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateForgotPassword = () => {
    const forgotPassword = steps.find(
      (step: { label: string }) => step.label === 'Forgot Password'
    );
    setSelectedStep(steps.indexOf(forgotPassword));
  };

  const navigateSignup = () => {
    const signUp = steps.find(
      (step: { label: string }) => step.label === 'Sign Up'
    );
    setSelectedStep(steps.indexOf(signUp));
  };

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
        identifier: data.email,
        password: data.password,
      })
      .then((response) => {
        dispatch(
          setUser({
            ...response.data.user,
            jwt: response.data.jwt,
            onboarding: true,
          })
        );
        dispatch(
          setSnackbar({
            status: 'success',
            message: ` Welcome Back ${response.data.user.username.toUpperCase()}`,
            open: true,
          })
        );
        setLoading(false);
        setIsOpen(false);
      })
      .catch((error) => {
        const { message } = error.response.data.message[0].messages[0];
        if (message === 'Your account email is not confirmed') {
          dispatch(
            setSnackbar({
              status: 'error',
              message: message + '. Resend Email Confirmation',
              open: true,
            })
          );
          const resend = steps.find(
            (step: { label: string }) =>
              step.label === 'Resend Email Confirmation'
          );
          setSelectedStep(steps.indexOf(resend));
          setLoading(false);
        } else {
          dispatch(setSnackbar({ status: 'error', message, open: true }));
          setLoading(false);
        }
      });
  });

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="p-4 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h3 className="font-bold text-xl text-center mt-3 mb-6">
            Inspect This Property
          </h3>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            {/* Form Fields */}
            <div className="px-5 py-4">
              <form>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className={`font-semibold text-base pb-1 block ${
                      errors.email ? 'text-red-500' : 'text - gray - 600'
                    }`}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    autoComplete="email"
                    type="text"
                    {...register('email')}
                    className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                      errors.email &&
                      'border-red-500 text-red-500 focus:outline-red-500'
                    }`}
                  />
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className={`font-semibold text-base pb-1 block ${
                      errors.password ? 'text-red-500' : 'text - gray - 600'
                    }`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      autoComplete="password"
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
                  <span className="mr-2">Login</span>
                  {loading ? (
                    <div className="border-b-2 border-white rounded-full animate-spin w-6 h-6 "></div>
                  ) : (
                    <ForwardArrow />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const VerifyProperty: FC<IProps> = ({
  setIsOpen,
  steps,
  setSelectedStep,
}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateForgotPassword = () => {
    const forgotPassword = steps.find(
      (step: { label: string }) => step.label === 'Forgot Password'
    );
    setSelectedStep(steps.indexOf(forgotPassword));
  };

  const navigateSignup = () => {
    const signUp = steps.find(
      (step: { label: string }) => step.label === 'Sign Up'
    );
    setSelectedStep(steps.indexOf(signUp));
  };

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
        identifier: data.email,
        password: data.password,
      })
      .then((response) => {
        dispatch(
          setUser({
            ...response.data.user,
            jwt: response.data.jwt,
            onboarding: true,
          })
        );
        dispatch(
          setSnackbar({
            status: 'success',
            message: ` Welcome Back ${response.data.user.username.toUpperCase()}`,
            open: true,
          })
        );
        setLoading(false);
        setIsOpen(false);
      })
      .catch((error) => {
        const { message } = error.response.data.message[0].messages[0];
        if (message === 'Your account email is not confirmed') {
          dispatch(
            setSnackbar({
              status: 'error',
              message: message + '. Resend Email Confirmation',
              open: true,
            })
          );
          const resend = steps.find(
            (step: { label: string }) =>
              step.label === 'Resend Email Confirmation'
          );
          setSelectedStep(steps.indexOf(resend));
          setLoading(false);
        } else {
          dispatch(setSnackbar({ status: 'error', message, open: true }));
          setLoading(false);
        }
      });
  });

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="p-4 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h3 className="font-bold text-xl text-center mt-3 mb-6">
            Verify This Property
          </h3>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            {/* Form Fields */}
            <div className="px-5 py-4">
              <form>
                <div className="grid grid-cols-2 gap-2">
                  <div className="mb-5">
                    <input
                      id="email"
                      autoComplete="email"
                      placeholder="Your email"
                      type="text"
                      {...register('email')}
                      className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                        errors.email &&
                        'border-red-500 text-red-500 focus:outline-red-500'
                      }`}
                    />
                    {errors.email?.message && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-5">
                    <input
                      id="email"
                      autoComplete="email"
                      placeholder="Your email"
                      type="text"
                      {...register('email')}
                      className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                        errors.email &&
                        'border-red-500 text-red-500 focus:outline-red-500'
                      }`}
                    />
                    {errors.email?.message && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
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
                  <span className="mr-2">Login</span>
                  {loading ? (
                    <div className="border-b-2 border-white rounded-full animate-spin w-6 h-6 "></div>
                  ) : (
                    <ForwardArrow />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
