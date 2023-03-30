import React from "react";
import VideoContainer from "./VideoContainer";
import Tags from "./Tags";
const MainContainer = () => {
  return (
    <div className=" flex-1 bg-white dark:bg-zinc-900 transition-all duration-500">
      <Tags />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
