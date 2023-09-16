import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import emailjs from 'emailjs-com';
import { setSnackbar } from '@src/store/reducers/feedbackReducer';
import { CloseIcon, ForwardArrow } from '@src/components/common/svgIcons';
import { singleProperties } from '../interfaces';

interface IProps {
  property: singleProperties;
  setIsOpen: (open: boolean) => void;
}

const schema = z.object({
  name: z.string().min(5, { message: 'Name must be at at least 5 characters' }),
  email: z.string().email().nonempty({ message: 'Invalid email' }),
  phone: z.string().regex(/^[0]\d{10}$/, 'Phone number must be 11 digits'),  
  date: z.string().nonempty(),
  time: z.string().nonempty(),
});

export const VerifyProperty: FC<IProps> = ({ setIsOpen, property }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const dateToday = new Date().toISOString().split('T')[0];

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

    emailjs
      .send('service_05kvw8y', 'template_au4zqfz', data, 'FFD1CK1AWLApETK-P')
      .then(
        () => {
          dispatch(
            setSnackbar({
              status: 'success',
              message: ` Request Sent. We will contact you shortly`,
              open: true,
            })
          );
          setLoading(false);
          setIsOpen(false);
        },
        (error) => {
          dispatch(
            setSnackbar({
              status: 'error',
              message: ` ${error.text}`,
              open: true,
            })
          );
          setLoading(false);
        }
      );
  });

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="p-4 xs:p-0 mx-auto md:w-full md:max-w-md relative">
          <h3 className="font-bold text-2xl text-center mt-3">
            Verify This Property
          </h3>
          <p className="text-center font-bold text-lg mt-1">{property.name}</p>
          <p className="text-center">
            {property.city}, {property.state}
          </p>
          <p className="text-center mb-2">ID: {property.id}</p>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            {/* Form Fields */}
            <div className="px-5 py-4">
              <form>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <input
                      id="name"
                      autoComplete="name"
                      placeholder="Your Full Name"
                      type="text"
                      {...register('name')}
                      className={`focus:outline-purple-600 focus:rounded-lg bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                        errors.name &&
                        'border-red-500 text-red-500 focus:outline-red-500'
                      }`}
                    />
                    {errors.name?.message && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.name?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      id="email"
                      autoComplete="email"
                      placeholder="Your email"
                      type="text"
                      {...register('email')}
                      className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
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
                  <div>
                    <input
                      id="phone"
                      autoComplete="phone"
                      placeholder="Your Phone Number"
                      type="number"
                      {...register('phone')}
                      className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                        errors.phone &&
                        'border-red-500 text-red-500 focus:outline-red-500'
                      }`}
                    />
                    {errors.phone?.message && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.phone?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="date">Preferred Date:</label>
                    <input
                      type="date"
                      id="date"
                      min={dateToday}
                      required
                      {...register('date')}
                      className={`focus:outline-purple-600 focus:rounded-lg bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                        errors.date &&
                        'border-red-500 text-red-500 focus:outline-red-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label htmlFor="time">Preferred Time:</label>
                    <input
                      type="time"
                      id="time"
                      required
                      {...register('time')}
                      className={`focus:outline-purple-600 focus:rounded-lg bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                        errors.time &&
                        'border-red-500 text-red-500 focus:outline-red-500'
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={loading}
                  className={`mt-5 transition duration-200 bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 w-full py-2.5 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center ${
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

          <button onClick={closeModal} className="absolute top-2 right-4">
            <CloseIcon width="32" height="32" fill="#9333EA" />
          </button>
        </div>
      </div>
    </>
  );
};

