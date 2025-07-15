import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";

const VideoIndex = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    apiGet("/api/youtube/videos").then((data) => setVideos(data));
  }, []);

  console.log(videos);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Video</h5>
      <div className="row">
        {videos.map((video) => (
          <div key={video.videoId} className="col-md-4 mb-4">
            <div className="card">
              <a
                target="_blank"
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                rel="noopener noreferrer "
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="card-img-top"
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoIndex;
