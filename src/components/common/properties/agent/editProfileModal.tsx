import React, { FC, Fragment, useCallback, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/router';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useDropzone } from 'react-dropzone';
// @ts-ignore
import { Image } from 'cloudinary-react';
import { setSnackbar } from '@src/store/reducers/feedbackReducer';
import { CloseIcon, ForwardArrow } from '../../svgIcons';
import { IImageUpload } from '../../interfaces';
import { locations } from '../../propertyData';
import ChangePasswordModal from './changePasswordModal';

interface IProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const schema = z.object({
  images: z.any(),
  name: z.string().min(1),
  email: z.string().email().min(1, { message: 'Invalid email' }),
  phone: z.string().regex(/^[0]\d{10}$/, 'Phone number must be 11 digits'),
  address: z.string(),
});

const EditProfileModal: FC<IProps> = ({ isOpen, setIsOpen }) => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passwordChangeModal, setPasswordChangeModal] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;

    acceptedFiles.forEach(async (acceptedFile: IImageUpload) => {
      const formData = new FormData();
      // @ts-ignore
      formData.append('file', acceptedFile);
      formData.append(
        'upload_preset',
        // @ts-ignore
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await fetch(url, {
        method: 'post',
        body: formData,
      });

      const data = await response.json();
      // @ts-ignore
      setUploadedFiles((old) => [...old, data]);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // @ts-ignore
    accepts: 'images/*',
    multiple: true,
    maxFiles: 1,
    minSize: 0,
    maxSize: 1000000,
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
    setLoading(true);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_REST_API}/verifications`,
        {
          identity: data.identity,
          address: data.address,
          images: uploadedFiles,
          verifying: true,
          users_permissions_user: user,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        dispatch(
          setSnackbar({
            status: 'success',
            message: ` Documents Submitted Successfully and will be reviewed within 24 hours`,
            open: true,
          })
        );
        router.push('/agent/account');
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          setSnackbar({
            status: 'error',
            message: ` There was an error. Please try again later`,
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
                <Dialog.Panel className="w-full max-w-2xl max-h-[32rem] transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Profile
                  </Dialog.Title>
                  <Dialog.Title
                    as="p"
                    className="text-base leading-6 text-gray-900"
                  >
                    Edit your profile deatils
                  </Dialog.Title>

                  <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 mt-3">
                    {/* Form Fields */}
                    <div className="p-2 sm:px-5 sm:py-4">
                      {/* Uploaded Images */}
                      {uploadedFiles.length >= 1 ? (
                        <h3 className="text-center text-xl font-bold mb-2">
                          your profile photo has been uploaded
                        </h3>
                      ) : (
                        <div
                          {...getRootProps()}
                          className={`h-auto m-3 p-3 border-2 border-dashed border-red-500 cursor-pointer md:text-xl text-center ${
                            isDragActive && 'border-purple-600'
                          }`}
                        >
                          <input {...getInputProps()} />
                          Drag'n'drop your file here. Select only one image. Max
                          file size 1mb
                        </div>
                      )}
                      <div className="flex flex-row justify-center">
                        {uploadedFiles.map((file: IImageUpload) => (
                          <li key={file.public_id} className="mr-1">
                            <Image
                              cloudName={
                                process.env.NEXT_PUBLIC_CLOUDINARY_NAME
                              }
                              publicId={file.public_id}
                              width="150"
                              height="150"
                              crop="scale"
                              className="object-cover rounded-full"
                            />
                          </li>
                        ))}
                      </div>
                      <form>
                        <div className="px-3 py-4">
                          <form>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {/* Name field */}
                              <div>
                                <p className="text-base font-medium leading-6 text-gray-900">
                                  Full Name
                                </p>
                                <input
                                  autoComplete="name"
                                  placeholder={user.username}
                                  type="text"
                                  {...register('name')}
                                  className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full placeholder-gray-800 ${
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
                              {/* Email Field */}
                              <div>
                                <p className="text-base font-medium leading-6 text-gray-900">
                                  Email
                                </p>
                                <input
                                  autoComplete="email"
                                  placeholder={user.email}
                                  type="email"
                                  {...register('email')}
                                  className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full placeholder-gray-800 ${
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
                              {/* Phone Field  */}
                              <div>
                                <p className="text-base font-medium leading-6 text-gray-900">
                                  Phone Number
                                </p>
                                <input
                                  id="phone"
                                  autoComplete="phone"
                                  placeholder={user.phone}
                                  type="number"
                                  {...register('phone')}
                                  className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full placeholder-gray-800 ${
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
                              {/* Password Field */}
                              <div>
                                <p className="text-base font-medium leading-6 text-gray-900">
                                  Change Password
                                </p>
                                <input
                                  placeholder="**********"
                                  type="text"
                                  className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full placeholder-gray-800"
                                  onClick={() =>
                                    setPasswordChangeModal(!passwordChangeModal)
                                  }
                                />
                              </div>
                              <div>
                                <select
                                  id="category"
                                  placeholder="Select Category"
                                  {...register('category')}
                                  className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full  ${
                                    errors.phone &&
                                    'border-red-500 text-red-500 focus:outline-red-500'
                                  }`}
                                >
                                  <option selected>Select a Category</option>
                                  <option value="Buy">Buy</option>
                                  <option value="Rent">Rent</option>
                                  <option value="Shortlet">Shortlet</option>
                                </select>
                              </div>
                              {/* Location */}
                              <div>
                                <select
                                  {...register('state')}
                                  className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                                    errors.phone &&
                                    'border-red-500 text-red-500 focus:outline-red-500'
                                  }`}
                                >
                                  {locations.map((location) => (
                                    <option
                                      key={location.name}
                                      value={location.name}
                                    >
                                      {location.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={onSubmit}
                              disabled={loading || uploadedFiles.length < 1}
                              className={`mt-5 transition duration-200 bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 w-full py-2.5 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 ${
                                loading
                                  ? 'hover:bg-purple-300 text-gray-300'
                                  : 'hover:bg-purple-700 text-white'
                              }`}
                            >
                              <span className="mr-2">Submit</span>
                              {loading ? (
                                <div className="border-b-2 border-purple-600 rounded-full animate-spin w-6 h-6 " />
                              ) : (
                                <ForwardArrow />
                              )}
                            </button>
                          </form>
                        </div>

                        <div className="flex justify-between mt-4">
                          <button
                            disabled={loading || uploadedFiles.length < 2}
                            className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
                            onClick={onSubmit}
                          >
                            <span className="mr-2">Submit</span>
                            {loading ? (
                              <div className="border-b-2 border-purple-600 rounded-full animate-spin w-5 h-5 " />
                            ) : (
                              <ForwardArrow />
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                    <ChangePasswordModal
                      isOpen={passwordChangeModal}
                      setIsOpen={setPasswordChangeModal}
                    />
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

export default EditProfileModal;
