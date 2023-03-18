import { useState } from 'react';
import moment from 'moment';
import { BASE_URL } from './../utils/constants';
import { useEffect } from 'react';
import { GiAerialSignal } from 'react-icons/gi';
import { decode } from 'html-entities';
import { viewFun } from '../utils/helper';

const VideoCard = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
    statistics,
  } = video;

  const newTitle = decode(title);

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  
  const seconds = duration && moment.duration(duration).asSeconds();
  const _duration = duration && moment.utc(seconds * 1000).format('mm:ss');
  // console.log(_duration);

  const _videoId = id?.videoId || contentDetails?.videoId || id;

  useEffect(() => {
    const getVideoViewsAndDuration = async () => {
      const response = await fetch(
        BASE_URL +
          `/videos?part=contentDetails%2Cstatistics&id=${_videoId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      const data = await response.json();
      // console.log(data);

      setDuration(data?.items?.[0]?.contentDetails?.duration);
      setViews(data?.items[0].statistics.viewCount);
    };
    if (contentDetails && statistics) {
      setDuration(contentDetails?.duration);
      setViews(statistics.viewCount);
    } else {
      getVideoViewsAndDuration();
    }
  }, [_videoId, contentDetails, statistics]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const response = await fetch(
        BASE_URL +
          `/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      const data = await response.json();
      setChannelIcon(data?.items?.[0]?.snippet?.thumbnails?.default?.url);
    };
    get_channel_icon();
  }, [channelId]);

  return (
    <div className='video w-full cursor-pointer h-fit'>
      <div className='video__thumbnail relative top-0 left-0'>
        <img
          src={medium.url}
          className='rounded-xl w-full'
          alt='video thumbnail'
        />
        <div className='absolute bottom-1 right-1 bg-black/80 px-2 py-1 rounded-md text-xs text-white'>
          {_duration === '00:00' ? (
            <div className='bg-red-600 px-2 rounded font-bold flex gap-1 items-center'>
              <GiAerialSignal size='1.1rem' />
              <span>LIVE</span>
            </div>
          ) : (
            _duration
          )}
        </div>
      </div>
      <div className='video__details pt-4'>
        <div className='flex gap-2'>
          <div className='channel-logo flex flex-shrink-0 '>
            <img
              src={channelIcon}
              className='rounded-[50%]  w-10 h-10  object-cover'
              alt='channel logo'
            />
          </div>
          <div className='video-detail'>
            <div className='video-title font-semibold text-base leading-snug '>
              {newTitle.length > 60 ? newTitle.slice(0, 60) + '...' : newTitle}
            </div>
            <div className='channel-name text-xs pt-2'>{channelTitle}</div>
            <div className='text-xs pt-1'>
              <span>{viewFun(views)} views</span>
              <span> • </span>
              <span>{moment(publishedAt).fromNow()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
