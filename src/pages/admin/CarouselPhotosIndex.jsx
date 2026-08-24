import { useEffect, useRef, useState } from "react";
import { API_URL, apiDelete, apiGet, apiPut } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const CarouselPhotosIndex = () => {
  const fileInputRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [files, setFiles] = useState([]);
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [uploadErrorState, setUploadErrorState] = useState(false);
  const [uploadSuccessState, setUploadSuccessState] = useState(false);
  const [deleteSuccessState, setDeleteSuccessState] = useState(false);
  const [deleteErrorState, setDeleteErrorState] = useState(false);
  const [visibilityErrorState, setVisibilityErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/carousel-photos")
      .then((data) => setPhotos(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  const clearSelection = () => {
    fileInputRef.current.value = null;
    setFiles([]);
  };

  const handleFilesChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setUploadErrorState(true);
      return;
    }

    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    fetch(`${API_URL}/api/carousel-photos`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Nahrání fotek selhalo");
        }
        return response.json();
      })
      .then((data) => {
        setPhotos((prev) => [...prev, ...data]);
        setUploadSuccessState(true);
        clearSelection();
      })
      .catch((error) => {
        setUploadErrorState(true);
        console.error(error);
      });
  };

  const toggleVisibility = (photo) => {
    apiPut(
      `/api/carousel-photos/${photo.id}/visibility?isHidden=${!photo.isHidden}`,
      {}
    )
      .then((updated) => {
        setPhotos((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      })
      .catch((error) => {
        setVisibilityErrorState(true);
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    let approve = confirm("Opravdu chcete vymazat tuto fotku?");
    if (approve) {
      apiDelete(`/api/carousel-photos/${id}`)
        .then(() => {
          setDeleteSuccessState(true);
          setPhotos((prev) => prev.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setDeleteErrorState(true);
          console.error(error);
        });
    }
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Úvodní fotky</h5>

      <FlashMessage
        success={true}
        state={uploadSuccessState}
        text={messages.fileCreateOk}
      />
      <FlashMessage
        success={false}
        state={uploadErrorState}
        text={`${messages.fileCreateErr}. Vybrali jste nějaké fotky?`}
      />
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.fileLoadErr}
      />
      <FlashMessage
        success={true}
        state={deleteSuccessState}
        text={messages.fileDeleteOk}
      />
      <FlashMessage
        success={false}
        state={deleteErrorState}
        text={messages.fileDeleteErr}
      />
      <FlashMessage
        success={false}
        state={visibilityErrorState}
        text={messages.dataUpdateErr}
      />

      <form onSubmit={handleUpload} className="mb-4">
        <div className="mb-3">
          <label>Fotky:</label>
          <input
            className="form-control"
            multiple
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFilesChange}
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
        <button className="btn btn-success me-3" type="submit">
          Nahrát fotky
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={clearSelection}
        >
          Zrušit výběr
        </button>
      </form>

      <hr />

      <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th>Náhled</th>
            <th>Název</th>
            <th>Viditelnost</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {photos.map((photo) => (
            <tr key={photo.id}>
              <td>
                <img
                  style={{ maxHeight: "100px", maxWidth: "150px" }}
                  src={`${API_URL}${photo.photoUrl}`}
                  alt={photo.name}
                />
              </td>
              <td>{photo.name}</td>
              <td>{photo.isHidden ? "Skryto" : "Zobrazeno"}</td>
              <td>
                <button
                  type="button"
                  className={`btn ${
                    photo.isHidden ? "btn-success" : "btn-warning"
                  } me-2 mb-2`}
                  onClick={() => toggleVisibility(photo)}
                >
                  {photo.isHidden ? "Zobrazit" : "Skrýt"}
                </button>
                <button
                  type="button"
                  className="btn btn-danger mb-2"
                  onClick={() => handleDelete(photo.id)}
                >
                  Vymazat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {photos.length === 0 ? <p>Zatím nebyly nahrány žádné fotky</p> : null}
    </div>
  );
};

export default CarouselPhotosIndex;
