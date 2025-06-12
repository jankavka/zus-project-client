import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, apiDelete, apiGet } from "../../utils/api";

const FotoIndex = ({ isEditable }) => {
  const [albumNames, setAlbumNames] = useState([]);
  const [photosInAlbums, setPhotosInAlbums] = useState({});
  const [albumsInfo, setAlbumsInfo] = useState([]);

  useEffect(() => {
    apiGet("/api/photos/all-albums-names").then((data) => setAlbumNames(data));
    apiGet("/api/photos/get-albums").then((data) => setAlbumsInfo(data));
    console.log(albumsInfo);
  }, []);

  useEffect(() => {
    albumNames.map((albumName) => {
      let description = "";
      for (let key in albumsInfo) {
        if (albumsInfo[key].albumName === albumName) {
          description = albumsInfo[key].albumDescription;
        }
      }
      apiGet(`/api/photos/get-images/${albumName}`).then((data) =>
        setPhotosInAlbums((prev) => {
          return {
            ...prev,
            [albumName]: {
              //leadPictureUrl: `${API_URL}${data[0]?.url}` ,
              leadPictureUrl:
                data[0]?.url === undefined ? "" : `${API_URL}${data[0]?.url}`,
              description: description,
            },
          };
        })
      );
    });
    console.log(photosInAlbums);
  }, [albumNames, albumsInfo]);

  const handleDeleteAlbum = (albumName) => {
    let aprove = confirm("Opravdu chcete vymazat toto album?");
    if (aprove) {
      apiDelete(`/api/photos/delete-album/${albumName}`).then((data) =>
        console.log(data)
      );
      setAlbumNames(albumNames.filter((album) => album !== albumName));
    }
  };

  return (
    <div className={isEditable ? `container-content-admin` : `container-content`}>
      <h1>Foto</h1>
      <div className="mb-3">
        {isEditable ? (
          <div>
            <div className="row">
              <Link
                className="btn btn-success me-3 col-5 col-md-2"
                to={"/admin/galerie/foto/nove-album"}
              >
                Nové Album
              </Link>
              <Link
                className="btn btn-info col-5 col-md-2"
                to={"/admin/galerie/foto/pridat-foto"}
              >
                Přidat fotky
              </Link>
            </div>
            <div className="row">
              <small>
                (Pokud chcete přidat fotky, musíte použít existující album nebo
                jej vytvořit)
              </small>
            </div>
          </div>
        ) : null}
      </div>
      <div className="row d-flex justify-content-around">
        {photosInAlbums
          ? albumNames.map((albumName, index) => (
              <div
                key={index}
                className={`mb-3 me-2 ${isEditable ? "col col-sm-3" : "col"} `}
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={
                    isEditable
                      ? `/admin/galerie/foto/${albumName}`
                      : `/galerie/foto/${albumName}`
                  }
                >
                  <div className="card mb-2" style={{ width: "18rem" }}>
                    {photosInAlbums[albumName]?.leadPictureUrl ? (
                      <div>
                        <img
                          className="card-img-top"
                          src={photosInAlbums[albumName]?.leadPictureUrl}
                          alt=""
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {photosInAlbums[albumName]?.description}
                          </h5>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="card-body">
                          <h5 className="card-title">
                            {photosInAlbums[albumName]?.description}
                          </h5>
                          <p className="card-text">
                            Album zatím neobsahuje žádné fotky
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
                {isEditable ? (
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={() => handleDeleteAlbum(albumName)}
                    >
                      Vymazat
                    </button>
                    <Link
                      to={`/admin/galerie/foto/pridat-foto/${albumName}`}
                      type="button"
                      className="btn btn-success"
                    >
                      Přidat fotky
                    </Link>
                  </div>
                ) : null}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default FotoIndex;
