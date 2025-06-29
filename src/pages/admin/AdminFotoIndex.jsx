import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, apiDelete, apiGet } from "../../utils/api";

const AdminFotoIndex = ({ isEditable }) => {
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
      apiGet(`/api/photos/get-album/${albumName}`).then((data) =>
        setPhotosInAlbums((prev) => {
          return {
            ...prev,
            [albumName]: {
              leadPictureUrl: data.leadPictureUrl
                ? `${API_URL}${data?.leadPictureUrl}`
                : `${API_URL}${data.images[0].url}`,
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
    <div className="container-content">
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
      <div>
        <table className="table table-bordered table-responsive">
          <thead>
            <tr>
              <th>Název složky</th>
              <th>Popis alba</th>
              <th>úvodní foto</th>
              <th>Akce</th>
            </tr>
          </thead>
          <tbody>
            {albumNames.map((albumName, index) => (
              <tr key={index}>
                <td>
                  <Link to={"/admin/galerie/foto/" + albumName}>
                    {albumName}
                  </Link>
                </td>
                <td>{photosInAlbums[albumName]?.description}</td>
                <td>
                  <img
                    style={{ maxHeight: "100px", maxWidth: "100px" }}
                    src={photosInAlbums[albumName]?.leadPictureUrl}
                    alt=""
                  />
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger me-2 mb-2"
                      onClick={() => handleDeleteAlbum(albumName)}
                    >
                      Vymazat
                    </button>
                    <Link
                      to={`/admin/galerie/foto/pridat-foto/${albumName}`}
                      type="button"
                      className="btn btn-success me-2 mb-2"
                    >
                      Přidat fotky
                    </Link>
                    <Link
                      className="btn btn-warning mb-2"
                      to={"/admin/galerie/foto/upravit-album/" + albumName}
                    >
                      Editovat
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFotoIndex;
