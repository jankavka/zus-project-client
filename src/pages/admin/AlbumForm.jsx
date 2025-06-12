import { useState } from "react";
import FormInput from "../../components/FormInput";
import { apiPost } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AlbumForm = () => {
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { albumName: albumName, albumDescription: albumDescription };
    apiPost("/api/photos/new-album", body).then(() => {
      navigate("/admin/galerie/foto");
    });
    console.log(body)
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
        <div>
          <button type="submit" className="btn btn-success me-3">
            Uložit
          </button>

          <button className="btn btn-info" onClick={() => navigate(-1)}>
            Zpět
          </button>
        </div>
      </form>
    </div>
  );
};
export default AlbumForm;
