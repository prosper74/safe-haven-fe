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

interface IProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const schema = z.object({
  images: z.any(),
  identity: z.string(),
  address: z.string(),
});

const VerificationModal: FC<IProps> = ({ isOpen, setIsOpen }) => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

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
    maxFiles: 2,
    minSize: 0,
    maxSize: 1000000,
  });

  const { register, handleSubmit } = useForm({
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
                <Dialog.Panel className="w-full max-w-xl max-h-[32rem] transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Account Verification
                  </Dialog.Title>
                  <Dialog.Title
                    as="p"
                    className="text-base leading-6 text-gray-900"
                  >
                    Please provide valid documents to verify your account. Note
                    all files must be image format (PNG/JPEG). Image size should
                    not exceed 1MB
                  </Dialog.Title>

                  <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 mt-3">
                    {/* Form Fields */}
                    <div className="p-2 sm:px-5 sm:py-4">
                      <form>
                        <div className="grid gap-2">
                          {/* ID Verification */}
                          <p className="text-base font-medium leading-6 text-gray-900">
                            Identity verification
                          </p>
                          <div>
                            <select
                              {...register('identity')}
                              className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full `}
                            >
                              <option value="International passport">
                                International Passport
                              </option>
                              <option value="Drivers licence">
                                Drivers Licence
                              </option>
                              <option value="ID card">
                                ID card (Issued by the government)
                              </option>
                            </select>
                          </div>
                          {/* Address Verification  */}
                          <p className="text-base font-medium leading-6 text-gray-900">
                            Address verification
                          </p>
                          <div>
                            <select
                              {...register('address')}
                              className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
                            >
                              <option value="Bank statement">
                                Bank statement
                              </option>
                              <option value="Utility bill">Utility bill</option>
                            </select>
                          </div>
                          {/* Uploaded Images */}
                          {uploadedFiles.length >= 3 ? (
                            <h3 className="text-center text-xl font-bold mb-2">
                              You have uploaded Up to three (3) images
                            </h3>
                          ) : (
                            <div
                              {...getRootProps()}
                              className={`h-auto m-3 p-3 border-2 border-dashed border-red-500 cursor-pointer md:text-xl text-center ${
                                isDragActive && 'border-purple-600'
                              }`}
                            >
                              <input {...getInputProps()} />
                              Please, upload images for the document types
                              selected. Max 3 images and min 2 images
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
                                  className="object-cover"
                                />
                              </li>
                            ))}
                          </div>
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

export default VerificationModal;
