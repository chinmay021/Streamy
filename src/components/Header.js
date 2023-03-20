import { RxHamburgerMenu } from 'react-icons/rx';
import { TfiSearch } from 'react-icons/tfi';
import { MdKeyboardVoice } from 'react-icons/md';
import { RiVideoAddLine } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assests/logo.png';
import { toggleMenu, toggleSideBar } from '../utils/appSlice';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useDebounce from '../utils/useDebounce';
import { YOUTUBE_SEARCH_SUGGESTION_API_URL } from '../utils/constants';
import SuggestionDropDown from './SuggestionDropDown';
import useClickOutside from './../utils/useClickOutside';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debounceSearchText = useDebounce(searchQuery, 200);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useClickOutside(() => setLoading(true));

  const dispatch = useDispatch();

  const route = useLocation();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const toggleSideBarHandler = () => {
    dispatch(toggleSideBar());
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getAutocompletion = async (searchText) => {
      console.log(searchText);
      const response = await fetch(
        YOUTUBE_SEARCH_SUGGESTION_API_URL + searchText,
        signal
      );
      const data = await response.json();
      setSuggestions(data[1]);
      setLoading(false);
    };

    if (debounceSearchText.length > 2) {
      getAutocompletion(debounceSearchText);
    }

    return () => {
      controller.abort('cancel request');
    };
  }, [debounceSearchText]);

  return (
    <div className='px-4 py-2 flex justify-between  border items-center shadow-sm  w-full sticky top-0 z-10 bg-white h-[4.62rem] outline'>
      <div className='left-items flex items-center'>
        <button className=' p-2 rounded-full hover:bg-zinc-200  '>
          <RxHamburgerMenu
            size='1.5rem'
            title='hambergur menu'
            className='cursor-pointer'
            onClick={
              route.pathname === '/watch'
                ? toggleSideBarHandler
                : toggleMenuHandler
            }
          />
        </button>
        <div className='logo cursor-pointer flex items-center max-md:hidden'>
          <a href='/'>
            <img src={logo} alt='logo' title='logo' className='w-36' />
          </a>
        </div>
      </div>
      <div className='center w-3/5 2xl:w-2/5 max-sm:w-4/5 max-sm:ml-2 max-sm:mr-4 flex items-center ml-16 relative '>
        <div className='searchbar  flex-1 flex items-center ml-10 rounded-3xl border-2'>
          <input
            ref={inputRef}
            type='text'
            placeholder='Search'
            value={searchQuery}
            className=' rounded-l-3xl p-2 pl-8 focus:outline-none w-full'
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setLoading(true);
            }}
            onFocus={(e) => {
              setLoading(false);
            }}
            // onBlur={(e) => {
            //   setLoading(true);
            // }}
          />
          <div className='p-3 cursor-pointer hover:bg-zinc-200 px-8 rounded-r-3xl bg-zinc-100 border-l-2 border-zinc-200 max-md:bg-white max-md:border-none max-md:px-4 max-lg:px-4'>
            <TfiSearch size='1.2rem' className='' />
          </div>
        </div>
        <div className='voice-icon max-lg:hidden ml-4 p-2 hover:bg-zinc-200 rounded-full cursor-pointer'>
          <MdKeyboardVoice size='1.5rem' />
        </div>
        {!loading && (
          <SuggestionDropDown
            suggestions={suggestions}
            setLoading={setLoading}
            setSuggestions={setSuggestions}
            setSearchQuery={setSearchQuery}
          />
        )}
      </div>
      <div className='right-menu max-sm:hidden flex  items-center ml-16 gap-5 p-2'>
        <div className='p-2 hover:bg-zinc-200 rounded-full cursor-pointer'>
          <RiVideoAddLine size='1.5rem' />
        </div>
        <div className='p-2 hover:bg-zinc-200 rounded-full cursor-pointer'>
          <IoMdNotificationsOutline size='1.5rem' />
        </div>
        <div className='p-2  hover:bg-zinc-200 rounded-full cursor-pointer'>
          <FaUserCircle size='1.5rem' />
        </div>
      </div>
    </div>
  );
};

export default Header;
