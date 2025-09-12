import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiDelete, apiGet } from "../../utils/api";
import { API_URL } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const AdminAlbumDetail = () => {
  const { albumName } = useParams();
  const [images, setImages] = useState([]);
  const [albumDescription, setAlbumDescription] = useState("");
  const navigate = useNavigate();
  const [deleteSuccessState, setDeleteSuccessState] = useState(false);
  const [deleteErrorState, setDeleteErrorState] = useState(false);
  const [successCopyState, setSuccessCopyState] = useState(false);
  const [errorCopyState, setErrorCopyState] = useState(false);

  useEffect(() => {
    apiGet(`/api/photos/get-images/${albumName}`).then((data) =>
      setImages(data)
    );
    apiGet("/api/photos/get-albums").then((data) => {
      for (let key in data) {
        if (data[key].albumName === albumName) {
          setAlbumDescription(data[key].albumDescription);
        }
      }
    });
  }, []);

  const deleteImage = (id) => {
    let aprove = confirm("Opravdu chcete vymazat tento obrázek?");
    if (aprove) {
      apiDelete(`/api/photos/delete-image/${id}`)
        .then(() => {
          setDeleteSuccessState(true);
          if (deleteSuccessState) {
            setImages(images.filter((image) => image.id !== id));
          }
        })
        .catch((error) => {
          setDeleteErrorState(true);
          console.error(error);
        });
    }
  };

  //works only in secure context
  const copyLink = async (url) => {
    console.log("secure context: " + window.isSecureContext);
    console.log(`"local protocol: ` + location.protocol);
    await navigator.clipboard
      .writeText(url)
      .then(() => setSuccessCopyState(true))
      .catch((error) => {
        setErrorCopyState(true);
        console.error(error);
      });
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Album: {albumDescription}</h5>
      <FlashMessage
        success={true}
        state={successCopyState}
        text={"Odkaz zkopírován"}
      />
      <FlashMessage
        success={false}
        state={errorCopyState}
        text={"Odkaz se nepodařilo zkopírovat"}
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
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Odkaz</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image, index) => (
            <tr key={index}>
              <td>
                <img
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                  src={`${API_URL}${image.url}`}
                  alt=""
                />
              </td>
              <td>
                <button onClick={() => copyLink(image.url)}>
                  zkopírovat odkaz
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => deleteImage(image.id)}
                  className="btn btn-danger"
                >
                  Vymazat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-info"
        type="button"
        onClick={() => navigate(-1)}
      >
        Zpět
      </button>
    </div>
  );
};
export default AdminAlbumDetail;
