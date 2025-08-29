import { useEffect, useRef, useState } from "react";
import { apiGet } from "../../utils/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { API_URL } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const ImagesForm = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const [albumName, setAlbumName] = useState("");
  const [errorState, setErrorState] = useState(false);
  const { albumNameParam } = useParams();
  const [photosInAlbum, setPhotosInAlbum] = useState([]);
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [uploadingErrorState, setUploadingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/photos/all-albums-names")
      .then((data) => {
        setAlbums(data);
      })
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
    if (albumNameParam) {
      setAlbumName(albumNameParam);
      apiGet("/api/photos/get-images/" + albumNameParam)
        .then((data) => setPhotosInAlbum(data))
        .catch((error) => {
          setLoadingErrorState(true);
          console.error(error);
        });
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0 || albumName === false) {
      setErrorState(true);
      return;
    }
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    formData.append("albumName", albumName);

    fetch(`${API_URL}/api/photos/add-photos`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then(() =>
        navigate("/admin/galerie/foto", { state: { successState: true } })
      )
      .catch((error) => {
        setUploadingErrorState(true);
        console.error(error);
      });
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Vyberte fotky a album</h5>
      <FlashMessage
        success={false}
        state={errorState}
        text={`${messages.fileCreateErr}. Máte vyplněna všechna pole?`}
      />
      <FlashMessage
        success={false}
        state={uploadingErrorState}
        text={messages.fileCreateErr}
      />
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.fileLoadErr}
      />
      <form onSubmit={handleSubmit} className="mb-3">
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
      {albumNameParam ? (
        <div>
          <hr></hr>
          <h5>Fotky v albu</h5>
          <div className="list">
            <div className="images-form-photos d-flex flex-wrap justify-content-start align-items-center">
              {photosInAlbum
                ? photosInAlbum.map((image, index) => (
                    <div key={index} style={{ margin: "1rem" }}>
                      <div>
                        <img
                          style={{ maxHeight: "100px", maxWidth: "100px" }}
                          src={`${API_URL}${image.url}`}
                        />
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <Link
            className="btn btn-warning mb-3"
            to={"/admin/galerie/foto/" + albumNameParam}
          >
            Upravit fotky
          </Link>
        </div>
      ) : null}
    </div>
  );
};
export default ImagesForm;
