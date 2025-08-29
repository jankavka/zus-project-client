import { useState, useEffect } from "react";
import { API_URL, apiGet, apiDelete } from "../../utils/api";
import { Link, useLocation } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const AdminAlbumIndex = () => {
  const [albums, setAlbums] = useState([]);
  const location = useLocation();
  const { editSuccessState } = location.state || false;
  const { createSuccessState } = location.state || false;
  const [deleteSuccessState, setDeleteSuccessState] = useState(false);
  const [deleteErrorState, setDeleteErrorState] = useState(false);
  const { successState } = location.state || false;

  const handleDeleteAlbum = (albumName) => {
    let aprove = confirm("Opravdu chcete vymazat toto album?");
    if (aprove) {
      apiDelete(`/api/photos/delete-album/${albumName}`)
        .then(() => {
          setDeleteSuccessState(true);
          setAlbums((prev) =>
            prev.filter((item) => item.albumName !== albumName)
          );
        })
        .catch((error) => {
          setDeleteErrorState(true);
          console.error(error);
        });
    }
  };

  useEffect(() => {
    apiGet("/api/photos/get-albums").then((data) => setAlbums(data));
  }, []);
  return (
    <div className="container-content">
      <h5 className="text-uppercase">Foto</h5>
      <FlashMessage
        success={true}
        state={createSuccessState}
        text={messages.dataCreateOk}
      />
      <FlashMessage
        success={true}
        state={editSuccessState}
        text={messages.dataUpdateOk}
      />
      <FlashMessage
        success={true}
        state={deleteSuccessState}
        text={messages.dataDeleteOk}
      />
      <FlashMessage
        success={false}
        state={deleteErrorState}
        text={messages.dataDeleteErr}
      />
      <FlashMessage
        success={true}
        state={successState}
        text={messages.dataCreateOk}
      />

      <div className="mb-3">
        <div className="ms-3">
          <div className="row mb-2">
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
            <small style={{ marginLeft: "0", padding: "0" }}>
              (Pokud chcete přidat fotky, musíte použít existující album nebo
              jej vytvořit)
            </small>
          </div>
        </div>
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
            {albums.map((album, index) => (
              <tr key={index}>
                <td>
                  <Link to={"/admin/galerie/foto/" + album.albumName}>
                    {album.albumName}
                  </Link>
                </td>
                <td>{album.albumDescription}</td>
                <td>
                  <img
                    style={{ maxHeight: "100px", maxWidth: "100px" }}
                    src={`${API_URL}${album.leadPictureUrl}`}
                    alt=""
                  />
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger me-2 mb-2"
                      onClick={() => handleDeleteAlbum(album.albumName)}
                    >
                      Vymazat
                    </button>
                    <Link
                      to={`/admin/galerie/foto/pridat-foto/${album.albumName}`}
                      type="button"
                      className="btn btn-success me-2 mb-2"
                    >
                      Přidat fotky
                    </Link>
                    <Link
                      className="btn btn-warning mb-2"
                      to={
                        "/admin/galerie/foto/upravit-album/" + album.albumName
                      }
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
export default AdminAlbumIndex;
