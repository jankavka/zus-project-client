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

  useEffect(() => {
    setAlbumName(albumNameParam);
    if (albumNameParam) {
      setAlbumDescription(
        apiGet("/api/photos/get-album/" + albumNameParam).then((data) => {
          setAlbumDescription(data.albumDescription), setLeadPictureUrl(data.leadPictureUrl)}
        )
      );
      apiGet("/api/photos/get-images/" + albumNameParam).then((data) =>
        setPhotosInAlbum(data)
      );
    }
    //console.log(leadPictureUrl)
  }, []);

  const navigate = useNavigate();

  const handleChangeLeadPhoto = (e) => {
    setLeadPictureUrl(e.target.value);
    console.log(leadPictureUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (albumNameParam) {
      const body = {
        albumName: albumName,
        albumDescription: albumDescription,
        leadPictureUrl: leadPictureUrl,
      };
      apiPut("/api/photos/edit-album/" + albumNameParam, body).then(() =>
        navigate("/admin/galerie/foto")
      );
      console.log(body);
    } else {
      const body = {
        albumName: albumName,
        albumDescription: albumDescription,
      };
      apiPost("/api/photos/new-album", body).then(() => {
        navigate("/admin/galerie/foto");
      });
    }
  };

  return (
    <div className="container-content">
      <h1>Přidej album</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <FormInput
            label="Název složky:"
            name="albumName"
            value={albumName || ""}
            onChange={(e) => setAlbumName(e.target.value)}
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
                {photosInAlbum
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
                            value={image.url}
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
            onClick={() => navigate(-1)}
          >
            Zpět
          </button>
        </div>
      </form>
    </div>
  );
};
export default AlbumForm;
