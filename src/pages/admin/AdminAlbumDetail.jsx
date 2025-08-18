import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiDelete, apiGet } from "../../utils/api";
import { API_URL } from "../../utils/api";

const AdminAlbumDetail = () => {
  const { albumName } = useParams();
  const [images, setImages] = useState([]);
  const [albumDescription, setAlbumDescription] = useState("");
  const navigate = useNavigate();

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
      apiDelete(`/api/photos/delete-image/${id}`);

      setImages(images.filter((image) => image.id !== id));
    }
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Album: {albumDescription}</h5>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Foto</th>
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
        <button className="btn btn-info" type="button" onClick={() => navigate("/admin/galerie/foto/upravit-album/" + albumName)}>Zpět</button>
    </div>
  );
};
export default AdminAlbumDetail;
