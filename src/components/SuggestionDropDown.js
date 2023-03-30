import React from 'react';
import { TfiSearch } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCategory,
} from '../utils/categorySlice';

const SuggestionDropDown = ({
  suggestions,
  setLoading,
  setSuggestions,
  setSearchQuery,
}) => {
  const dispatch = useDispatch();

  const category = useSelector((store) => store.videosCategory.category);
  const handleSetHomeVideoByKeyword = (searchText) => {
    if (category !== searchText) {
      dispatch(changeCategory(searchText));
    }
    setLoading(true);
    setSuggestions([]);
    setSearchQuery('');
  };
  return (
    <div className='suggestionDropdown  absolute top-14 left-10 bg-white shadow-lg w-[calc(100%-37px)] lg:w-[calc(100%-100px)] h-fit rounded-xl dark:text-white dark:bg-zinc-800'>
      {suggestions.map((suggestion, index) => {
        return (
          <div
            key={index}
            className='flex gap-2 cursor-pointer pl-4 py-1 items-center hover:bg-zinc-100 dark:hover:bg-zinc-700 '
            onClick={() => handleSetHomeVideoByKeyword(suggestion)}
          >
            <TfiSearch size='1.1rem' className='flex-none' />
            {suggestion}
          </div>
        );
      })}
    </div>
  );
};

export default SuggestionDropDown;
