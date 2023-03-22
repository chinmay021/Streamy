import React, { useEffect, useState } from 'react';
import { MdOutlineSort } from 'react-icons/md';
import { BASE_URL } from '../utils/constants';
import Comment from './Comment';
import { FaUserCircle } from 'react-icons/fa';
import loadingGif from '../assests/loading-state.gif';

const Comments = ({ videoId, commentCount }) => {
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(
        BASE_URL +
          `/commentThreads?part=snippet%2Creplies&order=relevance&key=${process.env.REACT_APP_GOOGLE_API_KEY}&videoId=${videoId}&textFormat=plainText`
      );
      const data = await response.json();
      setComments(data?.items);
      setNextPageToken(data?.nextPageToken);
      setLoading(false);
      // console.log(data);
    };
    getComments();
  }, [videoId]);

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(
        BASE_URL +
          `/commentThreads?part=snippet%2Creplies&order=relevance&key=${process.env.REACT_APP_GOOGLE_API_KEY}&videoId=${videoId}&textFormat=plainText&pageToken=${nextPageToken}`
      );
      const data = await response.json();
      setComments([...comments, ...data?.items]);
      setNextPageToken(data?.nextPageToken);
      setLoading(false);
      // console.log(data);
    };
    getComments();
    // eslint-disable-next-line
  }, [pageCount]);

  const handleLoadMoreComments = () => {
    setLoading(true);
    setPageCount(pageCount + 1);
  };

  return comments.length === 0 ? (
    <div className='w-full'>
      <img className='w-12 h-12 m-auto' src={loadingGif} alt='' />
    </div>
  ) : (
    <div className='comment'>
      <div className='flex gap-8 items-center mb-4 '>
        <div className='comment-count font-medium '>
          {parseInt(commentCount).toLocaleString()} Comments
        </div>
        <div className='sort flex gap-2 cursor-pointer items-center'>
          <MdOutlineSort size='1.5rem' />
          <span className='font-semibold text-sm'>Sort by</span>
        </div>
      </div>
      <div className='add_comment text-sm flex items-center  gap-4 my-8'>
        <div className='user_pic'>
          <FaUserCircle size='2.5rem' />
        </div>
        <div className='comment_input w-full '>
          <input
            className='border-b w-full h-8 focus:outline-none py-2 focus:border-black focus:border-b-2'
            type='text'
            placeholder='Add a comment...'
          />
          <div className='flex justify-end gap-4 pt-2 font-semibold'>
            <button className='hover:bg-zinc-200 px-4 py-2 rounded-full'>
              Cancel
            </button>
            <button className='bg-gray-200 px-4 py-2 rounded-3xl text-gray-500'>
              Comment
            </button>
          </div>
        </div>
      </div>
      <div className='comments'>
        {comments.map((comment) => (
          <Comment key={comment.id} commentData={comment} />
        ))}
      </div>
      {loading ? (
        <div className='w-full'>
          <img className='w-12 h-12 m-auto' src={loadingGif} alt='' />
        </div>
      ) : (
        <button
          className='w-full font-bold bg-gray-200 rounded-3xl px-4 py-1'
          onClick={handleLoadMoreComments}
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default Comments;
