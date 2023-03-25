import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import SuggestedVideoCard from "./SuggestedVideoCard";

/* GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key=[YOUR_API_KEY] HTTP/1.1

Authorization: Bearer [YOUR_ACCESS_TOKEN]
Accept: application/json
 */

const VideoSuggestions = ({ videoId }) => {
  const [loading, setLoading] = useState(true);
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  useEffect(() => {
    const getSuggestedVideos = async () => {
      const response = await fetch(
        BASE_URL +
          `/search?part=snippet&relatedToVideoId=${videoId}&maxResults=15&type=video&key=${process.env.REACT_APP_GOOGLE_API_KEY_8}`
      );
      const data = await response.json();
      // console.log(data?.items);
      setSuggestedVideos(data?.items);
    };
    getSuggestedVideos();
    setLoading(false);
  }, [videoId]);

  return loading ? (
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
