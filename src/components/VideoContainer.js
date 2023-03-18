import { useState, useEffect, useRef } from 'react';
import VideoCard from './VideoCard';
import { YOUTUBE_MOST_POPULAR } from '../utils/constants';
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

  useEffect(() => {
    const getVideos = async () => {
      try {
        // console.log(nextPageToken);
        const response = await fetch(
          BASE_URL +
            `/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=5&chart=mostPopular&regionCode=IN${
              nextPageToken ? `&pageToken=${nextPageToken}` : ''
            }&videoDuration=medium&key=` +
            process.env.REACT_APP_GOOGLE_API_KEY
        );
        const data = await response.json();
        // console.log(data);
        // setData(data);
        // setNextPage(data?.nextPageToken);
        // setVideos(data?.items);
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
  }, [pageCount, category]);

  useEffect(() => {
    const searchVideoByKeyword = async (tag) => {
      try {
        const response = await fetch(
          BASE_URL +
            `/search?part=snippet&maxResults=5&type=video&q=${tag}${
              nextPageToken ? `&pageToken=${nextPageToken}` : ''
            }&videoDuration=medium&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
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
  }, [videos]);

  return videos.length === 0 ? (
    <Shimmer />
  ) : (
    <div
      className='border grid justify-center justify-items-center grid-cols-[repeat(auto-fill,minmax(310px,_1fr))] max-xl:grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-[2rem_1rem] 
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
