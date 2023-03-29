import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import SuggestedVideoCard from "./SuggestedVideoCard";



const VideoSuggestions = ({ videoId }) => {
  const getSuggestedVideos = async () => {
    const response = await fetch(
      BASE_URL +
        `/search?part=snippet&relatedToVideoId=${videoId}&maxResults=15&type=video&key=${process.env.REACT_APP_GOOGLE_API_KEY_8}`
    );
    const data = await response.json();
    return data.items;
  };

  const {data: suggestedVideos, isLoading} = useQuery({
    queryKey: ["watch-page", "video-suggestions",videoId],
    queryFn: () => getSuggestedVideos(videoId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  })

  return isLoading ? (
    <Shimmer />
  ) : (
    <div>
      {suggestedVideos.length > 0 &&
        suggestedVideos.map((suggestedVideo) => {
          return (
            <Link
              to={`/watch?v=${suggestedVideo?.id?.videoId}`}
              key={suggestedVideo?.id?.videoId}
            >
              <SuggestedVideoCard video={suggestedVideo} />
            </Link>
          );
        })}
    </div>
  );
};

export default VideoSuggestions;
