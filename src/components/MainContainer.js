import React from "react";
import VideoContainer from "./VideoContainer";
import Tags from "./Tags";
const MainContainer = () => {
  return (
    <div className="border flex-1">
      <Tags />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
