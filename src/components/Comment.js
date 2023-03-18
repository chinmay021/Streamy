import React from 'react';
import moment from 'moment';
import { viewFun } from '../utils/helper';
import { BiDislike, BiLike } from 'react-icons/bi';

const Comment = ({ commentData }) => {
  return (
    <div className='comment_wrapper flex gap-4 items-center text-sm mb-6'>
      <img
        className='w-10 flex-none  object-contain rounded-full'
        src={
          commentData?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
        }
        alt='user-image'
      />
      <div className='comment_details'>
        <div className='flex gap-4 pb-1'>
          <div className='username font-bold text-xs '>
            {commentData?.snippet?.topLevelComment?.snippet?.authorDisplayName}
          </div>
          <div className='comment_time'>
            {moment(
              commentData?.snippet?.topLevelComment?.snippet?.publishedAt
            ).fromNow()}
          </div>
        </div>
        <div className='comment'>
          {commentData.snippet.topLevelComment.snippet.textDisplay}
        </div>
        <div className='like_dislike flex gap-4 pt-2'>
          <button className='like  cursor-pointer flex gap-1 items-center  '>
            <div className='like_icon hover:bg-zinc-200 p-2 rounded-full'>
              <BiLike size='1.2rem' className='text-gray-600' />
            </div>
            <div className='like_count '>
              {viewFun(commentData.snippet.topLevelComment.snippet.likeCount)}
            </div>
          </button>
          <button className='cursor-pointer flex gap-1 items-center hover:bg-zinc-200 p-2 rounded-full'>
            <div className=''>
              <BiDislike size='1.2rem' className='text-gray-600' />
            </div>
          </button>
          <span className='font-semibold cursor-pointer text-xs hover:bg-zinc-200 py-2 px-4 rounded-2xl'>
            Reply
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
