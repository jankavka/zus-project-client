import { useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import { API_URL, apiGet, apiPost, apiPut } from "../../utils/api";
import { Link, useNavigate, useParams } from "react-router-dom";

const AlbumForm = () => {
  const { albumNameParam } = useParams();
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [leadPictureUrl, setLeadPictureUrl] = useState("");
  const [photosInAlbum, setPhotosInAlbum] = useState([]);
  const [oldAlbumName, setOldAlbumName] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAlbumName(albumNameParam);
    if (albumNameParam) {
      setAlbumDescription(
        apiGet("/api/photos/get-album/" + albumNameParam)
          .then((data) => {
            setAlbumDescription(data.albumDescription),
              setLeadPictureUrl(data.leadPictureUrl);

            setOldAlbumName(albumNameParam);
          })
          .catch((error) => console.log(error))
      );
      apiGet("/api/photos/get-images/" + albumNameParam).then((data) =>
        setPhotosInAlbum(data)
      ).catch((error) => console.log(error));
    }
  }, []);

  const handleChangeLeadPhoto = (e) => {
    setLeadPictureUrl(e.target.value);
  };

  const handleChangeAlbumName = (e) => {
    setAlbumName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (albumNameParam) {
      const body = {
        albumName: albumName,
        albumDescription: albumDescription,
        leadPictureUrl: leadPictureUrl?.replace(oldAlbumName, albumName),
        isHidden: isHidden
      };
      apiPut("/api/photos/edit-album/" + albumNameParam, body).then(() =>
        navigate("/admin/galerie/foto")
      );

      console.log("body: " + body.leadPictureUrl);
    } else {
      const body = {
        albumName: albumName,
        albumDescription: albumDescription,
        isHidden: isHidden
      };
      apiPost("/api/photos/new-album", body).then(() => {
        navigate("/admin/galerie/foto");
      });
    }
  };

  return (
    <div className="container-content">
      {albumNameParam ? (
        <h5 className="text-uppercase">Uprav album</h5>
      ) : (
        <h5 className="text-uppercase">Přidej album</h5>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <FormInput
            label="Název složky:"
            name="albumName"
            value={albumName || ""}
            onChange={(e) => handleChangeAlbumName(e)}
            required={true}
          />
        </div>
        <div>
          <FormInput
            label="Popis alba: (zobrazí se uživateli)"
            name="albumDescription"
            value={albumDescription || ""}
            onChange={(e) => setAlbumDescription(e.target.value)}
            required={true}
          />
        </div>
        <div>Skryté</div>
        <div className="form-check">
          <input
            id="yes"
            name="isHidden"
            className="form-check-input"
            onChange={() => setIsHidden(true)}
            type="radio"
          />
          <label htmlFor="yes" className="form-check-label">
            ano
          </label>
        </div>
        <div className="form-check">
          <input
            checked = {!isHidden}
            id="no"
            name="isHidden"
            className="form-check-input"
            type="radio"
            onChange={() => setIsHidden(false)}
          />
          <label htmlFor="no" className="form-check-label">
            ne
          </label>
        </div>

        {albumNameParam ? (
          <div>
            <h5 className="mt-5">Vyberte úvodní fotku</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>Fotka</th>
                  <th>Úvodní</th>
                </tr>
              </thead>
              <tbody>
                {photosInAlbum.length
                  ? photosInAlbum.map((image, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            style={{ maxHeight: "100px", maxWidth: "100px" }}
                            src={`${API_URL}${image.url}`}
                          />
                        </td>
                        <td>
                          <input
                            name="image-url"
                            className="form-check-input"
                            type="radio"
                            checked={leadPictureUrl === image.url}
                            value={image.url || leadPictureUrl}
                            onChange={(e) => handleChangeLeadPhoto(e)}
                          />
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
            <Link
              className="btn btn-warning mb-3"
              to={"/admin/galerie/foto/" + albumNameParam}
            >
              Vybrat a vymazat fotky
            </Link>
          </div>
        ) : null}
        <div>
          <button type="submit" className="btn btn-success me-3">
            Uložit
          </button>

          <button
            type="button"
            className="btn btn-info"
            onClick={() => navigate("/admin/galerie/foto")}
          >
            Zpět
          </button>
        </div>
      </form>
    </div>
  );
};
export default AlbumForm;
