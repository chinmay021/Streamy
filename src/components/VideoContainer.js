import { useState, useEffect, useRef } from 'react';
import VideoCard from './VideoCard';
import Shimmer from './Shimmer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addNextPageToken, addVideos } from '../utils/videoSlice';
import { BASE_URL } from './../utils/constants';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const videos = useSelector((store) => store.HomeVideos.videos);
  const nextPageToken = useSelector((store) => store.HomeVideos.nextPageToken);
  const category = useSelector((store) => store.HomeVideos.category);
  const dispatch = useDispatch();
  // const [nextPage, setNextPage] = useState(undefined);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState([]);

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

  useEffect(() => {
    const getVideos = async () => {
      try {
        // console.log(nextPageToken);
        const response = await fetch(
          BASE_URL +
            `/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=5&chart=mostPopular&regionCode=IN&pageToken=${
              nextPageToken ?? ''
            }&videoDuration=medium&key=` +
            process.env.REACT_APP_GOOGLE_API_KEY_4
        );
        const data = await response.json();
        dispatch(addVideos([...videos, ...data?.items]));
        dispatch(addNextPageToken(data?.nextPageToken));
      } catch (error) {
        console.log(error.message);
      }
    };
    if (category === 'All') {
      getVideos();
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [pageCount, category]);

  useEffect(() => {
    const searchVideoByKeyword = async (searchText) => {
      try {
        const response = await fetch(
          BASE_URL +
            `/search?part=snippet&maxResults=5&type=video&q=${searchText}&pageToken=${
              nextPageToken ?? ''
            }&videoDuration=medium&key=${process.env.REACT_APP_GOOGLE_API_KEY_10}`
        );
        const data = await response.json();
        // console.log(data);

        dispatch(addVideos([...videos, ...data?.items]));

        dispatch(addNextPageToken(data?.nextPageToken));
      } catch (error) {
        console.log(error);
      }
    };

    if (category !== 'All') {
      searchVideoByKeyword(category);
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [category, pageCount]);

  const lastVideoRef = useRef();

  const handleScrollCallback = (entries) => {
    if (entries[0].isIntersecting) {
      setPageCount(pageCount + 1);
      // console.log('intersecting', entries[0].target);
    }
  };

  useEffect(() => {
    const element = lastVideoRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(handleScrollCallback, {
      rootMargin: '100px',
      threshold: 1,
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line
  }, [videos]);

  return videos.length === 0 ? (
    <Shimmer />
  ) : (
    <div
      className=' grid justify-center justify-items-center grid-cols-[repeat(auto-fill,minmax(310px,_1fr))] max-xl:grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-[2rem_1rem] 
     pt-6 px-8'
    >
      {videos.map((video, index) => {
        if (index === videos.length - 1) {
          return (
            <div ref={lastVideoRef} key={video?.id?.videoId || video.id}>
              <Link to={`/watch?v=${video?.id?.videoId || video.id}`}>
                <VideoCard video={video} />
              </Link>
            </div>
          );
        } else {
          return (
            <Link
              className='w-full'
              to={`/watch?v=${video?.id?.videoId || video.id}`}
              key={video?.id?.videoId || video.id}
            >
              <VideoCard video={video} />
            </Link>
          );
        }
      })}
      {/* <div ref={bottomRef}>last </div> */}
      {isLoading && <Shimmer />}
    </div>
  );
};

export default VideoContainer;
