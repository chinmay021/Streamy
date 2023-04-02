import { tags } from "../utils/constants";
// import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useEffect, useState } from "react";
import { handleScroll } from "../utils/helper";
import { useSelector, useDispatch } from "react-redux";
import { changeCategory } from "../utils/categorySlice";

const Tags = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [active, setActive] = useState("All");

  const dispatch = useDispatch();

  const handleSetHomeVideoByKeyword = (tag) => {
    if (active !== tag) {
      dispatch(changeCategory(tag));
      setActive(tag);
    }
  };

  useEffect(() => {
    handleScroll("tags-wrapper");
  }, []);
  return (
    <div
      className={`tags mx-4 flex text-sm items-center ${
        isMenuOpen
          ? "lg:w-[calc(100vw-19rem)] w-[calc(100vw-8rem)]"
          : "lg:w-[calc(100vw-8rem)] w-[calc(100vw-3rem)]"
      } min-w-[250px]
      pt-2`}
    >
      <div className="tags-wrapper flex w-full overflow-x-hidden overflow-y-hidden ">
        {tags.map((tag, index) => {
          return (
            <button
              className={`tag  px-3 w-fit py-2 mx-2 cursor-pointer rounded-lg ${
                active === tag
                  ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-900"
                  : " bg-gray-100  dark:text-white dark:bg-zinc-800"
              }`}
              key={index}
              onClick={() => handleSetHomeVideoByKeyword(tag)}
            >
              <span className="whitespace-nowrap">{tag}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;
