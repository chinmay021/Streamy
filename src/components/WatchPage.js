import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SideBarExpanded from "./SideBarExpanded";
import { BASE_URL } from "./../utils/constants";
import VideoMetaData from "./VideoMetaData";
import Comments from "./Comments";
import VideoSuggestions from "./VideoSuggestions";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../utils/appSlice";
import { useQuery } from "@tanstack/react-query";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  function showPopup() {
    alert("Text has been copied, allow pop-ups and  paste it in a new tab opened to get the summary.");
  }



  const handleSummaryButtonClick = async ()=>{
    const text = `Summarize the YouTube video in Points and in details\nTitle: ${videoDetails?.snippet?.title} by ${videoDetails?.snippet?.channelTitle}`;

    const copyToClipboard = async (str) => {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return await navigator.clipboard.writeText(str);
      return Promise.reject("The Clipboard API is not available.");
    };
    await copyToClipboard(text);
    showPopup();
      window.open("https://chat.openai.com/chat", "_blank");
  }

  const dispatch = useDispatch();
  const isSideBarOpen = useSelector((store) => store.app.isSideBarOpen);

  useEffect(() => {
    if (isSideBarOpen) {
      dispatch(toggleSideBar());
    }
    // eslint-disable-next-line
  }, []);

  const getVideoDetail = async () => {
    const response = await fetch(
      BASE_URL +
        `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.REACT_APP_GOOGLE_API_KEY_9}`
    );
    const data = await response.json();
    return data.items[0];
  };

  const { data: videoDetails, isLoading } = useQuery({
    queryKey: ["watch-page", "video-details", videoId],
    queryFn: () => getVideoDetail(videoId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return isLoading ? null : (
    <div className="">
      <SideBarExpanded />
      <div
        className={`min-h-[calc(100vh-4.62rem)] dark:bg-zinc-900 dark:text-white grid grid-cols-12 md:gap-x-8 px-4 md:px-12 2xl:px-24 gap-y-4 pt-4 ${
          isSideBarOpen && "h-[calc(100vh-4.62rem)] overflow-x-hidden"
        }`}
      >
        <div className="col1 col-span-12 lg:col-span-8  ">
          <div className="video mb-4 ">
            <div className="player mb-4 h-[32vh] md:h-[50vh] lg:h-[50vh] 2xl:h-[70vh]">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                title={videoDetails?.snippet?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  web-share"
                allowFullScreen
              ></iframe>
            </div>
            {isLoading ? (
              <div>loading....</div>
            ) : (
              <VideoMetaData
                videoDetails={videoDetails}
                channelId={videoDetails?.snippet?.channelId}
              />
            )}
          </div>
          <div>
            <button
              className="bg-zinc-900 text-white rounded-3xl py-1 px-3 mb-4  dark:text-black dark:bg-white"
              // onClick={makeFinalTranscriptText}
              onClick={handleSummaryButtonClick}
            >
            Summarize
            </button>
          </div>
          <Comments
            videoId={videoId}
            commentCount={videoDetails?.statistics?.commentCount}
          />
        </div>
        <div className="col2 col-span-12 lg:col-span-4 ">
          <VideoSuggestions videoId={videoId} />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
