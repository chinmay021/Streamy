import { useRef, Fragment } from "react";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";

import { useSelector } from "react-redux";

import { BASE_URL } from "./../utils/constants";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import useIntersectionObserver from "./../utils/useIntersectionObserver";

const VideoContainer = () => {
  const category = useSelector((store) => store.videosCategory.category);

  let date = new Date();
  // eslint-disable-next-line
  date = encodeURIComponent(date.toJSON());
  let publishedAfter = new Date(Date.now() - 150 * 24 * 60 * 60 * 1000);
  // eslint-disable-next-line
  publishedAfter = encodeURIComponent(publishedAfter.toJSON());

  /* 
  `/search?part=snippet&order=viewCount&publishedAfter=${publishedAfter}&publishedBefore=${date}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`

  const response = await fetch(
          BASE_URL +
            `/search?part=snippet&order=viewCount&publishedAfter=${publishedAfter}&type=video&videoDuration=medium&publishedBefore=${date}&key=${
              process.env.REACT_APP_GOOGLE_API_KEY
            }&regionCode=IN&pageToken=${nextPageToken ?? ''}`
        );


  `/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=5&chart=mostPopular&regionCode=IN&pageToken=${nextPageToken ?? ""}&videoDuration=medium&key=` +
            process.env.REACT_APP_GOOGLE_API_KEY
 */

  const bottomRef = useRef();

  const onScreen = useIntersectionObserver(bottomRef, { threshold: 0.5 });

  const getVideos = async (nextPageToken = "") => {
    try {
      const response = await fetch(
        BASE_URL +
          `/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=8&chart=mostPopular&regionCode=IN&pageToken=${
            nextPageToken ?? ""
          }&videoDuration=medium&key=` +
          process.env.REACT_APP_GOOGLE_API_KEY_4
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isSuccess,
  } = useInfiniteQuery(
    ["home-videos", category],
    ({ pageParam = null }) =>
      category === "All"
        ? getVideos(pageParam)
        : searchVideoByKeyword(category, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.nextPageToken;
      },
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  const searchVideoByKeyword = async (searchText, nextPageToken = "") => {
    try {
      const response = await fetch(
        BASE_URL +
          `/search?part=snippet&maxResults=8&type=video&q=${searchText}&pageToken=${
            nextPageToken ?? ""
          }&videoDuration=medium&key=${process.env.REACT_APP_GOOGLE_API_KEY_5}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (onScreen) {
  //     fetchNextPage();
  //   }
  // }, [onScreen, fetchNextPage]);
  onScreen && fetchNextPage();

  return isLoading ? (
    <div>
      <Shimmer />
    </div>
  ) : (
    <>
      <div
        className=" grid justify-center justify-items-center grid-cols-[repeat(auto-fill,minmax(310px,_1fr))] max-xl:grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-[2rem_1rem] 
    pt-6 px-8 overflow-x-hidden"
      >
        {/* {console.log(data)} */}
        {isSuccess &&
          data?.pages.map((page, index) => {
            return (
              page?.items && <Fragment  key={index} >
                {page.items.map((video, index) => {
                  if (index === page.items.length - 1) {
                    return (
                      <Link
                        ref={bottomRef}
                        className="w-full"
                        to={`/watch?v=${video?.id?.videoId || video.id}`}
                        key={video?.id?.videoId || video.id}
                      >
                        <VideoCard video={video} />
                      </Link>
                    );
                  } else {
                    return (
                      <Link
                        className="w-full"
                        to={`/watch?v=${video?.id?.videoId || video.id}`}
                        key={video?.id?.videoId || video.id}
                      >
                        <VideoCard video={video} />
                      </Link>
                    );
                  }
                })}
              </Fragment>
            );
          })}
      </div>
      {isFetchingNextPage && <Shimmer />}
    </>
  );
};

export default VideoContainer;
