import { MdOutlineSort } from "react-icons/md";
import { BASE_URL } from "../utils/constants";
import Comment from "./Comment";
import { FaUserCircle } from "react-icons/fa";
import loadingGif from "../assests/loading-state.gif";
import { useInfiniteQuery } from "@tanstack/react-query";

const Comments = ({ videoId, commentCount }) => {


  const getComments = async (nextPageToken = "") => {
    const response = await fetch(
      BASE_URL +
        `/commentThreads?part=snippet%2Creplies&order=relevance&key=${
          process.env.REACT_APP_GOOGLE_API_KEY_1
        }&videoId=${videoId}&textFormat=plainText&pageToken=${
          nextPageToken ?? ""
        }`
    );
    const data = await response.json();
    return data;
  };

  const { data, isLoading, fetchNextPage, isSuccess, isFetchingNextPage  } =
    useInfiniteQuery({
      queryKey: ["watch-page", "comments", videoId],
      queryFn: ({ pageParam = null }) => getComments(pageParam),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.nextPageToken;
      },
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    });
  const comments = data?.pages?.flatMap((page) => page.items) ?? [];

  return isLoading ? (
    <div className="w-full">
      <img className="w-12 h-12 m-auto" src={loadingGif} alt="" />
    </div>
  ) : (
    <div className="comment">
      <div className="flex gap-8 items-center mb-4 ">
        <div className="comment-count font-medium ">
          {parseInt(commentCount).toLocaleString()} Comments
        </div>
        <div className="sort flex gap-2 cursor-pointer items-center">
          <MdOutlineSort size="1.5rem" />
          <span className="font-semibold text-sm">Sort by</span>
        </div>
      </div>
      <div className="add_comment text-sm flex items-center  gap-4 my-8">
        <div className="user_pic">
          <FaUserCircle size="2.5rem" />
        </div>
        <div className="comment_input w-full ">
          <input
            className="border-b dark:border-white/50 w-full h-8 focus:outline-none py-2 focus:border-black focus:border-b-2 dark:bg-zinc-900"
            type="text"
            placeholder="Add a comment..."
          />
          <div className="flex justify-end gap-4 pt-2 font-semibold">
            <button className="hover:bg-zinc-200 dark:hover:bg-zinc-700 px-4 py-2 rounded-full">
              Cancel
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded-3xl text-gray-500">
              Comment
            </button>
          </div>
        </div>
      </div>
      <div className="comments">
        {isSuccess && comments.map((comment) => (
          <Comment key={comment.id} commentData={comment} />
        ))}
      </div>
      {isLoading || isFetchingNextPage  ? (
        <div className="w-full">
          <img className="w-12 h-12 m-auto" src={loadingGif} alt="" />
        </div>
      ) : (
         <button
          className="w-full font-bold bg-gray-200 dark:bg-zinc-700 rounded-3xl px-4 py-1"
          onClick={fetchNextPage}
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default Comments;
