import { useEffect, useState } from "react";

const useIntersectionObserver = (ref, options) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // this array destructuring is to get the first element of the array similar to what we do in useState

      /* const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            // rest of the function
            }, options); 
        */

      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        //eslint-disable-next-line
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isVisible;
};

export default useIntersectionObserver;
