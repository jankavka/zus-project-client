import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../../utils/api";
import { API_URL } from "../../utils/api";

const AlbumDetail = () => {
  const { albumName } = useParams();
  const [images, setImages] = useState([]);
  const [albumDescription, setAlbumDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    apiGet(`/api/photos/get-images/${albumName}`).then((data) =>
      setImages(data)
    );
    apiGet("/api/photos/get-albums").then((data) => {
      for (let key in data) {
        if (data[key].albumName === albumName) {
          setAlbumDescription(data[key].albumDescription);
        }
      }
    });
  }, []);

  return (
    <div className="container-content">
      <h1>Album: {albumDescription}</h1>
      <div className="row">
        {images.map((image, index) => (
          <div className="col" key={index}>
            <img
              className="album-image me-3 mb-3"
              src={`${API_URL}${image.url}`}
            />
          </div>
        ))}
      </div>
      <div>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => navigate(-1)}
        >
          Zpět
        </button>
      </div>
    </div>
  );
};
export default AlbumDetail;
