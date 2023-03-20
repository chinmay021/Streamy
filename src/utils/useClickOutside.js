import { useRef, useEffect } from "react";

const useClickOutside = (handler) => {
  const domNode = useRef(null);

  useEffect(() => {
    const handleToggle = (event) => {
      if (
        domNode.current &&
        !domNode.current.contains(event.target)
      ) {
        handler();
      }
      // console.log(locationSideBarRef.current);
    };

    document.body.addEventListener("click", handleToggle);

    return () => {
      document.body.removeEventListener("click", handleToggle);
    };
  }, []);
  return domNode;
};

export default useClickOutside;
