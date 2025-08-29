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
      <FlashMessage success={false} state={loadinErrorState} text={messages.dataLoadErr}/>
      <div className="row d-flex justify-content-around">
        {albums
          ? albums.map((album, index) => (
              <div
                hidden={album.isHidden}
                key={index}
                className={`mb-3 me-2 col `}
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/galerie/foto/${album.albumName}`}
                >
                  <div className="card mb-2" style={{ width: "18rem" }}>
                    {album.leadPictureUrl ? (
                      <div>
                        <img
                          className="card-img-top"
                          src={`${API_URL}${album.leadPictureUrl}`}
                          alt=""
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {album.albumDescription}
                          </h5>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="card-body">
                          <h5 className="card-title">
                            {album.albumDescription}
                          </h5>
                          <p className="card-text">
                            Album zatím neobsahuje žádné fotky
                          </p>
                        </div>
                      </div>
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
