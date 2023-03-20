import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { BiLike, BiDislike } from 'react-icons/bi';
import { TfiShare, TfiDownload, TfiMoreAlt } from 'react-icons/tfi';
import moment from 'moment';

const VideoMetaData = ({ videoDetails, channelId }) => {
  const [channelDetails, setChannelDetails] = useState(null);
  //   console.log(videoDetails, channelId);
  const [desc, setDesc] = useState(true);
  const [showButton, setShowButton] = useState('Show More');

  useEffect(() => {
    const get_channel_details = async () => {
      const response = await fetch(
        BASE_URL +
          `/channels?part=snippet%2Cstatistics%2CcontentDetails&id=${channelId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      const data = await response.json();
      setChannelDetails(data?.items?.[0]);
      console.log(channelDetails);
    };
    if (channelId) get_channel_details();
  }, [channelId]);

  useEffect(() => {
    //set description
    if (videoDetails?.snippet?.description.length > 100) {
      setDesc(videoDetails?.snippet?.description.slice(0, 100) + '...');
    } else {
      setDesc(videoDetails?.snippet?.description);
    }
  }, [videoDetails]);

  const toggleShowButton = () => {
    if (showButton === 'Show More') {
      setDesc(videoDetails?.snippet?.description);
      setShowButton('Show Less');
    } else {
      setDesc(videoDetails?.snippet?.description.slice(0, 100) + ' ...');
      setShowButton('Show More');
    }
  };

  return (
    channelDetails && (
      <div className='video_data'>
        <div className='video_title font-bold text-lg mb-2'>
          {videoDetails.snippet.title}
        </div>
        <div className='channel_video_stats flex justify-between flex-wrap gap-y-4 gap-2 items-center'>
          <div className='channel_details flex gap-2 items-center'>
            <div className='channel_logo w-10 h-10 '>
              <img
                className='w-full rounded-full'
                src={channelDetails.snippet.thumbnails.default.url}
                alt='channel icon'
              />
            </div>
            <div className='channel_name'>
              <div className='name font-bold text-sm'>
                {channelDetails?.snippet?.localized?.title}
              </div>
              <div className='sub_count text-xs'>
                {Intl.NumberFormat('en', {notation: "compact"}).format(channelDetails?.statistics?.subscriberCount)}{' '}
                subscribers
              </div>
            </div>
            <div className='subs_button ml-2'>
              <button className='bg-black  text-sm text-white rounded-2xl px-4 py-2 '>
                {' '}
                Subscribe
              </button>
            </div>
          </div>

          <div className='video_stats flex items-center flex-wrap gap-2 text-sm'>
            <div className='button-wrapper flex bg-gray-200 rounded-2xl p-2'>
              <button className='like   flex gap-1 items-center pr-2'>
                <div className='like_icon'>
                  <BiLike size='1.2rem' className='text-gray-600' />
                </div>
                <div className='like_count '>
                  {Intl.NumberFormat('en', {notation: "compact"}).format(videoDetails?.statistics?.likeCount)}
                </div>
              </button>
              <button className='cursor-pointer'>
                <div className='border-l-2 border-black/20 pl-2'>
                  <BiDislike size='1.2rem' className='text-gray-600' />
                </div>
              </button>
            </div>
            <button className='share flex items-center gap-2 bg-gray-200 rounded-2xl p-2'>
              <TfiShare />
              <span>Share</span>
            </button>
            <button className='download flex items-center justify-center gap-2 bg-gray-200 rounded-2xl p-2'>
              <TfiDownload />
              <span>Download</span>
            </button>
            <button className='more flex items-center gap-2 bg-gray-200 rounded-2xl p-2 '>
              <TfiMoreAlt />
            </button>
          </div>
        </div>
        <div className='video_desc mt-4 text-sm p-4 bg-gray-100 rounded-xl'>
          <div className='view_date flex gap-4 font-bold pb-1'>
            <div className='video_views '>
              {Intl.NumberFormat('en', { notation: 'compact' }).format(
                videoDetails?.statistics?.viewCount
              )}{' '}
              views
            </div>
            <div className='published_date'>
              {moment(videoDetails?.snippet?.publishedAt).fromNow()}
            </div>
          </div>
          <div className='desc whitespace-pre-wrap break-words '>
            {desc}
            {videoDetails?.snippet?.description.length > 100 && (
              <button className='font-bold block' onClick={toggleShowButton}>
                {showButton}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default VideoMetaData;
