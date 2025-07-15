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
    console.log(albumNames);
  }, []);

  useEffect(() => {
    albumNames.map((albumName) => {
      let description = "";
      for (let key in albumsInfo) {
        if (albumsInfo[key].albumName === albumName) {
          description = albumsInfo[key].albumDescription;
        }
      }

      apiGet("/api/photos/get-album/" + albumName).then((data) =>
        setPhotosInAlbums((prev) => {
          return {
            ...prev,
            [albumName]: {
              leadPictureUrl: data.leadPictureUrl
                ? `${API_URL}${data?.leadPictureUrl}`
                : `${API_URL}${data.images[0].url}`,
              description: data.albumDescription,
            },
          };
        })
      );
    });
    console.log(photosInAlbums);
    //console.log(leadPictures)
  }, [albumNames, albumsInfo]);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Foto</h5>
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
                  to={`/galerie/foto/${albumName}`}
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
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default FotoIndex;
