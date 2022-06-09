import React, { FC, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { locations, propertyType, priceRange } from '../../propertyData';
import { CloseIcon, FilterIcon } from '../../svgIcons';

const FilterModal: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button onClick={openModal}>
        <FilterIcon width="30" height="30" fill="#9932cc" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Filter Properties
                  </Dialog.Title>

                  <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    {/* Form Fields */}
                    <div className="px-5 py-4">
                      <form>
                        <div className="grid grid-cols-2 gap-2">
                          {/* states */}
                          <div>
                            <select
                              className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full `}
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
                          {/* Type */}
                          <div>
                            <select
                              className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full `}
                            >
                              {propertyType.map((type) => (
                                <option key={type.name} value={type.name}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* Bedrooms */}
                          <div>
                            <select className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full">
                              <option value="any-bedroom">Any Bedroom</option>
                              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                                <option key={d} value={d}>
                                  {d}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* Price Range */}
                          <div>
                            <select
                              // {...register('price_range')}
                              className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
                            >
                              <option defaultValue="any">Price Range</option>
                              {priceRange.map(({ price }) => (
                                <option key={price} value={price}>
                                  {price}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <button
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                          >
                            Apply
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

export default FilterModal;
