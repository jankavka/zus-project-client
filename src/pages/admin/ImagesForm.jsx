import { useEffect, useRef, useState } from "react";
import { apiGet } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../utils/api";

const ImagesForm = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const [albumName, setAlbumName] = useState("");
  const [errorState, setErrorState] = useState(false)
  const {albumNameParam} = useParams()

  useEffect(() => {
    apiGet("/api/photos/all-albums-names").then((data) => {
      setAlbums(data);
    });
    if(albumNameParam){
      setAlbumName(albumNameParam);
      console.log(albumName)
    }
  }, []);

  const clearSelection = () => {
    fileInputRef.current.value = null;
    setFiles([]);
  };

  const handleFilesChange = async (e) => {
    setFiles(() => {
      const filesToUpload = Array.from(e.target.files);
      return [...filesToUpload];
    });
    console.log(files)
    console.log(albumName)
    //console.log(albumNameParam)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(files.length === 0 || albumName === false){
        setErrorState(true)
        return
    }
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    formData.append("albumName", albumName);
    console.log(formData);

    fetch(`${API_URL}/api/photos/add-photos`, {
      method: "POST",
      body: formData,
    })
      .catch((error) => console.log(error))
      .then(() => navigate("/admin/galerie/foto"));
  };

  return (
    <div className="container-content">
      <h1>Vyberte fotky a album</h1>
      {errorState ? <div className="alert alert-danger"> Je třeba vyplnit všechna pole</div>: null}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Název alba</label>
          <select
            name=""
            id=""
            className="form-control"
            value={albumNameParam ? albumNameParam : albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            required={true}
          >
            <option value={""} disabled>
              Vyberte album
            </option>
            {albums.map((album, index) => (
              <option value={album} key={index}>
                {album}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Fotky:</label>
          <input
            className="form-control"
            multiple
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) => handleFilesChange(e)}
            required
          />
        </div>
        <div>
          <h5>Vybrané fotky:</h5>
          <ul>
            {files.length !== 0 ? (
              files.map((file, index) => <li key={index}>{file.name}</li>)
            ) : (
              <p>Nebyly vybrány žádné fotky</p>
            )}
          </ul>
        </div>
        <div>
          <button
            className="btn btn-success me-3"
            type="submit"
            onClick={handleSubmit}
          >
            Uložit fotky
          </button>
          <button
            className="btn btn-danger me-3"
            type="button"
            onClick={clearSelection}
          >
            Zrušit výběr
          </button>
          <button
            className="btn btn-info"
            type="button"
            onClick={() => navigate(-1)}
          >
            Zpět
          </button>
        </div>
      </form>
    </div>
  );
};
export default ImagesForm;
