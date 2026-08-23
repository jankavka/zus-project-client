import { useEffect, useState } from "react";
import { API_URL, apiGet } from "../../utils/api";
import { Link } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const AlbumIndex = () => {
  const [albums, setAlbums] = useState([]);
  const [loadinErrorState, setLoadingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/photos/get-albums")
      .then((data) => setAlbums(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Foto</h5>
      <FlashMessage
        success={false}
        state={loadinErrorState}
        text={messages.dataLoadErr}
      />
      <div className="row g-4">
        {albums
          ? albums.map((album, index) => (
              <div
                hidden={album.isHidden}
                key={index}
                className="col-6 col-md-4"
              >
                <Link
                  to={`/galerie/foto/${album.albumName}`}
                  className="album-card"
                >
                  <div className="album-card-img-wrap">
                    {album.leadPictureUrl ? (
                      <img
                        className="album-card-img"
                        src={`${API_URL}${album.leadPictureUrl}`}
                        alt=""
                      />
                    ) : null}
                  </div>
                  <div className="album-card-body">
                    <h5 className="album-card-title text-uppercase">
                      {album.albumDescription}
                    </h5>
                    {album.leadPictureUrl ? null : (
                      <p className="mb-0">
                        Album zatím neobsahuje žádné fotky
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AlbumIndex;
