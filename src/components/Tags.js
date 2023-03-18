import { tags } from '../utils/constants';
// import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { handleScroll } from '../utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNextPageToken,
  addVideos,
  changeCategory,
} from '../utils/videoSlice';

const Tags = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [active, setActive] = useState('All');

  const dispatch = useDispatch();

  const handleSetHomeVideoByKeyword = (tag) => {
    // searchVideoByKeyword(tag);
    dispatch(changeCategory(tag));
    dispatch(addVideos([]));
    dispatch(addNextPageToken(undefined));
    setActive(tag);
  };

  useEffect(() => {
    handleScroll('tags-wrapper');
  }, []);
  return (
    <div
      className={`tags mx-4 flex text-sm items-center ${
        isMenuOpen ? 'w-[calc(100vw-18rem)]' : 'w-[calc(100vw-8rem)]'
      } min-w-[250px]
      pt-2`}
      //relative top-0 left-0
    >
      {/* <button
        className=" absolute left-0 bg-white rounded-[50%] shadow-[0_0_10px_#999] "
        id="btn-scroll-left"
        onClick={scrollHorizontally(-1)}
      >
        <BiChevronLeft size="2rem" />
      </button> */}
      <div className='tags-wrapper flex w-full overflow-x-hidden overflow-y-hidden '>
        {tags.map((tag, index) => {
          return (
            <div
              className={`tag px-3 w-fit py-2 mx-2 border-none cursor-pointer rounded-lg bg-gray-100 ${
                active === tag ? 'bg-slate-900 text-white' : ''
              }`}
              key={index}
              onClick={() => handleSetHomeVideoByKeyword(tag)}
            >
              <span className='whitespace-nowrap'>{tag}</span>
            </div>
          );
        })}
      </div>

      {/* <button
        className="absolute right-0  bg-red-400 rounded-[50%] "
        id="btn-scroll-right"
        onClick={scrollHorizontally(-1)}
      >
        <BiChevronRight size="2rem" />
      </button> */}
    </div>
  );
};

export default Tags;
