import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { apiGet } from "../../utils/api";
import { API_URL } from "../../utils/api";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const AlbumDetail = () => {
  const { albumName } = useParams();
  const [images, setImages] = useState([]);
  const [albumDescription, setAlbumDescription] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [loadinErrorState, setLoadingErrorState] = useState(false);

  useEffect(() => {
    apiGet(`/api/photos/get-images/${albumName}`)
      .then((data) => {
        setImages(data);
        for (let image of data) {
          setSlides((prev) => [...prev, { src: `${API_URL}${image.url}` }]);
        }
      })
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
    apiGet("/api/photos/get-albums")
      .then((data) => {
        for (let key in data) {
          if (data[key].albumName === albumName) {
            setAlbumDescription(data[key].albumDescription);
          }
        }
      })
      .catch((error) => {
        setLoadingErrorState(false);
        console.error(error);
      });
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Album: {albumDescription}</h5>
      <FlashMessage
        success={false}
        state={loadinErrorState}
        text={messages.dataLoadErr}
      />
      <div className="album-photo-grid">
        {images.map((image, index) => (
          <Link
            key={index}
            type="button"
            className="album-photo-thumb"
            onClick={() => {
              setOpen(true);
              setSlideIndex(index);
            }}
          >
            <img
              className="album-image"
              src={`${API_URL}${image.url}`}
              alt=""
            />
          </Link>
        ))}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={slideIndex}
        />
      </div>
      <div className="mt-4">
        <button
          className="btn btn-light border-black"
          type="button"
          onClick={() =>
            navigate("/galerie/foto", { preventScrollReset: false })
          }
        >
          Zpět na alba
        </button>
      </div>
    </div>
  );
};
export default AlbumDetail;
