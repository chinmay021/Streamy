import { useQuery } from '@tanstack/react-query';
import { decode } from 'html-entities';
import moment from 'moment';
import { BASE_URL } from '../utils/constants';


const SuggestedVideoCard = ({ video }) => {
  const {
    id: { videoId },
    snippet: {
      publishedAt,
      title,
      thumbnails: { medium },
      channelTitle,
    },
  } = video;

  const newTitle = decode(title);

  // const [views, setViews] = useState(null);
  // const [duration, setDuration] = useState(null);


  const getVideoViewsAndDuration = async () => {
    const response = await fetch(
      BASE_URL +
        `/videos?part=contentDetails%2Cstatistics&id=${videoId}&key=${process.env.REACT_APP_GOOGLE_API_KEY_2}`
    );
    const data = await response.json();
    return data.items[0];
  };

  const { data: videoDetails, isLoading } = useQuery({
    queryKey: ["videoDetails", videoId],
    queryFn: () => getVideoViewsAndDuration(videoId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });





  const seconds = !isLoading && moment.duration(videoDetails.contentDetails.duration).asSeconds();
  const _duration = !isLoading && moment.utc(seconds * 1000).format('mm:ss');

  // useEffect(() => {
  //   const getVideoViewsAndDuration = async () => {
  //     const response = await fetch(
  //       BASE_URL +
  //         `/videos?part=contentDetails%2Cstatistics&id=${videoId}&key=${process.env.REACT_APP_GOOGLE_API_KEY_2}`
  //     );
  //     const data = await response.json();
  //     setDuration(data?.items?.[0]?.contentDetails?.duration);
  //     setViews(data?.items[0].statistics.viewCount);
  //   };
  //   getVideoViewsAndDuration();
  // }, [videoId]);




  return !isLoading && (
    <div className='video flex  gap-2 md:gap-4  lg:gap-2 xl:gap-4 cursor-pointer mb-4 '>
      <div className='video__thumbnail h-[80px] sm:h-[96px] relative top-0 left-0 lg:w-[150px] lg:flex-none xl:w-[200px] xl:h-[120px] '>
        <img
          src={medium.url}
          className='rounded-xl w-full h-full object-cover'
          alt='video thumbnail'
        />
        <div className='absolute bottom-1 right-1 bg-black/80 px-2 py-1 rounded-md text-xs text-white'>
          {_duration}
        </div>
      </div>
      <div className='video__details '>
        <div className=''>
          <div className='video-title  font-semibold text-sm md:text-base lg:text-sm leading-tight md:leading-normal lg:leading-tight h-[50%]  '>
            {newTitle.length > 32 ? newTitle.slice(0, 32) + '...' : newTitle}
          </div>
          <div className='small h-[50%]  '>
            <div className='channel-name text-xs xl:text-sm pt-2'>{channelTitle}</div>
            <div className='text-xs '>
              <span>{Intl.NumberFormat('en', {notation: "compact"}).format(videoDetails.statistics.viewCount)} views</span>
              <span> • </span>
              <span>{moment(publishedAt).fromNow()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedVideoCard;
