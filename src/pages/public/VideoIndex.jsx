import { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const VideoIndex = () => {
  const [videos, setVideos] = useState([]);
  const [loadingErrorState, setLoadingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/youtube/videos")
      .then((data) => setVideos(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Video</h5>
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
      <div className="row">
        {videos.map((video) => (
          <div key={video.videoId} className="col-md-4 mb-4">
            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              rel="noopener noreferrer"
              className="album-card"
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-100"
              />
              <div className="album-card-body">
                <h5 className="album-card-title">{video.title}</h5>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoIndex;
