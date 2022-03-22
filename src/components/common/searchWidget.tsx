// index.tsx
import React, { FC, useState } from 'react';
import { SearchIcon, CloseIcon } from '@src/components/common/svgIcons';
import { singleProperties } from '@src/components/common/interfaces';
import Link from 'next/link';

interface IProps {
  properties: singleProperties;
  width: string;
  height: string;
  fill: string;
  placeholder: string;
}

const SearchWidget: FC<IProps> = ({ properties, placeholder }) => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  const handleFilter = (e: any) => {
    const searchedWords = e.target.value;
    setWordEntered(searchedWords);
    const newFilter = properties.filter(
      (d: singleProperties) =>
        d.name.toLowerCase().includes(searchedWords.toLowerCase()) ||
        d.description.toLowerCase().includes(searchedWords.toLowerCase())
    );

    if (searchedWords === '') {
      setFilteredProperties([]);
    } else {
      setFilteredProperties(newFilter);
    }
  };

  const handleClose = () => {
    setFilteredProperties([]);
    setWordEntered('');
  };

  return (
    <>
      {/* Search Input  */}
      <div className="relative">
        <input
          className="w-full p-5 bg-white text-xl text-darkBlueGray-400 placeholder-darkBlueGray-400 outline-none rounded-xl shadow-lg"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="absolute top-5 right-3 transition duration-200">
          {filteredProperties.length != 0 ? (
            <button className="hover:cursor-pointer" onClick={handleClose}>
              <CloseIcon width="30" height="30" fill="#9333EA" />
            </button>
          ) : (
            <SearchIcon width="26" height="26" fill="#9333EA" />
          )}
        </div>
      </div>

      {/* Search Results  */}
      {filteredProperties.length != 0 && (
        <div className="mt-2 p-2 max-h-64 w-full bg-white shadow-lg rounded-xl overflow-hidden overflow-y-auto transition-all duration-200">
          {filteredProperties.slice(0, 15).map((d: singleProperties) => (
            <Link
              href={
                d.name
                  ? `/${d?.category?.name.toLowerCase()}/${d?.name
                      .toLowerCase()
                      .replace(/ /g, '-')}&id=${d.id}`
                  : ''
              }
            >
              <a>
                <div
                  key={d.id}
                  className="my-2 p-3 hover:bg-gray-300 hover:rounded-lg grid grid-cols-4 sm:grid-cols-5"
                >
                  <img
                    src={d.images[0].url}
                    alt={d.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full"
                  />
                  <div className="col-span-3 sm:col-span-4">
                    <p className="font-medium">{d.name.substring(0, 28)}</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-purple-600 font-bold text-lg">
                        ₦{Number(d.price).toLocaleString()}
                      </h3>
                      <div className="mr-2 px-4 py-1 bg-purple-600 rounded-xl text-white">
                        {d.category.name}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchWidget;
