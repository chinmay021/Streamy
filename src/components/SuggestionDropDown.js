import React from 'react';
import { TfiSearch } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNextPageToken,
  addVideos,
  changeCategory,
} from '../utils/videoSlice';

const SuggestionDropDown = ({
  suggestions,
  setLoading,
  setSuggestions,
  setSearchQuery,
}) => {
  const dispatch = useDispatch();

  const category = useSelector((store) => store.HomeVideos.category);
  const handleSetHomeVideoByKeyword = (searchText) => {
    if (category !== searchText) {
      dispatch(changeCategory(searchText));
      dispatch(addVideos([]));
      dispatch(addNextPageToken(undefined));
    }
    setLoading(true);
    setSuggestions([]);
    setSearchQuery('');
  };
  return (
    <div className='suggestionDropdown  absolute top-14 left-10 bg-white shadow-lg w-[calc(100%-37px)] lg:w-[calc(100%-100px)] h-fit rounded-xl'>
      {suggestions.map((suggestion, index) => {
        return (
          <div
            key={index}
            className='flex gap-2 cursor-pointer pl-4 py-1 items-center hover:bg-zinc-100 '
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
