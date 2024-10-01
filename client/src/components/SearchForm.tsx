import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbPointFilled } from 'react-icons/tb';
import { IoIosSearch } from 'react-icons/io';
import clsx from 'clsx';
interface SearchFormProps {
  isWhite?: boolean;
  isGray?: boolean;
  placeHolder?: string;
  query?: string;
}
const SearchForm = ({
  isWhite,
  isGray,
  placeHolder = 'Search',
  query,
}: SearchFormProps) => {
  const [searchText, setSearchText] = useState<string>(query ?? '');
  const handleSearchSubmit = (e: React.FormEvent) => {
    if (!searchText.trim()) {
      e.preventDefault();
    }
  };
  return (
    <form
      method="GET"
      action="/search"
      className={clsx(
        'w-full border-[1px]  px-4 py-[9px] rounded-full flex relative',
        isWhite && 'border-[#ffffff80]',
        isGray && 'border-gray-300 bg-gray-100'
      )}
      onSubmit={handleSearchSubmit}
    >
      <input
        id="searchInputHeader"
        name="q"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        autoComplete="off"
        className={clsx(
          'ms-2 outline-none text-ellipsis border-none my-auto flex-1 bg-transparent',
          isWhite &&
            ' text-white placeholder:text-white placeholder:opacity-80 placeholder:font-bold',
          isGray && 'text-color'
        )}
        placeholder={placeHolder}
      />
      <div
        className={clsx(
          'w-[1px] h-full',
          isWhite && 'bg-white',
          isGray && 'bg-gray-200'
        )}
      ></div>
      <button
        type="submit"
        disabled={!searchText.trim()} // Disable the button if search text is empty
      >
        <IoIosSearch
          fontSize={22}
          className={clsx(
            'my-auto mx-3',
            isWhite && 'text-white',
            isGray && 'text-gray-400'
          )}
        />
      </button>
      <div
        id="searchPopupHeader"
        className={clsx(
          'p-4 hidden z-30 absolute  shadow-custom rounded-md top-[55px] start-0 end-0',
          isWhite && 'bg-black',
          isGray && 'bg-white'
        )}
      >
        <p
          className={clsx(
            'font-bold text-[12px] ',
            isWhite && 'text-white opacity-80',
            isGray && 'text-gray-400'
          )}
        >
          You may like
        </p>
        <div className="flex mt-2 gap-3">
          <TbPointFilled
            className={clsx(
              ' my-auto',
              isWhite && 'text-white',
              isGray && 'text-gray-300'
            )}
            fontSize={14}
          />
          <Link
            to={`/search?q=${'Trend tập nhảy từng quen'}`}
            className={clsx(
              'font-semibold text-[16px]',
              isWhite && 'text-white opacity-90'
            )}
          >
            Trend Tập Nhảy Từng Quen
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
