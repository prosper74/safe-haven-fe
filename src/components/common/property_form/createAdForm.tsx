import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDropzone } from 'react-dropzone';
import { Image } from 'cloudinary-react';
// import { setSnackbar } from '@src/store/reducers/feedbackReducer';
import { ForwardArrow } from '@src/components/common/svgIcons';
// import { singleProperties } from '../interfaces';
import { locations, propertyType, perPeriod } from '../propertyData';

interface IImageUpload {
  files: File[];
  onDrop: (acceptedFiles: File[]) => void;
  // acceptedFile: (acceptedFiles: File[]) => void;
}

const schema = z.object({
  images: z.any(),
  category: z.string(),
  state: z.string(),
  name: z
    .string()
    .min(5, { message: 'Title must be at at least 10 characters' })
    .max(50, { message: 'Title must not be more than 40 characters' }),
  city: z
    .string()
    .min(3, { message: 'Min 3 characters' })
    .max(20, { message: 'Max 20 characters' }),
  type: z.string(),
  bedroom: z.string(),
  bathroom: z.string(),
  sittingroom: z.string(),
  per: z.string(),
  size: z.string(),
  features: z.string(),
  price: z.string().min(2, { message: 'Please enter amount' }),
  description: z.string().min(1),
});

export const CreateAdForm: FC<IImageUpload> = () => {
  const dispatch = useDispatch();
  const [isCategory, setIsCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append('file', acceptedFile);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await fetch(url, {
        method: 'post',
        body: formData,
      });

      const data = await response.json();
      setUploadedFiles((old) => [...old, data]);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: 'images/*',
    multiple: true,
    maxFiles: 4,
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    setLoading(false);
    console.log('Data', data);
  });

  useEffect(() => {
    setSelectedCategory(watch('category'));
    setSelectedType(watch('type'));

    selectedCategory === 'Buy' ||
    selectedCategory === 'Rent' ||
    selectedCategory === 'Shortlet'
      ? setIsCategory(true)
      : setIsCategory(false);
  });

  console.log('uploadedFiles: ', uploadedFiles.length);
  // console.log('type: ', selectedType);

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="p-2 xs:p-0 mx-auto md:w-full  relative">
          <div className="bg-white shadow-lg w-full rounded-lg divide-y divide-gray-200">
            {uploadedFiles.length >= 4 ? (
              <h3 className="text-center text-xl font-bold mb-2">
                You have uploaded Up to four images
              </h3>
            ) : (
              <div
                {...getRootProps()}
                className={`h-auto m-3 p-3 border-2 border-dashed border-red-500 cursor-pointer md:text-xl text-center ${
                  isDragActive && 'border-purple-600'
                }`}
              >
                <input {...getInputProps()} />
                Drag and drop some files here, or click to select files.Min 1
                file and Max 4 images
              </div>
            )}

            <ul className="flex flex-row justify-center">
              {uploadedFiles.map((file) => (
                <li key={file.public_id} className="mr-1">
                  <Image
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                    publicId={file.public_id}
                    width="150"
                    height="150"
                    crop="scale"
                  />
                </li>
              ))}
            </ul>
            {/* Form Fields */}
            <div className="px-3 py-4">
              <form>
                <div className="grid grid-cols-2 gap-2">
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
                        <option key={location.name} value={location.name}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {isCategory && (
                    <>
                      {/* Title */}
                      <div>
                        <input
                          id="name"
                          autoComplete="title"
                          placeholder="Property Title"
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
                      {/* City */}
                      <div>
                        <input
                          autoComplete="city"
                          placeholder="City"
                          type="text"
                          {...register('city')}
                          className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                            errors.city &&
                            'border-red-500 text-red-500 focus:outline-red-500'
                          }`}
                        />
                        {errors.city?.message && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.city?.message}
                          </p>
                        )}
                      </div>
                      {/* Type */}
                      <div>
                        <select
                          {...register('type')}
                          className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                            errors.phone &&
                            'border-red-500 text-red-500 focus:outline-red-500'
                          }`}
                        >
                          {propertyType.map((type) => (
                            <option key={type.name} value={type.name}>
                              {type.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Bedrooms */}
                      {selectedType !== 'Land' && (
                        <div>
                          <select
                            {...register('bedroom')}
                            className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                              (d: number) => (
                                <option key={d} value={d}>
                                  {d} Bedroom{d > 1 && 's'}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      )}
                      {/* Bathrooms */}
                      {selectedType !== 'Land' && (
                        <div>
                          <select
                            {...register('bathroom')}
                            className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                              (d: number) => (
                                <option key={d} value={d}>
                                  {d} Bathroom{d > 1 && 's'}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      )}
                      {/* Sitting Room */}
                      {selectedType !== 'Land' && (
                        <div>
                          <select
                            {...register('sittingroom')}
                            className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
                          >
                            {[1, 2, 3, 4, 5, 6, 7].map((d: number) => (
                              <option key={d} value={d}>
                                {d} Sitting Room{d > 1 && 's'}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Period */}
                      {selectedCategory !== 'buy' && (
                        <div>
                          <select
                            {...register('per')}
                            className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full "
                          >
                            <option selected>Select Period</option>
                            {perPeriod.map((location) => (
                              <option key={location.name} value={location.name}>
                                per {location.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      {/* size */}
                      <div className="relative rounded-md shadow-sm">
                        <input
                          {...register('size')}
                          type="number"
                          placeholder="Land size in square meter"
                          className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
                        />
                        <div className="absolute top-2 right-10 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-lg">Sqr</span>
                        </div>
                      </div>
                      {/* features */}
                      <div className="col-span-2">
                        <textarea
                          {...register('features')}
                          className="focus:outline-purple-600 focus:rounded-lg bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full transition ease-in-out"
                          rows={3}
                          placeholder="Property features. Enter each feature in a new line"
                        ></textarea>
                      </div>
                      {/* Message */}
                      <div className="col-span-2">
                        <textarea
                          {...register('description')}
                          className="focus:outline-purple-600 focus:rounded-lg bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full transition ease-in-out"
                          id="exampleFormControlTextarea1"
                          rows={3}
                          placeholder="Give brief description about this property"
                        ></textarea>
                      </div>
                      {/* Price */}
                      <div className="col-span-2">
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center pointer-events-none">
                            <span className="text-gray-500 text-lg">₦</span>
                          </div>
                          <input
                            type="number"
                            // autoComplete="price"
                            placeholder="1200000"
                            className={`focus:outline-purple-600 pl-7 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                              errors.price &&
                              'border-red-500 text-red-500 focus:outline-red-500'
                            }`}
                            {...register('price')}
                          />
                        </div>
                        {errors.price?.message && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.price?.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={loading || !isCategory || uploadedFiles.length < 1}
                  className={`mt-5 transition duration-200 bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 w-full py-2.5 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 ${
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
        </div>
      </div>
    </>
  );
};
